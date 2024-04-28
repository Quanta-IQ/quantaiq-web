import { Id } from "../_generated/dataModel"; 
import { query, mutation, internalAction } from "../_generated/server";
import { v } from "convex/values";


//Upload Lesson File on Documents
export const createDocument = mutation({
    args: {
        Label: v.string(),
        URL: v.string(),
        Course: v.id("Courses")
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("Documents",args)
    }
})

// Get all docs in a lesson

export const getDocsByLesson = query({
    args:{
        Docs: v.optional(v.array(v.string()))
    },

    handler: async(ctx, args) => {
        try {
            if(args.Docs){
            return await Promise.all(args.Docs.map(async (docId) => {
                const doc = await ctx.db.get( docId as Id<"Documents">);
                return doc;
            }));}
            else{
                return null
            }
        }
        catch (error) {
                    console.error(error);
                    throw new Error("Failed to get documents by lesson");
                }
    }
})


