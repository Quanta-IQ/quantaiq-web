"use client"
import React, {useEffect,useMemo,useRef,useState} from "react";
import {useQuery} from "convex/react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface LessonSession {
    lessonID: string | null;
    sessionID: string;
}

export default function Chat({ lessonID, sessionID }: LessonSession) {
    const remoteMessages = useQuery(api.messages.lessonbot.list, { sessionId: sessionID });
    const messages = useMemo(
        () =>
          [{ IsViewer: false, Text: "Hey there! You can chat with the Lesson", _id: "0" }].concat(
            (remoteMessages ?? []) as {
              IsViewer: boolean;
              Text: string;
              _id: string;
            }[]
          ),
        [remoteMessages]
      );
    return (
        <div className="flex flex-col relative h-full max-w-full">
            <ChatHeader/>
            <ScrollArea 
                className="flex-1 overflow-auto overflow-x-hidden relative overscroll-none pb-10 p-5 max-w-full"
                
            >

            <div className="space-y-5">
                {remoteMessages === undefined ? (
                <>
                    <div className="animate-pulse rounded-md bg-black/10 h-5" />
                    <div className="animate-pulse rounded-md bg-black/10 h-9" />
                </>
                    ) : (
                messages.map((message) => (
                    <div className="space-y-5" key={message._id}>
                    <div
                        className={
                        "text-neutral-400 text-sm relative break-words " +
                        (message.IsViewer ? "text-right" : "")
                        }
                    >
                        {message.IsViewer ? <>You</> : <>{name}</>}
                    </div>
                    {message.Text === "" ? (
                        <div className="animate-pulse rounded-md bg-black/10 h-9" />
                    ) : (
                        <div
                        className={
                            "w-full rounded-xl px-3 py-2 whitespace-pre-wrap " +
                            (message.IsViewer
                            ? "bg-neutral-200 dark:bg-neutral-800 "
                            : "bg-neutral-100 dark:bg-neutral-900 ") +
                            (message.IsViewer 
                            ? "rounded-tr-none"
                            : "rounded-tl-none")
                        }
                        >
                        {message.Text}
                        </div>
                    )}
                    </div>
                ))
                )}
            </div>

            </ScrollArea>
            <Separator />

            <div className="relative w-full box-border flex-col pt-2.5 p-5 space-y-2">
                <ChatInput type="lesson-bot" sessionID={sessionID} lessonID={lessonID}/>
            </div>

        </div>
    );
}
