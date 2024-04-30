"use client";

import React from "react";
import CourseHead from "@/components/course/course-header";
import TestCard from "@/components/course/test/test-card";
export default function Page({params} : {params: {slug: string}}) {
  
    return (
      <>
     
        <CourseHead courseID={params.slug} />
        <div className="w-full pt-2">
          <TestCard
          courseID={params.slug}
          />
        </div>
        
      </>
    );
}
