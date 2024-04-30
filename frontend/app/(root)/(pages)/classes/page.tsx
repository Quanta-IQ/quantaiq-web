"use client"
import Image from "next/image";
import React, { Suspense } from 'react';

import Search from "@/components/ui/search";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import CourseCard from "../../../../components/course/course-card";
import CourseFeed from "../../../../components/course/course-feed";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateClassForm from "@/components/classes/create-class"
import { AuthContext } from "@/providers/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useUserConvexData from "@/hooks/useUserConvexData";


export default function Home() {
  const userConvex = useUserConvexData();
  console.log(userConvex)


  return (
    
      <div className="mb-4 mt-4 ml-4">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-4xl font-bold">Classes</h1>
            <p className="text-gray-500 "> Find or teach your next class</p>
          </div>
          <div className="items-center pt-2">
       
            <Dialog>
            
            <DialogTrigger>
              <div className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
             Create Class
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-3xl font-bold">Create a Course</DialogTitle>
              <DialogDescription>
                Create a new course
              </DialogDescription>
              <Separator />
              
               {userConvex && <CreateClassForm user={{ user_id: userConvex._id }}/>}

            </DialogContent>
          </Dialog>

          </div>
        </div>
        
        <div className="mt-3 mb-3"> 
          <Suspense fallback={<div>Loading...</div>}>
            <Search  placeholder="TODO: Make this functional"  />
          </Suspense>
        </div>
        <div className="mt-3">
            Class Feed
        </div>
        
      </div>

      

  );
}
