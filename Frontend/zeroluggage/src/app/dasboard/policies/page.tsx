"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Shield, Users, FileText, Mail, Phone, ShieldOff, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PolicyItem {
  id: string
  title: string
  icon: React.ReactNode
  content: string
}

const policies: PolicyItem[] = [
  {
    id: "loss-misplacement",
    title: "Loss or Misplacement Policy",
    icon: <Shield className="w-5 h-5 text-sky-600" />,
    content:
      "In the unfortunate event of luggage loss or misplacement, ZeroLuggage is committed to a thorough investigation. Upon immediate notification, our team will initiate a comprehensive search using all available tracking data. If the luggage is confirmed lost after a 7-day investigation period, compensation will be processed based on the declared luggage value and our standard terms of service. For items without declared value, compensation will follow our default coverage limits. We recommend all users to declare the accurate value of their luggage for appropriate coverage.",
  },
  {
    id: "no-show",
    title: "No Show & Cancellation Policy",
    icon: <Users className="w-5 h-5 text-sky-600" />,
    content:
      "If a user fails to show up for a scheduled pickup or delivery without prior notification, a no-show fee will be applied to the booking. Users are required to cancel or reschedule at least 2 hours before the scheduled time to avoid charges. Multiple no-shows may result in account restrictions. We understand that emergencies happen, so please contact our support team immediately if you need to reschedule.",
  },
  {
    id: "insurance-valuation",
    title: "Insurance & Valuation",
    icon: <FileText className="w-5 h-5 text-sky-600" />,
    content:
      "All luggage is covered under our standard insurance policy up to a declared value. Premium and Pro plan members receive enhanced coverage with higher limits. Valuations must be declared at the time of booking. Items of exceptional value should be declared separately for additional coverage options. Our insurance covers loss, damage, and theft during transit. Exclusions apply to items prohibited by law or our terms of service.",
  },
  {
    id: "damaged-luggage",
    title: "Damaged Luggage Policy",
    icon: <ShieldOff className="w-5 h-5 text-sky-600" />,
    content:
      "All luggage is covered under our standard insurance policy up to a declared value. Premium and Pro plan members receive enhanced coverage with higher limits. Valuations must be declared at the time of booking. Items of exceptional value should be declared separately for additional coverage options. Our insurance covers loss, damage, and theft during transit. Exclusions apply to items prohibited by law or our terms of service.",
  },
  {
    id: "prohibited-items",
    title: "Prohibited & Restricted Items",
    icon: <Ban className="w-5 h-5 text-sky-600" />,
    content:
      "All luggage is covered under our standard insurance policy up to a declared value. Premium and Pro plan members receive enhanced coverage with higher limits. Valuations must be declared at the time of booking. Items of exceptional value should be declared separately for additional coverage options. Our insurance covers loss, damage, and theft during transit. Exclusions apply to items prohibited by law or our terms of service.",
  },
]

export default function PoliciesContent() {
  const [expandedId, setExpandedId] = useState<string | null>("loss-misplacement")

  const togglePolicy = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-background px-6 py-6 md:py-8">
        <div className=" mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Policies & Compensation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding our policies ensures a seamless and worry-free experience with ZeroLuggage. Find details on
            luggage handling, services, and your peace of mind.
          </p>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="px-6 py-6 md:py-8">
        <div className=" mx-auto space-y-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => togglePolicy(policy.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary">{policy.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground text-left">{policy.title}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    expandedId === policy.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === policy.id && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-foreground leading-relaxed">{policy.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className=" bg-sky-50 px-6 py-6 md:py-8 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Have More Questions?</h2>
          <p className="text-lg text-black mb-8">
            Our support team is ready to assist you with any further inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2" size="lg">
              <Mail className="w-4 h-4" />
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <Phone className="w-4 h-4" />
              Call Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
