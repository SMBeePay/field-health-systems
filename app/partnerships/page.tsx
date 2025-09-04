'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, 
  TrendingDown, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Mail, 
  Building, 
  BarChart3,
  AlertTriangle,
  FileText,
  Handshake,
  Target,
  Award,
  Clock,
  Calculator
} from 'lucide-react'

export default function PartnershipsPage() {
  const riskReductionStats = [
    {
      icon: <TrendingDown className="w-8 h-8 text-green-600" />,
      stat: "60-75%",
      label: "Reduction in Emergency Repairs",
      description: "Proactive monitoring prevents crisis situations"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      stat: "$25K-75K",
      label: "Average Emergency Repair Cost",
      description: "Early detection prevents these expensive fixes"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      stat: "200+",
      label: "Critical GMAX Threshold",
      description: "Higher levels significantly increase injury risk"
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      stat: "35%",
      label: "Higher Injury Rate",
      description: "On poorly maintained synthetic surfaces"
    }
  ]

  const partnershipBenefits = [
    {
      icon: <TrendingDown className="w-6 h-6 text-green-600" />,
      title: "Significant Claims Reduction Potential",
      description: "Industry data shows 60-75% fewer emergency field repairs when facilities use proactive monitoring vs reactive maintenance approaches."
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
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-white" />
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
              Reduce Field-Related Claims by<br />
              <span className="text-green-600">60-75%</span> Through Partnership
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Partner with us to offer comprehensive field safety monitoring to your education sector clients. 
              Our proven monitoring technology prevents costly emergency repairs and reduces liability exposure while strengthening member relationships.
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
              
              <a href="#risk-data" className="text-green-600 font-semibold hover:text-green-700 flex items-center space-x-2 text-lg">
                <BarChart3 className="w-5 h-5" />
                <span>View Claims Reduction Data</span>
              </a>
            </div>

            {/* Value Proposition Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Reduce Claims</h3>
                <p className="text-gray-600 text-center text-sm">60-75% fewer emergency field repairs through proactive monitoring</p>
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

      {/* Market Opportunity Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 border-y border-blue-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-semibold mb-4">
              <BarChart3 className="w-5 h-5 mr-2" />
              Growing Market Opportunity
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Significant Partnership Potential
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
              The artificial turf market continues to expand rapidly, creating new opportunities for innovative insurance partnerships. 
              Field safety monitoring represents a valuable addition to traditional risk management approaches.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-bold text-blue-600">10,000+</div>
                <div className="text-gray-600">Artificial turf fields nationwide</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-bold text-blue-600">$500M+</div>
                <div className="text-gray-600">Annual maintenance market</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-bold text-blue-600">Growing</div>
                <div className="text-gray-600">Partnership opportunities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risk Reduction Statistics */}
      <section className="py-20 bg-white" id="risk-data">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Claims Reduction Results
            </h2>
            <p className="text-xl text-gray-600">
              Industry data demonstrates significant claims reduction potential through proactive field monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {riskReductionStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.stat}</div>
                <div className="font-semibold text-gray-800 mb-2">{stat.label}</div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
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
            <form className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
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
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
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
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder="Tell us about your specific partnership goals, member base, or any questions about our program..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
              >
                <Handshake className="w-5 h-5" />
                <span>Request Partnership Information</span>
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                We&apos;ll respond within 24 hours with detailed partnership information and next steps.
                No spam, just valuable insights about reducing field-related claims.
              </p>
            </form>
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