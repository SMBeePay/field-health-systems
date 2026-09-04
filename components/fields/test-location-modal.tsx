'use client'

import { X, Image as ImageIcon, Plus } from 'lucide-react'
import {
  METRIC_STATUS_STYLES,
  METRIC_THRESHOLDS,
  getMetricStatus,
  getVisualStatus,
  VISUAL_CONDITION_LABELS,
} from '@/lib/field-status'
import { StatusPill } from '@/components/ui/status-pill'
import { FieldMap } from './field-map'
import type { TestLocation } from '@/lib/test-points'

export function TestLocationModal({
  location,
  allLocations,
  fieldName,
  facilityName,
  canAddNote = false,
  onAddNote,
  onClose,
}: {
  location: TestLocation
  allLocations: TestLocation[]
  fieldName: string
  facilityName?: string | null
  canAddNote?: boolean
  onAddNote?: () => void
  onClose: () => void
}) {
  const gmaxStatus = getMetricStatus('gmax', location.gmax)
  const infillStatus = getMetricStatus('infillDepth', location.infillDepth)
  const shearStatus = getMetricStatus('shear', location.shear)
  const visualStatus = getVisualStatus(location.visualCondition)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white flex items-start justify-between px-6 py-5 border-b border-slate-100 z-10">
          <div>
            <h2 className="text-lg font-bold text-[#0D1B2A]">Test Location {location.index}</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {facilityName ? `${facilityName} - ` : ''}
              {fieldName}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Test Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MetricRow label={METRIC_THRESHOLDS.gmax.label} value={location.gmax} status={gmaxStatus} target={`${METRIC_THRESHOLDS.gmax.min}-${METRIC_THRESHOLDS.gmax.max}`} />
              <MetricRow
                label={METRIC_THRESHOLDS.infillDepth.label}
                value={`${location.infillDepth}"`}
                status={infillStatus}
                target={`${METRIC_THRESHOLDS.infillDepth.min}"-${METRIC_THRESHOLDS.infillDepth.max}"`}
              />
              <MetricRow label={METRIC_THRESHOLDS.shear.label} value={location.shear} status={shearStatus} target={`${METRIC_THRESHOLDS.shear.min}-${METRIC_THRESHOLDS.shear.max}`} />
              <MetricRow
                label="Visual Condition"
                value={VISUAL_CONDITION_LABELS[location.visualCondition]}
                status={visualStatus}
                target={visualStatus === 'within' ? 'No major issues' : 'Follow-up recommended'}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Photos</h3>
            <div className="flex gap-3">
              {Array.from({ length: Math.max(location.photoCount ?? 0, 0) || 3 }).map((_, i) => (
                <div key={i} className="w-20 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          {location.notes && (
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">Notes</h3>
              <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">{location.notes}</p>
              <p className="text-xs text-slate-400 mt-2">
                Tested by: {location.testedBy ?? 'Field Health Systems'}
                {location.testedDate ? ` · ${location.testedDate}` : ''}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Location on Field</h3>
            <FieldMap locations={allLocations} selectedIndex={location.index} size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Components</h4>
              <p className="text-sm text-slate-600">Lat: {location.lat?.toFixed(4) ?? '—'}</p>
              <p className="text-sm text-slate-600">Lng: {location.lng?.toFixed(4) ?? '—'}</p>
            </div>
            <div className="flex flex-col items-end justify-start">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Actions</h4>
              {canAddNote && (
                <button
                  onClick={onAddNote}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Plus className="w-4 h-4" />
                  Add Note
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricRow({
  label,
  value,
  status,
  target,
}: {
  label: string
  value: string | number
  status: keyof typeof METRIC_STATUS_STYLES
  target: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <StatusPill style={METRIC_STATUS_STYLES[status]} />
      </div>
      <div className="text-xl font-bold text-[#0D1B2A] mt-1">{value}</div>
      <div className="text-xs text-slate-400">Target {target}</div>
    </div>
  )
}
