'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Thermometer } from 'lucide-react'
import { Field, TestingData } from '@/lib/schemas'
import { designTokens } from '@/lib/design-tokens'
import { getSportStandards, formatCurrency } from '@/lib/utils'
import { getFieldHealthInsights, calculateTemperatureAdjustedGMAX } from '@/lib/field-performance-knowledge'

interface FieldInsightsProps {
  field: Field
  latestTestingData?: TestingData
  temperature?: number
  fieldAge?: number
}

export function FieldInsights({ field, latestTestingData, temperature, fieldAge }: FieldInsightsProps) {
  if (!latestTestingData) {
    return (
      <div className={designTokens.components.card + ' p-6'}>
        <h3 className={designTokens.typography.heading.h3 + ' mb-4'}>Field Performance Insights</h3>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className={designTokens.typography.body.base + ' text-gray-600'}>
            No testing data available for this field.
          </p>
          <p className={designTokens.typography.body.small + ' text-gray-500 mt-1'}>
            Complete a field test to see performance insights and recommendations.
          </p>
        </div>
      </div>
    )
  }

  const standards = getSportStandards(field.type)
  const insights = getFieldHealthInsights(
    latestTestingData.gmaxAverage,
    latestTestingData.shearAverage,
    latestTestingData.infillDepthAverage,
    field.type,
    {
      temperature,
      fieldAge
    }
  )

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'moderate':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'high':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'severe':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const tempAdjustedGmax = temperature 
    ? calculateTemperatureAdjustedGMAX(latestTestingData.gmaxAverage, temperature)
    : latestTestingData.gmaxAverage

  return (
    <div className={designTokens.components.card + ' p-6'}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={designTokens.typography.heading.h3}>Field Performance Insights</h3>
        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getRiskLevelColor(insights.riskLevel)}`}>
          {insights.riskLevel.charAt(0).toUpperCase() + insights.riskLevel.slice(1)} Risk
        </span>
      </div>

      {/* Performance Metrics vs Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* GMAX Analysis */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={designTokens.typography.body.small + ' font-medium text-gray-700'}>
              GMAX (Shock Absorption)
            </span>
            {temperature && Math.abs(tempAdjustedGmax - latestTestingData.gmaxAverage) > 5 && (
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-orange-600">Heat Impact</span>
              </div>
            )}
          </div>
          <div className="flex items-end space-x-2 mb-2">
            <span className={`text-2xl font-bold ${
              insights.overallStatus === 'excellent' ? 'text-green-600' :
              insights.overallStatus === 'good' ? 'text-blue-600' :
              insights.overallStatus === 'monitor' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {latestTestingData.gmaxAverage.toFixed(1)}
            </span>
            {temperature && tempAdjustedGmax !== latestTestingData.gmaxAverage && (
              <span className="text-sm text-orange-600">
                (→{tempAdjustedGmax.toFixed(1)} @ {temperature}°F)
              </span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Optimal: &lt;{standards.gmax.optimal.max}</span>
              <span>Limit: &lt;{standards.gmax.safetyLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  latestTestingData.gmaxAverage <= standards.gmax.optimal.max ? 'bg-green-500' :
                  latestTestingData.gmaxAverage <= standards.gmax.safetyLimit * 0.8 ? 'bg-blue-500' :
                  latestTestingData.gmaxAverage <= standards.gmax.safetyLimit ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((latestTestingData.gmaxAverage / standards.gmax.safetyLimit) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Shear Analysis */}
        <div className="bg-gray-50 rounded-lg p-4">
          <span className={designTokens.typography.body.small + ' font-medium text-gray-700 block mb-2'}>
            Shear Factor (Traction)
          </span>
          <div className="flex items-end space-x-2 mb-2">
            <span className={`text-2xl font-bold ${
              latestTestingData.shearStatus === 'excellent' ? 'text-green-600' :
              latestTestingData.shearStatus === 'good' ? 'text-blue-600' :
              latestTestingData.shearStatus === 'monitor' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {latestTestingData.shearAverage.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">Nm</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Range: {standards.shear.optimal.min}-{standards.shear.optimal.max}</span>
              <span>Balance is key</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  latestTestingData.shearAverage >= standards.shear.optimal.min && 
                  latestTestingData.shearAverage <= standards.shear.optimal.max ? 'bg-green-500' :
                  latestTestingData.shearAverage >= standards.shear.range.min && 
                  latestTestingData.shearAverage <= standards.shear.range.max ? 'bg-blue-500' : 'bg-yellow-500'
                }`}
                style={{ 
                  width: `${Math.min(Math.max((latestTestingData.shearAverage / standards.shear.range.max) * 100, 10), 100)}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Infill Depth Analysis */}
        <div className="bg-gray-50 rounded-lg p-4">
          <span className={designTokens.typography.body.small + ' font-medium text-gray-700 block mb-2'}>
            Infill Depth
          </span>
          <div className="flex items-end space-x-2 mb-2">
            <span className={`text-2xl font-bold ${
              latestTestingData.infillDepthStatus === 'excellent' ? 'text-green-600' :
              latestTestingData.infillDepthStatus === 'good' ? 'text-blue-600' :
              latestTestingData.infillDepthStatus === 'monitor' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {latestTestingData.infillDepthAverage.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">mm</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Target: {standards.infillDepth.optimal.min}-{standards.infillDepth.optimal.max}mm</span>
              <span>{field.type.replace('_', ' ')}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  latestTestingData.infillDepthAverage >= standards.infillDepth.optimal.min && 
                  latestTestingData.infillDepthAverage <= standards.infillDepth.optimal.max ? 'bg-green-500' :
                  latestTestingData.infillDepthAverage >= standards.infillDepth.range.min && 
                  latestTestingData.infillDepthAverage <= standards.infillDepth.range.max ? 'bg-blue-500' : 'bg-yellow-500'
                }`}
                style={{ 
                  width: `${Math.min((latestTestingData.infillDepthAverage / standards.infillDepth.range.max) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Concerns */}
      {insights.primaryConcerns.length > 0 && (
        <div className="mb-6">
          <h4 className={designTokens.typography.heading.h4 + ' mb-3 flex items-center space-x-2'}>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span>Primary Concerns</span>
          </h4>
          <div className="space-y-2">
            {insights.primaryConcerns.map((concern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 text-sm"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0" />
                <span className="text-gray-700">{concern}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Top Recommendations Preview */}
      <div className="mb-6">
        <h4 className={designTokens.typography.heading.h4 + ' mb-3'}>Priority Recommendations</h4>
        <div className="space-y-3">
          {insights.recommendations.slice(0, 2).map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className={designTokens.typography.body.base + ' font-medium text-gray-900 line-clamp-1'}>
                  {rec.title}
                </h5>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ml-2 flex-shrink-0 ${
                  rec.priority === 'critical' ? 'text-red-700 bg-red-50 border-red-200' :
                  rec.priority === 'high' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                  rec.priority === 'medium' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' :
                  'text-gray-700 bg-gray-50 border-gray-200'
                }`}>
                  {rec.priority}
                </span>
              </div>
              <p className={designTokens.typography.body.small + ' text-gray-600 line-clamp-2 mb-2'}>
                {rec.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={designTokens.typography.body.small + ' text-gray-500'}>
                  {rec.estimatedDuration}
                </span>
                {rec.estimatedCost && (
                  <span className={designTokens.typography.body.small + ' font-medium text-gray-900'}>
                    {formatCurrency(rec.estimatedCost)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {insights.recommendations.length > 2 && (
          <p className={designTokens.typography.body.small + ' text-gray-500 mt-2 text-center'}>
            +{insights.recommendations.length - 2} more recommendations available
          </p>
        )}
      </div>

      {/* Next Testing Schedule */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className={designTokens.typography.body.small + ' font-medium text-blue-900'}>
            Next Testing Recommended
          </span>
        </div>
        <p className={designTokens.typography.body.small + ' text-blue-800'}>
          Based on current field status, next testing should occur in{' '}
          <span className="font-medium">{insights.nextTestingRecommended} days</span>
          {insights.overallStatus === 'critical' && (
            <span className="text-red-700"> (Continuous monitoring required)</span>
          )}
        </p>
      </div>
    </div>
  )
}