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

export default function Page() {
 
    // let classInfo = useQuery(api.functions.classes.getClassByClassID, {
    //     ClassID: params.slug as Id<"Classes">
    // }) 

    let botList = useQuery(api.functions.custombots.getPublicBots , {
       
    })


    
    
  
    
    return(
        <>
        <div className="h-screen pl-4 ">
            <div>
                <h1 className="text-2xl font-bold mb-4 mt-4 ml-4">Bots</h1>
                <p className="text-light-100 font-semibold mb-4 mt-4 ml-4"> Chat with a teaching assistant, learning assistant, or any type of bot to help your learning </p>
            </div>
            <Separator />
            <div className="ml-4">
              <BotsFeed botList={botList} />

            </div>
        </div>
        </>
    )
}
