"use client";


import React from "react";
import ClassHead from "@/components/class/class-header";


export default function Page({params} : {params: {slug: string}}) {

    
    return (
      <>
        <ClassHead classID={params.slug} />
        Test
      </>
    );
}