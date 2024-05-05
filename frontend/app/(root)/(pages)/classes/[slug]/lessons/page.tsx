"use client";


import React from "react";
import {SidebarContext} from "@/providers/SidebarProvider";
import AITeacherPanel from "@/components/class/teacher/ai-teacher-panel";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export default function Page({params} : {params: {slug: string}}) {
  let { setParams}:any = SidebarContext();
  setParams(params.slug);

  let classInfo = useQuery(api.functions.classes.getClassByClassID, {
    ClassID: params.slug as Id<"Classes">
  }) 
    
    return (
      <>
     
      <div className="h-screen ">
     
        <div className="pl-4  ">
          {classInfo && <AITeacherPanel classInfo={classInfo} />}
          {!classInfo && <div className="font-extrabold items-center w-full h-full justify-center text-center">
              <p>
              Please Find a Valid Class
              </p>
            </div>}

        </div>
      </div>
        
      </>
    );
}
