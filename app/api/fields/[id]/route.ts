import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FieldStatus, FieldType, UserRole } from '@prisma/client'

// GET /api/fields/[id] — get single field with full testing history and maintenance recommendations
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const organizationId = session.user.organizationId

    const field = await prisma.field.findUnique({
      where: { id },
      include: {
        testingData: {
          orderBy: { testingDate: 'desc' },
        },
        maintenanceRecommendations: {
          orderBy: { createdAt: 'desc' },
        },
        complianceReports: {
          orderBy: { issuedDate: 'desc' },
        },
        organization: {
          select: { id: true, name: true, slug: true },
        },
      },
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    // Enforce org isolation — SUPER_ADMIN can see any field
    if (session.user.role !== UserRole.SUPER_ADMIN && field.organizationId !== organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ field })
  } catch (error) {
    console.error('[GET /api/fields/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/fields/[id] — update field details
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { role, organizationId } = session.user
    if (role !== UserRole.ORG_ADMIN && role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 })
    }

    const { id } = await params

    const existing = await prisma.field.findUnique({
      where: { id },
      select: { organizationId: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    // Non-super-admins may only update fields within their own org
    if (role !== UserRole.SUPER_ADMIN && existing.organizationId !== organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()

    // Whitelist updatable fields to prevent accidental overwrite of org/id
    const allowedFields = [
      'name',
      'type',
      'status',
      'installDate',
      'manufacturer',
      'surface',
      'infillType',
      'totalArea',
      'lastTestingDate',
      'latitude',
      'longitude',
      'satelliteImageUrl',
      'length',
      'width',
      'orientation',
    ]

    const updateData: Record<string, unknown> = {}
    for (const key of allowedFields) {
      if (key in body) {
        if (key === 'type' && !Object.values(FieldType).includes(body[key] as FieldType)) {
          return NextResponse.json({ error: `Invalid field type: ${body[key]}` }, { status: 400 })
        }
        if (key === 'status' && !Object.values(FieldStatus).includes(body[key] as FieldStatus)) {
          return NextResponse.json({ error: `Invalid field status: ${body[key]}` }, { status: 400 })
        }
        if ((key === 'installDate' || key === 'lastTestingDate') && body[key]) {
          updateData[key] = new Date(body[key])
        } else {
          updateData[key] = body[key]
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields provided for update' }, { status: 400 })
    }

    // Resolve userId for updatedBy
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })
    if (dbUser) {
      updateData['updatedBy'] = dbUser.id
    }

    const updated = await prisma.field.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ field: updated })
  } catch (error) {
    console.error('[PATCH /api/fields/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/fields/[id] — hard delete (SUPER_ADMIN only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Forbidden: SUPER_ADMIN role required' }, { status: 403 })
    }

    const { id } = await params

    const existing = await prisma.field.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    await prisma.field.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Field deleted' })
  } catch (error) {
    console.error('[DELETE /api/fields/[id]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
