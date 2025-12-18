'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Ruler, Factory, Calendar, Loader2 } from 'lucide-react'

interface NewFieldFormProps {
  orgSlug: string
  organizationId: string
}

const fieldTypes = [
  { value: 'FOOTBALL', label: 'Football' },
  { value: 'SOCCER', label: 'Soccer' },
  { value: 'BASEBALL', label: 'Baseball' },
  { value: 'LACROSSE', label: 'Lacrosse' },
  { value: 'MULTI_PURPOSE', label: 'Multi-Purpose' },
  { value: 'TRACK', label: 'Track' }
]

const surfaceTypes = [
  'Polyethylene',
  'Polypropylene',
  'Nylon',
  'Hybrid',
  'Other'
]

const infillTypes = [
  'Crumb Rubber',
  'EPDM',
  'TPE',
  'Cork',
  'Coconut Fiber',
  'Sand',
  'Organic Infill',
  'None'
]

export function NewFieldForm({ orgSlug, organizationId }: NewFieldFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    type: 'FOOTBALL',
    surface: '',
    infillType: '',
    manufacturer: '',
    installDate: '',
    length: '',
    width: '',
    latitude: '',
    longitude: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/organizations/${orgSlug}/fields`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organizationId,
          length: formData.length ? parseFloat(formData.length) : null,
          width: formData.width ? parseFloat(formData.width) : null,
          totalArea: formData.length && formData.width
            ? parseFloat(formData.length) * parseFloat(formData.width)
            : null,
          latitude: formData.latitude ? parseFloat(formData.latitude) : null,
          longitude: formData.longitude ? parseFloat(formData.longitude) : null,
          installDate: formData.installDate ? new Date(formData.installDate).toISOString() : null
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create field')
      }

      const field = await response.json()
      router.push(`/app/${orgSlug}/fields/${field.id}`)
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the field')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <MapPin className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Field Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Main Stadium Field"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Field Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {fieldTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-1">
              Surface Type
            </label>
            <select
              id="surface"
              name="surface"
              value={formData.surface}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select surface type</option>
              {surfaceTypes.map(surface => (
                <option key={surface} value={surface}>{surface}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="infillType" className="block text-sm font-medium text-gray-700 mb-1">
              Infill Type
            </label>
            <select
              id="infillType"
              name="infillType"
              value={formData.infillType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select infill type</option>
              {infillTypes.map(infill => (
                <option key={infill} value={infill}>{infill}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Manufacturer & Installation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Factory className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Manufacturer & Installation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
              Manufacturer
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="e.g., FieldTurf"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="installDate" className="block text-sm font-medium text-gray-700 mb-1">
              Installation Date
            </label>
            <input
              type="date"
              id="installDate"
              name="installDate"
              value={formData.installDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Dimensions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Ruler className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Dimensions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
              Length (feet)
            </label>
            <input
              type="number"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
              placeholder="e.g., 360"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
              Width (feet)
            </label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleChange}
              placeholder="e.g., 160"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {formData.length && formData.width && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">
                Total Area: <span className="font-semibold">
                  {(parseFloat(formData.length) * parseFloat(formData.width)).toLocaleString()} sq ft
                </span>
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <MapPin className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Location (Optional)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g., 40.7128"
              step="0.000001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g., -74.0060"
              step="0.000001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Submit */}
      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Field'
          )}
        </button>
      </div>
    </form>
  )
}
