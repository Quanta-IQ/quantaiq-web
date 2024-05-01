"use client"
import Image from "next/image";
import {SidebarContext} from "@/providers/SidebarProvider";

export default function Home() {
  const {collapsed, setCollapsed}:any = SidebarContext();
  return (
    <div className="pl-4" >
      Home
    </div>
  );
}
