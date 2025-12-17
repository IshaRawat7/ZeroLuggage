"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Row = {
  id: string
  customer: string
  status: "Completed" | "In Progress" | "Pending" | "Cancelled"
  pickup: string
  delivery: string
  amount: string
}

const rows: Row[] = [
  { id: "ZL-0001", customer: "Aarav Sharma", status: "Completed", pickup: "2024-07-10", delivery: "2024-07-12", amount: "₹9,800" },
  { id: "ZL-0002", customer: "Priya Verma", status: "In Progress", pickup: "2024-07-06", delivery: "2024-07-07", amount: "₹5,700" },
  { id: "ZL-0003", customer: "Rohan Mehta", status: "Pending", pickup: "2024-07-23", delivery: "2024-07-30", amount: "₹3,200" },
  { id: "ZL-0004", customer: "Ananya Singh", status: "Completed", pickup: "2024-06-18", delivery: "2024-06-20", amount: "₹5,100" },
  { id: "ZL-0005", customer: "Vikram Joshi", status: "Cancelled", pickup: "2024-06-20", delivery: "2024-06-22", amount: "₹3,800" },
  { id: "ZL-0006", customer: "Neha Gupta", status: "In Progress", pickup: "2024-06-25", delivery: "2024-06-29", amount: "₹4,600" },
  { id: "ZL-0007", customer: "Kunal Malhotra", status: "Pending", pickup: "2024-07-09", delivery: "2024-07-31", amount: "₹4,100" },
]

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status }: { status: Row["status"] }) {
  const colorMap: Record<Row["status"], string> = {
    Completed: "bg-[#4CAF50]/20 text-[#4CAF50]",
    "In Progress": "bg-[#FFD93D]/20 text-[#C58B00]",
    Pending: "bg-[#2196F3]/20 text-[#1E88E5]",
    Cancelled: "bg-[#F44336]/20 text-[#E53935]",
  }

  return (
    <Badge
      className={`${colorMap[status]} flex items-center gap-1 rounded-sm px-2 py-0 text-[11px] font-medium border-none`}
    >
      {status}
      {status === "In Progress" && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#C58B00] animate-pulse" />
      )}
    </Badge>
  )
}

/* ---------------- TABLE ---------------- */

export function RecentBookingsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">
            Recent Bookings
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Overview of the latest luggage delivery requests.
          </p>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <motion.table
            className="w-full border-collapse text-sm"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            <thead>
              <tr className="bg-muted/40 text-muted-foreground">
                <th className="px-3 py-2 text-left font-medium">Booking</th>
                <th className="px-3 py-2 text-left font-medium">Customer</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-left font-medium">Pickup Date</th>
                <th className="px-3 py-2 text-left font-medium">Delivery Date</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className={`transition ${i % 2 === 1 ? "bg-muted/20" : ""}`}
                >
                  <td className="px-3 py-2 font-medium text-foreground">
                    {r.id}
                  </td>
                  <td className="px-3 py-2 text-foreground">
                    {r.customer}
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-3 py-2 text-foreground">
                    {r.pickup}
                  </td>
                  <td className="px-3 py-2 text-foreground">
                    {r.delivery}
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-foreground">
                    {r.amount}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>

          <motion.div className="mt-4 flex justify-end" whileHover={{ scale: 1.05 }}>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
