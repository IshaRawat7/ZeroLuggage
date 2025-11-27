"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Home, CalendarPlus, Clock, Wallet, Crown, ShieldCheck } from "lucide-react"

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
        "group flex items-center sticky z-20 gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        active && "bg-primary/10 text-primary",
        className,
      )}
      aria-current={active ? "page" : undefined}
    >
      {Icon ? (
        <Icon
          className={cn(
            "size-6 shrink-0",
            active ? "text-sky-600" : "text-sky-600 hover:bg-sky-50",
          )}
        />
      ) : null}
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
      className={cn("flex h-full w-64 flex-col border-r bg-background", className)}
      role="navigation"
      aria-label="Sidebar"
    >
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="size-6 rounded-md bg-primary" aria-hidden />
        <span className="text-lg  font-bold  font-sans tracking-tight">ZeroLuggage</span>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          {nav.map((item) => {
            if (item.children?.length) {
              const sectionPrefix = "/dashboard/bookings"
              return (
                <Accordion
                  key={item.label}
                  type="single"
                  collapsible
                  defaultValue={isSectionActive(sectionPrefix) ? item.label : undefined}
                  className="mb-1"
                >
                  <AccordionItem value={item.label} className="">
                    <AccordionTrigger className="px-3 py-2 hover:no-underline">
                      <div className="flex items-center gap-3">
                        {item.icon ? <item.icon className="size-4 text-muted-foreground" /> : null}
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-1 grid gap-1">
                        {item.children.map((child) => (
                          <ItemLink
                            key={child.label}
                            href={child.href}
                            icon={child.icon}
                            label={child.label}
                            active={isActive(child.href)}
                            className="ml-8"
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
      <div className=" p-3 py-56" >
        <Button variant="outline" className="w-full justify-center bg-transparent">
          <Link href="/#">Log out</Link>
        </Button>
      </div>
    </div>
  )
}

export default AppSidebar
