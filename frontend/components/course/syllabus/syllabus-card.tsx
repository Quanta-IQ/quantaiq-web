"use client"
import {
    Card
} from "@/components/ui/card"
import {useQuery} from "convex/react";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import CreateLesson from "./create-lesson";
import LessonFeed from "./lesson-feed";
import { useSearchParams } from 'next/navigation'
import EditLesson from "./edit-lesson";

export default function SyllabusCard(
    {courseID} : {courseID: string}
){
    const searchParams = useSearchParams()
 
    const editLesson = searchParams.get('edit')
    const addLesson = searchParams.get('add')

    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: courseID as Id<"Courses">
    })
    console.log(courseInfo)


    return (
        <>
            <div className="flex flex-row gap-2">
                {courseInfo && !editLesson &&  <CreateLesson courseID={courseID} courseName={courseInfo!.CourseName}/>}
                {courseInfo && editLesson &&  <EditLesson lessonID={editLesson}/>}
                {courseInfo &&<LessonFeed courseID={courseID} courseName={courseInfo!.CourseName}/>}
            </div>
        </>
    )
}