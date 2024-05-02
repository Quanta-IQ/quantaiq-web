import {
    Card
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"
import Link from "next/link"


interface TestCardProps {
    testID: string
    testName: string
    testDescription: string
}

export default function TestCard(
    {
        testID,
        testName,
        testDescription,
    }: TestCardProps
) {
    return (
        <Card className="max-w-3xl p-3">
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{testName}</h1>
                    <p className="text-gray-500 ">{testDescription}</p>
                </div>
                <div className="flex items-center pt-4 gap-4">
                    <Link href={`/tests/${testID}`}>
                        <Button variant="secondary">
                            Take Test
                        </Button>
                    </Link>
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