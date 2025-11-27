"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PlanFeature {
  name: string
  included: boolean
}

interface Plan {
  name: string
  price: number
  description: string
  features: PlanFeature[]
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    name: "Basic Plan",
    price: 9,
    description: "Perfect for occasional travelers",
    features: [
      { name: "1 Luggage Delivery per month", included: true },
      { name: "Standard Tracking", included: true },
      { name: "Email Support", included: true },
      { name: "Standard Delivery Time", included: true },
      { name: "No Priority Services", included: false },
      { name: "No Insurance Coverage", included: false },
    ],
  },
  {
    name: "Premium Plan",
    price: 29,
    description: "Most popular choice",
    highlighted: true,
    features: [
      { name: "3 Luggage Deliveries per month", included: true },
      { name: "Advanced Live Tracking", included: true },
      { name: "24/7 Priority Chat Support", included: true },
      { name: "Expedited Delivery", included: true },
      { name: "Basic Insurance Coverage", included: true },
      { name: "Access to exclusive perks", included: true },
    ],
  },
  {
    name: "Pro Plan",
    price: 49,
    description: "For frequent travelers",
    features: [
      { name: "Unlimited Luggage Deliveries", included: true },
      { name: "Real-time GPS Tracking & Alerts", included: true },
      { name: "Dedicated Accounts Manager", included: true },
      { name: "Express Delivery Option", included: true },
      { name: "Comprehensive Insurance", included: true },
      { name: "Priority access to all new features", included: true },
    ],
  },
]

export  default function PricingPlans() {
  return (
    <div className="w-full py-2 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Unlock Seamless Journeys with ZeroLuggage Plans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Choose the perfect plan that fits your travel needs and enjoy a hassle-free luggage experience. Upgrade
            anytime!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col p-8 transition-all duration-300 ${
                plan.highlighted ? "border-2 border-blue-500 shadow-lg scale-105 md:scale-100" : "border border-border"
              }`}
            >
              {/* Plan Name and Price */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              {/* Features List */}
              <div className="flex-1 mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "text-foreground" : "text-muted-foreground line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe Button */}
              <Button
                className={`w-full py-6 font-semibold text-base ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
              >
                Subscribe Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
