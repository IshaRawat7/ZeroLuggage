"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"

const data = [
  { name: "Completed", value: 62 },
  { name: "In-Progress", value: 18 },
  { name: "Pending", value: 12 },
  { name: "Cancelled", value: 8 },
]

// Color mapping based on status
const COLORS: Record<string, string> = {
  Completed: "#4CAF50", // Green
  "In-Progress": "#FFD93D", // Yellow
  Pending: "#2196F3", // Blue
  Cancelled: "#F44336", // Red
}

export function DeliveryStatusChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">
            Delivery Status Distribution
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Current status of all deliveries.
          </p>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={1200} // 1.2s animation
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name]}
                    // Optional: Add individual animation delays for each slice
                    strokeWidth={1}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  borderRadius: 8,
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={24}
                formatter={(value) => (
                  <span style={{ color: "hsl(var(--muted-foreground))", fontSize: 12 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
