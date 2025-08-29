'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Wrench, Calendar } from 'lucide-react'
import { MaintenanceRecommendation } from '@/lib/schemas'
import { designTokens } from '@/lib/design-tokens'
import { formatCurrency, formatDate } from '@/lib/utils'

interface MaintenanceAlertsProps {
  recommendations: MaintenanceRecommendation[]
  onViewAll?: () => void
}

export function MaintenanceAlerts({ recommendations, onViewAll }: MaintenanceAlertsProps) {
  const criticalRecommendations = recommendations
    .filter(rec => rec.status === 'pending' && (rec.priority === 'critical' || rec.priority === 'high'))
    .slice(0, 3) // Show top 3 critical items

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-700 bg-red-50 border-red-200'
      case 'high':
        return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === 'critical') return <AlertTriangle className="w-4 h-4" />
    return <Clock className="w-4 h-4" />
  }

  if (criticalRecommendations.length === 0) {
    return (
      <div className={designTokens.components.card + ' p-6'}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={designTokens.typography.heading.h3}>Maintenance Alerts</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewAll}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            View All
          </motion.button>
        </div>
        
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Wrench className="w-8 h-8 text-green-600" />
          </motion.div>
          <p className={designTokens.typography.body.base + ' text-gray-600'}>
            No critical maintenance alerts at this time.
          </p>
          <p className={designTokens.typography.body.small + ' text-gray-500 mt-1'}>
            All fields are performing well!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={designTokens.components.card + ' p-6'}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={designTokens.typography.heading.h3}>Maintenance Alerts</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewAll}
          className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
            {recommendations.filter(r => r.status === 'pending').length}
          </span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {criticalRecommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(recommendation.priority)}`}>
                    {getPriorityIcon(recommendation.priority)}
                    <span className="capitalize">{recommendation.priority}</span>
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {recommendation.category.replace('_', ' ')}
                  </span>
                </div>
                
                <h4 className={designTokens.typography.heading.h4 + ' mb-1'}>{recommendation.title}</h4>
                <p className={designTokens.typography.body.small + ' text-gray-600 mb-3 line-clamp-2'}>
                  {recommendation.description}
                </p>
                
                <div className="flex items-center space-x-4">
                  {recommendation.estimatedCost && (
                    <div className="flex items-center space-x-1">
                      <span className={designTokens.typography.body.xs + ' text-gray-500'}>Cost:</span>
                      <span className={designTokens.typography.body.small + ' font-medium'}>
                        {formatCurrency(recommendation.estimatedCost)}
                      </span>
                    </div>
                  )}
                  {recommendation.dueDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className={designTokens.typography.body.xs + ' text-gray-500'}>
                        Due: {formatDate(recommendation.dueDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {recommendations.filter(r => r.status === 'pending').length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <button
            onClick={onViewAll}
            className="text-sm text-gray-600 hover:text-gray-800 font-medium"
          >
            + {recommendations.filter(r => r.status === 'pending').length - 3} more alerts
          </button>
        </motion.div>
      )}
    </div>
  )
}