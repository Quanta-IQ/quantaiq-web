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
import { Button } from "@/components/ui/button"
import Link from "next/link";


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
                        <div className="flex flex-row gap-2">
                            <Button >
                                <Link href={`/courses/${courseID}/syllabus`}>
                                    Add Lesson
                                </Link>
                            </Button>
                            <Button variant="outline">
                                    {/* Make Functional Delete Button */}
                                    Re-arrange
                            </Button>
                            <Button variant="outline">
                                    {/* Make Functional Delete Button */}
                                    Print
                            </Button>
                        </div>
                    </CardHeader>
                    <div className="flex flex-col gap-4 pb-16">
                    {courseLessons?.map((lessons: any) => {
                    return <Card 
                    key={lessons._id}
                    className="border ml-3 mr-3 ">
                        <CardHeader>
                            <CardTitle>
                                {lessons.Number} - {lessons.Name}
                            </CardTitle>
                            <CardDescription>
                                {lessons.Description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-row gap-3">
                            <Button >
                                <Link href={`/courses/${courseID}/syllabus`}>
                                    View
                                </Link>
                            </Button>
                            <Button variant="outline">
                                <Link href={`${window.location.pathname}?edit=${lessons._id}`}>
                                    Edit
                                </Link>
                                
                            </Button>
                            
                            <Button variant="outline">
                                    {/* Make Functional Delete Button */}
                                    Delete
                            </Button>
                        </CardContent>
                    </Card>
                    })}

                    </div>
                    


            
            </ScrollArea>
            
        </>
    )
}
