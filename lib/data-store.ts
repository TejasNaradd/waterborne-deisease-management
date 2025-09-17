// Mock data store for the water disease management system
// In a real application, this would connect to a database

export interface CaseRecord {
  id: string
  patientName: string
  age: number
  disease: string
  symptoms: string[]
  location: string
  district: string
  dateReported: string
  status: "active" | "recovered" | "referred"
  reportedBy: string
}

export interface HospitalRecord {
  id: string
  hospitalName: string
  district: string
  totalPatients: number
  deaths: number
  seriousCases: number
  dateReported: string
  waterborneDisease: string
  reportedBy: string
}

export interface WaterQualityReport {
  id: string
  waterSource: string
  sourceType: "dam" | "river" | "pond" | "lake" | "well" | "borewell"
  location: string
  district: string
  contaminationLevel: "safe" | "moderate" | "high" | "critical"
  turbidity: number
  ph: number
  fluorides: number
  bacteria: number
  algae: number
  harmfulSubstances: string[]
  dateReported: string
  reportedBy: string
}

// Mock data storage
const caseRecords: CaseRecord[] = []
const hospitalRecords: HospitalRecord[] = []
const waterQualityReports: WaterQualityReport[] = []

// Case Records Management
export const getCaseRecords = (): CaseRecord[] => {
  return caseRecords
}

export const addCaseRecord = (record: Omit<CaseRecord, "id">): CaseRecord => {
  const newRecord: CaseRecord = {
    ...record,
    id: Date.now().toString(),
  }
  caseRecords.push(newRecord)
  return newRecord
}

export const updateCaseRecord = (id: string, updates: Partial<CaseRecord>): CaseRecord | null => {
  const index = caseRecords.findIndex((record) => record.id === id)
  if (index === -1) return null

  caseRecords[index] = { ...caseRecords[index], ...updates }
  return caseRecords[index]
}

export const deleteCaseRecord = (id: string): boolean => {
  const index = caseRecords.findIndex((record) => record.id === id)
  if (index === -1) return false

  caseRecords.splice(index, 1)
  return true
}

// Hospital Records Management
export const getHospitalRecords = (): HospitalRecord[] => {
  return hospitalRecords
}

export const addHospitalRecord = (record: Omit<HospitalRecord, "id">): HospitalRecord => {
  const newRecord: HospitalRecord = {
    ...record,
    id: Date.now().toString(),
  }
  hospitalRecords.push(newRecord)
  return newRecord
}

export const updateHospitalRecord = (id: string, updates: Partial<HospitalRecord>): HospitalRecord | null => {
  const index = hospitalRecords.findIndex((record) => record.id === id)
  if (index === -1) return null

  hospitalRecords[index] = { ...hospitalRecords[index], ...updates }
  return hospitalRecords[index]
}

export const deleteHospitalRecord = (id: string): boolean => {
  const index = hospitalRecords.findIndex((record) => record.id === id)
  if (index === -1) return false

  hospitalRecords.splice(index, 1)
  return true
}

// Water Quality Reports Management
export const getWaterQualityReports = (): WaterQualityReport[] => {
  return waterQualityReports
}

export const addWaterQualityReport = (report: Omit<WaterQualityReport, "id">): WaterQualityReport => {
  const newReport: WaterQualityReport = {
    ...report,
    id: Date.now().toString(),
  }
  waterQualityReports.push(newReport)
  return newReport
}

export const updateWaterQualityReport = (
  id: string,
  updates: Partial<WaterQualityReport>,
): WaterQualityReport | null => {
  const index = waterQualityReports.findIndex((report) => report.id === id)
  if (index === -1) return null

  waterQualityReports[index] = { ...waterQualityReports[index], ...updates }
  return waterQualityReports[index]
}

export const deleteWaterQualityReport = (id: string): boolean => {
  const index = waterQualityReports.findIndex((report) => report.id === id)
  if (index === -1) return false

  waterQualityReports.splice(index, 1)
  return true
}

