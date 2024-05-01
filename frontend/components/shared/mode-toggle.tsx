"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarContext } from "@/providers/SidebarProvider"

export function ModeToggle() {
  const { setTheme } = useTheme()
  
  let {collapsed}:any = SidebarContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer gap-4 p-4 pl-6 items-center">
          <Sun className="block dark:hidden text-gray-500 dark:text-gray-200" />
          <Moon className="hidden dark:block text-gray-500 dark:text-gray-200" />
          {!collapsed && <span className="text-sm text-gray-500 dark:text-gray-200 ">Mode</span>}
        </button>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
