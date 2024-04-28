
import { Id } from "../_generated/dataModel"; 
import { query, mutation, internalAction, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { URLDetailContent } from "@/types/ingestion-types";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { asyncMap } from 'modern-async';
import { internal } from "../_generated/api";
export const updateDocument = internalMutation(
    async (ctx, { url, text }: { url: string; text: string }) => {
      const latestVersion = await ctx.db
        .query("Documents")
        .withIndex("byUrl", (q) => q.eq("URL", url))
        .order("desc")
        .first();
  
      const hasChanged = latestVersion === null || latestVersion.Text !== text;
      if (hasChanged && latestVersion) {
        const documentId = await ctx.db.patch(
            latestVersion._id,
            {
                Text: text,
                URL: url
            }
        )
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
            chunkSize: 1000,
            chunkOverlap: 100,
        });

        const chunks = await splitter.splitText(text);
        await asyncMap(chunks, async (chunk: any) => {
            await ctx.db.insert("Chunks", {
              DocumentID: latestVersion._id,
              Text: chunk,
              EmbeddingID: null,
            });
          });
        await ctx.scheduler.runAfter(500, internal.ingest.embed.embedAll)
      }
    }
  );
