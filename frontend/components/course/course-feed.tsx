"use client";

import CourseCard from "./course-card";
import React from "react";
import { Course } from "@/schemas/course-schemas";
import { useCourses } from "@/hooks/useCourses";

export default function CourseFeed() {
    const courses = useCourses();

    if (!courses) {
        return <div>No courses found.</div>;
    }

    return (
        <div className="mt-3 flex flex-wrap gap-4">
            {courses.map((course: Course) => (
                <CourseCard 
                    key={course._id}
                    courseID={course._id}
                    courseName={course.CourseName}
                    courseDescription={course.CourseDescription}
                    creator={course.CreatorID}
                />
            ))}
        </div>
    );
};
