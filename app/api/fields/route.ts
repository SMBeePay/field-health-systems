import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FieldStatus, FieldType, UserRole } from '@prisma/client'

// Status sort order — CRITICAL surfaces first
const STATUS_ORDER: Record<FieldStatus, number> = {
  CRITICAL: 0,
  OUT_OF_SERVICE: 1,
  MONITOR: 2,
  GOOD: 3,
  EXCELLENT: 4,
}

// GET /api/fields — list all fields for the authenticated user's organization
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

    const fields = await prisma.field.findMany({
      where: { organizationId },
      include: {
        testingData: {
          orderBy: { testingDate: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            testingData: true,
            maintenanceRecommendations: true,
          },
        },
      },
    })

    // Sort by status severity
    const sorted = fields.sort(
      (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    )

    return NextResponse.json({ fields: sorted })
  } catch (error) {
    console.error('[GET /api/fields]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/fields — create a new field
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { role, organizationId } = session.user
    if (role !== UserRole.ORG_ADMIN && role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 })
    }

    if (!organizationId) {
      return NextResponse.json({ error: 'No organization associated with your account' }, { status: 403 })
    }

    const body = await req.json()
    const {
      name,
      type,
      installDate,
      manufacturer,
      surface,
      infillType,
      length,
      width,
    } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Field name is required' }, { status: 400 })
    }
    if (!type || !Object.values(FieldType).includes(type as FieldType)) {
      return NextResponse.json(
        { error: `Field type is required and must be one of: ${Object.values(FieldType).join(', ')}` },
        { status: 400 }
      )
    }

    // Resolve userId from DB to use as createdBy/updatedBy
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const field = await prisma.field.create({
      data: {
        name: name.trim(),
        type: type as FieldType,
        status: FieldStatus.GOOD,
        organizationId,
        installDate: installDate ? new Date(installDate) : undefined,
        manufacturer: manufacturer ?? undefined,
        surface: surface ?? undefined,
        infillType: infillType ?? undefined,
        length: length !== undefined ? Number(length) : undefined,
        width: width !== undefined ? Number(width) : undefined,
        createdBy: dbUser.id,
        updatedBy: dbUser.id,
      },
    })

    return NextResponse.json({ field }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/fields]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
