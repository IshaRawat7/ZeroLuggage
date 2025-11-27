"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"

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

// Vibrant color palette
const colors = [
  "#FF6B6B", // Vibrant red
  "#FFD93D", // Bright yellow
  "#6BCB77", // Fresh green
  "#4D96FF", // Bright blue
  "#FF8C00", // Orange
  "#B983FF", // Purple
  "#FF5D8F", // Pink
  "#3DDC97", // Teal
  "#FFB830", // Golden
  "#00C2CB", // Cyan
  "#F15BB5", // Magenta
  "#9B5DE5", // Deep purple
]

export function MonthlyBookingsChart() {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">Monthly Bookings</CardTitle>
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
            <Bar dataKey="bookings" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
