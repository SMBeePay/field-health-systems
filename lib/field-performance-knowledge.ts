/**
 * Field Health Systems - Field Performance Knowledge Base
 * Universal truths about artificial turf field performance metrics
 */

export interface FieldPerformanceStandards {
  gmax: {
    range: { min: number; max: number }
    safetyLimit: number
    optimal: { min: number; max: number }
  }
  infillDepth: {
    range: { min: number; max: number }
    optimal: { min: number; max: number }
  }
  shear: {
    range: { min: number; max: number }
    optimal: { min: number; max: number }
  }
}

// Sport-specific performance standards
export const SPORT_STANDARDS: Record<string, FieldPerformanceStandards> = {
  football: {
    gmax: {
      range: { min: 55, max: 200 },
      safetyLimit: 200,
      optimal: { min: 55, max: 120 }
    },
    infillDepth: {
      range: { min: 12, max: 25 },
      optimal: { min: 15, max: 20 }
    },
    shear: {
      range: { min: 15, max: 80 },
      optimal: { min: 25, max: 45 }
    }
  },
  soccer: {
    gmax: {
      range: { min: 55, max: 200 },
      safetyLimit: 130,
      optimal: { min: 55, max: 100 }
    },
    infillDepth: {
      range: { min: 12, max: 25 },
      optimal: { min: 12, max: 18 }
    },
    shear: {
      range: { min: 15, max: 80 },
      optimal: { min: 20, max: 40 }
    }
  },
  lacrosse: {
    gmax: {
      range: { min: 55, max: 200 },
      safetyLimit: 165,
      optimal: { min: 55, max: 110 }
    },
    infillDepth: {
      range: { min: 12, max: 25 },
      optimal: { min: 14, max: 19 }
    },
    shear: {
      range: { min: 15, max: 80 },
      optimal: { min: 22, max: 42 }
    }
  },
  field_hockey: {
    gmax: {
      range: { min: 55, max: 200 },
      safetyLimit: 120,
      optimal: { min: 55, max: 95 }
    },
    infillDepth: {
      range: { min: 12, max: 25 },
      optimal: { min: 12, max: 16 }
    },
    shear: {
      range: { min: 15, max: 80 },
      optimal: { min: 18, max: 35 }
    }
  },
  multi_purpose: {
    gmax: {
      range: { min: 55, max: 200 },
      safetyLimit: 165,
      optimal: { min: 55, max: 110 }
    },
    infillDepth: {
      range: { min: 12, max: 25 },
      optimal: { min: 14, max: 19 }
    },
    shear: {
      range: { min: 15, max: 80 },
      optimal: { min: 20, max: 40 }
    }
  },
  baseball: {
    gmax: {
      range: { min: 55, max: 200 },
      safetyLimit: 150,
      optimal: { min: 55, max: 105 }
    },
    infillDepth: {
      range: { min: 12, max: 25 },
      optimal: { min: 13, max: 18 }
    },
    shear: {
      range: { min: 15, max: 80 },
      optimal: { min: 20, max: 38 }
    }
  }
}

// Temperature impact factors
export const TEMPERATURE_IMPACT = {
  gmax: {
    // GMAX can double on hot days (>90°F)
    baseline: 70, // °F
    multiplier: 0.02, // per degree above baseline
    maxMultiplier: 2.0
  },
  infill: {
    // Infill can settle more in heat and expand
    thermalExpansion: 0.001 // per degree
  },
  shear: {
    // Shear can vary with temperature due to material properties
    baseline: 70, // °F
    multiplier: 0.005 // per degree
  }
}

// Field age impact
export const AGE_DEGRADATION = {
  gmax: {
    // GMAX typically increases 2-5% per year due to infill compaction
    yearlyIncrease: 0.03, // 3% per year average
    acceleratedAfter: 7 // years - degradation accelerates
  },
  infillDepth: {
    // Infill depth decreases over time due to migration and compaction
    yearlyDecrease: 0.8, // mm per year
    migrationFactor: 0.15 // additional loss in high-traffic areas
  }
}

export interface FieldConditionFactors {
  temperature?: number // °F
  humidity?: number // %
  fieldAge?: number // years
  lastMaintenance?: Date
  usage?: 'low' | 'moderate' | 'high' | 'extreme'
  weather?: 'dry' | 'wet' | 'frozen'
}

