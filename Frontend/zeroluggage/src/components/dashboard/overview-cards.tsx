"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, CheckCircle2, BadgeCheck } from "lucide-react"

const items = [
  {
    title: "Total Users",
    value: "1,234",
    sub: "Increased by 5% this month",
    Icon: Users,
    gradient: "from-sky-500/20 to-blue-500/20",
  },
  {
    title: "Total Revenue",
    value: "$87,654",
    sub: "Up 12% from last quarter",
    Icon: DollarSign,
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Completed Deliveries",
    value: "3,456",
    sub: "95% completion rate",
    Icon: CheckCircle2,
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Active Agents",
    value: "120",
    sub: "85% of total agents",
    Icon: BadgeCheck,
    gradient: "from-orange-500/20 to-amber-500/20",
  },
]

export function OverviewCards() {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {items.map(({ title, value, sub, Icon, gradient }) => (
        <motion.div
          key={title}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="relative overflow-hidden border bg-white/70 backdrop-blur-md hover:shadow-xl transition-all">
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`}
            />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>

            <CardContent className="relative">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15 }}
                className="text-2xl font-bold text-foreground"
              >
                {value}
              </motion.div>
              <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
