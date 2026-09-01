'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { FieldDiagram } from '@/components/ui/field-diagram'
import { PerformanceChart } from '@/components/ui/performance-chart'
import { MaintenanceAlerts } from '@/components/ui/maintenance-alerts'
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
  Settings,
  Plus,
  Download,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

function normaliseTest(raw: Record<string, unknown>) {
  return {
    ...raw,
    gmaxStatus: String(raw.gmaxStatus ?? '').toLowerCase(),
    shearStatus: String(raw.shearStatus ?? '').toLowerCase(),
    infillDepthStatus: String(raw.infillDepthStatus ?? '').toLowerCase(),
    overallStatus: String(raw.overallStatus ?? '').toLowerCase(),
    testingDate: raw.testingDate ? new Date(raw.testingDate as string) : new Date(),
    createdAt: raw.createdAt ? new Date(raw.createdAt as string) : new Date(),
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt as string) : new Date(),
  }
}

function getStatusColorClasses(status: string) {
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

function gmaxColor(avg: number) {
  if (avg < 120) return 'text-green-600'
  if (avg < 165) return 'text-yellow-600'
  if (avg < 200) return 'text-orange-600'
  return 'text-red-600'
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'testing', label: 'Testing Data', icon: Gauge },
  { id: 'maintenance', label: 'Maintenance', icon: Settings },
  { id: 'compliance', label: 'Compliance', icon: FileText },
] as const

type TabId = (typeof TABS)[number]['id']

