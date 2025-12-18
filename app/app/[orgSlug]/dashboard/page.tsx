import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardClient } from './dashboard-client'
import { Building2, FileText, Users, Plus } from 'lucide-react'

interface DashboardPageProps {
  params: Promise<{ orgSlug: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  // Fetch organization with fields and related data
  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    include: {
      fields: {
        include: {
          testingData: {
            take: 1,
            orderBy: { testingDate: 'desc' }
          },
          maintenanceRecommendations: {
            where: { status: 'OPEN' }
          }
        }
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      maintenanceRecommendations: {
        where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
        orderBy: { priority: 'desc' },
        take: 5,
        include: {
          field: {
            select: { name: true }
          }
        }
      }
    }
  })

  if (!organization) {
    redirect('/auth/unauthorized')
  }

  // Calculate field status stats
  const fieldStats = {
    excellent: organization.fields.filter(f => f.status === 'EXCELLENT').length,
    good: organization.fields.filter(f => f.status === 'GOOD').length,
    monitor: organization.fields.filter(f => f.status === 'MONITOR').length,
    critical: organization.fields.filter(f => f.status === 'CRITICAL' || f.status === 'OUT_OF_SERVICE').length,
    total: organization.fields.length
  }

  // Transform fields for client component
  const fields = organization.fields.map(field => ({
    id: field.id,
    name: field.name,
    type: field.type,
    status: field.status,
    lastTestingDate: field.lastTestingDate?.toISOString() || null,
    latestTest: field.testingData[0] ? {
      gmaxAverage: field.testingData[0].gmaxAverage,
      gmaxStatus: field.testingData[0].gmaxStatus,
      shearAverage: field.testingData[0].shearAverage,
      shearStatus: field.testingData[0].shearStatus,
      infillDepthAverage: field.testingData[0].infillDepthAverage,
      infillDepthStatus: field.testingData[0].infillDepthStatus
    } : null,
    pendingMaintenanceCount: field.maintenanceRecommendations.length
  }))

  // Transform maintenance recommendations
  const maintenanceAlerts = organization.maintenanceRecommendations.map(rec => ({
    id: rec.id,
    title: rec.title,
    description: rec.description,
    priority: rec.priority,
    status: rec.status,
    category: rec.category,
    fieldName: rec.field.name,
    dueDate: rec.dueDate?.toISOString() || null,
    estimatedCost: rec.estimatedCost
  }))

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{organization.name}</h1>
          <p className="text-gray-500">Organization Dashboard</p>
        </div>
        <Link
          href={`/app/${orgSlug}/fields/new`}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Field
        </Link>
      </div>

      {/* Dashboard Content */}
      <DashboardClient
        orgSlug={orgSlug}
        fields={fields}
        fieldStats={fieldStats}
        maintenanceAlerts={maintenanceAlerts}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href={`/app/${orgSlug}/fields`}
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <Building2 className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Manage Fields</h3>
              <p className="text-sm text-gray-600">View and edit all fields</p>
            </div>
          </div>
        </Link>

        <Link
          href={`/app/${orgSlug}/reports`}
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
              <p className="text-sm text-gray-600">View testing and compliance reports</p>
            </div>
          </div>
        </Link>

        {(session.user.role === 'SUPER_ADMIN' || session.user.role === 'ORG_ADMIN') && (
          <Link
            href={`/app/${orgSlug}/team`}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <p className="text-sm text-gray-600">Manage organization users</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
