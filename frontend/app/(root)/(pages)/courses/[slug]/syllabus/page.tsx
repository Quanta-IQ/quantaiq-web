"use client";


import React from "react";
import CourseHead from "@/components/course/course-header";
import SyllabusCard from "@/components/course/syllabus/syllabus-card";
import SyllabusChat from "@/components/course/syllabus/syllabus-chat";
import {SidebarContext} from "@/providers/SidebarProvider";

export default function Page({params} : {params: {slug: string}}) {
  let { setParams}:any = SidebarContext();
  setParams(params.slug);
    
    return (
      <>
     
        <div className="w-full pt-2 pl-4">
          <SyllabusCard 
          courseID={params.slug}
          />
        </div>
        
      </>
    );
}
