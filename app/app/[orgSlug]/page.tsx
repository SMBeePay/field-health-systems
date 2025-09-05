'use client'

import { useSession, signOut } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FieldStatusCard } from '@/components/ui/field-status-card'
import { StatusOverview } from '@/components/ui/status-overview'
import { MaintenanceAlerts } from '@/components/ui/maintenance-alerts'
import { Building2, Settings, Users, LogOut } from 'lucide-react'

interface OrganizationData {
  id: string
  name: string
  slug: string
  status: string
  fields: Array<{
    id: string
    name: string
    type: string
    status: string
    lastTestingDate: string | null
  }>
  users: Array<{
    id: string
    name: string | null
    email: string
    role: string
  }>
}

export default function OrganizationDashboard() {
  const { data: session, status } = useSession()
  const params = useParams()
  const orgSlug = params.orgSlug as string
  const [orgData, setOrgData] = useState<OrganizationData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const response = await fetch(`/api/organizations/${orgSlug}`)
        if (response.ok) {
          const data = await response.json()
          setOrgData(data)
        }
      } catch (error) {
        console.error('Failed to fetch organization data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session && orgSlug) {
      fetchOrgData()
    }
  }, [session, orgSlug])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!session) {
    return null // Middleware will handle redirect
  }

  if (!orgData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Organization Not Found</h1>
          <p className="text-gray-600 mt-2">The requested organization does not exist or you don&apos;t have access.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo-icon.svg" 
                alt="Field Health Systems" 
                className="w-8 h-8"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{orgData.name}</h1>
                <p className="text-sm text-gray-600">Field Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {session.user.name || session.user.email}
              </span>
              {session.user.role === 'SUPER_ADMIN' && (
                <Link
                  href="/admin"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center text-sm text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="mb-8">
          <StatusOverview />
        </div>

        {/* Fields Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Fields</h2>
            <Link
              href={`/app/${orgSlug}/fields/new`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add New Field
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orgData.fields.map((field) => (
              <FieldStatusCard
                key={field.id}
                field={{
                  ...field,
                  id: field.id,
                  name: field.name,
                  type: field.type,
                  status: field.status as 'EXCELLENT' | 'GOOD' | 'MONITOR' | 'CRITICAL' | 'OUT_OF_SERVICE',
                  lastTesting: field.lastTestingDate ? new Date(field.lastTestingDate) : null,
                  nextTesting: field.lastTestingDate 
                    ? new Date(new Date(field.lastTestingDate).getTime() + 90 * 24 * 60 * 60 * 1000)
                    : new Date(),
                  maintenanceAlerts: 0
                }}
                href={`/app/${orgSlug}/fields/${field.id}`}
              />
            ))}
            
            {orgData.fields.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No fields added yet.</p>
                <Link
                  href={`/app/${orgSlug}/fields/new`}
                  className="text-green-600 hover:text-green-700 mt-2 inline-block"
                >
                  Add your first field
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="mb-8">
          <MaintenanceAlerts />
        </div>

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
              <Settings className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
                <p className="text-sm text-gray-600">View testing and compliance reports</p>
              </div>
            </div>
          </Link>

          {(session.user.role === 'SUPER_ADMIN' || session.user.role === 'ORG_ADMIN') && (
            <Link
              href={`/app/${orgSlug}/users`}
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
    </div>
  )
}