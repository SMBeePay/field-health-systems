'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle, Clock, XCircle, MapPin, Calendar, AlertTriangle, Wrench } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Field {
  id: string
  name: string
  type: string
  status: string
  lastTestingDate: string | null
  latestTest: {
    gmaxAverage: number
    gmaxStatus: string
    shearAverage: number
    shearStatus: string
    infillDepthAverage: number
    infillDepthStatus: string
  } | null
  pendingMaintenanceCount: number
}

interface FieldStats {
  excellent: number
  good: number
  monitor: number
  critical: number
  total: number
}

interface MaintenanceAlert {
  id: string
  title: string
  description: string
  priority: string
  status: string
  category: string
  fieldName: string
  dueDate: string | null
  estimatedCost: number | null
}

interface DashboardClientProps {
  orgSlug: string
  fields: Field[]
  fieldStats: FieldStats
  maintenanceAlerts: MaintenanceAlert[]
}

export function DashboardClient({ orgSlug, fields, fieldStats, maintenanceAlerts }: DashboardClientProps) {
  const router = useRouter()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'EXCELLENT':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'GOOD':
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'MONITOR':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'CRITICAL':
      case 'OUT_OF_SERVICE':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EXCELLENT':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'GOOD':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'MONITOR':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'CRITICAL':
      case 'OUT_OF_SERVICE':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'PASSED':
        return 'text-green-600'
      case 'MONITOR':
        return 'text-yellow-600'
      case 'FAILED':
      case 'CRITICAL':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'text-red-700 bg-red-50 border-red-200'
      case 'HIGH':
        return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'MEDIUM':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const statusItems = [
    { label: 'Excellent', value: fieldStats.excellent, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { label: 'Good', value: fieldStats.good, icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { label: 'Monitor', value: fieldStats.monitor, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { label: 'Critical', value: fieldStats.critical, icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  ]

  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Field Status Overview</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{fieldStats.total}</div>
            <div className="text-sm text-gray-500">Total Fields</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor}`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              </div>
              {fieldStats.total > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-white rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / fieldStats.total) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${item.color.replace('text-', 'bg-')}`}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fields Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Fields</h2>
          <Link
            href={`/app/${orgSlug}/fields`}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -2, scale: 1.02 }}
              onClick={() => router.push(`/app/${orgSlug}/fields/${field.id}`)}
              className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{field.name}</h3>
                    <p className="text-sm text-gray-500">{field.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(field.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(field.status)}`}>
                    {field.status}
                  </span>
                </div>
              </div>

              {/* Status Metrics */}
              {field.latestTest && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getTestStatusColor(field.latestTest.gmaxStatus)}`}>
                      {field.latestTest.gmaxAverage.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">GMAX</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getTestStatusColor(field.latestTest.shearStatus)}`}>
                      {field.latestTest.shearAverage.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Shear</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getTestStatusColor(field.latestTest.infillDepthStatus)}`}>
                      {field.latestTest.infillDepthAverage.toFixed(1)}mm
                    </div>
                    <div className="text-xs text-gray-500">Infill</div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Last tested: {formatDate(field.lastTestingDate)}
                  </span>
                </div>
                {field.pendingMaintenanceCount > 0 && (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-medium">{field.pendingMaintenanceCount}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {fields.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No fields added yet</p>
              <Link
                href={`/app/${orgSlug}/fields/new`}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Add your first field
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Alerts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Maintenance Alerts</h2>
          <Link
            href={`/app/${orgSlug}/maintenance`}
            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            {maintenanceAlerts.length > 0 && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                {maintenanceAlerts.length}
              </span>
            )}
          </Link>
        </div>

        {maintenanceAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600">No critical maintenance alerts at this time.</p>
            <p className="text-sm text-gray-500 mt-1">All fields are performing well!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {maintenanceAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(alert.priority)}`}>
                        {alert.priority === 'CRITICAL' && <AlertTriangle className="w-3 h-3" />}
                        <span>{alert.priority}</span>
                      </span>
                      <span className="text-xs text-gray-500">{alert.category}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">{alert.fieldName}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      {alert.estimatedCost && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">Cost:</span>
                          <span className="text-sm font-medium">{formatCurrency(alert.estimatedCost)}</span>
                        </div>
                      )}
                      {alert.dueDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">Due: {formatDate(alert.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
