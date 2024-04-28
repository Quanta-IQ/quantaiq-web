import React from "react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator"



export default function ChatHeader() {

    return (
        <>
            <div className="relative">
                <div className="text-center py-4">
                    <div className="text-xl font-extrabold">
                        Lesson Chat
                    </div>

                    
                </div>
                <Separator />

            </div>
        
        </>
    );
}