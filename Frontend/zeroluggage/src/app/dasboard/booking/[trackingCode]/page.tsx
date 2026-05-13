"use client"

import { MapPin, Package, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const TrackingMap = dynamic(
  () => import("@/components/dashboard/tracking-map"),
  { ssr: false }
)

export default function TrackingPage() {
  const router = useRouter()
  const { trackingCode } = useParams<{ trackingCode: string }>()  

  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const steps = [
    { id: 1, label: "Picked from Pantnagar" },
    { id: 2, label: "In Transit" },
    { id: 3, label: "Out for Delivery" },
    { id: 4, label: "Delivered at Destination" },
  ]

  useEffect(() => {
    if (!trackingCode) return

    const fetchTracking = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/tracking/${trackingCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

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

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!trackingData) return <p className="text-center mt-10">Booking not found</p>

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold">Live Tracking</h1>
        </motion.div>

        <Card className="p-6">
          <h2 className="font-semibold mb-6">Delivery Progress</h2>

          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id <= trackingData.progress
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {step.id}
                </div>
                <p className="text-xs mt-2">{step.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">

          <Card className="lg:col-span-2 h-[350px]">
            <TrackingMap
              pickupLocation={trackingData.pickupLocation}
              deliveryLocation={trackingData.deliveryLocation}
            />
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-bold">Details</h3>

            <Info label="Tracking ID" value={trackingData.trackingId} />
            <Info label="Current Location" value={trackingData.currentLocation} />
            <Info label="ETA" value={trackingData.estimatedDelivery} />

            <Button
              className="w-full mt-4"
              onClick={() => router.push("/dasboard")}
            >
              Back
            </Button>
          </Card>

        </div>
      </div>
    </div>
  )
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}