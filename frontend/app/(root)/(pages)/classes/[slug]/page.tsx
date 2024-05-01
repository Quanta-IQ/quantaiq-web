"use client";


import React from "react";
import ClassHead from "@/components/class/class-header";


export default function Page({params} : {params: {slug: string}}) {

    
    return (
      <div className="ml-4">
        <ClassHead classID={params.slug} />
        Class
      </div>
    );
}