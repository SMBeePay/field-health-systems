'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Shield, 
  TrendingDown, 
  Users, 
  CheckCircle, 
  Mail, 
  Building, 
  AlertTriangle,
  FileText,
  Handshake,
  Target,
  Award,
  Clock,
  Calculator
} from 'lucide-react'

export default function PartnershipsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    companyType: '',
    interests: [],
    educationExposure: '',
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (interest, checked) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // For now, we'll use a simple mailto approach
      // In production, this should be replaced with a proper API endpoint
      const emailSubject = encodeURIComponent('Partnership Form Submission - Field Health Systems')
      const emailBody = encodeURIComponent(`
Partnership Form Submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Title: ${formData.title}
Company Type: ${formData.companyType}
Interests: ${formData.interests.join(', ')}
Education Exposure: ${formData.educationExposure}
Additional Info: ${formData.additionalInfo}

Submitted: ${new Date().toLocaleString()}
      `)
      
      // Open email client with pre-filled data
      window.location.href = `mailto:partnerships@fieldhealthsystems.com?subject=${emailSubject}&body=${emailBody}`
      
      // Show success message
      setShowSuccess(true)
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        companyType: '',
        interests: [],
        educationExposure: '',
        additionalInfo: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting the form. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const partnershipBenefits = [
    {
      icon: <TrendingDown className="w-6 h-6 text-green-600" />,
      title: "Significant Claims Reduction Potential",
      description: "Industry data shows significantly fewer emergency field repairs when facilities use proactive monitoring vs reactive maintenance approaches."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: "Early Risk Detection",
      description: "GMAX testing identifies safety issues before they cause athlete injuries, preventing liability claims and costly litigation."
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Documentation & Compliance",
      description: "Professional testing records provide crucial documentation for claim defense and demonstrate due diligence in safety protocols."
    },
    {
      icon: <Calculator className="w-6 h-6 text-purple-600" />,
      title: "Actuarial Advantages",
      description: "Schools with documented monitoring programs would present measurably lower risk profiles, supporting potential premium adjustments."
    },
    {
      icon: <Building className="w-6 h-6 text-indigo-600" />,
      title: "Member Retention",
      description: "Schools value proactive safety partnerships - offering field monitoring demonstrates insurance carrier commitment to member welfare."
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: "Competitive Differentiation",
      description: "Comprehensive field safety partnerships provide a unique value proposition that differentiates your offerings in the education market."
    }
  ]


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src="/logo-icon.svg" alt="Field Health Systems" className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Field Health Systems</h1>
                <p className="text-sm text-gray-600 leading-tight">Insurance Partnerships</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="/schedule-assessment" className="text-gray-600 hover:text-gray-900">Schedule Assessment</Link>
                <Link href="/athlete-safety" className="text-gray-600 hover:text-gray-900">Safety</Link>
                <Link href="/marketing" className="text-gray-600 hover:text-gray-900">Marketing</Link>
              </nav>
              
              <a href="#partnership-form" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Request Partnership Info
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium mb-6">
              <Handshake className="w-5 h-5 mr-2" />
              Partnership Opportunity Available
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Reduce Field-Related Claims<br />
              <span className="text-green-600">Through Partnership</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Partner with us to offer comprehensive field safety monitoring to your education sector clients. 
              Our monitoring technology helps prevent costly emergency repairs and reduce liability exposure while strengthening member relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="#partnership-form">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors flex items-center space-x-3 shadow-lg"
                >
                  <Handshake className="w-6 h-6" />
                  <span>Request Partnership Information</span>
                </motion.button>
              </a>
              
            </div>

            {/* Value Proposition Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Reduce Claims</h3>
                <p className="text-gray-600 text-center text-sm">Fewer emergency field repairs through proactive monitoring</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Retain Members</h3>
                <p className="text-gray-600 text-center text-sm">Unique value-add service that differentiates your offerings</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Market Leadership</h3>
                <p className="text-gray-600 text-center text-sm">Innovative field safety partnerships for competitive advantage</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Partnership Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Field Health Systems as Your Partner?
            </h2>
            <p className="text-xl text-gray-600">
              Introducing the first comprehensive field safety partnership program designed specifically for insurance carriers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Partnership Program Details */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partnership Program Structure
            </h2>
            <p className="text-xl text-gray-600">
              Flexible partnership models designed to align with your risk management objectives
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Program Benefits</h3>
              
              <div className="space-y-4">
                {[
                  "Preferred pricing for partner organization members",
                  "Co-branded safety materials and marketing collateral",
                  "Priority scheduling for partner district assessments",
                  "Quarterly risk reduction reports and claims data analysis",
                  "Joint webinars and educational content development",
                  "Direct liaison support for underwriting and claims teams",
                  "Custom dashboard for tracking partner district compliance",
                  "Annual partnership review and program optimization"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Partnership ROI</h4>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-800">Immediate Benefits</div>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>• Enhanced member satisfaction and retention</li>
                    <li>• Competitive differentiation in education market</li>
                    <li>• Marketing value of proactive safety partnership</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">6-Month Outcomes</div>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Measurable reduction in field-related claims</li>
                    <li>• Improved risk assessment accuracy</li>
                    <li>• Enhanced underwriting data quality</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-800">Long-term Impact</div>
                  <ul className="text-sm text-purple-700 mt-2 space-y-1">
                    <li>• Lower loss ratios in education segment</li>
                    <li>• Premium adjustment opportunities</li>
                    <li>• Industry leadership positioning</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Request Form */}
      <section className="py-20 bg-white" id="partnership-form">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Request Partnership Information
            </h2>
            <p className="text-xl text-gray-600">
              Get detailed information about our insurance partnership program tailored to your organization
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl border border-gray-200">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Your partnership request has been submitted successfully. We'll respond within 24 hours with detailed partnership information.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="john@insurancecompany.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-1" />
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="ABC Insurance Company"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Risk Manager"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <select 
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select company type</option>
                  <option value="insurance-carrier">Insurance Carrier</option>
                  <option value="risk-pool">State/Regional Risk Pool</option>
                  <option value="insurance-broker">Insurance Broker</option>
                  <option value="tpa">Third Party Administrator</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Partnership Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Interest (check all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Claims Reduction',
                    'Member Retention',
                    'Risk Assessment',
                    'Safety Programs',
                    'Competitive Advantage',
                    'Cost Management'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => handleInterestChange(interest, e.target.checked)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Education Sector Exposure
                </label>
                <select 
                  name="educationExposure"
                  value={formData.educationExposure}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select exposure level</option>
                  <option value="high">High (500+ education clients)</option>
                  <option value="medium">Medium (100-500 education clients)</option>
                  <option value="low">Low (Under 100 education clients)</option>
                  <option value="none">No current education sector focus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  rows={4}
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder="Tell us about your specific partnership goals, member base, or any questions about our program..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Handshake className="w-5 h-5" />
                <span>{isSubmitting ? 'Submitting...' : 'Request Partnership Information'}</span>
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                We&apos;ll respond within 24 hours with detailed partnership information and next steps.
                No spam, just valuable insights about reducing field-related claims.
              </p>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-green-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-600 rounded-full text-white font-semibold mb-6">
              <Target className="w-5 h-5 mr-2" />
              Partnership Program Available
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Secure Your Competitive Advantage
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Partner with us to enhance your risk management offerings with innovative field safety monitoring. 
              While others rely solely on traditional approaches, you&apos;ll be proactively protecting student athletes and reducing claims.
            </p>
            
            <div className="bg-white/10 p-8 rounded-2xl mb-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-green-400">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-semibold">15-Minute Discovery Call</div>
                    <div className="text-sm opacity-75">We&apos;ll discuss your member base and partnership goals</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-semibold">Custom Proposal</div>
                    <div className="text-sm opacity-75">Tailored partnership structure with ROI projections</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-semibold">Pilot Program Launch</div>
                    <div className="text-sm opacity-75">Start with select districts to demonstrate value</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a href="#partnership-form">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-12 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors flex items-center space-x-3 shadow-2xl"
                >
                  <Handshake className="w-6 h-6" />
                  <span>Request Partnership Information</span>
                </motion.button>
              </a>
              
              <div className="text-green-400 font-semibold">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>24-Hour Response Guarantee</span>
                </div>
                <div className="text-sm opacity-75">Professional partnership consultation</div>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-white/60">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>ASTM-Certified Field Testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Pioneer Safety Technology</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Handshake className="w-4 h-4" />
                  <span>Insurance Partnership Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}