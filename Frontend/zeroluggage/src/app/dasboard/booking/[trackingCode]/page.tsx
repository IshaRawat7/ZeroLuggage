"use client"

import { MapPin, Package, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

const TrackingMap = dynamic(
  () => import("@/components/dashboard/tracking-map"),
  { ssr: false }
)

export default function TrackingPage() {
  const router = useRouter()
  const { trackingCode } = useParams() // Dynamic route parameter
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const steps = [
    { id: 1, label: "Picked from Pantnagar" },
    { id: 2, label: "In Transit" },
    { id: 3, label: "Out for Delivery" },
    { id: 4, label: "Delivered at Pantnagar" },
  ]

 useEffect(() => {
  if (!trackingCode) return

  const fetchTracking = async () => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/tracking/${trackingCode}`, {
        credentials: "include"
      })
      if (!res.ok) throw new Error("Booking not found")
      const data = await res.json()
      setTrackingData(data)
    } catch (err) {
      console.error(err)
      setTrackingData(null)
    } finally {
      setLoading(false)
    }
  }

  fetchTracking()
}, [trackingCode])
console.log("trackingCode:", trackingCode);

  if (loading) return <p className="text-center mt-10">Loading tracking data...</p>
  if (!trackingData) return <p className="text-center mt-10">Booking not found</p>


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Live Luggage Tracking
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time tracking for your spiritual journey luggage.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            Delivery Progress
          </h2>

          <div className="flex items-center justify-between gap-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold mb-3
                    ${
                      step.id <= trackingData.progress
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {step.id}
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-[55%] w-full h-1 -z-10">
                    <div
                      className={`h-full ${
                        step.id < trackingData.progress
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>
                )}

                <p
                  className={`text-xs md:text-sm text-center ${
                    step.id <= trackingData.progress
                      ? "text-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}s
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Map */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-0 h-[360px] overflow-hidden shadow-md">
              <TrackingMap
                pickupLocation={trackingData.pickupLocation}
                deliveryLocation={trackingData.deliveryLocation}
              />
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 shadow-md">
              <h3 className="text-xl font-bold mb-1">Delivery Details</h3>
              <p className="text-sm text-gray-600 mb-6">
               <p className="text-sm text-gray-600 mb-6">
  {trackingData.pickupLocationName} → {trackingData.deliveryLocationName} route details
</p>

              </p>

              <div className="space-y-6">
                <InfoRow icon={Package} label="Tracking ID" value={trackingData.trackingId} />
                <InfoRow icon={MapPin} label="Current Location" value={trackingData.currentLocation} />
                <InfoRow icon={Clock} label="Estimated Delivery" value={trackingData.estimatedDelivery} />
              </div>

              <Button
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/dasboard")}
              >
                Back to Dashboard
              </Button>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

/* --------- Reusable Info Row --------- */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  )
}
