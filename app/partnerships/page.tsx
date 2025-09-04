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
      description: "Be the first insurance carrier to offer comprehensive field safety partnerships - a unique value proposition in the education market."
    }
  ]

  const targetMarkets = [
    {
      type: "State Education Risk Pools",
      priority: "HIGHEST PRIORITY",
      scope: "1,000+ School Districts",
      description: "Large state-managed risk pools covering multiple districts with significant artificial turf exposure",
      characteristics: [
        "Focus on risk mitigation and proactive safety measures",
        "Strong emphasis on member education and loss prevention", 
        "Established track record of innovative safety partnerships",
        "Direct relationships with facility managers and athletic directors"
      ],
      opportunity: "State risk pools value solutions that demonstrate measurable risk reduction across their member base."
    },
    {
      type: "Education-Focused Insurance Carriers",
      priority: "HIGH PRIORITY", 
      scope: "Regional and National Reach",
      description: "Specialized insurers focusing on K-12 schools, colleges, and universities with athletic programs",
      characteristics: [
        "Specific coverage for athletic injuries and field-related claims",
        "Understanding of education sector liability exposures",
        "Established broker networks and distribution channels",
        "Interest in member retention and competitive differentiation"
      ],
      opportunity: "Education specialists understand the unique risks of school athletic programs and value proactive safety partnerships."
    },
    {
      type: "Commercial Insurance Brokers",
      priority: "MEDIUM-HIGH PRIORITY",
      scope: "Regional Education Specialists", 
      description: "Large commercial brokers with dedicated education practices serving schools and districts",
      characteristics: [
        "Direct client relationships with decision makers",
        "Expertise in education sector risk management",
        "Interest in value-added services for clients", 
        "Ability to package field monitoring with insurance programs"
      ],
      opportunity: "Brokers seek unique value propositions that help them win and retain education sector clients."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Field Health Systems</h1>
                <p className="text-sm text-gray-600">Insurance Partnerships</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="/schedule-assessment" className="text-gray-600 hover:text-gray-900">Schedule Assessment</Link>
                <Link href="/athlete-safety" className="text-gray-600 hover:text-gray-900">Safety</Link>
                <Link href="/marketing" className="text-gray-600 hover:text-gray-900">Marketing</Link>
              </nav>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Partnership Inquiries:</span>
                <a href="mailto:andrew@fieldhealthsystems.com" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">andrew@fieldhealthsystems.com</span>
                </a>
              </div>
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
            <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-800 font-medium mb-6">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Exclusive Partnership Opportunity - Limited Time
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Reduce Field-Related Claims by<br />
              <span className="text-green-600">60-75%</span> Through Partnership
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              <strong>Be the first insurance carrier</strong> to offer comprehensive field safety partnerships to your education sector clients. 
              Our proven monitoring technology prevents costly emergency repairs and reduces liability exposure while strengthening member relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="mailto:andrew@fieldhealthsystems.com?subject=Insurance Partnership Inquiry - Priority Discussion">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors flex items-center space-x-3 shadow-lg"
                >
                  <Handshake className="w-6 h-6" />
                  <span>Schedule 15-Minute Discovery Call</span>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Lead Market</h3>
                <p className="text-gray-600 text-center text-sm">Be the first carrier to offer field safety partnerships</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-800 font-semibold mb-4">
              <Clock className="w-5 h-5 mr-2" />
              Market Window Closing Fast
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              First-Mover Advantage Available Now
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
              The artificial turf market is growing rapidly, but <strong>no insurance carrier has yet partnered with a field monitoring company</strong>. 
              This exclusive opportunity to lead the market won&apos;t last long as competitors recognize this advantage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="font-bold text-red-600">10,000+</div>
                <div className="text-gray-600">Artificial turf fields nationwide</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="font-bold text-red-600">$500M+</div>
                <div className="text-gray-600">Annual maintenance market</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="font-bold text-red-600">Zero</div>
                <div className="text-gray-600">Current insurance partnerships</div>
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

      {/* Target Insurance Markets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Target Partnership Markets
            </h2>
            <p className="text-xl text-gray-600">
              Strategic opportunities with education-focused insurance providers
            </p>
          </div>

          <div className="space-y-12">
            {targetMarkets.map((market, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-3xl border border-gray-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Market Overview */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{market.type}</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {market.priority}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                      <div className="font-semibold text-gray-900 mb-2">Market Scope</div>
                      <div className="text-lg font-medium text-blue-600">{market.scope}</div>
                      <p className="text-gray-600 mt-2">{market.description}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Characteristics</h4>
                      <ul className="space-y-2">
                        {market.characteristics.map((characteristic, charIndex) => (
                          <li key={charIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{characteristic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Partnership Opportunity</h4>
                      <p className="text-green-700">{market.opportunity}</p>
                    </div>
                  </div>

                  {/* Market Potential */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Market Potential</h4>
                    
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">$500M+</div>
                        <div className="text-sm text-blue-700">Artificial Turf Market</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">10,000+</div>
                        <div className="text-sm text-green-700">Artificial Turf Fields</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">$25K-75K</div>
                        <div className="text-sm text-purple-700">Average Emergency Repair</div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Partnership Benefits</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Risk reduction opportunities</li>
                        <li>• Member value enhancement</li>
                        <li>• Competitive differentiation</li>
                        <li>• Claims prevention potential</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
              Exclusive Partnership Available
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Secure Your Competitive Advantage
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              This is your opportunity to be the <strong>first insurance carrier</strong> to offer field safety partnerships. 
              While your competitors continue with traditional approaches, you&apos;ll be protecting student athletes and reducing claims.
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
              <a href="mailto:andrew@fieldhealthsystems.com?subject=Insurance Partnership Inquiry - Priority Discussion&body=I'm interested in learning more about your insurance partnership program. Please contact me to schedule a 15-minute discovery call.%0A%0AName: %0ACompany: %0ATitle: %0APhone: %0A%0ABest time to call:">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-12 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors flex items-center space-x-3 shadow-2xl"
                >
                  <Handshake className="w-6 h-6" />
                  <span>Schedule Discovery Call Now</span>
                </motion.button>
              </a>
              
              <div className="text-green-400 font-semibold">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>24-Hour Response Guarantee</span>
                </div>
                <div className="text-sm opacity-75">Limited partnerships available</div>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-white/60">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>andrew@fieldhealthsystems.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>ASTM-Certified Field Testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Pioneer Safety Technology</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}