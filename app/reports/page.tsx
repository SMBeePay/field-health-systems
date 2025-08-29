'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { mockFields } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'
import { 
  FileText,
  Download,
  Eye,
  Share2,
  Calendar,
  Filter,
  Search,
  Plus,
  BarChart3,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Star,
  ChevronRight
} from 'lucide-react'

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'recent' | 'scheduled' | 'templates'>('recent')

  // Mock report data
  const reports = [
    {
      id: 1,
      title: 'Q1 2025 Field Health Report',
      type: 'quarterly',
      fieldName: 'North Field - Football',
      fieldId: 1,
      generatedDate: '2025-01-28',
      status: 'completed',
      size: '2.4 MB',
      pages: 12,
      downloadCount: 5,
      sharedWith: ['john.doe@school.edu', 'admin@school.edu']
    },
    {
      id: 2,
      title: 'Monthly Safety Inspection',
      type: 'safety',
      fieldName: 'South Field - Soccer',
      fieldId: 2,
      generatedDate: '2025-01-25',
      status: 'completed',
      size: '1.8 MB',
      pages: 8,
      downloadCount: 3,
      sharedWith: ['facilities@school.edu']
    },
    {
      id: 3,
      title: 'Annual Budget Planning Report',
      type: 'budget',
      fieldName: 'All Fields',
      fieldId: null,
      generatedDate: '2025-01-20',
      status: 'completed',
      size: '3.6 MB',
      pages: 24,
      downloadCount: 12,
      sharedWith: ['budget@school.edu', 'principal@school.edu']
    },
    {
      id: 4,
      title: 'GMAX Compliance Report',
      type: 'compliance',
      fieldName: 'East Field - Multi-Purpose',
      fieldId: 3,
      generatedDate: '2025-01-15',
      status: 'completed',
      size: '1.2 MB',
      pages: 6,
      downloadCount: 8,
      sharedWith: ['safety@school.edu']
    }
  ]

  const scheduledReports = [
    {
      id: 1,
      title: 'Q2 2025 Field Health Report',
      type: 'quarterly',
      fieldName: 'All Fields',
      scheduledDate: '2025-04-01',
      frequency: 'Quarterly',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Monthly Safety Inspection',
      type: 'safety',
      fieldName: 'All Fields',
      scheduledDate: '2025-02-25',
      frequency: 'Monthly',
      status: 'scheduled'
    }
  ]

  const reportTemplates = [
    {
      id: 1,
      name: 'Field Health Assessment',
      description: 'Comprehensive field condition report with GMAX, shear factor, and maintenance recommendations',
      fields: ['Executive Summary', 'Field Performance Data', 'Maintenance Calendar', 'Budget Planning'],
      lastUsed: '2025-01-28'
    },
    {
      id: 2,
      name: 'Safety Compliance Report',
      description: 'Safety inspection report for regulatory compliance and insurance documentation',
      fields: ['Safety Metrics', 'Compliance Status', 'Risk Assessment', 'Recommendations'],
      lastUsed: '2025-01-15'
    },
    {
      id: 3,
      name: 'Budget Planning Report',
      description: 'Financial planning document with cost projections and ROI analysis',
      fields: ['Current Costs', 'Projected Expenses', 'ROI Analysis', 'Budget Recommendations'],
      lastUsed: '2025-01-20'
    }
  ]

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.fieldName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || report.type === filterType
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quarterly': return 'bg-blue-100 text-blue-800'
      case 'safety': return 'bg-red-100 text-red-800'
      case 'budget': return 'bg-green-100 text-green-800'
      case 'compliance': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                  <h1 className={designTokens.typography.heading.h1}>Reports & Documentation</h1>
                  <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                    Generate, manage, and share field assessment reports
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <Download className="w-4 h-4" />
                    <span>Bulk Export</span>
                  </button>
                  <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                    <Plus className="w-4 h-4" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            >
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-green-600">{reports.length}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Total Reports
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-blue-600">{scheduledReports.length}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Scheduled
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-yellow-600">{reportTemplates.length}</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <Star className="w-4 h-4 mr-1" />
                  Templates
                </div>
              </div>
              <div className={`${designTokens.components.card} p-6 text-center`}>
                <div className="text-3xl font-bold text-green-600">
                  {reports.reduce((sum, report) => sum + report.downloadCount, 0)}
                </div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                  <Download className="w-4 h-4 mr-1" />
                  Downloads
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
                    { id: 'recent', label: 'Recent Reports', icon: FileText },
                    { id: 'scheduled', label: 'Scheduled', icon: Calendar },
                    { id: 'templates', label: 'Templates', icon: Star }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as any)}
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
              {activeTab === 'recent' && (
                <div>
                  {/* Filters */}
                  <div className={`${designTokens.components.card} p-6 mb-6`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search reports..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="all">All Types</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="safety">Safety</option>
                          <option value="budget">Budget</option>
                          <option value="compliance">Compliance</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Reports List */}
                  <div className="space-y-4">
                    {filteredReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`${designTokens.components.card} p-6 hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <FileText className="w-5 h-5 text-green-600" />
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                                {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                              </span>
                              {report.status === 'completed' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Completed
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {report.fieldName}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {report.generatedDate}
                              </div>
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 mr-1" />
                                {report.pages} pages • {report.size}
                              </div>
                              <div className="flex items-center">
                                <Download className="w-4 h-4 mr-1" />
                                {report.downloadCount} downloads
                              </div>
                            </div>
                            {report.sharedWith.length > 0 && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Share2 className="w-4 h-4 mr-2" />
                                Shared with {report.sharedWith.length} people
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Share2 className="w-4 h-4" />
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
                  {scheduledReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`${designTokens.components.card} p-6`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                              {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Scheduled
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {report.fieldName}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Next: {report.scheduledDate}
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              {report.frequency}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button className={designTokens.components.button.outline + ' text-sm'}>
                            Edit Schedule
                          </button>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reportTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`${designTokens.components.card} p-6 hover:shadow-md transition-shadow cursor-pointer`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <p className="text-sm text-gray-500">Last used: {template.lastUsed}</p>
                          </div>
                        </div>
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Includes:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.fields.map((field, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className={designTokens.components.button.primary + ' w-full text-sm'}>
                        Use Template
                      </button>
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