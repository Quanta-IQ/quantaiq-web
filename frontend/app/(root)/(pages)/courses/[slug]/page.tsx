"use client";

import React from "react";
import CourseHead from "../../../../../components/course/course-header";
import {SidebarContext} from "@/providers/SidebarProvider";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DashCards from "@/components/dashboard/dashcards";
import{
  BookOpenIcon,
      BotIcon,
  CirclePlusIcon,
  ClipboardIcon,
  GroupIcon
  } from "lucide-react"
import Link from "next/link";


export default function Page({params} : {params: {slug: string}}) {
    
    let { setParams}:any = SidebarContext();
    setParams(params.slug);
    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
      CourseID: params.slug as Id<"Courses">
  }) 
  
  console.log(courseInfo)
    if(courseInfo) return (
      <>
      <div className="pl-4 w-full container">
        <div className="p-8 flex flex-col gap-3 w-full">
          <h1 className="text-4xl font-semibold  w-full ">
            Welcome to Course Management for  {courseInfo.CourseName}  
          </h1>
          <h1 className="text-2xl font-semibold  w-full pt-4 ">
            Let us Start with the basics
          </h1>
          
        </div>
          <Starters courseID={courseInfo._id}/>

        
            </div>
    
    </>
    );
}

function Starters({courseID} : {courseID:string}){
  return(
    <section className="w-full flex flex-row gap-4 h-72">
  <div className="w-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rounded-lg shadow-lg p-6 flex flex-col justify-between">
    <div>
      <BookOpenIcon className="w-10 h-10 text-white" />
      <h3 className="text-2xl font-bold text-white mt-4">Create Lessons</h3>
      <p className="text-gray-200 mt-2">Easily create lessons for your students</p>
    </div>
    <Link
      className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#3B82F6] shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      href={`/courses/${courseID}/syllabus`}
    >
      Get Started
    </Link>
  </div>

  <div className="w-full bg-gradient-to-br from-[#EC4899] to-[#D946EF] rounded-lg shadow-lg p-6 flex flex-col justify-between">
    <div>
      <ClipboardIcon className="w-10 h-10 text-white" />
      <h3 className="text-2xl font-bold text-white mt-4">Test Maker AI</h3>
      <p className="text-gray-200 mt-2">Create and manage tests for your students.</p>
    </div>
    <Link
      className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#EC4899] shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      href={`/courses/${courseID}/test`}
    >
      Get Started
    </Link>
  </div>
  <div className="w-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rounded-lg shadow-lg p-6 flex flex-col justify-between">
    <div>
      <BotIcon className="w-10 h-10 text-white" />
      <h3 className="text-2xl font-bold text-white mt-4">Create a Class</h3>
      <p className="text-gray-200 mt-2">Create and manage a class for your students.</p>
    </div>
    <Link
      className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#3B82F6] shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      href={`/courses/${courseID}/class`}
    >
      Get Started
    </Link>
  </div>
  
</section>

  )
}
