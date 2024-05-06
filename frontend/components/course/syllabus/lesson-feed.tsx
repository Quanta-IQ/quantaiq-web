"use client";
import React from "react";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useUserConvexData from "@/hooks/useUserConvexData";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
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

import { toast } from "@/components/ui/use-toast";


interface Props {
    courseID: string;
    courseName: string;
}


export default function LessonFeed(
    { courseID, courseName }: Props
) {

    const courseLessons = useQuery(api.functions.lessons.getLessonsByCourseID, {
        CourseID: courseID as Id<"Courses">
    });

    const deleteLesson = useMutation(api.functions.lessons.deleteLesson);
    const updateLesson = useMutation(api.functions.lessons.updateLesson);


    const handleDeleteLesson = (
        lessonId: string,
        lessonNumber: number
    ) => {

        deleteLesson({ LessonID: lessonId as Id<"Lessons"> });

        // Update the lesson numbers
        courseLessons?.forEach((lesson: any) => {
            if (lesson.Number > lessonNumber) {
                updateLesson({
                    LessonID: lesson._id,
                    data: {
                        Number: lesson.Number - 1
                    }
                })
            }
        });

        //Toast
        toast({
            title: "Lesson Deleted",
            description: `Lesson has been deleted`,
            variant: "default"
        });


    };

    return (
        <>
            <ScrollArea className="h-screen w-full rounded-md border ">

                <CardHeader>
                    <CardTitle>
                        Syllabus
                    </CardTitle>
                    <CardDescription>
                        Lessons for {courseName}
                    </CardDescription>
                    <div className="flex flex-row gap-2">
                        <Link href={`/courses/${courseID}/syllabus`}>
                            <Button >
                                Add Lesson
                            </Button>
                        </Link>
                        {/* <Button variant="outline">
                            Re-arrange
                        </Button>
                        <Button variant="outline">
                            Print
                        </Button> */}
                    </div>
                </CardHeader>
                <div className="flex flex-col gap-4 pb-16">

                    {courseLessons?.map((lessons: any) => {
                        return (
                            <Card
                                key={lessons._id}
                                className="border ml-3 mr-3 "
                            >
                                <CardHeader>
                                    <CardTitle>
                                        {lessons.Number} - {lessons.Name}
                                    </CardTitle>
                                    <CardDescription>
                                        {lessons.Description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-row gap-3">
                                    <Link href={`/courses/${courseID}/lessons?select=${lessons._id}`}>
                                        <Button >
                                            View
                                        </Button>
                                    </Link>
                                    <Link href={`${window.location.pathname}?edit=${lessons._id}`}>
                                        <Button variant="outline">
                                            Edit
                                        </Button>
                                    </Link>


                                    <AlertDialog>
                                        <AlertDialogTrigger><div className="h-10 py-2 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ">Delete</div></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the lesson
                                                    and all its data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDeleteLesson(
                                                        lessons._id,
                                                        lessons.Number
                                                    )}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </CardContent>
                            </Card>
                        );
                    })}

                </div>




            </ScrollArea>

        </>
    )
}
