"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, DollarSign, Package, MapPin, Wallet, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BusinessSetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Profile
    businessName: "",
    businessType: "",
    location: "",
    description: "",
    
    // Starting Capital
    startingCapital: "",
    currency: "USD",
    
    // Initial Inventory
    hasInventory: "yes",
    inventoryItems: [
      { name: "", quantity: "", unitCost: "" }
    ],
    
    // Wallet Setup
    walletName: "",
    initialBalance: "",
  })

  const steps = [
    { number: 1, title: "Business Profile", icon: Building2 },
    { number: 2, title: "Starting Capital", icon: DollarSign },
    { number: 3, title: "Initial Inventory", icon: Package },
    { number: 4, title: "Wallet Setup", icon: Wallet },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleInventoryChange = (index: number, field: string, value: string) => {
    const newItems = [...formData.inventoryItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData(prev => ({ ...prev, inventoryItems: newItems }))
  }

  const addInventoryItem = () => {
    setFormData(prev => ({
      ...prev,
      inventoryItems: [...prev.inventoryItems, { name: "", quantity: "", unitCost: "" }]
    }))
  }

  const removeInventoryItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inventoryItems: prev.inventoryItems.filter((_, i) => i !== index)
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Save the business setup data
    console.log("Business Setup Data:", formData)
    
    // In a real app, you would save this to your backend/database
    // For now, we'll just redirect to dashboard
    router.push("/dashboard")
  }

  const handleSkipSetup = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all",
                      currentStep > step.number
                        ? "bg-success border-success text-white"
                        : currentStep === step.number
                        ? "bg-primary border-primary text-white"
                        : "bg-muted border-border text-muted-foreground"
                    )}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <p className={cn(
                    "text-xs mt-2 text-center hidden sm:block",
                    currentStep >= step.number ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-all mx-2",
                      currentStep > step.number ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your business"}
              {currentStep === 2 && "Set your initial capital amount"}
              {currentStep === 3 && "Add your starting inventory (optional)"}
              {currentStep === 4 && "Configure your business wallet"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Business Profile */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., Green Valley Farm"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => handleInputChange("businessType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="food_beverage">Food & Beverage</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Kampala, Uganda"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your business..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Starting Capital */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Starting capital is the initial amount of money you're investing in your business. 
                    This helps us track your business growth and ROI over time.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startingCapital">Starting Capital Amount *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startingCapital"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.startingCapital}
                      onChange={(e) => handleInputChange("startingCapital", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="UGX">UGX - Ugandan Shilling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Initial Inventory */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground">
                    Add items you already have in stock. You can skip this step and add inventory later.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Do you have inventory to add?</Label>
                  <Select
                    value={formData.hasInventory}
                    onValueChange={(value) => handleInputChange("hasInventory", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I want to add inventory now</SelectItem>
                      <SelectItem value="no">No, I'll add it later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.hasInventory === "yes" && (
                  <div className="space-y-4">
                    {formData.inventoryItems.map((item, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg bg-card space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Item {index + 1}</span>
                          {formData.inventoryItems.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInventoryItem(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-2">
                            <Label>Item Name</Label>
                            <Input
                              placeholder="e.g., Tomatoes"
                              value={item.name}
                              onChange={(e) => handleInventoryChange(index, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={item.quantity}
                              onChange={(e) => handleInventoryChange(index, "quantity", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Unit Cost (USD)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              value={item.unitCost}
                              onChange={(e) => handleInventoryChange(index, "unitCost", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addInventoryItem}
                      className="w-full"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Add Another Item
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Wallet Setup */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Your wallet helps you track cash flow, deposits, and withdrawals. 
                    Set up your initial wallet balance to start tracking.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletName">Wallet Name *</Label>
                  <Input
                    id="walletName"
                    placeholder="e.g., Business Cash"
                    value={formData.walletName}
                    onChange={(e) => handleInputChange("walletName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initialBalance">Initial Wallet Balance *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="initialBalance"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.initialBalance}
                      onChange={(e) => handleInputChange("initialBalance", e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is the current cash you have available for business operations
                  </p>
                </div>

                <div className="bg-success/10 border border-success/20 rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-success mb-1">Almost done!</p>
                      <p className="text-xs text-muted-foreground">
                        After completing this step, you'll have full access to your MicroBiz dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={handleSkipSetup}>
                  Skip Setup
                </Button>
                {currentStep < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="button" onClick={handleSubmit} className="bg-success hover:bg-success/90">
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
