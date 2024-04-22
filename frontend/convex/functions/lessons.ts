import { Id } from "../_generated/dataModel"; 
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Create
export const createLesson = mutation({
    args: {
        CourseID: v.id("Courses"),
        Name: v.string(),
        Number: v.number(),
        Description: v.string(),
        Objective: v.string(),
        Content: v.optional(v.array(
            v.object({
                type: v.string(),
                data: v.any()
            })
        ))
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("Lessons", args);
    }
});

// Get Lesson by ID
export const getLessonByID = query({
    args: {
        LessonID: v.optional(v.id("Lessons"))
    },
    handler: async (ctx, args) => {
        if (!args.LessonID) {
            return null;
        } else {
            const lesson = await ctx.db
                .get(args.LessonID);
            return lesson;
        }
    }
});

//Update Lesson
export const updateLesson = mutation({
    args: {
        LessonID: v.string(),
        data: v.object({
            CourseID: v.optional(v.id("Courses")),
            Name: v.optional(v.string()),
            Number: v.optional(v.number()),
            Description: v.optional(v.string()),
            Objective: v.optional(v.string()),
            Content: v.optional(v.array(
                v.object({
                    type: v.string(),
                    data: v.any()
                })  
            )),
        })
    },
    handler: async (ctx, args) => {
        const lesson = await ctx.db.get(args.LessonID as Id<"Lessons">);

        if (!lesson) {
            throw new Error("Lesson not found");
        }

        // other checks for specific fields can be placed here, similar to one in your updateCourse function

        // to update the entire lesson data at once
        return await ctx.db.patch(lesson._id, args.data);
    }
});

//Delete Lesson
export const deleteLesson = mutation({
    args: {
        LessonID: v.id("Lessons")
    },
    handler: async (ctx, args) => {
        const deletedLesson = await ctx.db.delete(args.LessonID);
        return deletedLesson;
    }
});