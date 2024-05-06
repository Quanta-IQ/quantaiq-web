import React from "react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator"
import {Bot} from "lucide-react"



export default function ChatHeader({botName}: {botName: string}) {
    return (
        <>
            <div className="relative">
                <div className="text-center py-4">
                    <div className="text-xl font-extrabold flex items-center justify-center">
                        <Bot className="mr-2"/>
                        {botName} 
                    </div>
                </div>
                <Separator />
            </div>
        </>
    );
}
