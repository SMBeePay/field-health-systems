'use client'

import { useState, useRef } from 'react'
import { Field, TestingData } from '@/lib/schemas'

// ─── Types ───────────────────────────────────────────────────────────────────

type Metric = 'gmax' | 'hic' | 'shear' | 'infill'

interface TestPoint {
  id: string
  name: string
  zone: string
  // x = 0–1 across field WIDTH (left sideline → right sideline when looking from above)
  // y = 0–1 along field LENGTH (one end → other end)
  position: { x: number; y: number }
  gmax: number
  hic?: number
  shear: number
  infill: number // inches
}

interface HoverState {
  point: TestPoint
  svgX: number // SVG-space coordinates for tooltip anchor
  svgY: number
}

interface FieldDiagramProps {
  field: Field
  testingData?: TestingData
  className?: string
  maxDiagramHeight?: string // override SVG max-height (default '65vh')
}

// ─── Color helpers ────────────────────────────────────────────────────────────

function markerColor(point: TestPoint, metric: Metric): string {
  if (metric === 'gmax') {
    const v = point.gmax
    if (v < 120) return '#0ea5e9'  // sky   — excellent
    if (v < 165) return '#10b981'  // green — good
    if (v < 200) return '#f59e0b'  // amber — monitor
    return '#ef4444'               // red   — critical
  }
  if (metric === 'hic') {
    const v = point.hic ?? 0
    if (v < 500) return '#0ea5e9'
    if (v < 750) return '#10b981'
    if (v < 1000) return '#f59e0b'
    return '#ef4444'
  }
  if (metric === 'shear') {
    const v = point.shear
    if (v < 20) return '#0ea5e9'
    if (v <= 30) return '#10b981'
    if (v <= 40) return '#f59e0b'
    return '#ef4444'
  }
  // infill (mm — typical spec: 38–50mm)
  const v = point.infill
  if (v >= 44) return '#0ea5e9'
  if (v >= 38) return '#10b981'
  if (v >= 30) return '#f59e0b'
  return '#ef4444'
}

function markerLabel(point: TestPoint, metric: Metric): string {
  switch (metric) {
    case 'gmax':  return String(point.gmax)
    case 'hic':   return point.hic ? String(point.hic) : '?'
    case 'shear': return `${point.shear}`
    case 'infill': return `${point.infill}mm`
  }
}

function statusFromGmax(v: number) {
  if (v < 120) return { label: 'EXCELLENT', color: 'text-sky-400' }
  if (v < 165) return { label: 'GOOD', color: 'text-emerald-400' }
  if (v < 200) return { label: 'MONITOR', color: 'text-amber-400' }
  return { label: 'CRITICAL', color: 'text-red-400' }
}

function avgGmax(pts: TestPoint[]) {
  if (!pts.length) return 0
  return Math.round(pts.reduce((s, p) => s + p.gmax, 0) / pts.length)
}

// ─── Default test-point templates ────────────────────────────────────────────
// position.x = 0–1 across WIDTH (left→right, portrait orientation on screen)
// position.y = 0–1 along LENGTH (top→bottom)

const FOOTBALL_TEMPLATE: Omit<TestPoint, 'gmax' | 'hic' | 'shear' | 'infill'>[] = [
  { id: 'f1',  name: 'N Goal Line — Center',    zone: 'Goal Line',      position: { x: 0.5,  y: 0.083 } },
  { id: 'f2',  name: 'N 25-Yd — Left Hash',     zone: 'North Quarter',  position: { x: 0.33, y: 0.292 } },
  { id: 'f3',  name: 'N 25-Yd — Right Hash',    zone: 'North Quarter',  position: { x: 0.67, y: 0.292 } },
  { id: 'f4',  name: 'N 40-Yd — Center',        zone: 'North Third',    position: { x: 0.5,  y: 0.417 } },
  { id: 'f5',  name: '50-Yd — Left Hash',       zone: 'Midfield',       position: { x: 0.33, y: 0.500 } },
  { id: 'f6',  name: '50-Yd — Center',          zone: 'Midfield',       position: { x: 0.5,  y: 0.500 } },
  { id: 'f7',  name: '50-Yd — Right Hash',      zone: 'Midfield',       position: { x: 0.67, y: 0.500 } },
  { id: 'f8',  name: 'S 40-Yd — Center',        zone: 'South Third',    position: { x: 0.5,  y: 0.583 } },
  { id: 'f9',  name: 'S 25-Yd — Left Hash',     zone: 'South Quarter',  position: { x: 0.33, y: 0.708 } },
  { id: 'f10', name: 'S 25-Yd — Right Hash',    zone: 'South Quarter',  position: { x: 0.67, y: 0.708 } },
  { id: 'f11', name: 'S 10-Yd — Center',        zone: 'South Goal Area',position: { x: 0.5,  y: 0.833 } },
  { id: 'f12', name: 'S Goal Line — Center',    zone: 'Goal Line',      position: { x: 0.5,  y: 0.917 } },
]

