import { addMonths, differenceInCalendarDays } from 'date-fns'
import { prisma } from './prisma'
import {
  getAssessmentStatus,
  getFieldHealthStatus,
  testingStatusToAssessmentStatus,
  fieldStatusToHealthStatus,
  type AssessmentStatus,
  type FieldHealthStatus,
  type PointReading,
} from './field-status'
import type { MaintenancePriority } from '@prisma/client'

export const TESTING_INTERVAL_MONTHS = 6

export function nextDueDate(lastTestingDate: Date | null): Date | null {
  return lastTestingDate ? addMonths(lastTestingDate, TESTING_INTERVAL_MONTHS) : null
}

export function daysUntil(date: Date | null): number | null {
  return date ? differenceInCalendarDays(date, new Date()) : null
}

/** Pull the 10-point test location readings out of the flexible JSON column, if present. */
export function extractPointReadings(testingLocations: unknown): PointReading[] {
  if (!Array.isArray(testingLocations)) return []
  return testingLocations
    .filter((p): p is Record<string, unknown> => !!p && typeof p === 'object')
    .map((p) => ({
      gmax: Number(p.gmax ?? p.gmaxReading ?? 0),
      infillDepth: Number(p.infillDepth ?? p.infillDepthReading ?? 0),
      shear: Number(p.shear ?? p.shearReading ?? 0),
      visualCondition: (p.visualCondition as PointReading['visualCondition']) ?? 'good',
    }))
    .filter((p) => p.gmax > 0)
}

export interface FieldWithHealth {
  id: string
  name: string
  facility: string | null
  type: string
  lastTestingDate: Date | null
  nextDue: Date | null
  assessmentStatus: AssessmentStatus
  health: FieldHealthStatus
  openActionsCount: number
  latestAssessmentId: string | null
}

export function computeFieldHealth(
  field: {
    id: string
    name: string
    facility: string | null
    type: string
    status: import('@prisma/client').FieldStatus
    lastTestingDate: Date | null
    testingData: { id: string; overallStatus: import('@prisma/client').TestingStatus; testingLocations: unknown }[]
  },
  openRecommendations: { priority: MaintenancePriority }[]
): FieldWithHealth {
  const latest = field.testingData[0]
  const points = latest ? extractPointReadings(latest.testingLocations) : []
  const assessmentStatus: AssessmentStatus = latest
    ? points.length > 0
      ? getAssessmentStatus(points)
      : testingStatusToAssessmentStatus(latest.overallStatus)
    : fieldStatusToHealthStatus(field.status) === 'healthy'
      ? 'passed'
      : fieldStatusToHealthStatus(field.status) === 'monitor'
        ? 'monitor'
        : 'failed'

  const worstOpenPriority = openRecommendations
    .map((r) => r.priority)
    .sort((a, b) => priorityRank(b) - priorityRank(a))[0]

  const health = latest
    ? getFieldHealthStatus(assessmentStatus, worstOpenPriority)
    : fieldStatusToHealthStatus(field.status)

  return {
    id: field.id,
    name: field.name,
    facility: field.facility,
    type: field.type,
    lastTestingDate: field.lastTestingDate,
    nextDue: nextDueDate(field.lastTestingDate),
    assessmentStatus,
    health,
    openActionsCount: openRecommendations.length,
    latestAssessmentId: latest?.id ?? null,
  }
}

function priorityRank(p: MaintenancePriority): number {
  return { LOW: 0, MEDIUM: 1, HIGH: 2, CRITICAL: 3 }[p]
}

export async function getFieldDetail(orgSlug: string, fieldId: string) {
  const field = await prisma.field.findFirst({
    where: { id: fieldId, organization: { slug: orgSlug } },
    include: {
      organization: { select: { name: true, slug: true } },
      testingData: { where: { isDraft: false }, orderBy: { testingDate: 'desc' } },
      maintenanceRecommendations: {
        where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
        orderBy: { dueDate: 'asc' },
      },
    },
  })

  if (!field) return null

  const health = computeFieldHealth(field, field.maintenanceRecommendations)

  return { field, health }
}

export async function getAssessmentDetail(orgSlug: string, assessmentId: string) {
  const assessment = await prisma.testingData.findFirst({
    where: { id: assessmentId, field: { organization: { slug: orgSlug } } },
    include: {
      field: { select: { id: true, name: true, facility: true, type: true } },
    },
  })

  return assessment
}

export async function getOrganizationAssessments(orgSlug: string) {
  return prisma.testingData.findMany({
    where: { field: { organization: { slug: orgSlug } }, isDraft: false },
    orderBy: { testingDate: 'desc' },
    include: { field: { select: { id: true, name: true, facility: true } } },
  })
}

export async function getOrganizationReports(orgSlug: string) {
  return prisma.complianceReport.findMany({
    where: { organization: { slug: orgSlug } },
    orderBy: { issuedDate: 'desc' },
    include: { field: { select: { id: true, name: true, facility: true } } },
  })
}

export async function getOrganizationAlerts(orgSlug: string) {
  return prisma.maintenanceRecommendation.findMany({
    where: { organization: { slug: orgSlug } },
    orderBy: [{ status: 'asc' }, { dueDate: 'asc' }],
    include: { field: { select: { id: true, name: true, facility: true } } },
  })
}

export async function getOrganizationDashboard(orgSlug: string) {
  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    include: {
      fields: {
        orderBy: { name: 'asc' },
        include: {
          testingData: { where: { isDraft: false }, orderBy: { testingDate: 'desc' }, take: 1 },
          maintenanceRecommendations: {
            where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
            select: { priority: true },
          },
        },
      },
    },
  })

  if (!organization) return null

  const fields: FieldWithHealth[] = organization.fields.map((f) =>
    computeFieldHealth(f, f.maintenanceRecommendations)
  )

  return { organization, fields }
}
