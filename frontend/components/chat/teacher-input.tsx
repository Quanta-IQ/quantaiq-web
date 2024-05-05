import React, { useState, ChangeEvent } from 'react';
import {Textarea} from "@/components/ui/textarea"
import { Send, Trash } from "lucide-react";
import {Button} from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {  useQuery, useMutation, useAction } from "convex/react"
import { api } from '@/convex/_generated/api';

interface ChatInputProps {
    type: string;
    sessionID: string | null;
    lessonID: string | null;
}

export default function ChatInput(props: ChatInputProps) {
   
    //TODO: Add internal funcs and Interface
    // This is temporary UI - Team can make some changes if they want

    const [inputValue, setInputValue] = useState("");
    const sendMessage = useMutation(api.messages.teacherbot.send);
    const clearThread = useMutation(api.messages.teacherbot.clear);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSend = async() => {
        // Do something with the inputValue variable
        console.log(inputValue);
        if (inputValue != null && props.sessionID != null && props.lessonID != null){
            await sendMessage({
                message: inputValue,
                sessionId: props.sessionID,
                lessonId: props.lessonID
            })
            setInputValue("");
        }
    };

    const handleClear = async() => {
        if (props.sessionID != null){
            await clearThread({
                sessionId: props.sessionID
            })
        }
    }


    return (
        <>
            
            <div className="grid w-full gap-2">
                <Textarea
                    className="ring-inset focus-visible:ring-offset-0 pr-28 md:pr-40 min-h-[56px] max-h-60"
                    value={inputValue}
                    onChange={handleInputChange}
                  
                />
                <div className="flex flex-row gap-3 justify-end"> 
                    <Button onClick={handleClear}>
                            <Trash className="h-4 w-4 mr-2" />
                            Clear
                    </Button>
                    <Button onClick={handleSend}>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                    </Button>
                </div>
                
            </div>
        </>
    );

}