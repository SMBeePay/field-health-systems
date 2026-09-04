'use server'

import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { can } from '@/lib/permissions'
import { getAssessmentStatus } from '@/lib/field-status'
import { DEFAULT_TEST_POINT_LAYOUT, type TestLocation } from '@/lib/test-points'
import type { AssessmentStatus } from '@/lib/field-status'

async function requireTechnician() {
  const session = await getServerSession(authOptions)
  if (!session || !can(session.user.role, 'create_edit_assessments')) {
    throw new Error('Not authorized to create or edit assessments')
  }
  return session
}

export async function startAssessment(orgSlug: string, fieldId: string) {
  const session = await requireTechnician()

  const emptyLocations: TestLocation[] = DEFAULT_TEST_POINT_LAYOUT.map((pos, i) => ({
    index: i + 1,
    x: pos.x,
    y: pos.y,
    gmax: 0,
    infillDepth: 0,
    shear: 0,
    visualCondition: 'good',
    photoCount: 0,
  }))

  const assessment = await prisma.testingData.create({
    data: {
      fieldId,
      testingDate: new Date(),
      testingTechnician: session.user.name ?? session.user.email,
      gmaxAverage: 0,
      shearAverage: 0,
      infillDepthAverage: 0,
      overallStatus: 'MONITOR',
      isDraft: true,
      testingLocations: emptyLocations as unknown as object[],
      conductedBy: session.user.id,
    },
  })

  redirect(`/app/${orgSlug}/assessments/${assessment.id}/entry`)
}

export async function savePointReading(assessmentId: string, point: TestLocation) {
  await requireTechnician()

  const assessment = await prisma.testingData.findUnique({ where: { id: assessmentId } })
  if (!assessment) throw new Error('Assessment not found')

  const locations = Array.isArray(assessment.testingLocations) ? (assessment.testingLocations as unknown as TestLocation[]) : []
  const updated = locations.some((l) => l.index === point.index)
    ? locations.map((l) => (l.index === point.index ? point : l))
    : [...locations, point].sort((a, b) => a.index - b.index)

  await prisma.testingData.update({
    where: { id: assessmentId },
    data: { testingLocations: updated as unknown as object[] },
  })
}

function average(nums: number[]): number {
  return nums.length ? Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10 : 0
}

const ASSESSMENT_TO_TESTING_STATUS: Record<AssessmentStatus, 'PASSED' | 'MONITOR' | 'FAILED'> = {
  passed: 'PASSED',
  monitor: 'MONITOR',
  failed: 'FAILED',
}

export async function submitAssessment(orgSlug: string, assessmentId: string) {
  await requireTechnician()

  const assessment = await prisma.testingData.findUnique({
    where: { id: assessmentId },
    include: { field: { include: { organization: true } } },
  })
  if (!assessment) throw new Error('Assessment not found')

  const locations = Array.isArray(assessment.testingLocations) ? (assessment.testingLocations as unknown as TestLocation[]) : []
  const gmaxAverage = average(locations.map((l) => l.gmax))
  const shearAverage = average(locations.map((l) => l.shear))
  const infillDepthAverage = average(locations.map((l) => l.infillDepth))
  const overallStatus = getAssessmentStatus(locations)

  await prisma.$transaction([
    prisma.testingData.update({
      where: { id: assessmentId },
      data: {
        gmaxAverage,
        shearAverage,
        infillDepthAverage,
        overallStatus: ASSESSMENT_TO_TESTING_STATUS[overallStatus],
        isDraft: false,
      },
    }),
    prisma.field.update({
      where: { id: assessment.fieldId },
      data: { lastTestingDate: assessment.testingDate },
    }),
  ])

  if (overallStatus !== 'passed') {
    await prisma.maintenanceRecommendation.create({
      data: {
        fieldId: assessment.fieldId,
        organizationId: assessment.field.organizationId,
        title: overallStatus === 'failed' ? 'Immediate maintenance required' : 'Preventive maintenance recommended',
        description:
          overallStatus === 'failed'
            ? `Assessment on ${assessment.testingDate.toLocaleDateString()} found readings outside safe range. Immediate follow-up required.`
            : `Assessment on ${assessment.testingDate.toLocaleDateString()} found readings approaching threshold. Schedule a follow-up inspection.`,
        priority: overallStatus === 'failed' ? 'HIGH' : 'MEDIUM',
        status: 'OPEN',
        category: 'Assessment Follow-up',
        dueDate: new Date(Date.now() + (overallStatus === 'failed' ? 14 : 60) * 24 * 60 * 60 * 1000),
      },
    })
  }

  revalidatePath(`/app/${orgSlug}`)
  revalidatePath(`/app/${orgSlug}/fields/${assessment.fieldId}`)
  redirect(`/app/${orgSlug}/assessments/${assessmentId}`)
}
