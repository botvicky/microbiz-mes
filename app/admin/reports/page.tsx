"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import {
  BarChart,
  Bar,
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

const revenueByMonth = [
  { month: "Jan", revenue: 342, transactions: 4250 },
  { month: "Feb", revenue: 378, transactions: 4680 },
  { month: "Mar", revenue: 412, transactions: 5120 },
  { month: "Apr", revenue: 445, transactions: 5450 },
  { month: "May", revenue: 468, transactions: 5780 },
  { month: "Jun", revenue: 485, transactions: 6120 },
]

const businessTypeRevenue = [
  { name: "Poultry", value: 185000, color: "#4F46E5" },
  { name: "Retail", value: 142000, color: "#10B981" },
  { name: "Salon", value: 98000, color: "#F59E0B" },
  { name: "Agriculture", value: 45000, color: "#EF4444" },
  { name: "Other", value: 15000, color: "#8B5CF6" },
]

const regionData = [
  { region: "Central", businesses: 485, revenue: 215000 },
  { region: "Eastern", businesses: 312, revenue: 142000 },
  { region: "Western", businesses: 265, revenue: 118000 },
  { region: "Northern", businesses: 186, revenue: 85000 },
]

export default function AdminReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Reports</h1>
          <p className="text-muted-foreground mt-1">Comprehensive analytics and reporting</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="business">Business Performance</TabsTrigger>
          <TabsTrigger value="regional">Regional Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Platform revenue over time (in thousands)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} name="Revenue (k)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
                <CardDescription>Monthly transaction count</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="transactions" fill="#10B981" name="Transactions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
              <CardDescription>Key performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(485620000)}</p>
                  <p className="text-xs text-success mt-1">+18.5% from last month</p>
                </div>
                <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                  <p className="text-sm text-muted-foreground mb-1">Avg per Business</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(389100)}</p>
                  <p className="text-xs text-success mt-1">+12.3% growth</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Transaction Fee</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(12485000)}</p>
                  <p className="text-xs text-muted-foreground mt-1">2.5% commission</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                  <p className="text-sm text-muted-foreground mb-1">Projected Growth</p>
                  <p className="text-2xl font-bold text-foreground">+23.5%</p>
                  <p className="text-xs text-muted-foreground mt-1">Next quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Business Type</CardTitle>
              <CardDescription>Distribution across industries (in thousands)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={businessTypeRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}k`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {businessTypeRevenue.map((entry, index) => (
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Business distribution and revenue by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="region" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="businesses" fill="#4F46E5" name="Businesses" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue (k)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-4">
            {regionData.map((region) => (
              <Card key={region.region}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{region.region} Region</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-foreground">{region.businesses}</div>
                  <p className="text-xs text-muted-foreground mt-1">{formatCurrency(region.revenue * 1000)} revenue</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
