"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { Package, Truck, CreditCard, Crown, Send } from "lucide-react"

export default function DashboardPage() {
  const [userName, setUserName] = useState("")
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        setUserName(parsedUser.name || "")
      } catch {
        setUserName("")
      }
    }
  }, [])

  /* -------------------- STATS -------------------- */
  const stats = [
    { title: "Total Trips", value: "12", subtitle: "Across Uttarakhand", icon: Package },
    { title: "Upcoming Deliveries", value: "3", subtitle: "Dehradun • Rishikesh", icon: Truck },
    { title: "Pending Payments", value: "₹6,250", subtitle: "Due this month", icon: CreditCard },
    { title: "Active Plan", value: "Himalayan Pro", subtitle: "Premium Coverage", icon: Crown },
  ]

  /* -------------------- BOOKING HISTORY -------------------- */
  const rows = [
    { id: "UK0101", status: "Delivered" as const, pickup: "2024-07-10", dropoff: "2024-07-12", destination: "Dehradun → Nainital", count: 2, price: 1800 },
    { id: "UK0102", status: "Confirmed" as const, pickup: "2024-08-01", dropoff: "2024-08-03", destination: "Haridwar → Rishikesh", count: 3, price: 2400 },
    { id: "UK0103", status: "Pending" as const, pickup: "2024-08-15", dropoff: "2024-08-17", destination: "Haldwani → Almora", count: 1, price: 950 },
  ]

  /* -------------------- STATUS BADGE -------------------- */
  const StatusBadge = ({ s }: { s: "Delivered" | "Confirmed" | "Pending" }) => {
    const map = {
      Delivered: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
      Confirmed: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
      Pending: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
    }
    return <Badge variant="secondary" className={map[s]}>{s}</Badge>
  }

  /* -------------------- FEEDBACK SUBMIT -------------------- */
  const handleSubmitFeedback = async () => {
    if (!feedback) return alert("Please enter feedback")
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, message: feedback }),
      })
      const data = await res.json()
      setFeedback("") // Clear textarea after submit
      alert("Feedback submitted successfully!")
    } catch (err) {
      console.error(err)
      alert("Failed to submit feedback")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Heading */}
      <h1 className="text-3xl font-bold tracking-tight text-black">
        Welcome Back{userName ? `, ${userName}` : ""}!
      </h1>

      {/* -------------------- STATS -------------------- */}
      <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
        {stats.map((item) => (
          <motion.div key={item.title} variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 200 }}>
            <Card className="group relative overflow-hidden border border-sky-100 bg-white/70 backdrop-blur-md hover:shadow-xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative flex flex-row items-center justify-between pb-2">
                <div>
                  <CardDescription className="text-xs uppercase tracking-wide">{item.title}</CardDescription>
                  <CardTitle className="text-3xl font-bold text-sky-700">{item.value}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                </div>
                <div className="rounded-xl bg-sky-100 p-3">
                  <item.icon className="size-6 text-sky-700" />
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* -------------------- BOOKING HISTORY -------------------- */}
      <motion.div whileHover={{ y: -2 }}>
        <Card>
          <CardHeader><CardTitle className="text-base">Uttarakhand Booking History</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Drop</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead className="text-right">Bags</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id} className="hover:bg-sky-50 transition">
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell><StatusBadge s={r.status} /></TableCell>
                      <TableCell>{r.pickup}</TableCell>
                      <TableCell>{r.dropoff}</TableCell>
                      <TableCell>{r.destination}</TableCell>
                      <TableCell className="text-right">{r.count}</TableCell>
                      <TableCell className="text-right">₹{r.price.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="outline">View</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* -------------------- SUBSCRIPTION + PAYMENTS -------------------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent" />
          <CardHeader>
            <CardTitle className="text-base">Himalayan Travel Plan 🏔️</CardTitle>
            <CardDescription>
              Active Plan: <span className="font-semibold text-sky-700">Himalayan Pro</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>✔ Unlimited Uttarakhand Routes</p>
            <p>✔ Hill-safe Luggage Handling</p>
            <p>✔ Monsoon Insurance Cover</p>
            <p>✔ Live Tracking in Remote Areas</p>
            <p className="text-xs mt-2">Expires: 15 July 2025</p>
          </CardContent>
          <CardFooter><Button className="w-full h-12 bg-sky-600 text-white">Manage Plan</Button></CardFooter>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent Payments</CardTitle></CardHeader>
          <CardContent>
            {[
              ["Trip Dehradun → Nainital", "09 Jul 2024", "₹1,800"],
              ["Himalayan Pro Renewal", "15 Jul 2024", "₹1,250"],
              ["Trip Haldwani → Almora", "19 Jun 2024", "₹950"],
            ].map(([t, d, p]) => (
              <div key={t} className="flex justify-between p-3 text-sm rounded-md hover:bg-muted/40 transition">
                <div>
                  <div className="font-medium">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
                <div className="font-medium">{p}</div>
              </div>
            ))}
          </CardContent>
          <CardFooter><Button variant="outline" className="w-full h-12">View All Payments</Button></CardFooter>
        </Card>
      </div>

      {/* -------------------- FEEDBACK -------------------- */}
      <Card>
        <CardHeader><CardTitle className="text-base">Apna Feedback Dein ✍️</CardTitle></CardHeader>
        <CardContent>
          <Textarea
            placeholder="Apna experience batayein — hills, delivery & service..."
            className="min-h-28 resize-y"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full h-12 bg-sky-600 text-white" onClick={handleSubmitFeedback}>
            <Send className="mr-2 size-4" /> Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
