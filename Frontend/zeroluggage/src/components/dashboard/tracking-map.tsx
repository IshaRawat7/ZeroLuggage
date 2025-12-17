"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface TrackingMapProps {
  pickupLocation: { lat: number; lng: number }
  deliveryLocation: { lat: number; lng: number }
}

export default function TrackingMap({
  pickupLocation,
  deliveryLocation,
}: TrackingMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    /* ---------------- MAP INIT ---------------- */

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView(
      [
        (pickupLocation.lat + deliveryLocation.lat) / 2,
        (pickupLocation.lng + deliveryLocation.lng) / 2,
      ],
      5,
    )

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    /* ---------------- ICONS ---------------- */

    const pickupIcon = L.divIcon({
      html: `
        <div class="pulse pulse-green">
          <div class="icon-circle bg-green">
            📦
          </div>
        </div>
      `,
      className: "",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    })

    const deliveryIcon = L.divIcon({
      html: `
        <div class="pulse pulse-red">
          <div class="icon-circle bg-red">
            🎯
          </div>
        </div>
      `,
      className: "",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    })

    /* ---------------- MARKERS ---------------- */

    const pickupMarker = L.marker(
      [pickupLocation.lat, pickupLocation.lng],
      { icon: pickupIcon },
    )
      .addTo(map)
      .bindPopup("<b>Pickup</b><br/>Mumbai Airport")

    const deliveryMarker = L.marker(
      [deliveryLocation.lat, deliveryLocation.lng],
      { icon: deliveryIcon },
    )
      .addTo(map)
      .bindPopup("<b>Delivery</b><br/>Delhi")

    /* ---------------- ROUTE LINE ---------------- */

    const routeLine = L.polyline(
      [
        [pickupLocation.lat, pickupLocation.lng],
        [deliveryLocation.lat, deliveryLocation.lng],
      ],
      {
        color: "#2563eb",
        weight: 4,
        opacity: 0.8,
        dashArray: "10 10",
        className: "animated-route",
      },
    ).addTo(map)

    map.fitBounds(routeLine.getBounds(), {
      padding: [60, 60],
      animate: true,
      duration: 1.2,
    })

    mapRef.current = map

    return () => {
      map.remove()
    }
  }, [pickupLocation, deliveryLocation])

  return (
    <>
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />

      {/* ---------------- STYLES ---------------- */}
      <style jsx global>{`
        .icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          border: 2px solid white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          animation: drop 0.6s ease-out;
        }

        .bg-green {
          background: #22c55e;
        }

        .bg-red {
          background: #ef4444;
        }

        .pulse {
          position: relative;
        }

        .pulse::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          animation: pulse 2s infinite;
          opacity: 0.6;
        }

        .pulse-green::after {
          background: rgba(34, 197, 94, 0.35);
        }

        .pulse-red::after {
          background: rgba(239, 68, 68, 0.35);
        }

        .animated-route {
          animation: dash 2s linear infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }

        @keyframes drop {
          0% {
            transform: translateY(-20px) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
