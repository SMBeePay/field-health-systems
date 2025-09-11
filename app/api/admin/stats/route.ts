import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get dashboard statistics
    const [
      totalUsers,
      totalOrganizations,
      activeFields,
      pendingUsers,
      recentAuditLogs
    ] = await Promise.all([
      prisma.user.count(),
      prisma.organization.count({
        where: {
          status: 'ACTIVE'
        }
      }),
      prisma.field.count(),
      prisma.user.count({
        where: {
          status: 'PENDING'
        }
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      })
    ])

    const recentActivity = recentAuditLogs.map(log => ({
      id: log.id,
      action: log.action,
      resource: log.resource,
      user: log.user?.name || log.user?.email || 'System',
      timestamp: log.createdAt.toISOString()
    }))

    return NextResponse.json({
      totalUsers,
      totalOrganizations,
      activeFields,
      pendingUsers,
      recentActivity
    })

  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}