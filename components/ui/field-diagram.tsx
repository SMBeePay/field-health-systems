'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Field, TestingLocation, TestingData } from '@/lib/schemas'
import { designTokens } from '@/lib/design-tokens'

interface FieldDiagramProps {
  field: Field
  testingData?: TestingData
  className?: string
}

interface TooltipData {
  location: TestingLocation
  x: number
  y: number
}

export function FieldDiagram({ field, testingData, className = '' }: FieldDiagramProps) {
  const [hoveredLocation, setHoveredLocation] = useState<TooltipData | null>(null)

  const getStatusColor = (value: number, type: 'gmax' | 'shear' | 'infill') => {
    switch (type) {
      case 'gmax':
        if (value < 120) return 'text-green-600'
        if (value < 165) return 'text-yellow-600'
        if (value < 200) return 'text-orange-600'
        return 'text-red-600'
      case 'shear':
        if (value >= 25 && value <= 50) return 'text-green-600'
        if (value >= 20 || value <= 60) return 'text-yellow-600'
        return 'text-red-600'
      case 'infill':
        if (value >= 25 && value <= 38) return 'text-green-600'
        if (value >= 15 || value <= 45) return 'text-yellow-600'
        return 'text-red-600'
    }
  }

  const getMarkerColor = (location: TestingLocation) => {
    const gmax = location.gmaxReading || 0
    if (gmax < 120) return 'bg-green-500'
    if (gmax < 165) return 'bg-yellow-500'
    if (gmax < 200) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b">
          <h3 className={designTokens.typography.heading.h3}>
            {field.name} - Field Diagram
          </h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            {field.fieldDimensions && (
              <span>
                {field.fieldDimensions.length}" × {field.fieldDimensions.width}"
              </span>
            )}
            {testingData && (
              <span>
                Last tested: {testingData.testingDate.toLocaleDateString()}
              </span>
            )}
            <span>
              {testingData?.testingLocations?.length || 0} test locations
            </span>
          </div>
        </div>

        {/* Field Diagram */}
        <div className="relative">
          {/* Satellite Image */}
          {field.satelliteImageUrl ? (
            <div className="relative">
              <img
                src={field.satelliteImageUrl}
                alt={`Satellite view of ${field.name}`}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  // Fallback to placeholder if satellite image fails
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGFkNTRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZpZWxkIExheW91dDwvdGV4dD48L3N2Zz4='
                }}
              />
              
              {/* Testing Location Markers */}
              {testingData?.testingLocations?.map((location, index) => (
                <motion.div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${location.position.x * 100}%`,
                    top: `${location.position.y * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setHoveredLocation({
                      location,
                      x: rect.left + rect.width / 2,
                      y: rect.top
                    })
                  }}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getMarkerColor(location)} 
                               hover:scale-125 transition-transform duration-200`}
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white bg-black bg-opacity-75 px-2 py-1 rounded whitespace-nowrap">
                    {location.name}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Fallback Field Layout */
            <div className="w-full h-96 bg-green-500 relative">
              {/* Field markings based on sport type */}
              {field.type === 'football' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                  {/* Yard lines */}
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((yard) => (
                    <line
                      key={yard}
                      x1={`${(yard / 100) * 100}%`}
                      y1="10%"
                      x2={`${(yard / 100) * 100}%`}
                      y2="90%"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                  {/* Hash marks */}
                  <line x1="30%" y1="0%" x2="30%" y2="100%" stroke="white" strokeWidth="1" />
                  <line x1="70%" y1="0%" x2="70%" y2="100%" stroke="white" strokeWidth="1" />
                  {/* End zones */}
                  <rect x="0%" y="0%" width="17%" height="100%" fill="rgba(255,255,255,0.1)" />
                  <rect x="83%" y="0%" width="17%" height="100%" fill="rgba(255,255,255,0.1)" />
                </svg>
              )}
              
              {field.type === 'soccer' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                  {/* Center circle */}
                  <circle cx="50%" cy="50%" r="60" fill="none" stroke="white" strokeWidth="2" />
                  <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="2" />
                  {/* Goal boxes */}
                  <rect x="2%" y="25%" width="14%" height="50%" fill="none" stroke="white" strokeWidth="2" />
                  <rect x="84%" y="25%" width="14%" height="50%" fill="none" stroke="white" strokeWidth="2" />
                  {/* Penalty areas */}
                  <rect x="2%" y="15%" width="20%" height="70%" fill="none" stroke="white" strokeWidth="2" />
                  <rect x="78%" y="15%" width="20%" height="70%" fill="none" stroke="white" strokeWidth="2" />
                </svg>
              )}

              {/* Testing Location Markers */}
              {testingData?.testingLocations?.map((location, index) => (
                <motion.div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${location.position.x * 100}%`,
                    top: `${location.position.y * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setHoveredLocation({
                      location,
                      x: rect.left + rect.width / 2,
                      y: rect.top
                    })
                  }}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getMarkerColor(location)} 
                               hover:scale-125 transition-transform duration-200`}
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white bg-black bg-opacity-75 px-2 py-1 rounded whitespace-nowrap">
                    {location.name}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="p-4 bg-gray-50 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Excellent (&lt;120 GMAX)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Good (120-164 GMAX)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Monitor (165-199 GMAX)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Critical (200+ GMAX)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredLocation && (
        <motion.div
          className="fixed z-50 bg-black text-white p-3 rounded-lg shadow-xl min-w-64 pointer-events-none"
          style={{
            left: hoveredLocation.x,
            top: hoveredLocation.y - 10,
            transform: 'translateX(-50%) translateY(-100%)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="font-medium mb-2">{hoveredLocation.location.name}</div>
          <div className="space-y-1 text-sm">
            {hoveredLocation.location.zone && (
              <div className="text-gray-300">Zone: {hoveredLocation.location.zone}</div>
            )}
            {hoveredLocation.location.gmaxReading && (
              <div className="flex justify-between">
                <span>GMAX:</span>
                <span className={getStatusColor(hoveredLocation.location.gmaxReading, 'gmax')}>
                  {hoveredLocation.location.gmaxReading}
                </span>
              </div>
            )}
            {hoveredLocation.location.shearReading && (
              <div className="flex justify-between">
                <span>Shear:</span>
                <span className={getStatusColor(hoveredLocation.location.shearReading, 'shear')}>
                  {hoveredLocation.location.shearReading} N·m
                </span>
              </div>
            )}
            {hoveredLocation.location.infillDepthReading && (
              <div className="flex justify-between">
                <span>Infill:</span>
                <span className={getStatusColor(hoveredLocation.location.infillDepthReading, 'infill')}>
                  {hoveredLocation.location.infillDepthReading}mm
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}