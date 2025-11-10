import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ArrowRight, BarChart3, Shield, Smartphone, TrendingUp, CheckCircle, Users, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="w-28 h-14">
                <Logo />
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-farmer-woman.jpg"
            alt="Agricultural entrepreneur"
            fill
            className="object-cover brightness-75"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        {/* Large text watermark */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden opacity-20">
          <h2 className="text-[12vw] md:text-[15vw] font-black text-white/30 tracking-wider whitespace-nowrap">
            MICROBIZ
          </h2>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-block mb-8">
              <div className="px-6 py-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                <span className="text-white text-sm font-medium">Smart Business Management Starts Here</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Grow Your Business —{" "}
              <span className="block">The Smart Way</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Welcome to MicroBiz, your trusted partner in small business management. Whether it's retail, agriculture, or services, we make financial tracking easy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-accent hover:bg-accent/90 text-white text-base h-12 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                <Link href="/register">
                  Get Started Now
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="text-orange text-base h-12 px-8 rounded-full border-2 border-white/80 hover:bg-white hover:text-primary backdrop-blur-sm transition-all"
              >
                <Link href="/login">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools designed specifically for small businesses and agricultural entrepreneurs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Financial Tracking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Monitor income, expenses, and cash flow in real-time with detailed analytics in USD.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Smart Analytics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Make informed decisions with AI-powered insights and visual reports tailored for you.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-success/10 text-success flex items-center justify-center mb-4">
                <Smartphone className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Mobile Friendly</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Access your business data anywhere, anytime from any device with our responsive design.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Secure & Reliable</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your data is protected with enterprise-grade security measures and encrypted storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="h-12 w-12 mx-auto mb-6 text-accent" />
            <blockquote className="text-2xl sm:text-3xl font-medium text-foreground mb-6 leading-relaxed">
              "MicroBiz Monitor has transformed how I manage my farm business. I can now track every dollar and make better decisions for growth."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Sarah Mukasa</p>
                <p className="text-sm text-muted-foreground">Agricultural Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-accent rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using MicroBiz Monitor to track finances, manage inventory, and grow with confidence.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg h-14 px-8 bg-white text-primary hover:bg-white/90 rounded-full">
              <Link href="/register">
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="w-32 h-16 mb-4">
                <Logo />
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                Empowering small businesses and agricultural entrepreneurs with smart financial management tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-accent transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-accent transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                <li><Link href="/help" className="hover:text-accent transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 MicroBiz Monitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
