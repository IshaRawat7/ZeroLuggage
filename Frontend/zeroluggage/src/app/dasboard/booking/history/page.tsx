"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export default function HistoryPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/bookings`, {
          credentials: "include",
        })
        const data = await res.json()
        setBookings(data.bookings || [])
      } catch (err) {
        console.error("Error fetching bookings:", err)
      }
    }

    fetchBookings()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Booking History</h1>
      <div className="grid gap-4">
        {bookings.map((booking: any) => (
          <Card key={booking.id} className="p-4 shadow-sm">
            <p className="font-medium">Pickup: {booking.pickupLocation}</p>
            <p className="text-sm text-gray-600">Dropoff: {booking.dropoffLocation}</p>
            <Link
              href={`/dasboard/booking/${booking.bookingCode}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Track Booking
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