/**
 * Calculate temperature-adjusted GMAX reading
 */
export function calculateTemperatureAdjustedGMAX(
  rawGmax: number,
  temperature: number
): number {
  const tempDiff = temperature - TEMPERATURE_IMPACT.gmax.baseline
  const multiplier = Math.min(
    1 + (tempDiff * TEMPERATURE_IMPACT.gmax.multiplier),
    TEMPERATURE_IMPACT.gmax.maxMultiplier
  )
  return rawGmax * multiplier
}

/**
 * Calculate age-adjusted expected GMAX
 */
export function calculateAgeAdjustedGMAX(
  baselineGmax: number,
  fieldAge: number
): number {
  const degradationRate = fieldAge > AGE_DEGRADATION.gmax.acceleratedAfter 
    ? AGE_DEGRADATION.gmax.yearlyIncrease * 1.5 
    : AGE_DEGRADATION.gmax.yearlyIncrease
  
  return baselineGmax * (1 + degradationRate * fieldAge)
}

/**
 * Get performance status based on sport-specific standards
 */
export function getPerformanceStatus(
  metric: 'gmax' | 'infillDepth' | 'shear',
  value: number,
  sport: string,
  conditions?: FieldConditionFactors
): 'excellent' | 'good' | 'monitor' | 'critical' {
  const standards = SPORT_STANDARDS[sport] || SPORT_STANDARDS.multi_purpose
  const metricStandards = standards[metric]

  // Adjust value based on conditions if provided
  let adjustedValue = value
  if (conditions?.temperature && metric === 'gmax') {
    adjustedValue = calculateTemperatureAdjustedGMAX(value, conditions.temperature)
  }

  switch (metric) {
    case 'gmax':
      // Lower is better for GMAX
      const gmaxStandards = metricStandards as { range: { min: number; max: number }; safetyLimit: number; optimal: { min: number; max: number } }
      if (adjustedValue <= gmaxStandards.optimal.max) return 'excellent'
      if (adjustedValue <= gmaxStandards.safetyLimit * 0.8) return 'good'
      if (adjustedValue <= gmaxStandards.safetyLimit) return 'monitor'
      return 'critical'

    case 'infillDepth':
      // Within optimal range is best
      if (adjustedValue >= metricStandards.optimal.min && adjustedValue <= metricStandards.optimal.max) {
        return 'excellent'
      }
      if (adjustedValue >= metricStandards.range.min && adjustedValue <= metricStandards.range.max) {
        return 'good'
      }
      if (adjustedValue >= metricStandards.range.min * 0.8 && adjustedValue <= metricStandards.range.max * 1.2) {
        return 'monitor'
      }
      return 'critical'

    case 'shear':
      // Within optimal range is best
      if (adjustedValue >= metricStandards.optimal.min && adjustedValue <= metricStandards.optimal.max) {
        return 'excellent'
      }
      if (adjustedValue >= metricStandards.range.min && adjustedValue <= metricStandards.range.max) {
        return 'good'
      }
      if (adjustedValue >= metricStandards.range.min * 0.9 && adjustedValue <= metricStandards.range.max * 1.1) {
        return 'monitor'
      }
      return 'critical'

    default:
      return 'monitor'
  }
}

/**
 * Generate context-aware maintenance recommendations
 */
