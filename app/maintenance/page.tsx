'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { mockMaintenanceRecommendations, mockFields } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'
import { 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Filter,
  Plus,
  Download,
  Wrench,
  MapPin,
  ChevronRight,
  CalendarDays
} from 'lucide-react'

export default function MaintenancePage() {
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'scheduled' | 'recommendations' | 'history'>('recommendations')

  const priorityCounts = mockMaintenanceRecommendations.reduce(
    (acc, rec) => {
      acc[rec.priority]++
      return acc
    },
    { high: 0, medium: 0, low: 0 } as Record<string, number>
  )

  const filteredRecommendations = mockMaintenanceRecommendations.filter(rec => {
    const matchesPriority = filterPriority === 'all' || rec.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || rec.status === filterStatus
    return matchesPriority && matchesStatus
  })

  // Mock scheduled maintenance data
  const scheduledMaintenance = [
    {
      id: 1,
      fieldName: 'North Field - Football',
      task: 'Infill Redistribution',
      scheduledDate: '2025-02-15',
      contractor: 'TurfCare Solutions',
      estimatedCost: 3200,
      status: 'scheduled'
    },
    {
      id: 2,
      fieldName: 'South Field - Soccer',
      task: 'Seam Repair',
      scheduledDate: '2025-02-20',
      contractor: 'Field Experts LLC',
      estimatedCost: 1800,
      status: 'in_progress'
    }
  ]

  // Mock maintenance history
  const maintenanceHistory = [
    {
      id: 1,
      fieldName: 'East Field - Multi-Purpose',
      task: 'GMAX Testing',
      completedDate: '2025-01-20',
      contractor: 'Field Health Systems',
      actualCost: 750,
      status: 'completed'
    },
    {
      id: 2,
      fieldName: 'North Field - Football',
      task: 'Deep Cleaning',
      completedDate: '2025-01-15',
      contractor: 'TurfCare Solutions',
      actualCost: 2400,
      status: 'completed'
    }
  ]

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
                  <h1 className={designTokens.typography.heading.h1}>Maintenance Management</h1>
                  <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                    Track maintenance recommendations, schedules, and history
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                    <Plus className="w-4 h-4" />
                    <span>Schedule Work</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Priority Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            >
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-red-600">{priorityCounts.high}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />
                  High Priority
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-yellow-600">{priorityCounts.medium}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-1 text-yellow-500" />
                  Medium Priority
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-green-600">{priorityCounts.low}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Low Priority
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-green-600">
                  ${(mockMaintenanceRecommendations.reduce((sum, rec) => sum + (rec.estimatedCost || 0), 0) / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                  Est. Costs
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6"
            >
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'recommendations', label: 'Recommendations', icon: AlertTriangle },
                    { id: 'scheduled', label: 'Scheduled', icon: Calendar },
                    { id: 'history', label: 'History', icon: Clock }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as 'scheduled' | 'recommendations' | 'history')}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'recommendations' && (
                <div>
                  {/* Filters */}
                  <div className={`${designTokens.components.card} p-6 mb-6`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center space-x-3">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="all">All Priorities</option>
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations List */}
                  <div className="space-y-4">
                    {filteredRecommendations.map((recommendation, index) => (
                      <motion.div
                        key={recommendation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`${designTokens.components.card} p-6 hover:shadow-md transition-shadow cursor-pointer`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                recommendation.priority === 'high' ? designTokens.colors.priority.critical.bg + ' ' + designTokens.colors.priority.critical.text :
                                recommendation.priority === 'medium' ? designTokens.colors.priority.medium.bg + ' ' + designTokens.colors.priority.medium.text :
                                designTokens.colors.priority.low.bg + ' ' + designTokens.colors.priority.low.text
                              }`}>
                                {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                              </span>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="w-4 h-4 mr-1" />
                                {mockFields.find(f => f.id === recommendation.fieldId)?.name}
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{recommendation.title}</h3>
                            <p className="text-gray-600 mb-4">{recommendation.description}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Due: {recommendation.dueDate ? new Date(recommendation.dueDate).toLocaleDateString() : 'N/A'}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                Est. ${(recommendation.estimatedCost || 0).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button className={designTokens.components.button.outline + ' text-sm'}>
                              Schedule
                            </button>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'scheduled' && (
                <div className="space-y-4">
                  {scheduledMaintenance.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`${designTokens.components.card} p-6`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.status === 'scheduled' ? 'Scheduled' : 'In Progress'}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              {item.fieldName}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.task}</h3>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                              <CalendarDays className="w-4 h-4 mr-1" />
                              {item.scheduledDate}
                            </div>
                            <div className="flex items-center">
                              <Wrench className="w-4 h-4 mr-1" />
                              {item.contractor}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ${item.estimatedCost.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  {maintenanceHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`${designTokens.components.card} p-6`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              {item.fieldName}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.task}</h3>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Completed: {item.completedDate}
                            </div>
                            <div className="flex items-center">
                              <Wrench className="w-4 h-4 mr-1" />
                              {item.contractor}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ${item.actualCost.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}