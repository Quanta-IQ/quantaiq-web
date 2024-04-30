"use client"
import {
    Card
} from "@/components/ui/card"
import {useQuery} from "convex/react";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import CreateTest from "./create-test";
import LessonFeed from "../syllabus/lesson-feed";
import { useSearchParams } from 'next/navigation'
import EditLesson from "../syllabus/edit-lesson";
import { AuthContext } from "@/providers/AuthProvider";

export default function TestCard(
    {courseID} : {courseID: string}
){
    const searchParams = useSearchParams()
    const { user }: any = AuthContext();

    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: courseID as Id<"Courses">
    })

    return (
        <>
            <div className="grid grid-cols-3 gap-2">
                {courseInfo &&  <CreateTest user={{ user_id: user.user?.uid }} courseID={courseID} courseName={courseInfo!.CourseName}/>}
            </div>
        </>
    )
}