"use client"

import { MapPin, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"

const TrackingMap = dynamic(() => import("@/components/dashboard/tracking-map"), { ssr: false })

export default function TrackingPage() {
  const trackingData = {
    trackingId: "ZL-202400123456",
    currentLocation: "Mumbai Airport (BOM), India",
    estimatedDelivery: "2024-08-15, 14:30 IST",
    status: "In Transit",
    progress: 2, // Current step (1-4)
    pickupLocation: { lat: 19.0895, lng: 72.8656 }, // Mumbai Airport
    deliveryLocation: { lat: 28.7041, lng: 77.1025 }, // Delhi
  }

  const steps = [
    { id: 1, label: "Luggage Picked Up" },
    { id: 2, label: "In Transit" },
    { id: 3, label: "Out for Delivery" },
    { id: 4, label: "Delivered" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Live Luggage Tracking</h1>
          <p className="text-gray-600">Follow your luggage in real-time until it reaches its destination.</p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">Delivery Progress</h2>
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-3 flex-shrink-0 ${
                    step.id <= trackingData.progress ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step.id}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mb-3 -mx-2 w-full">
                    <div className={`h-full ${step.id < trackingData.progress ? "bg-blue-600" : "bg-gray-300"}`} />
                  </div>
                )}

                {/* Step Label */}
                <p
                  className={`text-xs md:text-sm text-center leading-tight ${
                    step.id <= trackingData.progress ? "text-gray-900 font-medium" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="p-0 h-80 overflow-hidden">
              <TrackingMap
                pickupLocation={trackingData.pickupLocation}
                deliveryLocation={trackingData.deliveryLocation}
              />
            </Card>
          </div>

          {/* Delivery Details */}
          <div>
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery Details</h3>
              <p className="text-gray-600 text-sm mb-6">Detailed information about your shipment.</p>

              <div className="space-y-6">
                {/* Tracking ID */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Tracking ID</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{trackingData.trackingId}</p>
                </div>

                {/* Current Location */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Current Location</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{trackingData.currentLocation}</p>
                </div>

                {/* Estimated Delivery */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Estimated Delivery</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{trackingData.estimatedDelivery}</p>
                </div>
              </div>

              {/* Back Button */}
              <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white">Back to Dashboard</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
