"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Hero3D } from "./hero-3d"
import { CheckCircle } from "lucide-react"

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-sky-50" id="book">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Heading with gradient underline */}
          <motion.h1
            id="hero-title"
            className="text-4xl font-bold tracking-tight md:text-5xl text-sky-900 relative inline-block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Pick Up and Drop Anytime, Anywhere
            <span className="absolute left-0 bottom-0 h-1 w-24  rounded-full"></span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-muted-foreground leading-relaxed text-lg md:text-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            ZeroLuggage offers seamless pickup, storage, and delivery of your bags so you can travel lighter and smarter. 
            Book in minutes and track in real-time.
          </motion.p>

          {/* Feature Chips */}
          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {["Fast Pickup", "Secure Storage", "Real-time Tracking"].map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-1 rounded-full bg-sky-100/50 px-3 py-1 text-sm font-medium text-sky-900 shadow hover:scale-105 transition-transform duration-200"
              >
                <CheckCircle size={16} className="text-sky-600" /> {feat}
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-300/30 transition-transform hover:scale-105">
              <Link href="#how">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="border-sky-600 text-sky-900 hover:bg-sky-100 hover:scale-105 transition-transform">
              <Link href="#why">Learn More</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right Hero 3D */}
        <motion.div
          aria-hidden
          className="md:justify-self-end relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="will-change-transform transform-gpu"
          >
            <Hero3D />
          </motion.div>

          {/* Floating badges around Hero3D */}
          <motion.div
            className="absolute top-0 left-0 -translate-x-6 -translate-y-6 flex flex-col gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-white/90 text-sky-700 px-3 py-1 rounded-lg shadow-lg text-sm font-medium">Safe & Secure</div>
            <div className="bg-white/90 text-sky-700 px-3 py-1 rounded-lg shadow-lg text-sm font-medium">Door-to-Door</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
