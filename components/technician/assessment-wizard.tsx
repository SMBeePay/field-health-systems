'use client'

import { useMemo, useState, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus, Image as ImageIcon, CheckCircle2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import {
  METRIC_STATUS_STYLES,
  METRIC_THRESHOLDS,
  getMetricStatus,
  getAssessmentStatus,
  VISUAL_CONDITION_LABELS,
  type VisualCondition,
} from '@/lib/field-status'
import { addMonths } from 'date-fns'
import { StatusPill } from '@/components/ui/status-pill'
import { FieldMap } from '@/components/fields/field-map'
import { savePointReading, submitAssessment } from '@/lib/actions/assessments'
import type { TestLocation } from '@/lib/test-points'

const TOTAL_POINTS = 10
const VISUAL_OPTIONS: VisualCondition[] = ['good', 'minor_wear', 'repair_needed']

export function AssessmentWizard({
  orgSlug,
  assessmentId,
  fieldId,
  fieldName,
  facility,
  technician,
  testingDate,
  initialLocations,
}: {
  orgSlug: string
  assessmentId: string
  fieldId: string
  fieldName: string
  facility: string | null
  technician: string
  testingDate: Date
  initialLocations: TestLocation[]
}) {
  const router = useRouter()
  const [points, setPoints] = useState<TestLocation[]>(initialLocations)
  const firstIncomplete = points.findIndex((p) => p.gmax === 0)
  const [currentIndex, setCurrentIndex] = useState(firstIncomplete === -1 ? TOTAL_POINTS : firstIncomplete + 1)
  const [phase, setPhase] = useState<'point' | 'review'>(firstIncomplete === -1 ? 'review' : 'point')
  const [isPending, startTransition] = useTransition()

  const current = points.find((p) => p.index === currentIndex) ?? points[0]
  const completedCount = points.filter((p) => p.gmax > 0).length

  function updateCurrent(patch: Partial<TestLocation>) {
    setPoints((prev) => prev.map((p) => (p.index === currentIndex ? { ...p, ...patch } : p)))
  }

  function handleSaveAndNext() {
    startTransition(async () => {
      await savePointReading(assessmentId, current)
      if (currentIndex >= TOTAL_POINTS) {
        setPhase('review')
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    })
  }

  function handlePrevious() {
    if (currentIndex > 1) setCurrentIndex(currentIndex - 1)
  }

  function handleExit() {
    startTransition(async () => {
      await savePointReading(assessmentId, current)
      router.push(`/app/${orgSlug}/fields/${fieldId}`)
    })
  }

  function handleSubmit() {
    startTransition(() => submitAssessment(orgSlug, assessmentId))
  }

  const overallStatus = useMemo(() => getAssessmentStatus(points), [points])
  const gmaxAvg = average(points.map((p) => p.gmax))
  const infillAvg = average(points.map((p) => p.infillDepth))
  const shearAvg = average(points.map((p) => p.shear))
  const visualLabel = points.every((p) => p.visualCondition === 'good') ? 'Good' : 'Mixed'

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <header className="bg-[#0D1B2A] px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <Image src="/fhs-logo.png" alt="Field Health Systems" width={100} height={28} className="h-6 w-auto object-contain" />
            <span className="text-white font-semibold text-sm hidden sm:inline">Technician Assessment</span>
          </div>
          <span className="text-white text-sm font-semibold">{phase === 'review' ? `${TOTAL_POINTS}/${TOTAL_POINTS}` : `${currentIndex}/${TOTAL_POINTS}`}</span>
        </div>
        <div className="flex items-center gap-1.5 max-w-5xl mx-auto mt-3">
          {points.map((p) => (
            <div
              key={p.index}
              className={`h-1.5 flex-1 rounded-full ${
                p.gmax > 0 ? 'bg-green-500' : p.index === currentIndex && phase === 'point' ? 'bg-[#1E88E5]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 p-4 sm:p-6">
        <aside className="hidden lg:block bg-white rounded-xl border border-slate-200 p-5 h-fit">
          <h2 className="font-bold text-[#0D1B2A]">{fieldName}</h2>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">{facility}</p>
          <FieldMap locations={points} selectedIndex={phase === 'point' ? currentIndex : undefined} size="sm" className="mb-4" />

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold text-slate-400">Assessment</dt>
              <dd className="text-slate-700">Annual Assessment</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-slate-400">Technician</dt>
              <dd className="text-slate-700">{technician}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-slate-400">Date</dt>
              <dd className="text-slate-700">{formatDate(testingDate)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-slate-400">Progress</dt>
              <dd className="text-slate-700">
                {completedCount} complete · {TOTAL_POINTS - completedCount} remaining
              </dd>
            </div>
          </dl>

          <button
            onClick={handleExit}
            disabled={isPending}
            className="w-full mt-5 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Exit & Save Draft
          </button>
        </aside>

        <main className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
          {phase === 'point' && current ? (
            <>
              <h1 className="text-xl font-bold text-[#0D1B2A]">Test Location {current.index}</h1>
              <p className="text-sm text-slate-500 mb-5">Point {current.index} of {TOTAL_POINTS}</p>

              <div className="lg:hidden mb-5">
                <FieldMap locations={points} selectedIndex={currentIndex} size="sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <MetricInput
                  label={METRIC_THRESHOLDS.gmax.label}
                  value={current.gmax}
                  target={`${METRIC_THRESHOLDS.gmax.min}-${METRIC_THRESHOLDS.gmax.max}`}
                  onChange={(v) => updateCurrent({ gmax: v })}
                />
                <MetricInput
                  label={`${METRIC_THRESHOLDS.infillDepth.label} (in)`}
                  value={current.infillDepth}
                  target={`${METRIC_THRESHOLDS.infillDepth.min}"-${METRIC_THRESHOLDS.infillDepth.max}"`}
                  step={0.1}
                  metric="infillDepth"
                  onChange={(v) => updateCurrent({ infillDepth: v })}
                />
                <MetricInput
                  label={METRIC_THRESHOLDS.shear.label}
                  value={current.shear}
                  target={`${METRIC_THRESHOLDS.shear.min}-${METRIC_THRESHOLDS.shear.max}`}
                  metric="shear"
                  onChange={(v) => updateCurrent({ shear: v })}
                />
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">Visual Condition</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {VISUAL_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => updateCurrent({ visualCondition: opt })}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                        current.visualCondition === opt ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {VISUAL_CONDITION_LABELS[opt]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">Photos</h3>
                <div className="flex gap-3 flex-wrap">
                  {Array.from({ length: current.photoCount ?? 0 }).map((_, i) => (
                    <div key={i} className="w-20 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  ))}
                  <button
                    onClick={() => updateCurrent({ photoCount: (current.photoCount ?? 0) + 1 })}
                    className="w-20 h-16 rounded-lg border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-[#1E88E5] text-xs font-semibold hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">Notes</h3>
                <textarea
                  value={current.notes ?? ''}
                  onChange={(e) => updateCurrent({ notes: e.target.value })}
                  rows={3}
                  placeholder="Surface condition, infill migration, anything notable..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 1 || isPending}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous Point
                </button>
                <button
                  onClick={handleSaveAndNext}
                  disabled={isPending || current.gmax <= 0}
                  className="px-5 py-2.5 rounded-lg bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm font-semibold disabled:opacity-60"
                >
                  {isPending ? 'Saving...' : currentIndex >= TOTAL_POINTS ? 'Save & Review' : 'Save & Next Point'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold text-[#0D1B2A]">Review Assessment</h1>
              <p className="text-sm font-semibold text-green-600 flex items-center gap-1.5 mb-5">
                <CheckCircle2 className="w-4 h-4" />
                All test locations complete
              </p>

              <div className="space-y-3 mb-6">
                <ReviewRow label="GMAX Avg" value={gmaxAvg} />
                <ReviewRow label="Infill Avg" value={`${infillAvg}"`} />
                <ReviewRow label="Shear Avg" value={shearAvg} />
                <ReviewRow label="Visual" value={visualLabel} />
              </div>

              <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">Recommendations</h3>
              <div
                className={`rounded-lg p-4 mb-8 ${
                  overallStatus === 'passed' ? 'bg-green-50' : overallStatus === 'monitor' ? 'bg-amber-50' : 'bg-red-50'
                }`}
              >
                <p className="font-semibold text-slate-800">
                  {overallStatus === 'passed'
                    ? 'No immediate maintenance required.'
                    : overallStatus === 'monitor'
                      ? 'Schedule a follow-up inspection to monitor trending readings.'
                      : 'Immediate maintenance recommended. A high-priority recommendation will be created.'}
                </p>
                <p className="text-sm text-slate-500 mt-1">Next routine assessment: {formatDate(addMonths(testingDate, 6))}</p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full px-5 py-3 rounded-lg bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm font-bold disabled:opacity-60"
              >
                {isPending ? 'Submitting...' : 'Submit Assessment'}
              </button>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function average(nums: number[]): number {
  return nums.length ? Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10 : 0
}

function MetricInput({
  label,
  value,
  target,
  step = 1,
  metric,
  onChange,
}: {
  label: string
  value: number
  target: string
  step?: number
  metric?: 'gmax' | 'infillDepth' | 'shear'
  onChange: (v: number) => void
}) {
  const status = metric ? getMetricStatus(metric, value) : getMetricStatus('gmax', value)
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        {value > 0 && <StatusPill style={METRIC_STATUS_STYLES[status]} />}
      </div>
      <input
        type="number"
        step={step}
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full text-xl font-bold text-[#0D1B2A] border-0 p-0 focus:outline-none focus:ring-0"
        placeholder="0"
      />
      <div className="text-xs text-slate-400 mt-1">Target {target}</div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-bold text-[#0D1B2A]">{value}</span>
    </div>
  )
}
