"use client";

import React from "react";
import CourseHead from "@/components/course/course-header";
import CreateTestPanel from "@/components/course/test/test-panel";

export default function Page({params} : {params: {slug: string}}) {
  
    return (
      <>
     
        <div className="w-full pt-2 pl-4">
          <CreateTestPanel
          courseID={params.slug}
          />
        </div>
        
      </>
    );
}
