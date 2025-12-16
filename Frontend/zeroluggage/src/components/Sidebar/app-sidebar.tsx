"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Home, CalendarPlus, Clock, Wallet, Crown, ShieldCheck, LogOut } from "lucide-react"

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
      window.location.href = "/" //home page
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
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
        "hover:bg-sky-50 hover:text-sky-700",
        active
          ? "bg-sky-100 text-sky-700 font-semibold shadow-md"
          : "text-gray-700",
        className,
      )}
      aria-current={active ? "page" : undefined}
    >
      {Icon && (
        <Icon
          className={cn(
            "size-5 shrink-0 transition-colors duration-200",
            active ? "text-sky-600" : "text-gray-400 group-hover:text-sky-500"
          )}
        />
      )}
      <span className="truncate">{label}</span>
    </Link>
  )
}

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const isActive = (href?: string) => (href ? pathname === href : false)
  const isSectionActive = (prefix: string) => pathname.startsWith(prefix)

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col border-r bg-white shadow-lg",
        className
      )}
      role="navigation"
      aria-label="Sidebar"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-5 bg-sky-50 rounded-b-lg shadow-sm">
        <div className="size-7 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
          Z
        </div>
        <span className="text-xl font-bold tracking-tight text-sky-700">
          ZeroLuggage
        </span>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="px-3 py-4 space-y-1">
          {nav.map((item) => {
            if (item.children?.length) {
              const sectionPrefix = "/dashboard/bookings"
              return (
                <Accordion
                  key={item.label}
                  type="single"
                  collapsible
                  defaultValue={isSectionActive(sectionPrefix) ? item.label : undefined}
                  className="mb-1 rounded-lg"
                >
                  <AccordionItem value={item.label}>
                    <AccordionTrigger className="px-4 py-3 hover:bg-sky-50 rounded-lg transition-all duration-200">
                      <div className="flex items-center gap-3">
                        {item.icon && <item.icon className="size-5 text-gray-400 group-hover:text-sky-500" />}
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-1 flex flex-col gap-1">
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
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            }
            return (
              <ItemLink
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={isActive(item.href)}
              />
            )
          })}
        </div>
      </ScrollArea>

      {/* Logout */}
      <div className="px-5 py-6 border-t">
        <Button
        onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-sky-50 hover:text-sky-700"
        >
          <LogOut className="size-5 text-gray-500 group-hover:text-sky-500" />
          Log out
        </Button>
      </div>
    </div>
  )
}

export default AppSidebar 