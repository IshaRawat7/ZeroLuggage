"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"))
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    } catch (err) {
      console.error("Logout error", err)
    } finally {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-sky-600/90 backdrop-blur-md shadow-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-sky-600 font-bold text-lg shadow"
            )}
          >
            Z
          </span>
          <span className="font-bold text-white text-lg md:text-xl tracking-wide">
            ZeroLuggage
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative text-md font-medium text-white hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isLoggedIn && (
            <Button className="hidden md:inline-flex bg-white text-sky-600 font-semibold hover:bg-black hover:text-white shadow-md transition-all">
              <Link href="/login">Log in</Link>
            </Button>
          )}

          <Button
            asChild
            className="bg-black hover:bg-gray-800 text-white font-semibold shadow-md px-4 py-2 md:px-6 md:py-3 rounded-lg transition-transform hover:scale-105"
            onClick={() => {
              const section = document.querySelector("#book")
              if (section) section.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <Link href="#book">Book Now</Link>
          </Button>

          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-3 rounded-full ring-2 ring-sky-400 ring-offset-2 hover:ring-black transition-all outline-none">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-white text-sky-600 font-semibold">
                      JD
                    </AvatarFallback>
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

                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
