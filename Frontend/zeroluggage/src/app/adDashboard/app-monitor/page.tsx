
"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"

export default function ApiMonitorPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">
          API Monitor
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitor backend & OpenCV API health status
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="size-5 text-sky-600" />
              Backend API
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border">
              <span>Status</span>

              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle2 className="size-4" />
                Online
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border">
              <span>Latency</span>

              <span className="font-semibold">42ms</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-sky-600" />
              OpenCV Service
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border">
              <span>Status</span>

              <div className="flex items-center gap-2 text-yellow-600 font-medium">
                <AlertTriangle className="size-4" />
                Pending Connection
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border">
              <span>Last Scan</span>

              <span className="font-semibold">2 mins ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
