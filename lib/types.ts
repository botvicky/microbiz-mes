// Database Types
export interface User {
  id: string
  email: string
  full_name: string
  role: "business_owner" | "admin"
  created_at: string
  updated_at: string
}

export interface Business {
  id: string
  user_id: string
  name: string
  business_type: string
  description: string | null
  location: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  business_id: string
  type: "income" | "expense"
  category: string
  amount: number
  description: string | null
  date: string
  payment_method: string
  created_at: string
}

export interface InventoryItem {
  id: string
  business_id: string
  name: string
  quantity: number
  unit: string
  unit_cost: number
  reorder_level: number
  supplier: string | null
  last_restocked: string | null
  created_at: string
  updated_at: string
}

export interface Wallet {
  id: string
  business_id: string
  balance: number
  currency: string
  last_transaction_date: string | null
  updated_at: string
}

export interface AIConversation {
  id: string
  business_id: string
  user_id: string
  messages: AIMessage[]
  created_at: string
  updated_at: string
}

export interface AIMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface Notification {
  id: string
  user_id: string
  type: "alert" | "reminder" | "insight" | "transaction"
  title: string
  message: string
  read: boolean
  created_at: string
}

export interface AnalyticsMetrics {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  transactionCount: number
  averageTransactionValue: number
  revenueGrowth: number
  expenseGrowth: number
}

export interface DashboardStats {
  revenue: number
  expenses: number
  profit: number
  transactions: number
  lowStockItems: number
  pendingAlerts: number
}
