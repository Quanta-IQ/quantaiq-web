import { v } from "convex/values";
import { asyncMap } from "modern-async";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from "../_generated/server";
import { embedTextsTogether } from "../ingest/embed";
import { api, internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";

const AI_MODEL = "meta-llama/Llama-3-70b-chat-hf";

export const answer = internalAction({
  args: {
    sessionId: v.string(),
    testId: v.string()
  },
  handler: async (ctx, { sessionId, testId }) => {
    const messages = await ctx.runQuery(internal.serve.interviewer.getMessages, {
      sessionId,
    });
    const lastUserMessage = messages.at(-1)!.Text;

    const testInfo = await ctx.runQuery(api.functions.tests.getTestByTestID,
      {
        TestID: testId as Id<"Tests">
      }
    )

    console.log(testInfo)
    const metadata = testInfo?.Metadata
    console.log("Current: ", metadata)
    
    const messageId = await ctx.runMutation(internal.serve.interviewer.addBotMessage, {
      sessionId,
      testId
    });

  
    const prompt = `
    You are programmed to function as a test administrator in a strictly controlled environment. Your sole output must be in JSON format, adhering precisely to the templates provided below. No additional text, comments, or feedback is allowed outside these JSON structures.
 
    Test details:
    - Test Title: '${metadata?.TestName}'
    - Content Domain: '${testInfo!.TestContent}'
    
    Instructions for output:
    1. **Multiple Choice Questions**:
      - Use the following JSON template exactly as shown. Replace 'SPECIFY QUESTION', 'OPTION A', 'OPTION B', etc., with the relevant content.
    {
    "QuestionNumber": "SPECIFY",
    "QuestionType": "MULTIPLE",
    "Question": "SPECIFY QUESTION",
    "Choices": {
    "A": "OPTION A",
    "B": "OPTION B",
    "C": "OPTION C",
    "D": "OPTION D"
    },
    "Answer": "Please select an answer"
    }
    
    2. **Open Ended Questions**:
    - Use the following JSON template. Replace 'SPECIFY QUESTION' with the actual question.
    {
    "QuestionNumber": "SPECIFY",
    "QuestionType": "SHORT",
    "Question": "SPECIFY QUESTION",
    "Answer": "Awaiting student's response"
    }
    
    Emphasize:
    - STRICTLY adhere to the JSON format. Any deviation from this format, including additional text, explanations, or unauthorized feedback, is unacceptable.
    - You must ensure that all responses are confined within the structured JSON templates provided. There should be no output before, between, or after these JSON objects.
    
    End of instructions.
    `
    console.log("PROMPT", prompt);

    try {
      const together = new OpenAI({
        baseURL: "https://api.together.xyz/v1",
        apiKey: process.env.TOGETHER_API_KEY
      });
      const stream = await together.chat.completions.create({
        model: AI_MODEL,
        stream: true,
        messages: [
          {
            role: "system",
            content: prompt,
          },
          ...(messages.map(({ IsViewer, Text }) => ({
            role: IsViewer ? "user" : "assistant",
            content: Text,
          })) as ChatCompletionMessageParam[]),
        ],
      });
      let text = "";
      for await (const { choices } of stream) {
        const replyDelta = choices[0].delta.content;
        if (typeof replyDelta === "string" && replyDelta.length > 0) {
          text += replyDelta;
          await ctx.runMutation(internal.serve.interviewer.updateBotMessage, {
            messageId,
            text,
          });
        }
      }


    } catch (error: any) {
      await ctx.runMutation(internal.serve.interviewer.updateBotMessage, {
        messageId,
        text: "I cannot reply at this time.",
      });
      throw error;
    }
  },
});

export const getMessages = internalQuery(
  async (ctx, { sessionId }: { sessionId: string }) => {
    return await ctx.db
      .query("InterviewerMessages")
      .withIndex("bySessionId", (q) => q.eq("SessionID", sessionId))
      .collect();
  }
);


export const addBotMessage = internalMutation(
  async (ctx, { sessionId, testId }: { sessionId: string; testId: string }) => {
    return await ctx.db.insert("InterviewerMessages", {
      IsViewer: false,
      SessionID: sessionId,
      Text: "",
      TestID: testId as Id<"Tests"> 
    });
  }
);

export const updateBotMessage = internalMutation(
  async (
    ctx,
    { messageId, text }: { messageId: Id<"InterviewerMessages">; text: string }
  ) => {
    await ctx.db.patch(messageId, { Text: text });
  }
);
