
import { Id } from "../_generated/dataModel"; 
import { query, mutation, internalAction, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { URLDetailContent } from "@/types/ingestion-types";

export const updateDocument = internalMutation({
    args: {
        id: v.string(),
        content: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const { id, content } = args;
            return null;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update document: " + error);
        }
    }

});
