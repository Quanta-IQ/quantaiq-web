"use client"
import {useQuery} from "convex/react";
import Image from "next/image";
import React from "react";
import Search from "@/components/ui/search";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel";
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
      {courseInfo && <div className="mb-4 mt-4 ml-4">
          <div className="flex flex-row justify-between pb-6">
          <div>
            <h1 className="text-4xl font-bold">{courseInfo.CourseName}</h1>
            <p className="text-gray-500 "> {courseInfo.CourseDescription}</p>
          </div>
          </div>
          <Separator />
          <div className="flex flex-row items-center pt-6 gap-4 ">
          <Button variant={window.location.pathname.includes('/syllabus') ? 'default' : 'secondary'}>
            <Link href={`/courses/${courseInfo._id}/syllabus`}>
            Syllabus
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
        </div>}
      </>
    )
}