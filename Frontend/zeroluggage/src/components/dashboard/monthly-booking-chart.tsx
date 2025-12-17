"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"

// Booking data
const data = [
  { name: "Jan", bookings: 220 },
  { name: "Feb", bookings: 80 },
  { name: "Mar", bookings: 140 },
  { name: "Apr", bookings: 180 },
  { name: "May", bookings: 210 },
  { name: "Jun", bookings: 205 },
  { name: "Jul", bookings: 220 },
  { name: "Aug", bookings: 230 },
  { name: "Sep", bookings: 240 },
  { name: "Oct", bookings: 235 },
  { name: "Nov", bookings: 245 },
  { name: "Dec", bookings: 255 },
]

// Gradient colors for bars
const colors = [
  ["#FF6B6B", "#FF8E72"],
  ["#FFD93D", "#FFEC76"],
  ["#6BCB77", "#98E6B3"],
  ["#4D96FF", "#73B9FF"],
  ["#FF8C00", "#FFB14C"],
  ["#B983FF", "#D3A7FF"],
  ["#FF5D8F", "#FF84B5"],
  ["#3DDC97", "#5CE1AF"],
  ["#FFB830", "#FFD25E"],
  ["#00C2CB", "#40E0E5"],
  ["#F15BB5", "#F58DD0"],
  ["#9B5DE5", "#B28DF5"],
]

export function MonthlyBookingsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="border hover:shadow-xl transition-all relative overflow-hidden bg-white/70 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-blue-500/10 pointer-events-none" />
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">Monthly Bookings</CardTitle>
          <p className="text-xs text-muted-foreground">Booking volume over the last 12 months.</p>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  borderRadius: 8,
                }}
              />
              <Bar
                dataKey="bookings"
                radius={[6, 6, 0, 0]}
                isAnimationActive={true}
                animationDuration={1200}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#grad-${index})`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)"
                      e.currentTarget.style.transition = "transform 0.3s"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                  />
                ))}
              </Bar>
              {/* Define gradients */}
              <defs>
                {data.map((_, index) => (
                  <linearGradient key={index} id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors[index][0]} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={colors[index][1]} stopOpacity={0.7} />
                  </linearGradient>
                ))}
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
