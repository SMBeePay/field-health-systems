'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Filter,
  ChevronDown,
  User,
  TestTube
} from 'lucide-react'

interface TestingRecord {
  id: string
  fieldId: string
  fieldName: string
  fieldType: string
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
}

interface Field {
  id: string
  name: string
}

interface TestingListClientProps {
  orgSlug: string
  testingRecords: TestingRecord[]
  fields: Field[]
  currentFilters: { fieldId?: string; status?: string; from?: string; to?: string }
}

export function TestingListClient({
  orgSlug,
  testingRecords,
  fields,
  currentFilters
}: TestingListClientProps) {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [fieldFilter, setFieldFilter] = useState(currentFilters.fieldId || '')
  const [statusFilter, setStatusFilter] = useState(currentFilters.status || '')
  const [dateFrom, setDateFrom] = useState(currentFilters.from || '')
  const [dateTo, setDateTo] = useState(currentFilters.to || '')

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (fieldFilter) params.set('fieldId', fieldFilter)
    if (statusFilter) params.set('status', statusFilter)
    if (dateFrom) params.set('from', dateFrom)
    if (dateTo) params.set('to', dateTo)

    router.push(`/app/${orgSlug}/testing?${params.toString()}`)
  }

  const clearFilters = () => {
    setFieldFilter('')
    setStatusFilter('')
    setDateFrom('')
    setDateTo('')
    router.push(`/app/${orgSlug}/testing`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASSED':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'MONITOR':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'FAILED':
      case 'CRITICAL':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASSED':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'MONITOR':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'FAILED':
      case 'CRITICAL':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const statuses = ['PASSED', 'MONITOR', 'FAILED', 'CRITICAL']

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                <select
                  value={fieldFilter}
                  onChange={(e) => setFieldFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Fields</option>
                  {fields.map(field => (
                    <option key={field.id} value={field.id}>{field.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Showing {testingRecords.length} test{testingRecords.length !== 1 ? 's' : ''}
      </div>

      {/* Testing Records List */}
      {testingRecords.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <TestTube className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testing records found</h3>
          <p className="text-gray-500 mb-4">
            {currentFilters.fieldId || currentFilters.status || currentFilters.from || currentFilters.to
              ? 'Try adjusting your filters'
              : 'Get started by recording your first test'}
          </p>
          <Link
            href={`/app/${orgSlug}/testing/new`}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Record New Test
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {testingRecords.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/app/${orgSlug}/testing/${test.id}`}>
                <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(test.overallStatus)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(test.overallStatus)}`}>
                          {test.overallStatus}
                        </span>
                        <span className="text-sm text-gray-500">{test.fieldType.replace('_', ' ')}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{test.fieldName}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(test.testingDate)}
                        </span>
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {test.testingTechnician}
                        </span>
                        {test.temperature && (
                          <span>{test.temperature}°F</span>
                        )}
                      </div>
                    </div>

                    {/* Test Metrics */}
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${
                          test.gmaxStatus === 'PASSED' ? 'text-green-600' :
                          test.gmaxStatus === 'MONITOR' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {test.gmaxAverage.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">GMAX</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xl font-bold ${
                          test.shearStatus === 'PASSED' ? 'text-green-600' :
                          test.shearStatus === 'MONITOR' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {test.shearAverage.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Shear</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xl font-bold ${
                          test.infillDepthStatus === 'PASSED' ? 'text-green-600' :
                          test.infillDepthStatus === 'MONITOR' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {test.infillDepthAverage.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Infill (mm)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
