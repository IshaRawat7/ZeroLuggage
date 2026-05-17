"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  Camera,
  Video,
  Square,
  RefreshCw,
  ScanSearch,
} from "lucide-react"

export default function LiveCameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [streaming, setStreaming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  /* ---------------- START CAMERA ---------------- */

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: "environment",
        },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setStreaming(true)
      toast.success("Camera started 📸")
    } catch (err) {
      console.error(err)
      toast.error("Camera access denied ❌")
    }
  }

  /* ---------------- STOP CAMERA ---------------- */

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream

    stream?.getTracks().forEach((track) => track.stop())

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setStreaming(false)
    toast.info("Camera stopped")
  }

  /* ---------------- CAPTURE FRAME ---------------- */

  const captureFrame = async () => {
    if (!videoRef.current) return

    setLoading(true)

    const canvas = canvasRef.current
    const video = videoRef.current

    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(async (blob) => {
      if (!blob) return

      const formData = new FormData()
      formData.append("file", blob, "frame.jpg")

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ai/live-detect`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        )

        if (!res.ok) throw new Error("Detection failed")

        const data = await res.json()
        setResults(data?.results || [])

        toast.success("Frame processed 🚀")
      } catch (err) {
        console.error(err)
        toast.error("Detection failed ❌")
      } finally {
        setLoading(false)
      }
    }, "image/jpeg")
  }

  /* ---------------- UI ---------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Camera className="text-sky-600" />
          Live Camera Detection
        </h1>
        <p className="text-gray-500 text-sm">
          Real-time OpenCV / YOLO object & face detection
        </p>
      </div>

      {/* CAMERA CARD */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="size-5 text-sky-600" />
            Camera Feed
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* VIDEO */}
          <div className="relative rounded-xl overflow-hidden border bg-black">
            <video
              ref={videoRef}
              className="w-full h-[500px] object-cover"
              autoPlay
              playsInline
              muted
            />

            {/* overlay status */}
            <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {streaming ? "LIVE" : "OFFLINE"}
            </div>
          </div>

          {/* HIDDEN CANVAS */}
          <canvas ref={canvasRef} className="hidden" />

          {/* CONTROLS */}
          <div className="flex gap-3 flex-wrap">

            {!streaming ? (
              <Button
                onClick={startCamera}
                className="bg-sky-600 hover:bg-sky-700"
              >
                <Camera className="mr-2 size-4" />
                Start Camera
              </Button>
            ) : (
              <Button
                onClick={stopCamera}
                variant="destructive"
              >
                <Square className="mr-2 size-4" />
                Stop Camera
              </Button>
            )}

            <Button
              onClick={captureFrame}
              disabled={!streaming || loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ScanSearch className="mr-2 size-4" />
                  Detect Frame
                </>
              )}
            </Button>

          </div>
        </CardContent>
      </Card>

      {/* RESULTS */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detection Results</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex justify-between p-3 rounded-lg bg-gray-50 border"
              >
                <span className="font-medium">{r.label}</span>
                <span className="text-sm text-gray-600">
                  {(r.confidence * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}