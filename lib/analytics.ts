import type { Transaction, AnalyticsMetrics } from "./types"

export function calculateAnalytics(transactions: Transaction[]): AnalyticsMetrics {
  const income = transactions.filter((t) => t.type === "income")
  const expenses = transactions.filter((t) => t.type === "expense")

  const totalRevenue = income.reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

  const transactionCount = transactions.length
  const averageTransactionValue = transactionCount > 0 ? totalRevenue / income.length : 0

  // Calculate growth (comparing last 30 days to previous 30 days)
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

  const recentRevenue = income.filter((t) => new Date(t.date) >= thirtyDaysAgo).reduce((sum, t) => sum + t.amount, 0)

  const previousRevenue = income
    .filter((t) => new Date(t.date) >= sixtyDaysAgo && new Date(t.date) < thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0)

  const recentExpenses = expenses.filter((t) => new Date(t.date) >= thirtyDaysAgo).reduce((sum, t) => sum + t.amount, 0)

  const previousExpenses = expenses
    .filter((t) => new Date(t.date) >= sixtyDaysAgo && new Date(t.date) < thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0)

  const revenueGrowth = previousRevenue > 0 ? ((recentRevenue - previousRevenue) / previousRevenue) * 100 : 0

  const expenseGrowth = previousExpenses > 0 ? ((recentExpenses - previousExpenses) / previousExpenses) * 100 : 0

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    profitMargin,
    transactionCount,
    averageTransactionValue,
    revenueGrowth,
    expenseGrowth,
  }
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function formatRelativeTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}
