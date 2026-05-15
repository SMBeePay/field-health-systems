'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { StatusOverview } from '@/components/ui/status-overview'
import { FieldStatusCard } from '@/components/ui/field-status-card'
import { MaintenanceAlerts } from '@/components/ui/maintenance-alerts'
import { PerformanceChart } from '@/components/ui/performance-chart'
import { designTokens } from '@/lib/design-tokens'
import { Plus } from 'lucide-react'

// The API returns Prisma enum values (UPPERCASE). Normalise to lowercase
// so FieldStatusCard and StatusOverview continue to work with the existing schema types.
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

function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg" />
          <div>
            <div className="h-4 bg-slate-100 rounded w-36 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-24" />
          </div>
        </div>
        <div className="h-6 bg-slate-100 rounded-full w-20" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="text-center">
            <div className="h-5 bg-slate-100 rounded w-12 mx-auto mb-1" />
            <div className="h-3 bg-slate-100 rounded w-8 mx-auto" />
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center space-x-2">
        <div className="h-3 bg-slate-100 rounded w-32" />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [fields, setFields] = useState<ReturnType<typeof normaliseField>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  const fieldStats = fields.reduce(
    (stats, field) => {
      const s = field.status as string
      if (s === 'excellent') stats.excellent++
      else if (s === 'good') stats.good++
      else if (s === 'monitor') stats.monitor++
      else if (s === 'critical') stats.critical++
      stats.total++
      return stats
    },
    { excellent: 0, good: 0, monitor: 0, critical: 0, total: 0 }
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

                  {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
                    </div>
                  )}

                  {!loading && error && (
                    <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
                      <p className="text-red-600 font-medium mb-2">Unable to load fields</p>
                      <p className="text-sm text-slate-500 mb-6">{error}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {!loading && !error && fields.length === 0 && (
                    <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
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
                    </div>
                  )}

                  {!loading && !error && fields.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fields.map((field, index) => (
                        <motion.div
                          key={field.id as string}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                        >
                          <FieldStatusCard
                            field={field as Parameters<typeof FieldStatusCard>[0]['field']}
                            onClick={() => router.push(`/fields/${field.id}`)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Maintenance Alerts sidebar — pass empty array when loading/no data */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <MaintenanceAlerts
                  recommendations={[]}
                  onViewAll={() => router.push('/maintenance')}
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
