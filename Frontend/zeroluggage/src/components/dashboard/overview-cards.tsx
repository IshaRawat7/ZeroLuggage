import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, CheckCircle2, BadgeCheck } from "lucide-react"

export function OverviewCards() {
  const items = [
    {
      title: "Total Users",
      value: "1,234",
      sub: "Increased by 5% this month",
      Icon: Users,
    },
    {
      title: "Total Revenue",
      value: "$87,654",
      sub: "Up 12% from last quarter",
      Icon: DollarSign,
    },
    {
      title: "Completed Deliveries",
      value: "3,456",
      sub: "95% completion rate",
      Icon: CheckCircle2,
    },
    {
      title: "Active Agents",
      value: "120",
      sub: "85% of total agents",
      Icon: BadgeCheck,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, value, sub, Icon }) => (
        <Card key={title} className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
