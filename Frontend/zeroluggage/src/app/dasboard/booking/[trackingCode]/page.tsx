"use client"

import { MapPin, Package, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const TrackingMap = dynamic<any>(
  () => import("@/components/dashboard/tracking-map"),
  { ssr: false }
)

export default function TrackingPage() {
  const router = useRouter()

  const { trackingCode } = useParams<{
    trackingCode: string
  }>()

  const [trackingData, setTrackingData] =
    useState<any>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!trackingCode) return

    const fetchTracking = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/tracking/${trackingCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        )

        if (!res.ok)
          throw new Error("Booking not found")

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading Tracking Details...
      </div>
    )
  }

  if (!trackingData) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Booking not found
      </div>
    )
  }

  const steps = [
    {
      id: 1,
      label: "Picked Up",
      icon: <MapPin size={16} />,
    },
    {
      id: 2,
      label: "In Transit",
      icon: <Truck size={16} />,
    },
    {
      id: 3,
      label: "Out for Delivery",
      icon: <Package size={16} />,
    },
    {
      id: 4,
      label: "Delivered",
      icon: <Clock size={16} />,
    },
  ]

  const progressPercent =
    ((trackingData.progress - 1) /
      (steps.length - 1)) *
    100

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Live Shipment Tracking
          </h1>
        </motion.div>

        {/* PROGRESS */}
        <Card className="p-8 shadow-sm">
          <h2 className="font-semibold text-lg mb-8">
            Delivery Progress
          </h2>

          <div className="relative flex justify-between items-center">

            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200" />

            <div
              className="absolute top-5 left-0 h-1 bg-blue-600 transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
              }}
            />

            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id <=
                    trackingData.progress
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {step.icon}
                </div>

                <p className="text-xs mt-2">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* MAP + DETAILS */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* MAP */}
          <Card className="lg:col-span-2 p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">
              Live Map Location
            </h3>

            <div className="h-[520px] rounded-lg overflow-hidden border">

              <TrackingMap/>

            </div>
          </Card>

          {/* DETAILS */}
          <Card className="p-6 shadow-sm space-y-6">

            <Info
              label="Tracking ID"
              value={trackingData.trackingId}
              icon={<Package size={18} />}
            />

            <Info
              label="Current Location"
              value={trackingData.currentLocation}
              icon={<MapPin size={18} />}
            />

            <Info
              label="Estimated Delivery"
              value={trackingData.estimatedDelivery}
              icon={<Clock size={18} />}
            />

            <Button
              className="w-full"
              onClick={() =>
                router.push("/dasboard")
              }
            >
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Info({
  label,
  value,
  icon,
}: any) {
  return (
    <div className="flex items-start gap-3">

      <div className="text-blue-600 mt-1">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="font-semibold text-gray-800">
          {value}
        </p>
      </div>

    </div>
  )
}