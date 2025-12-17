"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Agent = {
  name: string
  status: "Online" | "On Delivery" | "Offline"
  rating: string
  deliveries: number
}

// Indian / Uttarakhand-inspired names
const agents: Agent[] = [
  { name: "Aarav Rawat", status: "Online", rating: "4.8", deliveries: 120 },
  { name: "Neha Joshi", status: "On Delivery", rating: "4.5", deliveries: 98 },
  { name: "Rohan Singh", status: "Online", rating: "4.6", deliveries: 135 },
  { name: "Ananya Chauhan", status: "Offline", rating: "4.2", deliveries: 84 },
  { name: "Karan Negi", status: "On Delivery", rating: "4.7", deliveries: 110 },
]

/* ---------------- STATUS BADGE ---------------- */
function Status({ s }: { s: Agent["status"] }) {
  const styles: Record<Agent["status"], string> = {
    Online:
      "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
    "On Delivery":
      "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
    Offline:
      "bg-muted text-muted-foreground ring-1 ring-muted",
  }

  return (
    <Badge
      className={`${styles[s]} rounded-md px-2 py-0 text-[11px] flex items-center gap-1`}
    >
      {s}
      {s === "On Delivery" && (
        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
      )}
    </Badge>
  )
}

/* ---------------- MAIN TABLE ---------------- */
export function AgentPerformanceTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden border bg-white/70 backdrop-blur-md hover:shadow-xl transition-all">
        {/* subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-blue-500/10 pointer-events-none" />

        <CardHeader className="relative">
          <CardTitle className="text-sm font-semibold text-foreground">
            Agent Performance
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Live delivery status & performance metrics
          </p>
        </CardHeader>

        <CardContent className="relative overflow-x-auto">
          <motion.table
            className="w-full border-collapse text-sm"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            <thead>
              <tr className="bg-muted/40 text-muted-foreground">
                <th className="px-3 py-2 text-left font-medium">
                  Agent
                </th>
                <th className="px-3 py-2 text-left font-medium">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium">
                  Rating
                </th>
                <th className="px-3 py-2 text-right font-medium">
                  Deliveries
                </th>
              </tr>
            </thead>

            <tbody>
              {agents.map((a, i) => (
                <motion.tr
                  key={a.name}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.01 }}
                  className={`transition ${
                    i % 2 === 1 ? "bg-muted/20" : ""
                  }`}
                >
                  {/* AGENT */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Avatar className="h-8 w-8 ring-1 ring-sky-200">
                          <AvatarFallback className="text-xs font-medium">
                            {a.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <span className="font-medium text-foreground">
                        {a.name}
                      </span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-3 py-3">
                    <Status s={a.status} />
                  </td>

                  {/* RATING */}
                  <td className="px-3 py-3 text-foreground">
                    ⭐ {a.rating}
                  </td>

                  {/* DELIVERIES */}
                  <td className="px-3 py-3 text-right font-medium text-foreground">
                    {a.deliveries}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
