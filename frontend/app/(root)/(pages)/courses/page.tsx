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
import CreateCourseForm from "@/components/course/create-course";
import { AuthContext } from "@/providers/AuthProvider";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  const { user }: any = AuthContext();



  return (
    
      <div className="mb-4 mt-4 ml-8 mr-4">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-4xl font-bold">Courses</h1>
            <p className="text-gray-500 "> Find your next course</p>
          </div>
          <div className="items-center pt-2">
       
            <Dialog>
            
            <DialogTrigger>
              <div className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
             Create Course
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-3xl font-bold">Create a Course</DialogTitle>
              <DialogDescription>
                Create a new course
              </DialogDescription>
              <Separator />
              
              <CreateCourseForm user={{ user_id: user.user?.uid }}/>

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
            <CourseFeed />
        </div>
        
      </div>

      

  );
}
