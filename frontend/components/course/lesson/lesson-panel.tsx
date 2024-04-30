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
import EditLesson from "../syllabus/edit-lesson";
import Chat from "@/components/chat/lesson-chat";
import { useState } from "react";
import useUserConvexData from "@/hooks/useUserConvexData";
import {
    ScrollArea
} from "@/components/ui/scroll-area"

export default function LessonPanel(
    {courseID} : {courseID: string}
){  

    const userConvex = useUserConvexData()
    const [session, setSession] = useState(crypto.randomUUID())
    const userSessions = useQuery(api.functions.users.getUserSessions,{
      userId: userConvex?._id  
    })
    const createSession = useMutation(api.functions.users.createSession);
    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: courseID as Id<"Courses">
    }) 
    console.log(courseInfo)

    const courseLessons = useQuery(api.functions.lessons.getLessonsByCourseID, {
        CourseID: courseID as Id<"Courses">
    });
    const pathname = usePathname();
    const searchParams = useSearchParams();

    //url pathname
    const selectedLesson = searchParams.get("select");
    // select a session
    const selectedSession = searchParams.get("session");
   
    
    console.log(selectedLesson, selectedSession, session)

    console.log(userSessions);

    //Function when selectedLesson Changes
    const handleSelectedLessonChange = async (lessonId: string) => {
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
                lessonId: selectedLesson
            }
            });
            setSession(sessionId)
        }
    };

    //Handle session change

    const handleSessionChange = (sessionId: string) => {
        setSession(sessionId)
    }

    
    
        
    

    return (
        <div className=" h-[800px]">
            <ResizablePanelGroup direction="horizontal"
            className="max-w-full h-full">
                <ResizablePanel className="min-w-60 flex flex-col gap-2" defaultSize={15}  >
                    <div className="pt-2">
                        <p className="text-2xl font-extrabold">
                            Lessons
                        </p>
                        <ScrollArea className="h-96">
                            <div className=" flex flex-col space-y-3 pr-2 pt-4">
                                {courseLessons?.map((lesson: any) => (
                                    <Link key={lesson._id} href={`/courses/${courseID}/lessons?select=${lesson._id}`} >
                                        <div className={`flex items-center space-x-2 ${lesson._id === selectedLesson ? 'font-extrabold' : ''}`} onClick={() => {
                                            handleSelectedLessonChange(lesson._id);
                                        }} >
                                            {lesson.Number} - {lesson.Name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                        
                    </div>

                    <div>
                        <p className="text-2xl font-extrabold">
                            Sessions
                        </p>
                        <ScrollArea className="h-60">
                            <div className=" flex flex-col space-y-3 pr-2 pt-4">
                                {userSessions?.map((session: any) => (
                                    <Link key={session._id} href={`/courses/${courseID}/lessons?session=${session.sessionID}&select=${session.Metadata.lessonId}`}>
                                        <p className={`flex items-center space-x-2 ${session.sessionID === selectedSession ? 'font-extrabold' : ''}`} onClick={() => handleSessionChange(session.SessionID)}>
                                            {session.SessionID}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                        

                    </div>
                    
                </ResizablePanel>
            <ResizableHandle withHandle  />
                <ResizablePanel className="min-w-96  " defaultSize={75}>
                    {selectedLesson && <Chat key={session} lessonID={selectedLesson} sessionID={session}/>}
                    {!selectedLesson && <div className="w-full h-full flex items-center justify-center">
                                <p className="text-2xl font-extrabold">
                                    Select A Lesson
                                </p>
                            </div>}
                </ResizablePanel>
            <ResizableHandle withHandle  />
                <ResizablePanel className="min-w-96 " defaultSize={10} >
                    {
                        !selectedLesson && 
                        <>
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-2xl font-extrabold">
                                    Select A Lesson
                                </p>
                            </div>
                        </>
                    }
                    { selectedLesson && 
                        <div>
                            <EditLesson lessonID={selectedLesson} courseID={courseID}/>
                        </div>
                     }
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
