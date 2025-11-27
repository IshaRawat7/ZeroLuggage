"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#how", label: "How it works" },
  { href: "#why", label: "Why us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#support", label: "Support" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-sky-600 backdrop-blur">
      <div className="mx-auto flex  items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground",
            )}
          >
            Z
          </span>
          <span className="font-semibold">ZeroLuggage</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex ">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-white hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex bg-white text-black hover:bg-white hover:text-black">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild onClick={() => {
    const section = document.querySelector("#book")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }}>
            <Link href="#book">Book Now</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-2 outline-hidden hover:opacity-80 transition-opacity">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                  <AvatarFallback className="bg-white text-sky-600 font-semibold">JD</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dasboard" className="cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
