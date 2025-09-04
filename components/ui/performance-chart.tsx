'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { designTokens } from '@/lib/design-tokens'
import { generateTimeSeriesData } from '@/lib/mock-data'

interface PerformanceChartProps {
  title: string
  timeframe: '7d' | '30d' | '90d'
  onTimeframeChange?: (timeframe: '7d' | '30d' | '90d') => void
}

export function PerformanceChart({ title, timeframe, onTimeframeChange }: PerformanceChartProps) {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90
  const data = generateTimeSeriesData(days)
  
  // Calculate trends
  const recent = data.slice(-7)
  const older = data.slice(-14, -7)
  const recentAvgGmax = recent.reduce((sum, d) => sum + d.gmax, 0) / recent.length
  const olderAvgGmax = older.reduce((sum, d) => sum + d.gmax, 0) / older.length
  const gmaxTrend = recentAvgGmax - olderAvgGmax

  const getTrendIcon = (trend: number) => {
    if (Math.abs(trend) < 1) return <Minus className="w-4 h-4 text-gray-500" />
    return trend > 0 ? 
      <TrendingUp className="w-4 h-4 text-red-500" /> : 
      <TrendingDown className="w-4 h-4 text-green-500" />
  }

  const getTrendColor = (trend: number) => {
    if (Math.abs(trend) < 1) return 'text-gray-600'
    return trend > 0 ? 'text-red-600' : 'text-green-600'
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number; dataKey: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: { color: string; name: string; value: number; dataKey: string }, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-medium">
                {entry.dataKey === 'infill' ? `${entry.value.toFixed(1)}mm` : entry.value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={designTokens.components.card + ' p-4 sm:p-6'}>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className={designTokens.typography.heading.h3}>{title}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className={designTokens.typography.body.small + ' text-gray-600'}>
              GMAX Trend:
            </span>
            <div className={`flex items-center space-x-1 ${getTrendColor(gmaxTrend)}`}>
              {getTrendIcon(gmaxTrend)}
              <span className="text-sm font-medium">
                {Math.abs(gmaxTrend) < 1 ? 'Stable' : 
                 gmaxTrend > 0 ? `+${gmaxTrend.toFixed(1)}` : gmaxTrend.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          {(['7d', '30d', '90d'] as const).map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTimeframeChange?.(period)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                timeframe === period
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {period}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference lines for safe limits */}
            <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4" />
            <ReferenceLine y={20} stroke="#f97316" strokeDasharray="4 4" />
            
            <Line 
              type="monotone" 
              dataKey="gmax" 
              stroke="#dc2626" 
              strokeWidth={2}
              dot={{ fill: '#dc2626', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: '#dc2626', strokeWidth: 2, fill: 'white' }}
              name="GMAX"
            />
            <Line 
              type="monotone" 
              dataKey="shear" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: '#2563eb', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: '#2563eb', strokeWidth: 2, fill: 'white' }}
              name="Shear"
            />
            <Line 
              type="monotone" 
              dataKey="infill" 
              stroke="#16a34a" 
              strokeWidth={2}
              dot={{ fill: '#16a34a', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: '#16a34a', strokeWidth: 2, fill: 'white' }}
              name="Infill Depth"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-red-600 font-semibold">{recentAvgGmax.toFixed(1)}</div>
          <div className={designTokens.typography.body.xs + ' text-gray-500'}>Avg GMAX (7d)</div>
        </div>
        <div className="text-center">
          <div className="text-blue-600 font-semibold">{recent.reduce((s, d) => s + d.shear, 0) / recent.length | 0}</div>
          <div className={designTokens.typography.body.xs + ' text-gray-500'}>Avg Shear (7d)</div>
        </div>
        <div className="text-center">
          <div className="text-green-600 font-semibold">{recent.reduce((s, d) => s + d.infill, 0) / recent.length | 0}mm</div>
          <div className={designTokens.typography.body.xs + ' text-gray-500'}>Avg Infill (7d)</div>
        </div>
      </div>
    </div>
  )
}