"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Calendar, Clock, Package, Upload, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LuggageBookingForm() {
  const [formData, setFormData] = useState({
    pickupLocation: "123 Main St, Anytown, USA",
    dropoffLocation: "456 Oak Ave, Somewhere, USA",
    pickupDate: "2024-08-15",
    pickupTime: "10:00",
    dropoffDate: "2024-08-15",
    dropoffTime: "14:00",
    luggageItems: "1",
    duration: "4 hrs",
    luggagePhoto: null as File | null,
  })

  const [dragActive, setDragActive] = useState(false)
  const estimatedFare = 20.0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDurationSelect = (duration: string) => {
    setFormData((prev) => ({
      ...prev,
      duration,
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({
        ...prev,
        luggagePhoto: e.dataTransfer.files[0],
      }))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        luggagePhoto: e.target.files![0],
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
  }

  return (
    <div className=" mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Book a New Luggage Delivery</h1>
        <p className="text-muted-foreground">Fill in the details below to schedule your delivery securely.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Location */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">Location</h2>
          <div className="mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="pl-10 h-12"
                placeholder="Enter city, address, or landmark"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Upload luggage photo (for size detection)
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragActive ? "border-sky-500 bg-sky-50" : "border-muted-foreground"
              }`}
            >
              <input type="file" accept="image/*" onChange={handleFileInput} className="hidden h-12" id="luggage-photo" />
              <label htmlFor="luggage-photo" className="cursor-pointer">
                <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {formData.luggagePhoto ? formData.luggagePhoto.name : "Drag & drop or click to upload"}
                </p>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Drop-off</h3>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleChange}
                  className="pl-10 mb-3 h-12"
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2">Select date & time</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Pickup</h3>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="pl-10 mb-3 h-12"
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2">Select date & time</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-sky-500 flex items-center justify-center mt-0.5">
                <div className="h-2 w-2 bg-sky-500 rounded-full" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Real-time availability: 8 storage points nearby</p>
                <p className="text-xs text-muted-foreground">with space right now</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sky-600 text-xs font-medium">
              <RefreshCw className="h-3 w-3" />
              Auto-refreshing
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {["2 hrs", "4 hrs", "All day", "Overnight"].map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => handleDurationSelect(dur)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                  formData.duration === dur
                    ? "border-sky-500 bg-sky-50 text-sky-600"
                    : "border-muted-foreground text-muted-foreground hover:border-sky-500"
                }`}
              >
                <Clock className="h-4 w-4" />
                {dur}
              </button>
            ))}
          </div>
        </Card>

        {/* Luggage & Fare */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Luggage & Fare</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">Number of Luggage Items</label>
            <div className="relative">
              <Package className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="number"
                name="luggageItems"
                value={formData.luggageItems}
                onChange={handleChange}
                min="1"
                className="pl-10 h-12"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-foreground font-medium">Estimated Fare:</span>
            <span className="text-2xl font-bold text-sky-600">${estimatedFare.toFixed(2)}</span>
          </div>
        </Card>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg">
          Confirm Booking
        </Button>
      </form>
    </div>
  )
}
