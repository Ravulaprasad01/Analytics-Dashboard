"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Target, Edit, Trash2, Search } from "lucide-react"
import { CreateAudienceModal } from "@/components/modals/create-audience-modal"

interface Audience {
  id: string
  name: string
  description: string
  size: number
  type: "custom" | "lookalike" | "behavioral" | "demographic"
  status: "active" | "inactive"
  createdAt: string
  lastUpdated: string
  campaigns: number
}

const initialAudiencesData: Audience[] = [
  {
    id: "1",
    name: "High-Value Customers",
    description: "Customers with lifetime value > $1000",
    size: 15420,
    type: "custom",
    status: "active",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-28",
    campaigns: 5,
  },
  {
    id: "2",
    name: "Cart Abandoners",
    description: "Users who added items but didn't complete purchase",
    size: 8750,
    type: "behavioral",
    status: "active",
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-29",
    campaigns: 3,
  },
  {
    id: "3",
    name: "Lookalike - Premium Buyers",
    description: "Similar to customers who buy premium products",
    size: 25600,
    type: "lookalike",
    status: "active",
    createdAt: "2024-01-20",
    lastUpdated: "2024-01-27",
    campaigns: 7,
  },
]

function AudiencesPage() {
  const [audiences, setAudiences] = useState<Audience[]>(initialAudiencesData)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAudiences = audiences.filter(
    (audience) =>
      audience.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audience.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeColor = (type: string) => {
    const colors = {
      custom: "bg-blue-100 text-blue-800",
      lookalike: "bg-green-100 text-green-800",
      behavioral: "bg-purple-100 text-purple-800",
      demographic: "bg-orange-100 text-orange-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleCreateAudience = (newAudience: Audience) => {
    setAudiences((prev) => [...prev, newAudience])
  }

  const handleEdit = (audienceId: string) => {
    const audience = audiences.find((a) => a.id === audienceId)
    const newName = prompt("Edit audience name:", audience?.name)
    if (newName && newName !== audience?.name) {
      setAudiences((prev) =>
        prev.map((a) =>
          a.id === audienceId ? { ...a, name: newName, lastUpdated: new Date().toISOString().split("T")[0] } : a,
        ),
      )
    }
  }

  const handleDelete = (audienceId: string) => {
    if (confirm("Are you sure you want to delete this audience?")) {
      setAudiences(audiences.filter((audience) => audience.id !== audienceId))
    }
  }

  const toggleStatus = (audienceId: string) => {
    setAudiences(
      audiences.map((audience) =>
        audience.id === audienceId
          ? {
              ...audience,
              status: audience.status === "active" ? ("inactive" as const) : ("active" as const),
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : audience,
      ),
    )
  }

  const totalAudiences = audiences.length
  const activeAudiences = audiences.filter((audience) => audience.status === "active").length
  const totalReach = audiences.reduce((sum, audience) => sum + audience.size, 0)
  const avgSize = Math.round(totalReach / totalAudiences)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audiences</h1>
          <p className="text-muted-foreground">Manage your target audiences and segments</p>
        </div>
        <CreateAudienceModal onCreateAudience={handleCreateAudience} />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audiences</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAudiences}</div>
            <p className="text-xs text-muted-foreground">{activeAudiences} active</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Unique users</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per audience</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audiences.reduce((sum, audience) => sum + audience.campaigns, 0)}</div>
            <p className="text-xs text-muted-foreground">Using audiences</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Audiences Table */}
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle>All Audiences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Audience Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudiences.map((audience) => (
                  <TableRow key={audience.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium">{audience.name}</div>
                        <div className="text-sm text-muted-foreground">{audience.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(audience.type)}>
                        {audience.type.charAt(0).toUpperCase() + audience.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{audience.size.toLocaleString()}</TableCell>
                    <TableCell>
                      <button onClick={() => toggleStatus(audience.id)}>{getStatusBadge(audience.status)}</button>
                    </TableCell>
                    <TableCell>{audience.campaigns}</TableCell>
                    <TableCell>{new Date(audience.lastUpdated).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(audience.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(audience.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AudiencesPage
