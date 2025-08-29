import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FieldStatus, TestingData, FieldType } from './schemas'
import { getPerformanceStatus, generateAdvancedRecommendations, SPORT_STANDARDS } from './field-performance-knowledge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculateGMAXStatus(average: number, sport: FieldType = 'multi_purpose', temperature?: number): FieldStatus {
  return getPerformanceStatus('gmax', average, sport, temperature ? { temperature } : undefined)
}

export function calculateShearStatus(average: number, sport: FieldType = 'multi_purpose'): FieldStatus {
  return getPerformanceStatus('shear', average, sport)
}

export function calculateInfillDepthStatus(average: number, sport: FieldType = 'multi_purpose'): FieldStatus {
  return getPerformanceStatus('infillDepth', average, sport)
}

export function calculateOverallStatus(gmaxStatus: FieldStatus, shearStatus: FieldStatus, infillStatus: FieldStatus): FieldStatus {
  const statusValues = { excellent: 4, good: 3, monitor: 2, critical: 1 }
  const scores = [statusValues[gmaxStatus], statusValues[shearStatus], statusValues[infillStatus]]
  const minScore = Math.min(...scores)
  
  if (minScore === 1) return 'critical'
  if (minScore === 2) return 'monitor'
  if (scores.every(score => score >= 4)) return 'excellent'
  return 'good'
}

export function getStatusColor(status: FieldStatus): string {
  switch (status) {
    case 'excellent':
      return 'text-green-700 bg-green-50 border-green-200'
    case 'good':
      return 'text-blue-700 bg-blue-50 border-blue-200'
    case 'monitor':
      return 'text-yellow-700 bg-yellow-50 border-yellow-200'
    case 'critical':
      return 'text-red-700 bg-red-50 border-red-200'
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200'
  }
}

export function getStatusIcon(status: FieldStatus): string {
  switch (status) {
    case 'excellent':
      return '✓'
    case 'good':
      return '○'
    case 'monitor':
      return '△'
    case 'critical':
      return '✗'
    default:
      return '?'
  }
}

export function parseNumberArray(input: string): number[] {
  return input
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => parseFloat(s))
    .filter(n => !isNaN(n))
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

export function generateRecommendations(
  testingData: TestingData, 
  sport: FieldType = 'multi_purpose',
  temperature?: number,
  fieldAge?: number
) {
  return generateAdvancedRecommendations(
    testingData.gmaxAverage,
    testingData.shearAverage,
    testingData.infillDepthAverage,
    sport,
    {
      temperature,
      fieldAge
    }
  )
}

// Helper function to get sport-specific standards for display
export function getSportStandards(sport: FieldType) {
  return SPORT_STANDARDS[sport] || SPORT_STANDARDS.multi_purpose
}