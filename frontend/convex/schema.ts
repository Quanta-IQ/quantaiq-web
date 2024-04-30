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

    //Sessions for User
    Sessions: defineTable({
        UserID: v.id("Users"),
        SessionID: v.string(),
        Type: v.string(),
        Metadata: v.optional(v.any())
    }).index("byUserID", ["UserID"])
    .index("bySessionID", ["SessionID"])
    .index("byType", ["Type"] ),

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
    .index("by_CreatorID", ["CreatorID"])
    .index("by_Visibility", ["Visibility"]),

    //Course Data
    //TODO: Review this schema and Edit
    CourseData: defineTable({
        CourseID: v.id("Courses"),
        Data: v.optional(v.object(
            {
                type: v.string(),
                data: v.any(),
            })
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
        Content: v.optional(v.array(
            v.id("Documents")
        )),  
    }).index("by_CourseID", ["CourseID"]),

    //Documents
    Documents: defineTable({
        Label: v.string(),
        URL: v.string(),
        Text: v.optional(v.string()),
        Size: v.optional(v.number()),
        Type: v.optional(v.string()),
        Course: v.id("Courses")
    }).index("byUrl", ["URL"])
    .index("byCourse", ["Course"]),

    //Document Chunk
    Chunks: defineTable({
        DocumentID: v.id("Documents"),
        Text: v.string(),
        EmbeddingID: v.union(v.id("Embeddings"), v.null()),
    }).index("byDocumentID", ["DocumentID"])
    .index("byEmbeddingID", ["EmbeddingID"]),

    Embeddings: defineTable({
        Embedding: v.array(v.number()),
        ChunkID: v.id("Chunks")
    })
    .index("byChunkID", ["ChunkID"])
    .vectorIndex("byEmbedding",{
        vectorField: "Embedding",
        dimensions: 1024,
    }),

    //Lesson Chat Messages
    LessonBotMessages: defineTable({
        IsViewer: v.boolean(),
        SessionID: v.string(),
        Text: v.string(),
        LessonID: v.id("Lessons")
      }).index("bySessionId", ["SessionID"]),

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
    .index("by_ClassID", ["ClassID"])
    .index("by_UserID_ClassID", ["UserID", "ClassID"]),

    //Student table for each class
    Students: defineTable({
        UserID: v.id("Users"),
        ClassID: v.id("Classes"),
    })
    .index("by_UserID", ["UserID"])
    .index("by_ClassID", ["ClassID"])
    .index("by_UserID_ClassID", ["UserID", "ClassID"]),

    //Test table
    Tests: defineTable({
        TestID: v.string(),
        CreatorID: v.id("Users"),
        TestContent: v.string(),
        Metadata: v.optional(v.any())
    }).index("byTestID", ["TestID"]) 
    .index("byCreatorID", ["CreatorID"])
    .index("by_TestID_CreatorID", ["TestID","CreatorID"]),
 
});