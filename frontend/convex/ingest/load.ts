"use node"

import { Id } from "../_generated/dataModel"; 
import { query, mutation, internalAction } from "../_generated/server";
import { v } from "convex/values";
import { URLDetailContent } from "@/types/ingestion-types";
const pdf= require( 'pdf-parse');
const fs = require("fs");
const axios = require("axios");

// Fetch content from URL
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
                const pdfText = await pdf(response.data);
                const result = {
                    url,
                    content: pdfText.text,
                    size: pdfText.text.length,
                    type: "application/pdf"
                } as URLDetailContent
                return result;
            }

        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch content from URL: " + error);
        }
    }
});
