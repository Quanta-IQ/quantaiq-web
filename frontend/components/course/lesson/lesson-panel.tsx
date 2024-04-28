"use client"
import {useQuery} from "convex/react";
import Image from "next/image";
import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { useRouter, useSearchParams } from "next/navigation";
import EditLesson from "../syllabus/edit-lesson";
import Chat from "@/components/chat/chat";

export default function LessonPanel(
    {courseID} : {courseID: string}
){
    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: courseID as Id<"Courses">
    }) 
    console.log(courseInfo)

    const courseLessons = useQuery(api.functions.lessons.getLessonsByCourseID, {
        CourseID: courseID as Id<"Courses">
    });

    //url pathname
    const selectedLesson = useSearchParams().get("select");
    console.log(selectedLesson);

    return (
        <>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className="min-w-60" defaultSize={15}  >
                    <div className="pt-2">
                        <p className="text-2xl font-extrabold">
                            Lessons
                        </p>
                        <div className="flex flex-col space-y-3 pr-2 pt-4">
                            {courseLessons?.map((lesson: any) => (
                                <Link href={`/courses/${courseID}/lessons?select=${lesson._id}`}>
                                    <p className={`flex items-center space-x-2 ${lesson._id === selectedLesson ? 'font-extrabold' : ''}`}>
                                        <p>{lesson.Number} - {lesson.Name}</p>
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                </ResizablePanel>
            <ResizableHandle withHandle  />
                <ResizablePanel className="min-w-96" defaultSize={75}>
                    <Chat />
                </ResizablePanel>
            <ResizableHandle withHandle  />
                <ResizablePanel className="min-w-96" defaultSize={10} >
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
        </>
    )
}