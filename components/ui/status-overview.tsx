'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { designTokens } from '@/lib/design-tokens'

interface StatusOverviewProps {
  stats: {
    excellent: number
    good: number
    monitor: number
    critical: number
    total: number
  }
}

export function StatusOverview({ stats }: StatusOverviewProps) {
  const statusItems = [
    {
      label: 'Excellent',
      value: stats.excellent,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'Good',
      value: stats.good,
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Monitor',
      value: stats.monitor,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      label: 'Critical',
      value: stats.critical,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ]

  return (
    <div className={designTokens.components.card + ' p-6'}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={designTokens.typography.heading.h3}>Field Status Overview</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className={designTokens.typography.body.small}>Total Fields</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor}`}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`p-2 rounded-lg bg-white`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </motion.div>
              <div>
                <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                <div className={designTokens.typography.body.small + ' text-gray-600'}>{item.label}</div>
              </div>
            </div>
            
            {stats.total > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{Math.round((item.value / stats.total) * 100)}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / stats.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`h-2 rounded-full ${item.color.replace('text-', 'bg-')}`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}