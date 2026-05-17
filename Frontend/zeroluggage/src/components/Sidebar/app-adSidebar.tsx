"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

import {
  ScrollArea,
} from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { useSidebar } from "@/components/ui/sidebar"

import {
  Home,
  Upload,
  ScanFace,
  BarChart3,
  Eye,
  FileText,
  Boxes,
  Server,
  Camera,
  History,
  LogOut,
  ChevronLeft,
} from "lucide-react"

import Image from "next/image"
import Img3 from "@/public/lugg.png"

type NavItem = {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

const nav: NavItem[] = [
  { label: "Dashboard", href: "/adDashboard", icon: Home },

  { label: "Upload Image", href: "/adDashboard/upload", icon: Upload },
  { label: "Live Camera", href: "/adDashboard/camera", icon: Camera },

  { label: "Analytics", href: "/adDashboard/analytics", icon: BarChart3 },
  { label: "Monitor", href: "/adDashboard/app-monitor", icon: Server },
  { label: "Playground", href: "/adDashboard/playground", icon: Boxes },
 

  { label: "History", href: "/adDashboard/history", icon: History },
]

function ItemLink({
  href,
  icon: Icon,
  label,
  active,
  open,
  setOpen,
}: any) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      onClick={() => {
        if (window.innerWidth < 768) setOpen(false)
      }}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
        pathname === href
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
        !open && "md:justify-center md:px-2"
      )}
    >
      {Icon && <Icon className="size-5 text-gray-400 group-hover:text-blue-500" />}
      {open && <span>{label}</span>}
    </Link>
  )
}

export function AppSidebar({ className }: { className?: string }) {
  const { open, setOpen } = useSidebar()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // IMPORTANT if you switch to cookies later
      })
    } catch (err) {
      console.error(err)
    } finally {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  return (
    <div
      className={cn(
        "z-40 flex flex-col border-r bg-white shadow-lg transition-all duration-300 overflow-hidden",
        open ? "w-64" : "w-16",
        "h-screen sticky top-0",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-4 bg-blue-50">
        <Image src={Img3} alt="logo" width={36} height={36} className="rounded-md" />
        {open && <Link href={"/"}> <span className="font-extrabold text-xl text-blue-700">CV Dashboard</span></Link>}
      </div>

      <Separator />

      {/* Toggle */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
        >
          <ChevronLeft className={cn(!open && "rotate-180")} />
        </Button>
      </div>

      {/* NAV */}
      <ScrollArea className="flex-1 px-2">
        {nav.map((item) => (
          <ItemLink
            key={item.href}
            {...item}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="outline"
          className={cn(
            "w-full gap-2",
            !open && "justify-center"
          )}
        >
          <LogOut className="size-5" />
          {open && "Logout"}
        </Button>
      </div>
    </div>
  )
}

export default AppSidebar