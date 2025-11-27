"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export  default function Navbar() {
  return (
    <nav className="bg-sky-500 text-white ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-[.65rem]">
        {/* Left - Logo and Navigation */}
        <div className="flex items-center ">
         
          <div className="flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-sky-100 transition-colors">
              Home
            </Link>
            <Link href="/subscriptions" className="text-sm font-medium hover:text-sky-100 transition-colors">
              Subscriptions
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-sky-100 transition-colors">
              Products
            </Link>
          </div>
        </div>

        {/* Right - Chat and Avatar */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-sky-700">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}
