"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, Download, Eye, Edit, Trash2 } from "lucide-react"
import { CreateReportModal } from "@/components/modals/create-report-modal"
import { Button } from "@/components/ui/button"

interface Report {
  id: string
  name: string
  type: string
  status: "completed" | "processing" | "scheduled"
  createdAt: string
  lastRun: string
  metrics: {
    views: number
    downloads: number
  }
}

const initialReportsData: Report[] = [
  {
    id: "1",
    name: "Monthly Performance Report",
    type: "Performance",
    status: "completed",
    createdAt: "2024-01-15",
    lastRun: "2024-01-29",
    metrics: { views: 245, downloads: 89 },
  },
  {
    id: "2",
    name: "Campaign ROI Analysis",
    type: "ROI",
    status: "processing",
    createdAt: "2024-01-20",
    lastRun: "2024-01-28",
    metrics: { views: 156, downloads: 45 },
  },
  {
    id: "3",
    name: "Audience Segmentation Report",
    type: "Audience",
    status: "completed",
    createdAt: "2024-01-10",
    lastRun: "2024-01-27",
    metrics: { views: 189, downloads: 67 },
  },
]

function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReportsData)

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary",
      scheduled: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleCreateReport = (newReport: Report) => {
    setReports((prev) => [...prev, newReport])
  }

  const handleView = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId)
    alert(`Viewing report: ${report?.name}\nType: ${report?.type}\nStatus: ${report?.status}`)
  }

  const handleDownload = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId)
    // Simulate download
    const blob = new Blob([`Report: ${report?.name}\nGenerated: ${new Date().toISOString()}`], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${report?.name}.txt`
    a.click()

    // Update download count
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, metrics: { ...r.metrics, downloads: r.metrics.downloads + 1 } } : r,
      ),
    )
  }

  const handleEdit = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId)
    const newName = prompt("Edit report name:", report?.name)
    if (newName && newName !== report?.name) {
      setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, name: newName } : r)))
    }
  }

  const handleDelete = (reportId: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((report) => report.id !== reportId))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Manage and view your marketing reports</p>
        </div>
        <CreateReportModal onCreateReport={handleCreateReport} />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">+{reports.length - initialReportsData.length} new</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.reduce((sum, report) => sum + report.metrics.views, 0)}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.reduce((sum, report) => sum + report.metrics.downloads, 0)}
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(report.lastRun).toLocaleDateString()}</TableCell>
                    <TableCell>{report.metrics.views}</TableCell>
                    <TableCell>{report.metrics.downloads}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(report.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(report.id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(report.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(report.id)}>
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

export default ReportsPage
