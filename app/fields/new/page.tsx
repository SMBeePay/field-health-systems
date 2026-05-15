'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { ArrowLeft, Loader2 } from 'lucide-react'

const FIELD_TYPES = [
  { value: 'FOOTBALL', label: 'Football' },
  { value: 'SOCCER', label: 'Soccer' },
  { value: 'BASEBALL', label: 'Baseball' },
  { value: 'LACROSSE', label: 'Lacrosse' },
  { value: 'MULTI_PURPOSE', label: 'Multi-Purpose' },
  { value: 'TRACK', label: 'Track' },
] as const

const inputClass =
  'border border-slate-200 rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:border-teal-500 bg-white'
const labelClass = 'text-sm font-medium text-slate-700 mb-1 block'

export default function NewFieldPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    type: '' as string,
    surface: '',
    manufacturer: '',
    infillType: '',
    installDate: '',
    length: '',
    width: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setApiError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setApiError(null)

    try {
      const payload: Record<string, unknown> = {
        name: form.name.trim(),
        type: form.type,
      }
      if (form.surface.trim()) payload.surface = form.surface.trim()
      if (form.manufacturer.trim()) payload.manufacturer = form.manufacturer.trim()
      if (form.infillType.trim()) payload.infillType = form.infillType.trim()
      if (form.installDate) payload.installDate = form.installDate
      if (form.length) payload.length = Number(form.length)
      if (form.width) payload.width = Number(form.width)

      const res = await fetch('/api/fields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setApiError(data.error ?? `Error ${res.status}`)
        return
      }

      // Navigate to the new field detail page
      router.push(`/fields/${data.field.id}`)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-6"
            >
              <Link
                href="/fields"
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Fields
              </Link>
            </motion.div>

            {/* Page heading */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold" style={{ color: '#12324A' }}>
                Add New Field
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Fill in the details below to register a new field in the system.
              </p>
            </motion.div>

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* ── Section 1: Basic Info ─────────────────────────── */}
                <section>
                  <h2
                    className="text-base font-semibold mb-4 pb-2 border-b border-slate-100"
                    style={{ color: '#12324A' }}
                  >
                    Basic Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Field Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Varsity Football Field"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="type" className={labelClass}>
                        Field Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={form.type}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select a field type…</option>
                        {FIELD_TYPES.map((ft) => (
                          <option key={ft.value} value={ft.value}>
                            {ft.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* ── Section 2: Surface & Materials ───────────────── */}
                <section>
                  <h2
                    className="text-base font-semibold mb-4 pb-2 border-b border-slate-100"
                    style={{ color: '#12324A' }}
                  >
                    Surface &amp; Materials
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="surface" className={labelClass}>
                        Surface / Turf Brand
                      </label>
                      <input
                        id="surface"
                        name="surface"
                        type="text"
                        placeholder="e.g. FieldTurf Revolution 360"
                        value={form.surface}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="manufacturer" className={labelClass}>
                        Manufacturer
                      </label>
                      <input
                        id="manufacturer"
                        name="manufacturer"
                        type="text"
                        placeholder="e.g. FieldTurf"
                        value={form.manufacturer}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="infillType" className={labelClass}>
                        Infill Type
                      </label>
                      <input
                        id="infillType"
                        name="infillType"
                        type="text"
                        placeholder="e.g. TPE Pellets + Sand"
                        value={form.infillType}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* ── Section 3: Installation ───────────────────────── */}
                <section>
                  <h2
                    className="text-base font-semibold mb-4 pb-2 border-b border-slate-100"
                    style={{ color: '#12324A' }}
                  >
                    Installation Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-3 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div>
                        <label htmlFor="installDate" className={labelClass}>
                          Install Date
                        </label>
                        <input
                          id="installDate"
                          name="installDate"
                          type="date"
                          value={form.installDate}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="length" className={labelClass}>
                          Length (yards)
                        </label>
                        <input
                          id="length"
                          name="length"
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="120"
                          value={form.length}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="width" className={labelClass}>
                          Width (yards)
                        </label>
                        <input
                          id="width"
                          name="width"
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="53.3"
                          value={form.width}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Error message ─────────────────────────────────── */}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
                  >
                    {apiError}
                  </motion.div>
                )}

                {/* ── Actions ───────────────────────────────────────── */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Link
                    href="/fields"
                    className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 text-white rounded-lg px-6 py-2.5 font-semibold text-sm disabled:opacity-60 transition-opacity"
                    style={{ background: '#4CAF50' }}
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitting ? 'Saving…' : 'Save Field'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
