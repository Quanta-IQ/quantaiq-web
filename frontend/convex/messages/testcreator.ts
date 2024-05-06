import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";

export const send = mutation({
  args: {
    courseId: v.string(),
    creatorId: v.string(),
    creationId: v.string(),
    lessonIds: v.array(v.string()),
    testName: v.string(),
    testObjectives: v.string(),
    testDescription: v.string()
  },
  handler: async (ctx, { courseId, creatorId, creationId, lessonIds, testName, testObjectives, testDescription }) => {
    await ctx.scheduler.runAfter(0, internal.serve.testcreator.createTest, {
        courseId, 
        creatorId, 
        creationId,
        lessonIds, 
        testName, 
        testObjectives, 
        testDescription
    });
  },
});

export const get = query({
  args: {
    creationId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("Tests")
      .withIndex("byMetadataCreationID", (q) => q.eq("Metadata.CreationID", args.creationId))
      .first();
  },
});
