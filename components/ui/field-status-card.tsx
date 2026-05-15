'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Field } from '@/lib/schemas'
import { designTokens } from '@/lib/design-tokens'
import { getStatusColor, formatDate } from '@/lib/utils'

// The card accepts an optional latestTest prop.  When omitted the metrics section
// is simply hidden — no mock-data import needed.
interface LatestTest {
  gmaxAverage: number
  gmaxStatus: string
  shearAverage: number
  shearStatus: string
  infillDepthAverage: number
  infillDepthStatus: string
}

interface FieldStatusCardProps {
  field: Field
  latestTest?: LatestTest | null
  onClick?: () => void
}

function metricColor(status: string): string {
  const s = status.toLowerCase()
  if (s === 'excellent' || s === 'passed') return 'text-green-600'
  if (s === 'good') return 'text-teal-600'
  if (s === 'monitor') return 'text-yellow-600'
  return 'text-red-600'
}

export function FieldStatusCard({ field, latestTest, onClick }: FieldStatusCardProps) {
  const getStatusIcon = () => {
    const s = (field.status as string).toLowerCase()
    switch (s) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'good':
        return <CheckCircle className="w-5 h-5 text-teal-600" />
      case 'monitor':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  // Normalise status for getStatusColor (which expects lowercase)
  const normalisedStatus = (field.status as string).toLowerCase() as Field['status']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${designTokens.components.card} p-6 cursor-pointer ${designTokens.transitions.base} hover:shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className={designTokens.typography.heading.h4}>{field.name}</h3>
            <p className={designTokens.typography.body.small}>
              {(field.type as string).replace('_', ' ')}
              {field.surface ? ` • ${field.surface}` : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${getStatusColor(normalisedStatus)}`}
          >
            {normalisedStatus}
          </span>
        </div>
      </div>

      {/* Status Metrics — shown only when latestTest data is available */}
      {latestTest && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-lg font-semibold ${metricColor(latestTest.gmaxStatus)}`}>
              {latestTest.gmaxAverage.toFixed(1)}
            </div>
            <div className={designTokens.typography.body.xs + ' text-gray-500'}>GMAX</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${metricColor(latestTest.shearStatus)}`}>
              {latestTest.shearAverage.toFixed(1)}
            </div>
            <div className={designTokens.typography.body.xs + ' text-gray-500'}>Shear</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${metricColor(latestTest.infillDepthStatus)}`}>
              {latestTest.infillDepthAverage.toFixed(1)}mm
            </div>
            <div className={designTokens.typography.body.xs + ' text-gray-500'}>Infill Depth</div>
          </div>
        </div>
      )}

      {/* Last Testing Date */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className={designTokens.typography.body.small}>
            Last tested:{' '}
            {field.lastTestingDate ? formatDate(field.lastTestingDate) : 'Never'}
          </span>
        </div>

        {normalisedStatus === 'critical' && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center space-x-1 text-red-600"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-medium">Attention Required</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