const SOCCER_TEMPLATE: Omit<TestPoint, 'gmax' | 'hic' | 'shear' | 'infill'>[] = [
  { id: 's1',  name: 'N Penalty Area — Left',   zone: 'N Penalty Area', position: { x: 0.22, y: 0.10 } },
  { id: 's2',  name: 'N Penalty Area — Center', zone: 'N Penalty Area', position: { x: 0.50, y: 0.10 } },
  { id: 's3',  name: 'N Penalty Area — Right',  zone: 'N Penalty Area', position: { x: 0.78, y: 0.10 } },
  { id: 's4',  name: 'N Third — Left Wing',     zone: 'N Third',        position: { x: 0.18, y: 0.28 } },
  { id: 's5',  name: 'N Third — Center',        zone: 'N Third',        position: { x: 0.50, y: 0.28 } },
  { id: 's6',  name: 'Center — Left',           zone: 'Center Circle',  position: { x: 0.33, y: 0.50 } },
  { id: 's7',  name: 'Center Spot',             zone: 'Center Circle',  position: { x: 0.50, y: 0.50 } },
  { id: 's8',  name: 'Center — Right',          zone: 'Center Circle',  position: { x: 0.67, y: 0.50 } },
  { id: 's9',  name: 'S Third — Center',        zone: 'S Third',        position: { x: 0.50, y: 0.72 } },
  { id: 's10', name: 'S Third — Right Wing',    zone: 'S Third',        position: { x: 0.82, y: 0.72 } },
  { id: 's11', name: 'S Penalty Area — Left',   zone: 'S Penalty Area', position: { x: 0.22, y: 0.90 } },
  { id: 's12', name: 'S Penalty Area — Center', zone: 'S Penalty Area', position: { x: 0.50, y: 0.90 } },
  { id: 's13', name: 'S Penalty Area — Right',  zone: 'S Penalty Area', position: { x: 0.78, y: 0.90 } },
]

const BASEBALL_TEMPLATE: Omit<TestPoint, 'gmax' | 'hic' | 'shear' | 'infill'>[] = [
  { id: 'b1',  name: 'Home Plate Area',         zone: 'Infield',        position: { x: 0.50, y: 0.88 } },
  { id: 'b2',  name: "Pitcher's Mound",         zone: 'Infield',        position: { x: 0.50, y: 0.65 } },
  { id: 'b3',  name: '1st Base Area',           zone: 'Infield',        position: { x: 0.73, y: 0.75 } },
  { id: 'b4',  name: '2nd Base Area',           zone: 'Infield',        position: { x: 0.50, y: 0.52 } },
  { id: 'b5',  name: '3rd Base Area',           zone: 'Infield',        position: { x: 0.27, y: 0.75 } },
  { id: 'b6',  name: 'Infield Arc — Left',      zone: 'Infield',        position: { x: 0.28, y: 0.58 } },
  { id: 'b7',  name: 'Infield Arc — Right',     zone: 'Infield',        position: { x: 0.72, y: 0.58 } },
  { id: 'b8',  name: 'Left Field',              zone: 'Outfield',       position: { x: 0.22, y: 0.32 } },
  { id: 'b9',  name: 'Left-Center Field',       zone: 'Outfield',       position: { x: 0.37, y: 0.22 } },
  { id: 'b10', name: 'Center Field',            zone: 'Outfield',       position: { x: 0.50, y: 0.16 } },
  { id: 'b11', name: 'Right-Center Field',      zone: 'Outfield',       position: { x: 0.63, y: 0.22 } },
  { id: 'b12', name: 'Right Field',             zone: 'Outfield',       position: { x: 0.78, y: 0.32 } },
]

const LACROSSE_TEMPLATE: Omit<TestPoint, 'gmax' | 'hic' | 'shear' | 'infill'>[] = [
  { id: 'l1',  name: 'N Crease — Left',         zone: 'N Crease',       position: { x: 0.38, y: 0.10 } },
  { id: 'l2',  name: 'N Crease — Center',       zone: 'N Crease',       position: { x: 0.50, y: 0.10 } },
  { id: 'l3',  name: 'N Crease — Right',        zone: 'N Crease',       position: { x: 0.62, y: 0.10 } },
  { id: 'l4',  name: 'N Wing — Left',           zone: 'N Third',        position: { x: 0.20, y: 0.28 } },
  { id: 'l5',  name: 'N Third — Center',        zone: 'N Third',        position: { x: 0.50, y: 0.28 } },
  { id: 'l6',  name: 'Center — Left',           zone: 'Midfield',       position: { x: 0.33, y: 0.50 } },
  { id: 'l7',  name: 'Center',                  zone: 'Midfield',       position: { x: 0.50, y: 0.50 } },
  { id: 'l8',  name: 'Center — Right',          zone: 'Midfield',       position: { x: 0.67, y: 0.50 } },
  { id: 'l9',  name: 'S Third — Center',        zone: 'S Third',        position: { x: 0.50, y: 0.72 } },
  { id: 'l10', name: 'S Wing — Right',          zone: 'S Third',        position: { x: 0.80, y: 0.72 } },
  { id: 'l11', name: 'S Crease — Left',         zone: 'S Crease',       position: { x: 0.38, y: 0.90 } },
  { id: 'l12', name: 'S Crease — Center',       zone: 'S Crease',       position: { x: 0.50, y: 0.90 } },
]

