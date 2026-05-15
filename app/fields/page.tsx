'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { FieldStatusCard } from '@/components/ui/field-status-card'
import { designTokens } from '@/lib/design-tokens'
import {
  Search,
  MapPin,
  Calendar,
  Plus,
  Download,
  Eye,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function normaliseField(raw: Record<string, unknown>) {
  return {
    ...raw,
    status: String(raw.status ?? '').toLowerCase(),
    type: String(raw.type ?? '').toLowerCase(),
    installDate: raw.installDate ? new Date(raw.installDate as string) : undefined,
    lastTestingDate: raw.lastTestingDate ? new Date(raw.lastTestingDate as string) : undefined,
    createdAt: raw.createdAt ? new Date(raw.createdAt as string) : new Date(),
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt as string) : new Date(),
  }
}

function SkeletonRow() {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg" />
          <div>
            <div className="h-4 bg-slate-100 rounded w-40 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-28" />
          </div>
        </div>
        <div className="h-6 bg-slate-100 rounded-full w-20" />
      </div>
    </div>
  )
}

export default function FieldsPage() {
  const [fields, setFields] = useState<ReturnType<typeof normaliseField>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    async function loadFields() {
      try {
        const res = await fetch('/api/fields')
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? `HTTP ${res.status}`)
        }
        const { fields: raw } = await res.json()
        if (!cancelled) {
          setFields((raw ?? []).map(normaliseField))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load fields')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadFields()
    return () => { cancelled = true }
  }, [])

  const filteredFields = fields.filter((field) => {
    const matchesSearch = (field.name as string)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      filterStatus === 'all' || field.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statusCounts = fields.reduce(
    (acc, field) => {
      const s = field.status as string
      if (acc[s] !== undefined) acc[s]++
      return acc
    },
    { excellent: 0, good: 0, monitor: 0, critical: 0 } as Record<string, number>
  )

  return (
    <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={designTokens.typography.heading.h1}>Field Management</h1>
                  <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                    Manage and monitor all your artificial sports fields
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <Link
                    href="/fields/new"
                    className={designTokens.components.button.primary + ' flex items-center space-x-2'}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Field</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Status Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                { status: 'excellent', count: statusCounts.excellent, label: 'Excellent', color: 'green' },
                { status: 'good', count: statusCounts.good, label: 'Good', color: 'teal' },
                { status: 'monitor', count: statusCounts.monitor, label: 'Monitor', color: 'yellow' },
                { status: 'critical', count: statusCounts.critical, label: 'Critical', color: 'red' },
              ].map((item, index) => (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className={`${designTokens.components.card} p-6 text-center cursor-pointer transition-all duration-200 hover:shadow-md ${
                    filterStatus === item.status ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() =>
                    setFilterStatus(filterStatus === item.status ? 'all' : item.status)
                  }
                >
                  <div
                    className={`text-3xl font-bold ${
                      item.color === 'green'
                        ? 'text-green-600'
                        : item.color === 'teal'
                        ? 'text-teal-600'
                        : item.color === 'yellow'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {loading ? (
                      <span className="inline-block w-8 h-7 bg-slate-100 rounded animate-pulse" />
                    ) : (
                      item.count
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className={`${designTokens.components.card} p-6 mb-6`}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search fields by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="all">All Status</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="monitor">Monitor</option>
                    <option value="critical">Critical</option>
                  </select>
                  <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'text-white' : 'bg-white text-gray-600'}`}
                      style={viewMode === 'grid' ? { background: '#4CAF50' } : undefined}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'text-white' : 'bg-white text-gray-600'}`}
                      style={viewMode === 'list' ? { background: '#4CAF50' } : undefined}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Error state */}
            {!loading && error && (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center mb-6">
                <p className="text-red-600 font-medium mb-1">Unable to load fields</p>
                <p className="text-sm text-slate-500">{error}</p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} />)}
              </div>
            )}

            {/* Fields List */}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFields.map((field, index) => (
                      <motion.div
                        key={field.id as string}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      >
                        <FieldStatusCard
                          field={field as Parameters<typeof FieldStatusCard>[0]['field']}
                          onClick={() => router.push(`/fields/${field.id}`)}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className={`${designTokens.components.card} overflow-hidden`}>
                    <div className="px-6 py-4 border-b border-gray-200" style={{ background: '#F7FAFC' }}>
                      <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                        <div className="col-span-3">Field Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-3">Last Test</div>
                        <div className="col-span-1">Actions</div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {filteredFields.map((field, index) => (
                        <motion.div
                          key={field.id as string}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                          className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                          onClick={() => router.push(`/fields/${field.id}`)}
                        >
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3">
                              <div className="font-medium text-gray-900">{field.name as string}</div>
                            </div>
                            <div className="col-span-2 flex items-center">
                              <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600 capitalize">
                                {(field.type as string).replace('_', ' ')}
                              </span>
                            </div>
                            <div className="col-span-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                  field.status === 'excellent'
                                    ? designTokens.colors.status.excellent.bg +
                                      ' ' +
                                      designTokens.colors.status.excellent.text
                                    : field.status === 'good'
                                    ? designTokens.colors.status.good.bg +
                                      ' ' +
                                      designTokens.colors.status.good.text
                                    : field.status === 'monitor'
                                    ? designTokens.colors.status.monitor.bg +
                                      ' ' +
                                      designTokens.colors.status.monitor.text
                                    : designTokens.colors.status.critical.bg +
                                      ' ' +
                                      designTokens.colors.status.critical.text
                                }`}
                              >
                                {field.status as string}
                              </span>
                            </div>
                            <div className="col-span-3 flex items-center">
                              <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                {field.lastTestingDate
                                  ? (field.lastTestingDate as Date).toLocaleDateString()
                                  : 'Never'}
                              </span>
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/fields/${field.id}`)
                                }}
                                className="text-teal-600 hover:text-teal-700"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty states */}
                {filteredFields.length === 0 && fields.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${designTokens.components.card} p-12 text-center`}
                  >
                    <div className="text-gray-400 mb-4">
                      <Search className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No fields found</h3>
                    <p className="text-gray-600">
                      {searchQuery
                        ? `No fields match your search for "${searchQuery}"`
                        : `No fields with ${filterStatus} status`}
                    </p>
                  </motion.div>
                )}

                {fields.length === 0 && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${designTokens.components.card} p-12 text-center`}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: '#F7FAFC' }}
                    >
                      <Plus className="w-8 h-8" style={{ color: '#1F8A8A' }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#12324A' }}>
                      No fields yet
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      Add your first field to start monitoring field health data.
                    </p>
                    <Link
                      href="/fields/new"
                      className="inline-flex items-center space-x-2 text-white rounded-lg px-6 py-2.5 font-semibold text-sm"
                      style={{ background: '#4CAF50' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Your First Field</span>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
