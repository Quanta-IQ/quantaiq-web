"use client";

import React from "react";
import CourseHead from "@/components/course/course-header";

import {SidebarContext} from "@/providers/SidebarProvider";
import CustomBotPanel from "@/components/custombots/custombot-panel"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function Page({params} : {params: {slug: string}}) {
  let { setParams}:any = SidebarContext();
  setParams(params.slug);
  let courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
    CourseID: params.slug 
  }) 
    return (
      <div className="h-screen ">
     
        <div className="pl-4  ">
            <CustomBotPanel courseInfo = {courseInfo} />
        </div>
        </div>
    );
}
