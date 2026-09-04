/**
 * Centralized field health / assessment status logic.
 *
 * This module is the single source of truth for turning raw test readings
 * (GMAX, infill depth, shear/traction, visual condition) into the status
 * labels shown throughout the app. UI components must call into this file
 * rather than hard-coding thresholds or color logic - see wireframe 09
 * (Field Health Status Decision Tree): "Do not hard-code testing thresholds
 * in UI components. Keep thresholds/status logic centralized."
 *
 * Decision tree:
 *   Reading -> compare to threshold -> Within / Monitor / Critical (per metric)
 *   -> worst-of across metrics+locations -> Assessment Status (Passed/Monitor/Failed)
 *   -> Field Health Status (Healthy/Monitor/Needs Attention/Critical)
 *   -> Alert/Recommendation when follow-up is needed
 */

import type {
  FieldStatus as PrismaFieldStatus,
  TestingStatus as PrismaTestingStatus,
  MaintenancePriority,
  MaintenanceStatus,
  ComplianceStatus,
} from '@prisma/client'

export type MetricStatus = 'within' | 'monitor' | 'critical'
export type AssessmentStatus = 'passed' | 'monitor' | 'failed'
export type FieldHealthStatus = 'healthy' | 'monitor' | 'needs_attention' | 'critical'
export type VisualCondition = 'good' | 'minor_wear' | 'repair_needed'

export type MetricKey = 'gmax' | 'infillDepth' | 'shear'

/** Target ranges shown to users ("Target 100-200", etc). Single source of truth. */
export const METRIC_THRESHOLDS: Record<MetricKey, { min: number; max: number; unit: string; label: string }> = {
  gmax: { min: 100, max: 200, unit: '', label: 'GMAX' },
  infillDepth: { min: 1.0, max: 2.0, unit: '"', label: 'Infill Depth' },
  shear: { min: 50, max: 120, unit: '', label: 'Shear / Traction' },
}

/** How far outside the target range a reading can be before it's "critical" rather than just "monitor". */
const MONITOR_BUFFERS: Record<MetricKey, { low: number; high: number }> = {
  gmax: { low: 0, high: 20 }, // GMAX only has a meaningful upper safety bound
  infillDepth: { low: 0.2, high: 0.3 },
  shear: { low: 10, high: 15 },
}

export function getMetricStatus(metric: MetricKey, value: number): MetricStatus {
  const { min, max } = METRIC_THRESHOLDS[metric]
  const buffer = MONITOR_BUFFERS[metric]

  if (metric === 'gmax') {
    if (value > max) return 'critical'
    if (value > max - buffer.high) return 'monitor'
    return 'within'
  }

  if (value < min - buffer.low || value > max + buffer.high) return 'critical'
  if (value < min || value > max) return 'monitor'
  return 'within'
}

export function getVisualStatus(condition: VisualCondition): MetricStatus {
  switch (condition) {
    case 'good':
      return 'within'
    case 'minor_wear':
      return 'monitor'
    case 'repair_needed':
      return 'critical'
  }
}

const STATUS_RANK: Record<MetricStatus, number> = { within: 0, monitor: 1, critical: 2 }

export function worstMetricStatus(statuses: MetricStatus[]): MetricStatus {
  return statuses.reduce((worst, s) => (STATUS_RANK[s] > STATUS_RANK[worst] ? s : worst), 'within' as MetricStatus)
}

export function metricStatusToAssessmentStatus(status: MetricStatus): AssessmentStatus {
  return status === 'within' ? 'passed' : status === 'monitor' ? 'monitor' : 'failed'
}

export interface PointReading {
  gmax: number
  infillDepth: number
  shear: number
  visualCondition: VisualCondition
}

export interface PointStatusResult {
  gmax: MetricStatus
  infillDepth: MetricStatus
  shear: MetricStatus
  visual: MetricStatus
  overall: MetricStatus
}

export function getPointStatus(reading: PointReading): PointStatusResult {
  const gmax = getMetricStatus('gmax', reading.gmax)
  const infillDepth = getMetricStatus('infillDepth', reading.infillDepth)
  const shear = getMetricStatus('shear', reading.shear)
  const visual = getVisualStatus(reading.visualCondition)
  return { gmax, infillDepth, shear, visual, overall: worstMetricStatus([gmax, infillDepth, shear, visual]) }
}

