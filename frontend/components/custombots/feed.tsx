"use client";
import React from "react";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useUserConvexData from "@/hooks/useUserConvexData";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useForm } from "react-hook-form";

import { Id } from "@/convex/_generated/dataModel";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link";

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

import { toast } from "@/components/ui/use-toast";
import BotCard from "./botscard";


interface Props {
    botList: any,
    classID?:string
}


export default function BotsFeed(
    { botList, classID }: Props
) {

  

    if(classID) return (
        <>
            
            <ScrollArea className="h-screen w-full ">
                
                    {botList?.map((bot: any) => {
                        return <div className="mt-3 flex flex-wrap gap-4" key={bot._id}><BotCard 
                        classID={classID}
                        botId={bot._id}
                        Name={bot.Name}
                        Instructions={bot.Instructions}
                        /></div>
                    })}

                


            </ScrollArea>

        </>
    )
    if(!classID) return (
        <>
            
            <ScrollArea className="h-screen w-full ">
                
                    {botList?.map((bot: any) => {
                        return <div className="mt-3 flex flex-wrap gap-4" key={bot._id}><BotCard 
                        botId={bot._id}
                        Name={bot.Name}
                        Instructions={bot.Instructions}
                        /></div>
                    })}

                


            </ScrollArea>

        </>
    )
}
