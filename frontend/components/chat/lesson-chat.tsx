"use client"
import React, {useEffect,useMemo,useRef,useState} from "react";
import {useQuery, useMutation} from "convex/react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
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
    lessonID: string | null;
    sessionID: string;
    userID : string | null;
}

export default function Chat({ lessonID, sessionID, userID }: LessonSession) {
    const remoteMessages = useQuery(api.messages.lessonbot.list, { sessionId: sessionID });
    const lessonInfo = useQuery(api.functions.lessons.getLessonByID, {LessonID: lessonID || undefined});

    const firstMessage = `Hey there! I can assist you on Lesson ${lessonInfo?.Number} - ${lessonInfo?.Name} with the following tasks:`
    + `
     1. **Learning the material**: I can help you understand the concepts of ${lessonInfo?.Name}. 
    I can also provide explanations and examples to supplement your learning.`
    +`
    2. **Modifying the lesson objective**: Based on the lesson description, I can suggest modifications to the
     lesson objectives to make them more specific, measurable, achievable, relevant, and time-bound (SMART). 
    `
    +`3.  **Analyzing texts and attached documents**: I can analyze the provided texts and attached documents.
    I can also consider the vector representations of the documents to identify key concepts and relationships.
    `+`4. **Creating examination questions**: I can help you create examination questions
     that assess  the students' understanding of the concepts covered in the lesson. 
    `+`5. **Creating a comprehensive lesson plan and teaching strategies**: I can help you develop 
     a comprehensive lesson plan that incorporates the learning objectives, teaching strategies,
      and assessment methods.`;


    const [isScrolled, setScrolled] = useState(false);
    const createTest = useMutation(api.functions.tests.createTest);
    const updateLesson = useMutation(api.functions.lessons.updateLesson);
    let { params}:any = SidebarContext();

    const handleUpdateLesson = async (
      type: string,
      message: string
    ) => {
      if (lessonID) {
        try {
          if(type === "objectives"){
            const lesson = await updateLesson({
              LessonID: lessonID,
              data: {
                Objective: message
              }
            })
            
              toast({
              title: "Updated Lesson Objectives",
              description: "We have added the AI message to your objectives"
            })
            
          }
          if(type === "description"){
            const lesson = await updateLesson({
              LessonID: lessonID,
              data: {
                Description: message
              }
            })
            toast({
              title: "Updated Lesson Description",
              description: "We have added the AI message to your description"
            })
            
          }
        }catch {
          
          toast({
            title:"Uh-oh we messed up!",
            description:"Something went wrong please try again"
          })
          throw new Error("");
        }
      }
    }
    const handleTestCreate =  async (message: string) => {
      if (userID){
        try {
          if (params){
            const newTest =  await createTest({
              CreatorID: userID,
              TestContent: message,
              CourseID: params
            })
  
            if (newTest){
              toast({
                title: `Created Test!`,
                description: `Added this exam to your lesson plan`,
            })
            }

          }else{
            const newTest =  await createTest({
              CreatorID: userID,
              TestContent: message,
            })
  
            if (newTest){
              toast({
                title: `Created Test!`,
                description: `Added this exam to your lesson plan`,
            })
            }
          }
          
        }
        catch {
          toast({
            title:"Uh-oh we messed up!",
            description:"Something went wrong please try again"
          })
        }
      }
    }

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
            <ChatHeader/>
       

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
                        {
                          !message.IsViewer && 
                          <ContextMenu>
                            <ContextMenuTrigger>
                              <Markdown className="w-full rounded-xl px-3 py-2 whitespace-pre-wrap ">
                                {message.Text}
                              </Markdown>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                              <ContextMenuItem onClick={() => handleTestCreate(
                                    message.Text
                                  )} 
                              > <Sparkles className="h-4 w-4 mr-2"/> Create Test
                              </ContextMenuItem>
                              <ContextMenuItem
                                onClick={() => handleUpdateLesson(
                                  "objectives",
                                  message.Text
                                )} 
                              >
                                  <Target className="h-4 w-4 mr-2"/> Add as Lesson Objectives 
                              </ContextMenuItem>
                              <ContextMenuItem
                                onClick={() => handleUpdateLesson(
                                  "description",
                                  message.Text
                                )} 
                              >
                                  <SquareDashedMousePointer className="h-4 w-4 mr-2"/> Add as Lesson Description 
                              </ContextMenuItem>
                            </ContextMenuContent>
                            
                          </ContextMenu>

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
                <ChatInput type="lesson-bot" sessionID={sessionID} lessonID={lessonID}/>
            </div>

        </div>
    );
}

