"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle2, Circle, Filter, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface LogEntry {
  id: string
  date: string
  time: string
  activity: string
  category: string
  status: "completed" | "in-progress" | "pending"
  description: string
  duration: string
  tags: string[]
}

const mockLogEntries: LogEntry[] = [
  {
    id: "1",
    date: "2024-11-10",
    time: "09:00",
    activity: "Harvested tomatoes",
    category: "Farming",
    status: "completed",
    description: "Harvested 50kg of tomatoes from section A. Quality is excellent.",
    duration: "2 hours",
    tags: ["harvest", "tomatoes"]
  },
  {
    id: "2",
    date: "2024-11-10",
    time: "11:30",
    activity: "Customer delivery",
    category: "Sales",
    status: "completed",
    description: "Delivered fresh produce to John Kamau in Kampala. Payment received.",
    duration: "1.5 hours",
    tags: ["delivery", "sales"]
  },
  {
    id: "3",
    date: "2024-11-10",
    time: "14:00",
    activity: "Inventory check",
    category: "Operations",
    status: "in-progress",
    description: "Conducting weekly inventory audit of all produce and supplies.",
    duration: "1 hour",
    tags: ["inventory", "audit"]
  },
  {
    id: "4",
    date: "2024-11-09",
    time: "08:00",
    activity: "Fertilizer application",
    category: "Farming",
    status: "completed",
    description: "Applied organic fertilizer to vegetable beds in section B and C.",
    duration: "3 hours",
    tags: ["fertilizer", "maintenance"]
  },
  {
    id: "5",
    date: "2024-11-09",
    time: "13:00",
    activity: "Staff meeting",
    category: "Management",
    status: "completed",
    description: "Weekly team meeting to discuss harvest schedule and upcoming orders.",
    duration: "1 hour",
    tags: ["meeting", "team"]
  },
  {
    id: "6",
    date: "2024-11-08",
    time: "10:00",
    activity: "Equipment maintenance",
    category: "Operations",
    status: "completed",
    description: "Serviced irrigation system and replaced worn parts.",
    duration: "2.5 hours",
    tags: ["maintenance", "equipment"]
  }
]

const categories = ["Farming", "Sales", "Operations", "Management", "Maintenance", "Other"]

export default function LogbookPage() {
  const [entries, setEntries] = useState<LogEntry[]>(mockLogEntries)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // New entry form state
  const [newEntry, setNewEntry] = useState({
    date: new Date(),
    time: "",
    activity: "",
    category: "",
    status: "completed" as "completed" | "in-progress" | "pending",
    description: "",
    duration: "",
    tags: ""
  })

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = filterCategory === "all" || entry.category === filterCategory
    const matchesStatus = filterStatus === "all" || entry.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Group entries by date
  const groupedEntries = filteredEntries.reduce((groups, entry) => {
    const date = entry.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(entry)
    return groups
  }, {} as Record<string, LogEntry[]>)

  const handleAddEntry = () => {
    const entry: LogEntry = {
      id: (entries.length + 1).toString(),
      date: format(newEntry.date, "yyyy-MM-dd"),
      time: newEntry.time,
      activity: newEntry.activity,
      category: newEntry.category,
      status: newEntry.status,
      description: newEntry.description,
      duration: newEntry.duration,
      tags: newEntry.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    }
    setEntries([entry, ...entries])
    setNewEntry({
      date: new Date(),
      time: "",
      activity: "",
      category: "",
      status: "completed",
      description: "",
      duration: "",
      tags: ""
    })
    setIsAddDialogOpen(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Circle className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-600 hover:bg-blue-700">In Progress</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return null
    }
  }

  const totalEntries = entries.length
  const completedTasks = entries.filter(e => e.status === "completed").length
  const inProgressTasks = entries.filter(e => e.status === "in-progress").length
  const todayEntries = entries.filter(e => e.date === format(new Date(), "yyyy-MM-dd")).length

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Logbook</h1>
          <p className="text-muted-foreground mt-1">
            Track your daily activities and tasks
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Logbook Entry</DialogTitle>
              <DialogDescription>
                Record your daily activities and tasks completed
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !newEntry.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEntry.date ? format(newEntry.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newEntry.date}
                        onSelect={(date) => setNewEntry({ ...newEntry, date: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEntry.time}
                    onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="activity">Activity/Task *</Label>
                <Input
                  id="activity"
                  placeholder="e.g., Harvested tomatoes"
                  value={newEntry.activity}
                  onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newEntry.category}
                    onValueChange={(value) => setNewEntry({ ...newEntry, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={newEntry.status}
                    onValueChange={(value: any) => setNewEntry({ ...newEntry, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 2 hours"
                  value={newEntry.duration}
                  onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you did..."
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., harvest, tomatoes"
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddEntry}
                disabled={!newEntry.activity || !newEntry.category || !newEntry.description || !newEntry.time}
                className="bg-accent hover:bg-accent/90"
              >
                Add Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntries}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Entries</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayEntries}</div>
            <p className="text-xs text-muted-foreground">
              Logged today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {totalEntries > 0 ? Math.round((completedTasks / totalEntries) * 100) : 0}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              Active tasks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search activities, descriptions, or tags..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.keys(groupedEntries).length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No entries found. Start logging your daily activities!
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedEntries)
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
            .map(([date, dayEntries]) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-accent" />
                    {format(new Date(date), "EEEE, MMMM d, yyyy")}
                  </CardTitle>
                  <CardDescription>{dayEntries.length} activities logged</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dayEntries
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((entry) => (
                        <div key={entry.id} className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                          <div className="flex flex-col items-center gap-1 min-w-[80px]">
                            <div className="font-semibold text-sm">{entry.time}</div>
                            {getStatusIcon(entry.status)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="font-semibold text-base">{entry.activity}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{entry.description}</p>
                              </div>
                              {getStatusBadge(entry.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{entry.category}</Badge>
                              {entry.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {entry.duration}
                                </span>
                              )}
                              {entry.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  )
}
