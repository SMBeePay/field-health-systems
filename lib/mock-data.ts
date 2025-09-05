import { Field, TestingData, MaintenanceRecommendation, Organization, User, ComplianceReport } from './schemas'

export const mockOrganization: Organization = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Lincoln High School Athletic Department',
  type: 'k12_school',
  address: '123 School Drive, Lincoln, CA 95648',
  phone: '(916) 555-0123',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2025-01-15'),
}

export const mockUser: User = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  email: 'john.smith@lincolnhigh.edu',
  name: 'John Smith',
  role: 'athletic_director',
  organizationId: mockOrganization.id,
  createdAt: new Date('2024-01-20'),
  updatedAt: new Date('2025-01-15'),
}

export const mockFields: Field[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    organizationId: mockOrganization.id,
    name: 'Main Football Field',
    type: 'football',
    installDate: new Date('2019-08-15'),
    manufacturer: 'FieldTurf',
    surface: 'Revolution 360',
    infillType: 'TPE Pellets + Sand',
    totalArea: 7200,
    status: 'good',
    lastTestingDate: new Date('2025-01-10'),
    
    // GPS and Mapping Data
    latitude: 38.7223,
    longitude: -121.3010,
    satelliteImageUrl: '/field-satellite.png',
    fieldDimensions: {
      length: 120, // yards including end zones
      width: 53.33, // yards
      orientation: 15 // degrees from north
    },
    
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    organizationId: mockOrganization.id,
    name: 'Soccer Field A',
    type: 'soccer',
    installDate: new Date('2021-05-20'),
    manufacturer: 'AstroTurf',
    surface: 'GameDay Grass 3D60',
    infillType: 'Cork + Sand',
    totalArea: 6400,
    status: 'excellent',
    lastTestingDate: new Date('2025-01-12'),
    
    // GPS and Mapping Data
    latitude: 38.7225,
    longitude: -121.3015,
    satelliteImageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=38.7225,-121.3015&zoom=19&size=800x600&maptype=satellite&key=demo',
    fieldDimensions: {
      length: 110, // yards
      width: 70, // yards
      orientation: 20 // degrees from north
    },
    
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    organizationId: mockOrganization.id,
    name: 'Multi-Purpose Field',
    type: 'multi_purpose',
    installDate: new Date('2020-03-10'),
    manufacturer: 'Shaw Sports Turf',
    surface: 'Matrix Helix',
    infillType: 'EPDM Rubber',
    totalArea: 5000,
    status: 'monitor',
    lastTestingDate: new Date('2025-01-08'),
    
    // GPS and Mapping Data
    latitude: 38.7218,
    longitude: -121.3005,
    satelliteImageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=38.7218,-121.3005&zoom=19&size=800x600&maptype=satellite&key=demo',
    fieldDimensions: {
      length: 100, // yards
      width: 60, // yards
      orientation: 0 // degrees from north
    },
    
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    organizationId: mockOrganization.id,
    name: 'Practice Field',
    type: 'football',
    installDate: new Date('2018-07-01'),
    manufacturer: 'FieldTurf',
    surface: 'Core Series',
    infillType: 'Crumb Rubber + Sand',
    totalArea: 4800,
    status: 'critical',
    lastTestingDate: new Date('2025-01-05'),
    
    // GPS and Mapping Data
    latitude: 38.7220,
    longitude: -121.2998,
    satelliteImageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=38.7220,-121.2998&zoom=19&size=800x600&maptype=satellite&key=demo',
    fieldDimensions: {
      length: 100, // yards practice field
      width: 53.33, // yards
      orientation: 10 // degrees from north
    },
    
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
]

