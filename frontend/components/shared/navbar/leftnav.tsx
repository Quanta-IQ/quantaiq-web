"use client";

import { sidebarLinks } from "../../../constants/";
import { AuthContext } from "../../../providers/AuthProvider";
import { auth } from "../../../services/firebase";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter} from 'next/navigation'
import React from "react";
import { useEffect } from "react";



function LeftSidebar() {

    const pathname = usePathname();

    const {user}:any = AuthContext();
    const [isHidden, setIsHidden] = React.useState(false);



    const hideLeftBar = () => {
        setIsHidden(!isHidden);
    }
 

    if (user.isLogin) {return (
      
        
        <div className={`min-w-20 custom-scrollbar leftsidebar  ${isHidden ? 'w-[80px]' : 'w-[190px]'} gap-8  content-between `}>
            <div className="flex w-full flex-1 flex-col gap-3 px-3 ">
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
            </div>
            

            <div className="object-bottom">
                
                        <div className="flex cursor-pointer gap-4 p-4 pl-6" onClick={hideLeftBar}>
                            {!isHidden && <Image
                                src="/assets/left.svg"
                                alt="logout"
                                width={24}
                                height={24}
                            />}
                            {
                                isHidden && <Image
                                src="/assets/right.svg"
                                alt="logout"
                                width={24}
                                height={24}
                            />
                            }
                            {!isHidden && <p className="text-gray-300 "> Hide </p>}
                        </div>
                
            </div>
            
        </div>
       
    )}
}

export default LeftSidebar;