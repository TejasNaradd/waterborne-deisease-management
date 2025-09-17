"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hospital, Plus, Users, AlertTriangle, MapPin, LogOut } from "lucide-react"

export default function HospitalPage() {
  const router = useRouter()
  const [patientData, setPatientData] = useState([
    {
      id: 1,
      hospital: "Gauhati Medical College Hospital",
      state: "Assam",
      district: "Kamrup",
      diseaseName: "Cholera",
      totalPatients: 32,
      serious: 6,
      date: "17/09/25",
    },
    {
      id: 2,
      hospital: "Regional Institute of Medical Sciences",
      state: "Manipur",
      district: "Imphal West",
      diseaseName: "Typhoid",
      totalPatients: 18,
      serious: 3,
      date: "16/09/25",
    },
    {
      id: 3,
      hospital: "North Eastern Indira Gandhi Regional Institute",
      state: "Meghalaya",
      district: "East Khasi Hills",
      diseaseName: "Hepatitis A",
      totalPatients: 24,
      serious: 4,
      date: "15/09/25",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    hospital: "",
    state: "",
    district: "",
    diseaseName: "",
    totalPatients: "",
    serious: "",
    date: "",
  })

  const stateHospitals = {
    Assam: [
      "Gauhati Medical College Hospital",
      "Silchar Medical College Hospital",
      "Jorhat Medical College Hospital",
      "Tezpur Medical College Hospital",
      "Fakhruddin Ali Ahmed Medical College",
    ],
    "Arunachal Pradesh": [
      "Tomo Riba Institute of Health & Medical Sciences",
      "Bakin Pertin General Hospital",
      "General Hospital Pasighat",
      "District Hospital Itanagar",
    ],
    Manipur: [
      "Regional Institute of Medical Sciences",
      "Jawaharlal Nehru Institute of Medical Sciences",
      "Shija Hospitals & Research Institute",
      "District Hospital Imphal",
    ],
    Meghalaya: [
      "North Eastern Indira Gandhi Regional Institute",
      "Nazareth Hospital Shillong",
      "Civil Hospital Shillong",
      "Ganesh Das Hospital",
    ],
    Mizoram: ["Civil Hospital Aizawl", "Zoram Medical College", "Synod Hospital Durtlang", "District Hospital Lunglei"],
    Nagaland: [
      "District Hospital Kohima",
      "Naga Hospital Authority Kohima",
      "Christian Institute of Health Sciences",
      "District Hospital Dimapur",
    ],
    Tripura: [
      "Agartala Government Medical College",
      "Govind Ballabh Pant Hospital",
      "District Hospital Agartala",
      "Tripura Medical College",
    ],
    Sikkim: [
      "Sikkim Manipal Institute of Medical Sciences",
      "Central Referral Hospital Gangtok",
      "District Hospital Namchi",
      "Singtam District Hospital",
    ],
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPatientData = {
      id: patientData.length + 1,
      ...formData,
      totalPatients: Number.parseInt(formData.totalPatients),
      serious: Number.parseInt(formData.serious),
    }
    setPatientData([...patientData, newPatientData])
    setFormData({
      hospital: "",
      state: "",
      district: "",
      diseaseName: "",
      totalPatients: "",
      serious: "",
      date: "",
    })
    setShowAddForm(false)
  }

  const totalStats = patientData.reduce(
    (acc, data) => ({
      patients: acc.patients + data.totalPatients,
      serious: acc.serious + data.serious,
      hospitals: acc.hospitals + 1,
    }),
    { patients: 0, serious: 0, hospitals: 0 },
  )

  const patientsByState = patientData.reduce((acc, data) => {
    if (!acc[data.state]) {
      acc[data.state] = []
    }
    acc[data.state].push(data)
    return acc
  }, {})

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hospital className="h-8 w-8 text-secondary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Northeast Hospital Dashboard</h1>
              <p className="text-muted-foreground">Add waterborne disease patients by Northeast hospital location</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Patients
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.patients}</div>
              <p className="text-xs text-muted-foreground">Waterborne disease cases</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serious Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalStats.serious}</div>
              <p className="text-xs text-muted-foreground">Critical condition</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">States Covered</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{Object.keys(patientsByState).length}</div>
              <p className="text-xs text-muted-foreground">Different states</p>
            </CardContent>
          </Card>
        </div>

        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Patient Data</CardTitle>
              <CardDescription>
                Enter patient numbers for waterborne diseases by Northeast hospital location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">Northeast State</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, state: value, hospital: "" })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Northeast state" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(stateHospitals).map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital Name</Label>
                    <Select
                      onValueChange={(value) => setFormData({ ...formData, hospital: value })}
                      disabled={!formData.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.state &&
                          stateHospitals[formData.state]?.map((hospital) => (
                            <SelectItem key={hospital} value={hospital}>
                              {hospital}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diseaseName">Waterborne Disease</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, diseaseName: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select waterborne disease" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cholera">Cholera</SelectItem>
                        <SelectItem value="Typhoid">Typhoid</SelectItem>
                        <SelectItem value="Hepatitis A">Hepatitis A</SelectItem>
                        <SelectItem value="Diarrhea">Diarrhea</SelectItem>
                        <SelectItem value="Dysentery">Dysentery</SelectItem>
                        <SelectItem value="Gastroenteritis">Gastroenteritis</SelectItem>
                        <SelectItem value="E. coli Infection">E. coli Infection</SelectItem>
                        <SelectItem value="Giardiasis">Giardiasis</SelectItem>
                        <SelectItem value="Cryptosporidiosis">Cryptosporidiosis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalPatients">Number of Patients</Label>
                    <Input
                      id="totalPatients"
                      type="number"
                      value={formData.totalPatients}
                      onChange={(e) => setFormData({ ...formData, totalPatients: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serious">Serious Cases</Label>
                    <Input
                      id="serious"
                      type="number"
                      value={formData.serious}
                      onChange={(e) => setFormData({ ...formData, serious: e.target.value })}
                      required
                    />
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
                <div className="flex gap-2">
                  <Button type="submit">Add Patient Data</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {Object.entries(patientsByState).map(([state, stateData]) => (
            <Card key={state}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {state} - Hospital Patient Data
                </CardTitle>
                <CardDescription>Waterborne disease patients in {state} hospitals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateData.map((data) => (
                    <div key={data.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{data.hospital}</h3>
                          <p className="text-sm text-muted-foreground">
                            {data.district}, {data.state}
                          </p>
                          <p className="text-sm font-medium text-secondary">{data.diseaseName}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{data.date}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="text-2xl font-bold text-blue-600">{data.totalPatients}</div>
                          <div className="text-xs text-blue-600">Total Patients</div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded">
                          <div className="text-2xl font-bold text-orange-600">{data.serious}</div>
                          <div className="text-xs text-orange-600">Serious Cases</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
