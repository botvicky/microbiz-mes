"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { mockBusiness, generateMonthlyTransactions } from "@/lib/mock-data"
import { calculateAnalytics, formatCurrency, formatDate } from "@/lib/analytics"
import { Building2, Phone, MapPin, Calendar, TrendingUp, Edit } from "lucide-react"
import { useMemo } from "react"

export default function ProfilePage() {
  const { user } = useAuth()
  const transactions = useMemo(() => generateMonthlyTransactions(), [])
  const analytics = useMemo(() => calculateAnalytics(transactions), [transactions])

  const initials =
    user?.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Your account and business information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-foreground">{user?.full_name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
              <Badge className="mt-3" variant="secondary">
                {user?.role === "admin" ? "Administrator" : "Business Owner"}
              </Badge>
              <Button className="w-full mt-6 bg-transparent" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Details about your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Name</p>
                  <p className="font-medium text-foreground">{mockBusiness.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <p className="font-medium text-foreground">{mockBusiness.business_type}</p>
                </div>
              </div>

              {mockBusiness.location && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{mockBusiness.location}</p>
                  </div>
                </div>
              )}

              {mockBusiness.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{mockBusiness.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium text-foreground">{formatDate(mockBusiness.created_at)}</p>
                </div>
              </div>
            </div>

            {mockBusiness.description && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm text-foreground leading-relaxed">{mockBusiness.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Your business metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(analytics.totalRevenue)}</p>
              <p className="text-xs text-success mt-1">+{analytics.revenueGrowth.toFixed(1)}% growth</p>
            </div>

            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(analytics.netProfit)}</p>
              <p className="text-xs text-muted-foreground mt-1">{analytics.profitMargin.toFixed(1)}% margin</p>
            </div>

            <div className="p-4 rounded-lg bg-accent/50 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Transactions</p>
              <p className="text-2xl font-bold text-foreground">{analytics.transactionCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Total recorded</p>
            </div>

            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <p className="text-sm text-muted-foreground mb-1">Avg Transaction</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(analytics.averageTransactionValue)}</p>
              <p className="text-xs text-muted-foreground mt-1">Per transaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
