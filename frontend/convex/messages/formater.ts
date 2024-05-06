import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";

export const list = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("InterviewerMessages")
      .withIndex("bySessionId", (q) => q.eq("SessionID", args.sessionId))
      .collect();
  },
});

export const send = mutation({
  args: {
    message: v.string(),
    sessionId: v.string(),
    testId: v.string()
  },
  handler: async (ctx, { message, sessionId, testId }) => {
    await ctx.db.insert("InterviewerMessages", {
      IsViewer: true,      
      SessionID: sessionId,
      Text: message,
      TestID: testId as Id<"Tests">
    });
    await ctx.scheduler.runAfter(0, internal.serve.interviewer.answer, {
      sessionId,
      testId
    });
  },
});

