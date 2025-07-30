"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
import { PulseButton } from "./pulse-button"
import { TypingAnimation } from "./typing-animation"
import { FormValidation } from "./form-validation"

interface LoginFormProps {
  onToggleMode: () => void
  onStartDemo: () => void
}

const welcomeTexts = [
  "Welcome Back to Marketing Insights",
  "Ready to Boost Your ROI?",
  "Let's Analyze Your Success",
  "Time to Optimize Campaigns",
]

export function LoginForm({ onToggleMode, onStartDemo }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setShowValidation(true)

    if (!emailValid || !passwordValid) {
      setError("Please fix the validation errors above")
      setLoading(false)
      return
    }

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  const handleDemoLogin = () => {
    setEmail("demo@marketinginsights.com")
    setPassword("demo123")
    onStartDemo()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-700 hover:shadow-3xl transition-all">
        <CardHeader className="text-center pb-6 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 animate-gradient-x" />

          <div className="relative z-10">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-xl animate-in zoom-in-50 duration-500 hover:scale-110 transition-transform cursor-pointer">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center animate-pulse">
                <div className="h-5 w-5 bg-gradient-to-br from-primary to-blue-600 rounded-sm" />
              </div>
            </div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              <TypingAnimation texts={welcomeTexts} />
            </CardTitle>

            <p className="text-muted-foreground animate-in fade-in-50 duration-700 delay-300">
              Sign in to access your marketing analytics dashboard
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {/* Animated Demo Access Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 animate-in slide-in-from-left-4 duration-500 delay-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Try Demo Mode</p>
                  <p className="text-xs text-blue-700">Explore with sample data instantly</p>
                </div>
              </div>
              <PulseButton
                variant="outline"
                size="sm"
                onClick={handleDemoLogin}
                className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent hover:scale-110 shadow-sm"
              >
                Demo Login
              </PulseButton>
            </div>
          </div>

          <div className="relative animate-in fade-in-50 duration-500 delay-400">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-muted-foreground font-medium">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert
                variant="destructive"
                className="border-red-200 bg-red-50 animate-in slide-in-from-top-2 duration-300 hover:scale-105 transition-transform"
              >
                <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3 animate-in slide-in-from-left-4 duration-500 delay-500">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative group">
                <Mail
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${
                    focusedField === "email" ? "text-primary scale-110" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@company.com"
                  className={`pl-12 h-12 border-2 border-gray-200 rounded-xl transition-all duration-300 text-base ${
                    focusedField === "email"
                      ? "border-primary ring-4 ring-primary/20 shadow-lg scale-105 bg-blue-50/50"
                      : "hover:border-primary/50 hover:shadow-md"
                  } ${emailValid && showValidation ? "border-green-500" : ""} ${!emailValid && showValidation && email ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {showValidation && (
                <FormValidation
                  value={email}
                  rules={{
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  }}
                  onValidationChange={setEmailValid}
                />
              )}
            </div>

            <div className="space-y-3 animate-in slide-in-from-left-4 duration-500 delay-600">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs text-primary hover:text-primary/80 hover:scale-105 transition-all duration-200 font-medium"
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative group">
                <Lock
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${
                    focusedField === "password" ? "text-primary scale-110" : "text-muted-foreground"
                  }`}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className={`pl-12 pr-12 h-12 border-2 border-gray-200 rounded-xl transition-all duration-300 text-base ${
                    focusedField === "password"
                      ? "border-primary ring-4 ring-primary/20 shadow-lg scale-105 bg-blue-50/50"
                      : "hover:border-primary/50 hover:shadow-md"
                  } ${passwordValid && showValidation ? "border-green-500" : ""} ${!passwordValid && showValidation && password ? "border-red-500" : ""}`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent hover:scale-125 transition-all duration-200 rounded-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {showValidation && (
                <FormValidation
                  value={password}
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  onValidationChange={setPasswordValid}
                />
              )}
            </div>

            <div className="animate-in slide-in-from-bottom-4 duration-500 delay-700">
              <PulseButton
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-xl hover:shadow-2xl text-base font-semibold rounded-xl"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </PulseButton>
            </div>
          </form>

          <div className="text-center animate-in fade-in-50 duration-500 delay-800">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={onToggleMode}
                className="p-0 h-auto font-semibold text-primary hover:text-primary/80 hover:scale-105 transition-all duration-200"
              >
                Create free account
              </Button>
            </p>
          </div>

          {/* Animated Trust Indicators */}
          <div className="pt-6 border-t animate-in slide-in-from-bottom-4 duration-500 delay-900">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2 hover:scale-110 transition-all duration-200 cursor-pointer group">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse group-hover:scale-150 transition-transform" />
                <span className="font-medium">SOC 2 Certified</span>
              </span>
              <span className="flex items-center gap-2 hover:scale-110 transition-all duration-200 cursor-pointer group">
                <div
                  className="h-2 w-2 bg-blue-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"
                  style={{ animationDelay: "0.5s" }}
                />
                <span className="font-medium">GDPR Compliant</span>
              </span>
              <span className="flex items-center gap-2 hover:scale-110 transition-all duration-200 cursor-pointer group">
                <div
                  className="h-2 w-2 bg-purple-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"
                  style={{ animationDelay: "1s" }}
                />
                <span className="font-medium">99.9% Uptime</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
