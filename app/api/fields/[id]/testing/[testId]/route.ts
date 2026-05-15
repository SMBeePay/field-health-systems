import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

// GET /api/fields/[id]/testing/[testId] — get a single testing record
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; testId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: fieldId, testId } = await params
    const organizationId = session.user.organizationId

    // Verify the parent field exists and belongs to the user's org
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

    const testingData = await prisma.testingData.findUnique({
      where: { id: testId },
      include: {
        conductedByUser: {
          select: { id: true, name: true, email: true },
        },
        field: {
          select: { id: true, name: true, type: true, organizationId: true },
        },
      },
    })

    if (!testingData || testingData.fieldId !== fieldId) {
      return NextResponse.json({ error: 'Testing record not found' }, { status: 404 })
    }

    return NextResponse.json({ testingData })
  } catch (error) {
    console.error('[GET /api/fields/[id]/testing/[testId]]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
