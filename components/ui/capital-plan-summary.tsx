'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PiggyBank, CalendarClock, AlertTriangle } from 'lucide-react'
import { designTokens } from '@/lib/design-tokens'
import { formatCurrency } from '@/lib/capital-forecast'

interface PlanRow {
  id: string
  name: string
  forecast: {
    projectedReplacementYear: number
    remainingLifeYears: number
    annualReserve: number | null
    futureReplacementCost: number | null
    driver: 'gmax' | 'age'
    overdue: boolean
  } | null
}

interface PlanTotals {
  fields: number
  forecasted: number
  missingInstallDate: number
  annualReserve: number
  futureReplacementCost: number
  dueWithin3Years: number
  overdue: number
}

export function CapitalPlanSummary() {
  const [rows, setRows] = useState<PlanRow[]>([])
  const [totals, setTotals] = useState<PlanTotals | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/capital-plan')
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
        if (!cancelled) {
          setRows(data.rows ?? [])
          setTotals(data.totals ?? null)
        }
      })
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className={designTokens.components.card + ' p-6 h-48 animate-pulse'} />
  }
  if (error || !totals || totals.fields === 0) return null

  return (
    <div className={designTokens.components.card + ' p-4 sm:p-6'}>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className={designTokens.typography.heading.h2 + ' flex items-center gap-2'}>
          <PiggyBank className="w-5 h-5" style={{ color: '#1F8A8A' }} />
          Capital Plan
        </h2>
        <span className="text-xs text-slate-500">
          Based on install dates and independent GMAX test history
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-xs text-slate-500">Annual reserve needed</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(totals.annualReserve)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total future replacement</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(totals.futureReplacementCost)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Due within 3 years</p>
          <p className="text-xl font-bold text-gray-900">{totals.dueWithin3Years}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Past end of life</p>
          <p className={`text-xl font-bold ${totals.overdue > 0 ? 'text-red-600' : 'text-gray-900'}`}>
            {totals.overdue}
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {rows.map((r) => (
          <Link
            key={r.id}
            href={`/fields/${r.id}`}
            className="flex items-center justify-between py-3 gap-3 hover:bg-slate-50 -mx-2 px-2 rounded-lg"
          >
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate">{r.name}</p>
              <p className="text-xs text-slate-500">
                {r.forecast
                  ? r.forecast.driver === 'gmax'
                    ? 'Driven by GMAX trend'
                    : 'Driven by field age'
                  : 'Add install date to forecast'}
              </p>
            </div>
            {r.forecast ? (
              <div className="text-right shrink-0">
                <p
                  className={`font-semibold flex items-center justify-end gap-1 ${r.forecast.overdue ? 'text-red-600' : 'text-gray-900'}`}
                >
                  {r.forecast.overdue && <AlertTriangle className="w-4 h-4" />}
                  <CalendarClock className="w-4 h-4 text-slate-400" />
                  {r.forecast.projectedReplacementYear}
                </p>
                <p className="text-xs text-slate-500">{formatCurrency(r.forecast.annualReserve)}/yr</p>
              </div>
            ) : (
              <span className="text-xs text-slate-400 shrink-0">—</span>
            )}
          </Link>
        ))}
      </div>

      {totals.missingInstallDate > 0 && (
        <p className="text-xs text-slate-500 mt-4">
          {totals.missingInstallDate} field{totals.missingInstallDate === 1 ? '' : 's'} missing an install
          date and not included in totals.
        </p>
      )}
    </div>
  )
}