export function generateAdvancedRecommendations(
  gmaxAvg: number,
  shearAvg: number,
  infillDepthAvg: number,
  sport: string,
  conditions?: FieldConditionFactors
) {
  const recommendations = []
  const standards = SPORT_STANDARDS[sport] || SPORT_STANDARDS.multi_purpose

  // GMAX Analysis
  const gmaxStatus = getPerformanceStatus('gmax', gmaxAvg, sport, conditions)
  if (gmaxStatus === 'critical') {
    if (conditions?.temperature && conditions.temperature > 90) {
      recommendations.push({
        priority: 'critical' as const,
        category: 'immediate_action' as const,
        title: 'Critical Heat-Related GMAX - Immediate Field Closure Required',
        description: `GMAX reading of ${gmaxAvg.toFixed(1)} at ${conditions.temperature}°F exceeds critical safety limits. Hot weather has likely doubled the effective hardness. Close field immediately and schedule emergency maintenance.`,
        estimatedCost: 20000,
        estimatedDuration: '5-7 days',
        urgency: 'immediate'
      })
    } else {
      recommendations.push({
        priority: 'critical' as const,
        category: 'infill_replacement' as const,
        title: 'Critical GMAX Level - Complete Infill System Overhaul Required',
        description: `GMAX reading of ${gmaxAvg.toFixed(1)} exceeds ${sport} safety limits (>${standards.gmax.safetyLimit}). Indicates severe infill compaction or insufficient depth. Complete infill replacement and base inspection required.`,
        estimatedCost: 25000,
        estimatedDuration: '7-10 days',
        urgency: 'immediate'
      })
    }
  } else if (gmaxStatus === 'monitor') {
    recommendations.push({
      priority: 'high' as const,
      category: 'infill_redistribution' as const,
      title: 'Preventive GMAX Management - Infill Decompaction',
      description: `GMAX at ${gmaxAvg.toFixed(1)} is approaching ${sport} limits. Recommend power brushing, decompaction, and infill leveling to prevent further degradation.`,
      estimatedCost: 6000,
      estimatedDuration: '2-3 days'
    })
  }

  // Infill Depth Analysis
  const infillStatus = getPerformanceStatus('infillDepth', infillDepthAvg, sport)
  const optimalRange = standards.infillDepth.optimal
  
  if (infillDepthAvg < optimalRange.min) {
    recommendations.push({
      priority: infillDepthAvg < optimalRange.min * 0.8 ? 'critical' as const : 'high' as const,
      category: 'infill_replacement' as const,
      title: 'Insufficient Infill Depth - Performance and Safety Risk',
      description: `Current infill depth of ${infillDepthAvg.toFixed(1)}mm is below ${sport} requirements (${optimalRange.min}-${optimalRange.max}mm). This reduces shock absorption and increases injury risk. Add ${(optimalRange.min + optimalRange.max)/2 - infillDepthAvg}mm of infill.`,
      estimatedCost: Math.round((optimalRange.min + optimalRange.max)/2 - infillDepthAvg) * 800,
      estimatedDuration: '2-4 days'
    })
  } else if (infillDepthAvg > optimalRange.max) {
    recommendations.push({
      priority: infillDepthAvg > optimalRange.max * 1.3 ? 'high' as const : 'medium' as const,
      category: 'infill_redistribution' as const,
      title: 'Excessive Infill Depth - Instability Risk',
      description: `Infill depth of ${infillDepthAvg.toFixed(1)}mm exceeds ${sport} standards (${optimalRange.min}-${optimalRange.max}mm). This creates field instability and increased injury risk. Remove ${infillDepthAvg - (optimalRange.min + optimalRange.max)/2}mm of excess infill.`,
      estimatedCost: 4000,
      estimatedDuration: '1-2 days'
    })
  }

  // Shear Analysis
  const shearStatus = getPerformanceStatus('shear', shearAvg, sport)
  const shearOptimal = standards.shear.optimal
  
  if (shearAvg < shearOptimal.min) {
    recommendations.push({
      priority: shearAvg < shearOptimal.min * 0.8 ? 'critical' as const : 'high' as const,
      category: 'surface_treatment' as const,
      title: 'Insufficient Traction - Player Safety Risk',
      description: `Shear factor of ${shearAvg.toFixed(1)} Nm is below safe ${sport} levels (${shearOptimal.min}-${shearOptimal.max} Nm). Players may experience slipping. Check infill type, density, and consider fiber treatment.`,
      estimatedCost: 8000,
      estimatedDuration: '3-5 days'
    })
  } else if (shearAvg > shearOptimal.max) {
    recommendations.push({
      priority: shearAvg > shearOptimal.max * 1.2 ? 'high' as const : 'medium' as const,
      category: 'surface_treatment' as const,
      title: 'Excessive Rotational Resistance - Injury Risk',
      description: `Shear factor of ${shearAvg.toFixed(1)} Nm exceeds safe ${sport} levels (${shearOptimal.min}-${shearOptimal.max} Nm). High rotational resistance increases knee and ankle injury risk. Adjust infill or fiber system.`,
      estimatedCost: 7000,
      estimatedDuration: '2-4 days'
    })
  }

  // Interconnected Analysis
  if (gmaxStatus === 'critical' && infillDepthAvg < optimalRange.min) {
    recommendations.push({
      priority: 'critical' as const,
      category: 'comprehensive_renovation' as const,
      title: 'Field System Failure - Complete Renovation Required',
      description: `Multiple critical failures detected: High GMAX (${gmaxAvg.toFixed(1)}) combined with insufficient infill depth (${infillDepthAvg.toFixed(1)}mm) indicates systemic field degradation. Comprehensive renovation needed.`,
      estimatedCost: 45000,
      estimatedDuration: '2-3 weeks',
      urgency: 'immediate'
    })
  }

  // Age-based recommendations
  if (conditions?.fieldAge && conditions.fieldAge > 8) {
    recommendations.push({
      priority: 'medium' as const,
      category: 'inspection' as const,
      title: 'Aging Field Assessment - Comprehensive Evaluation Needed',
      description: `Field is ${conditions.fieldAge} years old. Age-related degradation may be accelerating. Schedule comprehensive assessment including drainage, base stability, and fiber condition evaluation.`,
      estimatedCost: 2500,
      estimatedDuration: '1 day'
    })
  }

  // Weather-based recommendations
  if (conditions?.weather === 'wet' && gmaxStatus !== 'excellent') {
    recommendations.push({
      priority: 'medium' as const,
      category: 'drainage_improvement' as const,
      title: 'Drainage System Evaluation - Water Management Issues',
      description: `Field performance may be compromised by moisture retention. Evaluate drainage system effectiveness and consider improvements to prevent water-related performance degradation.`,
      estimatedCost: 12000,
      estimatedDuration: '3-5 days'
    })
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

/**
 * Get field health insights based on all metrics and conditions
 */
export function getFieldHealthInsights(
  gmaxAvg: number,
  shearAvg: number,
  infillDepthAvg: number,
  sport: string,
  conditions?: FieldConditionFactors
): {
  overallStatus: 'excellent' | 'good' | 'monitor' | 'critical'
  riskLevel: 'low' | 'moderate' | 'high' | 'severe'
  primaryConcerns: string[]
  recommendations: ReturnType<typeof generateAdvancedRecommendations>
  nextTestingRecommended: number // days
} {
  const gmaxStatus = getPerformanceStatus('gmax', gmaxAvg, sport, conditions)
  const shearStatus = getPerformanceStatus('shear', shearAvg, sport)
  const infillStatus = getPerformanceStatus('infillDepth', infillDepthAvg, sport)
  
  const statusScores = { excellent: 4, good: 3, monitor: 2, critical: 1 }
  const worstStatus = Math.min(
    statusScores[gmaxStatus],
    statusScores[shearStatus],
    statusScores[infillStatus]
  )
  
  const overallStatus = Object.keys(statusScores).find(
    key => statusScores[key as keyof typeof statusScores] === worstStatus
  ) as 'excellent' | 'good' | 'monitor' | 'critical'

  const primaryConcerns: string[] = []
  if (gmaxStatus === 'critical') primaryConcerns.push('Critical shock absorption failure')
  if (shearStatus === 'critical') primaryConcerns.push('Dangerous traction levels')
  if (infillStatus === 'critical') primaryConcerns.push('Infill system failure')
  
  if (gmaxStatus === 'monitor') primaryConcerns.push('Hardness approaching unsafe levels')
  if (shearStatus === 'monitor') primaryConcerns.push('Traction outside optimal range')
  if (infillStatus === 'monitor') primaryConcerns.push('Infill depth variation')

  const riskLevel = 
    overallStatus === 'critical' ? 'severe' :
    overallStatus === 'monitor' ? 'high' :
    overallStatus === 'good' ? 'moderate' : 'low'

  const nextTestingRecommended = 
    overallStatus === 'critical' ? 7 :
    overallStatus === 'monitor' ? 14 :
    overallStatus === 'good' ? 60 : 90

  const recommendations = generateAdvancedRecommendations(
    gmaxAvg, shearAvg, infillDepthAvg, sport, conditions
  )

  return {
    overallStatus,
    riskLevel,
    primaryConcerns,
    recommendations,
    nextTestingRecommended
  }
}