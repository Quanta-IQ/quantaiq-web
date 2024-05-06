import Link from "next/link"
import{
BookOpenIcon,
    BotIcon,
CirclePlusIcon,
ClipboardIcon,
GroupIcon
} from "lucide-react"

export default function DashCards() {
  return (
    <section className="w-full flex flex-row gap-4 h-72">
      <div className="w-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rounded-lg shadow-lg p-6 flex flex-col justify-between ">
        <div>
          <BookOpenIcon className="w-10 h-10 text-white" />
          <h3 className="text-2xl font-bold text-white mt-4">Create a Course</h3>
          <p className="text-gray-200 mt-2">Easily create a course as your knowledge base</p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#3B82F6] shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href="/courses"
        >
          Get Started
        </Link>
      </div>
 
      
      <div className="w-full bg-gradient-to-br from-[#EC4899] to-[#D946EF] rounded-lg shadow-lg p-6 flex flex-col justify-between">
        <div>
          <ClipboardIcon className="w-10 h-10 text-white" />
          <h3 className="text-2xl font-bold text-white mt-4">Class Maker</h3>
          <p className="text-gray-200 mt-2">Create and manage a class for your students.</p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#EC4899] shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href="/classes"
        >
          Get Started
        </Link>
      </div>
      <div className="w-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rounded-lg shadow-lg p-6 flex flex-col justify-between">
        <div>
          <BotIcon className="w-10 h-10 text-white" />
          <h3 className="text-2xl font-bold text-white mt-4">AI Lessonbot</h3>
          <p className="text-gray-200 mt-2">Personalize AI assistant for learning.</p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#3B82F6] shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href="#"
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}