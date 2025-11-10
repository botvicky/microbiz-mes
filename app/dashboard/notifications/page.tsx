"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, Trash2, AlertCircle, TrendingUp, Receipt, Package } from "lucide-react"
import { mockNotifications } from "@/lib/mock-data"
import { formatRelativeTime } from "@/lib/analytics"
import type { Notification } from "@/lib/types"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return AlertCircle
      case "insight":
        return TrendingUp
      case "transaction":
        return Receipt
      case "reminder":
        return Package
      default:
        return Bell
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-warning bg-warning/10"
      case "insight":
        return "text-success bg-success/10"
      case "transaction":
        return "text-primary bg-primary/10"
      case "reminder":
        return "text-accent bg-accent/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const renderNotifications = (filterFn: (n: Notification) => boolean) => {
    const filtered = notifications.filter(filterFn)

    if (filtered.length === 0) {
      return (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
          <p className="text-muted-foreground">No notifications found</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {filtered.map((notif) => {
          const Icon = getIcon(notif.type)
          const iconColor = getIconColor(notif.type)

          return (
            <div
              key={notif.id}
              className={`p-4 rounded-lg border transition-colors ${
                notif.read ? "border-border bg-card" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-foreground">{notif.title}</p>
                        {!notif.read && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formatRelativeTime(notif.created_at)}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!notif.read && (
                        <Button variant="ghost" size="icon" onClick={() => markAsRead(notif.id)} className="h-8 w-8">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNotification(notif.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with your business activities</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {notifications.filter((n) => n.type === "alert").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {notifications.filter((n) => n.type === "insight").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="alerts">Alerts ({notifications.filter((n) => n.type === "alert").length})</TabsTrigger>
          <TabsTrigger value="insights">
            Insights ({notifications.filter((n) => n.type === "insight").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderNotifications(() => true)}</TabsContent>

        <TabsContent value="unread">{renderNotifications((n) => !n.read)}</TabsContent>

        <TabsContent value="alerts">{renderNotifications((n) => n.type === "alert")}</TabsContent>

        <TabsContent value="insights">{renderNotifications((n) => n.type === "insight")}</TabsContent>
      </Tabs>
    </div>
  )
}
