import type { Metadata } from "next"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { MonthlyBookingsChart } from "@/components/dashboard/monthly-booking-chart"
import { DeliveryStatusChart } from "@/components/dashboard/delivery-status-chart"
import { RecentBookingsTable } from "@/components/dashboard/recent-booking-table"
import { AgentPerformanceTable } from "@/components/dashboard/agent-performance-table"

export const metadata: Metadata = {
  title: "Admin Overview",
}

export default function AdminOverviewPage() {
  return (
    <main className="container mx-auto max-w-8xl px-4 py-6">
      <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground">Admin Overview</h1>

      <section className="mt-6">
        <OverviewCards />
      </section>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <MonthlyBookingsChart />
        <DeliveryStatusChart />
      </section>

      <section className="mt-6">
        <RecentBookingsTable />
      </section>

      <section className="mt-6">
        <AgentPerformanceTable />
      </section>
    </main>
  )
}
