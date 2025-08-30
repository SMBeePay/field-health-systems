import { z } from 'zod'

// User and Organization Schemas
export const userRoleSchema = z.enum(['admin', 'athletic_director', 'facilities_manager', 'maintenance_tech'])

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: userRoleSchema,
  organizationId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['k12_school', 'college', 'professional', 'municipal', 'private_club']),
  address: z.string().optional(),
  phone: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Field Schemas
export const fieldTypeSchema = z.enum(['football', 'soccer', 'baseball', 'lacrosse', 'field_hockey', 'multi_purpose'])

export const fieldStatusSchema = z.enum(['excellent', 'good', 'monitor', 'critical'])

export const fieldSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  name: z.string().min(1),
  type: fieldTypeSchema,
  installDate: z.date().optional(),
  manufacturer: z.string().optional(),
  surface: z.string().optional(),
  infillType: z.string().optional(),
  totalArea: z.number().positive().optional(),
  status: fieldStatusSchema,
  lastTestingDate: z.date().optional(),
  
  // GPS and Mapping Data
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  satelliteImageUrl: z.string().url().optional(),
  fieldDimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    orientation: z.number().optional() // degrees from north
  }).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Testing Location Schema
export const testingLocationSchema = z.object({
  id: z.string(),
  name: z.string(), // e.g. "Goal Line Center", "50 Yard Line Left Hash"
  position: z.object({
    x: z.number().min(0).max(1), // normalized position 0-1 across field width
    y: z.number().min(0).max(1), // normalized position 0-1 across field length
  }),
  zone: z.string().optional(), // e.g. "End Zone", "Midfield", "Goal Box"
  gmaxReading: z.number().min(0).max(300).optional(),
  shearReading: z.number().min(0).max(100).optional(),
  infillDepthReading: z.number().min(0).max(100).optional(),
})

// Testing Data Schemas
export const testingDataSchema = z.object({
  id: z.string().uuid(),
  fieldId: z.string().uuid(),
  testingDate: z.date(),
  testingTechnician: z.string(),
  weatherConditions: z.string().optional(),
  temperature: z.number().optional(),
  
  // Location-specific readings
  testingLocations: z.array(testingLocationSchema).min(1),
  
  // GMAX Testing (legacy arrays for backward compatibility)
  gmaxReadings: z.array(z.number().min(0).max(300)).min(1),
  gmaxAverage: z.number().min(0).max(300),
  gmaxStatus: fieldStatusSchema,
  
  // Shear Factor Testing
  shearReadings: z.array(z.number().min(0).max(100)).min(1),
  shearAverage: z.number().min(0).max(100),
  shearStatus: fieldStatusSchema,
  
  // Infill Depth Testing
  infillDepthReadings: z.array(z.number().min(0).max(100)).min(1),
  infillDepthAverage: z.number().min(0).max(100),
  infillDepthStatus: fieldStatusSchema,
  
  // Overall Status
  overallStatus: fieldStatusSchema,
  
  // Additional Data
  notes: z.string().optional(),
  photos: z.array(z.string()).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Maintenance Recommendation Schema
export const maintenanceRecommendationSchema = z.object({
  id: z.string().uuid(),
  fieldId: z.string().uuid(),
  testingDataId: z.string().uuid(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.enum(['infill_replacement', 'infill_redistribution', 'seam_repair', 'drainage_improvement', 'deep_cleaning', 'inspection']),
  title: z.string().min(1),
  description: z.string().min(1),
  estimatedCost: z.number().positive().optional(),
  estimatedDuration: z.string().optional(),
  dueDate: z.date().optional(),
  status: z.enum(['pending', 'scheduled', 'in_progress', 'completed', 'deferred']),
  assignedTo: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Compliance Report Schema
export const complianceReportSchema = z.object({
  id: z.string().uuid(),
  fieldId: z.string().uuid(),
  reportType: z.enum(['fifa', 'ncaa', 'nfhs', 'custom']),
  title: z.string().min(1),
  generatedBy: z.string().uuid(),
  reportData: z.record(z.unknown()),
  pdfUrl: z.string().url().optional(),
  status: z.enum(['draft', 'final', 'archived']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Form Input Schemas (for validation)
export const addFieldFormSchema = z.object({
  name: z.string().min(1, 'Field name is required'),
  type: fieldTypeSchema,
  installDate: z.string().optional(),
  manufacturer: z.string().optional(),
  surface: z.string().optional(),
  infillType: z.string().optional(),
  totalArea: z.number().positive('Area must be positive').optional(),
})

export const testingDataFormSchema = z.object({
  fieldId: z.string().uuid('Invalid field ID'),
  testingDate: z.string().min(1, 'Testing date is required'),
  testingTechnician: z.string().min(1, 'Technician name is required'),
  weatherConditions: z.string().optional(),
  temperature: z.number().optional(),
  
  gmaxReadings: z.string().min(1, 'GMAX readings are required'),
  shearReadings: z.string().min(1, 'Shear readings are required'),
  infillDepthReadings: z.string().min(1, 'Infill depth readings are required'),
  
  notes: z.string().optional(),
})

export const maintenanceRecommendationFormSchema = z.object({
  fieldId: z.string().uuid('Invalid field ID'),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.enum(['infill_replacement', 'infill_redistribution', 'seam_repair', 'drainage_improvement', 'deep_cleaning', 'inspection']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  estimatedCost: z.number().positive('Cost must be positive').optional(),
  estimatedDuration: z.string().optional(),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
})

// Type exports
export type User = z.infer<typeof userSchema>
export type UserRole = z.infer<typeof userRoleSchema>
export type Organization = z.infer<typeof organizationSchema>
export type Field = z.infer<typeof fieldSchema>
export type FieldType = z.infer<typeof fieldTypeSchema>
export type FieldStatus = z.infer<typeof fieldStatusSchema>
export type TestingLocation = z.infer<typeof testingLocationSchema>
export type TestingData = z.infer<typeof testingDataSchema>
export type MaintenanceRecommendation = z.infer<typeof maintenanceRecommendationSchema>
export type ComplianceReport = z.infer<typeof complianceReportSchema>

export type AddFieldForm = z.infer<typeof addFieldFormSchema>
export type TestingDataForm = z.infer<typeof testingDataFormSchema>
export type MaintenanceRecommendationForm = z.infer<typeof maintenanceRecommendationFormSchema>