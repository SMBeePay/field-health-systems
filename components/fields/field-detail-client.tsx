'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin as MapPinIcon, Calendar } from 'lucide-react'
import { formatDate, formatFieldType } from '@/lib/utils'
import {
  FIELD_HEALTH_STYLES,
  ASSESSMENT_STATUS_STYLES,
  getMetricStatus,
  type FieldHealthStatus,
  type AssessmentStatus,
} from '@/lib/field-status'
import { parseTestLocations, type TestLocation } from '@/lib/test-points'
import { StatusPill } from '@/components/ui/status-pill'
import { FieldMap } from './field-map'
import { MetricSummaryCard } from './metric-summary-card'
import { TestLocationModal } from './test-location-modal'
import { EmptyState } from '@/components/ui/empty-state'
import { startAssessment } from '@/lib/actions/assessments'
import { Plus } from 'lucide-react'

interface AssessmentSummary {
  id: string
  testingDate: Date
  testingTechnician: string
  gmaxAverage: number
  shearAverage: number
  infillDepthAverage: number
  overallStatus: AssessmentStatus
  testingLocations: unknown
}

export function FieldDetailClient({
  orgSlug,
  fieldId,
  fieldName,
  facility,
  fieldType,
  health,
  latitude,
  longitude,
  assessments,
  canCreateAssessment = false,
}: {
  orgSlug: string
  fieldId: string
  fieldName: string
  facility: string | null
  fieldType: string
  health: FieldHealthStatus
  latitude: number | null
  longitude: number | null
  assessments: AssessmentSummary[]
  canCreateAssessment?: boolean
}) {
  const boundStartAssessment = startAssessment.bind(null, orgSlug, fieldId)
  const [tab, setTab] = useState<'overview' | 'assessments' | 'testdata' | 'map'>('overview')
  const [selectedLocation, setSelectedLocation] = useState<TestLocation | null>(null)

  const latest = assessments[0]
  const locations: TestLocation[] = latest ? parseTestLocations(latest.testingLocations) : []

  const gmaxStatus = latest ? getMetricStatus('gmax', latest.gmaxAverage) : null
  const shearStatus = latest ? getMetricStatus('shear', latest.shearAverage) : null
  const infillStatus = latest ? getMetricStatus('infillDepth', latest.infillDepthAverage) : null

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
        <Link href={`/app/${orgSlug}/fields`} className="hover:text-[#1E88E5]">
          Fields
        </Link>
        {facility && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{facility}</span>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0D1B2A] font-medium">{fieldName}</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1B2A]">{fieldName}</h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
            <MapPinIcon className="w-3.5 h-3.5" />
            {facility ?? formatFieldType(fieldType)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill style={FIELD_HEALTH_STYLES[health]} />
          {canCreateAssessment && (
            <form action={boundStartAssessment}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Assessment
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
        {(
          [
            ['overview', 'Overview'],
            ['assessments', 'Assessments'],
            ['testdata', 'Test Data'],
            ['map', 'Map'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === key ? 'border-[#1E88E5] text-[#1E88E5]' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-6">
          {latest ? (
            <>
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-[#0D1B2A]">Test Locations</h2>
                  <Link href={`/app/${orgSlug}/assessments/${latest.id}`} className="text-sm font-semibold text-[#1E88E5] hover:underline">
                    View Assessment
                  </Link>
                </div>
                <FieldMap locations={locations} onSelect={(i) => setSelectedLocation(locations.find((l) => l.index === i) ?? null)} />
              </div>

              <div>
                <h2 className="font-bold text-[#0D1B2A] mb-3">Field Health Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MetricSummaryCard label="GMAX" value={latest.gmaxAverage} status={gmaxStatus!} target="100-200" />
                  <MetricSummaryCard label="Infill Depth" value={`${latest.infillDepthAverage}"`} status={infillStatus!} target='1.0"-2.0"' />
                  <MetricSummaryCard label="Shear / Traction" value={latest.shearAverage} status={shearStatus!} target="50-120" />
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200">
              <EmptyState title="No assessments yet" message="Test results appear here once a technician completes an assessment." />
            </div>
          )}
        </div>
      )}

      {(tab === 'assessments' || tab === 'testdata') && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
          {assessments.length === 0 ? (
            <EmptyState icon={Calendar} title="No assessments yet" message="Assessment history appears here once testing begins." />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Technician</th>
                  <th className="px-6 py-3 font-semibold">GMAX</th>
                  <th className="px-6 py-3 font-semibold">Infill</th>
                  <th className="px-6 py-3 font-semibold">Shear</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-semibold text-[#0D1B2A]">{formatDate(a.testingDate)}</td>
                    <td className="px-6 py-4 text-slate-600">{a.testingTechnician}</td>
                    <td className="px-6 py-4 text-slate-600">{a.gmaxAverage}</td>
                    <td className="px-6 py-4 text-slate-600">{a.infillDepthAverage}&quot;</td>
                    <td className="px-6 py-4 text-slate-600">{a.shearAverage}</td>
                    <td className="px-6 py-4">
                      <StatusPill style={ASSESSMENT_STATUS_STYLES[a.overallStatus]} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/app/${orgSlug}/assessments/${a.id}`} className="text-[#1E88E5] font-semibold hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'map' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-[#0D1B2A] mb-4">Field Location</h2>
          {locations.length > 0 && <FieldMap locations={locations} className="mb-4" />}
          <div className="text-sm text-slate-600">
            <p>
              Lat: {latitude?.toFixed(4) ?? '—'} · Lng: {longitude?.toFixed(4) ?? '—'}
            </p>
          </div>
        </div>
      )}

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
