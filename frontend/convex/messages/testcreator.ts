import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";

export const send = mutation({
  args: {
    courseId: v.string(),
    creatorId: v.string(),
    lessonIds: v.array(v.string()),
    testName: v.string(),
    testObjectives: v.string(),
    testDescription: v.string()
  },
  handler: async (ctx, { courseId, creatorId, lessonIds, testName, testObjectives, testDescription }) => {
    await ctx.scheduler.runAfter(0, internal.serve.testcreator.createTest, {
        courseId, 
        creatorId, 
        lessonIds, 
        testName, 
        testObjectives, 
        testDescription
    });
  },
});

