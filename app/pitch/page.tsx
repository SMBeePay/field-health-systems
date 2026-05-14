'use client'

import { useState, useEffect, useCallback } from 'react'
import { FieldDiagram } from '@/components/ui/field-diagram'

// ─── Pitch-deck field stubs (typed as any — display only) ────────────────────

const PITCH_FOOTBALL = { id: 'pitch-fb', name: 'Senior HS Varsity Football', type: 'football', status: 'monitor' } as any
const PITCH_SOCCER   = { id: 'pitch-sc', name: 'Plano East Soccer Complex',  type: 'soccer',   status: 'good'    } as any
const PITCH_BASEBALL = { id: 'pitch-bb', name: 'Varsity Baseball Complex',   type: 'baseball', status: 'good'    } as any

// Custom test data for pitch — tells a story: mostly good, critical cluster in south end zone
const PITCH_FOOTBALL_DATA = {
  fieldId: 'pitch-fb',
  testingDate: new Date('2024-11-15'),
  testingTechnician: 'S. Johnson — ASTM F1936 Protocol',
  weatherConditions: 'Clear, 68°F',
  temperature: 68,
  gmaxReadings: [112, 178, 167, 105, 173, 95, 88, 188, 192, 196, 162, 108],
  gmaxAverage: 155,
  gmaxStatus: 'monitor',
  shearReadings: [22, 34, 31, 24, 32, 21, 20, 37, 39, 41, 30, 24],
  shearAverage: 30,
  shearStatus: 'good',
  infillDepthReadings: [44, 29, 32, 46, 31, 47, 48, 27, 25, 23, 33, 45],
  infillDepthAverage: 36,
  infillDepthStatus: 'monitor',
  overallStatus: 'monitor',
  testingLocations: [
    { id: 'p1',  name: 'N Goal Line — Center',  zone: 'Goal Line',     position: { x: 0.5,  y: 0.083 }, gmaxReading: 112, shearReading: 22, infillDepthReading: 44 },
    { id: 'p2',  name: 'N 25-Yd — Left Hash',   zone: 'North Quarter', position: { x: 0.33, y: 0.292 }, gmaxReading: 178, shearReading: 34, infillDepthReading: 29 },
    { id: 'p3',  name: 'N 25-Yd — Right Hash',  zone: 'North Quarter', position: { x: 0.67, y: 0.292 }, gmaxReading: 167, shearReading: 31, infillDepthReading: 32 },
    { id: 'p4',  name: 'N 40-Yd — Center',      zone: 'North Third',   position: { x: 0.5,  y: 0.417 }, gmaxReading: 105, shearReading: 24, infillDepthReading: 46 },
    { id: 'p5',  name: '50-Yd — Left Hash',     zone: 'Midfield',      position: { x: 0.33, y: 0.500 }, gmaxReading: 173, shearReading: 32, infillDepthReading: 31 },
    { id: 'p6',  name: '50-Yd — Center',        zone: 'Midfield',      position: { x: 0.5,  y: 0.500 }, gmaxReading: 95,  shearReading: 21, infillDepthReading: 47 },
    { id: 'p7',  name: '50-Yd — Right Hash',    zone: 'Midfield',      position: { x: 0.67, y: 0.500 }, gmaxReading: 88,  shearReading: 20, infillDepthReading: 48 },
    { id: 'p8',  name: 'S 40-Yd — Center',      zone: 'South Third',   position: { x: 0.5,  y: 0.583 }, gmaxReading: 188, shearReading: 37, infillDepthReading: 27 },
    { id: 'p9',  name: 'S 25-Yd — Left Hash',   zone: 'South Quarter', position: { x: 0.33, y: 0.708 }, gmaxReading: 192, shearReading: 39, infillDepthReading: 25 },
    { id: 'p10', name: 'S 25-Yd — Right Hash',  zone: 'South Quarter', position: { x: 0.67, y: 0.708 }, gmaxReading: 196, shearReading: 41, infillDepthReading: 23 },
    { id: 'p11', name: 'S 10-Yd — Center',      zone: 'South Goal Area',position:{ x: 0.5,  y: 0.833 }, gmaxReading: 162, shearReading: 30, infillDepthReading: 33 },
    { id: 'p12', name: 'S Goal Line — Center',  zone: 'Goal Line',     position: { x: 0.5,  y: 0.917 }, gmaxReading: 108, shearReading: 24, infillDepthReading: 45 },
  ],
} as any

