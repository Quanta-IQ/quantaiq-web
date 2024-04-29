"use client";


import React from "react";
import CourseHead from "@/components/course/course-header";
import LessonPanel from "@/components/course/lesson/lesson-panel";


export default function Page({params} : {params: {slug: string}}) {
    
    
    return (
      <div className="h-screen">
     
        <CourseHead courseID={params.slug} />
        <div className="pl-4  ">
          <LessonPanel courseID={params.slug} />

        </div>
      </div>
    );
}
