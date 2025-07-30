"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OptimizedLineChart, OptimizedBarChart } from "@/components/optimized-charts"
import { FunnelChart } from "@/components/charts/funnel-chart"
import { MoreHorizontal, Eye, Edit, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ChartsSection() {
  const handleChartAction = (action: string, chartName: string) => {
    switch (action) {
      case "view":
        alert(`Viewing detailed ${chartName} data`)
        break
      case "edit":
        alert(`Editing ${chartName} configuration`)
        break
      case "download":
        alert(`Downloading ${chartName} data`)
        break
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="group col-span-full lg:col-span-1 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue Trend</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold">$24,500</span>
                <span className="text-sm text-muted-foreground">Last 30 Days</span>
                <span className="text-sm font-medium text-green-600">+10%</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleChartAction("view", "Revenue Trend")}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleChartAction("edit", "Revenue Trend")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleChartAction("download", "Revenue Trend")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <OptimizedLineChart />
        </CardContent>
      </Card>

      <Card className="group col-span-full lg:col-span-1 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Acquisition</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold">12,345</span>
                <span className="text-sm text-muted-foreground">Last 30 Days</span>
                <span className="text-sm font-medium text-green-600">+5%</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleChartAction("view", "User Acquisition")}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleChartAction("edit", "User Acquisition")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleChartAction("download", "User Acquisition")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <OptimizedBarChart />
        </CardContent>
      </Card>

      <Card className="group col-span-full lg:col-span-1 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Conversion Funnel</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold">3,456</span>
                <span className="text-sm text-muted-foreground">Last 30 Days</span>
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleChartAction("view", "Conversion Funnel")}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleChartAction("edit", "Conversion Funnel")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleChartAction("download", "Conversion Funnel")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <FunnelChart />
        </CardContent>
      </Card>
    </div>
  )
}
