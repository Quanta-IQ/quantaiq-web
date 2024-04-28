"use client"
import {useQuery} from "convex/react";
import Image from "next/image";
import React from "react";
import Search from "@/components/ui/search";
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


export default function CourseHead(
    {courseID} : {courseID: string}
){
    const [hideTitle, setHideTitle] = React.useState(false);

    const courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: courseID as Id<"Courses">
    }) 
    console.log(courseInfo)

    return (
      <>
      {courseInfo && <div className="pt-4  bg-white">
        
          {!hideTitle && 
          <div className="flex flex-row justify-between pb-2 pl-4">
          <div>
            <h1 className="text-3xl font-bold">{courseInfo.CourseName}</h1>
            <p className="text-gray-500 "> {courseInfo.CourseDescription}</p>
          </div>
          </div>
          }
          
          <div className="flex flex-row items-center  gap-4 pb-4 pl-4">
          <Button variant={window.location.pathname.includes('/syllabus') ? 'default' : 'secondary'}>
            <NotebookPen className="h-4 w-4 mr-2" />
            <Link href={`/courses/${courseInfo._id}/syllabus`}>
            Syllabus
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/lessons') ? 'default' : 'secondary'}>
            <BookType className="h-4 w-4 mr-2" />
            <Link href={`/courses/${courseInfo._id}/lessons`}>
            Lessons
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/test') ? 'default' : 'secondary'}>
            <FilePenLine className="h-4 w-4 mr-2" />
            <Link href={`/courses/${courseInfo._id}/test`}>
            Test
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/class') ? 'default' : 'secondary'}>
            <Presentation className="h-4 w-4 mr-2" />
            <Link href={`/courses/${courseInfo._id}/class`}>
            Classes
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/ai') ? 'default' : 'secondary'}>
            <Bot className="h-4 w-4 mr-2" />
            <Link href={`/courses/${courseInfo._id}/ai`}>
            AI Tools
            </Link>
          </Button>
          <Button variant={window.location.pathname.includes('/edit') ? 'default' : 'secondary'}>
          <Settings className="h-4 w-4 mr-2" />
            <Link href={`/courses/${courseInfo._id}/edit`}>
            Edit Details
            </Link>
          </Button>
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