// Demo readings — varied to show the heat-map effect
const DEMO_READINGS = [
  { gmax: 62,  hic: 310, shear: 18, infill: 48 },
  { gmax: 143, hic: 715, shear: 34, infill: 33 },
  { gmax: 88,  hic: 440, shear: 22, infill: 44 },
  { gmax: 108, hic: 540, shear: 25, infill: 50 },
  { gmax: 173, hic: 865, shear: 38, infill: 29 },
  { gmax: 95,  hic: 475, shear: 21, infill: 46 },
  { gmax: 71,  hic: 355, shear: 19, infill: 49 },
  { gmax: 165, hic: 825, shear: 36, infill: 31 },
  { gmax: 118, hic: 590, shear: 28, infill: 38 },
  { gmax: 78,  hic: 390, shear: 20, infill: 45 },
  { gmax: 189, hic: 945, shear: 41, infill: 27 },
  { gmax: 115, hic: 575, shear: 27, infill: 40 },
  { gmax: 97,  hic: 485, shear: 23, infill: 43 },
]

function buildPoints(
  template: Omit<TestPoint, 'gmax' | 'hic' | 'shear' | 'infill'>[],
  testingData?: TestingData,
): TestPoint[] {
  if (testingData?.testingLocations?.length) {
    return testingData.testingLocations.map((loc, i) => ({
      id: loc.id || String(i),
      name: loc.name,
      zone: loc.zone ?? '',
      position: loc.position,
      gmax:   loc.gmaxReading           ?? testingData.gmaxReadings?.[i]          ?? 0,
      hic:    undefined,
      shear:  loc.shearReading          ?? testingData.shearReadings?.[i]          ?? 0,
      infill: loc.infillDepthReading    ?? testingData.infillDepthReadings?.[i]    ?? 0,
    }))
  }
  return template.map((t, i) => ({
    ...t,
    ...DEMO_READINGS[i % DEMO_READINGS.length],
  }))
}

// ─── SVG field drawings ───────────────────────────────────────────────────────
// All fields use a consistent SVG coordinate space:
//   W = field width in SVG units (horizontal on screen)
//   H = field length in SVG units (vertical on screen)
// Test point position maps:
//   svgX = position.x * W
//   svgY = position.y * H

