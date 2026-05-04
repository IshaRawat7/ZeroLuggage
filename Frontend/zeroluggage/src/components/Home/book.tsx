"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

type Suggestion = {
  display_name: string
  lat: string
  lon: string
}

export default function BookingHero() {
   const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")

  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([])
  const [dropSuggestions, setDropSuggestions] = useState<Suggestion[]>([])

const handleBookSlot = () => {
  if (pickupLocation && dropLocation) {
    console.log("Booking ride from", pickupLocation, "to", dropLocation)

   
    toast.success("Slot booked successfully!")

    // clear fields
    setPickupLocation("")
    setDropLocation("")
    setPickupSuggestions([])
    setDropSuggestions([])
  } else {
    
    toast.error("Please enter both pickup and drop locations")
  }
}

  // 🔍 Fetch suggestions
  const fetchSuggestions = async (query: string, type: "pickup" | "drop") => {
    if (query.length < 3) return

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      )
      const data = await res.json()

      if (type === "pickup") setPickupSuggestions(data)
      else setDropSuggestions(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Debounce pickup
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSuggestions(pickupLocation, "pickup")
    }, 400)
    return () => clearTimeout(delay)
  }, [pickupLocation])

  // Debounce drop
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSuggestions(dropLocation, "drop")
    }, 400)
    return () => clearTimeout(delay)
  }, [dropLocation])

  return (
    <section
      id="book"
      className="relative min-h-screen max-w-8xl overflow-hidden bg-white px-3 sm:px-4"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute -top-32 -left-32 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-linear-to-r from-sky-400 to-sky-600 opacity-20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-linear-to-r from-yellow-400 to-yellow-500 opacity-20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex min-h-screen items-center justify-center">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <motion.h1
            className="mb-8 sm:mb-12 text-center font-bold tracking-tight text-sky-900
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Travel Light With{" "}
            <span className="text-sky-900">ZeroLuggage</span>!
          </motion.h1>

          {/* Form Container */}
          <motion.div
            className="space-y-4 sm:space-y-6 bg-white/90 backdrop-blur-md
                       rounded-2xl sm:rounded-3xl
                       p-4 sm:p-6 md:p-10 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Pickup */}
            <div className="relative">
              <div className="flex items-center gap-3 sm:gap-4 rounded-xl border-2 border-gray-200
                              px-4 py-3 sm:py-4
                              transition-all hover:border-sky-400
                              focus-within:border-sky-500 focus-within:shadow-xl">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
                <input
                  type="text"
                  placeholder="Enter Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-lg outline-none placeholder:text-gray-400"
                />
              </div>

              {pickupSuggestions.length > 0 && (
                <div className="absolute z-20 w-full bg-white border mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {pickupSuggestions.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setPickupLocation(item.display_name)
                        setPickupSuggestions([])
                      }}
                      className="p-3 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      {item.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drop */}
            <div className="relative">
              <div className="flex items-center gap-3 sm:gap-4 rounded-xl border-2 border-gray-200
                              px-4 py-3 sm:py-4
                              transition-all hover:border-yellow-400
                              focus-within:border-yellow-500 focus-within:shadow-xl">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <input
                  type="text"
                  placeholder="Enter Drop Location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-lg outline-none placeholder:text-gray-400"
                />
              </div>

              {dropSuggestions.length > 0 && (
                <div className="absolute z-20 w-full bg-white border mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {dropSuggestions.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setDropLocation(item.display_name)
                        setDropSuggestions([])
                      }}
                      className="p-3 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      {item.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              
              <Button
                onClick={handleBookSlot}
                className="w-full py-4 sm:py-6 text-lg sm:text-xl font-bold
                           bg-linear-to-r from-yellow-400 to-yellow-500
                           text-black shadow-lg hover:brightness-110 transition-all"
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
