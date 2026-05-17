"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Wallet, Check } from "lucide-react"
import { CreditCardIllustration } from "./credit-card-illustration"

declare global {
  interface Window {
    Razorpay: any
  }
}

export function PaymentCheckout({ bookingId }: { bookingId: string }) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
   const [booking, setBooking] = useState<any>(null)
const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    promoCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsProcessing(true)

    const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      amount: 40,
      bookingId: 1,
    }),
  }
);
      const order = await res.json()

      // 2️ Load Razorpay SDK
      await loadRazorpay()

      // 3️ Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Luggage Service",
        description: "Booking Payment",
        order_id: order.id,

        handler: async function (response: any) {
          console.log("Payment Success:", response)

          //  OPTIONAL: verify payment with backend
          // await fetch("/api/payment/verify", {...})

          setIsSuccess(true)
        },

        prefill: {
          name: "User",
          email: "user@example.com",
        },

        theme: {
          color: "#0284c7",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setIsProcessing(false)
    } catch (err) {
      console.error(err)
      setIsProcessing(false)
    }
  }
 

useEffect(() => {
  const fetchBooking = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
        {
          credentials: "include",
        }
      )

      const data = await res.json()
      setBooking(data.booking)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  fetchBooking()
}, [bookingId])

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Your booking has been confirmed. Check your email for details.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="w-full"
          >
            Make Another Booking
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Complete Your Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
         <div className="space-y-6">
  <Card className="p-6">
    <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

    <div className="space-y-4 mb-6">
      <div>
        <p className="text-sm text-muted-foreground mb-1">
          Pickup Location
        </p>
        <p className="font-semibold">
          {booking?.pickupLocation || "Loading..."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Date</p>
          <p className="font-semibold">
            {booking?.pickupDate
              ? new Date(booking.pickupDate).toLocaleDateString()
              : "Loading..."}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Time</p>
          <p className="font-semibold">
            {booking?.pickupDate
              ? new Date(booking.pickupDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Loading..."}
          </p>
        </div>
      </div>
    </div>

    <div className="border-t pt-4">
      <h3 className="font-semibold mb-3">Cost Breakdown</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Distance Charge</span>
          <span>
            ₹
            {booking?.distanceCharge ??
              Math.round((booking?.estimatedFare || 0) * 0.6)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Luggage Fee</span>
          <span>
            ₹
            {booking?.luggageFee ??
              Math.round((booking?.estimatedFare || 0) * 0.2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Delivery Speed (Express)
          </span>
          <span>
            ₹
            {booking?.expressFee ??
              Math.round((booking?.estimatedFare || 0) * 0.2)}
          </span>
        </div>

        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
          <span>Total Amount</span>
          <span className="text-lg">
            ₹{booking?.estimatedFare || 0}
          </span>
        </div>
      </div>
    </div>
  </Card>
</div>

          {/* Payment Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <CreditCardIllustration />
            </div>

            <Card className="p-6">
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold mb-3">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-lg border-2 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Card
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`p-3 rounded-lg border-2 ${
                        paymentMethod === "wallet"
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <Wallet className="w-4 h-4" />
                      Wallet
                    </button>
                  </div>
                </div>

                {/* Razorpay Notice */}
                <p className="text-sm text-muted-foreground">
                  You will be redirected to Razorpay secure payment gateway.
                </p>

                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      name="promoCode"
                      placeholder="Enter promo code"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                    <Button type="button" variant="outline" className="h-12">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Pay Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure payment powered by Razorpay
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}