// ── Football ─────────────────────────────────────────────────────────────────
// 53.33 yards wide × 120 yards long → viewBox "0 0 533 1200"
// End zones: y = 0–100 and y = 1100–1200 (10 yards each at 10px/yd)
// Goal lines: y = 100, y = 1100
// Yard lines: y = 100 + n×10 for the playing field yards
// Hash marks: x = 533/3 ≈ 178 and x = 533×2/3 ≈ 355 (HS high school hash spacing)
function FootballSVG({ W, H, points, metric, hover, onHover }: SvgInnerProps) {
  const EZ = H * (10 / 120) // end zone height in SVG units
  const lHash = W / 3        // left hash x
  const rHash = (W * 2) / 3  // right hash x

  // Yard lines within the 100-yard playing field
  const yardLines: { y: number; yd: number }[] = []
  for (let yd = 5; yd <= 95; yd += 5) {
    yardLines.push({ y: EZ + (yd / 100) * (H - 2 * EZ), yd })
  }

  // Yard number labels (10, 20, 30, 40, 50 then mirror)
  const ydNumLines = [10, 20, 30, 40, 50, 60, 70, 80, 90]
  const ydLabel = (yd: number) => {
    const v = yd <= 50 ? yd : 100 - yd
    return String(v)
  }

  // Alternating 10-yd stripe shade
  const stripes: { y: number; h: number }[] = []
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue
    const stripeH = (H - 2 * EZ) / 10
    stripes.push({ y: EZ + i * stripeH, h: stripeH })
  }

  // Hash marks — every yard in the playing field
  const hashMarks: { y: number }[] = []
  for (let yd = 1; yd <= 99; yd++) {
    hashMarks.push({ y: EZ + (yd / 100) * (H - 2 * EZ) })
  }

  return (
    <>
      {/* Field background */}
      <rect x={0} y={0} width={W} height={H} fill="#2d6a27" />
      {/* Alternating stripes */}
      {stripes.map(({ y, h }) => (
        <rect key={y} x={0} y={y} width={W} height={h} fill="#2a6024" />
      ))}
      {/* End zones */}
      <rect x={0} y={0} width={W} height={EZ} fill="#1d5019" />
      <rect x={0} y={H - EZ} width={W} height={EZ} fill="#1d5019" />
      {/* End zone text */}
      <text x={W / 2} y={EZ / 2} textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.35)" fontSize={W * 0.08} fontWeight="bold" fontFamily="sans-serif"
        transform={`rotate(-90, ${W / 2}, ${EZ / 2})`}>END ZONE</text>
      <text x={W / 2} y={H - EZ / 2} textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.35)" fontSize={W * 0.08} fontWeight="bold" fontFamily="sans-serif"
        transform={`rotate(90, ${W / 2}, ${H - EZ / 2})`}>END ZONE</text>
      {/* Sidelines */}
      <line x1={2} y1={0} x2={2} y2={H} stroke="white" strokeWidth={3} />
      <line x1={W - 2} y1={0} x2={W - 2} y2={H} stroke="white" strokeWidth={3} />
      {/* Goal lines */}
      <line x1={0} y1={EZ} x2={W} y2={EZ} stroke="white" strokeWidth={3} />
      <line x1={0} y1={H - EZ} x2={W} y2={H - EZ} stroke="white" strokeWidth={3} />
      {/* Yard lines */}
      {yardLines.map(({ y, yd }) => (
        <line key={yd} x1={0} y1={y} x2={W} y2={y}
          stroke="white" strokeWidth={yd % 10 === 0 ? 2 : 1}
          opacity={yd % 10 === 0 ? 0.9 : 0.45} />
      ))}
      {/* Hash marks */}
      {hashMarks.map(({ y }, i) => (
        <g key={i}>
          <line x1={lHash - W * 0.025} y1={y} x2={lHash + W * 0.025} y2={y} stroke="white" strokeWidth={1.2} opacity={0.7} />
          <line x1={rHash - W * 0.025} y1={y} x2={rHash + W * 0.025} y2={y} stroke="white" strokeWidth={1.2} opacity={0.7} />
        </g>
      ))}
      {/* Yard numbers */}
      {ydNumLines.map((yd) => {
        const y = EZ + (yd / 100) * (H - 2 * EZ)
        const label = ydLabel(yd)
        return (
          <g key={yd}>
            <text x={W * 0.12} y={y} textAnchor="middle" dominantBaseline="middle"
              fill="rgba(255,255,255,0.75)" fontSize={W * 0.07} fontWeight="bold" fontFamily="sans-serif">{label}</text>
            <text x={W * 0.88} y={y} textAnchor="middle" dominantBaseline="middle"
              fill="rgba(255,255,255,0.75)" fontSize={W * 0.07} fontWeight="bold" fontFamily="sans-serif">{label}</text>
          </g>
        )
      })}
      {/* Goal posts (simplified T shape) */}
      {[EZ - W * 0.04, H - EZ + W * 0.02].map((y, side) => (
        <g key={side} opacity={0.6}>
          <line x1={W / 2} y1={y} x2={W / 2} y2={y + (side === 0 ? -1 : 1) * W * 0.06} stroke="rgba(255,220,0,0.8)" strokeWidth={2.5} />
          <line x1={W / 2 - W * 0.12} y1={y + (side === 0 ? -1 : 1) * W * 0.06} x2={W / 2 + W * 0.12} y2={y + (side === 0 ? -1 : 1) * W * 0.06} stroke="rgba(255,220,0,0.8)" strokeWidth={2.5} />
        </g>
      ))}
      {/* Test point markers */}
      <Markers W={W} H={H} points={points} metric={metric} hover={hover} onHover={onHover} />
    </>
  )
}

