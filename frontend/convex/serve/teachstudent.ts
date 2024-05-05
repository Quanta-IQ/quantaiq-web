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
    console.log(chunkFromSearch);
    
    const flattenedChunks = chunkFromSearch.filter(x => x !== null);

    //Filter to current lesson
    const relevantDocuments = flattenedChunks.filter(({ DocumentID }) => documentIds?.includes(DocumentID));

    console.log(lastUserMessage, relevantDocuments);

    const messageId = await ctx.runMutation(internal.serve.lessonbot.addBotMessage, {
      sessionId,
      lessonId
    });

    const context = `
        Lesson Name: ${lessonInfo!.Name}
        Lesson Objectives: ${lessonInfo!.Objective}
        Lesson Description: ${lessonInfo!.Description}
    `

    const prompt = `
    You are an expert educator, and are responsible for walking the user through this lesson plan. You should make sure to guide them along, encouraging them to progress when appropriate. If they ask questions not related to this getting started guide, you should politely decline to answer and remind them to stay on topic.
    Please limit any responses to only one concept or step at a time. Each step shown only be ~5 lines of code at MOST. Only include 1 code snippet per message - make sure they can run that before giving them any more. Make sure they fully understand that before moving on to the next. This is an interactive lesson - do not lecture them, but rather engage and guide them along!

    -----------------
    ${context}

    -----------------
    End of Context.

    Now remember if possible have short to medium responses.

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
      const bufferThreshold = 10; // number of choices to buffer

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
      .query("TeacherBotMessages")
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
    return await ctx.db.insert("TeacherBotMessages", {
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
    { messageId, text }: { messageId: Id<"TeacherBotMessages">; text: string }
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
