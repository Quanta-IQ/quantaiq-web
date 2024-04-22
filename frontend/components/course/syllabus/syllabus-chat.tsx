"use client"
import {
    Card
} from "@/components/ui/card"
import {useQuery} from "convex/react";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";

export default function SyllabusChat(
    {courseID} : {courseID: string}
){

    return (
        <>
            <div className="w-full">
                Chat for Course {courseID}
            </div>
        </>
    )
}