"use client";


import React from "react";
import CourseHead from "@/components/course/course-header";

import {SidebarContext} from "@/providers/SidebarProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import useUserConvexData from "@/hooks/useUserConvexData";
import ClassFeed from "@/components/course/class-feed";

import CreateClassForm from "@/components/class/create-class";
export default function Page({params} : {params: {slug: string}}) {
  let { setParams}:any = SidebarContext();
  const userConvex = useUserConvexData();
  
  const course = params.slug
  console.log("Test", course)
  setParams(params.slug);
    return (
      <div className="h-screen pl-4">
     
          <div className="pl-4 pt-4">
            <h1 className="text-2xl font-bold">Classes</h1>
            <p className="text-gray-500 "> Classes using the current course</p>
          </div>

          <div className="flex space-x-2 items-center pt-2 pl-4">
          <Dialog>
            <DialogTrigger>
              <div className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Create Class
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-3xl font-bold">Create a Class</DialogTitle>
              <DialogDescription>
                Create a new class
              </DialogDescription>
              <Separator />
              {userConvex && <CreateClassForm user={{ user_id: userConvex._id }}/>}
            </DialogContent>
          </Dialog>
          </div>
          <div className="mt-8 ml-4">
            
            <ClassFeed params={params} />
          </div>
        </div>
    );
}