// ─── Flat SVG icons ───────────────────────────────────────────────────────────

function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    clipboard: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    bell: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    truck: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    grid: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    person: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    document: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    warning: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    scale: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    arrow: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    handshake: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    monitor: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    wrench: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  }
  return <>{icons[name] ?? null}</>
}

// ─── App UI mockup (accurate to real codebase) ───────────────────────────────

function AppShell({ children, page = 'Dashboard' }: { children: React.ReactNode; page?: string }) {
  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-gray-200 shadow-2xl bg-gray-50 text-gray-900 text-xs">
      <div className="w-44 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="font-bold text-emerald-600 text-sm">Field Health</div>
          <div className="text-gray-400 text-xs mt-0.5">Plano ISD</div>
        </div>
        <nav className="flex-1 py-2 px-2 space-y-0.5">
          {['Dashboard', 'Fields', 'Testing', 'Maintenance', 'Reports', 'Analytics'].map((label) => (
            <div key={label} className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${label === page ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-500'}`}>
              <div className="w-3 h-3 rounded-sm border border-current opacity-60" />
              <span>{label}</span>
            </div>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">A</div>
            <div>
              <div className="font-medium text-gray-700" style={{ fontSize: '10px' }}>Athletic Dir.</div>
              <div className="text-gray-400" style={{ fontSize: '9px' }}>plano-isd.edu</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <span className="font-semibold text-gray-800 text-xs">{page}</span>
          <span className="text-gray-400" style={{ fontSize: '10px' }}>Last tested: Dec 4, 2024</span>
        </div>
        <div className="flex-1 overflow-hidden p-4">{children}</div>
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
  return <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full border ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>{status}</span>
}

function DashboardMockup() {
  const fields = [
    { name: 'Senior HS Varsity Football', type: 'Football', score: 32, status: 'CRITICAL', last: 'Nov 15, 2024' },
    { name: 'Williams MS Football', type: 'Football', score: 57, status: 'MONITOR', last: 'Nov 18, 2024' },
    { name: 'Junior HS Lacrosse Field', type: 'Multi-Use', score: 68, status: 'GOOD', last: 'Nov 28, 2024' },
    { name: 'Clark HS Varsity Football', type: 'Football', score: 76, status: 'GOOD', last: 'Dec 1, 2024' },
    { name: 'Plano East Soccer Complex', type: 'Soccer', score: 91, status: 'EXCELLENT', last: 'Dec 4, 2024' },
  ]
  return (
    <AppShell page="Dashboard">
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
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
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700" style={{ fontSize: '10px' }}>Fields — Sorted by Field Health Score</span>
            <span className="text-gray-400" style={{ fontSize: '9px' }}>Score = GMAX + HIC + Shear + Infill</span>
          </div>
          {fields.map(({ name, type, score, status, last }) => (
            <div key={name} className="flex items-center gap-3 px-3 py-2 border-b border-gray-50">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'CRITICAL' ? 'bg-red-500' : status === 'MONITOR' ? 'bg-amber-500' : status === 'GOOD' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate" style={{ fontSize: '10px' }}>{name}</div>
                <div className="text-gray-400" style={{ fontSize: '9px' }}>{type} · Last tested {last}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`font-bold tabular-nums ${status === 'CRITICAL' ? 'text-red-600' : status === 'MONITOR' ? 'text-amber-600' : status === 'GOOD' ? 'text-emerald-700' : 'text-sky-600'}`} style={{ fontSize: '10px' }}>{score}/100</span>
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
    <AppShell page="Fields">
      <div className="grid grid-cols-5 gap-3 h-full">
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
                { label: 'HIC Score', value: '912', warn: true },
                { label: 'Shear Factor', value: '24 Nm', warn: false },
                { label: 'Infill Depth', value: '1.4"', warn: true },
              ].map(({ label, value, warn }) => (
                <div key={label} className="bg-gray-50 rounded px-2 py-1.5">
                  <div className="text-gray-400" style={{ fontSize: '8px' }}>{label}</div>
                  <div className={`font-bold ${warn ? 'text-red-600' : 'text-gray-700'}`} style={{ fontSize: '12px' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5">
            <div className="text-red-700 font-semibold" style={{ fontSize: '9px' }}>Maintenance Alert</div>
            <div className="text-red-600 mt-1" style={{ fontSize: '9px' }}>GMAX and HIC readings in NE quadrant near limits. Priority inspection recommended before Dec 12 game.</div>
          </div>
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
        <div className="col-span-3 space-y-2">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="font-semibold text-gray-700 mb-2" style={{ fontSize: '10px' }}>GMAX Reading Map — 12-Point Grid</div>
            <div className="relative bg-emerald-900/10 rounded border border-emerald-200 overflow-hidden" style={{ height: '110px' }}>
              <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-1">
                {readings.map((r, i) => {
                  const color = r >= 180 ? 'bg-red-500 text-white' : r >= 160 ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'
                  return (
                    <div key={i} className={`${color} rounded-full flex items-center justify-center font-bold shadow`} style={{ fontSize: '8px' }}>{r}</div>
                  )
                })}
              </div>
            </div>
            <div className="flex gap-3 mt-1.5">
              {[{ color: 'bg-red-500', label: '≥180 Critical' }, { color: 'bg-amber-400', label: '160–179 Monitor' }, { color: 'bg-emerald-500', label: '<160 Good' }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-gray-400" style={{ fontSize: '8px' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700" style={{ fontSize: '10px' }}>Testing History</span>
            </div>
            {[
              { date: 'Nov 15, 2024', tech: 'S. Johnson, ASTF Cert.', gmax: 188, hic: 912, result: 'WARN', color: 'text-red-600' },
              { date: 'Aug 12, 2024', tech: 'M. Davis, ASTF Cert.', gmax: 171, hic: 820, result: 'WARN', color: 'text-amber-600' },
              { date: 'Apr 8, 2024', tech: 'S. Johnson, ASTF Cert.', gmax: 154, hic: 741, result: 'PASS', color: 'text-emerald-600' },
            ].map(({ date, tech, gmax, hic, result, color }) => (
              <div key={date} className="flex items-center px-3 py-1.5 border-b border-gray-50 gap-2">
                <span className="text-gray-500 w-20 flex-shrink-0" style={{ fontSize: '9px' }}>{date}</span>
                <span className="text-gray-400 flex-1" style={{ fontSize: '9px' }}>{tech}</span>
                <span className="font-mono text-gray-600" style={{ fontSize: '9px' }}>G{gmax}</span>
                <span className="font-mono text-gray-600" style={{ fontSize: '9px' }}>HIC {hic}</span>
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
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium mb-8">
        Texas Independent Field Testing
      </div>
      <h1 className="text-7xl font-black text-white mb-4 tracking-tight">
        Field Health<span className="text-emerald-400"> Systems</span>
      </h1>
      <p className="text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-12">
        We come to your field. We test it. We give you the documentation and software to manage it — independently, with no conflicts of interest.
      </p>
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto w-full">
        {[
          { icon: 'truck', label: 'On-Site Field Testing', sub: 'Trained technicians, ASTM F1936 protocol' },
          { icon: 'shield', label: 'Independent Results', sub: 'Zero installer ties or conflicts' },
          { icon: 'monitor', label: 'Compliance Software', sub: 'Records, history, maintenance alerts' },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 text-center">
            <div className="flex justify-center text-emerald-400 mb-3">
              <Icon name={icon} className="w-7 h-7" />
            </div>
            <div className="text-white font-semibold text-sm mb-1">{label}</div>
            <div className="text-slate-500 text-xs">{sub}</div>
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
          ASTM F1936 is the federal safety standard for artificial turf. Most Texas fields have no documented independent test on record — leaving athletic directors and administrators exposed.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            icon: 'warning',
            title: 'GMAX > 200',
            desc: 'ASTM F1936 failure threshold. A field above this limit is no longer certifiable as safe for play. Most fields are never tested — so no one knows where they stand.',
            color: 'border-red-500/40 bg-red-500/5',
            badge: 'Safety Limit',
            badgeColor: 'bg-red-500/20 text-red-400',
            iconColor: 'text-red-400',
          },
          {
            icon: 'scale',
            title: 'Duty of Care',
            desc: 'Districts have a documented legal obligation to maintain safe playing surfaces. Without independent test records, that obligation is unmet and undefended.',
            color: 'border-amber-500/40 bg-amber-500/5',
            badge: 'Legal Exposure',
            badgeColor: 'bg-amber-500/20 text-amber-400',
            iconColor: 'text-amber-400',
          },
          {
            icon: 'document',
            title: 'No Independent Record',
            desc: 'A plaintiff\'s attorney will ask: "When did you last have this field independently tested?" A report from your installer is not an independent answer.',
            color: 'border-slate-600/60 bg-slate-800/40',
            badge: 'Litigation Risk',
            badgeColor: 'bg-slate-600/30 text-slate-400',
            iconColor: 'text-slate-400',
          },
        ].map(({ icon, title, desc, color, badge, badgeColor, iconColor }) => (
          <div key={title} className={`rounded-2xl border ${color} p-6`}>
            <div className={`${iconColor} mb-4`}><Icon name={icon} className="w-8 h-8" /></div>
            <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${badgeColor}`}>{badge}</div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-slate-800/60 border border-slate-700 rounded-xl px-6 py-4 flex items-center gap-4">
        <div className="text-slate-400 flex-shrink-0"><Icon name="building" className="w-6 h-6" /></div>
        <p className="text-slate-300 text-sm">
          Texas has <span className="text-white font-semibold">thousands of artificial turf fields</span> across its school districts. Most have no documented independent testing program and no compliance record on file with their insurer.
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
        <h2 className="text-5xl font-black text-white mb-4">Who is testing<br />your fields right now?</h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Most fields are either <span className="text-white font-medium">not tested at all</span>, or tested by the same contractor who built or maintains them —
          which could create a conflict of interest your insurer cannot ignore.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
          <div className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-5">Common Scenario</div>
          <div className="space-y-4">
            {[
              'Installer builds the field',
              'Installer also offers testing services',
              'Installer earns ongoing maintenance revenue',
              'Test results may be influenced by that relationship',
            ].map((label, i) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                <div className="text-slate-300 text-sm pt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-amber-500/20 text-amber-400 text-sm">
            When the same company builds, tests, and maintains — objectivity is hard to guarantee.
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8">
          <div className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-5">Field Health Systems</div>
          <div className="space-y-4">
            {[
              'We test fields we did not build',
              'We sell no maintenance or construction services',
              'We earn the same fee whether a field passes or fails',
              'Our only product is an accurate, independent result',
            ].map((label) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <Icon name="check" className="w-3 h-3" />
                </div>
                <div className="text-slate-300 text-sm pt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-emerald-500/20 text-emerald-400 text-sm">
            Zero financial stake in outcomes — results administrators and insurers can stand behind.
          </div>
        </div>
      </div>
    </div>
  )
}

function TestingProcessSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-8">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">How We Test</div>
        <h2 className="text-5xl font-black text-white mb-3">We come to your field.<br />Here is what happens.</h2>
        <p className="text-slate-400 text-lg max-w-2xl">Our certified technicians conduct a full on-site evaluation using a calibrated missile drop device across a standardized 12-point grid — producing a complete ASTM F1936 compliance record.</p>
      </div>

      {/* Steps */}
      <div className="flex items-start gap-4 mb-10">
        {[
          { icon: 'calendar', step: '01', label: 'Schedule', desc: 'We coordinate a visit around your game calendar — 4 times per year per field.' },
          { icon: 'truck', step: '02', label: 'Arrive On-Site', desc: 'A certified ASTF technician arrives with calibrated testing equipment.' },
          { icon: 'grid', step: '03', label: 'Test the Grid', desc: 'Minimum 12 points across the field using a standardized location protocol.' },
          { icon: 'clipboard', step: '04', label: 'Report & Upload', desc: 'Full results delivered within 24 hours and synced to your dashboard.' },
        ].map(({ icon, step, label, desc }, i, arr) => (
          <div key={step} className="flex items-start gap-4 flex-1">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Icon name={icon} className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <div className="text-emerald-400 text-xs font-bold mb-0.5">{step}</div>
              <div className="text-white font-bold text-sm mb-1">{label}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{desc}</div>
            </div>
            {i < arr.length - 1 && (
              <div className="text-slate-700 pt-2.5 flex-shrink-0">
                <Icon name="arrow" className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Measurements */}
      <div className="border-t border-slate-800 pt-6">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">What We Measure at Every Test Point</div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            {
              label: 'GMAX',
              full: 'Peak G-Force',
              limit: 'Limit: 200g',
              desc: 'Measures the maximum deceleration force on impact — a key indicator of concussion risk. ASTM F1936 requires GMAX below 200 at every test point.',
              color: 'border-red-500/30 bg-red-500/5',
              badge: 'text-red-400',
            },
            {
              label: 'HIC',
              full: 'Head Injury Criterion',
              limit: 'Limit: 1,000',
              desc: 'A calculated score that integrates the deceleration curve over time. Directly correlated to traumatic brain injury risk — stricter than GMAX alone.',
              color: 'border-amber-500/30 bg-amber-500/5',
              badge: 'text-amber-400',
            },
            {
              label: 'Shear Factor',
              full: 'Rotational Resistance',
              limit: 'Target: < 25 Nm',
              desc: 'Measures how much rotational force the surface applies to a cleat. High shear increases ACL and knee injury risk — especially relevant for soccer and football.',
              color: 'border-violet-500/30 bg-violet-500/5',
              badge: 'text-violet-400',
            },
            {
              label: 'Infill Depth',
              full: 'Fiber & Infill Levels',
              limit: 'Per manufacturer spec',
              desc: 'Low infill is the leading cause of rising GMAX. We measure depth at every point to identify where the surface is compressing and proactive maintenance is needed.',
              color: 'border-sky-500/30 bg-sky-500/5',
              badge: 'text-sky-400',
            },
          ].map(({ label, full, limit, desc, color, badge }) => (
            <div key={label} className={`rounded-xl border ${color} p-4`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-black text-base ${badge}`}>{label}</span>
                <span className={`text-xs font-semibold ${badge} opacity-70`}>{limit}</span>
              </div>
              <div className="text-slate-500 text-xs mb-2">{full}</div>
              <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3 flex items-center gap-4">
          <div className="text-emerald-400 flex-shrink-0"><Icon name="chart" className="w-5 h-5" /></div>
          <p className="text-slate-300 text-sm">
            All four measurements feed into our proprietary <span className="text-emerald-400 font-bold">Field Health Score</span> — a single composite indicator that determines each field&apos;s status:&nbsp;
            <span className="text-sky-400 font-semibold">EXCELLENT</span>, <span className="text-emerald-400 font-semibold">GOOD</span>, <span className="text-amber-400 font-semibold">MONITOR</span>, or <span className="text-red-400 font-semibold">CRITICAL</span>.
            No single metric tells the whole story — the score combines them all.
          </p>
        </div>
      </div>
    </div>
  )
}

function PlatformSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-6">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-2">The Software Platform</div>
        <h2 className="text-4xl font-black text-white mb-2">Test results don&apos;t live in a PDF.</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          After every visit, results are uploaded to your district dashboard — giving you a permanent, searchable record of every test, every technician, and every field across your entire campus.
          Fields are ranked by their <span className="text-emerald-400 font-semibold">Field Health Score</span>, a composite of GMAX, HIC, Shear Factor, and Infill Depth, so you always know which field needs attention first.
        </p>
      </div>
      <div className="flex-1 min-h-0" style={{ height: '320px' }}>
        <DashboardMockup />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {[
          { icon: 'chart', label: 'Historical trending', sub: 'Track Field Health Scores season over season' },
          { icon: 'bell', label: 'Automated alerts', sub: 'Notified before readings reach critical levels' },
          { icon: 'shield', label: 'Insurer portal access', sub: 'Risk managers get direct read-only access' },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="flex items-start gap-3 bg-slate-800/40 border border-slate-700 rounded-xl p-3">
            <div className="text-emerald-400 flex-shrink-0 mt-0.5"><Icon name={icon} className="w-5 h-5" /></div>
            <div>
              <div className="text-white text-sm font-semibold">{label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Platform2Slide() {
  return (
    <div className="flex h-full px-16 gap-8 items-center">
      {/* Left: diagram */}
      <div className="w-56 flex-shrink-0">
        <FieldDiagram
          field={PITCH_FOOTBALL}
          testingData={PITCH_FOOTBALL_DATA}
          maxDiagramHeight="420px"
        />
      </div>

      {/* Right: narrative */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">Field Detail View</div>
        <h2 className="text-5xl font-black text-white mb-4 leading-tight">
          Every test point.<br />Mapped to the exact spot.
        </h2>
        <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
          The south end zone on this field has three readings above 185 — all trending toward the ASTM limit of 200.
          The platform surfaced it in November, six weeks before the December playoffs.
        </p>
        <div className="space-y-4">
          {[
            {
              icon: 'grid',
              label: 'Hot zones visible at a glance',
              sub: 'Red markers cluster where infill has compacted and GMAX is rising. No spreadsheet required.',
            },
            {
              icon: 'wrench',
              label: 'Target maintenance exactly',
              sub: 'Crews work the south end zone — not the whole field. Data-driven, not guesswork.',
            },
            {
              icon: 'document',
              label: 'Every reading on the record',
              sub: 'Technician name, date, GPS coordinates, equipment calibration certificate — all attached.',
            },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                <Icon name={icon} className="w-4 h-4" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-0.5">{label}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MultiSportSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-16">
      <div className="mb-6">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-2">Every Field Type</div>
        <h2 className="text-4xl font-black text-white mb-2">Football. Soccer. Baseball.<br />Every surface you manage.</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          The same independent testing protocol and Field Health Score applies across every sport and every surface —
          whether your district has two fields or twenty.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5 flex-1 min-h-0" style={{ maxHeight: '400px' }}>
        {[
          {
            field: PITCH_FOOTBALL,
            data: PITCH_FOOTBALL_DATA,
            caption: '12-point grid — yard lines & hash marks',
          },
          {
            field: PITCH_SOCCER,
            data: undefined,
            caption: '13-point grid — penalty areas, wings, center',
          },
          {
            field: PITCH_BASEBALL,
            data: undefined,
            caption: '12-point grid — bases, mound, outfield zones',
          },
        ].map(({ field, data, caption }) => (
          <div key={field.id} className="flex flex-col gap-2 min-h-0">
            <FieldDiagram
              field={field}
              testingData={data}
              maxDiagramHeight="300px"
              className="flex-1 min-h-0"
            />
            <p className="text-center text-slate-500 text-xs">{caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SafetyInvestmentSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-8">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">Why It Matters</div>
        <h2 className="text-5xl font-black text-white mb-3">Protect your athletes.<br />Protect your investment.</h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Independent testing isn&apos;t just about being defensible if something goes wrong. It&apos;s about catching problems before they become injuries — and before they become expensive.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {/* Athlete safety */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Icon name="person" className="w-5 h-5" />
            </div>
            <div className="text-emerald-400 font-bold text-base uppercase tracking-wide">Student Athlete Safety</div>
          </div>
          <div className="space-y-4">
            {[
              {
                label: 'GMAX is a concussion predictor',
                sub: 'Research links rising GMAX scores directly to increased head impact severity. A field trending toward 200 is not a safe field — even if it has never technically failed.',
              },
              {
                label: 'Students play hundreds of hours per year',
                sub: 'Practices, games, and PE classes add up fast. Cumulative exposure on a degraded surface compounds risk in ways a single incident report never shows.',
              },
              {
                label: 'Proactive vs. reactive',
                sub: 'Finding a GMAX of 188 in November is a chance to act before the December playoffs. Finding out after an athlete is hurt is a different conversation entirely.',
              },
              {
                label: 'Districts have a duty to know',
                sub: 'You cannot manage a risk you are not measuring. Regular independent testing is how you demonstrate that student safety is actively monitored — not assumed.',
              },
            ].map(({ label, sub }) => (
              <div key={label} className="flex gap-3">
                <div className="w-1 rounded-full bg-emerald-500/40 flex-shrink-0 self-stretch" />
                <div>
                  <div className="text-white text-sm font-semibold mb-0.5">{label}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Turf investment */}
        <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Icon name="wrench" className="w-5 h-5" />
            </div>
            <div className="text-sky-400 font-bold text-base uppercase tracking-wide">Turf Investment Protection</div>
          </div>
          <div className="space-y-4">
            {[
              {
                label: 'A turf field is a $500K–$1.2M asset',
                sub: 'Most districts finance or bond for turf installation. That investment deserves the same monitoring discipline as any other major capital asset.',
              },
              {
                label: 'Low infill is the silent killer',
                sub: 'Infill compacts and migrates over time. When depth drops below spec, GMAX rises — often without any visible sign on the surface. Testing catches this early.',
              },
              {
                label: 'Scheduled maintenance vs. unplanned emergency',
                sub: 'Infill issues caught early through regular testing are budgeted, scheduled work. Caught after a critical reading spike — or after an athlete is hurt — they become unplanned emergency capital expenses.',
              },
              {
                label: 'Data-driven maintenance scheduling',
                sub: 'The platform shows which zones are wearing fastest, so maintenance crews work where it matters — not just wherever they happen to start.',
              },
            ].map(({ label, sub }) => (
              <div key={label} className="flex gap-3">
                <div className="w-1 rounded-full bg-sky-500/40 flex-shrink-0 self-stretch" />
                <div>
                  <div className="text-white text-sm font-semibold mb-0.5">{label}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InsuranceSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <div className="mb-8">
        <div className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">For Risk Managers</div>
        <h2 className="text-5xl font-black text-white mb-3">The documentation<br />your underwriters need.</h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          When a claim is filed, the question is always &ldquo;what did you know, and when did you know it?&rdquo;
          FHS gives you a complete, timestamped, independent record — before anyone has to ask for it.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {[
          {
            icon: 'document',
            title: 'Chain of Custody',
            desc: 'Every test record includes technician name, calibrated equipment ID, date, weather conditions, and GPS coordinates. Nothing is left to memory or a spreadsheet.',
          },
          {
            icon: 'chart',
            title: 'Trend Documentation',
            desc: 'Year-over-year GMAX and HIC trajectories show underwriters that the district is actively monitoring — not discovering problems after the fact.',
          },
          {
            icon: 'shield',
            title: 'Independent Standing',
            desc: 'Because FHS has no financial relationship with the field installer or maintenance contractor, our records carry the credibility that a self-reported test cannot.',
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
            <div className="text-emerald-400 mb-3"><Icon name={icon} className="w-6 h-6" /></div>
            <div className="text-white font-bold text-sm mb-2">{title}</div>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
          <div className="text-slate-300 text-sm font-semibold mb-3">What a complete FHS record includes</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {[
              'GMAX readings — all 12+ test points',
              'HIC scores at every location',
              'Shear factor measurements',
              'Infill depth by zone',
              'Technician credentials on file',
              'Equipment calibration certificate',
              'Weather and surface temperature',
              'Signed compliance declaration',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-slate-400 text-xs">
                <div className="text-emerald-400 flex-shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3" /></div>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="text-emerald-400 text-sm font-semibold mb-3">Insurer portal access</div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Risk managers and underwriters can be granted direct read-only access to a district&apos;s full testing history — no email requests, no waiting for a PDF.
            Every report is available the moment it is uploaded.
          </p>
          <div className="border-t border-emerald-500/20 pt-4">
            <p className="text-slate-400 text-xs leading-relaxed">
              For districts that carry turf field coverage, an active independent testing program is the single strongest indicator of proactive risk management — and the clearest argument against negligence in the event of a claim.
            </p>
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
        <p className="text-slate-400 text-lg">Annual contracts. Four on-site visits per field per year. Platform included.</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            name: 'Standard',
            price: '$2,500',
            per: 'per field / year',
            desc: '1–2 fields',
            features: ['4 on-site testing visits', 'GMAX, HIC, shear, infill depth', 'ASTM F1936 compliance reports', 'Field Health dashboard access', '24-hr report turnaround'],
            highlight: false,
          },
          {
            name: 'District',
            price: '$2,000',
            per: 'per field / year',
            desc: '6–10 fields',
            features: ['Everything in Standard', 'Priority scheduling', 'Athletic Director dashboard', 'Year-over-year trend reports', 'Dedicated account rep'],
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
          <div key={name} className={`rounded-2xl border p-7 relative ${highlight ? 'border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20' : 'border-slate-700 bg-slate-800/40'}`}>
            {highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
            )}
            <div className="text-slate-400 text-sm font-semibold mb-1">{name}</div>
            <div className="text-4xl font-black text-white mb-1">{price}</div>
            <div className="text-slate-500 text-xs mb-1">{per}</div>
            <div className="text-emerald-400 text-xs font-medium mb-5">{desc}</div>
            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="text-slate-400 text-sm flex items-start gap-2">
                  <div className="text-emerald-400 flex-shrink-0 mt-0.5"><Icon name="check" className="w-3.5 h-3.5" /></div>
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
        Let&apos;s protect your fields — and your district.
      </h2>
      <p className="text-slate-400 text-xl max-w-2xl mb-12 leading-relaxed">
        Start with a free pilot test on one field. We&apos;ll come out, run the full ASTM protocol, and deliver a complete compliance report — no obligation.
      </p>
      <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mb-12">
        {[
          { icon: 'calendar', step: '1', label: 'Schedule a pilot test', sub: 'One field, free, no obligation' },
          { icon: 'clipboard', step: '2', label: 'Review your report', sub: 'Full ASTM F1936 compliance documentation' },
          { icon: 'shield', step: '3', label: 'Enroll your district', sub: 'Annual contract, all fields covered' },
        ].map(({ icon, step, label, sub }) => (
          <div key={step} className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
              <Icon name={icon} className="w-4 h-4" />
            </div>
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

// ─── Registry & shell ─────────────────────────────────────────────────────────

const slides = [
  { id: 'cover' },
  { id: 'risk' },
  { id: 'conflict' },
  { id: 'testing' },
  { id: 'safety' },
  { id: 'platform' },
  { id: 'platform2' },
  { id: 'multisport' },
  { id: 'insurance' },
  { id: 'pricing' },
  { id: 'ask' },
]

const slideTitles: Record<string, string> = {
  cover: 'Field Health Systems',
  risk: 'The Stakes',
  conflict: 'The Testing Problem',
  testing: 'How We Test',
  safety: 'Athletes & Investment',
  platform: 'The Software Platform',
  platform2: 'Field Detail View',
  multisport: 'Every Field Type',
  insurance: 'For Risk Managers',
  pricing: 'Pricing',
  ask: 'Next Steps',
}

const slideComponents: Record<string, React.ComponentType> = {
  cover: CoverSlide,
  risk: RiskSlide,
  conflict: ConflictSlide,
  testing: TestingProcessSlide,
  safety: SafetyInvestmentSlide,
  platform: PlatformSlide,
  platform2: Platform2Slide,
  multisport: MultiSportSlide,
  insurance: InsuranceSlide,
  pricing: PricingSlide,
  ask: AskSlide,
}

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
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-slate-950/80 border-t border-slate-800/60 backdrop-blur-sm">
        <div className="text-slate-500 text-sm">
          <span className="text-slate-300 font-semibold">Field Health Systems</span>
          <span className="mx-2">·</span>
          <span>{slideTitles[slides[current].id]}</span>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? 'bg-emerald-400 w-6' : 'bg-slate-700 hover:bg-slate-500 w-2'}`} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={prev} disabled={current === 0} className="px-4 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            ← Prev
          </button>
          <span className="text-slate-600 text-sm">{current + 1} / {slides.length}</span>
          <button onClick={next} disabled={current === slides.length - 1} className="px-4 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