export const mockTestingData: TestingData[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440020',
    fieldId: mockFields[0].id,
    testingDate: new Date('2025-01-10'),
    testingTechnician: 'Mike Johnson, Clean Green Turf',
    weatherConditions: 'Clear, 65°F',
    temperature: 65,
    
    // Testing location data for Main Football Field
    testingLocations: [
      { id: 'loc-1', name: '10 Yard Line Center', position: { x: 0.5, y: 0.17 }, zone: 'End Zone', gmaxReading: 118, shearReading: 32, infillDepthReading: 28 },
      { id: 'loc-2', name: '25 Yard Line Left Hash', position: { x: 0.3, y: 0.29 }, zone: 'Field', gmaxReading: 125, shearReading: 34, infillDepthReading: 30 },
      { id: 'loc-3', name: '25 Yard Line Right Hash', position: { x: 0.7, y: 0.29 }, zone: 'Field', gmaxReading: 112, shearReading: 31, infillDepthReading: 27 },
      { id: 'loc-4', name: '50 Yard Line Center', position: { x: 0.5, y: 0.5 }, zone: 'Midfield', gmaxReading: 121, shearReading: 33, infillDepthReading: 31 },
      { id: 'loc-5', name: '50 Yard Line Left Hash', position: { x: 0.3, y: 0.5 }, zone: 'Midfield', gmaxReading: 116, shearReading: 32, infillDepthReading: 29 },
      { id: 'loc-6', name: '50 Yard Line Right Hash', position: { x: 0.7, y: 0.5 }, zone: 'Midfield', gmaxReading: 123, shearReading: 35, infillDepthReading: 30 },
      { id: 'loc-7', name: 'South End 25 Yard Line Center', position: { x: 0.5, y: 0.71 }, zone: 'Field', gmaxReading: 115, shearReading: 33, infillDepthReading: 28 },
      { id: 'loc-8', name: 'South End 10 Yard Line Center', position: { x: 0.5, y: 0.83 }, zone: 'End Zone', gmaxReading: 119, shearReading: 32, infillDepthReading: 29 },
    ],
    
    gmaxReadings: [118, 125, 112, 121, 116, 123, 115, 119],
    gmaxAverage: 118.6,
    gmaxStatus: 'good',
    shearReadings: [32, 34, 31, 33, 32, 35, 33, 32],
    shearAverage: 32.75,
    shearStatus: 'good',
    infillDepthReadings: [28, 30, 27, 31, 29, 30, 28, 29],
    infillDepthAverage: 29,
    infillDepthStatus: 'excellent',
    overallStatus: 'good',
    notes: 'Field performing well within football standards. GMAX below safe threshold of 165. Shear factor within optimal range for player safety.',
    photos: [],
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440021',
    fieldId: mockFields[1].id,
    testingDate: new Date('2025-01-12'),
    testingTechnician: 'Sarah Davis, Clean Green Turf',
    weatherConditions: 'Partly cloudy, 58°F',
    temperature: 58,
    
    // Testing location data for Soccer Field A
    testingLocations: [
      { id: 'soc-1', name: 'Goal Box Center', position: { x: 0.5, y: 0.08 }, zone: 'Goal Box', gmaxReading: 98, shearReading: 38, infillDepthReading: 32 },
      { id: 'soc-2', name: 'Penalty Spot', position: { x: 0.5, y: 0.18 }, zone: 'Penalty Area', gmaxReading: 105, shearReading: 41, infillDepthReading: 35 },
      { id: 'soc-3', name: 'Left Wing', position: { x: 0.15, y: 0.3 }, zone: 'Field', gmaxReading: 94, shearReading: 36, infillDepthReading: 31 },
      { id: 'soc-4', name: 'Center Circle', position: { x: 0.5, y: 0.5 }, zone: 'Center Circle', gmaxReading: 102, shearReading: 40, infillDepthReading: 36 },
      { id: 'soc-5', name: 'Right Wing', position: { x: 0.85, y: 0.3 }, zone: 'Field', gmaxReading: 96, shearReading: 37, infillDepthReading: 33 },
      { id: 'soc-6', name: 'Left Midfield', position: { x: 0.2, y: 0.7 }, zone: 'Field', gmaxReading: 108, shearReading: 42, infillDepthReading: 34 },
      { id: 'soc-7', name: 'Right Midfield', position: { x: 0.8, y: 0.7 }, zone: 'Field', gmaxReading: 99, shearReading: 39, infillDepthReading: 32 },
      { id: 'soc-8', name: 'Opposite Goal Area', position: { x: 0.5, y: 0.92 }, zone: 'Goal Box', gmaxReading: 101, shearReading: 38, infillDepthReading: 33 },
    ],
    
    gmaxReadings: [98, 105, 94, 102, 96, 108, 99, 101],
    gmaxAverage: 100.4,
    gmaxStatus: 'excellent',
    shearReadings: [38, 41, 36, 40, 37, 42, 39, 38],
    shearAverage: 38.9,
    shearStatus: 'excellent',
    infillDepthReadings: [32, 35, 31, 36, 33, 34, 32, 33],
    infillDepthAverage: 33.25,
    infillDepthStatus: 'excellent',
    overallStatus: 'excellent',
    notes: 'Outstanding field condition. GMAX well below safety limits. Meets FIFA Quality Pro standards for professional soccer play.',
    photos: [],
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440022',
    fieldId: mockFields[2].id,
    testingDate: new Date('2025-01-08'),
    testingTechnician: 'Mike Johnson, Clean Green Turf',
    weatherConditions: 'Light rain, 52°F',
    temperature: 52,
    
    // Testing location data for Multi-Purpose Field
    testingLocations: [
      { id: 'mp-1', name: 'North End Center', position: { x: 0.5, y: 0.1 }, zone: 'End Zone', gmaxReading: 158, shearReading: 28, infillDepthReading: 18 },
      { id: 'mp-2', name: 'North Left Corner', position: { x: 0.2, y: 0.2 }, zone: 'Corner', gmaxReading: 162, shearReading: 30, infillDepthReading: 20 },
      { id: 'mp-3', name: 'North Right Corner', position: { x: 0.8, y: 0.2 }, zone: 'Corner', gmaxReading: 155, shearReading: 27, infillDepthReading: 17 },
      { id: 'mp-4', name: 'Center Field Left', position: { x: 0.3, y: 0.5 }, zone: 'Center', gmaxReading: 160, shearReading: 29, infillDepthReading: 21 },
      { id: 'mp-5', name: 'Center Field Right', position: { x: 0.7, y: 0.5 }, zone: 'Center', gmaxReading: 157, shearReading: 28, infillDepthReading: 19 },
      { id: 'mp-6', name: 'South Left Corner', position: { x: 0.2, y: 0.8 }, zone: 'Corner', gmaxReading: 161, shearReading: 31, infillDepthReading: 20 },
      { id: 'mp-7', name: 'South Right Corner', position: { x: 0.8, y: 0.8 }, zone: 'Corner', gmaxReading: 159, shearReading: 29, infillDepthReading: 18 },
      { id: 'mp-8', name: 'South End Center', position: { x: 0.5, y: 0.9 }, zone: 'End Zone', gmaxReading: 158, shearReading: 28, infillDepthReading: 19 },
    ],
    
    gmaxReadings: [158, 162, 155, 160, 157, 161, 159, 158],
    gmaxAverage: 158.75,
    gmaxStatus: 'monitor',
    shearReadings: [28, 30, 27, 29, 28, 31, 29, 28],
    shearAverage: 28.75,
    shearStatus: 'monitor',
    infillDepthReadings: [18, 20, 17, 21, 19, 20, 18, 19],
    infillDepthAverage: 19,
    infillDepthStatus: 'monitor',
    overallStatus: 'monitor',
    notes: 'Field approaching monitoring threshold. GMAX at 159 is still safe but trending upward toward 165 limit. Recommend infill redistribution to improve shock absorption.',
    photos: [],
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-08'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440023',
    fieldId: mockFields[3].id,
    testingDate: new Date('2025-01-05'),
    testingTechnician: 'Sarah Davis, Clean Green Turf',
    weatherConditions: 'Hot sunny day, 95°F',
    temperature: 95,
    
    // Testing location data for Practice Field (Critical condition)
    testingLocations: [
      { id: 'pf-1', name: '20 Yard Line Center', position: { x: 0.5, y: 0.2 }, zone: 'Field', gmaxReading: 198, shearReading: 22, infillDepthReading: 8 },
      { id: 'pf-2', name: '20 Yard Left Hash', position: { x: 0.3, y: 0.2 }, zone: 'Field', gmaxReading: 205, shearReading: 24, infillDepthReading: 10 },
      { id: 'pf-3', name: '20 Yard Right Hash', position: { x: 0.7, y: 0.2 }, zone: 'Field', gmaxReading: 194, shearReading: 21, infillDepthReading: 7 },
      { id: 'pf-4', name: '40 Yard Line Center', position: { x: 0.5, y: 0.4 }, zone: 'Field', gmaxReading: 201, shearReading: 23, infillDepthReading: 11 },
      { id: 'pf-5', name: '50 Yard Line Center', position: { x: 0.5, y: 0.5 }, zone: 'Midfield', gmaxReading: 196, shearReading: 22, infillDepthReading: 9 },
      { id: 'pf-6', name: '60 Yard Line Left', position: { x: 0.3, y: 0.6 }, zone: 'Field', gmaxReading: 203, shearReading: 25, infillDepthReading: 10 },
      { id: 'pf-7', name: '80 Yard Line Center', position: { x: 0.5, y: 0.8 }, zone: 'Field', gmaxReading: 199, shearReading: 23, infillDepthReading: 8 },
      { id: 'pf-8', name: 'North End 10 Yard Line Center', position: { x: 0.5, y: 0.9 }, zone: 'End Zone', gmaxReading: 197, shearReading: 22, infillDepthReading: 9 },
    ],
    
    gmaxReadings: [198, 205, 194, 201, 196, 203, 199, 197],
    gmaxAverage: 199.1,
    gmaxStatus: 'critical',
    shearReadings: [22, 24, 21, 23, 22, 25, 23, 22],
    shearAverage: 22.75,
    shearStatus: 'critical',
    infillDepthReadings: [8, 10, 7, 11, 9, 10, 8, 9],
    infillDepthAverage: 9,
    infillDepthStatus: 'critical',
    overallStatus: 'critical',
    notes: 'CRITICAL: GMAX at 199 approaching dangerous 200+ threshold. Insufficient infill depth causing poor shock absorption. Field closed pending immediate infill replacement and system remediation.',
    photos: [],
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05'),
  },
]

