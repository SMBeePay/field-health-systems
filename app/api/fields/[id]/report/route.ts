import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Field, TestingData, UserRole } from '@prisma/client'

// ─── CSV helpers ──────────────────────────────────────────────────────────────

/** Wrap a cell value so commas and quotes don't break the CSV. */
function csvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  // Escape double-quotes and wrap in quotes if the value contains commas, quotes, or newlines
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

function buildFieldCsv(field: Field, tests: TestingData[]): string {
  const rows: string[] = []

  // ── Section 1: Field Info ─────────────────────────────────────
  rows.push('Field Name,Type,Surface,Manufacturer,Install Date,Last Tested')
  rows.push(
    [
      csvCell(field.name),
      csvCell(field.type),
      csvCell(field.surface),
      csvCell(field.manufacturer),
      csvCell(formatDate(field.installDate)),
      csvCell(formatDate(field.lastTestingDate)),
    ].join(',')
  )

  rows.push('') // blank separator row

  // ── Section 2: Testing History ────────────────────────────────
  rows.push(
    [
      'Date',
      'Technician',
      'Weather',
      'Temp (°F)',
      'GMAX Avg',
      'GMAX Status',
      'Shear Avg',
      'Shear Status',
      'Infill Avg (mm)',
      'Infill Status',
      'Overall Status',
      'Notes',
    ].join(',')
  )

  for (const test of tests) {
    rows.push(
      [
        csvCell(formatDate(test.testingDate)),
        csvCell(test.testingTechnician),
        csvCell(test.weatherConditions),
        csvCell(test.temperature),
        csvCell(test.gmaxAverage !== null ? test.gmaxAverage.toFixed(2) : ''),
        csvCell(test.gmaxStatus),
        csvCell(test.shearAverage !== null ? test.shearAverage.toFixed(2) : ''),
        csvCell(test.shearStatus),
        csvCell(test.infillDepthAverage !== null ? test.infillDepthAverage.toFixed(2) : ''),
        csvCell(test.infillDepthStatus),
        csvCell(test.overallStatus),
        csvCell(test.notes),
      ].join(',')
    )
  }

  return rows.join('\n')
}

// ─── Route handler ────────────────────────────────────────────────────────────

// GET /api/fields/[id]/report?format=csv|json
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

    const field = await prisma.field.findUnique({
      where: { id: fieldId },
      include: {
        testingData: {
          orderBy: { testingDate: 'desc' },
        },
      },
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    if (session.user.role !== UserRole.SUPER_ADMIN && field.organizationId !== organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const format = searchParams.get('format') ?? 'csv'

    if (format === 'json') {
      return NextResponse.json({
        field: {
          id: field.id,
          name: field.name,
          type: field.type,
          surface: field.surface,
          manufacturer: field.manufacturer,
          installDate: field.installDate,
          lastTestingDate: field.lastTestingDate,
        },
        testingHistory: field.testingData,
      })
    }

    // Default: CSV
    // buildFieldCsv expects the base Field type — destructure to strip the relation
    const { testingData, ...baseField } = field
    const csv = buildFieldCsv(baseField, testingData)
    const safeFieldName = field.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const dateStamp = new Date().toISOString().split('T')[0]
    const filename = `field-report-${safeFieldName}-${dateStamp}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('[GET /api/fields/[id]/report]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
