import React from 'react';
import {Textarea} from "@/components/ui/textarea"
import { Send } from "lucide-react";
import {Button} from "@/components/ui/button"

export default function ChatInput(){
    //TODO: Add internal funcs and Interface
    // This is temporary UI - Team can make some changes if they want

    return (
        <>
            <div className= "flex flex-1 items-end relative">
                <Textarea
                    className="ring-inset focus-visible:ring-offset-0 pr-28 md:pr-40 min-h-[56px]"
                />
                <div className="my-2 flex items-center gap-2.5 absolute right-[15px]">
                    <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                    </Button>

                </div>
            </div>

        </>
    );

}