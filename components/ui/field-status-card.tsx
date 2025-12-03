'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, AlertTriangle, CheckCircle, Clock, XCircle, Sparkles } from 'lucide-react'
import { Field } from '@/lib/schemas'
import { designTokens } from '@/lib/design-tokens'
import { getStatusColor, formatDate, cn } from '@/lib/utils'
import { mockTestingData } from '@/lib/mock-data'

interface FieldStatusCardProps {
  field: Field
  onClick?: () => void
}

export function FieldStatusCard({ field, onClick }: FieldStatusCardProps) {
  const latestTest = mockTestingData.find(test => test.fieldId === field.id)

  const getStatusIcon = () => {
    switch (field.status) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-cyan-600" />
      case 'good':
        return <CheckCircle className="w-5 h-5 text-indigo-600" />
      case 'monitor':
        return <Clock className="w-5 h-5 text-amber-600" />
      case 'critical':
        return <XCircle className="w-5 h-5 text-rose-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-slate-600" />
    }
  }

  const getStatusBadge = () => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full shadow-md"
    switch (field.status) {
      case 'excellent':
        return `${baseClasses} ${designTokens.colors.status.excellent.bg} ${designTokens.colors.status.excellent.text} border-2 ${designTokens.colors.status.excellent.border}`
      case 'good':
        return `${baseClasses} ${designTokens.colors.status.good.bg} ${designTokens.colors.status.good.text} border-2 ${designTokens.colors.status.good.border}`
      case 'monitor':
        return `${baseClasses} ${designTokens.colors.status.monitor.bg} ${designTokens.colors.status.monitor.text} border-2 ${designTokens.colors.status.monitor.border}`
      case 'critical':
        return `${baseClasses} ${designTokens.colors.status.critical.bg} ${designTokens.colors.status.critical.text} border-2 ${designTokens.colors.status.critical.border}`
      default:
        return `${baseClasses} bg-slate-100 text-slate-700 border-2 border-slate-300`
    }
  }

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-cyan-600'
      case 'good':
        return 'text-indigo-600'
      case 'monitor':
        return 'text-amber-600'
      case 'critical':
        return 'text-rose-600'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative p-6 cursor-pointer overflow-hidden group",
        designTokens.components.card
      )}
    >
      {/* Decorative field grid pattern */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        designTokens.patterns.fieldGrid
      )} />

      {/* Gradient orb decoration */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-5">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/30"
          >
            <MapPin className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{field.name}</h3>
            <p className="text-sm text-slate-600 font-medium">
              {field.type.replace('_', ' ')} • {field.surface}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2"
          >
            {getStatusIcon()}
          </motion.div>
          <span className={getStatusBadge()}>
            {field.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Status Metrics - Enhanced Design */}
      {latestTest && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200/50 text-center overflow-hidden group/metric"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity" />
            <div className={cn(
              "relative text-2xl font-black",
              getMetricColor(latestTest.gmaxStatus)
            )}>
              {latestTest.gmaxAverage.toFixed(1)}
            </div>
            <div className="relative text-xs font-bold text-slate-600 uppercase tracking-wide">GMAX</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200/50 text-center overflow-hidden group/metric"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity" />
            <div className={cn(
              "relative text-2xl font-black",
              getMetricColor(latestTest.shearStatus)
            )}>
              {latestTest.shearAverage.toFixed(1)}
            </div>
            <div className="relative text-xs font-bold text-slate-600 uppercase tracking-wide">Shear</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200/50 text-center overflow-hidden group/metric"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity" />
            <div className={cn(
              "relative text-2xl font-black",
              getMetricColor(latestTest.infillDepthStatus)
            )}>
              {latestTest.infillDepthAverage.toFixed(1)}
              <span className="text-sm">mm</span>
            </div>
            <div className="relative text-xs font-bold text-slate-600 uppercase tracking-wide">Infill</div>
          </motion.div>
        </div>
      )}

      {/* Last Testing Date - Enhanced */}
      <div className="relative flex items-center justify-between pt-4 border-t-2 border-gradient-to-r from-indigo-100 to-purple-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-100 rounded-lg">
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-sm font-semibold text-slate-700">
            Last tested: {field.lastTestingDate ? formatDate(field.lastTestingDate) : 'Never'}
          </span>
        </div>

        {field.status === 'critical' && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg shadow-rose-500/30"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">URGENT</span>
          </motion.div>
        )}

        {field.status === 'excellent' && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex items-center space-x-1 text-cyan-600"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}