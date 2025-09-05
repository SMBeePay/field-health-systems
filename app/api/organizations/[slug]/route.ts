import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await context.params

    // Find the organization
    const organization = await prisma.organization.findUnique({
      where: { slug },
      include: {
        fields: {
          select: {
            id: true,
            name: true,
            type: true,
            status: true,
            lastTestingDate: true
          },
          orderBy: {
            name: 'asc'
          }
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          },
          orderBy: {
            name: 'asc'
          }
        }
      }
    })

    if (!organization) {
      return NextResponse.json(
        { message: 'Organization not found' },
        { status: 404 }
      )
    }

    // Check permissions
    // Super admin can access any organization
    // Users can only access their own organization
    if (
      session.user.role !== 'SUPER_ADMIN' &&
      session.user.organizationSlug !== slug
    ) {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    return NextResponse.json(organization)

  } catch (error) {
    console.error('Organization fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}