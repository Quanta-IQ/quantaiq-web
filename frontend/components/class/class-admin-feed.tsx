"use client";
import { AuthContext} from "../../providers/AuthProvider";
import useUserConvexData from "../../hooks/useUserConvexData";
import {api} from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import ClassCardAdmin from "./class-card-admin";


export default function ClassAdminFeed() {
    const {user}: any = AuthContext();
    const userConvex = useUserConvexData();

    const getClassesCreated = useQuery(api.functions.classes.getClassesCreatedByUser, {
        UserID: userConvex?._id 
    })

    return (
        <>            
            <div className="mt-3 flex flex-wrap gap-4">
                {getClassesCreated?.map((course: any) => {
                    return <ClassCardAdmin 
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
