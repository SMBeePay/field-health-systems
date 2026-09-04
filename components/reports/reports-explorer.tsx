'use client'

import { useMemo, useState } from 'react'
import { Search, Download, Eye, FileStack } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { COMPLIANCE_STATUS_STYLES } from '@/lib/field-status'
import { StatusPill } from '@/components/ui/status-pill'
import { EmptyState } from '@/components/ui/empty-state'
import type { ComplianceStatus } from '@prisma/client'

export interface ReportRow {
  id: string
  title: string
  fieldName: string
  facility: string | null
  issuedDate: Date
  reportType: string
  status: ComplianceStatus
  reportDocument: string | null
}

export function ReportsExplorer({ reports, emptyMessage }: { reports: ReportRow[]; emptyMessage: string }) {
  const [search, setSearch] = useState('')
  const [field, setField] = useState('all')
  const [year, setYear] = useState('all')

  const fields = useMemo(() => Array.from(new Set(reports.map((r) => r.fieldName))).sort(), [reports])
  const years = useMemo(
    () => Array.from(new Set(reports.map((r) => r.issuedDate.getFullYear().toString()))).sort((a, b) => Number(b) - Number(a)),
    [reports]
  )

  const filtered = reports.filter((r) => {
    if (field !== 'all' && r.fieldName !== field) return false
    if (year !== 'all' && r.issuedDate.getFullYear().toString() !== year) return false
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.fieldName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select value={field} onChange={(e) => setField(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700">
          <option value="all">All Fields</option>
          {fields.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700">
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
          />
        </div>

        <button className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <Download className="w-4 h-4" />
          Export List
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        {filtered.length === 0 ? (
          <EmptyState icon={FileStack} title={reports.length === 0 ? 'Nothing here yet' : 'No matches'} message={reports.length === 0 ? emptyMessage : 'Try clearing a filter or search term.'} />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="px-6 py-3 font-semibold">Report</th>
                <th className="px-6 py-3 font-semibold">Field</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-6 py-4 font-bold text-[#0D1B2A]">{r.title}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {r.facility ? `${r.facility} · ` : ''}
                    {r.fieldName}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{formatDate(r.issuedDate)}</td>
                  <td className="px-6 py-4 text-slate-600">{r.reportType}</td>
                  <td className="px-6 py-4">
                    <StatusPill style={COMPLIANCE_STATUS_STYLES[r.status]} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {r.reportDocument ? (
                        <>
                          <a href={r.reportDocument} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#1E88E5] font-semibold hover:underline">
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </a>
                          <a href={r.reportDocument} download className="inline-flex items-center gap-1 text-[#1E88E5] font-semibold hover:underline">
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        </>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
