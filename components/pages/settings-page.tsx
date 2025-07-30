"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, CreditCard, Users, Save, Upload, Loader2, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

function SettingsPage() {
  const { profile, updateProfile, uploadAvatar } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [settings, setSettings] = useState({
    profile: {
      name: profile?.name || "John Doe",
      email: profile?.email || "john.doe@company.com",
      company: profile?.company || "Marketing Insights Inc.",
      role: profile?.role || "Marketing Manager",
    },
    notifications: {
      emailReports: true,
      campaignAlerts: true,
      weeklyDigest: false,
      systemUpdates: true,
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      cookies: true,
    },
    billing: {
      plan: "Professional",
      nextBilling: "2024-02-15",
      amount: "$99/month",
    },
  })

  const handleSaveProfile = () => {
    setLoading(true)
    updateProfile({
      name: settings.profile.name,
      email: settings.profile.email,
      company: settings.profile.company,
      role: settings.profile.role,
    }).then(() => {
      setLoading(false)
      alert("Profile settings saved!")
    })
  }

  const handleSaveNotifications = () => {
    alert("Notification settings saved!")
  }

  const handleSavePrivacy = () => {
    alert("Privacy settings saved!")
  }

  const updateNotification = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const updatePrivacy = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const processImageFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPG, PNG, GIF)")
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB")
      return
    }

    setUploadingAvatar(true)

    try {
      // Create preview URL immediately for instant feedback
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Upload the file
      const { error, url } = await uploadAvatar(file)

      if (error) {
        alert(error.message || "Failed to upload avatar")
        // Clean up preview URL on error
        URL.revokeObjectURL(objectUrl)
        setPreviewUrl(null)
      } else {
        alert("Avatar updated successfully!")
        // Keep the preview URL until new image is uploaded
      }
    } catch (err) {
      alert("Failed to upload avatar")
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeAvatar = async () => {
    setUploadingAvatar(true)
    try {
      await updateProfile({ avatar_url: "/placeholder.svg?height=100&width=100&text=U" })
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      alert("Avatar removed successfully!")
    } catch (error) {
      alert("Failed to remove avatar")
    } finally {
      setUploadingAvatar(false)
    }
  }

  const currentAvatarUrl = previewUrl || profile?.avatar_url || "/placeholder.svg"
  const hasCustomAvatar = profile?.avatar_url && !profile.avatar_url.includes("placeholder.svg")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-white shadow-lg">
                <AvatarImage src={currentAvatarUrl} alt="Profile" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  {settings.profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={triggerFileInput}
                    disabled={uploadingAvatar}
                    className="flex items-center gap-1"
                  >
                    {uploadingAvatar ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </>
                    )}
                  </Button>
                  {(hasCustomAvatar || previewUrl) && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={removeAvatar}
                      disabled={uploadingAvatar}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.profile.name}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, name: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={settings.profile.company}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, company: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={settings.profile.role}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, role: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <Button onClick={handleSaveProfile} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly performance reports via email</p>
              </div>
              <Switch
                checked={settings.notifications.emailReports}
                onCheckedChange={(checked) => updateNotification("emailReports", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Campaign Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified about campaign performance changes</p>
              </div>
              <Switch
                checked={settings.notifications.campaignAlerts}
                onCheckedChange={(checked) => updateNotification("campaignAlerts", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Receive a summary of your weekly marketing activities</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyDigest}
                onCheckedChange={(checked) => updateNotification("weeklyDigest", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>System Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
              </div>
              <Switch
                checked={settings.notifications.systemUpdates}
                onCheckedChange={(checked) => updateNotification("systemUpdates", checked)}
              />
            </div>

            <Button onClick={handleSaveNotifications}>
              <Save className="h-4 w-4 mr-2" />
              Save Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Allow sharing anonymized data for product improvement</p>
              </div>
              <Switch
                checked={settings.privacy.dataSharing}
                onCheckedChange={(checked) => updatePrivacy("dataSharing", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-muted-foreground">Help us improve by tracking usage analytics</p>
              </div>
              <Switch
                checked={settings.privacy.analytics}
                onCheckedChange={(checked) => updatePrivacy("analytics", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Cookie Preferences</Label>
                <p className="text-sm text-muted-foreground">Allow cookies for better user experience</p>
              </div>
              <Switch
                checked={settings.privacy.cookies}
                onCheckedChange={(checked) => updatePrivacy("cookies", checked)}
              />
            </div>

            <Button onClick={handleSavePrivacy}>
              <Save className="h-4 w-4 mr-2" />
              Save Privacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Current Plan</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">{settings.billing.plan}</Badge>
                  <span className="text-sm text-muted-foreground">{settings.billing.amount}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Next Billing Date</p>
                <p className="text-sm text-muted-foreground mt-1">{settings.billing.nextBilling}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline">Manage Subscription</Button>
              <Button variant="outline">Billing History</Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border mt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <p className="font-medium">Team Members</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Your plan includes up to 5 team members</p>
              <Button variant="outline" size="sm" className="mt-2">
                Manage Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
