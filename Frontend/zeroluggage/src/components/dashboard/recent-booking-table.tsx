"use client"

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
  {
    id: "ZL-0001",
    customer: "Alice Smith",
    status: "Completed",
    pickup: "2024-07-10",
    delivery: "2024-07-12",
    amount: "$120.00",
  },
  {
    id: "ZL-0002",
    customer: "Bob Johnson",
    status: "In Progress",
    pickup: "2024-07-06",
    delivery: "2024-07-07",
    amount: "$70.00",
  },
  {
    id: "ZL-0003",
    customer: "Charlie Brown",
    status: "Pending",
    pickup: "2024-07-23",
    delivery: "2024-07-30",
    amount: "$40.00",
  },
  {
    id: "ZL-0004",
    customer: "Diana Prince",
    status: "Completed",
    pickup: "2024-06-18",
    delivery: "2024-06-20",
    amount: "$65.00",
  },
  {
    id: "ZL-0005",
    customer: "Eve Adams",
    status: "Cancelled",
    pickup: "2024-06-20",
    delivery: "2024-06-22",
    amount: "$48.00",
  },
  {
    id: "ZL-0006",
    customer: "Frank Green",
    status: "In Progress",
    pickup: "2024-06-25",
    delivery: "2024-06-29",
    amount: "$58.00",
  },
  {
    id: "ZL-0007",
    customer: "Grace Hopper",
    status: "Pending",
    pickup: "2024-07-09",
    delivery: "2024-07-31",
    amount: "$50.00",
  },
]

function StatusBadge({ status }: { status: Row["status"] }) {
  const colorMap: Record<Row["status"], string> = {
    Completed: "bg-[#4CAF50]/20 text-[#4CAF50]",
    "In Progress": "bg-[#FFD93D]/20 text-[#C58B00]",
    Pending: "bg-[#2196F3]/20 text-[#1E88E5]",
    Cancelled: "bg-[#F44336]/20 text-[#E53935]",
  }

  return (
    <Badge
      className={`${colorMap[status]} rounded-sm px-2 py-0 text-[11px] font-medium border-none`}
    >
      {status}
    </Badge>
  )
}

export function RecentBookingsTable() {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">Recent Bookings</CardTitle>
        <p className="text-xs text-muted-foreground">Overview of the latest luggage delivery requests.</p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
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
              <tr key={r.id} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-3 py-2 text-foreground">{r.id}</td>
                <td className="px-3 py-2 text-foreground">{r.customer}</td>
                <td className="px-3 py-2">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-3 py-2 text-foreground">{r.pickup}</td>
                <td className="px-3 py-2 text-foreground">{r.delivery}</td>
                <td className="px-3 py-2 text-right text-foreground">{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex justify-end">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