// ── Soccer ────────────────────────────────────────────────────────────────────
// Standard: 68m wide × 105m long → viewBox proportional
// Using W and H as passed (component sets the aspect ratio)
function SoccerSVG({ W, H, points, metric, hover, onHover }: SvgInnerProps) {
  const penAreaW = W * 0.634   // penalty area width (40.32m of 63.72m field width) ≈ 63.4%
  const penAreaH = H * 0.171   // penalty area depth (16.5m of 96.33m) — wait, 105m field: 16.5/105 ≈ 15.7%
  const penAreaWHalf = (W - penAreaW) / 2

  const goalAreaW = W * 0.287  // goal area: 18.32m / 63.72m ≈ 28.7%
  const goalAreaH = H * 0.061  // 5.5m / 90m playing area... let me simplify
  const goalAreaWHalf = (W - goalAreaW) / 2

  const cCircleR = Math.min(W, H) * 0.092  // center circle: 9.15m / 105m ≈ 8.7% of length
  const penSpotY  = H * 0.107  // penalty spot: 11m / 103m ≈ 10.7%
  const cornerR   = Math.min(W, H) * 0.01  // corner arc

  return (
    <>
      {/* Field background */}
      <rect x={0} y={0} width={W} height={H} fill="#2d6a27" />
      {/* Alternating horizontal stripes */}
      {Array.from({ length: 6 }).map((_, i) =>
        i % 2 === 0 ? null : (
          <rect key={i} x={0} y={(H / 6) * i} width={W} height={H / 6} fill="#2a6024" />
        )
      )}
      {/* Outer border */}
      <rect x={2} y={2} width={W - 4} height={H - 4} fill="none" stroke="white" strokeWidth={2.5} />
      {/* Halfway line */}
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="white" strokeWidth={2} />
      {/* Center circle */}
      <circle cx={W / 2} cy={H / 2} r={cCircleR} fill="none" stroke="white" strokeWidth={2} />
      {/* Center spot */}
      <circle cx={W / 2} cy={H / 2} r={W * 0.008} fill="white" />
      {/* N Penalty area */}
      <rect x={penAreaWHalf} y={2} width={penAreaW} height={penAreaH} fill="none" stroke="white" strokeWidth={2} />
      {/* N Goal area */}
      <rect x={goalAreaWHalf} y={2} width={goalAreaW} height={goalAreaH} fill="none" stroke="white" strokeWidth={2} />
      {/* N Penalty spot */}
      <circle cx={W / 2} cy={penSpotY} r={W * 0.007} fill="white" />
      {/* S Penalty area */}
      <rect x={penAreaWHalf} y={H - penAreaH - 2} width={penAreaW} height={penAreaH} fill="none" stroke="white" strokeWidth={2} />
      {/* S Goal area */}
      <rect x={goalAreaWHalf} y={H - goalAreaH - 2} width={goalAreaW} height={goalAreaH} fill="none" stroke="white" strokeWidth={2} />
      {/* S Penalty spot */}
      <circle cx={W / 2} cy={H - penSpotY} r={W * 0.007} fill="white" />
      {/* Goals */}
      <rect x={W * 0.37} y={0} width={W * 0.26} height={H * 0.022} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
      <rect x={W * 0.37} y={H - H * 0.022} width={W * 0.26} height={H * 0.022} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
      {/* Corner arcs */}
      {([
        [2, 2, 0, 90],
        [W - 2, 2, 90, 180],
        [2, H - 2, 270, 360],
        [W - 2, H - 2, 180, 270],
      ] as [number,number,number,number][]).map(([cx, cy, startAngle, endAngle], i) => (
        <path key={i}
          d={describeArc(cx, cy, W * 0.025, startAngle, endAngle)}
          fill="none" stroke="white" strokeWidth={2}
        />
      ))}
      {/* Test point markers */}
      <Markers W={W} H={H} points={points} metric={metric} hover={hover} onHover={onHover} />
    </>
  )
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end   = polarToCartesian(cx, cy, r, startAngle)
  const large = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`
}
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

// ── Baseball ──────────────────────────────────────────────────────────────────
// Square viewBox — diamond with outfield arc
// Home plate at bottom center, CF at top center
// position.x = 0–1 left to right, position.y = 0–1 top (CF) to bottom (home)
function BaseballSVG({ W, H, points, metric, hover, onHover }: SvgInnerProps) {
  // Key coordinates (as fractions of W/H)
  const homeX = W * 0.50, homeY = H * 0.88
  const firstX = W * 0.73, firstY = H * 0.72
  const secondX = W * 0.50, secondY = H * 0.56
  const thirdX  = W * 0.27, thirdY = H * 0.72
  const moundX = W * 0.50, moundY = H * 0.675
  const cfX = W * 0.50, cfY = H * 0.08
  const lfX = W * 0.08, lfY = H * 0.52
  const rfX = W * 0.92, rfY = H * 0.52

  // Outfield fence arc (from LF foul pole to RF foul pole)
  const arcR = W * 0.75

  return (
    <>
      {/* Sky/background */}
      <rect x={0} y={0} width={W} height={H} fill="#2d6a27" />
      {/* Outfield grass — slightly lighter */}
      <clipPath id="outfieldClip">
        <path d={`M ${homeX} ${homeY} L ${lfX} ${lfY} A ${arcR} ${arcR} 0 0 1 ${rfX} ${rfY} Z`} />
      </clipPath>
      <rect x={0} y={0} width={W} height={H} fill="#2d6a27" />
      {/* Outfield arc fence */}
      <path d={`M ${homeX - W * 0.38} ${H * 0.52} A ${arcR} ${arcR} 0 0 1 ${homeX + W * 0.38} ${H * 0.52}`}
        fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2.5} strokeDasharray="6 4" />
      {/* Foul lines */}
      <line x1={homeX} y1={homeY} x2={lfX} y2={lfY} stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      <line x1={homeX} y1={homeY} x2={rfX} y2={rfY} stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      {/* Infield dirt area (brown) */}
      <path d={`M ${homeX} ${homeY + H * 0.025}
                L ${firstX + W * 0.05} ${firstY}
                L ${secondX} ${secondY - H * 0.03}
                L ${thirdX - W * 0.05} ${thirdY}
                Z`}
        fill="#8B5E3C" opacity={0.7} />
      {/* Base paths */}
      <line x1={homeX} y1={homeY} x2={firstX} y2={firstY} stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
      <line x1={firstX} y1={firstY} x2={secondX} y2={secondY} stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
      <line x1={secondX} y1={secondY} x2={thirdX} y2={thirdY} stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
      <line x1={thirdX} y1={thirdY} x2={homeX} y2={homeY} stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
      {/* Pitcher's mound */}
      <circle cx={moundX} cy={moundY} r={W * 0.032} fill="#8B5E3C" opacity={0.8} />
      <circle cx={moundX} cy={moundY} r={W * 0.008} fill="white" opacity={0.8} />
      {/* Bases */}
      {[
        [homeX, homeY, 'Home'],
        [firstX, firstY, '1B'],
        [secondX, secondY, '2B'],
        [thirdX, thirdY, '3B'],
      ].map(([bx, by, label]) => (
        <g key={String(label)}>
          <rect x={Number(bx) - W * 0.018} y={Number(by) - W * 0.018}
            width={W * 0.036} height={W * 0.036}
            fill="white" rx={2} transform={`rotate(45, ${bx}, ${by})`} />
          <text x={Number(bx)} y={Number(by) + W * 0.045} textAnchor="middle"
            fill="rgba(255,255,255,0.7)" fontSize={W * 0.03} fontFamily="sans-serif">{label}</text>
        </g>
      ))}
      {/* Field labels */}
      <text x={lfX + W * 0.08} y={lfY - H * 0.04} fill="rgba(255,255,255,0.4)" fontSize={W * 0.03} fontFamily="sans-serif">LF</text>
      <text x={cfX} y={cfY + H * 0.04} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={W * 0.03} fontFamily="sans-serif">CF</text>
      <text x={rfX - W * 0.08} y={rfY - H * 0.04} fill="rgba(255,255,255,0.4)" fontSize={W * 0.03} fontFamily="sans-serif">RF</text>
      {/* Test point markers */}
      <Markers W={W} H={H} points={points} metric={metric} hover={hover} onHover={onHover} />
    </>
  )
}

// ── Generic rectangle (lacrosse, multi-purpose, field hockey) ─────────────────
function RectangleSVG({ W, H, points, metric, hover, onHover, label }: SvgInnerProps & { label?: string }) {
  const cCircleR = Math.min(W, H) * 0.1

  return (
    <>
      <rect x={0} y={0} width={W} height={H} fill="#2d6a27" />
      {Array.from({ length: 6 }).map((_, i) =>
        i % 2 === 0 ? null : (
          <rect key={i} x={0} y={(H / 6) * i} width={W} height={H / 6} fill="#2a6024" />
        )
      )}
      <rect x={2} y={2} width={W - 4} height={H - 4} fill="none" stroke="white" strokeWidth={2.5} />
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="white" strokeWidth={2} />
      <circle cx={W / 2} cy={H / 2} r={cCircleR} fill="none" stroke="white" strokeWidth={2} />
      <circle cx={W / 2} cy={H / 2} r={W * 0.008} fill="white" />
      {/* Crease circles at each end */}
      <circle cx={W / 2} cy={H * 0.1} r={W * 0.1} fill="none" stroke="white" strokeWidth={1.5} opacity={0.6} />
      <circle cx={W / 2} cy={H * 0.9} r={W * 0.1} fill="none" stroke="white" strokeWidth={1.5} opacity={0.6} />
      {/* Goals */}
      <rect x={W * 0.4} y={0} width={W * 0.2} height={H * 0.025} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      <rect x={W * 0.4} y={H - H * 0.025} width={W * 0.2} height={H * 0.025} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      {label && (
        <text x={W * 0.04} y={H * 0.03} fill="rgba(255,255,255,0.35)" fontSize={W * 0.04} fontFamily="sans-serif">{label}</text>
      )}
      <Markers W={W} H={H} points={points} metric={metric} hover={hover} onHover={onHover} />
    </>
  )
}

// ─── Shared marker layer ──────────────────────────────────────────────────────

interface SvgInnerProps {
  W: number
  H: number
  points: TestPoint[]
  metric: Metric
  hover: HoverState | null
  onHover: (pt: TestPoint | null, svgX: number, svgY: number) => void
}

function Markers({ W, H, points, metric, hover, onHover }: SvgInnerProps) {
  const r = Math.min(W, H) * 0.038
  const fontSize = r * 0.75

  return (
    <>
      {points.map((pt) => {
        const cx = pt.position.x * W
        const cy = pt.position.y * H
        const color = markerColor(pt, metric)
        const isHovered = hover?.point.id === pt.id
        const label = markerLabel(pt, metric)

        return (
          <g key={pt.id}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => onHover(pt, cx, cy)}
            onMouseLeave={() => onHover(null, 0, 0)}
          >
            {/* Outer glow ring when hovered */}
            {isHovered && (
              <circle cx={cx} cy={cy} r={r * 1.6} fill={color} opacity={0.25} />
            )}
            {/* Shadow */}
            <circle cx={cx + r * 0.12} cy={cy + r * 0.12} r={r} fill="rgba(0,0,0,0.35)" />
            {/* Main dot */}
            <circle cx={cx} cy={cy} r={r} fill={color} stroke="white" strokeWidth={r * 0.16} />
            {/* Reading label */}
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize={fontSize} fontWeight="bold" fontFamily="monospace"
              pointerEvents="none">
              {label.length > 4 ? label.substring(0, 4) : label}
            </text>
          </g>
        )
      })}
    </>
  )
}

// ─── Tooltip (rendered as SVG overlay) ───────────────────────────────────────

function Tooltip({ hover, W, H }: { hover: HoverState; W: number; H: number }) {
  const { point, svgX, svgY } = hover
  const status = statusFromGmax(point.gmax)

  // Flip tooltip to left side if point is in right half
  const flipX = svgX > W * 0.6
  // Flip below if point is in top quarter
  const flipY = svgY < H * 0.25

  const tipW = W * 0.32
  const tipH = H * 0.22
  const tx = flipX ? svgX - tipW - W * 0.04 : svgX + W * 0.03
  const ty = flipY ? svgY + H * 0.02 : svgY - tipH - H * 0.02

  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* Card background */}
      <rect x={tx} y={ty} width={tipW} height={tipH}
        rx={6} ry={6} fill="#0f172a" stroke="#334155" strokeWidth={1} opacity={0.97} />
      {/* Point name */}
      <text x={tx + tipW * 0.06} y={ty + tipH * 0.14}
        fill="white" fontSize={tipW * 0.085} fontWeight="bold" fontFamily="sans-serif"
        style={{ fontSize: Math.min(tipW * 0.085, 14) }}>
        {point.name.length > 26 ? point.name.substring(0, 24) + '…' : point.name}
      </text>
      {/* Zone */}
      <text x={tx + tipW * 0.06} y={ty + tipH * 0.25}
        fill="#64748b" fontSize={tipW * 0.07} fontFamily="sans-serif">
        {point.zone}
      </text>
      {/* Divider */}
      <line x1={tx + tipW * 0.06} y1={ty + tipH * 0.31}
        x2={tx + tipW * 0.94} y2={ty + tipH * 0.31} stroke="#1e293b" strokeWidth={1} />
      {/* Readings */}
      {[
        { label: 'GMAX',   val: String(point.gmax),        color: markerColor(point, 'gmax') },
        { label: 'HIC',    val: point.hic ? String(point.hic) : '—', color: markerColor(point, 'hic') },
        { label: 'Shear',  val: `${point.shear} Nm`,       color: markerColor(point, 'shear') },
        { label: 'Infill', val: `${point.infill}mm`,        color: markerColor(point, 'infill') },
      ].map(({ label, val, color }, i) => {
        const row = ty + tipH * (0.39 + i * 0.155)
        return (
          <g key={label}>
            <text x={tx + tipW * 0.06} y={row} fill="#94a3b8" fontSize={tipW * 0.072} fontFamily="sans-serif">{label}</text>
            <text x={tx + tipW * 0.94} y={row} textAnchor="end" fill={color}
              fontSize={tipW * 0.072} fontWeight="bold" fontFamily="monospace">{val}</text>
          </g>
        )
      })}
      {/* Status badge */}
      <rect x={tx + tipW * 0.06} y={ty + tipH * 0.86} width={tipW * 0.88} height={tipH * 0.1}
        rx={3} fill={point.gmax >= 200 ? '#7f1d1d' : point.gmax >= 165 ? '#78350f' : '#052e16'} opacity={0.6} />
      <text x={tx + tipW / 2} y={ty + tipH * 0.915} textAnchor="middle" dominantBaseline="middle"
        fill={status.color.replace('text-', '')} fontSize={tipW * 0.072} fontWeight="bold" fontFamily="sans-serif">
        {status.label}
      </text>
    </g>
  )
}

// ─── Legend ───────────────────────────────────────────────────────────────────

function Legend({ metric }: { metric: Metric }) {
  const bands: { color: string; label: string }[] = metric === 'gmax'
    ? [
        { color: '#0ea5e9', label: 'Excellent  < 120' },
        { color: '#10b981', label: 'Good  120–164' },
        { color: '#f59e0b', label: 'Monitor  165–199' },
        { color: '#ef4444', label: 'Critical  200+' },
      ]
    : metric === 'hic'
    ? [
        { color: '#0ea5e9', label: 'Excellent  < 500' },
        { color: '#10b981', label: 'Good  500–749' },
        { color: '#f59e0b', label: 'Monitor  750–999' },
        { color: '#ef4444', label: 'Critical  1000+' },
      ]
    : metric === 'shear'
    ? [
        { color: '#0ea5e9', label: 'Excellent  < 20 Nm' },
        { color: '#10b981', label: 'Good  20–30 Nm' },
        { color: '#f59e0b', label: 'Monitor  31–40 Nm' },
        { color: '#ef4444', label: 'Critical  > 40 Nm' },
      ]
    : [
        { color: '#0ea5e9', label: 'Excellent  ≥ 44mm' },
        { color: '#10b981', label: 'Good  38–43mm' },
        { color: '#f59e0b', label: 'Monitor  30–37mm' },
        { color: '#ef4444', label: 'Critical  < 30mm' },
      ]

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-600">
      {bands.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const METRICS: { id: Metric; label: string }[] = [
  { id: 'gmax',  label: 'GMAX' },
  { id: 'hic',   label: 'HIC' },
  { id: 'shear', label: 'Shear Factor' },
  { id: 'infill',label: 'Infill Depth' },
]

export function FieldDiagram({ field, testingData, className = '', maxDiagramHeight }: FieldDiagramProps) {
  const [metric, setMetric]   = useState<Metric>('gmax')
  const [hover, setHover]     = useState<HoverState | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Pick template + aspect ratio based on field type
  type SportConfig = {
    template: Omit<TestPoint, 'gmax' | 'hic' | 'shear' | 'infill'>[]
    W: number
    H: number
    sport: string
  }
  const config: SportConfig = (() => {
    switch (field.type) {
      case 'football':
        return { template: FOOTBALL_TEMPLATE, W: 533, H: 1200, sport: 'football' }
      case 'soccer':
        return { template: SOCCER_TEMPLATE, W: 680, H: 1050, sport: 'soccer' }
      case 'baseball':
        return { template: BASEBALL_TEMPLATE, W: 760, H: 760, sport: 'baseball' }
      case 'lacrosse':
      case 'field_hockey':
        return { template: LACROSSE_TEMPLATE, W: 680, H: 1050, sport: field.type }
      default:
        return { template: LACROSSE_TEMPLATE, W: 680, H: 1050, sport: 'multi_purpose' }
    }
  })()

  const points = buildPoints(config.template, testingData)
  const gmaxAvg = avgGmax(points)
  const { label: statusLabel, color: statusColor } = statusFromGmax(gmaxAvg)

  function handleHover(pt: TestPoint | null, svgX: number, svgY: number) {
    if (!pt) { setHover(null); return }
    setHover({ point: pt, svgX, svgY })
  }

  // Label for non-standard sports
  const sportLabel = config.sport === 'field_hockey' ? 'Field Hockey'
    : config.sport === 'multi_purpose' ? 'Multi-Use Field' : undefined

  const innerProps: SvgInnerProps = {
    W: config.W, H: config.H,
    points, metric, hover,
    onHover: handleHover,
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{field.name}</h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span className="capitalize">{field.type.replace('_', ' ')}</span>
            {testingData && (
              <span>· Last tested {testingData.testingDate.toLocaleDateString()}</span>
            )}
            {!testingData && (
              <span className="text-amber-600">· Demo data — no test on file</span>
            )}
            <span>· {points.length} test points</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-gray-400 mb-0.5">Avg GMAX</div>
          <div className={`text-2xl font-black ${gmaxAvg >= 200 ? 'text-red-600' : gmaxAvg >= 165 ? 'text-amber-500' : gmaxAvg >= 120 ? 'text-emerald-600' : 'text-sky-600'}`}>
            {gmaxAvg}
          </div>
          <div className={`text-xs font-bold mt-0.5 ${statusColor.replace('text-', 'text-')}`}>
            {statusLabel}
          </div>
        </div>
      </div>

      {/* ── Metric tabs ── */}
      <div className="px-5 py-2 border-b border-gray-100 flex items-center gap-1">
        <span className="text-xs text-gray-400 mr-2">Color by:</span>
        {METRICS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setMetric(id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              metric === id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── SVG field diagram ── */}
      <div className="p-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${config.W} ${config.H}`}
          className="w-full rounded-lg overflow-hidden"
          style={{ maxHeight: maxDiagramHeight ?? '65vh', display: 'block' }}
        >
          {config.sport === 'football' && <FootballSVG {...innerProps} />}
          {config.sport === 'soccer' && <SoccerSVG {...innerProps} />}
          {config.sport === 'baseball' && <BaseballSVG {...innerProps} />}
          {(config.sport === 'lacrosse' || config.sport === 'field_hockey' || config.sport === 'multi_purpose') && (
            <RectangleSVG {...innerProps} label={sportLabel} />
          )}

          {/* Tooltip overlay — rendered in SVG space */}
          {hover && (
            <Tooltip hover={hover} W={config.W} H={config.H} />
          )}
        </svg>
      </div>

      {/* ── Legend ── */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <Legend metric={metric} />
      </div>
    </div>
  )
}
