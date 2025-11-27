"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface TrackingMapProps {
  pickupLocation: { lat: number; lng: number }
  deliveryLocation: { lat: number; lng: number }
}

export default function TrackingMap({ pickupLocation, deliveryLocation }: TrackingMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize map
    const map = L.map(containerRef.current).setView(
      [(pickupLocation.lat + deliveryLocation.lat) / 2, (pickupLocation.lng + deliveryLocation.lng) / 2],
      5,
    )

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Custom icons
    const pickupIcon = L.divIcon({
      html: `<div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.5 1.5H9.5V0h1v1.5zM14 4l.707-.707.707.707-.707.707L14 4zm2 5.5h1.5v1h-1.5v-1zM14 14l.707.707.707-.707.707.707-.707.707L14 14zm-8 2l-.707.707-.707-.707.707-.707.707.707zM2 9.5H.5v1H2v-1zm2-5.5l-.707-.707-.707.707-.707-.707.707-.707.707.707z"/></svg></div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    const deliveryIcon = L.divIcon({
      html: `<div class="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.5 1.5H9.5V0h1v1.5zM14 4l.707-.707.707.707-.707.707L14 4zm2 5.5h1.5v1h-1.5v-1zM14 14l.707.707.707-.707.707.707-.707.707L14 14zm-8 2l-.707.707-.707-.707.707-.707.707.707zM2 9.5H.5v1H2v-1zm2-5.5l-.707-.707-.707.707-.707-.707.707-.707.707.707z"/></svg></div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    // Add markers
    L.marker([pickupLocation.lat, pickupLocation.lng], { icon: pickupIcon })
      .addTo(map)
      .bindPopup("Pickup Location: Mumbai Airport")

    L.marker([deliveryLocation.lat, deliveryLocation.lng], { icon: deliveryIcon })
      .addTo(map)
      .bindPopup("Delivery Location: Delhi")

    // Draw route line
    const routeLine = L.polyline(
      [
        [pickupLocation.lat, pickupLocation.lng],
        [deliveryLocation.lat, deliveryLocation.lng],
      ],
      {
        color: "#2563eb",
        weight: 3,
        opacity: 0.7,
        dashArray: "5, 5",
      },
    ).addTo(map)

    // Fit bounds
    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] })

    mapRef.current = map

    return () => {
      map.remove()
    }
  }, [pickupLocation, deliveryLocation])

  return <div ref={containerRef} className="w-full h-full" />
}
