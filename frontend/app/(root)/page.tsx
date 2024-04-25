import Image from "next/image";
import ClassCarousel from "@/components/course/course-carousel";
export default function Home() {
  return (
    <div className="mb-4 mt-4 ml-4">
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-4xl font-bold">Home</h1>
      </div>
    </div>
    <div className="mt-3 mb-3 md:ml-10 lg:ml-16"> 
      <ClassCarousel/>
    </div>
  </div>      
);
}