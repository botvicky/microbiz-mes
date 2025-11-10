"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, MoreVertical } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/analytics"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const allBusinesses = [
  {
    id: "1",
    name: "Fresh Chicken Farm",
    owner: "John Doe",
    email: "john@example.com",
    type: "Poultry",
    status: "active",
    revenue: 4250000,
    created: "2024-01-15",
  },
  {
    id: "2",
    name: "StyleCut Barber",
    owner: "Jane Smith",
    email: "jane@example.com",
    type: "Salon",
    status: "active",
    revenue: 3890000,
    created: "2024-02-10",
  },
  {
    id: "3",
    name: "Green Valley Farms",
    owner: "Mike Johnson",
    email: "mike@example.com",
    type: "Agriculture",
    status: "active",
    revenue: 3560000,
    created: "2024-01-28",
  },
  {
    id: "4",
    name: "Nail Artistry",
    owner: "Sarah Williams",
    email: "sarah@example.com",
    type: "Salon",
    status: "active",
    revenue: 3120000,
    created: "2024-03-05",
  },
  {
    id: "5",
    name: "City Retail Store",
    owner: "David Brown",
    email: "david@example.com",
    type: "Retail",
    status: "inactive",
    revenue: 2980000,
    created: "2023-12-20",
  },
]

export default function AdminBusinessesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredBusinesses = allBusinesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || business.status === statusFilter
    const matchesType = typeFilter === "all" || business.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const activeCount = allBusinesses.filter((b) => b.status === "active").length
  const inactiveCount = allBusinesses.filter((b) => b.status === "inactive").length
  const totalRevenue = allBusinesses.reduce((sum, b) => sum + b.revenue, 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Businesses</h1>
        <p className="text-muted-foreground mt-1">Manage and monitor all registered businesses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Businesses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{allBusinesses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{inactiveCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Businesses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Business Directory</CardTitle>
          <CardDescription>Search and filter registered businesses</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search businesses, owners, or emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Poultry">Poultry</SelectItem>
                <SelectItem value="Salon">Salon</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Business List */}
          <div className="space-y-3">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold flex-shrink-0">
                    {business.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">{business.name}</p>
                      <Badge variant={business.status === "active" ? "default" : "secondary"}>{business.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{business.owner}</span>
                      <span>•</span>
                      <span>{business.email}</span>
                      <span>•</span>
                      <span>{business.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-sm text-foreground">{formatCurrency(business.revenue)}</p>
                    <p className="text-xs text-muted-foreground">Since {formatDate(business.created)}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Business</DropdownMenuItem>
                      <DropdownMenuItem>View Reports</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Suspend Business</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
