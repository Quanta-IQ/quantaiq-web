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
    lessonId: v.string()
  },
  handler: async (ctx, { sessionId, lessonId }) => {
    const messages = await ctx.runQuery(internal.serve.lessonbot.getMessages, {
      sessionId,
    });
    const lastUserMessage = messages.at(-1)!.Text;

    const lessonInfo = await ctx.runQuery(api.functions.lessons.getLessonByID,
      {
        LessonID: lessonId as Id<"Lessons">
      }
    )

    console.log(lessonInfo)
    const documentIds = lessonInfo?.Content
    console.log("Current: ", documentIds)
  



    const [embedding] = await embedTextsTogether([lastUserMessage]);

    const searchResults = await ctx.vectorSearch("Embeddings", "byEmbedding", {
      vector: embedding,
      limit: 8,
    });


    const chunkFromSearch = await ctx.runQuery(internal.serve.lessonbot.getChunks, {
      embeddingIds: searchResults.map(({ _id }) => _id),
    });

    //Filter to current lesson
    const relevantDocuments = chunkFromSearch.filter(({ DocumentID }) => documentIds!.includes(DocumentID));

    console.log(lastUserMessage, relevantDocuments);

    const messageId = await ctx.runMutation(internal.serve.lessonbot.addBotMessage, {
      sessionId,
      lessonId
    });

    

    const prompt = `
    You AI Teaching Assistant!

    Today's lesson is titled: '${lessonInfo!.Name}'. The Lesson Objectives are as follows: '${lessonInfo!.Objective}'. Here's a brief Lesson Description: '${lessonInfo!.Description}'.

    You're asked to assist with the following task(s):

    1) Assist with learning the material.
    2) Advise on modifying the lesson objective for enhanced teaching.
    3) Analyze any texts and attached documents, also considering the vector representations of the documents, in relation to the lesson.
    4) Help in creating examination questions.
    5) Create a comprehensive lesson plan and teaching strategies.

    WHEN CREATING EXAMS MAKE sure an LLM can grade and facilitate the exam. 
    WHEN CREATING EXAMS MAKE sure your formatting clear and accurate that an LLM can easily parse.
    WHEN CREATING EXAMS MAKE sure to add an answer key in the end.
    DON'T output "Here are the modified ____" or anything similar when you are asked to modify or create something. Only output the modification.
    DON'T Don't output "Here is the exam" or anything similar when you are asked to generate exams. Only output the exam.
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
          ...(relevantDocuments.map(({ Text }) => ({
            role: "system",
            content: "Relevant document:\n\n" + Text,
          })) as ChatCompletionMessageParam[]),
          ...(messages.map(({ IsViewer, Text }) => ({
            role: IsViewer ? "user" : "assistant",
            content: Text,
          })) as ChatCompletionMessageParam[]),
        ],
      });
      let text = "";

      // REMOVE BUFFER DURING DEMO!!!
      const updateBuffer = [];
      const bufferThreshold = 40; // number of choices to buffer

      for await (const { choices } of stream) {
        updateBuffer.push(choices[0].delta.content);
        if (updateBuffer.length >= bufferThreshold) {
          text += updateBuffer.join('');
          updateBuffer.length = 0; // reset the buffer
          await ctx.runMutation(internal.serve.lessonbot.updateBotMessage, {
            messageId,
            text,
          });
        }
      }

      // Process any remaining items in the buffer
      if (updateBuffer.length > 0) {
        text += updateBuffer.join('');
        await ctx.runMutation(internal.serve.lessonbot.updateBotMessage, {
          messageId,
          text,
        });
      }



    } catch (error: any) {
      await ctx.runMutation(internal.serve.lessonbot.updateBotMessage, {
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
      .query("LessonBotMessages")
      .withIndex("bySessionId", (q) => q.eq("SessionID", sessionId))
      .collect();
  }
);

export const getChunks = internalQuery(
  async (ctx, { embeddingIds }: { embeddingIds: Id<"Embeddings">[] }) => {
    return await asyncMap(
      embeddingIds,
      async (embeddingId) =>
        (await ctx.db
          .query("Chunks")
          .withIndex("byEmbeddingID", (q) => q.eq("EmbeddingID", embeddingId))
          .unique())!
    );
  }
);

export const addBotMessage = internalMutation(
  async (ctx, { sessionId, lessonId }: { sessionId: string; lessonId: string }) => {
    return await ctx.db.insert("LessonBotMessages", {
      IsViewer: false,
      SessionID: sessionId,
      Text: "",
      LessonID: lessonId as Id<"Lessons"> 
    });
  }
);

export const updateBotMessage = internalMutation(
  async (
    ctx,
    { messageId, text }: { messageId: Id<"LessonBotMessages">; text: string }
  ) => {
    await ctx.db.patch(messageId, { Text: text });
  }
);


//Retrieve chunkIds of document
export const retreiveChunkIDs = internalQuery(
   async (
    ctx,
    { documentId }: { documentId: Id<"Documents"> }
  ) => {
    const result = await  ctx.db.query("Chunks")
    .withIndex("byDocumentID", (q) => q.eq("DocumentID", documentId))
    .collect();
    console.log("Length", result.length)
    return result.map(({ _id }) => _id);
  }
);
