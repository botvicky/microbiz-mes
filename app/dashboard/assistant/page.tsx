"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, TrendingUp, AlertCircle, Lightbulb, BarChart } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { mockBusiness, generateMonthlyTransactions } from "@/lib/mock-data"
import { calculateAnalytics, formatCurrency } from "@/lib/analytics"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

const SUGGESTED_PROMPTS = [
  "How is my business performing this month?",
  "What are my top expenses?",
  "Show me revenue trends",
  "Give me inventory recommendations",
  "How can I improve profitability?",
]

export default function AssistantPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm your MicroBiz AI Assistant. I can help you understand your business performance, analyze trends, and provide actionable insights. What would you like to know about ${mockBusiness.name}?`,
      timestamp: new Date(),
      suggestions: SUGGESTED_PROMPTS.slice(0, 3),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    const transactions = generateMonthlyTransactions()
    const analytics = calculateAnalytics(transactions)

    if (lowerMessage.includes("perform") || (lowerMessage.includes("how") && lowerMessage.includes("business"))) {
      return `Based on your recent performance, ${mockBusiness.name} is doing well! Here's a summary:\n\n• Total Revenue: ${formatCurrency(analytics.totalRevenue)}\n• Total Expenses: ${formatCurrency(analytics.totalExpenses)}\n• Net Profit: ${formatCurrency(analytics.netProfit)}\n• Profit Margin: ${analytics.profitMargin.toFixed(1)}%\n\nYour revenue has ${analytics.revenueGrowth > 0 ? "increased" : "decreased"} by ${Math.abs(analytics.revenueGrowth).toFixed(1)}% compared to last month. This is a ${analytics.revenueGrowth > 0 ? "positive" : "concerning"} trend that ${analytics.revenueGrowth > 0 ? "shows strong business growth" : "requires attention"}.`
    }

    if (lowerMessage.includes("expense") || lowerMessage.includes("spending")) {
      return `Your top expense categories are:\n\n1. Feed: ${formatCurrency(180000)} (40%)\n2. Utilities: ${formatCurrency(85000)} (19%)\n3. Veterinary: ${formatCurrency(120000)} (26%)\n4. Equipment: ${formatCurrency(65000)} (15%)\n\nRecommendation: Feed costs are your largest expense. Consider negotiating bulk purchase discounts with your supplier to reduce costs by 10-15%.`
    }

    if (lowerMessage.includes("revenue") || lowerMessage.includes("trend") || lowerMessage.includes("sales")) {
      return `Your revenue shows a positive trend:\n\n• Last 7 days: ${formatCurrency(1320000)}\n• Previous 7 days: ${formatCurrency(1150000)}\n• Growth: +14.8%\n\nYour best-selling days are typically at the end of the week (Thursday-Saturday). Consider focusing your marketing and inventory planning around these peak days to maximize sales.`
    }

    if (lowerMessage.includes("inventory") || lowerMessage.includes("stock")) {
      return `Inventory Analysis:\n\n⚠️ Low Stock Items:\n• Water Feeders: 2 units (reorder at 5)\n• Chicken Feed: 8 bags (reorder at 10)\n\nRecommendations:\n1. Restock water feeders immediately to avoid operational disruption\n2. Monitor chicken feed levels closely - you have about 1 week supply remaining\n3. Consider setting up automatic reorder notifications for critical items`
    }

    if (lowerMessage.includes("profit") || lowerMessage.includes("improve") || lowerMessage.includes("grow")) {
      return `To improve profitability for ${mockBusiness.name}, I recommend:\n\n1. **Optimize Feed Costs**: Negotiate bulk discounts (potential savings: 15%)\n2. **Increase Sales Volume**: Your average transaction is ${formatCurrency(analytics.averageTransactionValue)}. Focus on selling more premium products\n3. **Reduce Waste**: Monitor chicken health closely to minimize losses\n4. **Diversify Revenue**: Consider selling eggs in addition to chickens\n5. **Seasonal Planning**: Stock up during low-price seasons to reduce costs\n\nImplementing these could increase your profit margin from ${analytics.profitMargin.toFixed(1)}% to approximately ${(analytics.profitMargin + 5).toFixed(1)}%.`
    }

    if (lowerMessage.includes("transaction") || lowerMessage.includes("payment")) {
      return `Transaction Insights:\n\n• Total Transactions: ${analytics.transactionCount}\n• Average Transaction: ${formatCurrency(analytics.averageTransactionValue)}\n• Most Used Payment: Mobile Money (62%)\n\nYour customers prefer mobile money payments. Make sure your mobile money accounts are always active and consider offering small incentives for digital payments to reduce cash handling costs.`
    }

    return `I understand you're asking about "${userMessage}". While I can provide insights on:\n\n• Business performance and analytics\n• Revenue and expense analysis\n• Inventory management\n• Growth recommendations\n• Transaction patterns\n\nCould you rephrase your question to focus on one of these areas? I'm here to help you make data-driven decisions for ${mockBusiness.name}.`
  }

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(textToSend)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Business Assistant
        </h1>
        <p className="text-muted-foreground mt-1">Get intelligent insights and recommendations for your business</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Quick Insights Sidebar */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-success">Strong Growth</p>
                    <p className="text-xs text-muted-foreground mt-1">Revenue up 15% this month</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-warning">Stock Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">2 items need restocking</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-start gap-2">
                  <BarChart className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-primary">Optimization</p>
                    <p className="text-xs text-muted-foreground mt-1">Reduce feed costs by 15%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3 bg-transparent"
                  onClick={() => handleSend(prompt)}
                >
                  <span className="text-xs line-clamp-2">{prompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>Powered by advanced analytics</CardDescription>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  Online
                </Badge>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback
                      className={
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      }
                    >
                      {message.role === "user" ? user?.full_name?.charAt(0) || "U" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 bg-transparent"
                            onClick={() => handleSend(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your business..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift + Enter for new line</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
