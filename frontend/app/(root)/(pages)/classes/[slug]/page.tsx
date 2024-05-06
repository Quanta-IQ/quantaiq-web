"use client";


import React from "react";
import ClassHead from "@/components/class/class-header";
import { SidebarContext } from "@/providers/SidebarProvider";
import { useRouter } from "next/navigation";


export default function Page({params} : {params: {slug: string}}) {
    let { setParams}:any = SidebarContext();
    setParams(params.slug);
    
    return (
      <div className="ml-4">
        Class
      </div>
    );
}