export const mockMaintenanceRecommendations: MaintenanceRecommendation[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440030',
    fieldId: mockFields[3].id,
    testingDataId: mockTestingData[3].id,
    priority: 'critical',
    category: 'infill_replacement',
    title: 'Critical GMAX Level - Immediate Infill Replacement Required',
    description: 'GMAX reading of 199.1 approaches dangerous 200+ threshold. Insufficient infill depth (9mm) below recommended 25-38mm range. Field closed for athlete safety pending immediate remediation.',
    estimatedCost: 18000,
    estimatedDuration: '3-5 days',
    dueDate: new Date('2025-02-01'),
    status: 'pending',
    assignedTo: 'Premium Field Services',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440031',
    fieldId: mockFields[2].id,
    testingDataId: mockTestingData[2].id,
    priority: 'medium',
    category: 'infill_redistribution',
    title: 'GMAX Monitoring - Preventive Infill Redistribution',
    description: 'GMAX at 158.75 approaching safety threshold of 165. Infill depth at 19mm below optimal range. Proactive redistribution will prevent costly emergency repairs.',
    estimatedCost: 4200,
    estimatedDuration: '1-2 days',
    dueDate: new Date('2025-02-15'),
    status: 'scheduled',
    assignedTo: 'Clean Green Turf Maintenance Team',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-10'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440032',
    fieldId: mockFields[0].id,
    testingDataId: mockTestingData[0].id,
    priority: 'low',
    category: 'inspection',
    title: 'Quarterly Field Inspection & Preventive Assessment',
    description: 'Routine comprehensive inspection including seam integrity, drainage assessment, and GMAX monitoring to maintain excellent field condition.',
    estimatedCost: 750,
    estimatedDuration: '0.5 day',
    dueDate: new Date('2025-04-10'),
    status: 'pending',
    assignedTo: 'Clean Green Turf Inspection Team',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
  },
]

