import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //User Profiles
    Users: defineTable({
        UserID: v.string(), //User ID from external
        Username: v.string(), //Username
        FirstName: v.string(),
        LastName: v.string(),
        Email: v.string(),
        Role: v.string(), //Teacher or Student
        Onboarded: v.optional(v.boolean()),
        Bio: v.optional(v.string()),
        AvatarURL: v.optional(v.string()),
    }).index("by_UserID", ["UserID"])
    .index("by_Username", ["Username"]),

    // Courses
    Courses: defineTable({
        CreatorID: v.id("Users"), //User ID of the creator
        CourseName: v.string(),
        CourseDescription: v.string(),
        Visibility: v.string(), //Public or Private
        CourseImageURL: v.optional(v.string()),
        CourseCode: v.string(), //Unique code for the course to join
    })
    .index("by_CourseName", ["CourseName"])
    .index("by_CourseCode", ["CourseCode"])
    .index("by_CreatorID", ["CreatorID"]),

    //Course Data
    //TODO: Review this schema and Edit
    CourseData: defineTable({
        CourseID: v.id("Courses"),
        Data: v.object(
            {
                type: v.string(),
                data: v.any(),
            }
        ),
        Syllabus: v.optional(
            v.array(
                v.object(
                    {
                        title: v.string(),
                        description: v.string(),
                        content: v.string(),
                    }
                )
            )
        ),
    }).index("by_CourseID", ["CourseID"]),

    // Lessons
    Lessons: defineTable({
        CourseID: v.id("Courses"),
        Name: v.string(),
        Number: v.number(),
        Description: v.string(),
        Objective: v.string(),
        Content: v.array(
            v.object(
                {
                    type: v.string(),
                    data: v.any(),
                }
            )
        ),  
    }).index("by_CourseID", ["CourseID"]),

    //Class (Classroom for a course)
    Classes: defineTable({
        CourseID: v.id("Courses"),
        Name: v.string(),
        Description: v.string(),
        Code: v.string(), //to join the class
        ImageURL: v.optional(v.string()),
        Visibility: v.string(), //Public or Private

    })
    .index("by_CourseID", ["CourseID"]),
    
    //Teacher table for each class
    Teachers: defineTable({
        UserID: v.id("Users"),
        ClassID: v.id("Classes"),
    })
    .index("by_UserID", ["UserID"])
    .index("by_ClassID", ["ClassID"]),

    //Student table for each class
    Students: defineTable({
        UserID: v.id("Users"),
        ClassID: v.id("Classes"),
    })
    .index("by_UserID", ["UserID"])
    .index("by_ClassID", ["ClassID"]),

});