import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { chatSchema } from "@/schemas/completion-schemas";
import { anyscaleCompletion } from "@/lib/actions/ai/anyscale";

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { prompt } = chatSchema.parse(body)
    // TODO: make the system prompt pull from database of prompt. prompt changes depending on agent.
    let response =  await anyscaleCompletion(`Chat with the user`, `${prompt}`)
    return NextResponse.json(
      {
        response,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      // Handle other types of errors that might occur
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500, // Use 500 to indicate a server error
        }
      );
    }
  }
}
