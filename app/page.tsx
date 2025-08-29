'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { FieldStatusCard } from '@/components/ui/field-status-card'
import { mockFields } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'
import { 
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  BarChart3,
  Calendar,
  Users,
  Target
} from 'lucide-react'

export default function HomePage() {
  const statusCounts = mockFields.reduce(
    (acc, field) => {
      acc[field.status]++
      return acc
    },
    { excellent: 0, good: 0, monitor: 0, critical: 0 } as Record<string, number>
  )

  const recentFields = mockFields.slice(0, 3)

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
                  <h1 className={designTokens.typography.heading.h1}>Field Health Dashboard</h1>
                  <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                    Monitor and manage your artificial turf field performance
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Testing</span>
                  </button>
                  <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                    <Plus className="w-4 h-4" />
                    <span>Add Field</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Status Overview Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            >
              {[
                { 
                  status: 'excellent', 
                  count: statusCounts.excellent, 
                  label: 'Excellent', 
                  color: 'green',
                  icon: CheckCircle,
                  description: 'Optimal performance'
                },
                { 
                  status: 'good', 
                  count: statusCounts.good, 
                  label: 'Good', 
                  color: 'blue',
                  icon: TrendingUp,
                  description: 'Performing well'
                },
                { 
                  status: 'monitor', 
                  count: statusCounts.monitor, 
                  label: 'Monitor', 
                  color: 'yellow',
                  icon: Target,
                  description: 'Needs attention'
                },
                { 
                  status: 'critical', 
                  count: statusCounts.critical, 
                  label: 'Critical', 
                  color: 'red',
                  icon: AlertTriangle,
                  description: 'Immediate action required'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className={`${designTokens.components.card} p-6 text-center hover:shadow-md transition-shadow`}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    item.color === 'green' ? 'bg-green-100' :
                    item.color === 'blue' ? 'bg-blue-100' :
                    item.color === 'yellow' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <item.icon className={`w-6 h-6 ${
                      item.color === 'green' ? 'text-green-600' :
                      item.color === 'blue' ? 'text-blue-600' :
                      item.color === 'yellow' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${
                    item.color === 'green' ? 'text-green-600' :
                    item.color === 'blue' ? 'text-blue-600' :
                    item.color === 'yellow' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {item.count}
                  </div>
                  <div className="font-medium text-gray-900 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Fields and Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Recent Fields */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className={`${designTokens.components.card} p-6`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Field Status</h2>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                      View All Fields
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      >
                        <FieldStatusCard field={field} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className={`${designTokens.components.card} p-6`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">System Overview</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Fields</span>
                      <span className="font-semibold text-gray-900">{mockFields.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Fields Tested This Month</span>
                      <span className="font-semibold text-green-600">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avg GMAX Score</span>
                      <span className="font-semibold text-blue-600">142.3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Next Testing Due</span>
                      <span className="font-semibold text-yellow-600">5 days</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className={`${designTokens.components.card} p-6`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Team Activity</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="text-sm">
                        <span className="font-medium">Sarah D.</span>
                        <span className="text-gray-600"> completed North Field testing</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="text-sm">
                        <span className="font-medium">Mike J.</span>
                        <span className="text-gray-600"> scheduled maintenance for Soccer Field A</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="text-sm">
                        <span className="font-medium">System</span>
                        <span className="text-gray-600"> generated compliance report</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Welcome Message for New Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className={`${designTokens.components.card} p-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to Field Health Systems
                  </h3>
                  <p className="text-gray-700 mb-4">
                    This demo system showcases how professional field monitoring helps protect your artificial turf investment 
                    and ensure athlete safety. Explore the dashboard to see how data-driven maintenance planning works.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Professional Assessment</span>
                    </button>
                    <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                      <BarChart3 className="w-4 h-4" />
                      <span>View Analytics Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
