import type { Business, Transaction, InventoryItem, Wallet, Notification, User } from "./types"

// Mock current user
export const mockUser: User = {
  id: "user-1",
  email: "john@example.com",
  full_name: "John Doe",
  role: "business_owner",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock admin user
export const mockAdminUser: User = {
  id: "admin-1",
  email: "admin@microbiz.com",
  full_name: "Admin User",
  role: "admin",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock business
export const mockBusiness: Business = {
  id: "biz-1",
  user_id: "user-1",
  name: "Fresh Chicken Farm",
  business_type: "Poultry/Chicken Rearing",
  description: "Local chicken farm specializing in organic, free-range chickens",
  location: "Kampala, Uganda",
  phone: "+256-XXX-XXXXXX",
  created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "txn-1",
    business_id: "biz-1",
    type: "income",
    category: "Sales",
    amount: 450000,
    description: "Sold 50 chickens to local market",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: "Mobile Money",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "txn-2",
    business_id: "biz-1",
    type: "expense",
    category: "Feed",
    amount: 180000,
    description: "Purchased chicken feed - 5 bags",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: "Cash",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "txn-3",
    business_id: "biz-1",
    type: "income",
    category: "Sales",
    amount: 320000,
    description: "Sold eggs to retailer",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: "Bank Transfer",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "txn-4",
    business_id: "biz-1",
    type: "expense",
    category: "Utilities",
    amount: 85000,
    description: "Electricity bill for incubators",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: "Mobile Money",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "txn-5",
    business_id: "biz-1",
    type: "income",
    category: "Sales",
    amount: 550000,
    description: "Sold 60 chickens - bulk order",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: "Mobile Money",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "txn-6",
    business_id: "biz-1",
    type: "expense",
    category: "Veterinary",
    amount: 120000,
    description: "Vaccination and health checkup",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: "Cash",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock inventory items
export const mockInventory: InventoryItem[] = [
  {
    id: "inv-1",
    business_id: "biz-1",
    name: "Chicken Feed (50kg bags)",
    quantity: 8,
    unit: "bags",
    unit_cost: 35000,
    reorder_level: 10,
    supplier: "AgriSupply Ltd",
    last_restocked: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inv-2",
    business_id: "biz-1",
    name: "Vaccines",
    quantity: 5,
    unit: "bottles",
    unit_cost: 45000,
    reorder_level: 3,
    supplier: "VetMed Supplies",
    last_restocked: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inv-3",
    business_id: "biz-1",
    name: "Water Feeders",
    quantity: 2,
    unit: "units",
    unit_cost: 18000,
    reorder_level: 5,
    supplier: "Farm Equipment Co",
    last_restocked: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inv-4",
    business_id: "biz-1",
    name: "Laying Boxes",
    quantity: 25,
    unit: "units",
    unit_cost: 12000,
    reorder_level: 10,
    supplier: "Farm Equipment Co",
    last_restocked: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock wallet
export const mockWallet: Wallet = {
  id: "wallet-1",
  business_id: "biz-1",
  balance: 1205000,
  currency: "USD",
  last_transaction_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    user_id: "user-1",
    type: "alert",
    title: "Low Stock Alert",
    message: "Water Feeders stock is below reorder level (2 units remaining)",
    read: false,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-2",
    user_id: "user-1",
    type: "insight",
    title: "Revenue Insight",
    message: "Your revenue is up 15% compared to last month. Great work!",
    read: false,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-3",
    user_id: "user-1",
    type: "transaction",
    title: "New Transaction",
    message: "Income of UGX 450,000 recorded from chicken sales",
    read: true,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-4",
    user_id: "user-1",
    type: "reminder",
    title: "Vaccination Due",
    message: "Next batch vaccination scheduled for tomorrow",
    read: false,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
]

// Generate more transactions for analytics
export function generateMonthlyTransactions(): Transaction[] {
  const transactions: Transaction[] = [...mockTransactions]
  const categories = ["Sales", "Feed", "Utilities", "Veterinary", "Equipment"]

  for (let i = 0; i < 30; i++) {
    const isIncome = Math.random() > 0.4
    const category = categories[Math.floor(Math.random() * categories.length)]
    const amount = Math.floor(Math.random() * 400000) + 100000

    transactions.push({
      id: `txn-gen-${i}`,
      business_id: "biz-1",
      type: isIncome ? "income" : "expense",
      category: isIncome ? "Sales" : category,
      amount,
      description: `${isIncome ? "Sale" : "Purchase"} - ${category}`,
      date: new Date(Date.now() - (i + 8) * 24 * 60 * 60 * 1000).toISOString(),
      payment_method: ["Mobile Money", "Cash", "Bank Transfer"][Math.floor(Math.random() * 3)],
      created_at: new Date(Date.now() - (i + 8) * 24 * 60 * 60 * 1000).toISOString(),
    })
  }

  return transactions
}
