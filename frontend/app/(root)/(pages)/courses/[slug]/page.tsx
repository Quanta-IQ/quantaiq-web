"use client";
import {useQuery} from "convex/react";
import Image from "next/image";
import React from "react";
import Search from "@/components/ui/search";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel";
import {Separator} from "@/components/ui/separator";

export default function Page({params} : {params: {slug: string}}) {

    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: params.slug as Id<"Courses">
    }) 
    console.log(courseInfo);
    return (
      <>
        {courseInfo && (
          <main className="flex min-h-screen flex-col p-24 pl-48 pr-6">
            <div className="mb-4 mt-4 ml-4">
              <div className="flex flex-row justify-between pb-6">
                <div>
                  <h1 className="text-4xl font-bold">{courseInfo.CourseName}</h1>
                  <p className="text-gray-500 "> {courseInfo.CourseDescription}</p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-row items-center pt-6 gap-4 ">
                <Button>
                  <Link href={`/courses/${courseInfo._id}/syllabus`}>
                    Syllabus
                  </Link>
                </Button>
                <Button>
                  <Link href={`/courses/${courseInfo._id}/test`}>
                    Test
                  </Link>
                </Button>
                <Button>
                  <Link href={`/courses/${courseInfo._id}/class`}>
                    Classes
                  </Link>
                </Button>
                <Button>
                  <Link href={`/courses/${courseInfo._id}/ai`}>
                    AI Tools
                  </Link>
                </Button>
                <Button>
                  <Link href={`/courses/${courseInfo._id}/edit`}>
                    Edit Details
                  </Link>
                </Button>
              </div>
            </div>
          </main>
        )}
      </>
    );
}
