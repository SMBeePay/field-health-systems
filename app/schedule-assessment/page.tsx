'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Phone, 
  Mail,
  Building,
  AlertTriangle,
  Clock,
  Award,
  ArrowRight,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { trackConversion } from '@/lib/analytics'

export default function ScheduleAssessmentPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    numberOfFields: '',
    fieldTypes: [] as string[],
    primaryConcern: '',
    preferredContact: 'email',
    timeframe: '',
    additionalInfo: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name === 'fieldTypes') {
        setFormData(prev => ({
          ...prev,
          fieldTypes: checked 
            ? [...prev.fieldTypes, value]
            : prev.fieldTypes.filter(type => type !== value)
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit form data to API
      const response = await fetch('/api/schedule-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit assessment request')
      }

      const result = await response.json()
      console.log('Assessment request submitted successfully:', result)

      // Track the conversion in Google Analytics
      trackConversion('schedule_assessment', {
        organization: formData.organization,
        numberOfFields: formData.numberOfFields,
        fieldTypes: formData.fieldTypes.join(', '),
        value: 2500 // Estimated value based on Premium Monitoring package
      })
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please try again or contact us directly at andrew@fieldhealthsystems.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You! Assessment Scheduled
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              We&apos;ve received your request for a professional field assessment. Our team will contact you within 24 hours to schedule your comprehensive evaluation.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                <strong>Need immediate assistance?</strong> Contact Andrew directly at{' '}
                <a href="mailto:andrew@fieldhealthsystems.com" className="font-semibold underline hover:text-blue-900">
                  andrew@fieldhealthsystems.com
                </a>
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">What Happens Next?</h3>
              <ul className="text-left space-y-2 text-green-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Our field assessment specialist will call you within 24 hours</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>We&apos;ll schedule your comprehensive field evaluation at your convenience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>You&apos;ll receive a detailed assessment proposal with transparent pricing</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Return to Homepage
              </Link>
              <Link href="/athlete-safety" className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Learn About Field Safety
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logo-icon.svg" alt="Field Health Systems" className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Field Health Systems</h1>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-600">Questions?</span>
              <a href="mailto:andrew@fieldhealthsystems.com" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <Mail className="w-4 h-4" />
                <span className="font-medium">andrew@fieldhealthsystems.com</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <Award className="w-4 h-4 mr-2" />
                  Professional Assessment
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Schedule Your Professional Field Assessment
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Discover hidden issues before they become expensive problems. Our certified technicians will evaluate your field&apos;s safety, performance, and compliance in a comprehensive 60-90 minute assessment.
              </p>

              {/* Value Points */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    text: "Comprehensive GMAX, shear, and infill depth testing"
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    text: "Professional digital photo documentation"
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    text: "Written assessment report with recommendations"
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    text: "Safety compliance evaluation for insurance/liability"
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    text: "Budget planning consultation ($500 value)"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    {item.icon}
                    <span className="text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Urgency/Risk Section */}
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200 mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-800">Why Act Now?</h3>
                </div>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Undetected field issues can lead to $25K-$75K emergency repairs</li>
                  <li>• Athletic injuries on poorly maintained fields create liability exposure</li>
                  <li>• Insurance may deny claims without proper field maintenance documentation</li>
                  <li>• Early detection extends field life by 2-4 years on average</li>
                </ul>
              </div>

              {/* Industry Research */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Industry Research Shows</div>
                    <div className="text-sm text-gray-600">Proactive field monitoring prevents costly issues</div>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic">
                  &quot;Facilities that conduct regular GMAX testing report 60-75% fewer emergency repairs and significantly lower liability exposure than those using reactive maintenance approaches.&quot;
                </blockquote>
                <cite className="text-sm text-gray-600 mt-2 block">- Sports Surface Research Institute</cite>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Assessment Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Schedule Your Assessment
                </h2>
                <p className="text-gray-600">
                  Get started with a comprehensive evaluation of your field
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4 text-green-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Takes 2-3 minutes to complete</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="john@school.edu"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        Organization *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Central High School"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Athletic Director"
                      />
                    </div>
                  </div>
                </div>

                {/* Field Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Information</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Artificial Turf Fields *
                    </label>
                    <select
                      name="numberOfFields"
                      value={formData.numberOfFields}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      <option value="">Select number of fields</option>
                      <option value="1">1 field</option>
                      <option value="2-3">2-3 fields</option>
                      <option value="4-6">4-6 fields</option>
                      <option value="7+">7+ fields</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field Types (check all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Football', 'Soccer', 'Baseball', 'Lacrosse', 'Multi-Sport', 'Other'].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="fieldTypes"
                            value={type.toLowerCase()}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Concern or Reason for Assessment
                    </label>
                    <select
                      name="primaryConcern"
                      value={formData.primaryConcern}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      <option value="">Select primary concern</option>
                      <option value="safety">Player safety concerns</option>
                      <option value="performance">Field performance issues</option>
                      <option value="compliance">Insurance/compliance requirements</option>
                      <option value="maintenance">Maintenance planning</option>
                      <option value="budget">Budget planning</option>
                      <option value="age">Field aging/replacement planning</option>
                      <option value="routine">Routine assessment</option>
                    </select>
                  </div>
                </div>

                {/* Scheduling Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduling Preferences</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="both">Either email or phone</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Timeframe
                      </label>
                      <select
                        name="timeframe"
                        value={formData.timeframe}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select timeframe</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-2weeks">Within 1-2 weeks</option>
                        <option value="3-4weeks">Within 3-4 weeks</option>
                        <option value="flexible">Flexible timing</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    placeholder="Any specific concerns, field history, or questions you'd like us to know about..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Scheduling Your Assessment...</span>
                  ) : (
                    <>
                      <span>Schedule My Assessment</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to be contacted by our team regarding your field assessment. 
                  No spam, just helpful information about keeping your fields safe.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}