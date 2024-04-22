"use client";
import React from "react";

import {z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useEffect} from "react";
import { AuthContext} from "@/providers/AuthProvider";
import useUserConvexData from "@/hooks/useUserConvexData";
import {useRouter} from "next/navigation";
import {api} from "@/convex/_generated/api";
import { useQuery,useMutation } from "convex/react";
import { useForm } from "react-hook-form"
import { ScrollArea } from "@/components/ui/scroll-area"





export default function LessonFeed() {




    return (
        <>
            
            <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            
            
            </ScrollArea>
      
        </>
    )
}
