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
      .query("TeacherBotMessages")
      .withIndex("bySessionId", (q) => q.eq("SessionID", args.sessionId))
      .collect();
  },
});

export const send = mutation({
  args: {
    message: v.string(),
    sessionId: v.string(),
    lessonId: v.string()
  },
  handler: async (ctx, { message, sessionId, lessonId }) => {
    await ctx.db.insert("TeacherBotMessages", {
      IsViewer: true,      
      SessionID: sessionId,
      Text: message,
      LessonID: lessonId as Id<"Lessons">
    });
    await ctx.scheduler.runAfter(0, internal.serve.teacherbot.answer, {
      sessionId,
      lessonId
    });
  },
});

export const clear = mutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("TeacherBotMessages")
      .withIndex("bySessionId", (q) => q.eq("SessionID", args.sessionId))
      .collect();
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});