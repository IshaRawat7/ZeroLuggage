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
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#how", label: "How it works" },
  { href: "#why", label: "Why us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#support", label: "Support" },
]

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
    <header className="sticky top-0 z-50 w-full bg-sky-600/90 backdrop-blur-md shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-sky-600 font-bold text-lg shadow">
            Z
          </span>
          <span className="font-bold text-white text-lg md:text-xl">
            ZeroLuggage
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative font-medium text-white hover:text-black transition-colors
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black
                after:transition-all hover:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isLoggedIn && (
            <Button className="hidden md:inline-flex bg-white text-sky-600 hover:bg-black hover:text-white">
              <Link href="/login">Log in</Link>
            </Button>
          )}

          <Button
            asChild
            className="bg-black text-white px-4 md:px-6 hover:bg-gray-800"
          >
            <Link href="#book">Book Now</Link>
          </Button>

          {/* Avatar */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-2 rounded-full ring-2 ring-sky-400 ring-offset-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-2 text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="bg-sky-700 px-4 py-4 space-y-3">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white font-medium"
            >
              {n.label}
            </Link>
          ))}

          {!isLoggedIn && (
            <Link
              href="/login"
              className="block text-white font-medium pt-2"
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
