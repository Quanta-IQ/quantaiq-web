"use client";


import React from "react";
import {SidebarContext} from "@/providers/SidebarProvider";
import AITeacherPanel from "@/components/custombots/ai-teacher-panel";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { usePathname, useSearchParams } from "next/navigation";
import BotsFeed from "@/components/custombots/feed";
import {Separator} from "@/components/ui/separator"

export default function Page({params} : {params: {slug: string}}) {
    let { setParams}:any = SidebarContext();
    setParams(params.slug);


    const pathname = usePathname();
    const searchParams = useSearchParams();

    //url pathname


    
  
    
     return (
      <>
     
      <div className="h-screen ">
     
        <div className="pl-4  ">
          <AITeacherPanel botId={params.slug} />
       

        </div>
      </div>
        
      </>
    );
}
