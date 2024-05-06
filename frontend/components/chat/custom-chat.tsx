"use client"
import React, {useEffect,useMemo,useRef,useState} from "react";
import {useQuery, useMutation} from "convex/react";
import ChatHeader from "./custom-header";
import ChatInput from "./custom-input";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Markdown from 'react-markdown'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Sparkles, SquareDashedMousePointer,
  Target
} from "lucide-react"
import { SidebarContext } from "@/providers/SidebarProvider";

interface LessonSession {
    lessonInfo: any | null | undefined;
    botInfo: any | null | undefined;
    sessionID: string;
    userID : string | null;
    firstMessage: string;
}

export default function Chat({ lessonInfo,botInfo, sessionID, userID, firstMessage }: LessonSession) {
    const remoteMessages = useQuery(api.messages.custombot.list, { sessionId: sessionID });



    const [isScrolled, setScrolled] = useState(false);
    let { params}:any = SidebarContext();

   
    const messages = useMemo(
        () =>
          [{ IsViewer: false, Text: firstMessage, _id: "0" }].concat(
            (remoteMessages ?? []) as {
              IsViewer: boolean;
              Text: string;
              _id: string;
            }[]
          ),
        [remoteMessages, firstMessage]
      );
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (isScrolled) {
          return;
        }
        // Using `setTimeout` to make sure scrollTo works on button click in Chrome
        setTimeout(() => {
          listRef.current?.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
      }, [messages, isScrolled]);


    return (
        <div className="flex flex-col relative h-full max-w-full ">
            <ChatHeader botName={botInfo?.Name}/>
       
          <>

            <div className="h-5/6 flex flex-col space-y-4 p-3 overflow-y-auto"
                ref={listRef}
                onWheel={() => {
                  setScrolled(true);
                }}
            >
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
                        {/* {
                          !message.IsViewer && 
                          <ContextMenu>
                           
                            
                          </ContextMenu>

                        } */}
                        {
                          !message.IsViewer &&
                          <Markdown className="w-full rounded-xl px-3 py-2 whitespace-pre-wrap ">{message.Text}</Markdown>
                        }
                        {
                          message.IsViewer &&
                          <Markdown className="w-full rounded-xl px-3 py-2 whitespace-pre-wrap ">{message.Text}</Markdown>
                        }

                        </div>
                    )}
                    </div>
                ))
                )}
            </div>

            <Separator />

            <div className="relative w-full box-border flex-col pt-2.5 p-5 space-y-2">
                <ChatInput type="lesson-bot" sessionID={sessionID} botId={botInfo?._id}/>
            </div>
            </>

        </div>
    );
}