// Analytics and Statistics
export const getCaseStatistics = () => {
  const total = caseRecords.length
  const active = caseRecords.filter((record) => record.status === "active").length
  const recovered = caseRecords.filter((record) => record.status === "recovered").length
  const referred = caseRecords.filter((record) => record.status === "referred").length

  const diseaseBreakdown = caseRecords.reduce(
    (acc, record) => {
      acc[record.disease] = (acc[record.disease] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const districtBreakdown = caseRecords.reduce(
    (acc, record) => {
      acc[record.district] = (acc[record.district] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total,
    active,
    recovered,
    referred,
    diseaseBreakdown,
    districtBreakdown,
  }
}

export const getHospitalStatistics = () => {
  const totalPatients = hospitalRecords.reduce((sum, record) => sum + record.totalPatients, 0)
  const totalDeaths = hospitalRecords.reduce((sum, record) => sum + record.deaths, 0)
  const totalSeriousCases = hospitalRecords.reduce((sum, record) => sum + record.seriousCases, 0)

  const districtBreakdown = hospitalRecords.reduce(
    (acc, record) => {
      if (!acc[record.district]) {
        acc[record.district] = { patients: 0, deaths: 0, serious: 0 }
      }
      acc[record.district].patients += record.totalPatients
      acc[record.district].deaths += record.deaths
      acc[record.district].serious += record.seriousCases
      return acc
    },
    {} as Record<string, { patients: number; deaths: number; serious: number }>,
  )

  return {
    totalPatients,
    totalDeaths,
    totalSeriousCases,
    districtBreakdown,
  }
}

export const getWaterQualityStatistics = () => {
  const total = waterQualityReports.length
  const safe = waterQualityReports.filter((report) => report.contaminationLevel === "safe").length
  const moderate = waterQualityReports.filter((report) => report.contaminationLevel === "moderate").length
  const high = waterQualityReports.filter((report) => report.contaminationLevel === "high").length
  const critical = waterQualityReports.filter((report) => report.contaminationLevel === "critical").length

  const sourceTypeBreakdown = waterQualityReports.reduce(
    (acc, report) => {
      acc[report.sourceType] = (acc[report.sourceType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const districtBreakdown = waterQualityReports.reduce(
    (acc, report) => {
      if (!acc[report.district]) {
        acc[report.district] = { safe: 0, moderate: 0, high: 0, critical: 0 }
      }
      acc[report.district][report.contaminationLevel]++
      return acc
    },
    {} as Record<string, { safe: number; moderate: number; high: number; critical: number }>,
  )

  return {
    total,
    safe,
    moderate,
    high,
    critical,
    sourceTypeBreakdown,
    districtBreakdown,
  }
}

// Search and Filter Functions
export const searchCaseRecords = (query: string): CaseRecord[] => {
  const lowercaseQuery = query.toLowerCase()
  return caseRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(lowercaseQuery) ||
      record.disease.toLowerCase().includes(lowercaseQuery) ||
      record.location.toLowerCase().includes(lowercaseQuery) ||
      record.district.toLowerCase().includes(lowercaseQuery),
  )
}

export const filterCaseRecordsByDistrict = (district: string): CaseRecord[] => {
  return caseRecords.filter((record) => record.district === district)
}

export const filterCaseRecordsByDisease = (disease: string): CaseRecord[] => {
  return caseRecords.filter((record) => record.disease === disease)
}

export const filterCaseRecordsByStatus = (status: CaseRecord["status"]): CaseRecord[] => {
  return caseRecords.filter((record) => record.status === status)
}

export const searchHospitalRecords = (query: string): HospitalRecord[] => {
  const lowercaseQuery = query.toLowerCase()
  return hospitalRecords.filter(
    (record) =>
      record.hospitalName.toLowerCase().includes(lowercaseQuery) ||
      record.district.toLowerCase().includes(lowercaseQuery) ||
      record.waterborneDisease.toLowerCase().includes(lowercaseQuery),
  )
}

export const searchWaterQualityReports = (query: string): WaterQualityReport[] => {
  const lowercaseQuery = query.toLowerCase()
  return waterQualityReports.filter(
    (report) =>
      report.waterSource.toLowerCase().includes(lowercaseQuery) ||
      report.location.toLowerCase().includes(lowercaseQuery) ||
      report.district.toLowerCase().includes(lowercaseQuery) ||
      report.sourceType.toLowerCase().includes(lowercaseQuery),
  )
}

export const filterWaterQualityReportsByContamination = (
  level: WaterQualityReport["contaminationLevel"],
): WaterQualityReport[] => {
  return waterQualityReports.filter((report) => report.contaminationLevel === level)
}

export const filterWaterQualityReportsBySourceType = (
  sourceType: WaterQualityReport["sourceType"],
): WaterQualityReport[] => {
  return waterQualityReports.filter((report) => report.sourceType === sourceType)
}
