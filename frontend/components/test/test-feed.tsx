"use client";
import { AuthContext} from "../../providers/AuthProvider";
import useUserConvexData from "../../hooks/useUserConvexData";
import {api} from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import TestCard from "./test-card";
import { Id } from "@/convex/_generated/dataModel";


export default function TestFeed(
    {classID} : {classID: string}
) {  
    const getTests = useQuery(api.functions.tests.fetchTests, {
         ClassID: classID as Id<"Classes">
    })
        return (
            <>  
            <div className="mt-3 flex flex-wrap gap-4">
                {getTests?.map((test: any) => {
                    return <TestCard 
                    key={test._id}
                    testID={test._id}
                    testName={test.Metadata?.TestName}
                    testDescription={test.Metadata?.Description}
                    />
                })}

            </div>
      
        </>
        );
    }
