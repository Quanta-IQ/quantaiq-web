import { Id } from "../_generated/dataModel";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";


export const createTest = mutation({
    args: {
        CreatorID: v.string(),
        TestContent: v.string(),
        CourseID: v.optional(v.string()),
        Metadata: v.optional(v.any())
    },

    handler: async (ctx, args) => {
        try{
            console.log(args)
            const test = await ctx.db.insert("Tests", {
                CreatorID: args.CreatorID as Id<"Users">,
                TestContent: args.TestContent,
                CourseID: args?.CourseID as Id<"Courses">,
                Metadata: args?.Metadata,
            });
            console.log(test)
            return test;
            
        } catch{
            console.log(Error)
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

export const fetchTests = query({
    args: {
        ClassID: v.optional(v.id("Classes")),
    },
    handler: async (ctx, args) => {
        if (!args.ClassID) {
            return null;
        }
        try {
            // we know courseID
            // classID -> courseID
            const classObject = await ctx.db
                .get(args.ClassID!);

            if (!classObject || !classObject.CourseID!) {
                    return [];
            }
            

            // courseID -> test
            const tests = await ctx.db
            .query("Tests")
            .withIndex("byCourseID", q => q.eq("CourseID", classObject.CourseID!))
            .collect()
            
            return tests.length > 0 ? tests : [];

        } catch (e) {
            console.error(e);
            return null;
        }
    }
});

export const getTestByTestID = query({
    args: {
        TestID: v.optional(v.id("Tests")),
    },
    handler: async (ctx, args) => {
        if (!args.TestID) {
            return null;
        } else {
            const test = await ctx.db
                .get(args.TestID);
            return test;
        }
    },
});