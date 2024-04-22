import { Id } from "../_generated/dataModel";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";


//Create a Class
export const createClass = mutation({
    args: {
        CourseID: v.id("Courses"),
        Name: v.string(),
        Description: v.string(),
        Code: v.string(),
        ImageURL: v.optional(v.string()),
        Visibility: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("Classes", args);
    },
});

//Get Class by ID
export const getClassByClassID = query({
    args: {
        ClassID: v.optional(v.id("Classes")),
    },
    handler: async (ctx, args) => {
        if (!args.ClassID) {
            return null;
        } else {
            const classObject = await ctx.db
                .get(args.ClassID);
            return classObject;
        }
    },
});

//Update Class
export const updateClass = mutation({
    args: {
        ClassID: v.string(),
        data: v.object({
            CourseID: v.optional(v.id("Courses")),
            Name: v.optional(v.string()),
            Description: v.optional(v.string()),
            Code: v.optional(v.string()),
            ImageURL: v.optional(v.string()),
            Visibility: v.optional(v.string()),
        })
    },
    handler: async (ctx, args) => {
        const classObject = await ctx.db.get(args.ClassID as Id<"Classes">);

        if (!classObject) {
            throw new Error("Class not found");
        }

        // other checks for specific fields can be placed here, similar to one in your updateCourse function

        // to update the entire class data at once
        return await ctx.db.patch(classObject._id, args.data);
    }
});

//Delete Class
export const deleteClass = mutation({
    args: {
        ClassID: v.id("Classes"),
    },
    handler: async (ctx, args) => {
        const deletedClass = await ctx.db.delete(args.ClassID);
        return deletedClass;
    }
});



//Add Teacher to Class
export const addTeacherToClass = mutation({
    args: {
        UserID: v.id("Users"),
        ClassID: v.id("Classes"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("Teachers", args);
    },
});

//Add Student to Class
export const addStudentToClass = mutation({
    args: {
        UserID: v.id("Users"),
        ClassID: v.id("Classes"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("Students", args);
    },
});

// Remove Teacher from Class
export  const removeTeacherFromClass = mutation({
    args: {
        UserID: v.id("Users"),
        ClassID: v.id("Classes")
    },
    handler: async (ctx, args) => {
        // Find the document for the teacher in the class using the new unique index.
        const teacherInClass = await ctx.db
            .query("Teachers")
            .withIndex("by_UserID_ClassID", q => q.eq("UserID", args.UserID).eq("ClassID", args.ClassID))
            .unique();

        // If no matching teacher was found in the class, throw an error.
        if (!teacherInClass) {
            throw new Error("No matching teacher found in this class");
        }

        // Remove the found teacher from the class.
        await ctx.db.delete(teacherInClass._id);
    },
});

// Remove Student from Class
export const removeStudentFromClass = mutation({
    args: {
        UserID: v.id("Users"),
        ClassID: v.id("Classes")
    },
    handler: async (ctx, args) => {
        // Find the document for the student in the class using the new unique index.
        const studentInClass = await ctx.db
            .query("Students")
            .withIndex("by_UserID_ClassID", q => q.eq("UserID", args.UserID).eq("ClassID", args.ClassID))
            .unique();

        // If no matching student was found in the class, throw an error.
        if (!studentInClass) {
            throw new Error("No matching student found in this class");
        }

        // Remove the found student from the class.
        await ctx.db.delete(studentInClass._id);
    },
});
