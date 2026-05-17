"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"

import {
  Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card"

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
  Image as ImageIcon,
  ScanFace,
  Eye,
  FileText,
  Send,
  Loader2,
  Activity,
} from "lucide-react"

/* ---------------- STATS ---------------- */

const stats = [
  { title: "Images Processed", value: "1,240", icon: ImageIcon, glow: "from-blue-500/20" },
  { title: "Faces Detected", value: "8,930", icon: ScanFace, glow: "from-purple-500/20" },
  { title: "Objects Found", value: "3,450", icon: Eye, glow: "from-cyan-500/20" },
  { title: "OCR Scans", value: "620", icon: FileText, glow: "from-emerald-500/20" },
]

export default function DashboardPage() {
  const [feedback, setFeedback] = useState("")
  const [submittingFeedback, setSubmittingFeedback] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ai/results`,
          { credentials: "include" }
        )

        const data = await res.json()
        setResults(data?.results || data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  /* ---------------- FEEDBACK ---------------- */

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      toast.warn("Please enter feedback")
      return
    }

    try {
      setSubmittingFeedback(true)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/submit`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: feedback }),
        }
      )

      if (!res.ok) throw new Error()

      setFeedback("")
      toast.success("Feedback submitted 🎉")
    } catch {
      toast.error("Failed to submit feedback")
    } finally {
      setSubmittingFeedback(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            AI Vision Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time OpenCV inference & analytics
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="w-4 h-4 text-green-500 animate-pulse" />
          Live System
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.title}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="relative overflow-hidden border bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition-all">

              {/* glow background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.glow} opacity-40`} />

              <CardHeader className="relative flex flex-row items-center justify-between">
                <div>
                  <CardDescription className="text-xs uppercase tracking-wider">
                    {s.title}
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold">
                    {s.value}
                  </CardTitle>
                </div>

                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <s.icon className="text-slate-700" />
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ---------------- RESULTS ---------------- */}

      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle>AI Processing Pipeline</CardTitle>
          <CardDescription>
            Latest inference results from OpenCV / ML models
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl overflow-hidden border">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Prediction</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10">
                      <Loader2 className="mx-auto animate-spin mb-2" />
                      Loading AI results...
                    </TableCell>
                  </TableRow>
                ) : results.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      No AI results found
                    </TableCell>
                  </TableRow>
                ) : (
                  results.map((r, i) => (
                    <TableRow
                      key={i}
                      className="hover:bg-slate-50 transition"
                    >
                      <TableCell className="font-medium">
                        {r.fileName || "image.jpg"}
                      </TableCell>
                      <TableCell>{r.type || "object-detection"}</TableCell>
                      <TableCell className="font-medium">
                        {r.label || "Unknown"}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-xs">
                          {r.confidence
                            ? `${(r.confidence * 100).toFixed(1)}%`
                            : "N/A"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- FEEDBACK ---------------- */}

      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle>Model Feedback Loop</CardTitle>
          <CardDescription>
            Improve AI accuracy by sharing insights
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Textarea
            placeholder="e.g. Face detection accuracy is low in low light conditions..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-28"
          />
        </CardContent>

        <CardFooter>
          <Button
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            onClick={handleSubmitFeedback}
            disabled={submittingFeedback}
          >
            {submittingFeedback ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}