"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

type Testimonial = {
  name: string
  role: string
  quote: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    name: "Alice Johnson",
    role: "Business Traveler",
    quote: "Made my layover stress‑free. Booked in minutes and my bags arrived right on time.",
    initials: "AJ",
  },
  {
    name: "Mark Chen",
    role: "Photographer",
    quote: "Loved the real‑time tracking. I could explore without worrying about my gear.",
    initials: "MC",
  },
  {
    name: "Sarah Lee",
    role: "Vacationer",
    quote: "Fantastic experience! The courier was professional and super punctual.",
    initials: "SL",
  },
  {
    name: "John Miller",
    role: "Conference Speaker",
    quote: "ZeroLuggage handled everything seamlessly between hotel and venue.",
    initials: "JM",
  },
  {
    name: "Maria Gomez",
    role: "Backpacker",
    quote: "Affordable and reliable. It let me enjoy the city hands‑free for a day.",
    initials: "MG",
  },
  {
    name: "David Park",
    role: "Frequent Flyer",
    quote: "Secure seals and clear updates. Easily the best luggage service I’ve used.",
    initials: "DP",
  },
]

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="reviews-title" className="mb-8 text-center text-2xl font-semibold">
        What Our Customers Say
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 380, damping: 28, mass: 0.5 } }}
            whileTap={{ scale: 0.98 }}
            className="transform-gpu will-change-transform"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{t.quote}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
