"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, HandPlatter, MapPin, ShieldCheck, Truck, LocateFixed, BadgeCheck, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

type Feature = {
  title: string
  description: string
  icon: React.ElementType
}

const howItWorks: Feature[] = [
  { title: "Book Effortlessly", description: "Schedule pickup in minutes with flexible timing that fits your trip.", icon: CalendarClock },
  { title: "Seamless Pickup", description: "Couriers collect your bags from your location with secure handoff.", icon: HandPlatter },
  { title: "Travel & Rest Easy", description: "Enjoy your journey hands‑free while we store and safeguard your bags.", icon: Truck },
  { title: "Delivered Safely", description: "Get your luggage delivered to your next stop or back to you on time.", icon: MapPin },
]

const whyChoose: Feature[] = [
  { title: "24/7 Service", description: "Round‑the‑clock availability for bookings and support.", icon: BadgeCheck },
  { title: "Smart Pricing", description: "Clear, competitive rates with no hidden fees.", icon: DollarSign },
  { title: "Live Tracking", description: "Follow your bags in real time from pickup to delivery.", icon: LocateFixed },
  { title: "Secure Handling", description: "Tamper‑proof seals and insured couriers you can trust.", icon: ShieldCheck },
]

function Grid({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, idx) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl hover:scale-105 transform-gpu">
              <CardHeader className="flex flex-col items-center gap-3 py-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400 to-sky-600 text-white shadow-md">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <CardTitle className="text-center text-lg font-semibold mt-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 text-center">
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="mx-auto max-w-7xl px-4 py-16">
      <h2 id="how-title" className="mb-10 text-center text-3xl font-bold text-sky-900 relative inline-block">
        How It Works
        <span className="absolute left-1/2 -bottom-2 h-1 w-24 -translate-x-1/2 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full"></span>
      </h2>
      <Grid items={howItWorks} />
    </section>
  )
}

export function WhyChoose() {
  return (
    <section id="why" aria-labelledby="why-title" className="mx-auto max-w-7xl px-4 py-16">
      <h2 id="why-title" className="mb-10 text-center text-3xl font-bold text-sky-900 relative inline-block">
        Why Choose ZeroLuggage?
        <span className="absolute left-1/2 -bottom-2 h-1 w-24 -translate-x-1/2 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full"></span>
      </h2>
      <Grid items={whyChoose} />
    </section>
  )
}
