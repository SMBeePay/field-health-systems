'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Upload, Calendar, User, Thermometer, Cloud } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { designTokens } from '@/lib/design-tokens'
import { mockFields } from '@/lib/mock-data'
import { parseNumberArray, calculateAverage, calculateGMAXStatus, calculateShearStatus, calculateInfillDepthStatus, calculateOverallStatus, getSportStandards } from '@/lib/utils'

export default function TestingDataPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    fieldId: '',
    testingDate: new Date().toISOString().split('T')[0],
    testingTechnician: '',
    weatherConditions: '',
    temperature: '',
    gmaxReadings: '',
    shearReadings: '',
    infillDepthReadings: '',
    notes: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Parse readings
    const gmaxReadings = parseNumberArray(formData.gmaxReadings)
    const shearReadings = parseNumberArray(formData.shearReadings)
    const infillReadings = parseNumberArray(formData.infillDepthReadings)
    
    // Calculate averages and statuses
    const gmaxAverage = calculateAverage(gmaxReadings)
    const shearAverage = calculateAverage(shearReadings)
    const infillAverage = calculateAverage(infillReadings)
    
    const gmaxStatus = calculateGMAXStatus(gmaxAverage)
    const shearStatus = calculateShearStatus(shearAverage)
    const infillStatus = calculateInfillDepthStatus(infillAverage)
    const overallStatus = calculateOverallStatus(gmaxStatus, shearStatus, infillStatus)
    
    console.log('New testing data:', {
      ...formData,
      gmaxReadings,
      shearReadings,
      infillReadings,
      gmaxAverage,
      shearAverage,
      infillAverage,
      gmaxStatus,
      shearStatus,
      infillStatus,
      overallStatus,
    })
    
    // Reset form
    setFormData({
      fieldId: '',
      testingDate: new Date().toISOString().split('T')[0],
      testingTechnician: '',
      weatherConditions: '',
      temperature: '',
      gmaxReadings: '',
      shearReadings: '',
      infillDepthReadings: '',
      notes: '',
    })
    setIsFormOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className={designTokens.typography.heading.h1}>Testing Data Management</h1>
                <p className={designTokens.typography.body.large + ' text-gray-600 mt-2'}>
                  Input and track field testing measurements
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFormOpen(true)}
                className={designTokens.components.button.primary + ' flex items-center space-x-2'}
              >
                <Plus className="w-4 h-4" />
                <span>Add Test Data</span>
              </motion.button>
            </motion.div>

            {/* Testing Form Modal */}
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={(e) => e.target === e.currentTarget && setIsFormOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={designTokens.typography.heading.h2}>New Field Test</h2>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Field Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field *
                      </label>
                      <select
                        name="fieldId"
                        value={formData.fieldId}
                        onChange={handleInputChange}
                        required
                        className={designTokens.components.input}
                      >
                        <option value="">Select a field</option>
                        {mockFields.map(field => (
                          <option key={field.id} value={field.id}>
                            {field.name} - {field.type.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Test Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Testing Date *
                        </label>
                        <input
                          type="date"
                          name="testingDate"
                          value={formData.testingDate}
                          onChange={handleInputChange}
                          required
                          className={designTokens.components.input}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          Testing Technician *
                        </label>
                        <input
                          type="text"
                          name="testingTechnician"
                          value={formData.testingTechnician}
                          onChange={handleInputChange}
                          placeholder="Name, Company"
                          required
                          className={designTokens.components.input}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Cloud className="w-4 h-4 inline mr-1" />
                          Weather Conditions
                        </label>
                        <input
                          type="text"
                          name="weatherConditions"
                          value={formData.weatherConditions}
                          onChange={handleInputChange}
                          placeholder="e.g., Clear, 65°F"
                          className={designTokens.components.input}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Thermometer className="w-4 h-4 inline mr-1" />
                          Temperature (°F)
                        </label>
                        <input
                          type="number"
                          name="temperature"
                          value={formData.temperature}
                          onChange={handleInputChange}
                          placeholder="65"
                          className={designTokens.components.input}
                        />
                      </div>
                    </div>

                    {/* Testing Readings */}
                    <div className="space-y-4">
                      <h3 className={designTokens.typography.heading.h4}>Testing Measurements</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GMAX Readings * <span className="text-gray-500 font-normal">(comma-separated values)</span>
                        </label>
                        <input
                          type="text"
                          name="gmaxReadings"
                          value={formData.gmaxReadings}
                          onChange={handleInputChange}
                          placeholder="75, 78, 72, 76, 74, 77, 73, 75"
                          required
                          className={designTokens.components.input}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter multiple readings separated by commas. Safe limit: &lt;100
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shear Factor Readings * <span className="text-gray-500 font-normal">(comma-separated values)</span>
                        </label>
                        <input
                          type="text"
                          name="shearReadings"
                          value={formData.shearReadings}
                          onChange={handleInputChange}
                          placeholder="22, 24, 21, 23, 22, 25, 23, 22"
                          required
                          className={designTokens.components.input}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter multiple readings separated by commas. Minimum safe: &gt;20
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Infill Depth Readings (mm) * <span className="text-gray-500 font-normal">(comma-separated values)</span>
                        </label>
                        <input
                          type="text"
                          name="infillDepthReadings"
                          value={formData.infillDepthReadings}
                          onChange={handleInputChange}
                          placeholder="48, 52, 47, 53, 49, 51, 50, 48"
                          required
                          className={designTokens.components.input}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter multiple readings separated by commas. Target: ~50mm
                        </p>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Any additional observations or concerns..."
                        className={designTokens.components.input}
                      />
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className={designTokens.components.button.secondary}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={designTokens.components.button.primary}
                      >
                        Save Test Data
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}

            {/* Instructions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={designTokens.components.card + ' p-6 mb-6'}
            >
              <h2 className={designTokens.typography.heading.h3 + ' mb-4'}>Testing Guidelines</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className={designTokens.typography.heading.h4 + ' text-red-600 mb-2'}>GMAX Testing</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Measures surface hardness</li>
                    <li>• Safe limit: &lt;100</li>
                    <li>• Critical: &gt;100</li>
                    <li>• Take 8+ readings across field</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className={designTokens.typography.heading.h4 + ' text-blue-600 mb-2'}>Shear Factor</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Measures traction/grip</li>
                    <li>• Minimum safe: &gt;20</li>
                    <li>• Critical: &lt;15</li>
                    <li>• Test in multiple directions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className={designTokens.typography.heading.h4 + ' text-green-600 mb-2'}>Infill Depth</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Measures infill level</li>
                    <li>• Target: ~50mm</li>
                    <li>• ±20% deviation OK</li>
                    <li>• Check high-traffic areas</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Recent Tests Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={designTokens.components.card + ' p-6'}
            >
              <h2 className={designTokens.typography.heading.h3 + ' mb-4'}>Recent Testing Data</h2>
              
              <div className="text-center py-12">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className={designTokens.typography.body.base + ' text-gray-600'}>
                  No testing data entries yet.
                </p>
                <p className={designTokens.typography.body.small + ' text-gray-500 mt-1'}>
                  Click &quot;Add Test Data&quot; to create your first entry.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}