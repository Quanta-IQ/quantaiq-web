"use client"
import {useMutation, useQuery} from "convex/react";
import Image from "next/image";
import React, { useEffect } from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import EditLesson from "@/components/course/syllabus/edit-lesson";
import Chat from "@/components/chat/custom-chat";
import { useState } from "react";
import useUserConvexData from "@/hooks/useUserConvexData";
import {
    ScrollArea
} from "@/components/ui/scroll-area"
import {  TrashIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import TemporaryPDF from "@/components/class/teacher/pdf-frame-temp"
import Markdown from 'react-markdown'
import { Separator } from "@/components/ui/separator";

export default function AITeacherPanel(
    {botId, classId} : {botId: any, classId?: string}
){  
    const botInfo = useQuery(api.functions.custombots.getCustomBot, {
        id: botId
    })
    const firstMessage = `How can I help you?`
    const userConvex = useUserConvexData()
    const [session, setSession] = useState(crypto.randomUUID())
    
    const userSessions = useQuery(api.functions.users.getUserSessions,{
      userId: userConvex?._id  
    })
    const deleteSession = useMutation(api.functions.users.deleteSession);
    const createSession = useMutation(api.functions.users.createSession);
    const [initiate, setInitiate] = useState(false)
    const clearThread = useMutation(api.messages.lessonbot.clear);
  
    const pathname = usePathname();
    const searchParams = useSearchParams();

    //get the lessons
    const lessons = useQuery(api.functions.lessons.getMultiLessonByID,{
        selectedLessonIDs: botInfo?.Lessons
    })

    // select a session
    const selectedSession = searchParams.get("session");
    //select a file


    
    console.log(userSessions);

    const handleNewSession = async (lessonId: string) => {
        console.log("Triggered New Session with New Lesson")
        const sessionId = crypto.randomUUID()
        
        // Do something with the selected lesson ID
        console.log("Selected Lesson:", lessonId);
        // Create new Session
        if (userConvex?._id) {
            const newSession = await createSession({
            type: "lesson-bot",
            userId: userConvex._id,
            sessionId: sessionId,
            metadata:{
                classId: classId,
                botId: botId
            }
            });
            setSession(sessionId)
        }
        setInitiate(true);
    };


    //Handle session change

    const handleSessionChange = (sessionId: string, lesson: string) => {
        setSession(sessionId)
    }

    
    

    const filteredSessions = userSessions?.filter((session: any) => {
        return session.Metadata.botId === botId;
    });
    
    //Handle delete session

    const handleSessionDelete =  async (sessionId: string) => {
        await clearThread({
            sessionId: sessionId
        })

        await deleteSession({
            sessionId: sessionId
        })

        if(filteredSessions != null ){
            setSession(filteredSessions[0].SessionID)

        }
    }

    console.log(botInfo, classId)

    return (
        <div className="relative h-screen">
            <ResizablePanelGroup direction="horizontal"
            className="max-w-full h-screen">
                <ResizablePanel className=" " defaultSize={15}  >
                    <div className="w-full h-full pl-4 pr-4">

                    
                    <div className="pb-8 h-[75%] flex flex-col gap-1 pt-4">
                        <p className="text-2xl font-extrabold">
                            {botInfo?.Name}
                        </p>
                        <p className="text-lg font-bold">
                            Bot Instructions
                        </p>
                        <ScrollArea className=" pb-4" >
                        <Markdown className="w-full rounded-xl  whitespace-pre-wrap ">
                        {botInfo?.Instructions}
                            </Markdown>
                                
                        </ScrollArea>
                        <Separator />
                        {botInfo?.Lessons && <>

                            <p className="text-lg font-bold pt-4">
                            Bot Lessons
                        </p></>}
                        <ScrollArea className="max-h-36" >
                                {lessons?.map((lesson: any) => (
                                    <div className={`flex items-center space-x-2`}>
                                        {lesson.Name}
                                    </div>
                                ))}
                        </ScrollArea>
                        <p className="text-lg font-bold pt-4">
                            Bot Model
                        </p>
                        <p className="text-sm">
                            {botInfo?.Model}
                        </p>
                    </div>
                     <Separator />               
                    <div className="pt-4 pb-8 h-[25%]">
                        <div>
                        <p className="text-xl font-extrabold">
                            Bot Sessions
                        </p>
                        <Button className="mt-2" onClick={handleNewSession}>
                            New Session
                        </Button>
                        </div>
                       
                        <ScrollArea className="h-full pb-8" >
                            <div className=" flex flex-col space-y-3 pr-2 pt-4 w-full">
                                {filteredSessions?.map((Session: any) => (
                                    <Link key={Session._id} href={`/classes/${classId}/ai?session=${Session.sessionID}&bot=${botId}`}>
                                        <div className={`w-full flex flex-row items-center space-x-2 ${Session.SessionID === session ? 'font-extrabold' : ''}`} onClick={() => handleSessionChange(Session.SessionID, 
                                            Session.Metadata.lessonId
                                        )}>
                                            <p className="w-48 truncate text-xs">{Session.SessionID}</p>
                                            <p>
                                                <AlertDialog>
                                                <AlertDialogTrigger>
                                                        <TrashIcon className="hover:text-destructive h-4 w-4 mr-2" />                                                  
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the conversation
                                                        and from our servers.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                    onClick = {
                                                        () => handleSessionDelete(
                                                            session
                                                        )
                                                    }
                                                    >Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                                </AlertDialog>
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                    </div>
                </ResizablePanel>
            <ResizableHandle withHandle  />
                
                <ResizablePanel defaultSize={85}>
                    {initiate && <Chat key={session} firstMessage={firstMessage} botInfo={botInfo} sessionID={session} userID={userConvex?._id as string}/>}
                    {!initiate && <div className="w-full h-full flex items-center justify-center">
                                <p className="text-2xl font-extrabold">
                                    Start A Session
                                </p>
                            </div>}
                    
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
