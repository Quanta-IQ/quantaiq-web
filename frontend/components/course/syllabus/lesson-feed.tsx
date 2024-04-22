"use client";
import React from "react";

import {z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useEffect} from "react";
import { AuthContext} from "@/providers/AuthProvider";
import useUserConvexData from "@/hooks/useUserConvexData";
import {useRouter} from "next/navigation";
import {api} from "@/convex/_generated/api";
import { useQuery,useMutation } from "convex/react";
import { useForm } from "react-hook-form";

import { Id } from "@/convex/_generated/dataModel";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"


interface Props {
    courseID: string;
    courseName: string;
}


export default function LessonFeed(
    {courseID, courseName}: Props
) {

    const courseLessons = useQuery(api.functions.lessons.getLessonsByCourseID, {
        CourseID: courseID as Id<"Courses">
    });

    console.log(courseLessons);

    return (
        <>
            <ScrollArea className="h-[700px] w-full rounded-md border ">
                
                    <CardHeader>
                        <CardTitle>
                            Syllabus
                        </CardTitle>
                        <CardDescription>
                            Lessons for {courseName} 
                        </CardDescription>
                    </CardHeader>
                    <div className="flex flex-col gap-4">
                    {courseLessons?.map((lessons: any) => {
                    return <div 
                    key={lessons._id}
                    className="border ml-3 mr-3 p-4">
                        <CardContent>
                            <CardTitle>
                                {lessons.Number} - {lessons.Name}
                            </CardTitle>
                            <CardDescription>
                                {lessons.Description}
                            </CardDescription>
                        </CardContent>
                    </div>
                    })}

                    </div>
                    


            
            </ScrollArea>
            
        </>
    )
}
