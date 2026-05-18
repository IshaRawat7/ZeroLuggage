"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import PricingBreakdown from "@/components/Home/pricingBreakdown"

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

export default function CostEstimationPage() {
  const [pricing, setPricing] =
    useState<PricingData | null>(null)

  const [loading, setLoading] = useState(true)

  const params = useParams()
  const jobID = params.jobID

  useEffect(() => {
    if (jobID) {
      fetchPricing()
    }
  }, [jobID])

  const fetchPricing = async () => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || ""

      const res = await fetch(
        `${apiUrl}/api/ai/job/${jobID}`
      )

      const data = await res.json()

      console.log("FULL API RESPONSE:", data)

      console.log("PRICING:", data?.result?.pricing)

      setPricing(data?.result?.pricing || null)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading pricing...
      </div>
    )
  }

  return (
    <div className="p-6">
      <PricingBreakdown pricing={pricing} />
    </div>
  )
}