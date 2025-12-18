'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown
} from 'lucide-react'

interface Field {
  id: string
  name: string
  type: string
  status: string
  surface: string | null
  manufacturer: string | null
  installDate: string | null
  lastTestingDate: string | null
  latestTest: {
    gmaxAverage: number
    gmaxStatus: string
    shearAverage: number
    shearStatus: string
    infillDepthAverage: number
    infillDepthStatus: string
    testingDate: string
  } | null
  pendingMaintenanceCount: number
}

interface FieldsListClientProps {
  orgSlug: string
  fields: Field[]
  fieldTypes: string[]
  fieldStatuses: string[]
  currentFilters: { type?: string; status?: string; search?: string }
}

export function FieldsListClient({
  orgSlug,
  fields,
  fieldTypes,
  fieldStatuses,
  currentFilters
}: FieldsListClientProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState(currentFilters.search || '')
  const [typeFilter, setTypeFilter] = useState(currentFilters.type || '')
  const [statusFilter, setStatusFilter] = useState(currentFilters.status || '')
  const [showFilters, setShowFilters] = useState(false)

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (typeFilter) params.set('type', typeFilter)
    if (statusFilter) params.set('status', statusFilter)

    router.push(`/app/${orgSlug}/fields?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setTypeFilter('')
    setStatusFilter('')
    router.push(`/app/${orgSlug}/fields`)
  }

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatFieldType = (type: string) => {
    return type.replace('_', ' ')
  }

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5 mr-2 text-gray-500" />
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-green-50 text-green-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-green-50 text-green-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Types</option>
                  {fieldTypes.map(type => (
                    <option key={type} value={type}>{formatFieldType(type)}</option>
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
                  {fieldStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={applyFilters}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Showing {fields.length} field{fields.length !== 1 ? 's' : ''}
      </div>

      {/* Fields Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/app/${orgSlug}/fields/${field.id}`}>
                <div className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{field.name}</h3>
                        <p className="text-sm text-gray-500">{formatFieldType(field.type)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(field.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(field.status)}`}>
                        {field.status}
                      </span>
                    </div>
                  </div>

                  {/* Test Metrics */}
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
                        {formatDate(field.lastTestingDate)}
                      </span>
                    </div>
                    {field.pendingMaintenanceCount > 0 && (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-medium">{field.pendingMaintenanceCount} alerts</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Test</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GMAX</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alerts</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fields.map((field) => (
                <tr
                  key={field.id}
                  onClick={() => router.push(`/app/${orgSlug}/fields/${field.id}`)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{field.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFieldType(field.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(field.status)}`}>
                      {field.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(field.lastTestingDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {field.latestTest ? (
                      <span className={`font-medium ${getTestStatusColor(field.latestTest.gmaxStatus)}`}>
                        {field.latestTest.gmaxAverage.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {field.pendingMaintenanceCount > 0 ? (
                      <span className="flex items-center text-orange-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {field.pendingMaintenanceCount}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No fields found</h3>
          <p className="text-gray-500 mb-4">
            {currentFilters.search || currentFilters.type || currentFilters.status
              ? 'Try adjusting your filters'
              : 'Get started by adding your first field'}
          </p>
          <Link
            href={`/app/${orgSlug}/fields/new`}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Add New Field
          </Link>
        </div>
      )}
    </div>
  )
}
