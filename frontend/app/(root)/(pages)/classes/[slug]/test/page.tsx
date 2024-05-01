"use client";


import React from "react";
import ClassHead from "@/components/class/class-header";
import TestFeed from "@/components/test/test-feed";

export default function Page({params} : {params: {slug: string}}) {

    
    return (
      <>
        <ClassHead classID={params.slug} />
        <TestFeed classID={params.slug}/>
      </>
    );
}