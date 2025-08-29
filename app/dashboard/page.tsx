'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { StatusOverview } from '@/components/ui/status-overview'
import { FieldStatusCard } from '@/components/ui/field-status-card'
import { MaintenanceAlerts } from '@/components/ui/maintenance-alerts'
import { PerformanceChart } from '@/components/ui/performance-chart'
import { mockFields, mockMaintenanceRecommendations } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d')

  // Calculate field status statistics
  const fieldStats = mockFields.reduce(
    (stats, field) => {
      stats[field.status]++
      stats.total++
      return stats
    },
    { excellent: 0, good: 0, monitor: 0, critical: 0, total: 0 }
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
              <h1 className={designTokens.typography.heading.h1}>Field Health Dashboard</h1>
              <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                Monitor the health and performance of all your artificial sports fields
              </p>
            </motion.div>

            {/* Status Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-8"
            >
              <StatusOverview stats={fieldStats} />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Field Status Cards */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mb-6"
                >
                  <h2 className={designTokens.typography.heading.h2 + ' mb-4'}>Field Status</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      >
                        <FieldStatusCard 
                          field={field}
                          onClick={() => console.log('Navigate to field details:', field.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Maintenance Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <MaintenanceAlerts
                  recommendations={mockMaintenanceRecommendations}
                  onViewAll={() => console.log('Navigate to maintenance page')}
                />
              </motion.div>
            </div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <PerformanceChart
                title="Field Performance Trends"
                timeframe={selectedTimeframe}
                onTimeframeChange={setSelectedTimeframe}
              />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}