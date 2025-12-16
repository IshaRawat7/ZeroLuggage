"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

type Testimonial = {
  name: string
  role: string
  quote: string
  initials: string
  rating: number
  location?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Alice Johnson",
    role: "Business Traveler",
    quote: "Made my layover stress‑free. Booked in minutes and my bags arrived right on time. Truly hassle-free!",
    initials: "AJ",
    rating: 5,
    location: "USA",
  },
  {
    name: "Mark Chen",
    role: "Photographer",
    quote: "Loved the real‑time tracking. I could explore without worrying about my gear. Professional and reliable.",
    initials: "MC",
    rating: 5,
    location: "China",
  },
  {
    name: "Sarah Lee",
    role: "Vacationer",
    quote: "Fantastic experience! The courier was professional and super punctual. Everything arrived perfectly.",
    initials: "SL",
    rating: 4,
    location: "Canada",
  },
  {
    name: "John Miller",
    role: "Conference Speaker",
    quote: "ZeroLuggage handled everything seamlessly between hotel and venue. Excellent for busy schedules.",
    initials: "JM",
    rating: 5,
    location: "UK",
  },
  {
    name: "Maria Gomez",
    role: "Backpacker",
    quote: "Affordable and reliable. It let me enjoy the city hands‑free for a day. Great service for travelers.",
    initials: "MG",
    rating: 4,
    location: "Spain",
  },
  {
    name: "David Park",
    role: "Frequent Flyer",
    quote: "Secure seals and clear updates. Easily the best luggage service I’ve used. Highly recommended!",
    initials: "DP",
    rating: 5,
    location: "South Korea",
  },
]

export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="mx-auto max-w-7xl px-6 py-16  rounded-xl"
    >
      <h2 id="reviews-title" className="mb-12 text-center text-3xl font-bold text-sky-800">
        What Our Customers Say
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: idx * 0.07 }}
            whileHover={{ scale: 1.05, y: -6, transition: { type: "spring", stiffness: 400 } }}
            whileTap={{ scale: 0.98 }}
            className="transform-gpu will-change-transform"
          >
            <Card className="h-full shadow-lg rounded-xl border-0 bg-white">
              <CardHeader className="flex items-center gap-4 pb-2 border-b border-sky-100">
                <Avatar className="h-12 w-12 ring-2 ring-sky-200">
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-md font-semibold text-sky-800">{t.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    {t.role} {t.location && <>• {t.location}</>}
                  </div>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < t.rating ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 italic relative before:content-['“'] before:text-2xl before:text-sky-300 before:absolute before:-left-2 before:-top-2 after:content-['”'] after:text-2xl after:text-sky-300 after:absolute after:-right-2 after:-bottom-2">
                  {t.quote}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
