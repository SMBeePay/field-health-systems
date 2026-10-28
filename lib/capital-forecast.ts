/**
 * Capital forecast — projects when a turf field will need replacement and how
 * much a district should reserve each year, using two independent signals:
 *
 *   1. Age: install date vs. a typical service life.
 *   2. Condition: the GMAX trend from FHS's own ASTM F1936 test history.
 *
 * The earlier of the two drives the projection. Every assumption is a named
 * constant below so it can be shown on reports and tuned per client.
 */

// ── Assumptions ─────────────────────────────────────────────────────────────
export const FORECAST_ASSUMPTIONS = {
  /** Typical synthetic turf service life in years (industry range ~8–10). */
  typicalLifeYears: 10,
  /** ASTM F1936 hard limit — field must not exceed this GMAX. */
  gmaxLimit: 200,
  /** Planning threshold — start replacement planning above this GMAX. */
  gmaxPlanningThreshold: 165,
  /** Assumed GMAX of a newly installed field, used when only one test exists. */
  gmaxAtInstall: 100,
  /** Annual cost inflation applied to the replacement cost. */
  annualCostInflation: 0.04,
  /** Fallback replacement cost per square foot when no cost is entered. */
  defaultCostPerSqFt: 9,
  /** Minimum span of test history (days) before a trend line is trusted. */
  minTrendSpanDays: 120,
} as const

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000

export type ForecastDriver = 'gmax' | 'age'
export type ForecastConfidence = 'high' | 'medium' | 'low'
export type CostSource = 'entered' | 'estimated' | 'none'

export interface ForecastTest {
  testingDate: Date | string
  gmaxAverage: number
}

export interface ForecastInput {
  installDate?: Date | string | null
  replacementCost?: number | null
  totalArea?: number | null
  length?: number | null // yards
  width?: number | null // yards
  tests: ForecastTest[]
  now?: Date
}

export interface CapitalForecast {
  fieldAgeYears: number
  ageBasedEndOfLife: Date
  /** Date the GMAX trend crosses the F1936 limit, if the trend is rising. */
  gmaxLimitDate: Date | null
  /** Date the GMAX trend crosses the planning threshold, if rising. */
  gmaxPlanningDate: Date | null
  /** GMAX change per year from the trend (positive = getting harder). */
  gmaxSlopePerYear: number | null
  latestGmax: number | null
  projectedReplacementDate: Date
  projectedReplacementYear: number
  remainingLifeYears: number
  driver: ForecastDriver
  confidence: ForecastConfidence
  testsUsed: number
  /** Today's-dollars replacement cost, or null when it can't be estimated. */
  currentReplacementCost: number | null
  costSource: CostSource
  /** Inflation-adjusted cost in the projected replacement year. */
  futureReplacementCost: number | null
  /** Even annual contribution needed to fund the future cost on time. */
  annualReserve: number | null
  /** True when the field is already past end of life or over the F1936 limit. */
  overdue: boolean
}

function toDate(d: Date | string): Date {
  return d instanceof Date ? d : new Date(d)
}

function addYears(date: Date, years: number): Date {
  return new Date(date.getTime() + years * MS_PER_YEAR)
}

function yearsBetween(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / MS_PER_YEAR
}

/** Least-squares line through (t, gmax) where t is years since install. */
function fitTrend(points: { t: number; g: number }[]): { slope: number; intercept: number } | null {
  if (points.length < 2) return null
  const n = points.length
  const meanT = points.reduce((s, p) => s + p.t, 0) / n
  const meanG = points.reduce((s, p) => s + p.g, 0) / n
  let num = 0
  let den = 0
  for (const p of points) {
    num += (p.t - meanT) * (p.g - meanG)
    den += (p.t - meanT) ** 2
  }
  if (den === 0) return null
  const slope = num / den
  return { slope, intercept: meanG - slope * meanT }
}

function estimateCost(input: ForecastInput): { cost: number | null; source: CostSource } {
  if (input.replacementCost && input.replacementCost > 0) {
    return { cost: input.replacementCost, source: 'entered' }
  }
  let area = input.totalArea && input.totalArea > 0 ? input.totalArea : null
  if (!area && input.length && input.width) {
    area = input.length * 3 * (input.width * 3) // yards → sq ft
  }
  if (area) {
    return {
      cost: Math.round(area * FORECAST_ASSUMPTIONS.defaultCostPerSqFt),
      source: 'estimated',
    }
  }
  return { cost: null, source: 'none' }
}

