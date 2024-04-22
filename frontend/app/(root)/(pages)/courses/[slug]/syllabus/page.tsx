"use client";


import React from "react";
import CourseHead from "@/components/course/course-header";
import SyllabusCard from "@/components/course/syllabus/syllabus-card";
import SyllabusChat from "@/components/course/syllabus/syllabus-chat";


export default function Page({params} : {params: {slug: string}}) {

    
    return (
      <>
     
        <CourseHead courseID={params.slug} />
        <div className="w-full">
          <SyllabusCard 
          courseID={params.slug}
          />
        </div>
        
      </>
    );
}
