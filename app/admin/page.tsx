"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import { Users, Building2, DollarSign, Activity, AlertCircle } from "lucide-react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { formatCurrency } from "@/lib/analytics"
import { Badge } from "@/components/ui/badge"

const platformStats = {
  totalBusinesses: 1248,
  activeUsers: 3892,
  totalRevenue: 485620000,
  totalTransactions: 15634,
  growthRate: 23.5,
  newBusinesses: 142,
}

const businessTypeData = [
  { name: "Poultry", value: 425, color: "#0A1F44" },
  { name: "Retail", value: 312, color: "#FF6B35" },
  { name: "Salon", value: 256, color: "#10B981" },
  { name: "Agriculture", value: 178, color: "#F59E0B" },
  { name: "Other", value: 77, color: "#8B5CF6" },
]

const monthlyGrowthData = [
  { month: "Jan", businesses: 945, revenue: 342000 },
  { month: "Feb", businesses: 1012, revenue: 378000 },
  { month: "Mar", businesses: 1084, revenue: 412000 },
  { month: "Apr", businesses: 1156, revenue: 445000 },
  { month: "May", businesses: 1205, revenue: 468000 },
  { month: "Jun", businesses: 1248, revenue: 485000 },
]

const topBusinesses = [
  { id: "1", name: "Fresh Chicken Farm", owner: "John Doe", revenue: 4250000, growth: 18.5, type: "Poultry" },
  { id: "2", name: "StyleCut Barber", owner: "Jane Smith", revenue: 3890000, growth: 22.3, type: "Salon" },
  { id: "3", name: "Green Valley Farms", owner: "Mike Johnson", revenue: 3560000, growth: 15.7, type: "Agriculture" },
  { id: "4", name: "Nail Artistry", owner: "Sarah Williams", revenue: 3120000, growth: 28.9, type: "Salon" },
  { id: "5", name: "City Retail Store", owner: "David Brown", revenue: 2980000, growth: 12.4, type: "Retail" },
]

const recentAlerts = [
  { id: "1", business: "Fresh Chicken Farm", type: "Low Stock", severity: "warning", time: "2h ago" },
  { id: "2", business: "StyleCut Barber", type: "High Revenue", severity: "success", time: "4h ago" },
  { id: "3", business: "Green Valley Farms", type: "Payment Issue", severity: "error", time: "1d ago" },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform-wide overview and management</p>
      </div>

      {/* Platform Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Businesses"
          value={platformStats.totalBusinesses.toLocaleString()}
          change={`+${platformStats.newBusinesses} this month`}
          changeType="positive"
          icon={Building2}
        />
        <StatCard
          title="Active Users"
          value={platformStats.activeUsers.toLocaleString()}
          change="+12.3% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Platform Revenue"
          value={formatCurrency(platformStats.totalRevenue)}
          change={`+${platformStats.growthRate}% growth`}
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Total Transactions"
          value={platformStats.totalTransactions.toLocaleString()}
          description="Across all businesses"
          icon={Activity}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Platform Growth</CardTitle>
            <CardDescription>Businesses and revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="businesses"
                  stroke="#0A1F44"
                  strokeWidth={2}
                  name="Businesses"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF6B35"
                  strokeWidth={2}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Business Types</CardTitle>
            <CardDescription>Distribution by industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={businessTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {businessTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Businesses and Alerts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Top Performing Businesses</CardTitle>
            <CardDescription>Ranked by monthly revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topBusinesses.map((business, index) => (
                <div
                  key={business.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{business.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {business.owner} • {business.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-foreground">{formatCurrency(business.revenue)}</p>
                    <p className="text-xs text-success">+{business.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Recent Alerts</CardTitle>
            <CardDescription>Platform-wide notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      alert.severity === "warning"
                        ? "bg-warning/10 text-warning"
                        : alert.severity === "success"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{alert.business}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.type} • {alert.time}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "warning"
                        ? "secondary"
                        : alert.severity === "success"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
