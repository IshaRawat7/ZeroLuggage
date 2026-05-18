"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Slider } from "@/components/ui/slider"

import {
  Boxes,
  SlidersHorizontal,
  Loader2,
} from "lucide-react"

type Detection = {
  label: string
  confidence: number
}

type AIResponse = {
  dimensions?: {
    width: number
    height: number
    depth: number
    unit: string
  }

  volume?: {
    value: number
    unit: string
  }

  detections?: Detection[]
}

export default function PlaygroundPage() {
  const [confidence, setConfidence] = useState([30])

  const [data, setData] = useState<AIResponse | null>(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  /* ----------------------------------------
     FETCH AI HISTORY / LATEST RESULT
  ----------------------------------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ai/history`,
          {
            credentials: "include",
          }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch AI data")
        }

        const response = await res.json()

        const latestJob = response.history?.[0]

        if (!latestJob) {
          setError("No AI results found")
          return
        }

        setData({
          dimensions: latestJob.dimension
            ? {
                width: latestJob.dimension.width,
                height: latestJob.dimension.height,
                depth: latestJob.dimension.depth,
                unit: latestJob.dimension.unit,
              }
            : undefined,

          volume: latestJob.volume
            ? {
                value: latestJob.volume.value,
                unit: latestJob.volume.unit,
              }
            : undefined,

          detections: latestJob.results?.map((item: any) => ({
            label: item.label,
            confidence: item.confidence,
          })),
        })
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  /* ----------------------------------------
     FILTER DETECTIONS USING SLIDER
  ----------------------------------------- */

  const filteredDetections = useMemo(() => {
    if (!data?.detections) return []

    return data.detections.filter(
      (item) => item.confidence * 100 >= confidence[0]
    )
  }, [data, confidence])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">
          Detection Playground
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Test YOLO detection thresholds & AI response tuning
        </p>
      </div>

      {/* ---------------- SLIDER ---------------- */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-sky-600" />
            Confidence Threshold
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Slider
            value={confidence}
            onValueChange={setConfidence}
            max={100}
            step={1}
          />

          <div className="text-lg font-semibold text-sky-700">
            {confidence[0]}%
          </div>
        </CardContent>
      </Card>

      {/* ---------------- OUTPUT ---------------- */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Boxes className="size-5 text-sky-600" />
            Detection Output
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading && (
            <div className="flex items-center gap-2 text-sky-600">
              <Loader2 className="size-5 animate-spin" />
              Loading AI Results...
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {!loading && data && (
            <>
              {/* DIMENSIONS */}

              {data.dimensions && (
                <div className="text-sm space-y-1">
                  <p>
                    <b>Width:</b>{" "}
                    {data.dimensions.width}{" "}
                    {data.dimensions.unit}
                  </p>

                  <p>
                    <b>Height:</b>{" "}
                    {data.dimensions.height}{" "}
                    {data.dimensions.unit}
                  </p>

                  <p>
                    <b>Depth:</b>{" "}
                    {data.dimensions.depth}{" "}
                    {data.dimensions.unit}
                  </p>
                </div>
              )}

              {/* VOLUME */}

              {data.volume && (
                <p className="text-sm">
                  <b>Volume:</b>{" "}
                  {data.volume.value}{" "}
                  {data.volume.unit}
                </p>
              )}

              {/* DETECTIONS */}

              <pre className="bg-gray-100 p-4 rounded-xl overflow-auto text-sm">
{JSON.stringify(filteredDetections, null, 2)}
              </pre>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}