import { Id } from "../_generated/dataModel"; 
import { internal } from "../_generated/api";
import { query, mutation, internalMutation  } from "../_generated/server";
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
            v.id("Documents")
        ))
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("Lessons", args);
    }
});

// Get Lesson by ID
export const getLessonByID = query({
    args: {
        LessonID: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (!args.LessonID) {
            return null;
        
        }
        if(args.LessonID == "null"){
            return null;
        }
        try {
            const lesson = await ctx.db.get(args.LessonID as Id<"Lessons">);
            return lesson;
        } catch (error) {
            return null;
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
                v.id("Documents") 
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





//Return all lessons for a course

export const getLessonsByCourseID = query({
    args: {
        CourseID: v.id("Courses")
    },
    handler: async (ctx, args) => {
        try{
            const courses = await ctx.db
                .query("Lessons")
                .withIndex("by_CourseID", q => q.eq("CourseID", args.CourseID))
                .collect();
            return courses;
            }
    
            catch(e){
                console.error(e);
                return null;
            }

    }
});

//Upload Lesson File on Documents
export const createDocument = mutation({
    args: {
        Label: v.string(),
        URL: v.string(),
        Course: v.id("Courses")
    },
    handler: async (ctx, args) => {
        const docID = await ctx.db.insert("Documents",args)
        await ctx.scheduler.runAfter(500, internal.ingest.load.fetchContentFromUrl,{
            url: args.URL
        })
        return docID
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
