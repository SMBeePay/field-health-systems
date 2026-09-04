'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Download, Image as ImageIcon } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import {
  ASSESSMENT_STATUS_STYLES,
  METRIC_STATUS_STYLES,
  getMetricStatus,
  getVisualStatus,
  VISUAL_CONDITION_LABELS,
  type AssessmentStatus,
} from '@/lib/field-status'
import type { TestLocation } from '@/lib/test-points'
import { StatusPill } from '@/components/ui/status-pill'
import { FieldMap } from '@/components/fields/field-map'
import { MetricSummaryCard } from '@/components/fields/metric-summary-card'
import { TestLocationModal } from '@/components/fields/test-location-modal'

export function AssessmentDetailClient({
  orgSlug,
  fieldId,
  fieldName,
  facility,
  testingDate,
  testingTechnician,
  gmaxAverage,
  shearAverage,
  infillDepthAverage,
  overallStatus,
  locations,
}: {
  orgSlug: string
  fieldId: string
  fieldName: string
  facility: string | null
  testingDate: Date
  testingTechnician: string
  gmaxAverage: number
  shearAverage: number
  infillDepthAverage: number
  overallStatus: AssessmentStatus
  locations: TestLocation[]
}) {
  const [selectedLocation, setSelectedLocation] = useState<TestLocation | null>(null)
  const totalPoints = 10
  const completedPoints = locations.length || totalPoints

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
        <Link href={`/app/${orgSlug}/fields`} className="hover:text-[#1E88E5]">
          Fields
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/app/${orgSlug}/fields/${fieldId}`} className="hover:text-[#1E88E5]">
          {fieldName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0D1B2A] font-medium">Assessment</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1B2A]">Assessment Detail</h1>
          <p className="text-sm text-slate-500 mt-1">
            {facility ? `${facility} · ` : ''}
            {fieldName} · {formatDate(testingDate)}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm font-semibold transition-colors">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-[#0D1B2A]">Field Assessment</h2>
          <p className="text-sm text-slate-500 mt-0.5">Conducted by Field Health Systems · Technician: {testingTechnician}</p>
        </div>
        <div className="flex items-center gap-4">
          <StatusPill style={ASSESSMENT_STATUS_STYLES[overallStatus]} />
          <span className="text-sm text-slate-500">
            {completedPoints} of {totalPoints} locations complete
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <FieldMap locations={locations} onSelect={(i) => setSelectedLocation(locations.find((l) => l.index === i) ?? null)} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-[#0D1B2A] mb-4">Assessment Summary</h2>
          <div className="space-y-3">
            <MetricSummaryCard label="GMAX Average" value={gmaxAverage} status={getMetricStatus('gmax', gmaxAverage)} target="100-200" />
            <MetricSummaryCard label="Infill Depth" value={`${infillDepthAverage}"`} status={getMetricStatus('infillDepth', infillDepthAverage)} target='1.0"-2.0"' />
            <MetricSummaryCard label="Shear / Traction" value={shearAverage} status={getMetricStatus('shear', shearAverage)} target="50-120" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-[#0D1B2A]">Test Locations</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="px-6 py-3 font-semibold">Location</th>
              <th className="px-6 py-3 font-semibold">GMAX</th>
              <th className="px-6 py-3 font-semibold">Infill</th>
              <th className="px-6 py-3 font-semibold">Shear</th>
              <th className="px-6 py-3 font-semibold">Visual</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Photos</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => {
              const status = getMetricStatus('gmax', loc.gmax)
              const visualStatus = getVisualStatus(loc.visualCondition)
              const worst = [status, getMetricStatus('infillDepth', loc.infillDepth), getMetricStatus('shear', loc.shear), visualStatus].includes('critical')
                ? 'critical'
                : [status, getMetricStatus('infillDepth', loc.infillDepth), getMetricStatus('shear', loc.shear), visualStatus].includes('monitor')
                  ? 'monitor'
                  : 'within'
              return (
                <tr key={loc.index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 cursor-pointer" onClick={() => setSelectedLocation(loc)}>
                  <td className="px-6 py-4 font-bold text-[#0D1B2A]">{loc.index}</td>
                  <td className="px-6 py-4 text-slate-600">{loc.gmax}</td>
                  <td className="px-6 py-4 text-slate-600">{loc.infillDepth}&quot;</td>
                  <td className="px-6 py-4 text-slate-600">{loc.shear}</td>
                  <td className="px-6 py-4 text-slate-600">{VISUAL_CONDITION_LABELS[loc.visualCondition]}</td>
                  <td className="px-6 py-4">
                    <StatusPill style={METRIC_STATUS_STYLES[worst]} />
                  </td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                    {loc.photoCount ?? 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-300 inline-block" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selectedLocation && (
        <TestLocationModal
          location={selectedLocation}
          allLocations={locations}
          fieldName={fieldName}
          facilityName={facility}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  )
}
