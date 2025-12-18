'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Calendar,
  Ruler,
  Factory,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Wrench
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface FieldData {
  id: string
  name: string
  type: string
  status: string
  surface: string | null
  infillType: string | null
  manufacturer: string | null
  installDate: string | null
  lastTestingDate: string | null
  totalArea: number | null
  length: number | null
  width: number | null
  latitude: number | null
  longitude: number | null
  organizationName: string
}

interface TestingRecord {
  id: string
  testingDate: string
  testingTechnician: string
  gmaxAverage: number
  gmaxStatus: string
  shearAverage: number
  shearStatus: string
  infillDepthAverage: number
  infillDepthStatus: string
  overallStatus: string
  weatherConditions: string | null
  temperature: number | null
  notes: string | null
}

interface MaintenanceItem {
  id: string
  title: string
  description: string
  priority: string
  status: string
  category: string
  estimatedCost: number | null
  dueDate: string | null
  completedDate: string | null
  notes: string | null
}

interface ComplianceReport {
  id: string
  reportType: string
  status: string
  issuedDate: string
  expirationDate: string | null
  summary: string | null
}

interface FieldDetailClientProps {
  orgSlug: string
  field: FieldData
  testingHistory: TestingRecord[]
  maintenanceItems: MaintenanceItem[]
  complianceReports: ComplianceReport[]
}

