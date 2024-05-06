import { v } from "convex/values";
import { asyncMap } from "modern-async";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";
import {
    internalAction,
    internalMutation,
    internalQuery,
} from "../_generated/server";
import { embedTextsTogether } from "../ingest/embed";
import { api, internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { SelectSeparator } from "@radix-ui/react-select";

const AI_MODEL = "meta-llama/Llama-3-70b-chat-hf";

export const createTest = internalAction({
    args: {
        courseId: v.string(),
        creatorId: v.string(),
        creationId: v.string(),
        lessonIds: v.array(v.string()),
        testName: v.string(),
        testObjectives: v.string(),
        testDescription: v.string()
    },

    handler: async (ctx, { courseId, creatorId, creationId, lessonIds, testName, testObjectives, testDescription }) => {

        const lessonInfo = await ctx.runQuery(api.functions.lessons.getMultiLessonByID,
            {
                selectedLessonIDs: lessonIds as [Id<"Lessons">]
            }
        )
        // Extract and format titles
        const titles = lessonInfo!.map(lesson => lesson!.Name).join("|+|");
        const objectives = lessonInfo!.map(lesson => lesson!.Objective).join("+|+");
        const descriptions = lessonInfo!.map(lesson => lesson!.Description).join("+|+");

        console.log(lessonInfo)
        const documentIds = lessonInfo?.flatMap(lesson => lesson?.Content || []);
        console.log("All document Ids: ", documentIds);

        const messageId = await ctx.runMutation(internal.serve.testcreator.addBotMessage, {
            courseId,
            creatorId,
            creationId,
            testName,
            testObjectives,
            testDescription,
            lessonIds,
        });

        console.log(messageId)

        const lastUserMessage = titles + objectives + descriptions
        const [embedding] = await embedTextsTogether([lastUserMessage]);

        const searchResults = await ctx.vectorSearch("Embeddings", "byEmbedding", {
            vector: embedding,
            limit: 8,
        });

        // lesson bot
        const chunkFromSearch = await ctx.runQuery(internal.serve.lessonbot.getChunks, {
            embeddingIds: searchResults.map(({ _id }) => _id),
        });
        console.log(chunkFromSearch);

        const flattenedChunks = chunkFromSearch.filter(x => x !== null);

        //Filter to current lesson
        const relevantDocuments = flattenedChunks.filter(({ DocumentID }) => documentIds?.includes(DocumentID));

        console.log(relevantDocuments)

        // modify for question type later
        const prompt = `
            You are an exam creator!
            Exam Name: ${testName}
            Exam Objectives: ${testObjectives}
            Exam Descriptions: ${testDescription}

            The teacher has given you these lessons: ${titles} separated by a '+|+'
            With the lesson objectives: ${objectives} separated by a '+|+'
            With the lesson descriptions: ${descriptions} separated by a '+|+'

            Given this information, you will create examination questions.
      
            You will incorporate a mix of all lessons with their assigned lesson objectives and descriptions.

            WHEN CREATING EXAMS MAKE sure an LLM can grade and facilitate the exam. 
            WHEN CREATING EXAMS MAKE sure your formatting clear and accurate that an LLM can easily parse.
            WHEN CREATING EXAMS MAKE sure to add an answer key in the end.
            DON'T output "Here are the modified ____" or anything similar when you are asked to modify or create something. Only output the modification.
            DON'T Don't output "Here is the exam" or anything similar when you are asked to generate exams. Only output the exam.
      `
        console.log("PROMPT", prompt);

        try {
            const together = new OpenAI({
                baseURL: "https://api.together.xyz/v1",
                apiKey: process.env.TOGETHER_API_KEY
            });
            const stream = await together.chat.completions.create({
                model: AI_MODEL,
                stream: true,
                messages: [
                    {
                        role: "system",
                        content: prompt,
                    },
                    ...(relevantDocuments.map(({ Text }) => ({
                        role: "system",
                        content: "Relevant document:\n\n" + Text,
                    })) as ChatCompletionMessageParam[]),
                    // ...(messages.map(({ IsViewer, Text }) => ({
                    //   role: IsViewer ? "user" : "assistant",
                    //   content: Text,
                    // })) as ChatCompletionMessageParam[]),
                ],
            });
            let text = "";

            // REMOVE BUFFER DURING DEMO!!!
            const updateBuffer = [];
            const bufferThreshold = 30000; // number of choices to buffer

            for await (const { choices } of stream) {
                updateBuffer.push(choices[0].delta.content);
            }

            text += updateBuffer.join('');
            await ctx.runMutation(internal.serve.testcreator.updateBotMessage, {
                messageId,
                text,
            });


        } catch (error: any) {
            await ctx.runMutation(internal.serve.testcreator.updateBotMessage, {
                messageId,
                text: "I cannot reply at this time.",
            });
            throw error;
        }
    },
}
);

export const addBotMessage = internalMutation(
    async (ctx, {
        courseId,
        creatorId,
        creationId,
        lessonIds,
        testName,
        testObjectives,
        testDescription,
        
    }: {
        courseId: string,
        creatorId: string,
        creationId: string,
        lessonIds: string[],
        testName: string,
        testObjectives: string,
        testDescription: string,
    }) => {
        const metadata = {
            Lessons: lessonIds,
            TestName: testName,
            Description: testDescription,
            Objectives: testObjectives,
            CreationID: creationId

        };
        return await ctx.db.insert("Tests", {
            CourseID: courseId as Id<"Courses">,
            CreatorID: creatorId as Id<"Users">,
            TestContent: "",
            Metadata: metadata
        });
    }
);

export const updateBotMessage = internalMutation(
    async (
      ctx,
      { messageId, text }: { messageId: Id<"Tests">; text: string }
    ) => {
      await ctx.db.patch(messageId, { TestContent: text });
    }
  );