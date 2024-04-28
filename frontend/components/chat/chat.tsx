import React from "react";

import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"


export default function Chat() {
    
    
    
    return (
        <div className="flex flex-col relative h-full">
            <ChatHeader />
            <ScrollArea 
                className="flex-1 overflow-auto overflow-x-hidden relative overscroll-none pb-10 p-5"
            >

            <div className="space-y-5">

            </div>

            </ScrollArea>
            <Separator />

            <div className="relative w-full box-border flex-col pt-2.5 p-5 space-y-2">
                <ChatInput />
            </div>

        </div>
    );
}