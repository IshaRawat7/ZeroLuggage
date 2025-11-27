"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CalendarClock,
  HandPlatter,
  MapPin,
  ShieldCheck,
  Truck,
  LocateFixed,
  BadgeCheck,
  DollarSign,
} from "lucide-react"

type Feature = {
  title: string
  description: string
  icon: React.ElementType
}

const howItWorks: Feature[] = [
  {
    title: "Book Effortlessly",
    description: "Schedule pickup in minutes with flexible timing that fits your trip.",
    icon: CalendarClock,
  },
  {
    title: "Seamless Pickup",
    description: "Couriers collect your bags from your location with secure handoff.",
    icon: HandPlatter,
  },
  {
    title: "Travel & Rest Easy",
    description: "Enjoy your journey hands‑free while we store and safeguard your bags.",
    icon: Truck,
  },
  {
    title: "Delivered Safely",
    description: "Get your luggage delivered to your next stop or back to you on time.",
    icon: MapPin,
  },
]

const whyChoose: Feature[] = [
  {
    title: "24/7 Service",
    description: "Round‑the‑clock availability for bookings and support.",
    icon: BadgeCheck,
  },
  {
    title: "Smart Pricing",
    description: "Clear, competitive rates with no hidden fees.",
    icon: DollarSign,
  },
  {
    title: "Live Tracking",
    description: "Follow your bags in real time from pickup to delivery.",
    icon: LocateFixed,
  },
  {
    title: "Secure Handling",
    description: "Tamper‑proof seals and insured couriers you can trust.",
    icon: ShieldCheck,
  },
]

function Grid({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title} className="h-full">
            <CardHeader className="flex flex-row items-center gap-3 px-24">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Icon className="h-5 w-5 text-sky-600" aria-hidden />
              </span>
             
            </CardHeader>
             <CardTitle className="text-base px-10">{item.title}</CardTitle>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="how-title" className="mb-6 text-center text-2xl font-semibold">
        How It Works
      </h2>
      <Grid items={howItWorks} />
    </section>
  )
}

export function WhyChoose() {
  return (
    <section id="why" aria-labelledby="why-title" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="why-title" className="mb-6 text-center text-2xl font-semibold">
        Why Choose ZeroLuggage?
      </h2>
      <Grid items={whyChoose} />
    </section>
  )
}
