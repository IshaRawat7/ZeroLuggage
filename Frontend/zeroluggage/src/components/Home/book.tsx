"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export  default function BookingHero() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setTime] = useState("")

  const handleBookSlot = () => {
    if (pickupLocation && dropLocation) {
      console.log("Booking ride from", pickupLocation, "to", dropLocation)
    }
  }

  return (
    <section id="book" className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Map background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="map-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#map-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <motion.h1
            className="mb-12 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Feel Light With ZeroLuggage !
          </motion.h1>

          {/* Form Container */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/*  Input */}
            <div className="relative">
              <div className="flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-4 py-4 transition-all hover:border-gray-300 focus-within:border-blue-500 focus-within:shadow-lg">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/*  Input */}
            <div className="relative">
              <div className="flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-4 py-4 transition-all hover:border-gray-300 focus-within:border-blue-500 focus-within:shadow-lg">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter Time"
                  value={dropLocation}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Book  Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleBookSlot}
                className="w-full bg-yellow-400 py-6 text-xl font-bold text-black hover:bg-yellow-500 transition-colors"
              >
                Book Slot
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
