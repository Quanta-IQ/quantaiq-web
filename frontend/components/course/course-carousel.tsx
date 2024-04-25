"use client"
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useCourses } from "@/hooks/useCourses";
import CourseCard from "./course-card";
import { Course } from "@/schemas/course-schemas";

export default function CourseCarousel() {
    const courses = useCourses();

    if (!courses) {
        return <div>Loading or no courses found</div>;
    }

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent className="grid grid-flow-col auto-cols-max gap-4">
                {courses.map((course: Course) => (
                    <CarouselItem key={course._id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <CourseCard
                                courseID={course._id}
                                courseName={course.CourseName}
                                courseDescription={course.CourseDescription}
                                creator={course.CreatorID}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

