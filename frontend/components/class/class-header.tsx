"use client"
import {useQuery} from "convex/react";
import Image from "next/image";
import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import {Separator} from "@/components/ui/separator";
import {NotebookPen,
  BookType,
  FilePenLine,
  Presentation,
  Bot,
  Settings
} from "lucide-react";


export default function ClassHead(
    {classID} : {classID: string}
){
    const [hideTitle, setHideTitle] = React.useState(false);

    const classInfo = useQuery(api.functions.classes.getClassByClassID, {
        ClassID: classID as Id<"Classes">
    }) 
    console.log(classInfo)

    return (
      <>
      {classInfo && <div className="pt-4  bg-background">
        
          {!hideTitle && 
          <div className="flex flex-row justify-between pb-2 pl-4">
          <div>
            <h1 className="text-3xl font-bold">{classInfo.Name}</h1>
            <p className="text-gray-500 "> {classInfo.Description}</p>
          </div>
          </div>
          }
          
          <div className="flex flex-row items-center  gap-4 pb-4 pl-4">
          <Link href={`/classes/${classInfo._id}/syllabus`}>
          <Button variant={window.location.pathname.includes('/syllabus') ? 'default' : 'secondary'}>
            <NotebookPen className="h-4 w-4 mr-2" />
            Syllabus
          </Button>
          </Link>
          <Link href={`/classes/${classInfo._id}/lessons`}>
          <Button variant={window.location.pathname.includes('/lessons') ? 'default' : 'secondary'}>
            <BookType className="h-4 w-4 mr-2" />
            Lessons
          </Button>
          </Link>
          <Link href={`/classes/${classInfo._id}/test`}>
          <Button variant={window.location.pathname.includes('/test') ? 'default' : 'secondary'}>
            <FilePenLine className="h-4 w-4 mr-2" />
            Tests
          </Button>
          </Link>
          {/* <Button variant={window.location.pathname.includes('/ai') ? 'default' : 'secondary'}>
            <Bot className="h-4 w-4 mr-2" />
            <Link href={`/courses/${classInfo._id}/ai`}>
            AI Tools
            </Link>
          </Button> */}
          {/* <Button variant={window.location.pathname.includes('/edit') ? 'default' : 'secondary'}>
          <Settings className="h-4 w-4 mr-2" />
            <Link href={`/courses/${classInfo._id}/edit`}>
            Edit Details
            </Link>
          </Button> */}
          <Button variant="outline" onClick={() => setHideTitle(!hideTitle)}>
            {!hideTitle && <Image
              src="/assets/up.svg"
              alt="logout"
              width={24}
              height={24}
            />}
            {
              hideTitle && <Image
              src="/assets/down.svg"
              alt="logout"
              width={24}
              height={24}
            />
            }
          </Button>
          </div>
          <Separator />
        </div>
        }
      </>
    )
}