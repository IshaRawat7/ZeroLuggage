"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"

import {
  BarChart3,
  Boxes,
  ScanLine,
  CheckCircle2,
  Activity,
  Clock3,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Database,
} from "lucide-react"

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Scans",
      value: "128",
      icon: ScanLine,
      desc: "Images processed by AI pipeline",
    },
    {
      title: "Detected Objects",
      value: "342",
      icon: Boxes,
      desc: "Objects identified by YOLO/OpenCV",
    },
    {
      title: "Completed Jobs",
      value: "119",
      icon: CheckCircle2,
      desc: "Successfully analyzed luggage jobs",
    },
    {
      title: "Success Rate",
      value: "92%",
      icon: BarChart3,
      desc: "Detection accuracy performance",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8 bg-gray-50 min-h-screen"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            AI Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Monitor luggage AI processing, detections,
            dimensions, system health & scan statistics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-medium border border-green-200">
            AI System Active
          </div>

          <div className="px-4 py-2 rounded-xl bg-sky-100 text-sky-700 text-sm font-medium border border-sky-200">
            YOLOv8 + OpenCV
          </div>
        </div>
      </div>

      {/* =====================================================
          TOP STATS
      ===================================================== */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
            >
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {item.title}
                      </p>

                      <h2 className="text-4xl font-bold mt-3">
                        {item.value}
                      </h2>

                      <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="size-16 rounded-3xl bg-sky-100 flex items-center justify-center">
                      <Icon className="size-8 text-sky-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* =====================================================
            LEFT SECTION
        ===================================================== */}

        <div className="xl:col-span-2 space-y-6">
          {/* PERFORMANCE */}

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="text-sky-600" />
                AI Processing Performance
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* ITEM */}

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Object Detection Accuracy</span>
                  <span className="font-semibold">92%</span>
                </div>

                <Progress value={92} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Dimension Detection</span>
                  <span className="font-semibold">88%</span>
                </div>

                <Progress value={88} />
              </div>

             
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Realtime Tracking</span>
                  <span className="font-semibold">95%</span>
                </div>

                <Progress value={95} />
              </div>
            </CardContent>
          </Card>

          {/* RECENT ACTIVITY */}

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="text-sky-600" />
                Recent AI Activity
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                "Luggage dimensions calculated successfully",
                "YOLO object detection completed",
                "Front-view image uploaded",
               
                "Side-view image processed",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl border bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-green-500" />

                    <p className="text-sm font-medium">
                      {item}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    Just now
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* =====================================================
            RIGHT SECTION
        ===================================================== */}

        <div className="space-y-6">
          {/* SYSTEM HEALTH */}

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="text-sky-600" />
                System Health
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="text-sky-600" />

                  <span className="text-sm font-medium">
                    AI Engine
                  </span>
                </div>

                <span className="text-green-600 font-semibold">
                  Healthy
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="text-sky-600" />

                  <span className="text-sm font-medium">
                    Database
                  </span>
                </div>

                <span className="text-green-600 font-semibold">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock3 className="text-sky-600" />

                  <span className="text-sm font-medium">
                    Avg Response
                  </span>
                </div>

                <span className="font-semibold">
                  1.2s
                </span>
              </div>
            </CardContent>
          </Card>

          {/* STORAGE */}

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Boxes className="text-sky-600" />
                Storage Insights
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Uploads Storage</span>
                  <span>68%</span>
                </div>

                <Progress value={68} />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>AI Results Storage</span>
                  <span>42%</span>
                </div>

                <Progress value={42} />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Database Capacity</span>
                  <span>57%</span>
                </div>

                <Progress value={57} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}