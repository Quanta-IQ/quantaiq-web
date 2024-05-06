"use client"
import Image from "next/image";
import {SidebarContext} from "@/providers/SidebarProvider";
import LandingPage from "@/components/landing-page/landingpage";
import { AuthContext } from "@/providers/AuthProvider";
import useUserConvexData from "@/hooks/useUserConvexData";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import DashCards from "@/components/dashboard/dashcards"
export default function Home() {
  const {collapsed, setCollapsed}:any = SidebarContext();
  const {user}:any = AuthContext();
  const convexUser = useUserConvexData();
  if (user.isLogin && convexUser) return (
    <>
      <div className="pl-4 w-full container">
        <div className="p-8 flex flex-col gap-3 w-full">
          <h1 className="text-4xl font-semibold  w-full ">
            Welcome to quanta IQ {convexUser.Role} platform 
          </h1>
          <h1 className="text-2xl font-semibold  w-full pt-4 ">
            Let us Start with the basics
          </h1>
          
        </div>
          <DashCards />

        
            </div>
    
    </>
  );
  if (!user.isLogin) return (
    <>
      <LandingPage />
    </>
  );
}
