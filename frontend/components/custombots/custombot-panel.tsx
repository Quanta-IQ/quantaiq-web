"use client"
import {useMutation, useQuery} from "convex/react";
import Image from "next/image";
import React, { useEffect } from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import EditLesson from "@/components/course/syllabus/edit-lesson";
import Chat from "@/components/chat/teacher-chat";
import { useState } from "react";
import useUserConvexData from "@/hooks/useUserConvexData";
import {
    ScrollArea
} from "@/components/ui/scroll-area"
import {  TrashIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import TemporaryPDF from "@/components/class/teacher/pdf-frame-temp"
import Markdown from 'react-markdown'
import { Separator } from "@/components/ui/separator";
import CreateBot from "./create-custombot"


export default function CustomBotPanel(
    {courseInfo} : {courseInfo: any}
){
    const userConvex = useUserConvexData();
    const botList = useQuery(api.functions.custombots.getBotsByCourseID, {
        CourseID: courseInfo?._id
    })
    console.log(botList)
    const pathname = usePathname();
    const searchParams = useSearchParams();
    //url pathname
    const selectedBot = searchParams.get("select");


    const handleBotChange = async (botId: string) => {
        console.log(botId)
    }

    return (<div className="relative h-screen">
        <ResizablePanelGroup direction="horizontal" className="max-w-full h-screen">
            <ResizablePanel className=" " defaultSize={15}  > 
            <div className="w-full h-full pl-4 pr-4">
                <div className="pt-8 h-full">
                    <p className="text-2xl font-extrabold">
                        Custom Bots
                    </p>
                    <ScrollArea className="h-full">
                    <div className=" flex flex-col space-y-3 pr-2 pt-4">
                            <div className="w-12 ">
                            <Button>Create a Bot</Button>
                            </div>
                            
                            <p className="text-xl font-semibold">
                                Available Bots
                            </p>
                                {botList?.map((bot: any) => (
                                    <Link key={bot._id} href={`/courses/${courseInfo._id}/ai?select=${bot._id}`} >
                                        <div className={`flex items-center space-x-2 ${bot._id === selectedBot ? 'font-extrabold' : ''}`} onClick={() => {
                                            handleBotChange(bot._id);
                                        }} >
                                            {bot.Name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                    </ScrollArea>
                </div>  


            </div>
            </ResizablePanel>
            <ResizableHandle withHandle  />
            <ResizablePanel className=" " defaultSize={65}>
                <div className="w-full justify-center items-center">
                    {courseInfo && userConvex && <CreateBot courseID={courseInfo._id} userID={userConvex._id}/>}
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle  />
            {/* <ResizablePanel className="" defaultSize={20} >
            </ResizablePanel> */}
        </ResizablePanelGroup>
    </div>)
}