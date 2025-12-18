import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FieldsListClient } from './fields-list-client'
import { Plus } from 'lucide-react'

interface FieldsPageProps {
  params: Promise<{ orgSlug: string }>
  searchParams: Promise<{ type?: string; status?: string; search?: string }>
}

export default async function FieldsPage({ params, searchParams }: FieldsPageProps) {
  const { orgSlug } = await params
  const { type, status, search } = await searchParams
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  // Fetch organization
  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    select: { id: true, name: true }
  })

  if (!organization) {
    redirect('/auth/unauthorized')
  }

  // Build where clause for filtering
  const whereClause: any = {
    organizationId: organization.id
  }

  if (type) {
    whereClause.type = type
  }

  if (status) {
    whereClause.status = status
  }

  if (search) {
    whereClause.name = {
      contains: search,
    }
  }

  // Fetch fields with related data
  const fields = await prisma.field.findMany({
    where: whereClause,
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

  // Transform fields for client component
  const fieldsData = fields.map(field => ({
    id: field.id,
    name: field.name,
    type: field.type,
    status: field.status,
    surface: field.surface,
    manufacturer: field.manufacturer,
    installDate: field.installDate?.toISOString() || null,
    lastTestingDate: field.lastTestingDate?.toISOString() || null,
    latestTest: field.testingData[0] ? {
      gmaxAverage: field.testingData[0].gmaxAverage,
      gmaxStatus: field.testingData[0].gmaxStatus,
      shearAverage: field.testingData[0].shearAverage,
      shearStatus: field.testingData[0].shearStatus,
      infillDepthAverage: field.testingData[0].infillDepthAverage,
      infillDepthStatus: field.testingData[0].infillDepthStatus,
      testingDate: field.testingData[0].testingDate.toISOString()
    } : null,
    pendingMaintenanceCount: field.maintenanceRecommendations.length
  }))

  // Get unique types and statuses for filter options
  const allFields = await prisma.field.findMany({
    where: { organizationId: organization.id },
    select: { type: true, status: true },
    distinct: ['type', 'status']
  })

  const fieldTypes = [...new Set(allFields.map(f => f.type))]
  const fieldStatuses = [...new Set(allFields.map(f => f.status))]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fields</h1>
          <p className="text-gray-500">Manage all your synthetic turf fields</p>
        </div>
        <Link
          href={`/app/${orgSlug}/fields/new`}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Field
        </Link>
      </div>

      {/* Fields List */}
      <FieldsListClient
        orgSlug={orgSlug}
        fields={fieldsData}
        fieldTypes={fieldTypes}
        fieldStatuses={fieldStatuses}
        currentFilters={{ type, status, search }}
      />
    </div>
  )
}
