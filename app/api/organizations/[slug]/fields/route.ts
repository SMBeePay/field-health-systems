import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { slug } = await params

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const organization = await prisma.organization.findUnique({
      where: { slug }
    })

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    // Check access
    if (session.user.role !== 'SUPER_ADMIN' && session.user.organizationSlug !== slug) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const fields = await prisma.field.findMany({
      where: { organizationId: organization.id },
      include: {
        testingData: {
          take: 1,
          orderBy: { testingDate: 'desc' }
        },
        maintenanceRecommendations: {
          where: { status: 'OPEN' }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(fields)
  } catch (error) {
    console.error('Error fetching fields:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { slug } = await params

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const organization = await prisma.organization.findUnique({
      where: { slug }
    })

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    // Check access - only ORG_ADMIN, SUPER_ADMIN can create fields
    if (
      session.user.role !== 'SUPER_ADMIN' &&
      session.user.role !== 'ORG_ADMIN' &&
      session.user.organizationSlug !== slug
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    const field = await prisma.field.create({
      data: {
        name: body.name,
        type: body.type,
        status: 'GOOD',
        organizationId: organization.id,
        surface: body.surface || null,
        infillType: body.infillType || null,
        manufacturer: body.manufacturer || null,
        installDate: body.installDate ? new Date(body.installDate) : null,
        length: body.length || null,
        width: body.width || null,
        totalArea: body.totalArea || null,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        createdBy: session.user.id
      }
    })

    return NextResponse.json(field, { status: 201 })
  } catch (error) {
    console.error('Error creating field:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
