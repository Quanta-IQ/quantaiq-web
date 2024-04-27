import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";

export const ChatCompletionObject = v.object({
  id: v.string(),
  object: v.string(),
  created: v.number(),
  model: v.string(),
  choices: v.array(v.any()),
  usage: v.optional(v.any())
});

const anyscale = new OpenAI({
    baseURL: "https://api.endpoints.anyscale.com/v1",
    apiKey: process.env.ANYSCALE_API_KEY
  });

export const CompletionOneshot = action({
  args: { 
    system_prompt: v.string(),
    user_prompt: v.string(),
   },
  handler: async (ctx, args) => {
    const completion = await anyscale.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [
          {
            role: "system",
            content: args.system_prompt,
          },
          {
            role: "user",
            content: args.user_prompt,
          },
        ],
        temperature: 0.7,
     
      });
      
      //TODO: Sean please add validation here moving your safeParse from your schema thing to convex

    //rough dirty validation attempt
    //just check if completion has choices[0]
    //if it does, then it's valid
    //if it doesn't, then it's not valid
    //this is a temporary solution
    if (!completion.choices[0]) {
      throw new Error("Invalid completion response")
    }

    return completion.choices[0]!.message!.content;

  },
});