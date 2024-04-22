"use client"
import Image from "next/image";
import React from "react";
import Search from "@/components/ui/search";
import {Button} from "@/components/ui/button";
import CreateCourseForm from "@/components/course/create-course";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import useUserConvexData from "@/hooks/useUserConvexData";
import { Separator } from "@/components/ui/separator"


export default function Home() {
  const { user }: any = AuthContext();
  const { toast } = useToast();
  const router = useRouter();
  
  // Using the custom hook
  const userConvex = useUserConvexData();

  

  return (
    <main className="flex min-h-screen flex-col p-24 pl-48 pr-6 ">
      <div className="mb-4 mt-4 ml-4">
        <div className="flex flex-row justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold">Courses</h1>
            <p className="text-gray-500 "> Let's Create a Course</p>
          </div>
          
        </div>
        <Separator />
        <div className="mt-6">
        <CreateCourseForm user={{ user_id: user.user?.uid }}/>
        </div>
        
      </div>
      
      

      



    </main>
  );
}
