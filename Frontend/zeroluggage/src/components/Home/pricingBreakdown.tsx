


"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import {
  IndianRupee,
  Package,
  Truck,
  Layers3,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

type PricingData = {
  baseFare: number
  volume: number
  volumeRate: number

  distance?: number
  distanceRate?: number

  urgencyFee?: number

  totalCost: number

  category: string
}

type Props = {
  pricing?: PricingData | null
}

export default function PricingBreakdown({
  pricing,
}: Props) {
  /* ---------------- NULL SAFETY ---------------- */

  if (!pricing) {
    return (
      <Card className="rounded-3xl border shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <IndianRupee className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                AI Pricing Estimation
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Smart luggage pricing analysis
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-10 flex items-center justify-center min-h-[280px]">
          <div className="text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>

            <h2 className="text-2xl font-bold">
              Pricing Not Available
            </h2>

            <p className="text-muted-foreground mt-3 max-w-md">
              This luggage was analyzed before
              AI-based pricing estimation was enabled.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  /* ---------------- CALCULATIONS ---------------- */

  const estimatedVolumeCost =
    pricing.volume * pricing.volumeRate

  const estimatedDistanceCost =
    (pricing.distance || 0) *
    (pricing.distanceRate || 0)

  return (
    <Card className="rounded-3xl border shadow-xl overflow-hidden">
      {/* HEADER */}

      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-background border-b">
        <CardHeader className="py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <IndianRupee className="h-7 w-7 text-primary" />
              </div>

              <div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  AI Pricing Estimation
                </CardTitle>

                <p className="text-muted-foreground mt-1">
                  Smart luggage cost analysis generated
                  using AI dimensions & volume detection
                </p>
              </div>
            </div>

            <Badge className="px-5 py-2 rounded-full text-sm font-medium">
              {pricing.category} Category
            </Badge>
          </div>
        </CardHeader>
      </div>

      <CardContent className="p-6 md:p-8 space-y-8">
        {/* TOTAL CARD */}

        <div className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary/5 to-background p-7 shadow-sm">
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles className="h-32 w-32" />
          </div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
                Estimated Total Cost
              </p>

              <h2 className="text-5xl font-black mt-3">
                ₹{pricing.totalCost}
              </h2>

              <p className="text-muted-foreground mt-3">
                Final estimated luggage transportation
                charge
              </p>
            </div>

            <div className="hidden md:flex h-24 w-24 rounded-full bg-primary/10 items-center justify-center">
              <IndianRupee className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>

        {/* BREAKDOWN */}

        <div>
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck className="h-5 w-5 text-primary" />

            <h3 className="text-2xl font-bold">
              Cost Breakdown
            </h3>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* BASE */}

            <div className="rounded-2xl border bg-background p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-blue-500" />
                </div>

                <Badge variant="secondary">
                  Fixed
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Base Fare
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹{pricing.baseFare}
              </h3>
            </div>

            {/* VOLUME */}

            <div className="rounded-2xl border bg-background p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Layers3 className="h-5 w-5 text-purple-500" />
                </div>

                <Badge variant="secondary">
                  AI Volume
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Volume Charges
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹{Math.round(estimatedVolumeCost)}
              </h3>

              <p className="text-sm text-muted-foreground mt-3">
                {pricing.volume.toFixed(2)}L × ₹
                {pricing.volumeRate}/L
              </p>
            </div>

            {/* DISTANCE */}

            <div className="rounded-2xl border bg-background p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-green-500" />
                </div>

                <Badge variant="secondary">
                  Travel
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Distance Charges
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹{Math.round(estimatedDistanceCost)}
              </h3>

              <p className="text-sm text-muted-foreground mt-3">
                {pricing.distance || 0}km × ₹
                {pricing.distanceRate || 0}/km
              </p>
            </div>

            {/* PRIORITY */}

            <div className="rounded-2xl border bg-background p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-orange-500" />
                </div>

                <Badge variant="secondary">
                  Extra
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Priority Fee
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹{pricing.urgencyFee || 0}
              </h3>

              <p className="text-sm text-muted-foreground mt-3">
                Additional handling & fast delivery
              </p>
            </div>
          </div>
        </div>

        {/* CATEGORY */}

        <div className="rounded-3xl border bg-muted/40 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
              Detected Luggage Category
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {pricing.category} Luggage
            </h3>
          </div>

          <Badge className="px-6 py-3 text-sm rounded-full">
            AI Verified
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}