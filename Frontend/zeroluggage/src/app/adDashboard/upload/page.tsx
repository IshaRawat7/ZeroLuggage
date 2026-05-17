"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  Loader2,
  Eye,
  View,
  UploadCloud,
  CheckCircle2,
  Ruler,
  ImageIcon,
} from "lucide-react"

type ResultType = {
  id: number
  status: string

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
    label: string
    confidence: number
  }[]
}

export default function UploadImagePage() {
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [sideFile, setSideFile] = useState<File | null>(null)

  const [frontPreview, setFrontPreview] = useState<string | null>(null)
  const [sidePreview, setSidePreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState<ResultType | null>(null)

  /* ---------------- FRONT IMAGE ---------------- */

  const handleFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setFrontFile(file)
    setFrontPreview(URL.createObjectURL(file))
  }

  /* ---------------- SIDE IMAGE ---------------- */

  const handleSide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setSideFile(file)
    setSidePreview(URL.createObjectURL(file))
  }

  /* ---------------- FETCH JOB RESULT ---------------- */

  const fetchJobResult = async (jobId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/job/${jobId}`,
        {
          credentials: "include",
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch results")
      }

      const data = await res.json()

      setResult(data.result)
    } catch (err) {
      console.error(err)
    }
  }

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (!frontFile || !sideFile) {
      toast.warn("Please upload BOTH front and side images")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()

      // MUST MATCH BACKEND FIELD NAMES
      formData.append("frontImage", frontFile)
      formData.append("sideImage", sideFile)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/upload-luggage`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const data = await res.json()

      toast.success("Images uploaded successfully 🚀")

      // CLEAR FORM
      setFrontFile(null)
      setSideFile(null)

      setFrontPreview(null)
      setSidePreview(null)

      const jobId = data.job.id

      // FETCH RESULT
      fetchJobResult(jobId)
    } catch (err) {
      console.error(err)
      toast.error("Upload failed ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* ---------------- HEADER ---------------- */}

      <div>
        <h1 className="text-3xl font-bold">
          Multi-View Luggage Detection
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Upload front & side view images for OpenCV / YOLOv8
          dimension analysis
        </p>
      </div>

      {/* ---------------- UPLOAD GRID ---------------- */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* FRONT VIEW */}

        <Card className="border-2 border-dashed hover:border-sky-400 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="size-5 text-sky-600" />
              Front View Image
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFront}
              className="w-full text-sm"
            />

            {frontPreview ? (
              <div className="relative rounded-xl overflow-hidden border bg-gray-50">
                <img
                  src={frontPreview}
                  alt="Front Preview"
                  className="w-full h-72 object-contain"
                />
              </div>
            ) : (
              <div className="h-72 border rounded-xl flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="size-10 mb-2" />
                Upload Front View
              </div>
            )}
          </CardContent>
        </Card>

        {/* SIDE VIEW */}

        <Card className="border-2 border-dashed hover:border-sky-400 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <View className="size-5 text-sky-600" />
              Side View Image
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleSide}
              className="w-full text-sm"
            />

            {sidePreview ? (
              <div className="relative rounded-xl overflow-hidden border bg-gray-50">
                <img
                  src={sidePreview}
                  alt="Side Preview"
                  className="w-full h-72 object-contain"
                />
              </div>
            ) : (
              <div className="h-72 border rounded-xl flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="size-10 mb-2" />
                Upload Side View
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ---------------- SUBMIT ---------------- */}

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white text-base"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 size-5 animate-spin" />
            Uploading & Processing...
          </>
        ) : (
          <>
            <UploadCloud className="mr-2 size-5" />
            Run AI Analysis
          </>
        )}
      </Button>

      {/* ---------------- RESULTS ---------------- */}

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* STATUS */}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Job Status

                <Badge className="bg-sky-100 text-sky-700 border-sky-200">
                  {result.status}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* DIMENSIONS */}

          {result.dimension && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="size-5 text-sky-600" />
                  Calculated Dimensions
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl border bg-sky-50">
                    <p className="text-sm text-gray-500">Width</p>

                    <h2 className="text-2xl font-bold text-sky-700">
                      {result.dimension.width}
                      {result.dimension.unit}
                    </h2>
                  </div>

                  <div className="p-5 rounded-xl border bg-sky-50">
                    <p className="text-sm text-gray-500">Height</p>

                    <h2 className="text-2xl font-bold text-sky-700">
                      {result.dimension.height}
                      {result.dimension.unit}
                    </h2>
                  </div>

                  <div className="p-5 rounded-xl border bg-sky-50">
                    <p className="text-sm text-gray-500">Depth</p>

                    <h2 className="text-2xl font-bold text-sky-700">
                      {result.dimension.depth}
                      {result.dimension.unit}
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* DETECTIONS */}

          {result.results && result.results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Detected Objects</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {result.results.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-green-600" />

                        <span className="font-medium capitalize">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-sm text-sky-600 font-medium">
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
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}