"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplets, Plus, FileText, LogOut } from "lucide-react"

export default function GovernmentPage() {
  const router = useRouter()
  const [reports, setReports] = useState([
    {
      id: 1,
      waterSource: "Brahmaputra River",
      sourceType: "river",
      state: "Assam",
      district: "Guwahati",
      turbidity: 12.5,
      ph: 6.9,
      fluorides: 0.4,
      bacteria: "High",
      algae: "Medium",
      date: "17/09/25",
    },
    {
      id: 2,
      waterSource: "Loktak Lake",
      sourceType: "lake",
      state: "Manipur",
      district: "Bishnupur",
      turbidity: 8.2,
      ph: 7.2,
      fluorides: 0.6,
      bacteria: "Medium",
      algae: "High",
      date: "16/09/25",
    },
    {
      id: 3,
      waterSource: "Teesta River",
      sourceType: "river",
      state: "Sikkim",
      district: "Gangtok",
      turbidity: 5.8,
      ph: 7.0,
      fluorides: 0.3,
      bacteria: "Low",
      algae: "Low",
      date: "15/09/25",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    waterSource: "",
    sourceType: "",
    state: "",
    district: "",
    turbidity: "",
    ph: "",
    fluorides: "",
    bacteria: "",
    algae: "",
    date: "",
  })

  const northeastStates = {
    Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Nagaon", "Barpeta", "Goalpara"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Bomdila", "Ziro", "Tezu", "Changlang"],
    Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", "Senapati", "Tamenglong", "Chandel"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Williamnagar", "Resubelpara", "Ampati"],
    Mizoram: ["Aizawl", "Lunglei", "Serchhip", "Champhai", "Kolasib", "Lawngtlai", "Saiha", "Mamit"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon"],
    Tripura: ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Belonia", "Khowai", "Ambassa", "Teliamura"],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Jorethang", "Singtam", "Rangpo", "Yuksom"],
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newReport = {
      id: reports.length + 1,
      ...formData,
      turbidity: Number.parseFloat(formData.turbidity),
      ph: Number.parseFloat(formData.ph),
      fluorides: Number.parseFloat(formData.fluorides),
    }
    setReports([...reports, newReport])
    setFormData({
      waterSource: "",
      sourceType: "",
      state: "",
      district: "",
      turbidity: "",
      ph: "",
      fluorides: "",
      bacteria: "",
      algae: "",
      date: "",
    })
    setShowAddForm(false)
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-secondary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Government Water Quality Dashboard - Northeast Region
              </h1>
              <p className="text-muted-foreground">Monitor water quality parameters across Northeast India states</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Water Report
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sources Monitored</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Northeast States Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(reports.map((r) => r.state)).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Report Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Water Quality Report</CardTitle>
              <CardDescription>Enter water quality parameters for Northeast region monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waterSource">Water Source Name</Label>
                    <Input
                      id="waterSource"
                      value={formData.waterSource}
                      onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                      placeholder="e.g., Brahmaputra River, Loktak Lake"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sourceType">Source Type</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, sourceType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="river">River</SelectItem>
                        <SelectItem value="lake">Lake</SelectItem>
                        <SelectItem value="pond">Pond</SelectItem>
                        <SelectItem value="dam">Dam</SelectItem>
                        <SelectItem value="well">Well</SelectItem>
                        <SelectItem value="reservoir">Reservoir</SelectItem>
                        <SelectItem value="spring">Natural Spring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, state: value, district: "" })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Northeast state" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(northeastStates).map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select
                      onValueChange={(value) => setFormData({ ...formData, district: value })}
                      disabled={!formData.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.state &&
                          northeastStates[formData.state]?.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                    <Input
                      id="turbidity"
                      type="number"
                      step="0.1"
                      value={formData.turbidity}
                      onChange={(e) => setFormData({ ...formData, turbidity: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ph">pH Level</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      value={formData.ph}
                      onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fluorides">Fluorides (mg/L)</Label>
                    <Input
                      id="fluorides"
                      type="number"
                      step="0.1"
                      value={formData.fluorides}
                      onChange={(e) => setFormData({ ...formData, fluorides: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bacteria">Bacteria Level</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, bacteria: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bacteria level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="algae">Algae Level</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, algae: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select algae level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Add Report</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Water Quality Reports - Northeast Region
            </CardTitle>
            <CardDescription>Monitor water quality across Northeast India states and districts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{report.waterSource}</h3>
                      <p className="text-sm text-muted-foreground">
                        {report.sourceType.charAt(0).toUpperCase() + report.sourceType.slice(1)} • {report.state},{" "}
                        {report.district}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Turbidity:</span> {report.turbidity} NTU
                    </div>
                    <div>
                      <span className="font-medium">pH:</span> {report.ph}
                    </div>
                    <div>
                      <span className="font-medium">Fluorides:</span> {report.fluorides} mg/L
                    </div>
                    <div>
                      <span className="font-medium">Bacteria:</span> {report.bacteria}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Algae Level:</span> {report.algae}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {report.state}, {report.district}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
