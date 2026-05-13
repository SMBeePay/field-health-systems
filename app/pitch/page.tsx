'use client'

import { useState, useEffect, useCallback } from 'react'

const slides = [
  { id: 'cover' },
  { id: 'risk' },
  { id: 'conflict' },
  { id: 'solution' },
  { id: 'platform' },
  { id: 'platform2' },
  { id: 'insurance' },
  { id: 'pricing' },
  { id: 'ask' },
]

const slideTitles: Record<string, string> = {
  cover: 'Field Health Systems',
  risk: 'The Stakes',
  conflict: 'The Testing Problem',
  solution: 'What We Do',
  platform: 'The Platform — Dashboard',
  platform2: 'The Platform — Field Detail',
  insurance: 'For Risk Managers',
  pricing: 'Pricing',
  ask: 'Next Steps',
}

// ─── App UI mockup components (accurate to real codebase) ───────────────────

function AppShell({ children, org = 'Plano ISD', page = 'Dashboard' }: {
  children: React.ReactNode
  org?: string
  page?: string
}) {
  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-gray-200 shadow-2xl bg-gray-50 text-gray-900 text-xs">
      {/* Sidebar */}
      <div className="w-44 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="font-bold text-emerald-600 text-sm">Field Health</div>
          <div className="text-gray-400 text-xs mt-0.5">{org}</div>
        </div>
        <nav className="flex-1 py-2 px-2 space-y-0.5">
          {[
            { label: 'Dashboard', icon: '▣', active: page === 'Dashboard' },
            { label: 'Fields', icon: '◉', active: page === 'Fields' },
            { label: 'Testing', icon: '◎', active: page === 'Testing' },
            { label: 'Maintenance', icon: '⚙', active: page === 'Maintenance' },
            { label: 'Reports', icon: '◈', active: page === 'Reports' },
            { label: 'Analytics', icon: '◈', active: page === 'Analytics' },
          ].map(({ label, icon, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${
                active
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-xs">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">A</div>
            <div>
              <div className="font-medium text-gray-700" style={{ fontSize: '10px' }}>Athletic Dir.</div>
              <div className="text-gray-400" style={{ fontSize: '9px' }}>plano-isd.edu</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <span className="font-semibold text-gray-800 text-xs">{page}</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs">🔔</div>
            <span className="text-gray-400" style={{ fontSize: '10px' }}>Last tested: Dec 4, 2024</span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    EXCELLENT: 'bg-sky-100 text-sky-700 border-sky-200',
    GOOD: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    MONITOR: 'bg-amber-100 text-amber-700 border-amber-200',
    CRITICAL: 'bg-red-100 text-red-700 border-red-200',
  }
  return (
    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full border ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  )
}

function DashboardMockup() {
  const fields = [
    { name: 'Senior HS Varsity Football', type: 'Football', gmax: 188, status: 'CRITICAL', last: 'Nov 15, 2024' },
    { name: 'Williams MS Football', type: 'Football', gmax: 162, status: 'MONITOR', last: 'Nov 18, 2024' },
    { name: 'Clark HS Varsity Football', type: 'Football', gmax: 134, status: 'GOOD', last: 'Dec 1, 2024' },
    { name: 'Plano East Soccer Complex', type: 'Soccer', gmax: 98, status: 'EXCELLENT', last: 'Dec 4, 2024' },
    { name: 'Junior HS Lacrosse Field', type: 'Multi-Use', gmax: 145, status: 'GOOD', last: 'Nov 28, 2024' },
  ]

  return (
    <AppShell org="Plano ISD" page="Dashboard">
      <div className="space-y-3">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-2 mb-1">
          {[
            { label: 'Total Fields', value: '8', sub: 'Plano ISD' },
            { label: 'Critical', value: '1', sub: 'Needs attention', color: 'text-red-600' },
            { label: 'Monitor', value: '2', sub: 'Watch closely', color: 'text-amber-600' },
            { label: 'Compliant', value: '5', sub: 'ASTM F1936', color: 'text-emerald-600' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-white rounded-lg border border-gray-200 p-2.5">
              <div className="text-gray-500" style={{ fontSize: '9px' }}>{label}</div>
              <div className={`text-xl font-black mt-0.5 ${color ?? 'text-gray-800'}`}>{value}</div>
              <div className="text-gray-400" style={{ fontSize: '9px' }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Field list */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700" style={{ fontSize: '10px' }}>Field Status</span>
            <span className="text-gray-400" style={{ fontSize: '9px' }}>Sorted by risk</span>
          </div>
          {fields.map(({ name, type, gmax, status, last }) => (
            <div key={name} className="flex items-center gap-3 px-3 py-2 border-b border-gray-50 hover:bg-gray-50">
              <div
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  status === 'CRITICAL' ? 'bg-red-500' :
                  status === 'MONITOR' ? 'bg-amber-500' :
                  status === 'GOOD' ? 'bg-emerald-500' : 'bg-sky-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate" style={{ fontSize: '10px' }}>{name}</div>
                <div className="text-gray-400" style={{ fontSize: '9px' }}>{type} · Last tested {last}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-mono font-bold text-gray-600" style={{ fontSize: '10px' }}>G{gmax}</span>
                <StatusPill status={status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

function FieldDetailMockup() {
  const readings = [62, 58, 188, 59, 185, 64, 57, 182, 63, 66, 180, 62]

  return (
    <AppShell org="Plano ISD" page="Fields">
      <div className="grid grid-cols-5 gap-3 h-full">
        {/* Left — field info */}
        <div className="col-span-2 space-y-2">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-bold text-gray-800" style={{ fontSize: '11px' }}>Senior HS Varsity Football</div>
                <div className="text-gray-400" style={{ fontSize: '9px' }}>FieldTurf Revolution 360 · Installed 2020</div>
              </div>
              <StatusPill status="CRITICAL" />
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {[
                { label: 'GMAX Avg', value: '188', warn: true },
                { label: 'ASTM Limit', value: '200', warn: false },
                { label: 'Infill Depth', value: '1.4"', warn: true },
                { label: 'Last Tested', value: 'Nov 15', warn: false },
              ].map(({ label, value, warn }) => (
                <div key={label} className="bg-gray-50 rounded px-2 py-1.5">
                  <div className="text-gray-400" style={{ fontSize: '8px' }}>{label}</div>
                  <div className={`font-bold ${warn ? 'text-red-600' : 'text-gray-700'}`} style={{ fontSize: '12px' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert card */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5">
            <div className="text-red-700 font-semibold" style={{ fontSize: '9px' }}>⚡ Maintenance Alert</div>
            <div className="text-red-600 mt-1" style={{ fontSize: '9px' }}>
              GMAX readings in NE quadrant exceeding 180. Field requires priority inspection before next scheduled event (Dec 12).
            </div>
          </div>

          {/* Compliance */}
          <div className="bg-white rounded-lg border border-gray-200 p-2.5">
            <div className="font-semibold text-gray-700 mb-1.5" style={{ fontSize: '9px' }}>ASTM F1936 Compliance</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 rounded-full" style={{ width: '94%' }} />
              </div>
              <span className="text-red-600 font-bold" style={{ fontSize: '9px' }}>188/200</span>
            </div>
            <div className="text-gray-400" style={{ fontSize: '8px' }}>12 G-units from ASTM failure threshold</div>
          </div>
        </div>

        {/* Right — heat map + readings */}
        <div className="col-span-3 space-y-2">
          {/* GMAX heat map */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="font-semibold text-gray-700 mb-2" style={{ fontSize: '10px' }}>GMAX Reading Map — 12-Point Grid</div>
            <div className="relative bg-emerald-900/10 rounded border border-emerald-200 overflow-hidden" style={{ height: '110px' }}>
              {/* Field lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-1 opacity-20">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="border-t border-emerald-600 border-dashed mx-2" />
                ))}
              </div>
              {/* Reading dots */}
              <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-1">
                {readings.map((r, i) => {
                  const color = r >= 180 ? 'bg-red-500 text-white' : r >= 160 ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'
                  return (
                    <div
                      key={i}
                      className={`${color} rounded-full flex items-center justify-center font-bold shadow`}
                      style={{ fontSize: '8px' }}
                    >
                      {r}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex gap-3 mt-1.5">
              {[
                { color: 'bg-red-500', label: '≥180 Critical' },
                { color: 'bg-amber-400', label: '160–179 Monitor' },
                { color: 'bg-emerald-500', label: '<160 Good' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-gray-400" style={{ fontSize: '8px' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent tests table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700" style={{ fontSize: '10px' }}>Testing History</span>
            </div>
            {[
              { date: 'Nov 15, 2024', tech: 'S. Johnson, ASTF', gmax: 188, result: 'FAIL', color: 'text-red-600' },
              { date: 'Aug 12, 2024', tech: 'M. Davis, ASTF', gmax: 171, result: 'WARN', color: 'text-amber-600' },
              { date: 'Apr 8, 2024', tech: 'S. Johnson, ASTF', gmax: 154, result: 'PASS', color: 'text-emerald-600' },
            ].map(({ date, tech, gmax, result, color }) => (
              <div key={date} className="flex items-center px-3 py-1.5 border-b border-gray-50 gap-3">
                <span className="text-gray-500 w-20 flex-shrink-0" style={{ fontSize: '9px' }}>{date}</span>
                <span className="text-gray-400 flex-1" style={{ fontSize: '9px' }}>{tech}</span>
                <span className="font-mono font-bold text-gray-600" style={{ fontSize: '9px' }}>G{gmax}</span>
                <span className={`font-bold ${color}`} style={{ fontSize: '9px' }}>{result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

// ─── Slides ──────────────────────────────────────────────────────────────────

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium mb-8">
          Texas Independent GMAX Testing
        </div>
        <h1 className="text-7xl font-black text-white mb-4 tracking-tight">
          Field Health
          <span className="text-emerald-400"> Systems</span>
        </h1>
        <p className="text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Independent GMAX testing and compliance software for artificial turf fields —
          with <span className="text-white font-medium">zero conflicts of interest</span>.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-8 text-center max-w-xl mx-auto">
        {[
          { icon: '🏟️', label: 'ASTM F1936 Certified Testing' },
          { icon: '⚖️', label: 'Independent — No Installer Ties' },
          { icon: '📊', label: 'Compliance Software Platform' },
        ].map(({ icon, label }) => (
          <div key={label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-slate-300 text-sm">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RiskSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-10">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">The Stakes</div>
        <h2 className="text-5xl font-black text-white mb-4">When a field fails,<br />districts pay.</h2>
        <p className="text-slate-400 text-lg max-w-xl">
          ASTM F1936 sets the safety standard. A GMAX reading above 200 means the field is no longer
          safe for play — and no longer defensible in court.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            icon: '⚠️',
            title: 'GMAX > 200',
            desc: 'ASTM F1936 failure threshold. Every G-unit above 165 increases concussion risk measurably. Most fields are never tested — so no one knows where they stand.',
            color: 'border-red-500/40 bg-red-500/5',
            badge: 'Safety Limit',
            badgeColor: 'bg-red-500/20 text-red-400',
          },
          {
            icon: '⚖️',
            title: 'Duty of Care',
            desc: 'Districts have a documented legal duty to maintain safe playing surfaces. Undocumented fields leave athletic directors and administrators personally exposed.',
            color: 'border-amber-500/40 bg-amber-500/5',
            badge: 'Legal Exposure',
            badgeColor: 'bg-amber-500/20 text-amber-400',
          },
          {
            icon: '📋',
            title: 'No Paper Trail',
            desc: 'A plaintiff\'s attorney will ask: "When did you last test this field?" Without independent records, you have no answer. A PDF from your installer is not independent.',
            color: 'border-slate-600/60 bg-slate-800/40',
            badge: 'Litigation Risk',
            badgeColor: 'bg-slate-600/30 text-slate-400',
          },
        ].map(({ icon, title, desc, color, badge, badgeColor }) => (
          <div key={title} className={`rounded-2xl border ${color} p-6`}>
            <div className="text-3xl mb-4">{icon}</div>
            <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${badgeColor}`}>{badge}</div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-slate-800/60 border border-slate-700 rounded-xl px-6 py-4 flex items-center gap-4">
        <div className="text-2xl">🏫</div>
        <p className="text-slate-300 text-sm">
          Texas has <span className="text-white font-semibold">thousands of artificial turf fields</span> across its school districts.
          Most have no documented independent testing program — and no compliance record to show their insurer.
        </p>
      </div>
    </div>
  )
}

function ConflictSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-10">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">The Testing Problem</div>
        <h2 className="text-5xl font-black text-white mb-4">
          Who is testing<br />your fields right now?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Most fields are either <span className="text-white font-medium">not tested at all</span>, or tested by
          the same contractor who built or maintains them — which could create a conflict of interest
          your insurer cannot ignore.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
          <div className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-4">Common Scenario</div>
          <div className="space-y-3">
            {[
              { step: '1', label: 'Installer builds the field' },
              { step: '2', label: 'Installer also offers testing services' },
              { step: '3', label: 'Installer earns maintenance revenue' },
              { step: '4', label: 'Results may be influenced by that relationship' },
            ].map(({ step, label }) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">{step}</div>
                <div className="text-slate-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-amber-500/20">
            <p className="text-amber-400 text-sm font-medium">
              ⚡ When the same company builds, tests, and maintains — objectivity is hard to guarantee
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8">
          <div className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4">Field Health Systems</div>
          <div className="space-y-3">
            {[
              { step: '✓', label: 'We test fields we did not build' },
              { step: '✓', label: 'We sell no maintenance or construction services' },
              { step: '✓', label: 'We earn the same fee whether a field passes or fails' },
              { step: '✓', label: 'Our only product is an accurate, independent result' },
            ].map(({ step, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">{step}</div>
                <div className="text-slate-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-emerald-500/20">
            <p className="text-emerald-400 text-sm font-medium">
              ✅ Zero financial stake in outcomes = results insurers and administrators can stand behind
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-10">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">What We Do</div>
        <h2 className="text-5xl font-black text-white mb-4">
          Certified testing.<br />Permanent records.<br />Full compliance.
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            icon: '📏',
            title: 'GMAX Testing',
            items: [
              'ASTM F1936 certified protocol',
              '12-point field grid minimum',
              'GMAX, shear, and infill depth',
              'Same-day preliminary results',
            ],
          },
          {
            icon: '📊',
            title: 'Compliance Reports',
            items: [
              'Insurance-grade documentation',
              'Technician name + credentials',
              'Weather conditions logged',
              'PDF + permanent digital record',
            ],
          },
          {
            icon: '🔔',
            title: 'Platform & Alerts',
            items: [
              'Field health dashboard',
              'Year-over-year trend data',
              'Pre-failure alert system',
              'Insurer-ready report access',
            ],
          },
        ].map(({ icon, title, items }) => (
          <div key={title} className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="text-slate-400 text-sm flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {[
          { label: 'Visits / Field / Year', value: '4' },
          { label: 'Avg. Test Duration', value: '2–3 hrs' },
          { label: 'Report Turnaround', value: '24 hrs' },
          { label: 'Standard', value: 'ASTM F1936' },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl bg-slate-800/60 border border-slate-700 p-4 text-center">
            <div className="text-2xl font-black text-emerald-400">{value}</div>
            <div className="text-slate-400 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlatformSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-6">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-2">The Platform</div>
        <h2 className="text-4xl font-black text-white mb-1">Every field. One dashboard.</h2>
        <p className="text-slate-400 text-base">Real-time health status, compliance history, and automated alerts — sorted by risk so the most urgent issues surface first.</p>
      </div>
      <div className="flex-1 min-h-0" style={{ height: '340px' }}>
        <DashboardMockup />
      </div>
      <div className="mt-4 flex items-center gap-6 text-slate-400 text-sm">
        <span>→ <span className="text-white">Sorted by risk</span> — highest GMAX at top</span>
        <span>→ <span className="text-white">1-click compliance reports</span> for any field</span>
        <span>→ <span className="text-white">Role-based access</span> for ADs, risk managers, and insurers</span>
      </div>
    </div>
  )
}

function Platform2Slide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-6">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-2">The Platform — Field Detail</div>
        <h2 className="text-4xl font-black text-white mb-1">The GMAX 188 moment.</h2>
        <p className="text-slate-400 text-base">
          This is a real demo field — 12 G-units from the ASTM failure limit. The platform surfaces this automatically,
          flags it for re-test, and generates documentation before anyone has to ask.
        </p>
      </div>
      <div className="flex-1 min-h-0" style={{ height: '340px' }}>
        <FieldDetailMockup />
      </div>
      <div className="mt-4 flex items-center gap-6 text-slate-400 text-sm">
        <span>→ <span className="text-white">Heat map</span> shows which zones are high-risk</span>
        <span>→ <span className="text-white">Full test history</span> with technician credentials on every record</span>
        <span>→ <span className="text-white">Automated alert</span> sent to AD before next scheduled game</span>
      </div>
    </div>
  )
}

function InsuranceSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-10">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">For Risk Managers</div>
        <h2 className="text-5xl font-black text-white mb-4">
          The documentation<br />your underwriters need.
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          When a claim is filed, the question is always &ldquo;what did you know, and when did you know it?&rdquo;
          FHS gives you a defensible answer.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            {
              icon: '🏛️',
              title: 'TASB Risk Management Fund',
              desc: 'Covers 1,000+ member ISDs across Texas. A preferred partner relationship converts the entire member network from cold prospect to warm referral.',
              tag: 'Primary Target',
              tagColor: 'bg-emerald-500/20 text-emerald-400',
            },
            {
              icon: '🎓',
              title: 'United Educators',
              desc: 'Serves premium Texas districts. Independent testing documentation directly supports their underwriting requirements for turf field coverage.',
              tag: 'Secondary Target',
              tagColor: 'bg-sky-500/20 text-sky-400',
            },
            {
              icon: '🤝',
              title: 'Regional Brokers',
              desc: 'Epic Insurance, Hotchkiss, and regional specialists. Commission-based referral structure — FHS pays per enrolled district.',
              tag: 'Partnership Channel',
              tagColor: 'bg-violet-500/20 text-violet-400',
            },
          ].map(({ icon, title, desc, tag, tagColor }) => (
            <div key={title} className="flex gap-4 rounded-xl border border-slate-700 bg-slate-800/40 p-5">
              <div className="text-2xl flex-shrink-0">{icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">{title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor}`}>{tag}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
          <div className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-6">What FHS Provides Insurers</div>
          <div className="space-y-5">
            {[
              { label: 'Timestamped test records', sub: 'Every test logged with technician, weather, and GPS coordinates' },
              { label: 'Chain of custody documentation', sub: 'Who tested, when, with what equipment, calibration certifications' },
              { label: 'Trend analysis', sub: 'Year-over-year GMAX trajectory shows proactive risk management' },
              { label: 'Pre-injury documentation', sub: 'If a claim is filed, the district already has a documented record' },
              { label: 'Insurer portal access', sub: 'Direct read-only access for underwriters and risk managers' },
            ].map(({ label, sub }) => (
              <div key={label} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{label}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-10">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">Pricing</div>
        <h2 className="text-5xl font-black text-white mb-4">Simple. Predictable. Defensible.</h2>
        <p className="text-slate-400 text-lg">Annual contracts. Four visits per field per year. Platform included.</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            name: 'Standard',
            price: '$2,500',
            per: 'per field / year',
            desc: '1–2 fields',
            features: ['4 GMAX test visits', 'ASTM F1936 compliance reports', 'Field Health dashboard access', '24-hr report turnaround', 'Email + phone support'],
            highlight: false,
          },
          {
            name: 'District',
            price: '$2,000',
            per: 'per field / year',
            desc: '6–10 fields',
            features: ['Everything in Standard', 'Priority scheduling', 'Athletic Director dashboard', 'Annual field health summary', 'Dedicated account rep'],
            highlight: true,
          },
          {
            name: 'Enterprise',
            price: '$1,750',
            per: 'per field / year',
            desc: '11+ fields',
            features: ['Everything in District', 'Insurer portal access', 'Custom compliance reports', 'Board presentation materials', 'Risk manager briefings'],
            highlight: false,
          },
        ].map(({ name, price, per, desc, features, highlight }) => (
          <div
            key={name}
            className={`rounded-2xl border p-7 relative ${
              highlight
                ? 'border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20'
                : 'border-slate-700 bg-slate-800/40'
            }`}
          >
            {highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <div className="text-slate-400 text-sm font-semibold mb-1">{name}</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-black text-white">{price}</span>
            </div>
            <div className="text-slate-500 text-xs mb-1">{per}</div>
            <div className="text-emerald-400 text-xs font-medium mb-5">{desc}</div>
            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="text-slate-400 text-sm flex items-start gap-2">
                  <span className="text-emerald-400 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-8 text-slate-400 text-sm">
        <span>+ <span className="text-white font-medium">$200/field/year</span> for advanced platform features</span>
        <span>·</span>
        <span>Volume pricing available for multi-district contracts</span>
      </div>
    </div>
  )
}

function AskSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-20">
      <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-6">Next Steps</div>
      <h2 className="text-6xl font-black text-white mb-6 max-w-3xl leading-tight">
        Let&apos;s protect your fields —
        and your district.
      </h2>
      <p className="text-slate-400 text-xl max-w-2xl mb-12 leading-relaxed">
        Start with a free pilot test on one field. We&apos;ll deliver a full ASTM-compliant report,
        show you exactly where your risk is, and let the data make the case.
      </p>
      <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mb-12">
        {[
          { step: '1', label: 'Schedule a pilot test', sub: 'One field, free, no obligation' },
          { step: '2', label: 'Review your report', sub: 'Full ASTM F1936 compliance documentation' },
          { step: '3', label: 'Enroll your district', sub: 'Annual contract, all fields covered' },
        ].map(({ step, label, sub }) => (
          <div key={step} className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm mx-auto mb-3">{step}</div>
            <div className="text-white font-semibold text-sm mb-1">{label}</div>
            <div className="text-slate-500 text-xs">{sub}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-8 text-slate-300">
        <div>
          <div className="text-emerald-400 font-bold">fieldhealthsystems.com</div>
          <div className="text-slate-500 text-xs">Live platform demo available</div>
        </div>
        <div className="w-px h-8 bg-slate-700" />
        <div>
          <div className="text-white font-bold">demo@fieldhealthsystems.com</div>
          <div className="text-slate-500 text-xs">Platform login for this presentation</div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide registry ───────────────────────────────────────────────────────────

const slideComponents: Record<string, React.ComponentType> = {
  cover: CoverSlide,
  risk: RiskSlide,
  conflict: ConflictSlide,
  solution: SolutionSlide,
  platform: PlatformSlide,
  platform2: Platform2Slide,
  insurance: InsuranceSlide,
  pricing: PricingSlide,
  ask: AskSlide,
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export default function PitchDeck() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const SlideComponent = slideComponents[slides[current].id]

  return (
    <div className="fixed inset-0 bg-slate-950 text-white overflow-hidden select-none">
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <SlideComponent />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-slate-950/80 border-t border-slate-800/60 backdrop-blur-sm">
        <div className="text-slate-500 text-sm">
          <span className="text-slate-300 font-semibold">Field Health Systems</span>
          <span className="mx-2">·</span>
          <span>{slideTitles[slides[current].id]}</span>
        </div>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'bg-emerald-400 w-6' : 'bg-slate-700 hover:bg-slate-500 w-2'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="px-4 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>
          <span className="text-slate-600 text-sm">{current + 1} / {slides.length}</span>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="px-4 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
