import { query } from "../_generated/server";
import { v } from "convex/values";

export const getClassesForUser = query({
    args: {
        UserID: v.optional(v.id("Users")),
    },
    handler: async (ctx, args) => {
        if (!args.UserID) {
            return null;
        }
        try {
                // from userID, retrieve student entries
                const students = await ctx.db
                    .query("Students")
                    .withIndex("by_UserID", q => q.eq("UserID", args.UserID!))
                    .collect()

                if (students.length === 0) {
                    return []
                }

                // get classID from students
                const classIDs = students.map(entry => entry.ClassID)
                
                // get classes that correspond to classID
                // make this within classes.ts and call in instead of here 
                const classes = await Promise.all(classIDs.map(classID => 
                    ctx.db.get(classID)
                ));

                return classes.filter(c => c !== null);

        } catch (e) {
            console.error(e);
            return null;
        }
    }
});