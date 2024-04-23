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
    const router = useRouter();
    const pathname = usePathname();
    const auth = getAuth();
    const {user}:any = AuthContext();
    const logout = async () => {
        try {
          signOut(auth)
        } catch (error) {
          
        } finally {
          router.push("/")

        }
      };


    if (user.isLogin) {return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-3 px-3">
                {sidebarLinks.map((link) => {
                    const isActive = 
                    (pathname?.startsWith(link.route) && link.route.length > 1) ||
                    pathname === link.route;
                  
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link  ${isActive && "bg-primary text-white text-light-1 font-bold"} text-gray-700`}
                            >
                            <Image
                                src={isActive ? link.imgURL.replace(".svg", "-white.svg") : link.imgURL}
                                alt = {link.label}
                                width = {24}
                                height = {24}
                            /> 
                            <p className = " max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    )}
                )}
            </div>

            
        </section>

    )}
}

export default LeftSidebar;