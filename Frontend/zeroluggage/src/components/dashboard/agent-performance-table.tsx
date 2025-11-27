import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Agent = {
  name: string
  status: "Online" | "On Delivery" | "Offline"
  rating: string
  deliveries: number
}

const agents: Agent[] = [
  { name: "John Doe", status: "Online", rating: "4.8", deliveries: 120 },
  { name: "Jane Smith", status: "On Delivery", rating: "4.5", deliveries: 98 },
  { name: "Peter Parker", status: "Online", rating: "4.6", deliveries: 135 },
  { name: "Wily Mike", status: "Offline", rating: "4.2", deliveries: 84 },
  { name: "Robert Black", status: "On Delivery", rating: "4.7", deliveries: 110 },
]

function Status({ s }: { s: Agent["status"] }) {
  const styles: Record<Agent["status"], string> = {
    Online: "bg-primary/10 text-primary",
    "On Delivery": "bg-accent text-accent-foreground",
    Offline: "bg-secondary text-secondary-foreground",
  }
  return <Badge className={`${styles[s]} rounded-sm px-2 py-0 text-[11px]`}>{s}</Badge>
}

export function AgentPerformanceTable() {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">Agent Performance</CardTitle>
        <p className="text-xs text-muted-foreground">Current status and performance metrics of delivery agents.</p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/40 text-muted-foreground">
              <th className="px-3 py-2 text-left font-medium">Agent</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
              <th className="px-3 py-2 text-left font-medium">Rating</th>
              <th className="px-3 py-2 text-right font-medium">Deliveries</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a, i) => (
              <tr key={a.name} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {a.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">{a.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <Status s={a.status} />
                </td>
                <td className="px-3 py-2 text-foreground">{a.rating}</td>
                <td className="px-3 py-2 text-right text-foreground">{a.deliveries}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
