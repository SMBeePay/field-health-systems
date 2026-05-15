import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { MaintenancePriority, MaintenanceStatus, UserRole } from '@prisma/client'

// GET /api/fields/[id]/maintenance — list open maintenance recommendations for a field
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
      select: { organizationId: true },
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    if (session.user.role !== UserRole.SUPER_ADMIN && field.organizationId !== organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Allow filtering by status via query param; default to open items
    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get('status')

    const statusFilter =
      statusParam && Object.values(MaintenanceStatus).includes(statusParam as MaintenanceStatus)
        ? (statusParam as MaintenanceStatus)
        : MaintenanceStatus.OPEN

    const recommendations = await prisma.maintenanceRecommendation.findMany({
      where: {
        fieldId,
        status: statusFilter,
      },
      orderBy: [
        // CRITICAL priority first, then by due date
        { priority: 'asc' },
        { dueDate: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('[GET /api/fields/[id]/maintenance]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/fields/[id]/maintenance — create a new maintenance recommendation
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

    if (role !== UserRole.ORG_ADMIN && role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 })
    }

    const { id: fieldId } = await params

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
      title,
      description,
      priority,
      category,
      estimatedCost,
      estimatedHours,
      dueDate,
    } = body

    // Validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'title is required' }, { status: 400 })
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ error: 'description is required' }, { status: 400 })
    }
    if (!priority || !Object.values(MaintenancePriority).includes(priority as MaintenancePriority)) {
      return NextResponse.json(
        { error: `priority must be one of: ${Object.values(MaintenancePriority).join(', ')}` },
        { status: 400 }
      )
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return NextResponse.json({ error: 'category is required' }, { status: 400 })
    }

    // The recommendation's organizationId comes from the field's org, not blindly from the session
    const recommendation = await prisma.maintenanceRecommendation.create({
      data: {
        fieldId,
        organizationId: field.organizationId,
        title: title.trim(),
        description: description.trim(),
        priority: priority as MaintenancePriority,
        category: category.trim(),
        status: MaintenanceStatus.OPEN,
        estimatedCost: estimatedCost !== undefined ? Number(estimatedCost) : undefined,
        estimatedHours: estimatedHours !== undefined ? Number(estimatedHours) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    })

    return NextResponse.json({ recommendation }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/fields/[id]/maintenance]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
