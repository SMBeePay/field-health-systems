'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { FieldStatusCard } from '@/components/ui/field-status-card'
import { mockFields } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'
import { 
  Search, 
  MapPin,
  Calendar,
  Plus,
  Download,
  Eye
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function FieldsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const router = useRouter()

  // Filter fields based on search and status
  const filteredFields = mockFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || field.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statusCounts = mockFields.reduce(
    (acc, field) => {
      acc[field.status]++
      return acc
    },
    { excellent: 0, good: 0, monitor: 0, critical: 0 } as Record<string, number>
  )

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                    <Plus className="w-4 h-4" />
                    <span>Add Field</span>
                  </button>
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
                { status: 'good', count: statusCounts.good, label: 'Good', color: 'blue' },
                { status: 'monitor', count: statusCounts.monitor, label: 'Monitor', color: 'yellow' },
                { status: 'critical', count: statusCounts.critical, label: 'Critical', color: 'red' }
              ].map((item, index) => (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className={`${designTokens.components.card} p-6 text-center cursor-pointer transition-all duration-200 hover:shadow-md ${
                    filterStatus === item.status ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => setFilterStatus(filterStatus === item.status ? 'all' : item.status)}
                >
                  <div className={`text-3xl font-bold ${
                    item.color === 'green' ? 'text-green-600' :
                    item.color === 'blue' ? 'text-blue-600' :
                    item.color === 'yellow' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {item.count}
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">All Status</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="monitor">Monitor</option>
                    <option value="critical">Critical</option>
                  </select>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fields List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    >
                      <FieldStatusCard 
                        field={field}
                        onClick={() => router.push(`/fields/${field.id}`)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`${designTokens.components.card} overflow-hidden`}>
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                      <div className="col-span-3">Field Name</div>
                      <div className="col-span-2">Location</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Last Test</div>
                      <div className="col-span-2">GMAX</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {filteredFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => router.push(`/fields/${field.id}`)}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3">
                            <div className="font-medium text-gray-900">{field.name}</div>
                            <div className="text-sm text-gray-500">{field.type}</div>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{field.type}</span>
                          </div>
                          <div className="col-span-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              field.status === 'excellent' ? designTokens.colors.status.excellent.bg + ' ' + designTokens.colors.status.excellent.text :
                              field.status === 'good' ? designTokens.colors.status.good.bg + ' ' + designTokens.colors.status.good.text :
                              field.status === 'monitor' ? designTokens.colors.status.monitor.bg + ' ' + designTokens.colors.status.monitor.text :
                              designTokens.colors.status.critical.bg + ' ' + designTokens.colors.status.critical.text
                            }`}>
                              {field.status.charAt(0).toUpperCase() + field.status.slice(1)}
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{field.lastTestingDate ? new Date(field.lastTestingDate).toLocaleDateString() : 'Never'}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-sm font-medium text-gray-900">N/A</span>
                          </div>
                          <div className="col-span-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/fields/${field.id}`)
                              }}
                              className="text-green-600 hover:text-green-700"
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
            </motion.div>

            {filteredFields.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className={`${designTokens.components.card} p-12 text-center`}
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No fields found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 
                    `No fields match your search for "${searchQuery}"` : 
                    `No fields with ${filterStatus} status`
                  }
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}