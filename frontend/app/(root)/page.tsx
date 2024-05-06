"use client"
import Image from "next/image";
import {SidebarContext} from "@/providers/SidebarProvider";
import LandingPage from "@/components/landing-page/landingpage";
export default function Home() {
  const {collapsed, setCollapsed}:any = SidebarContext();
  
  return (
    <LandingPage />
  );
}