export default function FieldDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [selectedTab, setSelectedTab] = useState<TabId>('overview')
  const [field, setField] = useState<ReturnType<typeof normaliseField> | null>(null)
  const [testingData, setTestingData] = useState<ReturnType<typeof normaliseTest>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    async function loadField() {
      try {
        const res = await fetch(`/api/fields/${id}`)
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? `HTTP ${res.status}`)
        }
        const { field: raw } = await res.json()
        if (!cancelled) {
          const normalised = normaliseField(raw)
          // testingData is nested in the field response from GET /api/fields/[id]
          const rawTests = (raw.testingData as Record<string, unknown>[]) ?? []
          setField(normalised)
          setTestingData(rawTests.map(normaliseTest))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load field')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadField()
    return () => { cancelled = true }
  }, [id])

  const latestTest = testingData[0] ?? null

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#1F8A8A' }} />
              <span className="text-sm">Loading field data…</span>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error || !field) {
    return (
      <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Link
              href="/fields"
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Fields
            </Link>
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {error === 'Field not found' ? 'Field not found' : 'Unable to load field'}
              </h2>
              <p className="text-sm text-slate-500 mb-6">{error}</p>
              <Link
                href="/fields"
                className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back to Fields
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
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
                <Link
                  href="/fields"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Fields
                </Link>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className={designTokens.typography.heading.h1}>{field.name as string}</h1>
                  <div className="flex items-center flex-wrap gap-4 mt-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColorClasses(field.status as string)}`}
                    >
                      {field.status as string}
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-1" />
                      {(field.type as string).replace(/_/g, ' ').toUpperCase()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Last tested:{' '}
                      {latestTest
                        ? (latestTest.testingDate as Date).toLocaleDateString()
                        : 'Never'}
                    </div>
                    {field.latitude && field.longitude && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {(field.latitude as number).toFixed(4)},{' '}
                        {(field.longitude as number).toFixed(4)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/fields/${id}/test/new`}
                    className="inline-flex items-center gap-2 text-white rounded-lg px-4 py-2.5 text-sm font-semibold"
                    style={{ background: '#4CAF50' }}
                  >
                    <Plus className="w-4 h-4" />
                    Log Test Results
                  </Link>
                  <a
                    href={`/api/fields/${id}/report`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download CSV Report
                  </a>
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
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                    {/* Field Details */}
                    <div className={designTokens.components.card + ' p-4 sm:p-6'}>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Field Details</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Manufacturer:</span>
                          <p className="font-medium">{(field.manufacturer as string) || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Surface:</span>
                          <p className="font-medium">{(field.surface as string) || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Infill Type:</span>
                          <p className="font-medium">{(field.infillType as string) || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Install Date:</span>
                          <p className="font-medium">
                            {field.installDate
                              ? (field.installDate as Date).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Area:</span>
                          <p className="font-medium">
                            {field.totalArea
                              ? `${(field.totalArea as number).toLocaleString()} sq ft`
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Latest Test Results */}
                    {latestTest ? (
                      <div className={designTokens.components.card + ' p-4 sm:p-6'}>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Latest Test Results
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">GMAX Average:</span>
                            <span
                              className={`text-xl font-bold ${gmaxColor(latestTest.gmaxAverage as number)}`}
                            >
                              {(latestTest.gmaxAverage as number).toFixed(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Shear Average:</span>
                            <span className="text-lg font-semibold">
                              {(latestTest.shearAverage as number).toFixed(1)} N·m
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Infill Depth:</span>
                            <span className="font-medium">
                              {(latestTest.infillDepthAverage as number).toFixed(1)}mm
                            </span>
                          </div>
                          {latestTest.temperature && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Temperature:</span>
                              <span className="font-medium flex items-center">
                                <Thermometer className="w-4 h-4 mr-1" />
                                {latestTest.temperature as number}°F
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Technician:</span>
                            <span className="font-medium text-sm">
                              {latestTest.testingTechnician as string}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={designTokens.components.card + ' p-4 sm:p-6 flex flex-col items-center justify-center text-center gap-3'}>
                        <Gauge className="w-10 h-10 text-slate-300" />
                        <p className="text-sm text-slate-500">No test results yet</p>
                        <Link
                          href={`/fields/${id}/test/new`}
                          className="text-sm font-medium text-white rounded-lg px-4 py-2"
                          style={{ background: '#4CAF50' }}
                        >
                          Log First Test
                        </Link>
                      </div>
                    )}

                    {/* Maintenance Status placeholder */}
                    <div className={designTokens.components.card + ' p-4 sm:p-6'}>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Status</h3>
                      <p className="text-sm text-gray-500">No open maintenance items.</p>
                    </div>
                  </div>

                  {/* Field Diagram */}
                  <FieldDiagram
                    field={field as Parameters<typeof FieldDiagram>[0]['field']}
                    testingData={latestTest as Parameters<typeof FieldDiagram>[0]['testingData']}
                  />

                  {/* Performance Chart */}
                  <PerformanceChart
                    title={`${field.name as string} Performance Trends`}
                    timeframe="30d"
                    onTimeframeChange={() => {}}
                  />
                </div>
              )}

              {selectedTab === 'testing' && (
                <div className="space-y-6">
                  {/* Quick action */}
                  <div className="flex justify-end">
                    <Link
                      href={`/fields/${id}/test/new`}
                      className="inline-flex items-center gap-2 text-white rounded-lg px-4 py-2.5 text-sm font-semibold"
                      style={{ background: '#4CAF50' }}
                    >
                      <Plus className="w-4 h-4" />
                      Log New Test
                    </Link>
                  </div>

                  <FieldDiagram
                    field={field as Parameters<typeof FieldDiagram>[0]['field']}
                    testingData={latestTest as Parameters<typeof FieldDiagram>[0]['testingData']}
                  />

                  {/* Testing History */}
                  <div className={designTokens.components.card}>
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Testing History</h3>
                      <span className="text-sm text-slate-500">{testingData.length} records</span>
                    </div>

                    {testingData.length === 0 ? (
                      <div className="px-6 py-12 text-center">
                        <Gauge className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-sm text-slate-500">No testing records yet.</p>
                        <Link
                          href={`/fields/${id}/test/new`}
                          className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-white rounded-lg px-4 py-2"
                          style={{ background: '#4CAF50' }}
                        >
                          <Plus className="w-4 h-4" />
                          Log First Test
                        </Link>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {testingData.map((test) => (
                          <div key={test.id as string} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {(test.testingDate as Date).toLocaleDateString()}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {test.testingTechnician as string}
                                </p>
                                {test.weatherConditions && (
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    {test.weatherConditions as string}
                                  </p>
                                )}
                              </div>
                              <div className="grid grid-cols-3 gap-6 text-sm text-right">
                                <div>
                                  <span className="block text-gray-500">GMAX</span>
                                  <span
                                    className={`font-medium ${gmaxColor(test.gmaxAverage as number)}`}
                                  >
                                    {(test.gmaxAverage as number).toFixed(1)}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-gray-500">Shear</span>
                                  <span className="font-medium">
                                    {(test.shearAverage as number).toFixed(1)}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-gray-500">Infill</span>
                                  <span className="font-medium">
                                    {(test.infillDepthAverage as number).toFixed(1)}mm
                                  </span>
                                </div>
                              </div>
                            </div>
                            {test.notes && (
                              <p className="text-sm text-gray-600 mt-2 italic">
                                {test.notes as string}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === 'maintenance' && (
                <div className="space-y-6">
                  <MaintenanceAlerts recommendations={[]} onViewAll={() => {}} />
                </div>
              )}

              {selectedTab === 'compliance' && (
                <div className={designTokens.components.card + ' p-6'}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Reports</h3>
                  <p className="text-gray-600">
                    Compliance reporting features will be implemented based on field testing
                    standards.
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
