"use client";
import { AuthContext} from "../../providers/AuthProvider";
import useUserConvexData from "../../hooks/useUserConvexData";
import {api} from "../../convex/_generated/api";
import ClassCard from "./class-card";
import { useQuery } from "convex/react";
import React from "react";


export default function ClassFeed() {
    const {user}: any = AuthContext();
    const userConvex = useUserConvexData();


    const getClassesJoined = useQuery(api.functions.students.getClassesForUser, {
        UserID: userConvex?._id 
    }) 
    
    return (
        <>  
            <div className="mt-3 flex flex-wrap gap-4">
                {getClassesJoined?.map((course: any) => {
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
