"use client"
import Image from "next/image";
import {SidebarContext} from "@/providers/SidebarProvider";
import LandingPage from "@/components/landing-page/landingpage";
import { AuthContext } from "@/providers/AuthProvider";
export default function Home() {
  const {collapsed, setCollapsed}:any = SidebarContext();
  const {user}:any = AuthContext();
  if (user.isLogin) return (
    <>
    
    </>
  );
  if (!user.isLogin) return (
    <>
      <LandingPage />
    </>
  );
}
