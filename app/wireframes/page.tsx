'use client'

import { useState } from 'react'
import { FieldDiagram } from '@/components/ui/field-diagram'
import { mockFields, mockTestingData } from '@/lib/mock-data'

const TABS = [
  { id: 'football', label: 'Football Field' },
  { id: 'soccer',   label: 'Soccer Field' },
  { id: 'baseball', label: 'Baseball Field' },
] as const

export default function WireframesPage() {
  const [activeTab, setActiveTab] = useState<'football' | 'soccer' | 'baseball'>('football')

  const footballField  = mockFields.find(f => f.type === 'football')!
  const soccerField    = mockFields.find(f => f.type === 'soccer')!
  const baseballField  = { ...footballField, id: 'baseball-demo', name: 'Varsity Baseball Field', type: 'baseball' as const }

  const footballTesting = mockTestingData.find(t => t.fieldId === footballField.id)
  const soccerTesting   = mockTestingData.find(t => t.fieldId === soccerField.id)

  const activeField = activeTab === 'football' ? footballField
    : activeTab === 'soccer' ? soccerField
    : baseballField

  const activeTesting = activeTab === 'football' ? footballTesting
    : activeTab === 'soccer' ? soccerTesting
    : undefined // baseball uses demo data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">Field Health Systems</div>
            <h1 className="text-2xl font-black text-gray-900">Field Diagram Wireframes</h1>
            <p className="text-sm text-gray-500 mt-1">Testing locations superimposed on accurate field diagrams — hover any marker for readings</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-xs text-amber-700 font-medium">
            Wireframe / Design Preview
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Sport tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Context banner */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 mb-5 flex items-center gap-3 text-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="text-gray-500">
            {activeTab === 'football' && 'American football — 12-point ASTM standard grid across hash marks and yard lines'}
            {activeTab === 'soccer'   && 'Soccer / Association football — 13-point grid covering penalty areas, wings, and center circle'}
            {activeTab === 'baseball' && 'Baseball — 12-point grid covering all infield positions, pitcher\'s mound, and outfield zones'}
          </span>
          <span className="ml-auto text-emerald-600 font-semibold">
            {activeTesting ? 'Live test data' : 'Demo data'}
          </span>
        </div>

        {/* Field diagram — takes up most of the width */}
        <FieldDiagram
          field={activeField}
          testingData={activeTesting}
          className="w-full"
        />

        {/* Notes */}
        <div className="mt-6 grid grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">How test points are positioned</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>Each dot represents one physical test location on the field</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>Football points fall on actual yard lines and hash marks</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>Soccer points align with penalty areas, penalty spots, and center circle</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>Baseball points cover all bases, pitcher&apos;s mound, infield arc, and outfield zones</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>Hover any marker to see all four readings for that location</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Metric toggle behavior</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                <span><strong>GMAX</strong> — primary safety metric, limit 200. Colors the field health risk at a glance</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                <span><strong>HIC</strong> — head injury criterion, limit 1,000. Derived from deceleration curve over time</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                <span><strong>Shear Factor</strong> — rotational resistance in Nm. High values increase ACL risk</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                <span><strong>Infill Depth</strong> — in mm. Falling below 38mm is an early warning of rising GMAX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
