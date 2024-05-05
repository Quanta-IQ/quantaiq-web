"use client";
import { AuthContext} from "../../providers/AuthProvider";
import useUserConvexData from "../../hooks/useUserConvexData";
import {api} from "../../convex/_generated/api";
import ClassCard from "../class/class-card";
import { useQuery } from "convex/react";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";


export default function ClassFeed({params} : {params: {slug: string}}) {


    const getClasses = useQuery(api.functions.classes.getClassesByCourse, {
 
        CourseID: params.slug as Id<"Courses">
    }) 


    return (
        <>  
            <div className="mt-3 flex flex-wrap gap-4">
                {getClasses?.map((course: any) => {
                    return <ClassCard 
                    key={course._id}
                    classID={course._id}
                    className={course.Name}
                    classDescription={course.Description}
                    creator={course.CreatorID} 
                    />
                })}

            </div>
      
        </>
    )
}
