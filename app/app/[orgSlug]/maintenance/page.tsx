import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Wrench, Plus, AlertTriangle, Clock, CheckCircle } from 'lucide-react'

interface MaintenancePageProps {
  params: Promise<{ orgSlug: string }>
}

export default async function MaintenancePage({ params }: MaintenancePageProps) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    select: { id: true, name: true }
  })

  if (!organization) {
    redirect('/auth/unauthorized')
  }

  const maintenanceItems = await prisma.maintenanceRecommendation.findMany({
    where: { organizationId: organization.id },
    include: {
      field: { select: { name: true } }
    },
    orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }]
  })

  const stats = {
    open: maintenanceItems.filter(m => m.status === 'OPEN').length,
    inProgress: maintenanceItems.filter(m => m.status === 'IN_PROGRESS').length,
    completed: maintenanceItems.filter(m => m.status === 'COMPLETED').length,
    critical: maintenanceItems.filter(m => m.priority === 'CRITICAL' && m.status !== 'COMPLETED').length
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'text-red-700 bg-red-50 border-red-200'
      case 'HIGH': return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'MEDIUM': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-700 bg-green-50 border-green-200'
      case 'IN_PROGRESS': return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'OPEN': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-500">Track and manage field maintenance tasks</p>
        </div>
        <Link
          href={`/app/${orgSlug}/maintenance/new`}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-700 font-medium">Open</span>
          </div>
          <div className="text-2xl font-bold text-yellow-700 mt-2">{stats.open}</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">In Progress</span>
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-2">{stats.inProgress}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Completed</span>
          </div>
          <div className="text-2xl font-bold text-green-700 mt-2">{stats.completed}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700 font-medium">Critical</span>
          </div>
          <div className="text-2xl font-bold text-red-700 mt-2">{stats.critical}</div>
        </div>
      </div>

      {/* Maintenance Items */}
      {maintenanceItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance tasks</h3>
          <p className="text-gray-500">All fields are up to date!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {maintenanceItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.field.name}</p>
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
