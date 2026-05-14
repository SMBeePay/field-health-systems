'use client'

import { useState } from 'react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = {
  navy:       '#12324A',
  navyLight:  '#1a4466',
  navyDark:   '#0d2438',
  teal:       '#1F8A8A',
  tealLight:  '#2aabab',
  tealDark:   '#166868',
  green:      '#4CAF50',
  greenLight: '#66BB6A',
  greenDark:  '#388E3C',
  bg:         '#F7FAFC',
  slate:      '#334155',
  slateLight: '#64748b',
  white:      '#ffffff',
}

// ─── Mini icon set ────────────────────────────────────────────────────────────
function Ico({ path, size = 18, color = 'currentColor' }: { path: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  )
}
const ICONS = {
  grid:    'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z',
  fields:  'M9 20.75L3.75 12 9 3.25M15 3.25L20.25 12 15 20.75',
  test:    'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15',
  maint:   'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63',
  reports: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12',
  settings:'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  bell:    'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
  check:   'M4.5 12.75l6 6 9-13.5',
  warning: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  arrow:   'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
  shield:  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  chart:   'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
}

// ─── Status config ────────────────────────────────────────────────────────────
function StatusBadge({ s }: { s: 'EXCELLENT' | 'GOOD' | 'MONITOR' | 'CRITICAL' }) {
  const cfg = {
    EXCELLENT: { bg: '#EAFBEA', text: '#2E7D32', dot: B.green },
    GOOD:      { bg: '#E0F5F5', text: B.tealDark, dot: B.teal },
    MONITOR:   { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
    CRITICAL:  { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' },
  }[s]
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
      {s}
    </span>
  )
}

// ─── App Shell Mockup ─────────────────────────────────────────────────────────
function AppShellMockup({ children, activePage = 'Dashboard' }: { children: React.ReactNode; activePage?: string }) {
  const navItems = [
    { label: 'Dashboard',   icon: ICONS.grid },
    { label: 'Fields',      icon: ICONS.fields },
    { label: 'Testing',     icon: ICONS.test },
    { label: 'Maintenance', icon: ICONS.maint },
    { label: 'Reports',     icon: ICONS.reports },
    { label: 'Settings',    icon: ICONS.settings },
  ]

  return (
    <div className="flex rounded-2xl overflow-hidden shadow-2xl" style={{ height: '560px', border: `1px solid #E2E8F0` }}>
      {/* Sidebar */}
      <div className="flex flex-col flex-shrink-0 w-52" style={{ backgroundColor: B.navy }}>
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: B.green }}>
              <Ico path={ICONS.shield} size={14} color="white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Field Health</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Systems</div>
            </div>
          </div>
        </div>

        {/* Org picker */}
        <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 cursor-pointer"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
            <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: B.teal, color: 'white' }}>P</div>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>Plano ISD</span>
            <span className="ml-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>▾</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navItems.map(({ label, icon }) => {
            const active = label === activePage
            return (
              <div key={label}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all"
                style={{
                  backgroundColor: active ? 'rgba(31,138,138,0.2)' : 'transparent',
                  color: active ? B.tealLight : 'rgba(255,255,255,0.55)',
                  borderLeft: active ? `2px solid ${B.teal}` : '2px solid transparent',
                }}>
                <Ico path={icon} size={15} color={active ? B.tealLight : 'rgba(255,255,255,0.55)'} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            )
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: B.teal, color: 'white' }}>A</div>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>Athletic Dir.</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>plano-isd.edu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: B.bg }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
          <div>
            <h1 className="font-bold text-base" style={{ color: B.navy }}>{activePage}</h1>
            <p className="text-xs" style={{ color: B.slateLight }}>Last updated: Dec 4, 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg" style={{ color: B.slateLight }}>
              <Ico path={ICONS.bell} size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: B.navy, color: 'white' }}>
              + Schedule Test
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard content ────────────────────────────────────────────────────────
function DashboardContent() {
  const stats = [
    { label: 'Total Fields',   value: '8',  sub: 'Plano ISD',          icon: ICONS.fields, color: B.navy },
    { label: 'Avg Health Score',value: '74', sub: 'Across all fields',  icon: ICONS.chart,  color: B.teal },
    { label: 'Next Test Due',  value: '3',  sub: 'Within 30 days',     icon: ICONS.test,   color: '#F59E0B' },
    { label: 'Action Required',value: '1',  sub: 'Critical field',     icon: ICONS.warning,color: '#EF4444' },
  ]

  const fields = [
    { name: 'Senior HS Varsity Football', type: 'Football',  score: 32, status: 'CRITICAL' as const, date: 'Nov 15' },
    { name: 'Williams MS Football',        type: 'Football',  score: 57, status: 'MONITOR'  as const, date: 'Nov 18' },
    { name: 'Junior HS Lacrosse',          type: 'Lacrosse',  score: 68, status: 'GOOD'     as const, date: 'Nov 28' },
    { name: 'Clark HS Varsity Football',   type: 'Football',  score: 76, status: 'GOOD'     as const, date: 'Dec 1' },
    { name: 'Plano East Soccer Complex',   type: 'Soccer',    score: 91, status: 'EXCELLENT' as const,date: 'Dec 4' },
  ]

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map(({ label, value, sub, icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-4" style={{ border: '1px solid #E2E8F0' }}>
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: B.slateLight }}>{label}</span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: color + '15' }}>
                <Ico path={icon} size={14} color={color} />
              </div>
            </div>
            <div className="text-2xl font-black" style={{ color }}>{value}</div>
            <div className="text-xs mt-0.5" style={{ color: B.slateLight }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Field table */}
      <div className="bg-white rounded-xl flex-1 overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#E2E8F0' }}>
          <span className="text-sm font-semibold" style={{ color: B.navy }}>Fields — Sorted by Field Health Score</span>
          <span className="text-xs" style={{ color: B.slateLight }}>Score = GMAX · HIC · Shear · Infill</span>
        </div>
        {fields.map(({ name, type, score, status, date }, i) => (
          <div key={name} className="flex items-center gap-4 px-4 py-2.5 border-b last:border-0"
            style={{ borderColor: '#F1F5F9' }}>
            <div className="w-1.5 h-8 rounded-full flex-shrink-0"
              style={{ backgroundColor: status === 'CRITICAL' ? '#EF4444' : status === 'MONITOR' ? '#F59E0B' : status === 'GOOD' ? B.teal : B.green }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: B.slate }}>{name}</div>
              <div className="text-xs" style={{ color: B.slateLight }}>{type} · Tested {date}</div>
            </div>
            <div className="text-sm font-black tabular-nums"
              style={{ color: status === 'CRITICAL' ? '#EF4444' : status === 'MONITOR' ? '#F59E0B' : status === 'GOOD' ? B.teal : B.green }}>
              {score}<span className="text-xs font-normal" style={{ color: B.slateLight }}>/100</span>
            </div>
            <StatusBadge s={status} />
            <button className="text-xs font-semibold" style={{ color: B.teal }}>View →</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Field detail content ─────────────────────────────────────────────────────
function FieldDetailContent() {
  return (
    <div className="grid grid-cols-5 gap-4 h-full">
      {/* Left panel */}
      <div className="col-span-2 space-y-3">
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #E2E8F0' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-bold text-sm" style={{ color: B.navy }}>Senior HS Varsity Football</div>
              <div className="text-xs mt-0.5" style={{ color: B.slateLight }}>FieldTurf Revolution 360 · Installed 2020</div>
            </div>
            <StatusBadge s="CRITICAL" />
          </div>

          {/* Field Health Score hero */}
          <div className="rounded-xl p-3 mb-3 text-center" style={{ background: `linear-gradient(135deg, ${B.navy} 0%, ${B.navyLight} 100%)` }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Field Health Score</div>
            <div className="text-4xl font-black text-white">32</div>
            <div className="text-xs mt-0.5" style={{ color: '#EF4444' }}>CRITICAL — Immediate attention required</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'GMAX Avg',    value: '188', status: 'critical' },
              { label: 'HIC Score',   value: '912', status: 'critical' },
              { label: 'Shear Factor',value: '24 Nm',status: 'good' },
              { label: 'Infill Depth',value: '23mm', status: 'critical' },
            ].map(({ label, value, status }) => (
              <div key={label} className="rounded-lg p-2.5" style={{ backgroundColor: B.bg, border: '1px solid #E2E8F0' }}>
                <div className="text-xs" style={{ color: B.slateLight }}>{label}</div>
                <div className="font-black text-sm mt-0.5"
                  style={{ color: status === 'critical' ? '#EF4444' : B.teal }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance alert */}
        <div className="rounded-xl p-3" style={{ background: '#FFF1F2', border: '1px solid #FECDD3' }}>
          <div className="flex items-center gap-2 mb-1">
            <Ico path={ICONS.warning} size={14} color="#EF4444" />
            <span className="text-xs font-semibold" style={{ color: '#991B1B' }}>Maintenance Alert</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#B91C1C' }}>
            GMAX and HIC readings in south end zone near ASTM limits. Priority inspection before Dec 12 playoff.
          </p>
        </div>

        {/* ASTM compliance bar */}
        <div className="bg-white rounded-xl p-3" style={{ border: '1px solid #E2E8F0' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: B.navy }}>ASTM F1936 — GMAX</span>
            <span className="text-xs font-bold" style={{ color: '#EF4444' }}>188 / 200</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E2E8F0' }}>
            <div className="h-full rounded-full" style={{ width: '94%', background: `linear-gradient(to right, ${B.green}, #F59E0B, #EF4444)` }} />
          </div>
          <div className="text-xs mt-1.5" style={{ color: B.slateLight }}>12 G-units from failure threshold</div>
        </div>
      </div>

      {/* Right panel — field map */}
      <div className="col-span-3 space-y-3">
        <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #E2E8F0', height: '280px' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ color: B.navy }}>GMAX Heat Map — 12-Point Grid</span>
            <div className="flex gap-1">
              {['GMAX', 'HIC', 'Shear', 'Infill'].map(m => (
                <button key={m} className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={m === 'GMAX'
                    ? { backgroundColor: B.navy, color: 'white' }
                    : { backgroundColor: B.bg, color: B.slateLight, border: '1px solid #E2E8F0' }}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          {/* Football field SVG mini */}
          <svg viewBox="0 0 533 1200" style={{ height: '200px', display: 'block', margin: '0 auto' }} className="rounded-lg overflow-hidden">
            <rect width="533" height="1200" fill="#2d6a27" />
            <rect x="0" y="0" width="533" height="100" fill="#1d5019" />
            <rect x="0" y="1100" width="533" height="100" fill="#1d5019" />
            {[100,200,300,400,500,600,700,800,900,1000].map(y => (
              <line key={y} x1="0" y1={y} x2="533" y2={y} stroke="white" strokeWidth={y % 200 === 0 || y === 1000 ? 2 : 1} opacity={y % 200 === 0 || y === 1000 ? 0.8 : 0.4} />
            ))}
            <line x1="177" y1="100" x2="177" y2="1100" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="355" y1="100" x2="355" y2="1100" stroke="white" strokeWidth="1" opacity="0.3" />
            {/* Test points */}
            {[
              [267, 100, 112, B.teal],   [177, 350, 178, '#F59E0B'],  [355, 350, 167, '#F59E0B'],
              [267, 500, 105, B.teal],   [177, 600, 173, '#F59E0B'],  [267, 600, 95, B.green],
              [355, 600, 88, B.green],   [267, 700, 188, '#EF4444'],  [177, 850, 192, '#EF4444'],
              [355, 850, 196, '#EF4444'],[267, 1000, 162, '#F59E0B'], [267, 1100, 108, B.teal],
            ].map(([cx, cy, val, color], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="28" fill={color as string} stroke="white" strokeWidth="2.5"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} />
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                  fill="white" fontSize="13" fontWeight="bold" fontFamily="monospace">{val}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Testing history */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
          <div className="px-4 py-2.5 border-b" style={{ borderColor: '#E2E8F0' }}>
            <span className="text-sm font-semibold" style={{ color: B.navy }}>Testing History</span>
          </div>
          {[
            { date: 'Nov 15, 2024', tech: 'S. Johnson', score: 32, gmax: 188, result: 'CRITICAL' as const },
            { date: 'Aug 12, 2024', tech: 'M. Davis',   score: 58, gmax: 171, result: 'MONITOR'  as const },
            { date: 'Apr 8,  2024', tech: 'S. Johnson', score: 79, gmax: 128, result: 'GOOD'     as const },
          ].map(({ date, tech, score, gmax, result }) => (
            <div key={date} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-0"
              style={{ borderColor: '#F1F5F9' }}>
              <span className="text-xs w-24 flex-shrink-0" style={{ color: B.slateLight }}>{date}</span>
              <span className="text-xs flex-1" style={{ color: B.slateLight }}>{tech}</span>
              <span className="text-sm font-black tabular-nums"
                style={{ color: result === 'CRITICAL' ? '#EF4444' : result === 'MONITOR' ? '#F59E0B' : B.teal }}>
                {score}<span className="text-xs font-normal" style={{ color: B.slateLight }}>/100</span>
              </span>
              <span className="text-xs font-mono" style={{ color: B.slateLight }}>G{gmax}</span>
              <StatusBadge s={result} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Marketing hero mockup ────────────────────────────────────────────────────
function MarketingHero() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid #E2E8F0' }}>
      {/* Nav */}
      <div className="bg-white flex items-center justify-between px-8 py-4 border-b" style={{ borderColor: '#E2E8F0' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: B.green }}>
            <Ico path={ICONS.shield} size={14} color="white" />
          </div>
          <span className="font-bold text-base" style={{ color: B.navy }}>Field Health Systems</span>
        </div>
        <div className="flex items-center gap-8">
          {['Services', 'How It Works', 'Pricing', 'Resources'].map(label => (
            <span key={label} className="text-sm font-medium cursor-pointer"
              style={{ color: B.slate }}>{label}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold rounded-lg"
            style={{ color: B.navy, border: `1px solid ${B.navy}` }}>Log In</button>
          <button className="px-4 py-2 text-sm font-semibold rounded-lg text-white"
            style={{ backgroundColor: B.green }}>Schedule a Test</button>
        </div>
      </div>

      {/* Hero */}
      <div className="px-16 py-14" style={{ backgroundColor: B.navy }}>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.3)', color: B.greenLight }}>
            Independent Third-Party Field Testing — Texas
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-4">
            We test your field.<br />
            <span style={{ color: B.green }}>You stay protected.</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            Independent ASTM F1936 testing, Field Health Scores, and compliance documentation —
            so your district can prove it prioritized athlete safety before anyone asks.
          </p>
          <div className="flex gap-4">
            <button className="px-7 py-3.5 rounded-xl font-bold text-base"
              style={{ backgroundColor: B.green, color: 'white' }}>
              Schedule a Free Pilot Test
            </button>
            <button className="px-7 py-3.5 rounded-xl font-semibold text-base"
              style={{ backgroundColor: 'rgba(31,138,138,0.2)', color: B.tealLight, border: `1px solid ${B.teal}` }}>
              See How It Works →
            </button>
          </div>
          <div className="flex items-center gap-8 mt-8">
            {[
              { val: 'ASTM F1936', sub: 'Protocol' },
              { val: 'Independent', sub: 'No conflicts' },
              { val: '24-hr', sub: 'Report delivery' },
            ].map(({ val, sub }) => (
              <div key={val} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: B.green }}>
                  <Ico path={ICONS.check} size={10} color="white" />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{val}</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Color palette display ────────────────────────────────────────────────────
function Palette() {
  const colors = [
    { name: 'Navy',        hex: B.navy,       role: 'Primary — Nav, headers, primary buttons' },
    { name: 'Teal',        hex: B.teal,       role: 'Secondary — Links, GOOD status, icons' },
    { name: 'Fresh Green', hex: B.green,      role: 'Accent — CTAs, EXCELLENT status, logo' },
    { name: 'Off-White',   hex: B.bg,         role: 'Background — Page backgrounds, cards' },
    { name: 'Slate',       hex: B.slate,      role: 'Text — Body copy, labels, metadata' },
    { name: 'Amber',       hex: '#F59E0B',    role: 'MONITOR status (keep as universal warning)' },
    { name: 'Red',         hex: '#EF4444',    role: 'CRITICAL status (keep as universal danger)' },
  ]
  return (
    <div className="grid grid-cols-7 gap-3">
      {colors.map(({ name, hex, role }) => (
        <div key={name}>
          <div className="h-16 rounded-xl mb-2 shadow-sm" style={{ backgroundColor: hex, border: hex === B.bg ? '1px solid #E2E8F0' : 'none' }} />
          <div className="text-xs font-bold" style={{ color: B.navy }}>{name}</div>
          <div className="font-mono text-xs" style={{ color: B.slateLight }}>{hex}</div>
          <div className="text-xs mt-0.5 leading-snug" style={{ color: B.slateLight }}>{role}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Component swatches ───────────────────────────────────────────────────────
function ComponentSwatches() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Buttons */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: B.slateLight }}>Buttons</div>
        <div className="space-y-2">
          <button className="w-full px-4 py-2.5 rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: B.navy }}>Primary — Schedule Test</button>
          <button className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: B.green }}>CTA — Free Pilot</button>
          <button className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold"
            style={{ border: `2px solid ${B.teal}`, color: B.teal }}>Secondary — Learn More</button>
          <button className="w-full px-4 py-2.5 rounded-lg text-sm font-medium"
            style={{ border: `1px solid #E2E8F0`, color: B.slate, backgroundColor: 'white' }}>Ghost — Cancel</button>
        </div>
      </div>

      {/* Status badges */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: B.slateLight }}>Status Badges</div>
        <div className="space-y-2">
          {(['EXCELLENT', 'GOOD', 'MONITOR', 'CRITICAL'] as const).map(s => (
            <div key={s} className="flex items-center gap-3">
              <StatusBadge s={s} />
              <span className="text-xs" style={{ color: B.slateLight }}>
                {s === 'EXCELLENT' ? 'Score ≥ 85' : s === 'GOOD' ? 'Score 65–84' : s === 'MONITOR' ? 'Score 45–64' : 'Score < 45'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: B.bg, border: '1px solid #E2E8F0' }}>
          <div className="text-xs font-semibold mb-1" style={{ color: B.navy }}>Field Health Score</div>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-black" style={{ color: B.teal }}>74</span>
            <span className="text-sm mb-0.5" style={{ color: B.slateLight }}>/100</span>
          </div>
          <div className="h-1.5 rounded-full mt-2 overflow-hidden" style={{ backgroundColor: '#E2E8F0' }}>
            <div className="h-full rounded-full" style={{ width: '74%', backgroundColor: B.teal }} />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: B.slateLight }}>Typography</div>
        <div className="space-y-2">
          <div className="text-2xl font-black" style={{ color: B.navy }}>Heading H1</div>
          <div className="text-lg font-bold" style={{ color: B.navy }}>Heading H2</div>
          <div className="text-base font-semibold" style={{ color: B.slate }}>Heading H3</div>
          <div className="text-sm" style={{ color: B.slate }}>Body — Regular paragraph text for descriptions and content that users read at length. Clear and legible.</div>
          <div className="text-xs" style={{ color: B.slateLight }}>Caption — metadata, dates, sub-labels</div>
          <div className="text-xs font-mono px-2 py-1 rounded" style={{ backgroundColor: B.navy + '10', color: B.navy }}>GMAX · HIC · Shear · Infill</div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MockupPage() {
  const [activeView, setActiveView] = useState<'dashboard' | 'field'>('dashboard')

  return (
    <div style={{ backgroundColor: '#EFF2F6', minHeight: '100vh', padding: '40px 0' }}>
      <div className="max-w-6xl mx-auto px-8 space-y-12">

        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: B.teal }}>Field Health Systems</div>
            <h1 className="text-3xl font-black mb-1" style={{ color: B.navy }}>Brand Mockups</h1>
            <p className="text-sm" style={{ color: B.slateLight }}>New brand palette applied across the app and marketing site</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full"
            style={{ backgroundColor: B.green + '20', color: B.greenDark, border: `1px solid ${B.green}40` }}>
            Design Preview
          </div>
        </div>

        {/* Color palette */}
        <section>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: B.slateLight }}>Brand Colors</div>
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
            <Palette />
          </div>
        </section>

        {/* Component swatches */}
        <section>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: B.slateLight }}>UI Components</div>
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
            <ComponentSwatches />
          </div>
        </section>

        {/* App shell — dashboard */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: B.slateLight }}>Web App</div>
            <div className="flex gap-1">
              {(['dashboard', 'field'] as const).map(v => (
                <button key={v} onClick={() => setActiveView(v)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize"
                  style={activeView === v
                    ? { backgroundColor: B.navy, color: 'white' }
                    : { backgroundColor: 'white', color: B.slate, border: '1px solid #E2E8F0' }}>
                  {v === 'dashboard' ? 'Dashboard' : 'Field Detail'}
                </button>
              ))}
            </div>
          </div>
          <AppShellMockup activePage={activeView === 'dashboard' ? 'Dashboard' : 'Fields'}>
            {activeView === 'dashboard' ? <DashboardContent /> : <FieldDetailContent />}
          </AppShellMockup>
        </section>

        {/* Marketing hero */}
        <section>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: B.slateLight }}>Marketing Site — Hero</div>
          <MarketingHero />
        </section>

        {/* Footer note */}
        <div className="text-center py-4">
          <p className="text-sm" style={{ color: B.slateLight }}>
            These are design mockups. Color tokens are defined in{' '}
            <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: B.navy + '12', color: B.navy }}>globals.css</code>
            {' '}and ready to apply across the codebase.
          </p>
        </div>
      </div>
    </div>
  )
}
