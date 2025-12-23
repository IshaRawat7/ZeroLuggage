"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Wallet, Check } from "lucide-react"
import { CreditCardIllustration } from "./credit-card-illustration"

export function PaymentCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    promoCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background  to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">Your booking has been confirmed. Check your email for details.</p>
          <Button
            onClick={() => {
              setIsSuccess(false)
              setFormData({ cardNumber: "", expiryDate: "", cvv: "", promoCode: "" })
            }}
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Complete Your Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Booking Summary */}
          <div className="space-y-6">
            {/* Booking Summary Card */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                  <p className="font-semibold">Mussoorie</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold">October 25, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="font-semibold">10:30 AM</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Cost Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance Charge</span>
                    <span>₹25.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Luggage Fee</span>
                    <span>₹5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Speed (Express)</span>
                    <span>₹10.00</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-lg">₹40.00</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Payment Form */}
          <div className="space-y-6">
            {/* Credit Card Illustration */}
            <div className="flex justify-center">
              <CreditCardIllustration />
            </div>

            {/* Payment Form */}
            <Card className="p-6">
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <h3 className="font-semibold mb-3">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm font-medium">Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === "wallet"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Wallet className="w-4 h-4" />
                      <span className="text-sm font-medium">Wallet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === "paypal"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-sm font-medium">PayPal</span>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Enter your card details securely</p>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Card Number</label>
                      <Input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        required className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">MM/YY</label>
                        <Input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          maxLength={5}
                          required
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">CVV</label>
                        <Input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      name="promoCode"
                      placeholder="Enter promo code"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                    <Button type="button" variant="outline" className="px-4 bg-transparent h-12">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-primary-foreground font-semibold py-3"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your payment information is secure and encrypted
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
