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
import { internal } from "../_generated/api";
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

    const [embedding] = await embedTextsTogether([lastUserMessage]);

    const searchResults = await ctx.vectorSearch("Embeddings", "byEmbedding", {
      vector: embedding,
      limit: 8,
    });

    const relevantDocuments = await ctx.runQuery(internal.serve.lessonbot.getChunks, {
      embeddingIds: searchResults.map(({ _id }) => _id),
    });

    console.log(lastUserMessage, relevantDocuments);

    const messageId = await ctx.runMutation(internal.serve.lessonbot.addBotMessage, {
      sessionId,
      lessonId
    });

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
            content:
              "Answer the user question based on the provided documents " +
              "or report that the question cannot be answered based on " +
              "these documents. Keep the answer informative but brief, " +
              "do not enumerate all possibilities.",
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
      for await (const { choices } of stream) {
        const replyDelta = choices[0].delta.content;
        if (typeof replyDelta === "string" && replyDelta.length > 0) {
          text += replyDelta;
          await ctx.runMutation(internal.serve.lessonbot.updateBotMessage, {
            messageId,
            text,
          });
        }
      }


    } catch (error: any) {
      await ctx.runMutation(internal.serve.lessonbot.updateBotMessage, {
        messageId,
        text: "I cannot reply at this time. Reach out to the team on Discord",
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