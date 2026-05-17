"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function HistoryPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
 const fetchBookings = async () => {
  try {

   const res = await fetch(`${API_URL}/api/bookings/me`, {
  method: "GET",
  credentials: "include",
})

    const data = await res.json()

    console.log("Bookings response:", data)

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

  // OUTSIDE useEffect
  const handleCancelBooking = async (id: number) => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${API_URL}/api/bookings/cancel/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      // Update UI instantly
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id
            ? { ...booking, status: "CANCELLED" }
            : booking
        )
      )

      toast.success("Booking cancelled successfully")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Your Booking History
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking: any) => (
            <Card key={booking.id} className="p-4 space-y-2">
              <p>
                Pickup: {booking.pickupLocation}
              </p>

              <p>
                Drop: {booking.dropoffLocation}
              </p>

              <p>
                Status:{" "}
                <span
                  className={
                    booking.status === "CANCELLED"
                      ? "text-red-500"
                      : "text-green-600"
                  }
                >
                  {booking.status}
                </span>
              </p>

              <div className="flex gap-4 pt-2">
                <Link
                  href={`/dasboard/booking/${booking.bookingCode}`}
                  className="text-blue-600"
                >
                  Track Booking
                </Link>

                {booking.status !== "CANCELLED" && (
                  <button
                    onClick={() =>
                      handleCancelBooking(booking.id)
                    }
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}