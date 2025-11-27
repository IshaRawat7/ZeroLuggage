"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Hero3D } from "./hero-3d"

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-sky-50" id="book">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <motion.h1
            id="hero-title"
            className="text-pretty text-4xl font-bold tracking-tight md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Pick Up and Drop Anytime, Anywhere
          </motion.h1>

          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            ZeroLuggage offers seamless pickup, storage, and delivery of your bags so you can travel lighter and
            smarter. Book in minutes and track in real-time.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white shadow">
              <Link href="#how">Get Started</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#why">Learn more</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          className="md:justify-self-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="will-change-transform transform-gpu"
          >
            <Hero3D />
           
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
