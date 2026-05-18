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

/* ---------------- TYPES (FIXED TO MATCH BACKEND) ---------------- */

type ResultType = {
  id?: number
  status?: string

  media?: {
    id: number
    viewType: "FRONT" | "SIDE"
    media: {
      url: string
    }
  }[]

  dimensions?: {
    width: number
    height: number
    depth: number
    unit: string
  }

  detections?: {
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

      if (!res.ok) throw new Error("Failed to fetch results")

      const data = await res.json()

      setResult(data.result) // ✅ backend already normalizes result
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

      if (!res.ok) throw new Error("Upload failed")

      const data = await res.json()

      toast.success("Images uploaded successfully 🚀")

      setFrontFile(null)
      setSideFile(null)
      setFrontPreview(null)
      setSidePreview(null)

      fetchJobResult(data.job.id) // ✅ correct
    } catch (err) {
      console.error(err)
      
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
          Upload front & side view images for OpenCV / YOLOv8 dimension analysis
        </p>
      </div>

      {/* ---------------- UPLOAD GRID ---------------- */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* FRONT */}
        <Card className="border-2 border-dashed hover:border-sky-400 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="size-5 text-sky-600" />
              Front View Image
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <input type="file" accept="image/*" onChange={handleFront} />

            {frontPreview ? (
              <img src={frontPreview} className="h-72 w-full object-contain" />
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-400">
                <ImageIcon className="size-10" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* SIDE */}
        <Card className="border-2 border-dashed hover:border-sky-400 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <View className="size-5 text-sky-600" />
              Side View Image
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <input type="file" accept="image/*" onChange={handleSide} />

            {sidePreview ? (
              <img src={sidePreview} className="h-72 w-full object-contain" />
            ) : (
              <div className="h-72 flex items-csenter justify-center text-gray-400">
                <ImageIcon className="size-10" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ---------------- BUTTON ---------------- */}

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-12 bg-sky-600"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            Uploading & Processing...
          </>
        ) : (
          <>
            <UploadCloud className="mr-2" />
            Run AI Analysis
          </>
        )}
      </Button>

      {/* ---------------- RESULTS ---------------- */}

      {result && (
        <motion.div className="space-y-6">
          {/* STATUS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                Job Status
                <Badge>{result.status}</Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* DIMENSIONS */}
          {result.dimensions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="size-5 text-sky-600" />
                  Dimensions
                </CardTitle>
              </CardHeader>

              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>W: {result.dimensions.width}{result.dimensions.unit}</div>
                <div>H: {result.dimensions.height}{result.dimensions.unit}</div>
                <div>D: {result.dimensions.depth}{result.dimensions.unit}</div>
              </CardContent>
            </Card>
          )}

          {/* DETECTIONS */}
          {result.detections?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Detections</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {result.detections.map((item, i) => (
                  <div key={i} className="p-4 border rounded">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="text-green-600 size-4" />
                        {item.label}
                      </span>

                      <span>{(item.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </motion.div>
      )}
    </motion.div>
  )
}