'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, LayoutGrid, List, ChevronRight, Plus } from 'lucide-react'
import { formatDate, formatFieldType } from '@/lib/utils'
import { FIELD_HEALTH_STYLES, type FieldHealthStatus } from '@/lib/field-status'
import { StatusPill } from '@/components/ui/status-pill'
import { EmptyState } from '@/components/ui/empty-state'
import { FieldCard } from './field-card'
import type { FieldWithHealth } from '@/lib/data'

const STATUS_OPTIONS: FieldHealthStatus[] = ['healthy', 'monitor', 'needs_attention', 'critical']

export function FieldsExplorer({
  fields,
  orgSlug,
  defaultView = 'card',
  showCount = true,
}: {
  fields: FieldWithHealth[]
  orgSlug: string
  defaultView?: 'card' | 'table'
  showCount?: boolean
}) {
  const [view, setView] = useState<'card' | 'table'>(defaultView)
  const [search, setSearch] = useState('')
  const [facility, setFacility] = useState('all')
  const [status, setStatus] = useState('all')

  const facilities = useMemo(
    () => Array.from(new Set(fields.map((f) => f.facility).filter((f): f is string => !!f))).sort(),
    [fields]
  )

  const filtered = fields.filter((f) => {
    if (facility !== 'all' && f.facility !== facility) return false
    if (status !== 'all' && f.health !== status) return false
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !(f.facility ?? '').toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {showCount && <span className="text-sm font-bold text-[#0D1B2A] mr-1">{filtered.length} Fields</span>}

        <select
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
        >
          <option value="all">All Facilities</option>
          {facilities.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {FIELD_HEALTH_STYLES[s].label}
            </option>
          ))}
        </select>

        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fields..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
          />
        </div>

        <div className="ml-auto flex items-center gap-1 border border-slate-200 rounded-lg p-1 bg-white">
          <button
            onClick={() => setView('table')}
            className={`p-1.5 rounded-md ${view === 'table' ? 'bg-[#0D1B2A] text-white' : 'text-slate-400 hover:text-slate-600'}`}
            aria-label="Table view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('card')}
            className={`p-1.5 rounded-md ${view === 'card' ? 'bg-[#0D1B2A] text-white' : 'text-slate-400 hover:text-slate-600'}`}
            aria-label="Card view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200">
          <EmptyState
            icon={Plus}
            title={fields.length === 0 ? 'No fields yet' : 'No fields match your filters'}
            message={fields.length === 0 ? 'Fields appear here once they are added.' : 'Try clearing a filter or search term.'}
          />
        </div>
      ) : view === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((f) => (
            <FieldCard key={f.id} field={f} orgSlug={orgSlug} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="px-6 py-3 font-semibold">Field</th>
                <th className="px-6 py-3 font-semibold">Facility</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Last Assessment</th>
                <th className="px-6 py-3 font-semibold">Next Due</th>
                <th className="px-6 py-3 font-semibold text-center">Open Actions</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-6 py-4">
                    <Link href={`/app/${orgSlug}/fields/${f.id}`} className="font-bold text-[#0D1B2A] hover:text-[#1E88E5]">
                      {f.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{f.facility ?? formatFieldType(f.type)}</td>
                  <td className="px-6 py-4">
                    <StatusPill style={FIELD_HEALTH_STYLES[f.health]} />
                  </td>
                  <td className="px-6 py-4 text-slate-600">{f.lastTestingDate ? formatDate(f.lastTestingDate) : '—'}</td>
                  <td className="px-6 py-4 text-slate-600">{f.nextDue ? formatDate(f.nextDue) : '—'}</td>
                  <td className="px-6 py-4 text-center font-semibold text-[#0D1B2A]">{f.openActionsCount}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/app/${orgSlug}/fields/${f.id}`}>
                      <ChevronRight className="w-4 h-4 text-slate-300 inline-block" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
