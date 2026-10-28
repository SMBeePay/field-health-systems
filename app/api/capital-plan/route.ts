import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { forecastField, FORECAST_ASSUMPTIONS } from '@/lib/capital-forecast'

// GET /api/capital-plan — replacement forecast for every field in the user's organization
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const organizationId = session.user.organizationId
    if (!organizationId) {
      return NextResponse.json({ error: 'No organization associated with your account' }, { status: 403 })
    }

    const fields = await prisma.field.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        type: true,
        installDate: true,
        replacementCost: true,
        totalArea: true,
        length: true,
        width: true,
        testingData: {
          select: { testingDate: true, gmaxAverage: true },
          orderBy: { testingDate: 'asc' },
        },
      },
    })

    const now = new Date()
    const rows = fields.map((f) => {
      const forecast = forecastField({
        installDate: f.installDate,
        replacementCost: f.replacementCost,
        totalArea: f.totalArea,
        length: f.length,
        width: f.width,
        tests: f.testingData,
        now,
      })
      return { id: f.id, name: f.name, type: f.type, forecast }
    })

    const forecasted = rows.filter((r) => r.forecast)
    const totals = {
      fields: rows.length,
      forecasted: forecasted.length,
      missingInstallDate: rows.length - forecasted.length,
      annualReserve: forecasted.reduce((s, r) => s + (r.forecast?.annualReserve ?? 0), 0),
      futureReplacementCost: forecasted.reduce(
        (s, r) => s + (r.forecast?.futureReplacementCost ?? 0),
        0
      ),
      dueWithin3Years: forecasted.filter((r) => (r.forecast?.remainingLifeYears ?? 99) <= 3).length,
      overdue: forecasted.filter((r) => r.forecast?.overdue).length,
    }

    // Soonest replacements first; fields without a forecast last
    rows.sort((a, b) => {
      if (!a.forecast) return 1
      if (!b.forecast) return -1
      return (
        a.forecast.projectedReplacementDate.getTime() - b.forecast.projectedReplacementDate.getTime()
      )
    })

    return NextResponse.json({ rows, totals, assumptions: FORECAST_ASSUMPTIONS })
  } catch (error) {
    console.error('[GET /api/capital-plan]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
