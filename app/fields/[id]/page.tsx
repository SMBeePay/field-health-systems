'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { FieldDiagram } from '@/components/ui/field-diagram'
import { PerformanceChart } from '@/components/ui/performance-chart'
import { MaintenanceAlerts } from '@/components/ui/maintenance-alerts'
import { mockFields, mockTestingData, mockMaintenanceRecommendations } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'
import { 
  ArrowLeft, 
  Calendar,
  Thermometer,
  MapPin,
  Building,
  Gauge,
  Activity,
  FileText,
  AlertTriangle,
  Settings
} from 'lucide-react'
import Link from 'next/link'

interface FieldDetailPageProps {
  params: {
    id: string
  }
}

export default function FieldDetailPage({ params }: FieldDetailPageProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'testing' | 'maintenance' | 'compliance'>('overview')
  
  // Find field by ID
  const field = mockFields.find(f => f.id === params.id)
  
  if (!field) {
    notFound()
  }

  // Get field testing data and maintenance recommendations
  const fieldTestingData = mockTestingData.filter(test => test.fieldId === field.id)
  const latestTesting = fieldTestingData.length > 0 ? fieldTestingData[fieldTestingData.length - 1] : undefined
  const fieldMaintenanceRecommendations = mockMaintenanceRecommendations.filter(rec => rec.fieldId === field.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return designTokens.colors.status.excellent.bg + ' ' + designTokens.colors.status.excellent.text
      case 'good':
        return designTokens.colors.status.good.bg + ' ' + designTokens.colors.status.good.text
      case 'monitor':
        return designTokens.colors.status.monitor.bg + ' ' + designTokens.colors.status.monitor.text
      case 'critical':
        return designTokens.colors.status.critical.bg + ' ' + designTokens.colors.status.critical.text
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'testing', label: 'Testing Data', icon: Gauge },
    { id: 'maintenance', label: 'Maintenance', icon: Settings },
    { id: 'compliance', label: 'Compliance', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Navigation Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Link href="/fields" className="flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Fields
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={designTokens.typography.heading.h1}>{field.name}</h1>
                  <div className="flex items-center space-x-6 mt-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(field.status)}`}>
                      {field.status.charAt(0).toUpperCase() + field.status.slice(1)}
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-1" />
                      {field.type.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Last tested: {latestTesting ? latestTesting.testingDate.toLocaleDateString() : 'Never'}
                    </div>
                    {field.latitude && field.longitude && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {field.latitude.toFixed(4)}, {field.longitude.toFixed(4)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-6"
            >
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        selectedTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  {/* Field Information Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className={designTokens.components.card + ' p-6'}>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Field Details</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Manufacturer:</span>
                          <p className="font-medium">{field.manufacturer || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Surface:</span>
                          <p className="font-medium">{field.surface || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Infill Type:</span>
                          <p className="font-medium">{field.infillType || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Install Date:</span>
                          <p className="font-medium">{field.installDate ? field.installDate.toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Area:</span>
                          <p className="font-medium">{field.totalArea ? `${field.totalArea.toLocaleString()} sq ft` : 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Latest Test Results */}
                    {latestTesting && (
                      <div className={designTokens.components.card + ' p-6'}>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Latest Test Results</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">GMAX Average:</span>
                            <span className={`font-medium ${
                              latestTesting.gmaxAverage < 120 ? 'text-green-600' :
                              latestTesting.gmaxAverage < 165 ? 'text-yellow-600' :
                              latestTesting.gmaxAverage < 200 ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {latestTesting.gmaxAverage}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Shear Average:</span>
                            <span className="font-medium">{latestTesting.shearAverage} N·m</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Infill Depth:</span>
                            <span className="font-medium">{latestTesting.infillDepthAverage}mm</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Temperature:</span>
                            <span className="font-medium flex items-center">
                              <Thermometer className="w-4 h-4 mr-1" />
                              {latestTesting.temperature}°F
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Technician:</span>
                            <span className="font-medium text-sm">{latestTesting.testingTechnician}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Maintenance Alerts */}
                    <div className={designTokens.components.card + ' p-6'}>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Status</h3>
                      {fieldMaintenanceRecommendations.length > 0 ? (
                        <div className="space-y-3">
                          {fieldMaintenanceRecommendations.slice(0, 3).map((rec) => (
                            <div key={rec.id} className="flex items-start space-x-2">
                              <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                                rec.priority === 'critical' ? 'text-red-500' :
                                rec.priority === 'high' ? 'text-orange-500' :
                                rec.priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                              }`} />
                              <div>
                                <p className="text-sm font-medium">{rec.title}</p>
                                <p className="text-xs text-gray-500 capitalize">{rec.priority} priority</p>
                              </div>
                            </div>
                          ))}
                          {fieldMaintenanceRecommendations.length > 3 && (
                            <p className="text-sm text-gray-500">
                              +{fieldMaintenanceRecommendations.length - 3} more recommendations
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No maintenance recommendations</p>
                      )}
                    </div>
                  </div>

                  {/* Field Diagram */}
                  <FieldDiagram field={field} testingData={latestTesting} />

                  {/* Performance Chart */}
                  <PerformanceChart
                    title={`${field.name} Performance Trends`}
                    timeframe="30d"
                    onTimeframeChange={() => {}}
                  />
                </div>
              )}

              {selectedTab === 'testing' && (
                <div className="space-y-6">
                  {/* Field Diagram with Testing Data */}
                  <FieldDiagram field={field} testingData={latestTesting} />
                  
                  {/* Testing History */}
                  <div className={designTokens.components.card}>
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Testing History</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {fieldTestingData.map((test) => (
                        <div key={test.id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {test.testingDate.toLocaleDateString()}
                              </h4>
                              <p className="text-sm text-gray-600">{test.testingTechnician}</p>
                            </div>
                            <div className="text-right">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="block text-gray-500">GMAX</span>
                                  <span className={`font-medium ${
                                    test.gmaxAverage < 120 ? 'text-green-600' :
                                    test.gmaxAverage < 165 ? 'text-yellow-600' :
                                    test.gmaxAverage < 200 ? 'text-orange-600' : 'text-red-600'
                                  }`}>
                                    {test.gmaxAverage}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-gray-500">Shear</span>
                                  <span className="font-medium">{test.shearAverage}</span>
                                </div>
                                <div>
                                  <span className="block text-gray-500">Infill</span>
                                  <span className="font-medium">{test.infillDepthAverage}mm</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {test.notes && (
                            <p className="text-sm text-gray-600 mt-2">{test.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'maintenance' && (
                <div className="space-y-6">
                  <MaintenanceAlerts
                    recommendations={fieldMaintenanceRecommendations}
                    onViewAll={() => {}}
                    showTitle={false}
                  />
                </div>
              )}

              {selectedTab === 'compliance' && (
                <div className={designTokens.components.card + ' p-6'}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Reports</h3>
                  <p className="text-gray-600">
                    Compliance reporting features will be implemented based on field testing standards.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}