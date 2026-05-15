import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FieldStatus, TestingStatus, UserRole } from '@prisma/client'

// ─── Status classification helpers ───────────────────────────────────────────

function classifyGmax(avg: number): TestingStatus {
  if (avg < 165) return TestingStatus.PASSED
  if (avg < 200) return TestingStatus.MONITOR
  return TestingStatus.CRITICAL
}

function classifyShear(avg: number): TestingStatus {
  if (avg < 31) return TestingStatus.PASSED
  if (avg <= 40) return TestingStatus.MONITOR
  return TestingStatus.FAILED
}

function classifyInfillDepth(avg: number): TestingStatus {
  if (avg >= 44) return TestingStatus.PASSED
  if (avg >= 38) return TestingStatus.MONITOR
  return TestingStatus.FAILED
}

const STATUS_SEVERITY: Record<TestingStatus, number> = {
  PASSED: 0,
  MONITOR: 1,
  FAILED: 2,
  CRITICAL: 3,
}

function worstStatus(...statuses: TestingStatus[]): TestingStatus {
  return statuses.reduce((worst, current) =>
    STATUS_SEVERITY[current] > STATUS_SEVERITY[worst] ? current : worst
  )
}

/** Map a testing overall status to a FieldStatus.
 *  EXCELLENT requires all three metrics comfortably inside safe ranges. */
function testingStatusToFieldStatus(
  overall: TestingStatus,
  gmaxAvg: number,
  shearAvg: number,
  infillAvg: number
): FieldStatus {
  switch (overall) {
    case TestingStatus.CRITICAL:
      return FieldStatus.CRITICAL
    case TestingStatus.FAILED:
      return FieldStatus.CRITICAL
    case TestingStatus.MONITOR:
      return FieldStatus.MONITOR
    case TestingStatus.PASSED:
      // EXCELLENT if all three are comfortably within safe bounds
      if (gmaxAvg < 120 && shearAvg < 25 && infillAvg >= 44) {
        return FieldStatus.EXCELLENT
      }
      return FieldStatus.GOOD
  }
}

function average(readings: number[]): number {
  if (!readings.length) return 0
  return readings.reduce((sum, v) => sum + v, 0) / readings.length
}

// ─── Route handlers ───────────────────────────────────────────────────────────

// GET /api/fields/[id]/testing — list all testing records, newest first
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: fieldId } = await params
    const organizationId = session.user.organizationId

    // Verify field exists and belongs to the user's org
    const field = await prisma.field.findUnique({
      where: { id: fieldId },
      select: { organizationId: true },
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    if (session.user.role !== UserRole.SUPER_ADMIN && field.organizationId !== organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const testingRecords = await prisma.testingData.findMany({
      where: { fieldId },
      orderBy: { testingDate: 'desc' },
    })

    return NextResponse.json({ testingData: testingRecords })
  } catch (error) {
    console.error('[GET /api/fields/[id]/testing]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/fields/[id]/testing — submit a new test
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { role, organizationId } = session.user
    const { id: fieldId } = await params

    // Verify field exists and belongs to the user's org
    const field = await prisma.field.findUnique({
      where: { id: fieldId },
      select: { organizationId: true },
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    if (role !== UserRole.SUPER_ADMIN && field.organizationId !== organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const {
      testingDate,
      testingTechnician,
      weatherConditions,
      temperature,
      gmaxReadings,
      shearReadings,
      infillDepthReadings,
      notes,
      testingLocations,
    } = body

    // ── Validation ───────────────────────────────────────────────
    if (!testingDate) {
      return NextResponse.json({ error: 'testingDate is required (ISO string)' }, { status: 400 })
    }
    if (!testingTechnician || typeof testingTechnician !== 'string') {
      return NextResponse.json({ error: 'testingTechnician is required' }, { status: 400 })
    }
    if (!Array.isArray(gmaxReadings) || gmaxReadings.length === 0) {
      return NextResponse.json({ error: 'gmaxReadings must be a non-empty array of numbers' }, { status: 400 })
    }
    if (!Array.isArray(shearReadings) || shearReadings.length === 0) {
      return NextResponse.json({ error: 'shearReadings must be a non-empty array of numbers' }, { status: 400 })
    }
    if (!Array.isArray(infillDepthReadings) || infillDepthReadings.length === 0) {
      return NextResponse.json({ error: 'infillDepthReadings must be a non-empty array of numbers' }, { status: 400 })
    }

    // ── Server-side calculations ─────────────────────────────────
    const gmaxAvg = average(gmaxReadings as number[])
    const shearAvg = average(shearReadings as number[])
    const infillAvg = average(infillDepthReadings as number[])

    const gmaxStatus = classifyGmax(gmaxAvg)
    const shearStatus = classifyShear(shearAvg)
    const infillDepthStatus = classifyInfillDepth(infillAvg)
    const overallStatus = worstStatus(gmaxStatus, shearStatus, infillDepthStatus)

    // Resolve userId for conductedBy
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    // ── Persist test record and update field in a transaction ────
    const [testingData] = await prisma.$transaction([
      prisma.testingData.create({
        data: {
          fieldId,
          testingDate: new Date(testingDate),
          testingTechnician,
          weatherConditions: weatherConditions ?? undefined,
          temperature: temperature !== undefined ? Number(temperature) : undefined,
          gmaxReadings,
          gmaxAverage: gmaxAvg,
          gmaxStatus,
          shearReadings,
          shearAverage: shearAvg,
          shearStatus,
          infillDepthReadings,
          infillDepthAverage: infillAvg,
          infillDepthStatus,
          overallStatus,
          notes: notes ?? undefined,
          testingLocations: testingLocations ?? undefined,
          conductedBy: dbUser?.id ?? undefined,
        },
      }),
      prisma.field.update({
        where: { id: fieldId },
        data: {
          lastTestingDate: new Date(testingDate),
          status: testingStatusToFieldStatus(overallStatus, gmaxAvg, shearAvg, infillAvg),
          updatedBy: dbUser?.id ?? undefined,
        },
      }),
    ])

    return NextResponse.json({ testingData }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/fields/[id]/testing]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
