'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react'

// ── Style helpers ──────────────────────────────────────────────────────────────
const inputClass =
  'border border-slate-200 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:border-teal-500 bg-white'
const labelClass = 'text-sm font-medium text-slate-700 mb-1 block'
const sectionHeadingClass = 'text-base font-semibold mb-3 pb-2 border-b border-slate-100'

// ── Reading row type ──────────────────────────────────────────────────────────
interface Reading {
  id: number
  value: string
  label: string
}

function createReading(id: number): Reading {
  return { id, value: '', label: '' }
}

// ── Average & colour helpers ──────────────────────────────────────────────────
function calcAverage(readings: Reading[]): number | null {
  const nums = readings.map((r) => parseFloat(r.value)).filter((n) => !isNaN(n))
  if (nums.length === 0) return null
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function gmaxAvgColor(avg: number | null): string {
  if (avg === null) return 'text-slate-400'
  if (avg < 165) return 'text-green-600'
  if (avg < 200) return 'text-amber-600'
  return 'text-red-600'
}

function shearAvgColor(avg: number | null): string {
  if (avg === null) return 'text-slate-400'
  if (avg >= 40) return 'text-green-600'
  if (avg >= 25) return 'text-amber-600'
  return 'text-red-600'
}

function infillAvgColor(avg: number | null): string {
  if (avg === null) return 'text-slate-400'
  if (avg >= 38) return 'text-green-600'
  if (avg >= 25) return 'text-amber-600'
  return 'text-red-600'
}

// ── Reusable dynamic reading list ─────────────────────────────────────────────
interface ReadingListProps {
  title: string
  unit?: string
  readings: Reading[]
  onAdd: () => void
  onRemove: (id: number) => void
  onChange: (id: number, field: 'value' | 'label', val: string) => void
  avgColor: (avg: number | null) => string
  avgLabel: string
}

function ReadingList({
  title,
  unit,
  readings,
  onAdd,
  onRemove,
  onChange,
  avgColor,
  avgLabel,
}: ReadingListProps) {
  const avg = calcAverage(readings)

  return (
    <section>
      <h2 className={sectionHeadingClass} style={{ color: '#12324A' }}>
        {title}
      </h2>

      <div className="space-y-2 mb-3">
        <AnimatePresence initial={false}>
          {readings.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2"
            >
              {/* Point number */}
              <span className="text-xs text-slate-400 w-7 text-right shrink-0">
                {idx + 1}.
              </span>

              {/* Value input */}
              <div className="flex-1">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder={unit ? `Value (${unit})` : 'Value'}
                  value={r.value}
                  onChange={(e) => onChange(r.id, 'value', e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Optional label */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Label (optional, e.g. 50yd Center)"
                  value={r.label}
                  onChange={(e) => onChange(r.id, 'label', e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => onRemove(r.id)}
                disabled={readings.length === 1}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30"
                aria-label="Remove reading"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add button */}
      {readings.length < 12 && (
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Reading
        </button>
      )}

      {/* Running average */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-slate-500">{avgLabel} Average:</span>
        <span className={`text-sm font-semibold ${avgColor(avg)}`}>
          {avg !== null ? `${avg.toFixed(1)}${unit ? ` ${unit}` : ''}` : '—'}
        </span>
        {avg !== null && (
          <span className="text-xs text-slate-400">
            ({readings.filter((r) => r.value !== '').length} readings)
          </span>
        )}
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
let nextId = 2

export default function NewTestPage() {
  const router = useRouter()
  const params = useParams()
  const fieldId = params.id as string

  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Section 1 — Test Info
  const [testingDate, setTestingDate] = useState(new Date().toISOString().split('T')[0])
  const [technicianName, setTechnicianName] = useState('')
  const [weatherConditions, setWeatherConditions] = useState('')
  const [temperature, setTemperature] = useState('')

  // Section 2 — GMAX readings
  const [gmaxReadings, setGmaxReadings] = useState<Reading[]>([createReading(1)])

  // Section 3 — Shear readings
  const [shearReadings, setShearReadings] = useState<Reading[]>([createReading(1)])

  // Section 4 — Infill depth readings
  const [infillReadings, setInfillReadings] = useState<Reading[]>([createReading(1)])

  // Section 5 — Notes
  const [notes, setNotes] = useState('')

  // ── Helpers for reading lists ──────────────────────────────────────────────
  function addReading(setter: React.Dispatch<React.SetStateAction<Reading[]>>) {
    setter((prev) => [...prev, createReading(nextId++)])
  }

  function removeReading(
    setter: React.Dispatch<React.SetStateAction<Reading[]>>,
    id: number
  ) {
    setter((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev))
  }

  function changeReading(
    setter: React.Dispatch<React.SetStateAction<Reading[]>>,
    id: number,
    field: 'value' | 'label',
    val: string
  ) {
    setter((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)))
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError(null)

    const gmaxNums = gmaxReadings.map((r) => parseFloat(r.value)).filter((n) => !isNaN(n))
    const shearNums = shearReadings.map((r) => parseFloat(r.value)).filter((n) => !isNaN(n))
    const infillNums = infillReadings.map((r) => parseFloat(r.value)).filter((n) => !isNaN(n))

    if (gmaxNums.length === 0) {
      setApiError('Please enter at least one GMAX reading.')
      return
    }
    if (shearNums.length === 0) {
      setApiError('Please enter at least one Shear Factor reading.')
      return
    }
    if (infillNums.length === 0) {
      setApiError('Please enter at least one Infill Depth reading.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        testingDate,
        testingTechnician: technicianName.trim(),
        weatherConditions: weatherConditions.trim() || undefined,
        temperature: temperature !== '' ? Number(temperature) : undefined,
        gmaxReadings: gmaxNums,
        shearReadings: shearNums,
        infillDepthReadings: infillNums,
        notes: notes.trim() || undefined,
      }

      const res = await fetch(`/api/fields/${fieldId}/testing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setApiError(data.error ?? `Error ${res.status}`)
        return
      }

      // Redirect back to the field detail page with a success indicator
      router.push(`/fields/${fieldId}?testSaved=1`)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  // Pre-compute averages for the summary bar
  const gmaxAvg = useMemo(() => calcAverage(gmaxReadings), [gmaxReadings])
  const shearAvg = useMemo(() => calcAverage(shearReadings), [shearReadings])
  const infillAvg = useMemo(() => calcAverage(infillReadings), [infillReadings])

  return (
    <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-6"
            >
              <Link
                href={`/fields/${fieldId}`}
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Field
              </Link>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold" style={{ color: '#12324A' }}>
                Log Test Results
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Enter the measurements recorded during physical field testing.
                Averages and safety status will be calculated automatically.
              </p>
            </motion.div>

            {/* Live summary bar */}
            {(gmaxAvg !== null || shearAvg !== null || infillAvg !== null) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl border border-slate-200 px-5 py-3 mb-6 flex flex-wrap gap-6"
              >
                <div>
                  <span className="text-xs text-slate-500 block">GMAX Avg</span>
                  <span className={`font-bold text-lg ${gmaxAvgColor(gmaxAvg)}`}>
                    {gmaxAvg !== null ? gmaxAvg.toFixed(1) : '—'}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">/ 200 limit</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Shear Avg</span>
                  <span className={`font-bold text-lg ${shearAvgColor(shearAvg)}`}>
                    {shearAvg !== null ? shearAvg.toFixed(1) : '—'}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">N·m / 40 target</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Infill Avg</span>
                  <span className={`font-bold text-lg ${infillAvgColor(infillAvg)}`}>
                    {infillAvg !== null ? infillAvg.toFixed(1) : '—'}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">mm / 38 min</span>
                </div>
              </motion.div>
            )}

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* ── Section 1: Test Info ──────────────────────────── */}
                <section>
                  <h2 className={sectionHeadingClass} style={{ color: '#12324A' }}>
                    Test Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="testingDate" className={labelClass}>
                        Testing Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="testingDate"
                        type="date"
                        required
                        value={testingDate}
                        onChange={(e) => setTestingDate(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="technicianName" className={labelClass}>
                        Technician Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="technicianName"
                        type="text"
                        required
                        placeholder="e.g. Sarah Davis, Clean Green Turf"
                        value={technicianName}
                        onChange={(e) => setTechnicianName(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="weatherConditions" className={labelClass}>
                        Weather Conditions
                      </label>
                      <input
                        id="weatherConditions"
                        type="text"
                        placeholder="e.g. Clear, 72°F, light wind"
                        value={weatherConditions}
                        onChange={(e) => setWeatherConditions(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="temperature" className={labelClass}>
                        Temperature (°F)
                      </label>
                      <input
                        id="temperature"
                        type="number"
                        min="-20"
                        max="150"
                        step="1"
                        placeholder="72"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* ── Section 2: GMAX ───────────────────────────────── */}
                <ReadingList
                  title="GMAX Readings"
                  readings={gmaxReadings}
                  onAdd={() => addReading(setGmaxReadings)}
                  onRemove={(id) => removeReading(setGmaxReadings, id)}
                  onChange={(id, f, v) => changeReading(setGmaxReadings, id, f, v)}
                  avgColor={gmaxAvgColor}
                  avgLabel="GMAX"
                />

                {/* ── Section 3: Shear ──────────────────────────────── */}
                <ReadingList
                  title="Shear Factor Readings"
                  unit="N·m"
                  readings={shearReadings}
                  onAdd={() => addReading(setShearReadings)}
                  onRemove={(id) => removeReading(setShearReadings, id)}
                  onChange={(id, f, v) => changeReading(setShearReadings, id, f, v)}
                  avgColor={shearAvgColor}
                  avgLabel="Shear"
                />

                {/* ── Section 4: Infill Depth ───────────────────────── */}
                <ReadingList
                  title="Infill Depth Readings"
                  unit="mm"
                  readings={infillReadings}
                  onAdd={() => addReading(setInfillReadings)}
                  onRemove={(id) => removeReading(setInfillReadings, id)}
                  onChange={(id, f, v) => changeReading(setInfillReadings, id, f, v)}
                  avgColor={infillAvgColor}
                  avgLabel="Infill Depth"
                />

                {/* ── Section 5: Notes ──────────────────────────────── */}
                <section>
                  <h2 className={sectionHeadingClass} style={{ color: '#12324A' }}>
                    Notes &amp; Observations
                  </h2>
                  <textarea
                    rows={4}
                    placeholder="Any additional observations, concerns, or anomalies noted during testing…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={inputClass + ' resize-none'}
                  />
                </section>

                {/* ── Error ─────────────────────────────────────────── */}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
                  >
                    {apiError}
                  </motion.div>
                )}

                {/* ── Actions ───────────────────────────────────────── */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                  <Link
                    href={`/fields/${fieldId}`}
                    className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 text-white rounded-lg px-6 py-2.5 font-semibold text-sm disabled:opacity-60 transition-opacity"
                    style={{ background: '#4CAF50' }}
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitting ? 'Saving…' : 'Save Test Results'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
