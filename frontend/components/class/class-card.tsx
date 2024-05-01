import {
    Card
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"
import Link from "next/link"


interface ClassCardProps {
    classID: string
    className: string
    classDescription: string
    creator: string
}

export default function ClassCard(
    {
        classID,
        className,
        classDescription,
        creator
    }: ClassCardProps
){
    return (
        <Card className="max-w-3xl p-3">
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{className}</h1>
                    <p className="text-gray-500 ">{classDescription}</p>
                </div>
                <div className="flex items-center pt-4 gap-4">
                    <Button variant="secondary">
                        <Link href={`/classes/${classID}`}>
                            View Class
                        </Link>
                    </Button>
                    {/* <Button variant="secondary">
                        <Link href={`/courses/${classID}/edit`}>
                            Edit Class
                        </Link>
                    </Button> */}
                </div>
            </div>
        </Card>
    )

}