export const mockComplianceReports: ComplianceReport[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440040',
    fieldId: mockFields[1].id,
    reportType: 'fifa',
    title: 'FIFA Quality Pro Certification Report - Soccer Field A',
    generatedBy: mockUser.id,
    reportData: {
      testingDate: '2025-01-12',
      gmaxCompliance: true,
      shearCompliance: true,
      infillCompliance: true,
      overallCompliance: true,
      certificationLevel: 'FIFA Quality Pro',
      validUntil: '2026-01-12',
    },
    pdfUrl: 'https://example.com/reports/fifa-soccer-field-a-2025-01-12.pdf',
    status: 'final',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440041',
    fieldId: mockFields[0].id,
    reportType: 'nfhs',
    title: 'NFHS Safety Report - Main Football Field',
    generatedBy: mockUser.id,
    reportData: {
      testingDate: '2025-01-10',
      gmaxCompliance: true,
      shearCompliance: true,
      infillCompliance: true,
      overallCompliance: true,
      safetyRating: 'Acceptable',
      recommendations: ['Monitor GMAX levels', 'Schedule next testing in 3 months'],
    },
    pdfUrl: 'https://example.com/reports/nfhs-football-field-2025-01-10.pdf',
    status: 'final',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
  },
]

export const mockFieldsWithLatestTesting = mockFields.map(field => ({
  ...field,
  latestTesting: mockTestingData.find(test => test.fieldId === field.id),
}))

export function generateTimeSeriesData(days: number = 30) {
  const data = []
  const now = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      gmax: Math.random() * 40 + 50, // 50-90
      shear: Math.random() * 15 + 20, // 20-35
      infill: Math.random() * 10 + 45, // 45-55
    })
  }
  
  return data
}