"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function HistoryPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`${API_URL}/api/bookings/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        //  SAFE parsing (fix map error)
        const list = Array.isArray(data)
          ? data
          : data.bookings || []

        setBookings(list)
      } catch (err) {
        console.error(err)
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Booking History</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking: any) => (
            <Card key={booking.id} className="p-4">
              <p>Pickup: {booking.pickupLocation}</p>
              <p>Drop: {booking.dropoffLocation}</p>

              <Link
                href={`/dasboard/booking/${booking.id}`}
                className="text-blue-600"
              >
                Track Booking
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}