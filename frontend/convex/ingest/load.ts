"use node"
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel"; 
import { query, mutation, internalAction, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { URLDetailContent } from "@/types/ingestion-types";
import pdf2md from '@opendocsg/pdf2md';
const axios = require("axios");


// Fetch content from URL -> Parse into text
export const fetchContentFromUrl = internalAction({
    args: {
        url: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const url = args.url;

            const response = await fetch(url);
            

            if (!response.ok) {
                throw new Error("Failed to fetch content from URL");
            }

            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("application/pdf")) {
                const response = await axios.get(url, {
                    responseType: "arraybuffer",
                })
                let callbacks = {};
                const pdfText = await pdf2md(response.data, callbacks);
                const result = {
                    url,
                    content: pdfText,
                    size: pdfText.length,
                    type: "application/pdf"
                } as URLDetailContent

                const text = result.content as string;
                if (pdfText.length > 0) {
                    await ctx.runMutation(internal.ingest.document.updateDocument, { url, text });
                  }
                return result;
            }

        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch content from URL: " + error);
        }
    }
});
