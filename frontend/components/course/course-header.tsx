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
import { usePathname } from "next/navigation";
import { SidebarContext } from "@/providers/SidebarProvider";


export default function CourseHead(
    {courseID} : {courseID: string}
){

    const pathname = usePathname();
    let {collapsed}:any = SidebarContext();
    return (
      <>
       <div className="  bg-background">
        
         
          <div className="flex flex-col items-left  gap-4 pb-4">
          <Link href={`/courses/${courseID}/syllabus`} >
            <Button className="w-full" variant={pathname.includes('/syllabus') ? 'default' : 'secondary'}>
              <NotebookPen className="h-4 w-4 " />
              {!collapsed && <p>Syllabus</p>}
            </Button>
          </Link>
          <Link href={`/courses/${courseID}/lessons`}>
          <Button className="w-full" variant={pathname.includes('/lessons') ? 'default' : 'secondary'}>
            <BookType className="h-4 w-4 " />
            {!collapsed && <p>Lessons</p>}
            
          </Button>
          </Link>
          <Link href={`/courses/${courseID}/test`}>
          <Button className="w-full" variant={pathname.includes('/test') ? 'default' : 'secondary'}>
            <FilePenLine className="h-4 w-4 " />
            {!collapsed && <p>Test</p>}
            
          </Button>
          </Link>
          <Link href={`/courses/${courseID}/class`}>
          <Button className="w-full" variant={pathname.includes('/class') ? 'default' : 'secondary'}>
            <Presentation className="h-4 w-4 " />
            {!collapsed && <p>Classes</p>}
            
          </Button>
          </Link>
          <Link href={`/courses/${courseID}/ai`}>
          <Button className="w-full" variant={pathname.includes('/ai') ? 'default' : 'secondary'}>
            <Bot className="h-4 w-4 " />
            {!collapsed && <p>AI Tools</p>}
            
          </Button>
          </Link>
          {/* <Link href={`/courses/${courseID}/edit`}>
          <Button className="w-full" variant={pathname.includes('/edit') ? 'default' : 'secondary'}>
            <Settings className="h-4 w-4 " />
            {!collapsed && <p>Edit Details</p>}
            
          </Button>
          </Link> */}

          </div>
        </div>
        
      </>
    )
}