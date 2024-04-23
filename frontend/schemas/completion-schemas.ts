import {z} from 'zod'

export const testSchema = z.object({
    testName: z.string().min(3).max(30),
    objectives: z.string().min(2).max(500),
    description: z.string().min(2).max(100),
    dueDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "Due date must be in MM/DD/YYYY format." }),
    numQuestions: z.string(), // Temporarily store as string
    timeLimit: z.string(), // Temporarily store as string
    visibility: z.enum(["public", "private"]),
    type: z.enum(['multiple_choice', 'open_ended', 'combined']),
});

export const routeTestSchema = testSchema.omit({
    testName: true,
    dueDate: true,
    timeLimit: true,
    visibility: true
});

export const chatSchema = z.object({
    prompt: z.string().min(3).max(30),
});

export const ChatMessage = z.object({
    role: z.string(),
    content: z.string().nullable(),
    tool_calls: z.any().nullable(),  
    tool_call_id: z.any().nullable(),
});

export const Choice = z.object({
    message: ChatMessage,
    index: z.number(),
    finish_reason: z.string(),
    logprobs: z.any().nullable()
});

export const Usage = z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
});

// export const ChatCompletionResponse = z.object({
//     choices: z.array(Choice),
//     usage: Usage.optional()
// });

export const ChatCompletionObject = z.object({
    id: z.string(),
    object: z.string(),
    created: z.number(),
    model: z.string(),
    choices: z.array(Choice),
    usage: Usage.optional()
});

export const ChatResponseObject = z.object({
    success: z.boolean(),
    interaction: ChatCompletionObject.nullable(),
    prompt: z.string().nullable()
});

export const ChatHistoryEntry = z.object({
    prompt: z.string(),
    response: ChatResponseObject.nullable(),
});