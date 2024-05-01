import { Id } from "../_generated/dataModel";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";


export const createTest = mutation({
    args: {
        CreatorID: v.string(),
        TestContent: v.string(),
        Metadata: v.optional(v.any())
    },

    handler: async (ctx, args) => {
        try{
            const test = await ctx.db.insert("Tests", {
                CreatorID: args.CreatorID as Id<"Users">,
                TestContent: args.TestContent,
                Metadata: args?.Metadata,
            });

            return test;
            
        } catch{
            throw new Error("Error")
        }
    }
})

export const deleteTest = mutation({
    args:{
        testId: v.string()
    },
    handler: async(ctx, args) => {
        try{
            await ctx.db.delete(args.testId as Id<"Tests">)
        } catch{
            throw new Error("Error deleting")
        }
    },
}) 

