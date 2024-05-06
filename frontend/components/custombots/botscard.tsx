import {
    Card
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"
import Link from "next/link"


interface Bots {
    classID?: string | null,
    botId: string
    Name: string
    Instructions: string
}

export default function BotCard(
    {
        classID,
        botId,
        Name,
        Instructions,
    }: Bots
) {


    if(classID) return (
        <Card className="max-w-3xl p-3 w-96">
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold overflow-hidden text-ellipsis">{Name}</h1>
                    <p className="text-gray-500 overflow-hidden text-ellipsis ">{Instructions}</p>
                </div>
                <div className="flex items-center pt-4 gap-4">
                    <Link href={`/classes/${classID}/ai?bot=${botId}`}>
                        <Button variant="secondary">
                            Chat
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
    if(!classID)return (
        <Card className="max-w-3xl p-3 w-96">
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold overflow-hidden text-ellipsis">{Name}</h1>
                    <p className="text-gray-500 overflow-hidden text-ellipsis ">{Instructions}</p>
                </div>
                <div className="flex items-center pt-4 gap-4">
                    <Link href={`/learn/${botId}`}>
                        <Button variant="secondary">
                            Chat
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