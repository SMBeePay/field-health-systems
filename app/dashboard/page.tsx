'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { StatusOverview } from '@/components/ui/status-overview'
import { FieldStatusCard } from '@/components/ui/field-status-card'
import { MaintenanceAlerts } from '@/components/ui/maintenance-alerts'
import { PerformanceChart } from '@/components/ui/performance-chart'
import { mockFields, mockMaintenanceRecommendations } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const router = useRouter()

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className={cn(
        "absolute inset-0 opacity-[0.03]",
        designTokens.patterns.fieldGridLarge
      )} />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-40 left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl opacity-10" />

      <Header />

      <div className="flex relative">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-10"
            >
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  designTokens.typography.heading.h1,
                  "mb-3"
                )}
              >
                Field Health Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-600 font-medium"
              >
                Monitor the health and performance of all your artificial sports fields
              </motion.p>
            </motion.div>

            {/* Status Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mb-10"
            >
              <StatusOverview stats={fieldStats} />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Field Status Cards */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={cn(designTokens.typography.heading.h3)}>
                      Your Fields
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                    >
                      View All →
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {mockFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + index * 0.1,
                          ease: "easeOut"
                        }}
                      >
                        <FieldStatusCard
                          field={field}
                          onClick={() => router.push(`/fields/${field.id}`)}
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
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
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
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
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