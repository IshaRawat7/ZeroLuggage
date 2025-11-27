"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


const navItems = [
  { href: "Home"},
  { href: "Subscriptions"},
  { href: "Policies" },

]


export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-sky-600 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
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
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button  className="hidden md:inline-flex bg-white text-black hover:bg-white hover:text-black">
            
            <Link href="/login">Chat</Link>
          </Button>
          <Button asChild>
            <Link href="#book">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