/**
 * Returns null when there is no install date — the one input the forecast
 * can't work without.
 */
export function forecastField(input: ForecastInput): CapitalForecast | null {
  if (!input.installDate) return null
  const install = toDate(input.installDate)
  if (Number.isNaN(install.getTime())) return null

  const A = FORECAST_ASSUMPTIONS
  const now = input.now ?? new Date()
  const fieldAgeYears = Math.max(0, yearsBetween(install, now))
  const ageBasedEndOfLife = addYears(install, A.typicalLifeYears)

  // Valid tests after install, oldest first
  const tests = input.tests
    .map((t) => ({ date: toDate(t.testingDate), g: Number(t.gmaxAverage) }))
    .filter((t) => !Number.isNaN(t.date.getTime()) && Number.isFinite(t.g) && t.g > 0)
    .filter((t) => t.date >= install)
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const latestGmax = tests.length ? tests[tests.length - 1].g : null

  // Build the GMAX trend
  let slope: number | null = null
  let intercept: number | null = null
  let confidence: ForecastConfidence = 'low'

  const spanDays =
    tests.length >= 2
      ? (tests[tests.length - 1].date.getTime() - tests[0].date.getTime()) / 86_400_000
      : 0

  if (tests.length >= 2 && spanDays >= A.minTrendSpanDays) {
    const fit = fitTrend(tests.map((t) => ({ t: yearsBetween(install, t.date), g: t.g })))
    if (fit) {
      slope = fit.slope
      intercept = fit.intercept
      confidence = tests.length >= 3 && spanDays >= 365 ? 'high' : 'medium'
    }
  } else if (tests.length >= 1) {
    // One usable point: line from the assumed as-installed GMAX to the latest test
    const last = tests[tests.length - 1]
    const t = yearsBetween(install, last.date)
    if (t > 0.25) {
      slope = (last.g - A.gmaxAtInstall) / t
      intercept = A.gmaxAtInstall
    }
  }

  const crossDate = (threshold: number): Date | null => {
    if (slope === null || intercept === null || slope <= 0) return null
    // Already over the threshold on the latest test → now
    if (latestGmax !== null && latestGmax >= threshold) return now
    const tCross = (threshold - intercept) / slope
    if (!Number.isFinite(tCross)) return null
    const d = addYears(install, tCross)
    return d < now ? now : d
  }

  const gmaxLimitDate = crossDate(A.gmaxLimit)
  const gmaxPlanningDate = crossDate(A.gmaxPlanningThreshold)

  // The earlier of age-based end of life and the F1936 limit drives replacement
  let projectedReplacementDate = ageBasedEndOfLife
  let driver: ForecastDriver = 'age'
  if (gmaxLimitDate && gmaxLimitDate < ageBasedEndOfLife) {
    projectedReplacementDate = gmaxLimitDate
    driver = 'gmax'
  }

  const overdue =
    projectedReplacementDate <= now || (latestGmax !== null && latestGmax >= A.gmaxLimit)
  const remainingLifeYears = Math.max(0, yearsBetween(now, projectedReplacementDate))

  // Money
  const { cost, source } = estimateCost(input)
  let futureReplacementCost: number | null = null
  let annualReserve: number | null = null
  if (cost !== null) {
    futureReplacementCost = Math.round(cost * (1 + A.annualCostInflation) ** remainingLifeYears)
    annualReserve = Math.round(futureReplacementCost / Math.max(remainingLifeYears, 1))
  }

  return {
    fieldAgeYears,
    ageBasedEndOfLife,
    gmaxLimitDate,
    gmaxPlanningDate,
    gmaxSlopePerYear: slope,
    latestGmax,
    projectedReplacementDate,
    projectedReplacementYear: projectedReplacementDate.getFullYear(),
    remainingLifeYears,
    driver,
    confidence,
    testsUsed: tests.length,
    currentReplacementCost: cost,
    costSource: source,
    futureReplacementCost,
    annualReserve,
    overdue,
  }
}

export function formatCurrency(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—'
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}
