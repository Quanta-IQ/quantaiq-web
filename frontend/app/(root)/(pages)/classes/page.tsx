"use client"
import Image from "next/image";
import React, { Suspense } from 'react';

import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";
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
import CreateClassForm from "@/components/class/create-class";
import { AuthContext } from "@/providers/AuthProvider";
import { Separator } from "@/components/ui/separator";
import JoinClassForm from "@/components/class/join-class";
import JoinClassTabs from "@/components/class/join-class-tabs";
import ClassAdminFeed from "@/components/class/class-admin-feed";
import ClassFeed from "@/components/class/class-feed";


export default function Home() {
  const { user }: any = AuthContext();

  return (
    <div className="mb-4 mt-4 ml-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-4xl font-bold">Classes</h1>
        </div>
        <div className="flex space-x-2 items-center pt-2">
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
              <CreateClassForm user={{ user_id: user.user?.uid }} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="p-3 bg-secondary text-secondary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Join Class
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-3xl font-bold">Join a Class</DialogTitle>
              <DialogDescription>
                Find a Class
              </DialogDescription>
              <Separator />
              <JoinClassForm user={{ user_id: user.user?.uid }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <Suspense fallback={<div>Loading...</div>}>
          <Search placeholder="TODO: Make this functional" />
        </Suspense>
      </div>

      <div className="mt-3">
        <h1 className="text-2xl font-bold">Owned Classes</h1>
        <ClassAdminFeed />
        <h1 className="text-2xl font-bold">Joined Classes</h1>
        <ClassFeed/>
      </div>

    </div>
  );
}