import OpenAI from "openai";
import { ChatCompletionObject } from "@/schemas/completion-schemas";

const anyscale = new OpenAI({
    baseURL: "https://api.endpoints.anyscale.com/v1",
    apiKey: process.env.ANYSCALE_API_KEY
  });
 
export async function anyscaleCompletion(
  system_prompt: string,
  user_prompt: string,
) {

    const completion = await anyscale.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [
          {
            role: "system",
            content: system_prompt,
          },
          {
            role: "user",
            content: user_prompt,
          },
        ],
        temperature: 0.7,
     
      });

      const result = ChatCompletionObject.safeParse(completion)
      if (!result.success) {
        return result.error
      }
      
    console.log(completion.choices[0]?.message?.content);
    return completion
    
}
