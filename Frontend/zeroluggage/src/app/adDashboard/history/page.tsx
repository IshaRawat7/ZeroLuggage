"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  History,
  Loader2,
  Eye,
  View,
  Calendar,
  Ruler,
  Boxes,
  RefreshCcw,
} from "lucide-react"

type JobType = {
  id: number
  status: string
  createdAt: string

  media: {
    id: number
    viewType: "FRONT" | "SIDE"
    media: {
      url: string
    }
  }[]

  dimension?: {
    width: number
    height: number
    depth: number
    unit: string
  }

  results?: {
    id: number
    label: string
    confidence: number
  }[]
}

export default function AIHistoryPage() {
  const [jobs, setJobs] = useState<JobType[]>([])
  const [loading, setLoading] = useState(true)

  const fetchHistory = async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/history`,
        {
          credentials: "include",
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch history")
      }

    const data = await res.json()

setJobs(data.history || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <History className="text-sky-600" />
            AI Analysis History
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View all uploaded luggage scans, dimensions & AI detections
          </p>
        </div>

        <Button
          variant="outline"
          onClick={fetchHistory}
          className="gap-2"
        >
          <RefreshCcw className="size-4" />
          Refresh
        </Button>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="size-10 animate-spin text-sky-600" />
        </div>
      ) : jobs.length === 0 ? (
        <Card>
          <CardContent className="h-[300px] flex flex-col items-center justify-center text-center text-gray-400">
            <History className="size-12 mb-3" />
            <p className="text-lg font-medium">No AI History Found</p>
            <p className="text-sm">
              Upload luggage images to start analysis
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => {
            const frontImage = job.media.find(
              (m) => m.viewType === "FRONT"
            )

            const sideImage = job.media.find(
              (m) => m.viewType === "SIDE"
            )

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="border-b bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">
                          AI Job #{job.id}
                        </CardTitle>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                          <Calendar className="size-4" />
                          {new Date(job.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <Badge className="w-fit bg-sky-100 text-sky-700 border-sky-200">
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* IMAGES */}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* FRONT */}

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 font-medium">
                          <Eye className="size-4 text-sky-600" />
                          Front View
                        </div>

                        {frontImage && (
                          <div className="rounded-xl overflow-hidden border bg-gray-50">
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${frontImage.media.url}`}
                              alt="Front View"
                              className="w-full h-64 object-contain"
                            />
                          </div>
                        )}
                      </div>

                      {/* SIDE */}

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 font-medium">
                          <View className="size-4 text-sky-600" />
                          Side View
                        </div>

                        {sideImage && (
                          <div className="rounded-xl overflow-hidden border bg-gray-50">
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${sideImage.media.url}`}
                              alt="Side View"
                              className="w-full h-64 object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DIMENSIONS */}

                    {job.dimension && (
                      <div>
                        <div className="flex items-center gap-2 mb-4 font-semibold text-lg">
                          <Ruler className="size-5 text-sky-600" />
                          Dimension Analysis
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-5 rounded-2xl bg-sky-50 border">
                            <p className="text-sm text-gray-500">Width</p>

                            <h2 className="text-2xl font-bold text-sky-700 mt-1">
                              {job.dimension.width}
                              {job.dimension.unit}
                            </h2>
                          </div>

                          <div className="p-5 rounded-2xl bg-sky-50 border">
                            <p className="text-sm text-gray-500">Height</p>

                            <h2 className="text-2xl font-bold text-sky-700 mt-1">
                              {job.dimension.height}
                              {job.dimension.unit}
                            </h2>
                          </div>

                          <div className="p-5 rounded-2xl bg-sky-50 border">
                            <p className="text-sm text-gray-500">Depth</p>

                            <h2 className="text-2xl font-bold text-sky-700 mt-1">
                              {job.dimension.depth}
                              {job.dimension.unit}
                            </h2>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DETECTIONS */}

                    {job.results && job.results.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4 font-semibold text-lg">
                          <Boxes className="size-5 text-sky-600" />
                          Object Detection Results
                        </div>

                        <div className="grid gap-3">
                          {job.results.map((item) => (
                            <div
                              key={item.id}
                              className="p-4 rounded-xl border bg-gray-50"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium capitalize">
                                  {item.label}
                                </span>

                                <span className="text-sm text-sky-600 font-semibold">
                                  {(item.confidence * 100).toFixed(1)}%
                                </span>
                              </div>

                              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-2 bg-sky-500 rounded-full"
                                  style={{
                                    width: `${item.confidence * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
