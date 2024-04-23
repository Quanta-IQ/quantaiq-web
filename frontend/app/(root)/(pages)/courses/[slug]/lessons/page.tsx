"use client";


import React from "react";
import CourseHead from "@/components/course/course-header";


export default function Page({params} : {params: {slug: string}}) {

    
    return (
      <>
     
        <CourseHead courseID={params.slug} />
        Lessons
      </>
    );
}
