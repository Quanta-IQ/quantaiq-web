import { Id } from "../_generated/dataModel"; 
import { internal } from "../_generated/api";
import { query, mutation, internalMutation  } from "../_generated/server";
import { v } from "convex/values";

export const createCustomBot = mutation({
  args: {
    CreatorID: v.id("Users"),
    Name: v.string(),
    Type: v.string(),
    Model: v.string(),
    CourseID: v.optional(v.id("Courses")),
    Lessons: v.optional(v.array(v.id("Lessons"))),
    Instructions: v.string(),
    Config: v.any(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("CustomBots", args);
  }
});

export const getCustomBot = query({
    args: {
        id: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        if (!args.id) {
            return null;
        } else {
            try{
                const botInfo = await ctx.db
                  .get(args.id as Id<"CustomBots">);
      
                return botInfo;}
                catch{
                  return null
                  throw new Error
                }
        }
    },
});

export const updateBot = mutation({
    args: {
        BotID: v.string(),
        data: v.object({
            CreatorID: v.id("Users"),
            Name: v.string(),
            Type: v.string(),
            Model: v.string(),
            CourseID: v.optional(v.id("Courses")),
            Lessons: v.optional(v.array(v.id("Lessons"))),
            Instructions: v.string(),
            Config: v.any(),
        })
    },
    handler: async (ctx, args) => {
        const bot = await ctx.db.get(args.BotID as Id<"CustomBots">);
        
        if (!bot) {
            throw new Error("Bot not found");
        }

        // other checks for specific fields can be placed here, similar to one in your updateCourse function

        // to update the entire lesson data at once
        return await ctx.db.patch(bot._id, args.data);
    }
});


//Delete Bot
export const deleteBot = mutation({
    args: {
        botID: v.id("CustomBots")
    },
    handler: async (ctx, args) => {
        const deletedLesson = await ctx.db.delete(args.botID);
    
        
        return deletedLesson;
    }
});

//Get custombots in a course
export const getBotsByCourseID = query({
    args: {
        CourseID: v.optional(v.id("Courses"))
    },
    handler: async (ctx, args) => {
        try{
            if(args.CourseID){const bots = await ctx.db
                .query("CustomBots")
                .withIndex("by_CourseID", q => q.eq("CourseID", args.CourseID))
                .collect();
            return bots;}
            }
    
            catch(e){
                console.error(e);
                return null;
            }

    }
});

//get user's bots
export const getBotsByUser = query({
    args: {
        UserID: v.id("Users")
    },
    handler: async (ctx, args) => {
        try{
            const bots = await ctx.db
                .query("CustomBots")
                .withIndex("by_CreatorID", q => q.eq("CreatorID", args.UserID))
                .collect();
            return bots;
            }
    
            catch(e){
                console.error(e);
                return null;
            }

    }
});