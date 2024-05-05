"use client";


import React from "react";
import {SidebarContext} from "@/providers/SidebarProvider";

export default function Page({params} : {params: {slug: string}}) {
  let { setParams}:any = SidebarContext();
  setParams(params.slug);
    
    return (
      <>
     
        <div className="w-full h-full pt-2 pl-4">
          Syllabus
        </div>
        
      </>
    );
}
