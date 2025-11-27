import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Package, Truck, CreditCard, Crown, Send } from "lucide-react"

export default function DashboardPage() {
  const rows = [
    {
      id: "ZL0101",
      status: "Delivered" as const,
      pickup: "2024-07-10",
      dropoff: "2024-07-12",
      destination: "New York, USA",
      count: 2,
      price: 120,
    },
    {
      id: "ZL0102",
      status: "Confirmed" as const,
      pickup: "2024-08-01",
      dropoff: "2024-08-03",
      destination: "London, UK",
      count: 3,
      price: 180,
    },
    {
      id: "ZL0103",
      status: "Pending" as const,
      pickup: "2024-08-15",
      dropoff: "2024-08-17",
      destination: "Paris, France",
      count: 1,
      price: 60,
    },
    {
      id: "ZL0104",
      status: "Delivered" as const,
      pickup: "2024-06-20",
      dropoff: "2024-06-22",
      destination: "Tokyo, Japan",
      count: 2,
      price: 150,
    },
    {
      id: "ZL0105",
      status: "Confirmed" as const,
      pickup: "2024-09-05",
      dropoff: "2024-09-07",
      destination: "Rome, Italy",
      count: 2,
      price: 130,
    },
  ]

  const StatusBadge = ({ s }: { s: "Delivered" | "Confirmed" | "Pending" }) => {
    const map = {
      Delivered: "bg-emerald-100 text-emerald-700",
      Confirmed: "bg-blue-100 text-blue-700",
      Pending: "bg-amber-100 text-amber-800",
    }
    return (
      <Badge variant="secondary" className={map[s]}>
        {s}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome Back, Alice!</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle className="text-2xl">12</CardTitle>
            </div>
            <Package className="size-6 text-sky-600 " aria-hidden />
          </CardHeader>
        </Card>

        {/* Upcoming Deliveries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>Upcoming Deliveries</CardDescription>
              <CardTitle className="text-2xl">3</CardTitle>
            </div>
            <Truck className="size-6 text-sky-600" aria-hidden />
          </CardHeader>
        </Card>

        {/* Pending Payments (highlight) */}
        <Card className=" ring-1 ring-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>Pending Payments</CardDescription>
              <CardTitle className="text-2xl">$75.00</CardTitle>
            </div>
            <CreditCard className="size-6 text-sky-600" aria-hidden />
          </CardHeader>
        </Card>

        {/* Active Subscription */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>Active Subscription</CardDescription>
              <CardTitle className="text-2xl">Premium</CardTitle>
            </div>
            <Crown className="size-6 text-sky-600" aria-hidden />
          </CardHeader>
        </Card>
      </div>

      {/* Booking History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Booking History</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader className="[&_tr]:bg-muted/40">
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pickup Date</TableHead>
                  <TableHead>Drop-off Date</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead className="text-right">Luggage Count</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell>
                      <StatusBadge s={r.status} />
                    </TableCell>
                    <TableCell>{r.pickup}</TableCell>
                    <TableCell>{r.dropoff}</TableCell>
                    <TableCell>{r.destination}</TableCell>
                    <TableCell className="text-right">{r.count}</TableCell>
                    <TableCell className="text-right">${r.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="h-10">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bottom two-column cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscription Management</CardTitle>
            <CardDescription>
              Your current plan: <span className="font-medium text-foreground">Premium Plan</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="grid gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                Unlimited Bookings
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                Priority Support
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                Insurance Coverage
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                Real-time Tracking
              </li>
            </ul>
            <div className="text-xs text-muted-foreground">Expires on: 2025-07-15</div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 bg-sky-600 hover:bg-sky-600 text-white hover:text-white">Manage Subscription</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="divide-y">
                <div className="flex items-center justify-between p-3 text-sm">
                  <div>
                    <div className="font-medium">Booking ZL0101</div>
                    <div className="text-xs text-muted-foreground">2024-07-09</div>
                  </div>
                  <div className="font-medium">$120.00</div>
                </div>
                <div className="flex items-center justify-between p-3 text-sm">
                  <div>
                    <div className="font-medium">Subscription Renewal</div>
                    <div className="text-xs text-muted-foreground">2024-07-15</div>
                  </div>
                  <div className="font-medium">$25.00</div>
                </div>
                <div className="flex items-center justify-between p-3 text-sm">
                  <div>
                    <div className="font-medium">Booking ZL0104</div>
                    <div className="text-xs text-muted-foreground">2024-06-19</div>
                  </div>
                  <div className="font-medium">$150.00</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-transparent h-12">
              View All Payments
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Leave Us Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Tell us about your experience..."
            className="min-h-28 resize-y"
            aria-label="Feedback"
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full h-12 bg-sky-600 hover:bg-sky-600 text-white hover:text-white">
            <Send className="mr-2 size-4 " aria-hidden />
            <span>Submit Feedback</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
