import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FieldStatus } from '@prisma/client'

// ─── CSV helpers ──────────────────────────────────────────────────────────────

function csvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

// Status sort order — most severe first
const STATUS_ORDER: Record<FieldStatus, number> = {
  CRITICAL: 0,
  OUT_OF_SERVICE: 1,
  MONITOR: 2,
  GOOD: 3,
  EXCELLENT: 4,
}

// ─── Route handler ────────────────────────────────────────────────────────────

// GET /api/reports — org-wide CSV or JSON report, one row per field with latest test
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const organizationId = session.user.organizationId
    if (!organizationId) {
      return NextResponse.json({ error: 'No organization associated with your account' }, { status: 403 })
    }

    // Fetch org for filename
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { name: true },
    })

    const fields = await prisma.field.findMany({
      where: { organizationId },
      include: {
        testingData: {
          orderBy: { testingDate: 'desc' },
          take: 1,
        },
      },
    })

    // Sort by status severity
    const sorted = fields.sort(
      (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    )

    const { searchParams } = new URL(req.url)
    const format = searchParams.get('format') ?? 'csv'

    if (format === 'json') {
      const report = sorted.map((field) => {
        const latest = field.testingData[0] ?? null
        return {
          fieldId: field.id,
          fieldName: field.name,
          type: field.type,
          status: field.status,
          lastTestDate: field.lastTestingDate,
          latestTest: latest
            ? {
                gmaxAverage: latest.gmaxAverage,
                gmaxStatus: latest.gmaxStatus,
                shearAverage: latest.shearAverage,
                shearStatus: latest.shearStatus,
                infillDepthAverage: latest.infillDepthAverage,
                infillDepthStatus: latest.infillDepthStatus,
                overallStatus: latest.overallStatus,
                testingTechnician: latest.testingTechnician,
              }
            : null,
        }
      })
      return NextResponse.json({ organization: organization?.name, fields: report })
    }

    // ── Build CSV ─────────────────────────────────────────────────
    const header =
      'Field Name,Type,Status,Last Test Date,GMAX Avg,GMAX Status,Shear Avg,Shear Status,Infill Avg (mm),Infill Status,Overall Status,Technician'

    const dataRows = sorted.map((field) => {
      const latest = field.testingData[0] ?? null
      return [
        csvCell(field.name),
        csvCell(field.type),
        csvCell(field.status),
        csvCell(formatDate(field.lastTestingDate)),
        csvCell(latest ? latest.gmaxAverage.toFixed(2) : ''),
        csvCell(latest?.gmaxStatus ?? ''),
        csvCell(latest ? latest.shearAverage.toFixed(2) : ''),
        csvCell(latest?.shearStatus ?? ''),
        csvCell(latest ? latest.infillDepthAverage.toFixed(2) : ''),
        csvCell(latest?.infillDepthStatus ?? ''),
        csvCell(latest?.overallStatus ?? ''),
        csvCell(latest?.testingTechnician ?? ''),
      ].join(',')
    })

    const csv = [header, ...dataRows].join('\n')

    const orgName = (organization?.name ?? 'org').replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const dateStamp = new Date().toISOString().split('T')[0]
    const filename = `field-health-report-${orgName}-${dateStamp}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('[GET /api/reports]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
