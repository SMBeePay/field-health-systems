'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { PerformanceChart } from '@/components/ui/performance-chart'
import { mockFields } from '@/lib/mock-data'
import { designTokens } from '@/lib/design-tokens'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Filter,
  Download,
  RefreshCw,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  PieChart,
  Settings
} from 'lucide-react'

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<'gmax' | 'infill' | 'shear' | 'cost'>('gmax')
  const [viewType, setViewType] = useState<'overview' | 'trends' | 'comparison'>('overview')

  // Mock analytics data
  const analyticsData = {
    totalFields: mockFields.length,
    avgGmax: 65.8,
    avgInfillDepth: 14.2,
    avgShearFactor: 29.5,
    totalCostSavings: 127500,
    trendsData: {
      gmax: [68.5, 67.2, 66.8, 65.9, 65.8],
      infill: [15.2, 14.8, 14.5, 14.3, 14.2],
      shear: [31.2, 30.8, 30.1, 29.8, 29.5],
      cost: [5200, 8900, 12500, 18200, 23800]
    },
    fieldComparison: mockFields.map(field => ({
      ...field,
      avgGmax: Math.random() * 30 + 50,
      avgInfill: Math.random() * 5 + 12,
      avgShear: Math.random() * 10 + 25,
      costSavings: Math.floor(Math.random() * 50000) + 10000
    }))
  }

  const performanceMetrics = [
    {
      title: 'Average GMAX',
      value: analyticsData.avgGmax,
      unit: '',
      change: -2.3,
      trend: 'down',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Infill Depth',
      value: analyticsData.avgInfillDepth,
      unit: 'mm',
      change: -1.8,
      trend: 'down',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Shear Factor',
      value: analyticsData.avgShearFactor,
      unit: 'Nm',
      change: -3.2,
      trend: 'down',
      icon: BarChart3,
      color: 'yellow'
    },
    {
      title: 'Cost Savings',
      value: analyticsData.totalCostSavings / 1000,
      unit: 'K',
      change: 15.2,
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    }
  ]

  const getStatusDistribution = () => {
    return mockFields.reduce(
      (acc, field) => {
        acc[field.status]++
        return acc
      },
      { excellent: 0, good: 0, monitor: 0, critical: 0 }
    )
  }

  const statusDistribution = getStatusDistribution()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={designTokens.typography.heading.h1}>Analytics & Insights</h1>
                  <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                    Advanced analytics and performance insights for all your fields
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh Data</span>
                  </button>
                  <button className={designTokens.components.button.outline + ' flex items-center space-x-2'}>
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button className={designTokens.components.button.primary + ' flex items-center space-x-2'}>
                    <Settings className="w-4 h-4" />
                    <span>Configure</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* View Type Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-6"
            >
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'trends', label: 'Trends', icon: TrendingUp },
                    { id: 'comparison', label: 'Field Comparison', icon: PieChart }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setViewType(id as 'overview' | 'trends' | 'comparison')}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        viewType === id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Time Range Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-8"
            >
              <div className={`${designTokens.components.card} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">Time Range:</span>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      {[
                        { value: '7d', label: '7 Days' },
                        { value: '30d', label: '30 Days' },
                        { value: '90d', label: '90 Days' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setTimeframe(option.value as '7d' | '30d' | '90d')}
                          className={`px-4 py-2 text-sm font-medium ${
                            timeframe === option.value
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Last updated: 2 hours ago
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content based on selected view */}
            <motion.div
              key={viewType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {viewType === 'overview' && (
                <div className="space-y-8">
                  {/* Performance Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {performanceMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`${designTokens.components.card} p-6`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {metric.value.toFixed(1)}{metric.unit}
                            </p>
                            <div className={`flex items-center mt-2 text-sm ${
                              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {metric.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 mr-1" />
                              ) : (
                                <TrendingDown className="w-4 h-4 mr-1" />
                              )}
                              {Math.abs(metric.change)}% vs last period
                            </div>
                          </div>
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            metric.color === 'green' ? 'bg-green-100' :
                            metric.color === 'blue' ? 'bg-blue-100' :
                            metric.color === 'yellow' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <metric.icon className={`w-6 h-6 ${
                              metric.color === 'green' ? 'text-green-600' :
                              metric.color === 'blue' ? 'text-blue-600' :
                              metric.color === 'yellow' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Field Status Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <PerformanceChart
                        title="Field Performance Trends"
                        timeframe={timeframe}
                        onTimeframeChange={setTimeframe}
                      />
                    </div>
                    <div className={`${designTokens.components.card} p-6`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Field Status Distribution</h3>
                      <div className="space-y-4">
                        {[
                          { status: 'excellent', count: statusDistribution.excellent, color: 'green', label: 'Excellent' },
                          { status: 'good', count: statusDistribution.good, color: 'blue', label: 'Good' },
                          { status: 'monitor', count: statusDistribution.monitor, color: 'yellow', label: 'Monitor' },
                          { status: 'critical', count: statusDistribution.critical, color: 'red', label: 'Critical' }
                        ].map((item) => {
                          const percentage = (item.count / mockFields.length) * 100
                          return (
                            <div key={item.status} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  item.color === 'green' ? 'bg-green-500' :
                                  item.color === 'blue' ? 'bg-blue-500' :
                                  item.color === 'yellow' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`} />
                                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">{item.count}</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      item.color === 'green' ? 'bg-green-500' :
                                      item.color === 'blue' ? 'bg-blue-500' :
                                      item.color === 'yellow' ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Recent Insights */}
                  <div className={`${designTokens.components.card} p-6`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Insights</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Performance Improvement</p>
                          <p className="text-sm text-gray-600">
                            Average GMAX scores have improved by 3.2% over the last quarter across all fields.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Maintenance Alert</p>
                          <p className="text-sm text-gray-600">
                            Infill depth trending downward on 2 fields. Consider scheduling redistribution.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Cost Savings Update</p>
                          <p className="text-sm text-gray-600">
                            Preventive maintenance program has saved $23,800 compared to reactive repairs this month.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewType === 'trends' && (
                <div className="space-y-6">
                  {/* Metric Selector */}
                  <div className={`${designTokens.components.card} p-6`}>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-900">Metric:</span>
                      <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        {[
                          { value: 'gmax', label: 'GMAX' },
                          { value: 'infill', label: 'Infill Depth' },
                          { value: 'shear', label: 'Shear Factor' },
                          { value: 'cost', label: 'Cost Savings' }
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => setSelectedMetric(option.value as 'gmax' | 'infill' | 'shear' | 'cost')}
                            className={`px-4 py-2 text-sm font-medium ${
                              selectedMetric === option.value
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trend Chart */}
                  <PerformanceChart
                    title={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trends`}
                    timeframe={timeframe}
                    onTimeframeChange={setTimeframe}
                  />

                  {/* Trend Analysis */}
                  <div className={`${designTokens.components.card} p-6`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Observations</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Overall performance trending upward</li>
                          <li>• Seasonal variations observed in winter months</li>
                          <li>• Proactive maintenance showing positive impact</li>
                          <li>• Cost savings increasing month over month</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Continue current maintenance schedule</li>
                          <li>• Monitor fields showing declining trends</li>
                          <li>• Plan budget based on projected costs</li>
                          <li>• Schedule deep cleaning for spring season</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewType === 'comparison' && (
                <div className="space-y-6">
                  {/* Field Comparison Table */}
                  <div className={`${designTokens.components.card} overflow-hidden`}>
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Field Performance Comparison</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg GMAX</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Infill Depth</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shear Factor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Savings</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {analyticsData.fieldComparison.map((field, index) => (
                            <motion.tr
                              key={field.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{field.name}</div>
                                  <div className="text-sm text-gray-500">{field.type}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  field.status === 'excellent' ? designTokens.colors.status.excellent.bg + ' ' + designTokens.colors.status.excellent.text :
                                  field.status === 'good' ? designTokens.colors.status.good.bg + ' ' + designTokens.colors.status.good.text :
                                  field.status === 'monitor' ? designTokens.colors.status.monitor.bg + ' ' + designTokens.colors.status.monitor.text :
                                  designTokens.colors.status.critical.bg + ' ' + designTokens.colors.status.critical.text
                                }`}>
                                  {field.status.charAt(0).toUpperCase() + field.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {field.avgGmax.toFixed(1)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {field.avgInfill.toFixed(1)}mm
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {field.avgShear.toFixed(1)}Nm
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${field.costSavings.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        field.status === 'excellent' ? 'bg-green-500' :
                                        field.status === 'good' ? 'bg-blue-500' :
                                        field.status === 'monitor' ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${field.status === 'excellent' ? 90 : field.status === 'good' ? 70 : field.status === 'monitor' ? 50 : 30}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {field.status === 'excellent' ? '90%' : field.status === 'good' ? '70%' : field.status === 'monitor' ? '50%' : '30%'}
                                  </span>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}