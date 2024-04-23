import Image from "next/image";
import React from "react";
import Search from "@/components/ui/search";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import CourseCard from "../../../../components/course/course-card";
import CourseFeed from "../../../../components/course/course-feed";

export default function Home() {
  return (
      <div className="mb-4 mt-4 ml-4">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-4xl font-bold">Courses</h1>
            <p className="text-gray-500 "> Find your next course</p>
          </div>
          <div className="items-center pt-2">
            <Button  >
              <Link href="/courses/create">
              Create Course
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-3 mb-3"> 
          <Search placeholder="TODO: Make this functional" />
        </div>
        <div className="mt-3">
            <CourseFeed />
        </div>
        
      </div>
      
      

      

  );
}
