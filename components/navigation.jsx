"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Droplets, Hospital, Shield, User } from "lucide-react"

export function Navigation({ currentUser }) {
  const handleRoleNavigation = (role) => {
    window.location.href = `/${role}`
  }

  if (currentUser) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="text-sm">{currentUser.name}</span>
        </div>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRoleNavigation("asha")}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Shield className="h-12 w-12 text-secondary mx-auto" />
            <div>
              <h3 className="text-xl font-semibold">ASHA Worker</h3>
              <p className="text-muted-foreground text-sm">Report waterborne disease cases and track patient records</p>
            </div>
            <Button className="w-full">Access Dashboard</Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleRoleNavigation("hospital")}
      >
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Hospital className="h-12 w-12 text-secondary mx-auto" />
            <div>
              <h3 className="text-xl font-semibold">Hospital</h3>
              <p className="text-muted-foreground text-sm">Manage patient data and report disease statistics</p>
            </div>
            <Button className="w-full">Access Dashboard</Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleRoleNavigation("government")}
      >
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Droplets className="h-12 w-12 text-secondary mx-auto" />
            <div>
              <h3 className="text-xl font-semibold">Government</h3>
              <p className="text-muted-foreground text-sm">Monitor water quality and contamination levels</p>
            </div>
            <Button className="w-full">Access Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
