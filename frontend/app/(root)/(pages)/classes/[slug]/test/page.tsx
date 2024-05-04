"use client";


import React from "react";
import ClassHead from "@/components/class/class-header";
import TestFeed from "@/components/test/test-feed";

export default function Page({params} : {params: {slug: string}}) {

    
    return (
      <div className="ml-4">
        <TestFeed classID={params.slug}/>
      </div>
    );
}