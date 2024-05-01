"use client";


import React from "react";
import CourseHead from "@/components/course/course-header";

import {SidebarContext} from "@/providers/SidebarProvider";

export default function Page({params} : {params: {slug: string}}) {
  let { setParams}:any = SidebarContext();
  setParams(params.slug);
    return (
      <div className="h-screen ">
     
        <div className="pl-4  ">
        Class Settings
        </div>
        </div>
    );
}
