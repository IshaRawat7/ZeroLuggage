"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { useSidebar } from "@/components/ui/sidebar"

import { Home, CalendarPlus, Clock, Wallet, Crown, ShieldCheck, LogOut, ChevronLeft } from "lucide-react"

type NavItem = {
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: Array<{ label: string; href: string; icon?: React.ComponentType<{ className?: string }> }>
}

const nav: NavItem[] = [
  { label: "Dashboard", href: "/dasboard/dash", icon: Home },
  {
    label: "Bookings",
    icon: CalendarPlus,
    children: [
      { label: "New Booking", href: "/dasboard/booking/newbooking", icon: CalendarPlus },
      { label: "History", href: "/dasboard/booking/history", icon: Clock },
    ],
  },
  { label: "Payments", href: "/dasboard/payment", icon: Wallet },
  { label: "Subscriptions", href: "/dasboard/subscriptions", icon: Crown },
  { label: "Policies", href: "/dasboard/policies", icon: ShieldCheck },
]

const handleLogout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
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
    window.location.href = "/"
  }
}

function ItemLink({
  href = "#",
  icon: Icon,
  label,
  active,
  className,
}: {
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  label: string
  active?: boolean
  className?: string
}) {
  const { setOpen, open } = useSidebar()

  return (
    <Link
      href={href}
      onClick={() => {
        if (window.innerWidth < 768) {
          setOpen(false)
        }
      }}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
        active ? "bg-sky-100 text-sky-700" : "text-gray-700 hover:bg-sky-50 hover:text-sky-700",
        !open && "md:justify-center md:px-2",
        className,
      )}
    >
      {Icon && <Icon className="size-5 text-gray-400 group-hover:text-sky-500" />}
      {open && <span className="truncate">{label}</span>}
    </Link>
  )
}

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { open, setOpen } = useSidebar()

  const isActive = (href?: string) => (href ? pathname === href : false)

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          open ? "w-64" : "w-0 md:w-16",
          "md:sticky md:top-0 md:h-screen",
          className,
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-5 bg-sky-50">
          {open && (
            <>
              <div className="size-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                Z
              </div>
              <span className="text-xl font-bold text-sky-700">ZeroLuggage</span>
            </>
          )}
          {!open && (
            <div className="hidden md:flex size-7 rounded-full bg-sky-600 text-white items-center justify-center font-bold text-sm mx-auto">
              Z
            </div>
          )}
        </div>

        <Separator />

        <div className="hidden md:flex justify-end px-2 py-2">
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="size-8 hover:bg-sky-100">
            <ChevronLeft className={cn("size-4 transition-transform", !open && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <div className="px-3 py-4 space-y-1">
            {nav.map((item) =>
              item.children ? (
                <Accordion key={item.label} type="single" collapsible>
                  <AccordionItem value={item.label}>
                    <AccordionTrigger
                      onClick={(e) => {
                        if (!open) {
                          e.preventDefault()
                          setOpen(true)
                        }
                      }}
                      className={cn(
                        "px-4 py-3 hover:no-underline hover:bg-sky-50 rounded-lg transition-colors",
                        !open && "md:justify-center md:px-2",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && <item.icon className="size-5 text-gray-400" />}
                        {open && <span className="text-sm font-medium text-gray-700">{item.label}</span>}
                      </div>
                    </AccordionTrigger>
                    {open && (
                      <AccordionContent>
                        {item.children.map((child) => (
                          <ItemLink
                            key={child.label}
                            href={child.href}
                            icon={child.icon}
                            label={child.label}
                            active={isActive(child.href)}
                            className="ml-6"
                          />
                        ))}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
              ) : (
                <ItemLink
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.href)}
                />
              ),
            )}
          </div>
        </ScrollArea>

        {/* Logout */}
        <div className="px-5 py-6 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className={cn(
              "w-full gap-2 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 transition-colors bg-transparent",
              !open && "md:px-2 md:justify-center",
            )}
          >
            <LogOut className="size-5" />
            {open && "Log out"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default AppSidebar 