"use client"

import { useState } from "react"
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

export default function PricingPlans() {
  // First card active by default
  const [activeCard, setActiveCard] = useState(0)

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-background to-slate-50 dark:to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            Unlock Seamless Journeys <br />
            with{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              ZeroLuggage
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a plan tailored for your travel style and experience
            stress-free luggage transportation anywhere.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isActive = activeCard === index

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                className={`relative transition-all duration-500`}
              >
                {/* Glow Effect */}
                {isActive && (
                  <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl"></div>
                )}

                <Card
                  className={`
                    relative overflow-hidden rounded-3xl p-8 flex flex-col h-full
                    transition-all duration-500 cursor-pointer
                    border-2
                    ${
                      isActive
                        ? "border-blue-500 shadow-2xl scale-105 bg-white dark:bg-slate-900"
                        : "border-border/50 scale-95 opacity-80 hover:opacity-100"
                    }
                  `}
                >
                  {/* Recommended Badge */}
                  {isActive && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                        Recommended
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>

                    <p className="text-muted-foreground mb-5">
                      {plan.description}
                    </p>

                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-extrabold">
                        ₹{plan.price}
                      </span>

                      <span className="text-muted-foreground mb-1">
                        /month
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          {feature.included ? (
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                              <Check className="w-4 h-4 text-blue-600" />
                            </div>
                          ) : (
                            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                              <X className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}

                          <span
                            className={`text-sm leading-relaxed ${
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground line-through"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`
                      mt-8 py-6 rounded-xl text-base font-semibold
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                          : "bg-secondary hover:bg-secondary/80"
                      }
                    `}
                  >
                    Subscribe Now
                  </Button>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}