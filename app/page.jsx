"use client"

import { Navigation } from "@/components/navigation"
import { Droplets } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Droplets className="h-16 w-16 text-secondary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Water Disease Management System</h1>
              <p className="text-xl text-muted-foreground mt-2">Choose your role to access the system</p>
            </div>
          </div>

          <Navigation />
        </div>
      </div>
    </div>
  )
}
