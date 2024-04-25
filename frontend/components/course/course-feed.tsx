"use client";
import {useEffect} from "react";
import { AuthContext} from "../../providers/AuthProvider";
import useUserConvexData from "../../hooks/useUserConvexData";
import {useRouter} from "next/navigation";
import {api} from "../../convex/_generated/api";
import CourseCard from "./course-card";
import { useQuery } from "convex/react";
import React from "react";


export default function CourseFeed() {
    const {user}: any = AuthContext();
    const userConvex = useUserConvexData();

    const getCoursesCreated = useQuery(api.functions.courses.getCoursesCreatedByUser, {
        UserID: userConvex?._id 
    })

    console.log(getCoursesCreated);


    return (
        <>
            
            <div className="mt-3 flex flex-wrap gap-4">
                {getCoursesCreated?.map((course: any) => {
                    return <CourseCard 
                    key={course._id}
                    courseID={course._id}
                    courseName={course.CourseName}
                    courseDescription={course.CourseDescription}
                    creator={course.CreatorID} 
                    />
                })}

            </div>
      
        </>
    )
}
