"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Receipt, Package, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { mockTransactions, mockInventory, generateMonthlyTransactions } from "@/lib/mock-data"
import { calculateAnalytics, formatCurrency, formatDate } from "@/lib/analytics"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const allTransactions = useMemo(() => generateMonthlyTransactions(), [])
  const recentTransactions = mockTransactions.slice(0, 5)
  const analytics = useMemo(() => calculateAnalytics(allTransactions), [allTransactions])
  const lowStockItems = mockInventory.filter((item) => item.quantity <= item.reorder_level)

  // Prepare chart data
  const revenueData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
      const dayTransactions = allTransactions.filter((t) => {
        const txnDate = new Date(t.date)
        return txnDate.toDateString() === date.toDateString()
      })

      const income = dayTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

      const expenses = dayTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

      return {
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        income: income,
        expenses: expenses,
        net: income - expenses,
      }
    })
    return last7Days
  }, [allTransactions])

  const categoryData = useMemo(() => {
    const categories = allTransactions.reduce(
      (acc, txn) => {
        if (txn.type === "expense") {
          acc[txn.category] = (acc[txn.category] || 0) + txn.amount
        }
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(categories)
      .map(([name, value]) => ({
        name,
        value: value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }, [allTransactions])

  // Microbiz brand colors
  const COLORS = ["#0A1F44", "#FF6B35", "#10B981", "#F59E0B", "#8B5CF6"]

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Your business performance at a glance</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard/transactions">View All Transactions</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatUSD(analytics.totalRevenue)}
          change={`${analytics.revenueGrowth > 0 ? "+" : ""}${analytics.revenueGrowth.toFixed(1)}% from last month`}
          changeType={analytics.revenueGrowth > 0 ? "positive" : "negative"}
          icon={DollarSign}
        />
        <StatCard
          title="Total Expenses"
          value={formatUSD(analytics.totalExpenses)}
          change={`${analytics.expenseGrowth > 0 ? "+" : ""}${analytics.expenseGrowth.toFixed(1)}% from last month`}
          changeType={analytics.expenseGrowth > 0 ? "negative" : "positive"}
          icon={TrendingDown}
        />
        <StatCard
          title="Net Profit"
          value={formatUSD(analytics.netProfit)}
          change={`${analytics.profitMargin.toFixed(1)}% profit margin`}
          changeType={analytics.netProfit > 0 ? "positive" : "negative"}
          icon={TrendingUp}
        />
        <StatCard
          title="Transactions"
          value={analytics.transactionCount.toString()}
          description="Total recorded transactions"
          icon={Receipt}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Revenue Trends</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
                <YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatUSD(value)}
                />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="net" stroke="#FF6B35" strokeWidth={2} name="Net" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Expense Categories</CardTitle>
            <CardDescription>Top 5 expense categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatUSD(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">Recent Transactions</CardTitle>
              <CardDescription>Your latest business transactions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/transactions" className="hidden sm:flex">
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        txn.type === "income" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {txn.type === "income" ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground truncate">{txn.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {txn.category} • {formatDate(txn.date)}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold text-sm sm:text-base whitespace-nowrap ml-2 ${txn.type === "income" ? "text-success" : "text-destructive"}`}>
                    {txn.type === "income" ? "+" : "-"}
                    {formatUSD(txn.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">Inventory Alerts</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/inventory" className="hidden sm:flex">
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.length > 0 ? (
                lowStockItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-warning/10 text-warning flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Only {item.quantity} {item.unit} remaining • Reorder at {item.reorder_level}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-sm text-foreground">{item.quantity}</p>
                      <p className="text-xs text-muted-foreground">{item.unit}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">All inventory levels are healthy</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
