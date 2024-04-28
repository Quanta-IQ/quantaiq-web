import { v } from "convex/values";
import { asyncMap } from "modern-async";
import OpenAI from "openai";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from "../_generated/server";
import { paginate } from "../helpers";
import {together} from "../ai/together"

export const embedAll = internalAction({
  args: {},
  handler: async (ctx) => {
    await paginate(ctx, "Documents", 20, async (Documents) => {
      await ctx.runAction(internal.ingest.embed.embedList, {
        documentIds: Documents.map((doc) => doc._id),
      });
    });
  },
});


export const embedList = internalAction({
    args: {
      documentIds: v.array(v.id("Documents")),
    },
    handler: async (ctx, { documentIds }) => {
      const chunks = (
        await asyncMap(documentIds, (documentId: any) =>
          ctx.runQuery(internal.ingest.embed.chunksNeedingEmbedding, {
            documentId,
          })
        )
      ).flat();

      const embeddings = await embedTexts(
        chunks.map( (chunk: any) => chunk.Text)
        );

      await asyncMap(embeddings, async (embedding: any, i: string | number) => {
        const { _id: chunkId } = chunks[i];
       
        await ctx.runMutation(internal.ingest.embed.addEmbedding, {
          chunkId,
          embedding,
        });
      });
      
    },
  });
  
  
  export const chunksNeedingEmbedding = internalQuery(
    async (ctx, { documentId }: { documentId: Id<"Documents"> }) => {
      const chunks = await ctx.db
        .query("Chunks")
        .withIndex("byDocumentID", (q) => q.eq("DocumentID", documentId))
        .collect()
      return chunks.filter((chunk) => chunk.EmbeddingID === null);
    }
  );
  
  export const addEmbedding = internalMutation(
    async (
      ctx,
      { chunkId, embedding }: { chunkId: Id<"Chunks">; embedding: number[] }
    ) => {
      const embeddingId = await ctx.db.insert("Embeddings", {
        Embedding: embedding,
        ChunkID: chunkId,
      });
      await ctx.db.patch(chunkId, { EmbeddingID: embeddingId });
    }
  );
  
  export async function embedTexts(texts: string[]) {
    if (texts.length === 0) return [];
    const openai = new OpenAI();
    const { data } = await openai.embeddings.create({
      input: texts,
      model: "text-embedding-3-small",
    });
    console.log({data});
    return data.map(({ embedding }) => embedding);
  }
  