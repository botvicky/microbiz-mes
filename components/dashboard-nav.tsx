"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { LayoutDashboard, Receipt, Wallet, Package, MessageSquare, BarChart3, Settings, Shield, Menu, X, Users, BookOpen } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const businessOwnerNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: Receipt,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Logbook",
    href: "/dashboard/logbook",
    icon: BookOpen,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/assistant",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
]

const adminNav = [
  {
    title: "Admin Dashboard",
    href: "/admin",
    icon: Shield,
  },
  {
    title: "All Businesses",
    href: "/admin/businesses",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: Receipt,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = user?.role === "admin" ? adminNav : businessOwnerNav

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card border border-border shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-60 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col z-40 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 pb-2 border-b border-sidebar-border flex items-center justify-center">
          <Link href="/dashboard" className="flex items-center" onClick={() => setIsOpen(false)}>
            <div className="w-32 h-20">
              <Logo />
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-3">
          <div className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <p className="text-sm font-semibold text-sidebar-accent-foreground mb-1.5">Need Help?</p>
            <p className="text-xs text-sidebar-accent-foreground/70 mb-2.5 leading-relaxed">
              Contact our support team
            </p>
            <Link
              href="/dashboard/support"
              className="text-xs text-sidebar-primary hover:text-sidebar-primary/80 font-semibold transition-colors inline-flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Get Support →
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
