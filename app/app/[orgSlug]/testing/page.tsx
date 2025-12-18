import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TestingListClient } from './testing-list-client'
import { Plus } from 'lucide-react'

interface TestingPageProps {
  params: Promise<{ orgSlug: string }>
  searchParams: Promise<{ fieldId?: string; status?: string; from?: string; to?: string }>
}

export default async function TestingPage({ params, searchParams }: TestingPageProps) {
  const { orgSlug } = await params
  const { fieldId, status, from, to } = await searchParams
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

  // Build where clause
  const whereClause: any = {
    field: {
      organizationId: organization.id
    }
  }

  if (fieldId) {
    whereClause.fieldId = fieldId
  }

  if (status) {
    whereClause.overallStatus = status
  }

  if (from || to) {
    whereClause.testingDate = {}
    if (from) whereClause.testingDate.gte = new Date(from)
    if (to) whereClause.testingDate.lte = new Date(to)
  }

  // Fetch testing data
  const testingData = await prisma.testingData.findMany({
    where: whereClause,
    include: {
      field: {
        select: { id: true, name: true, type: true }
      }
    },
    orderBy: { testingDate: 'desc' }
  })

  // Fetch fields for filter dropdown
  const fields = await prisma.field.findMany({
    where: { organizationId: organization.id },
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  // Transform data
  const testingRecords = testingData.map(test => ({
    id: test.id,
    fieldId: test.fieldId,
    fieldName: test.field.name,
    fieldType: test.field.type,
    testingDate: test.testingDate.toISOString(),
    testingTechnician: test.testingTechnician,
    gmaxAverage: test.gmaxAverage,
    gmaxStatus: test.gmaxStatus,
    shearAverage: test.shearAverage,
    shearStatus: test.shearStatus,
    infillDepthAverage: test.infillDepthAverage,
    infillDepthStatus: test.infillDepthStatus,
    overallStatus: test.overallStatus,
    weatherConditions: test.weatherConditions,
    temperature: test.temperature
  }))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testing Data</h1>
          <p className="text-gray-500">View and manage all field testing records</p>
        </div>
        <Link
          href={`/app/${orgSlug}/testing/new`}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Record New Test
        </Link>
      </div>

      {/* Testing List */}
      <TestingListClient
        orgSlug={orgSlug}
        testingRecords={testingRecords}
        fields={fields}
        currentFilters={{ fieldId, status, from, to }}
      />
    </div>
  )
}
