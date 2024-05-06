"use client"
import React from "react";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import TestChat from "./test-chat";

export default function TestModule(
    {testID} : {testID: string}
){
    const session = crypto.randomUUID();
    return (
        <div className="h-screen w-full">
            <div className="w-1/2 mx-auto flex justify-center items-center h-full w-full">
                
                    <TestChat
                        key={session}
                        testID={testID as Id<"Tests">}
                        sessionID={session}
                    />
             
            </div>
        </div>
    );
}