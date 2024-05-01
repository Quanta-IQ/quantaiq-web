"use client";

import React from "react";
import CourseHead from "@/components/course/course-header";
import {SidebarContext} from "@/providers/SidebarProvider";

export default function Page({params} : {params: {slug: string}}) {
  let { setParams}:any = SidebarContext();
  setParams(params.slug);
    return (
      <>
     
        Edit Details
      </>
    );
}
