"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Plus, FileText, MapPin, Calendar, LogOut } from "lucide-react"

export default function AshaWorkerPage() {
  const router = useRouter()
  const [cases, setCases] = useState([
    {
      id: 1,
      patientName: "Ravi Sharma",
      disease: "Cholera",
      symptoms: "Severe diarrhea, vomiting, dehydration",
      location: "Dibrugarh, Assam",
      date: "17/09/25",
    },
    {
      id: 2,
      patientName: "Maya Devi",
      disease: "Typhoid",
      symptoms: "High fever, headache, abdominal pain",
      location: "Jorhat, Assam",
      date: "16/09/25",
    },
    {
      id: 3,
      patientName: "Tenzin Norbu",
      disease: "Hepatitis A",
      symptoms: "Jaundice, fatigue, nausea",
      location: "Guwahati, Assam",
      date: "15/09/25",
    },
    {
      id: 4,
      patientName: "Priya Gogoi",
      disease: "Acute Diarrhea",
      symptoms: "Frequent loose stools, stomach cramps",
      location: "Silchar, Assam",
      date: "14/09/25",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    patientName: "",
    disease: "",
    symptoms: "",
    state: "",
    district: "",
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
    const newCase = {
      id: cases.length + 1,
      ...formData,
      location: `${formData.district}, ${formData.state}`,
    }
    setCases([...cases, newCase])
    setFormData({
      patientName: "",
      disease: "",
      symptoms: "",
      state: "",
      district: "",
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
            <Shield className="h-8 w-8 text-secondary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">ASHA Worker Dashboard - Northeast Region</h1>
              <p className="text-muted-foreground">Report and track waterborne disease cases in Northeast India</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Case
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Add Case Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Waterborne Disease Case</CardTitle>
              <CardDescription>Fill in the patient details and symptoms for Northeast region</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disease">Disease</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, disease: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select disease" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cholera">Cholera</SelectItem>
                        <SelectItem value="typhoid">Typhoid</SelectItem>
                        <SelectItem value="hepatitis-a">Hepatitis A</SelectItem>
                        <SelectItem value="diarrhea">Acute Diarrhea</SelectItem>
                        <SelectItem value="dysentery">Dysentery</SelectItem>
                        <SelectItem value="gastroenteritis">Gastroenteritis</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, state: value, district: "" })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
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
                    <Label htmlFor="district">District/City</Label>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    placeholder="Describe the symptoms..."
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Add Case</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Cases List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              My Case History - Assam State
            </CardTitle>
            <CardDescription>
              View all cases reported by this ASHA worker across different districts in Assam
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cases.map((caseItem) => (
                <div key={caseItem.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{caseItem.patientName}</h3>
                      <p className="text-base text-secondary font-medium mt-1">{caseItem.disease}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{caseItem.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{caseItem.location}</span>
                  </div>

                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-sm">
                      <span className="font-medium text-foreground">Symptoms:</span>
                      <span className="ml-2 text-muted-foreground">{caseItem.symptoms}</span>
                    </p>
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
