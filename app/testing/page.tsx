'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { designTokens } from '@/lib/design-tokens'
import { Activity, Calendar, Plus, ArrowRight, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

// ── Types coming from the API ──────────────────────────────────────────────────
interface ApiField {
  id: string
  name: string
  type: string
  status: string
  lastTestingDate: string | null
  testingData?: ApiTestRecord[]
}

interface ApiTestRecord {
  id: string
  fieldId: string
  testingDate: string
  testingTechnician: string
  weatherConditions?: string
  temperature?: number
  gmaxAverage: number
  gmaxStatus: string
  shearAverage: number
  shearStatus: string
  infillDepthAverage: number
  infillDepthStatus: string
  overallStatus: string
  notes?: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function statusBadgeClass(s: string) {
  const lower = s.toLowerCase()
  switch (lower) {
    case 'excellent':
    case 'passed':
      return designTokens.colors.status.excellent.bg + ' ' + designTokens.colors.status.excellent.text
    case 'good':
      return designTokens.colors.status.good.bg + ' ' + designTokens.colors.status.good.text
    case 'monitor':
      return designTokens.colors.status.monitor.bg + ' ' + designTokens.colors.status.monitor.text
    default:
      return designTokens.colors.status.critical.bg + ' ' + designTokens.colors.status.critical.text
  }
}

function formatStatus(s: string) {
  const lower = s.toLowerCase()
  if (lower === 'passed') return 'Passed'
  if (lower === 'failed') return 'Failed'
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

function gmaxColor(avg: number) {
  if (avg < 165) return 'text-green-600'
  if (avg < 200) return 'text-amber-600'
  return 'text-red-600'
}

// ── Testing history row for a single field ────────────────────────────────────
function FieldTestingRow({ field }: { field: ApiField }) {
  const [expanded, setExpanded] = useState(false)
  const tests = field.testingData ?? []
  const latestTest = tests[0] ?? null

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Summary row */}
      <div className="px-5 py-4 flex items-center gap-4 flex-wrap">
        {/* Field info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-slate-800">{field.name}</h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadgeClass(field.status)}`}
            >
              {formatStatus(field.status)}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 capitalize">
            {field.type.replace(/_/g, ' ')}
          </p>
        </div>

        {/* Last test date */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 shrink-0">
          <Calendar className="w-4 h-4 shrink-0" />
          {field.lastTestingDate
            ? new Date(field.lastTestingDate).toLocaleDateString()
            : 'Never tested'}
        </div>

        {/* Latest averages */}
        {latestTest && (
          <div className="flex items-center gap-5 text-sm">
            <div className="text-center">
              <div className={`font-semibold ${gmaxColor(latestTest.gmaxAverage)}`}>
                {latestTest.gmaxAverage.toFixed(1)}
              </div>
              <div className="text-xs text-slate-400">GMAX</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-700">
                {latestTest.shearAverage.toFixed(1)}
              </div>
              <div className="text-xs text-slate-400">Shear</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-700">
                {latestTest.infillDepthAverage.toFixed(1)}mm
              </div>
              <div className="text-xs text-slate-400">Infill</div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/fields/${field.id}/test/new`}
            className="inline-flex items-center gap-1.5 text-white rounded-lg px-3 py-1.5 text-xs font-semibold"
            style={{ background: '#4CAF50' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Log Test
          </Link>

          <Link
            href={`/fields/${field.id}`}
            className="inline-flex items-center gap-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
          >
            View Field
            <ArrowRight className="w-3 h-3" />
          </Link>

          {tests.length > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg"
              aria-label={expanded ? 'Collapse history' : 'Expand history'}
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded history */}
      {expanded && tests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-slate-100"
        >
          <div className="px-5 py-3 text-xs text-slate-500 font-medium grid grid-cols-12 gap-2 bg-slate-50">
            <div className="col-span-3">Date</div>
            <div className="col-span-3">Technician</div>
            <div className="col-span-1 text-center">GMAX</div>
            <div className="col-span-1 text-center">Shear</div>
            <div className="col-span-2 text-center">Infill (mm)</div>
            <div className="col-span-2 text-center">Overall</div>
          </div>
          <div className="divide-y divide-slate-100">
            {tests.map((t) => (
              <div
                key={t.id}
                className="px-5 py-3 text-sm grid grid-cols-12 gap-2 items-center hover:bg-slate-50"
              >
                <div className="col-span-3 text-slate-700">
                  {new Date(t.testingDate).toLocaleDateString()}
                </div>
                <div className="col-span-3 text-slate-600 text-xs truncate">
                  {t.testingTechnician}
                </div>
                <div className={`col-span-1 text-center font-medium ${gmaxColor(t.gmaxAverage)}`}>
                  {t.gmaxAverage.toFixed(1)}
                </div>
                <div className="col-span-1 text-center font-medium text-slate-700">
                  {t.shearAverage.toFixed(1)}
                </div>
                <div className="col-span-2 text-center font-medium text-slate-700">
                  {t.infillDepthAverage.toFixed(1)}
                </div>
                <div className="col-span-2 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(t.overallStatus)}`}
                  >
                    {formatStatus(t.overallStatus)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function TestingDataPage() {
  const [fields, setFields] = useState<ApiField[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/fields')
        if (!res.ok) {
          const d = await res.json().catch(() => ({}))
          throw new Error(d.error ?? `HTTP ${res.status}`)
        }
        const { fields: raw } = await res.json()
        if (!cancelled) setFields(raw ?? [])
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load fields')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // Total test counts across all fields
  const totalTests = fields.reduce((n, f) => n + (f.testingData?.length ?? 0), 0)
  const fieldsWithTests = fields.filter((f) => (f.testingData?.length ?? 0) > 0).length

  return (
    <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start justify-between mb-8 gap-4 flex-wrap"
            >
              <div>
                <h1 className={designTokens.typography.heading.h1}>Testing Data</h1>
                <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                  Track GMAX, shear, and infill depth measurements across all fields
                </p>
              </div>
            </motion.div>

            {/* Summary stats */}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8"
              >
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold" style={{ color: '#12324A' }}>
                    {fields.length}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Total Fields</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold" style={{ color: '#1F8A8A' }}>
                    {fieldsWithTests}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Fields Tested</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold" style={{ color: '#4CAF50' }}>
                    {totalTests}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Total Test Records</div>
                </div>
              </motion.div>
            )}

            {/* Testing Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={designTokens.components.card + ' p-6 mb-6'}
            >
              <h2 className={designTokens.typography.heading.h3 + ' mb-4'}>Testing Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-red-700 mb-2">GMAX Testing</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Measures surface hardness</li>
                    <li>• Safe limit: &lt;165 (football: &lt;200)</li>
                    <li>• Critical: &gt;200</li>
                    <li>• Take 8+ readings across field</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: '#1F8A8A' }}>Shear Factor</h4>
                  <ul className="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• Measures traction / grip</li>
                    <li>• Target: ≥40 N·m</li>
                    <li>• Monitor: 25–40 N·m</li>
                    <li>• Critical: &lt;25 N·m</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-2">Infill Depth</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Measures infill level</li>
                    <li>• Target: ≥38mm</li>
                    <li>• Monitor: 25–38mm</li>
                    <li>• Critical: &lt;25mm</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#1F8A8A' }} />
                <span className="text-sm">Loading fields…</span>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
                <p className="text-red-600 font-medium mb-1">Unable to load data</p>
                <p className="text-sm text-slate-500">{error}</p>
              </div>
            )}

            {/* No fields */}
            {!loading && !error && fields.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-700 mb-1">No fields yet</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Add a field first, then log test results.
                </p>
                <Link
                  href="/fields/new"
                  className="inline-flex items-center gap-2 text-white rounded-lg px-5 py-2.5 text-sm font-semibold"
                  style={{ background: '#4CAF50' }}
                >
                  <Plus className="w-4 h-4" />
                  Add First Field
                </Link>
              </div>
            )}

            {/* Field rows */}
            {!loading && !error && fields.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-4"
              >
                {fields.map((field, i) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.25 + i * 0.06 }}
                  >
                    <FieldTestingRow field={field} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
