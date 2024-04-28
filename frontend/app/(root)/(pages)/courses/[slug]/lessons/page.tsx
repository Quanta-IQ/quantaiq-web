"use client";


import React from "react";
import CourseHead from "@/components/course/course-header";
import LessonPanel from "@/components/course/lesson/lesson-panel";


export default function Page({params} : {params: {slug: string}}) {
    
    
    return (
      <>
     
        <CourseHead courseID={params.slug} />
        <div className="pl-4 h-full ">
          <LessonPanel courseID={params.slug} />

        </div>
      </>
    );
}