export function FieldDetailClient({
  orgSlug,
  field,
  testingHistory,
  maintenanceItems,
  complianceReports
}: FieldDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'testing' | 'maintenance' | 'compliance'>('overview')
  const [expandedTest, setExpandedTest] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'EXCELLENT':
      case 'PASSED':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'GOOD':
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'MONITOR':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'CRITICAL':
      case 'FAILED':
      case 'OUT_OF_SERVICE':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EXCELLENT':
      case 'PASSED':
      case 'COMPLIANT':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'GOOD':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'MONITOR':
      case 'PENDING_REVIEW':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'CRITICAL':
      case 'FAILED':
      case 'OUT_OF_SERVICE':
      case 'NON_COMPLIANT':
      case 'EXPIRED':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
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

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'IN_PROGRESS':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'OPEN':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'CANCELLED':
      case 'ON_HOLD':
        return 'text-gray-700 bg-gray-50 border-gray-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'testing', label: 'Testing History', count: testingHistory.length },
    { id: 'maintenance', label: 'Maintenance', count: maintenanceItems.filter(m => m.status === 'OPEN').length },
    { id: 'compliance', label: 'Compliance', count: complianceReports.length }
  ]

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`rounded-lg p-4 border ${getStatusColor(field.status)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon(field.status)}
            <div>
              <span className="font-semibold">Field Status: {field.status}</span>
              <p className="text-sm opacity-75">
                Last tested: {formatDate(field.lastTestingDate)}
              </p>
            </div>
          </div>
          {testingHistory[0] && (
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{testingHistory[0].gmaxAverage.toFixed(1)}</div>
                <div className="text-xs">GMAX</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{testingHistory[0].shearAverage.toFixed(1)}</div>
                <div className="text-xs">Shear</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{testingHistory[0].infillDepthAverage.toFixed(1)}</div>
                <div className="text-xs">Infill (mm)</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Field Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Type
                </span>
                <span className="font-medium">{field.type.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Surface</span>
                <span className="font-medium">{field.surface || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Infill Type</span>
                <span className="font-medium">{field.infillType || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500 flex items-center">
                  <Factory className="w-4 h-4 mr-2" /> Manufacturer
                </span>
                <span className="font-medium">{field.manufacturer || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" /> Install Date
                </span>
                <span className="font-medium">{formatDate(field.installDate)}</span>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500 flex items-center">
                  <Ruler className="w-4 h-4 mr-2" /> Length
                </span>
                <span className="font-medium">{field.length ? `${field.length} ft` : 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Width</span>
                <span className="font-medium">{field.width ? `${field.width} ft` : 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Total Area</span>
                <span className="font-medium">{field.totalArea ? `${field.totalArea.toLocaleString()} sq ft` : 'N/A'}</span>
              </div>
              {field.latitude && field.longitude && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-500">Coordinates</span>
                  <span className="font-medium text-sm">
                    {field.latitude.toFixed(6)}, {field.longitude.toFixed(6)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'testing' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {testingHistory.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No testing records</h3>
              <p className="text-gray-500 mb-4">No tests have been recorded for this field yet.</p>
              <Link
                href={`/app/${orgSlug}/testing/new?fieldId=${field.id}`}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Record First Test
              </Link>
            </div>
          ) : (
            testingHistory.map((test, index) => (
              <div key={test.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <button
                  onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(test.overallStatus)}
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{formatDate(test.testingDate)}</div>
                      <div className="text-sm text-gray-500">By {test.testingTechnician}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex space-x-4 text-sm">
                      <span>GMAX: <strong>{test.gmaxAverage.toFixed(1)}</strong></span>
                      <span>Shear: <strong>{test.shearAverage.toFixed(1)}</strong></span>
                      <span>Infill: <strong>{test.infillDepthAverage.toFixed(1)}mm</strong></span>
                    </div>
                    {expandedTest === test.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                {expandedTest === test.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="border-t border-gray-200 px-6 py-4 bg-gray-50"
                  >
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className={`p-3 rounded-lg border ${getStatusColor(test.gmaxStatus)}`}>
                        <div className="text-xs font-medium">GMAX</div>
                        <div className="text-xl font-bold">{test.gmaxAverage.toFixed(1)}</div>
                        <div className="text-xs">{test.gmaxStatus}</div>
                      </div>
                      <div className={`p-3 rounded-lg border ${getStatusColor(test.shearStatus)}`}>
                        <div className="text-xs font-medium">Shear</div>
                        <div className="text-xl font-bold">{test.shearAverage.toFixed(1)}</div>
                        <div className="text-xs">{test.shearStatus}</div>
                      </div>
                      <div className={`p-3 rounded-lg border ${getStatusColor(test.infillDepthStatus)}`}>
                        <div className="text-xs font-medium">Infill Depth</div>
                        <div className="text-xl font-bold">{test.infillDepthAverage.toFixed(1)}mm</div>
                        <div className="text-xs">{test.infillDepthStatus}</div>
                      </div>
                    </div>
                    {(test.weatherConditions || test.temperature || test.notes) && (
                      <div className="text-sm text-gray-600">
                        {test.weatherConditions && <p>Weather: {test.weatherConditions}</p>}
                        {test.temperature && <p>Temperature: {test.temperature}°F</p>}
                        {test.notes && <p className="mt-2">Notes: {test.notes}</p>}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            ))
          )}
        </motion.div>
      )}

      {activeTab === 'maintenance' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {maintenanceItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance items</h3>
              <p className="text-gray-500">No maintenance recommendations for this field.</p>
            </div>
          ) : (
            maintenanceItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getMaintenanceStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      {item.estimatedCost && (
                        <span className="text-gray-500">
                          Est. Cost: <span className="font-medium">{formatCurrency(item.estimatedCost)}</span>
                        </span>
                      )}
                      {item.dueDate && (
                        <span className="text-gray-500">
                          Due: <span className="font-medium">{formatDate(item.dueDate)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}

      {activeTab === 'compliance' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {complianceReports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No compliance reports</h3>
              <p className="text-gray-500">No compliance reports for this field.</p>
            </div>
          ) : (
            complianceReports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900">{report.reportType}</h4>
                    {report.summary && (
                      <p className="text-sm text-gray-600 mt-1">{report.summary}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <span>Issued: {formatDate(report.issuedDate)}</span>
                      {report.expirationDate && (
                        <span>Expires: {formatDate(report.expirationDate)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}
    </div>
  )
}
