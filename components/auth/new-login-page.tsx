"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  Phone,
  Loader2,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react"

export function NewLoginPage() {
  const { signIn, signUp } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    campaigns: 0,
    revenue: 0,
  })

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  })

  // Animate stats on mount
  useEffect(() => {
    const targets = { users: 50000, campaigns: 125000, revenue: 2500000 }
    const duration = 2000
    const steps = 60

    const increment = {
      users: targets.users / steps,
      campaigns: targets.campaigns / steps,
      revenue: targets.revenue / steps,
    }

    let currentStep = 0
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedStats({
          users: Math.floor(increment.users * currentStep),
          campaigns: Math.floor(increment.campaigns * currentStep),
          revenue: Math.floor(increment.revenue * currentStep),
        })
        currentStep++
      } else {
        setAnimatedStats(targets)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await signIn(loginData.email, loginData.password)
      if (error) {
        setError(error.message || "Invalid credentials")
      } else {
        // Redirect to dashboard after successful login
        window.location.href = '/'
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await signUp(signupData.email, signupData.password, {
        name: signupData.name,
        company: signupData.company,
        phone: signupData.phone,
      })
      if (error) {
        setError(error.message || "Failed to create account")
      } else {
        // Redirect to dashboard after successful signup
        window.location.href = '/'
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Real-time insights and performance tracking",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Audience Management",
      description: "Segment and target your customers effectively",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Optimization",
      description: "AI-powered recommendations for better ROI",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security for your data",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "ADmyBRAND Insights transformed our marketing strategy. ROI increased by 300%!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "StartupXYZ",
      content: "The insights we get are incredible. Best marketing platform we've used.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Growth Manager",
      company: "ScaleUp Inc",
      content: "Intuitive interface and powerful features. Highly recommend!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding and Features */}
<div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-40 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-40 right-20 w-3 h-3 bg-white/25 rounded-full animate-bounce delay-1000"></div>

          <div className="space-y-8">
            {/* Logo and Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">ADmyBRAND Insights</h1>
                  <p className="text-blue-100">a fictional analytics platform</p>
                </div>
              </div>
              <p className="text-xl text-blue-100 leading-relaxed">
                Transform your marketing with AI-powered insights and real-time analytics
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold">{animatedStats.users.toLocaleString()}+</div>
                <div className="text-sm text-blue-100">Active Users</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold">{animatedStats.campaigns.toLocaleString()}+</div>
                <div className="text-sm text-blue-100">Campaigns</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold">${(animatedStats.revenue / 1000000).toFixed(1)}M+</div>
                <div className="text-sm text-blue-100">Revenue Generated</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Why Choose ADmyBRAND Insights?</h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-blue-200 mb-2">{feature.icon}</div>
                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                    <p className="text-xs text-blue-100 mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What Our Users Say</h3>
              <div className="space-y-3">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-blue-100 mb-2">"{testimonial.content}"</p>
                    <div className="text-xs">
                      <span className="font-semibold">{testimonial.name}</span>
                      <span className="text-blue-200">
                        {" "}
                        - {testimonial.role}, {testimonial.company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo CTA */}
            <div className="p-6 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Try Demo Account</h4>
                  <p className="text-sm text-blue-100">demo@marketinginsights.com / demo123</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={async () => {
                    setLoading(true)
                    const { error } = await signIn("demo@marketinginsights.com", "demo123")
                    if (!error) {
                      // Redirect to dashboard after successful demo login
                      window.location.href = '/'
                    } else {
                      setError(error.message || "Demo login failed")
                      setLoading(false)
                    }
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 text-white relative overflow-hidden">
          {/* Animated bubbles - smaller and smoother */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-blue-400/30 rounded-full animate-float delay-300 border border-blue-200/50 transition-all duration-1000"></div>
          <div className="absolute top-40 left-40 w-4 h-4 bg-purple-400/20 rounded-full animate-float delay-700 border border-purple-200/50 transition-all duration-1000"></div>
          <div className="absolute bottom-40 left-20 w-3.5 h-3.5 bg-pink-400/20 rounded-full animate-float delay-1000 border border-pink-200/50 transition-all duration-1000"></div>
          <div className="absolute right-1/4 top-1/4 w-5 h-5 bg-blue-400/15 rounded-full animate-float delay-500 border border-blue-200/50 transition-all duration-1000"></div>
          <div className="absolute right-20 top-20 w-2.5 h-2.5 bg-indigo-400/25 rounded-full animate-float delay-200 border border-indigo-200/50 transition-all duration-1000"></div>
          <div className="absolute right-40 bottom-40 w-4.5 h-4.5 bg-violet-400/20 rounded-full animate-float delay-900 border border-violet-200/50 transition-all duration-1000"></div>
          <div className="absolute left-1/3 top-1/3 w-2 h-2 bg-cyan-400/30 rounded-full animate-float delay-400 border border-cyan-200/50 transition-all duration-1000"></div>
          <div className="absolute right-1/3 bottom-1/3 w-3 h-3 bg-teal-400/25 rounded-full animate-float delay-600 border border-teal-200/50 transition-all duration-1000"></div>
          <div className="absolute left-10 bottom-10 w-4 h-4 bg-blue-400/20 rounded-full animate-float delay-800 border border-blue-200/50 transition-all duration-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-emerald-400/20 rounded-full animate-float delay-350 border border-emerald-200/50 transition-all duration-1000"></div>
          <div className="absolute bottom-1/2 right-1/4 w-2.5 h-2.5 bg-sky-400/25 rounded-full animate-float delay-550 border border-sky-200/50 transition-all duration-1000"></div>
          <div className="absolute top-1/4 right-1/2 w-3 h-3 bg-amber-400/15 rounded-full animate-float delay-650 border border-amber-200/50 transition-all duration-1000"></div>
          
          {/* Additional animated elements */}
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse delay-200"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
          
          {/* Animated particles */}
          <div className="absolute top-10 right-10 w-1 h-1 bg-white rounded-full animate-float delay-100"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-float delay-300"></div>
          <div className="absolute bottom-20 left-10 w-1 h-1 bg-white rounded-full animate-float delay-500"></div>
          <div className="absolute bottom-10 left-20 w-1 h-1 bg-white rounded-full animate-float delay-700"></div>
          <div className="w-full max-w-md space-y-6">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ADmyBRAND Insights
                </h1>
              </div>
              <p className="text-gray-600">a fictional analytics platform</p>
            </div>

            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm transition-all duration-500 hover:shadow-blue-400/20 hover:scale-[1.01] animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
              <CardHeader className="space-y-4 pb-6">
                <div className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {isLogin
                      ? "Sign in to access your marketing dashboard"
                      : "Join thousands of marketers using ADmyBRAND Insights"}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Tabs value={isLogin ? "login" : "signup"} className="w-full animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-200">
                  <TabsList className="grid w-full grid-cols-2 mb-6 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-300">
                    <TabsTrigger
                      value="login"
                      onClick={() => setIsLogin(true)}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      onClick={() => setIsLogin(false)}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-400">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            className="pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-all duration-200"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105 animate-pulse-subtle"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-400">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="name"
                              value={signupData.name}
                              onChange={(e) => setSignupData((prev) => ({ ...prev, name: e.target.value }))}
                              placeholder="Your name"
                              className="pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                            Company
                          </Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="company"
                              value={signupData.company}
                              onChange={(e) => setSignupData((prev) => ({ ...prev, company: e.target.value }))}
                              placeholder="Company name"
                              className="pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-email"
                            type="email"
                            value={signupData.email}
                            onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            className="pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            value={signupData.phone}
                            onChange={(e) => setSignupData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="Your phone number"
                            className="pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            value={signupData.password}
                            onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Create a password"
                            className="pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-all duration-200"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Demo Account Info */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-500 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">Try Demo Account</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Email: <code className="bg-blue-100 px-1 rounded">demo@marketinginsights.com</code>
                  </p>
                  <p className="text-xs text-blue-700">
                    Password: <code className="bg-blue-100 px-1 rounded">demo123</code>
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-600">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>SOC 2 Certified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Features */}
            <div className="lg:hidden space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                    <div className="text-blue-600 mb-2">{feature.icon}</div>
                    <h4 className="font-semibold text-sm text-gray-900">{feature.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
