"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingHero() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")

  const handleBookSlot = () => {
    if (pickupLocation && dropLocation) {
      console.log("Booking ride from", pickupLocation, "to", dropLocation)
    }
  }

  return (
    <section id="book" className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 opacity-20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <motion.h1
            className="mb-12 text-center text-4xl font-bold tracking-tight text-sky-900 md:text-5xl lg:text-6xl relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Travel Light With <span className="text-sky-900  ">ZeroLuggage</span>!

          </motion.h1>

          {/* Form Container */}
          <motion.div
            className="space-y-6 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Pickup Input */}
            <div className="relative">
              <div className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white px-4 py-4 transition-all hover:border-sky-400 focus-within:border-sky-500 focus-within:shadow-xl">
                <MapPin className="h-6 w-6 text-sky-400" />
                <input
                  type="text"
                  placeholder="Enter Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Drop Input */}
            <div className="relative">
              <div className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white px-4 py-4 transition-all hover:border-yellow-400 focus-within:border-yellow-500 focus-within:shadow-xl">
                <MapPin className="h-6 w-6 text-yellow-400" />
                <input
                  type="text"
                  placeholder="Enter Drop Location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Book Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleBookSlot}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 py-6 text-xl font-bold text-black shadow-lg hover:brightness-110 transition-all"
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
