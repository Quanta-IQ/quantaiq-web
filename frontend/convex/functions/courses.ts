import { Id } from "../_generated/dataModel";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Create
export const createCourse = mutation({
    args: {
        CreatorID: v.id("Users"),
        CourseName: v.string(),
        CourseDescription: v.string(),
        Visibility: v.string(),
        CourseImageURL: v.optional(v.string()),
        CourseCode: v.string()
    },
    handler: async (ctx, args) => {
      return await ctx.db.insert("Courses", args);
    },
});

// Get Courses
export const getCourseByCourseID = query({
    args: {
        CourseID: v.optional(v.id("Courses")),
    },
    handler: async (ctx, args) => {
        if (!args.CourseID) {
          return null;
        } else {
          const courses = await ctx.db
            .get(args.CourseID);

          return courses;
        }
    },
});

//Update Course
export const updateCourse = mutation({
    args: {
        CourseID: v.string(),
        data: v.object({
            CreatorID: v.optional(v.id("Users")),
            CourseName: v.optional(v.string()),
            CourseDescription: v.optional(v.string()),
            Visibility: v.optional(v.string()),
            CourseImageURL: v.optional(v.string()),
            CourseCode: v.optional(v.string())
        })
    },
    handler: async (ctx, args) => {
        // Fetch the course by its unique identifier
        const course = await ctx.db
            .get(args.CourseID as Id<"Courses">)

        // If the course does not exist, throw an error
        if (!course) {
            throw new Error("Course not found");
        }

        // If a new CourseName is provided, check if it's unique
        if (args.data.CourseName && args.data.CourseName !== course.CourseName) {
            await ctx.db.patch(course._id, { CourseName: args.data.CourseName });
        }

        // Course Description
        if (args.data.CourseDescription && args.data.CourseDescription !== '') {
            await ctx.db.patch(course._id, { CourseDescription: args.data.CourseDescription });
        }

        // Course Image URL
        if (args.data.CourseImageURL && args.data.CourseImageURL !== '') {
            await ctx.db.patch(course._id, { CourseImageURL: args.data.CourseImageURL });
        }

        // Course Code
        if (args.data.CourseCode && args.data.CourseCode !== '') {
            await ctx.db.patch(course._id, { CourseCode: args.data.CourseCode });
        }

        // Visibility
        if (args.data.Visibility && args.data.Visibility !== '') {
            await ctx.db.patch(course._id, { Visibility: args.data.Visibility });
        }
    }
});

//Delete Course
export const deleteCourse = mutation({
    args: {
        CourseID: v.id("Courses"),
    },
    handler: async (ctx, args) => {
        const deletedCourse = await ctx.db
            .delete(args.CourseID);
        return deletedCourse;
    },
});

