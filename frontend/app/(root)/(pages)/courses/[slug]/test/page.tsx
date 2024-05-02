"use client";

import React from "react";
import CourseHead from "@/components/course/course-header";
import TestCard from "@/components/course/test/test-card";
import CreateTestPanel from "@/components/course/test/test-panel";

export default function Page({params} : {params: {slug: string}}) {
  
    return (
      <>
     
        <div className="w-full pt-2 pl-4">
          {/* <TestCard
          courseID={params.slug}
          /> */}
          <CreateTestPanel
          courseID={params.slug}
          />
        </div>
        
      </>
    );
}
