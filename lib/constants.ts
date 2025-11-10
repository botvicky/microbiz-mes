// Application constants for production use

export const APP_NAME = "MicroBiz Monitor"
export const APP_DESCRIPTION = "Business monitoring and evaluation platform for small businesses"
export const APP_VERSION = "1.0.0"

// Currency settings
export const DEFAULT_CURRENCY = "UGX"
export const SUPPORTED_CURRENCIES = ["UGX", "USD", "EUR", "KES", "TZS"]

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Transaction categories
export const INCOME_CATEGORIES = ["Sales", "Services", "Commissions", "Other Income"]

export const EXPENSE_CATEGORIES = [
  "Feed",
  "Supplies",
  "Utilities",
  "Rent",
  "Salaries",
  "Veterinary",
  "Equipment",
  "Transportation",
  "Marketing",
  "Other Expenses",
]

// Business types
export const BUSINESS_TYPES = [
  "Poultry/Chicken Rearing",
  "Barber Salon",
  "Nail Technician",
  "Retail Shop",
  "Agriculture",
  "Food Service",
  "Manufacturing",
  "Other",
]

// Payment methods
export const PAYMENT_METHODS = ["Mobile Money", "Cash", "Bank Transfer", "Card Payment", "Check"]

// Notification types
export const NOTIFICATION_TYPES = {
  ALERT: "alert",
  INSIGHT: "insight",
  REMINDER: "reminder",
  TRANSACTION: "transaction",
} as const

// User roles
export const USER_ROLES = {
  BUSINESS_OWNER: "business_owner",
  ADMIN: "admin",
} as const

// Stock alert thresholds
export const STOCK_ALERT_THRESHOLD = 0.5 // 50% of reorder level
export const CRITICAL_STOCK_THRESHOLD = 0.25 // 25% of reorder level

// Date formats
export const DATE_FORMAT = "MMM dd, yyyy"
export const DATETIME_FORMAT = "MMM dd, yyyy HH:mm"
export const TIME_FORMAT = "HH:mm"

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    REFRESH: "/api/auth/refresh",
  },
  BUSINESS: {
    LIST: "/api/businesses",
    GET: "/api/businesses/:id",
    CREATE: "/api/businesses",
    UPDATE: "/api/businesses/:id",
    DELETE: "/api/businesses/:id",
  },
  TRANSACTIONS: {
    LIST: "/api/transactions",
    GET: "/api/transactions/:id",
    CREATE: "/api/transactions",
    UPDATE: "/api/transactions/:id",
    DELETE: "/api/transactions/:id",
  },
  INVENTORY: {
    LIST: "/api/inventory",
    GET: "/api/inventory/:id",
    CREATE: "/api/inventory",
    UPDATE: "/api/inventory/:id",
    DELETE: "/api/inventory/:id",
  },
  WALLET: {
    GET: "/api/wallet",
    DEPOSIT: "/api/wallet/deposit",
    WITHDRAW: "/api/wallet/withdraw",
  },
  NOTIFICATIONS: {
    LIST: "/api/notifications",
    MARK_READ: "/api/notifications/:id/read",
    DELETE: "/api/notifications/:id",
  },
  AI: {
    CHAT: "/api/ai/chat",
    INSIGHTS: "/api/ai/insights",
  },
}
