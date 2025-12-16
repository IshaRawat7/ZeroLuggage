"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AppSidebar } from "./app-sidebar"

export default function SidebarWrapper() {
  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <AppSidebar />
          </SheetContent>
        </Sheet>
        <span className="font-bold text-sky-700">ZeroLuggage</span>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen">
        <AppSidebar />
      </div>
    </>
  )
}
