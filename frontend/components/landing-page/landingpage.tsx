"use client"
import Image from "next/image";
import {SidebarContext} from "@/providers/SidebarProvider";
import { Hero } from "./hero";
import { Testimonials } from "./testimonials";
import { HowItWorks } from "./howitworks";
import { Footer } from "./footer";
import { FAQ } from "./faq";
import { Newsletter } from "./joinus";

export default function Home() {
  const {collapsed, setCollapsed}:any = SidebarContext();
  return (
    <>
        <div className="pt-16 h-full">
            <Hero />
            <HowItWorks />
            <Testimonials />
            <Newsletter />
            <FAQ />
            <Footer />
        </div>
    </>
  );
}
