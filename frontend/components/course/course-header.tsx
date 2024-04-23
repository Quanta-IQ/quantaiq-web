"use client"
import {useQuery} from "convex/react";
import Image from "next/image";
import React from "react";
import Search from "@/components/ui/search";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import {Separator} from "@/components/ui/separator";



export default function CourseHead(
    {courseID} : {courseID: string}
){
    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: courseID as Id<"Courses">
    }) 
    console.log(courseInfo)

    return (
      <>
      {courseInfo && <div className="pt-4 ml-4 pb-2 bg-white">
          <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-3xl font-bold">{courseInfo.CourseName}</h1>
            <p className="text-gray-500 "> {courseInfo.CourseDescription}</p>
          </div>
          </div>
          
          <div className="flex flex-row items-center pt-3 gap-4 pb-4">
          <Button variant={window.location.pathname.includes('/syllabus') ? 'default' : 'secondary'}>
            <Link href={`/courses/${courseInfo._id}/syllabus`}>
            Syllabus
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/lessons') ? 'default' : 'secondary'}>
            <Link href={`/courses/${courseInfo._id}/lessons`}>
            Lessons
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/test') ? 'default' : 'secondary'}>
            <Link href={`/courses/${courseInfo._id}/test`}>
            Test
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/class') ? 'default' : 'secondary'}>
            <Link href={`/courses/${courseInfo._id}/class`}>
            Classes
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/ai') ? 'default' : 'secondary'}>
            <Link href={`/courses/${courseInfo._id}/ai`}>
            AI Tools
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/edit') ? 'default' : 'secondary'}>
            <Link href={`/courses/${courseInfo._id}/edit`}>
            Edit Details
            </Link>
          </Button>
          </div>
          <Separator />
        </div>
        }
      </>
    )
}