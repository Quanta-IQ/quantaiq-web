"use client";

import { sidebarLinks } from "../../../constants/";
import { AuthContext } from "../../../providers/AuthProvider";
import { auth } from "../../../services/firebase";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter} from 'next/navigation'
import React from "react";
import { useEffect, useContext, useState } from "react";
import {SidebarContext} from "@/providers/SidebarProvider";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CourseHead from "@/components/course/course-header";

import {ModeToggle} from "@/components/shared/mode-toggle";
import { ChevronLeft, ChevronRight, CircleUserRound, LogOutIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import ClassHead from "@/components/class/class-header";

function LeftSidebar() {
    const auth = getAuth();
    const {user}:any = AuthContext();
    const router = useRouter();
    const logout = async () => {
        try {
          signOut(auth)
        } catch (error) {
          
        } finally {
          router.push("/")

        }
      };
    const pathname = usePathname();
    const backRoute = pathname.substring(0, pathname.lastIndexOf("/")) || "/";
    console.log(backRoute)
    
    let {collapsed,setCollapsed , params, setParams}:any = SidebarContext();
    if(pathname==="/"){
        setParams(null)
    }
    if(backRoute === "/"){
        setParams(null)
    }

    const [isHidden, setIsHidden] = useState(collapsed);
    console.log("params", params);

    const hideLeftBar = () => {
        setIsHidden(!isHidden);
        setCollapsed(!isHidden);
    }
    let courseInfo = useQuery(api.functions.courses.getCourseByCourseID, {
        CourseID: params as Id<"Courses">
      }) 


    let classInfo = useQuery(api.functions.classes.getClassByClassID, {
      ClassID: params as Id<"Classes">
    }) 

    

    useEffect(() => {
        // Code to execute when params change
        console.log("Change")
    }, [params]);

    console.log("CourseInfo", courseInfo);
    console.log("LessonInfo", classInfo);

    if (user.isLogin) {return (
      
        
        <div className={`fixed h-100vh min-w-20 custom-scrollbar leftsidebar  ${isHidden ? 'w-[80px]' : 'w-[190px]'} gap-8   `}>

            <Link className="md:pb-2 w-full mt-2 pb-2 flex flex-row items-center gap-2 justify-center" href={backRoute} >
                <Image src="/assets/atomic.png" className="w-8 h-auto block dark:hidden"  alt="logo" width={100} height={100} />
                <Image src="/assets/atomic-white.png" className="w-8 h-auto hidden dark:block"  alt="logo" width={100} height={100} />
                {!isHidden && <p className="text-xl font-bold text-black dark:text-white">
                  quantaIQ
                </p>}
            </Link>
           
            {
                (courseInfo?.CourseName && !isHidden ) &&
                <div className="  flex w-full flex-1 flex-col gap-3 px-3 ">

                <div className="flex flex-col  pb-2 pl-4">
                    <h1 className="text-2xl font-bold text-black dark:text-white">{courseInfo.CourseName}</h1>
                    <p className="text-gray-500 text-xs "> {courseInfo.CourseDescription}</p>
                </div>
                <div className="px-4">

                    <CourseHead courseID={params} />
                </div>
                </div>

            }
            
            
            {
                courseInfo?.CourseName && isHidden && 
                <div className="  flex w-full flex-1 flex-col gap-3  ">
                    <div className="px-4">
                        <CourseHead courseID={params} />
                    </div>
                </div>
            }
            
            {
                (classInfo?.Name && !isHidden) &&
                <div className="  flex w-full flex-1 flex-col gap-3 px-3 ">
                    <div className="flex flex-col  pb-2 pl-4">
                    <h1 className="text-2xl font-bold text-black dark:text-white">{classInfo.Name}</h1>
                    <p className="text-gray-500 text-xs "> {classInfo.Description}</p>
                    </div>
                    <div className="px-4">
                        <ClassHead classID={classInfo._id}/>
                    </div>
                 </div>
                
            }
            {
                (classInfo?.Name && isHidden) &&
                <div className="  flex w-full flex-1 flex-col gap-3 px-3 ">
                        
                <div className="px-4">

                    <ClassHead classID={classInfo._id}/>
                </div>
                 </div>
                
            }
           


             {!courseInfo && !classInfo && <div className="flex w-full flex-1 flex-col gap-3 px-3 ">
                {sidebarLinks.map((link) => {
                    const isActive = 
                    (pathname?.startsWith(link.route) && link.route.length > 1) ||
                    pathname === link.route;
                  
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link  ${isActive && "bg-primary dark:text-black text-white  text-light-1 font-bold"} text-gray-700`}
                            >
                            <Image
                                src={isActive ? link.imgURL.replace(".svg", "-white.svg") : link.imgURL}
                                alt = {link.label}
                                width = {24}
                                height = {24}
                                className="dark:hidden block"
                            /> 
                            <Image
                                src={isActive ? link.imgURL : link.imgURL.replace(".svg", "-white.svg")  }
                                alt = {link.label}
                                width = {24}
                                height = {24}
                                className="dark:block hidden"
                            /> 
                            {!isHidden && <p>
                                {link.label}
                            </p>}
                        </Link>


                    )}
                )}
            </div>}

            

            <div className="object-bottom pb-0">
                <div className="flex flex-col">
                        <ModeToggle />
                        <div className="flex cursor-pointer gap-4 p-4 pl-6 items-center " onClick={hideLeftBar}>
                            {!isHidden && <ChevronLeft className="text-gray-500 dark:text-gray-200"/>}
                            {
                                isHidden && <ChevronRight className="text-gray-500 dark:text-gray-200" />
                            }
                            {!isHidden && <p className="text-gray-500 text-sm dark:text-gray-200"> Hide </p>}
                        </div>

                        
                        {user.isLogin && (
                              <>
                                    <button className=" flex cursor-pointer gap-4 p-4 pl-6 items-center" onClick={logout}>
                                            <LogOutIcon className="text-gray-500 dark:text-gray-200"/>
                                            {!isHidden && <p className="text-gray-500 text-sm dark:text-gray-200"> Sign Out </p>}
                                    </button>
                              </>
                        )}
                        <div className="flex cursor-pointer gap-4 p-4 pb-2 pl-6 items-center pt-12 h-10 text-black dark:text-white ">
                            
                            <CircleUserRound className="text-black dark:text-white"/>
                            {!isHidden && <p>Profile</p>}
                        </div>
                </div>
            </div>
            
        </div>
       
    )}
}

export default LeftSidebar;