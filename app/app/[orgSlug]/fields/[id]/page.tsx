import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FieldDetailClient } from './field-detail-client'
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react'

interface FieldDetailPageProps {
  params: Promise<{ orgSlug: string; id: string }>
}

export default async function FieldDetailPage({ params }: FieldDetailPageProps) {
  const { orgSlug, id } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  // Fetch field with all related data
  const field = await prisma.field.findUnique({
    where: { id },
    include: {
      organization: {
        select: { id: true, name: true, slug: true }
      },
      testingData: {
        orderBy: { testingDate: 'desc' },
        take: 10
      },
      maintenanceRecommendations: {
        orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        include: {
          field: { select: { name: true } }
        }
      },
      complianceReports: {
        orderBy: { issuedDate: 'desc' },
        take: 5
      }
    }
  })

  if (!field) {
    notFound()
  }

  // Verify user has access to this organization
  if (
    session.user.role !== 'SUPER_ADMIN' &&
    field.organization.slug !== session.user.organizationSlug
  ) {
    redirect('/auth/unauthorized')
  }

  // Transform data for client component
  const fieldData = {
    id: field.id,
    name: field.name,
    type: field.type,
    status: field.status,
    surface: field.surface,
    infillType: field.infillType,
    manufacturer: field.manufacturer,
    installDate: field.installDate?.toISOString() || null,
    lastTestingDate: field.lastTestingDate?.toISOString() || null,
    totalArea: field.totalArea,
    length: field.length,
    width: field.width,
    latitude: field.latitude,
    longitude: field.longitude,
    organizationName: field.organization.name
  }

  const testingHistory = field.testingData.map(test => ({
    id: test.id,
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
    temperature: test.temperature,
    notes: test.notes
  }))

  const maintenanceItems = field.maintenanceRecommendations.map(rec => ({
    id: rec.id,
    title: rec.title,
    description: rec.description,
    priority: rec.priority,
    status: rec.status,
    category: rec.category,
    estimatedCost: rec.estimatedCost,
    dueDate: rec.dueDate?.toISOString() || null,
    completedDate: rec.completedDate?.toISOString() || null,
    notes: rec.notes
  }))

  const complianceReports = field.complianceReports.map(report => ({
    id: report.id,
    reportType: report.reportType,
    status: report.status,
    issuedDate: report.issuedDate.toISOString(),
    expirationDate: report.expirationDate?.toISOString() || null,
    summary: report.summary
  }))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/app/${orgSlug}/fields`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{field.name}</h1>
            <p className="text-gray-500">{field.type.replace('_', ' ')} Field</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href={`/app/${orgSlug}/testing/new?fieldId=${field.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Test
          </Link>
          <Link
            href={`/app/${orgSlug}/fields/${field.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <Edit className="w-5 h-5 mr-2 text-gray-500" />
            Edit
          </Link>
        </div>
      </div>

      {/* Field Detail Content */}
      <FieldDetailClient
        orgSlug={orgSlug}
        field={fieldData}
        testingHistory={testingHistory}
        maintenanceItems={maintenanceItems}
        complianceReports={complianceReports}
      />
    </div>
  )
}
