"use client"

import { useState } from "react"
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
} from "lucide-react"

export default function PlaygroundPage() {
  const [confidence, setConfidence] = useState([30])

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Boxes className="size-5 text-sky-600" />
             Detection Output.....
          </CardTitle>
        </CardHeader>

        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-xl overflow-auto text-sm">
{`{
  "label": "suitcase",
  "confidence": 0.94,
  "x": 102,
  "y": 88,
  "width": 46
  "height": 63,
  "Depth":31
}`}
          </pre>
        </CardContent>
      </Card>
    </motion.div>
  )
}



