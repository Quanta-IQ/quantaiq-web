import {action} from "../_generated/server";
import OpenAI from "openai";
import {v} from "convex/values";



export const together = new OpenAI({
    baseURL: "https://api.together.xyz/v1",
    apiKey: process.env.TOGETHER_API_KEY
})

