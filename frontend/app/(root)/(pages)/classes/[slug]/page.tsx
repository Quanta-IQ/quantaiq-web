"use client";


import React from "react";
import ClassHead from "@/components/class/class-header";
import { SidebarContext } from "@/providers/SidebarProvider";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DashCards from "@/components/dashboard/dashcards";


export default function Page({params} : {params: {slug: string}}) {
    let { setParams}:any = SidebarContext();
    setParams(params.slug);
    let classInfo = useQuery(api.functions.classes.getClassByClassID, {
      ClassID: params.slug as Id<"Classes">
  }) 
    if(classInfo) return (
      <div className=" m-8 w-full">
        <h1 className="text-3xl font-extrabold">
          
        {classInfo.Name}
        </h1>
        <p className="text-2xl font-semibold text-grey-300">
          {classInfo.Description}
        </p>
        <p className="text-xs font-semibold text-grey-300">
          {classInfo.Code}
        </p>
        <DashCards />
      </div>
    );
}