/** Aggregate every test location in an assessment into one Passed/Monitor/Failed result. */
export function getAssessmentStatus(readings: PointReading[]): AssessmentStatus {
  if (readings.length === 0) return 'monitor'
  const worst = worstMetricStatus(readings.map((r) => getPointStatus(r).overall))
  return metricStatusToAssessmentStatus(worst)
}

/**
 * Roll an assessment result (plus any open maintenance recommendations) up into the
 * persistent, customer-facing field status shown on the dashboard and fields table.
 */
export function getFieldHealthStatus(
  assessmentStatus: AssessmentStatus,
  openRecommendationPriority?: MaintenancePriority | null
): FieldHealthStatus {
  if (assessmentStatus === 'failed' || openRecommendationPriority === 'CRITICAL') return 'critical'
  if (openRecommendationPriority === 'HIGH') return 'needs_attention'
  if (assessmentStatus === 'monitor' || openRecommendationPriority === 'MEDIUM') return 'monitor'
  return 'healthy'
}

/** Map the legacy Prisma FieldStatus enum to the new customer-facing label, for fields with no fresh assessment computed yet. */
export function fieldStatusToHealthStatus(status: PrismaFieldStatus): FieldHealthStatus {
  switch (status) {
    case 'EXCELLENT':
    case 'GOOD':
      return 'healthy'
    case 'MONITOR':
      return 'monitor'
    case 'CRITICAL':
      return 'needs_attention'
    case 'OUT_OF_SERVICE':
      return 'critical'
  }
}

/** Map the legacy Prisma TestingStatus enum to the new assessment label. */
export function testingStatusToAssessmentStatus(status: PrismaTestingStatus): AssessmentStatus {
  switch (status) {
    case 'PASSED':
      return 'passed'
    case 'MONITOR':
      return 'monitor'
    case 'FAILED':
    case 'CRITICAL':
      return 'failed'
  }
}

interface StatusStyle {
  label: string
  text: string
  bg: string
  border: string
  dot: string
}

export const METRIC_STATUS_STYLES: Record<MetricStatus, StatusStyle> = {
  within: { label: 'Within Range', text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  monitor: { label: 'Monitor', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  critical: { label: 'Critical', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
}

export const ASSESSMENT_STATUS_STYLES: Record<AssessmentStatus, StatusStyle> = {
  passed: { label: 'Passed', text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  monitor: { label: 'Monitor', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  failed: { label: 'Failed', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
}

export const FIELD_HEALTH_STYLES: Record<FieldHealthStatus, StatusStyle> = {
  healthy: { label: 'Healthy', text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  monitor: { label: 'Monitor', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  needs_attention: { label: 'Needs Attention', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
  critical: { label: 'Critical', text: 'text-red-800', bg: 'bg-red-100', border: 'border-red-300', dot: 'bg-red-700' },
}

export const PRIORITY_STYLES: Record<MaintenancePriority, StatusStyle> = {
  LOW: { label: 'Low Priority', text: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400' },
  MEDIUM: { label: 'Medium Priority', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  HIGH: { label: 'High Priority', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
  CRITICAL: { label: 'Critical Priority', text: 'text-red-800', bg: 'bg-red-100', border: 'border-red-300', dot: 'bg-red-700' },
}

export const MAINTENANCE_STATUS_STYLES: Record<MaintenanceStatus, StatusStyle> = {
  OPEN: { label: 'Open', text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
  IN_PROGRESS: { label: 'In Progress', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  COMPLETED: { label: 'Completed', text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  CANCELLED: { label: 'Cancelled', text: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-gray-400' },
  ON_HOLD: { label: 'On Hold', text: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-gray-400' },
}

export const COMPLIANCE_STATUS_STYLES: Record<ComplianceStatus, StatusStyle> = {
  COMPLIANT: { label: 'Final', text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  VERIFIED: { label: 'Verified', text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
  PENDING_REVIEW: { label: 'Open', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  NON_COMPLIANT: { label: 'Non-Compliant', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
  EXPIRED: { label: 'Expired', text: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-gray-400' },
}

export const VISUAL_CONDITION_LABELS: Record<VisualCondition, string> = {
  good: 'Good',
  minor_wear: 'Minor Wear',
  repair_needed: 'Repair Needed',
}
