import {
    Card
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"


interface CourseCardProps {
    courseID: string
    courseName: string
    courseDescription: string
    creator: string
}

export default function CourseCard(
    {
        courseID,
        courseName,
        courseDescription,
        creator
    }: CourseCardProps
){
    return (
        <Card className="max-w-3xl p-3">
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{courseName}</h1>
                    <p className="text-gray-500 ">{courseDescription}</p>
                </div>
                <div className="flex items-center pt-4 gap-4">
                    <Button variant="secondary">
                        <a href={`/courses/${courseID}`}>
                            View Course
                        </a>
                    </Button>
                    <Button variant="secondary">
                        <a href={`/courses/${courseID}/edit`}>
                            Edit Course
                        </a>
                    </Button>
                </div>
            </div>
        </Card>
    )

}