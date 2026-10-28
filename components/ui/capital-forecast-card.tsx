'use client'

import { useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { CalendarClock, DollarSign, Pencil, PiggyBank, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react'
import { designTokens } from '@/lib/design-tokens'
import {
  forecastField,
  formatCurrency,
  FORECAST_ASSUMPTIONS,
  type ForecastTest,
} from '@/lib/capital-forecast'

interface CapitalForecastCardProps {
  fieldId: string
  installDate?: Date | null
  replacementCost?: number | null
  totalArea?: number | null
  length?: number | null
  width?: number | null
  tests: ForecastTest[]
  /** Called with the updated field after a successful save. */
  onSaved?: (field: Record<string, unknown>) => void
}

const CONFIDENCE_LABEL = {
  high: { text: 'High confidence', cls: 'bg-green-50 text-green-700' },
  medium: { text: 'Medium confidence', cls: 'bg-blue-50 text-blue-700' },
  low: { text: 'Early estimate', cls: 'bg-slate-100 text-slate-600' },
} as const

function toInputDate(d?: Date | null) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}

export function CapitalForecastCard(props: CapitalForecastCardProps) {
  const { data: session } = useSession()
  const canEdit = session?.user.role === 'ORG_ADMIN' || session?.user.role === 'SUPER_ADMIN'

  const [installDate, setInstallDate] = useState<Date | null>(props.installDate ?? null)
  const [replacementCost, setReplacementCost] = useState<number | null>(props.replacementCost ?? null)
  const [editing, setEditing] = useState(false)
  const [draftDate, setDraftDate] = useState(toInputDate(props.installDate))
  const [draftCost, setDraftCost] = useState(props.replacementCost ? String(props.replacementCost) : '')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const forecast = useMemo(
    () =>
      forecastField({
        installDate,
        replacementCost,
        totalArea: props.totalArea,
        length: props.length,
        width: props.width,
        tests: props.tests,
      }),
    [installDate, replacementCost, props.totalArea, props.length, props.width, props.tests]
  )

  async function save() {
    setSaving(true)
    setSaveError(null)
    try {
      const cleanedCost = draftCost.replace(/[$,\s]/g, '')
      const costValue = cleanedCost === '' ? null : Number(cleanedCost)
      if (costValue !== null && (!Number.isFinite(costValue) || costValue < 0)) {
        throw new Error('Replacement cost must be a number, e.g. 850000')
      }
      const payload: Record<string, unknown> = { replacementCost: costValue }
      if (draftDate) payload.installDate = draftDate
      const res = await fetch(`/api/fields/${props.fieldId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
      setInstallDate(data.field.installDate ? new Date(data.field.installDate) : null)
      setReplacementCost(data.field.replacementCost ?? null)
      setEditing(false)
      props.onSaved?.(data.field)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const editor = (
    <div className="space-y-3 mt-4 pt-4 border-t border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="block text-slate-600 mb-1">Install date</span>
          <input
            type="date"
            value={draftDate}
            onChange={(e) => setDraftDate(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 w-full text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="block text-slate-600 mb-1">Replacement cost (today&apos;s $)</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 850000"
            value={draftCost}
            onChange={(e) => setDraftCost(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 w-full text-sm"
          />
        </label>
      </div>
      {saveError && <p className="text-sm text-red-600">{saveError}</p>}
      <div className="flex gap-2">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 text-white rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60"
          style={{ background: '#4CAF50' }}
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save
        </button>
        <button
          onClick={() => setEditing(false)}
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </div>
  )

  // No install date → prompt for it
  if (!forecast) {
    return (
      <div className={designTokens.components.card + ' p-4 sm:p-6'}>
        <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-slate-400" />
          Replacement Forecast
        </h3>
        <p className="text-sm text-slate-500">
          Add this field&apos;s install date to project its replacement year and the annual reserve
          needed to fund it.
        </p>
        {canEdit && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="mt-4 text-sm font-medium text-white rounded-lg px-4 py-2"
            style={{ background: '#4CAF50' }}
          >
            Add install date
          </button>
        )}
        {editing && editor}
      </div>
    )
  }

  const conf = CONFIDENCE_LABEL[forecast.confidence]
  const driverText =
    forecast.driver === 'gmax'
      ? `GMAX trend reaches the ASTM F1936 limit (${FORECAST_ASSUMPTIONS.gmaxLimit} G) before typical end of life.`
      : `Typical ${FORECAST_ASSUMPTIONS.typicalLifeYears}-year service life from install date.`

  return (
    <div className={designTokens.components.card + ' p-4 sm:p-6'}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <CalendarClock className="w-5 h-5" style={{ color: '#1F8A8A' }} />
          Replacement Forecast
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${conf.cls}`}>{conf.text}</span>
          {canEdit && !editing && (
            <button
              onClick={() => setEditing(true)}
              aria-label="Edit forecast inputs"
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {forecast.overdue && (
        <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm rounded-lg p-3 mb-4">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            {forecast.latestGmax !== null && forecast.latestGmax >= FORECAST_ASSUMPTIONS.gmaxLimit
              ? 'Latest GMAX exceeds the ASTM F1936 limit. Replacement or remediation should be planned now.'
              : 'This field has reached its projected end of life.'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <CalendarClock className="w-3.5 h-3.5" /> Projected replacement
          </span>
          <p className="text-2xl font-bold text-gray-900">{forecast.projectedReplacementYear}</p>
          <p className="text-xs text-slate-500">
            {forecast.overdue ? 'Now' : `${forecast.remainingLifeYears.toFixed(1)} yrs remaining`}
          </p>
        </div>
        <div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> GMAX trend
          </span>
          <p className="text-2xl font-bold text-gray-900">
            {forecast.gmaxSlopePerYear !== null
              ? `${forecast.gmaxSlopePerYear >= 0 ? '+' : ''}${forecast.gmaxSlopePerYear.toFixed(1)}`
              : '—'}
          </p>
          <p className="text-xs text-slate-500">G per year · {forecast.testsUsed} test{forecast.testsUsed === 1 ? '' : 's'}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> Cost at replacement
          </span>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(forecast.futureReplacementCost)}</p>
          <p className="text-xs text-slate-500">
            {forecast.costSource === 'entered' && 'From entered cost, inflation-adjusted'}
            {forecast.costSource === 'estimated' &&
              `Estimated at $${FORECAST_ASSUMPTIONS.defaultCostPerSqFt}/sq ft`}
            {forecast.costSource === 'none' && 'Add a replacement cost'}
          </p>
        </div>
        <div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <PiggyBank className="w-3.5 h-3.5" /> Annual reserve
          </span>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(forecast.annualReserve)}</p>
          <p className="text-xs text-slate-500">
            {forecast.remainingLifeYears < 1 ? 'Full cost needed within a year' : 'Per year to fund on time'}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-gray-100">
        <span className="font-medium text-slate-600">Driver:</span> {driverText}
        {forecast.gmaxPlanningDate && !forecast.overdue && (
          <>
            {' '}
            Planning threshold ({FORECAST_ASSUMPTIONS.gmaxPlanningThreshold} G) projected for{' '}
            {forecast.gmaxPlanningDate.getFullYear()}.
          </>
        )}{' '}
        Assumes {Math.round(FORECAST_ASSUMPTIONS.annualCostInflation * 100)}% annual cost inflation and
        no funds set aside yet.
      </p>

      {editing && editor}
    </div>
  )
}
