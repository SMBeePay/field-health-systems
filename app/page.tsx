'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Users,
  Phone,
  Mail,
  MapPin,
  Star,
  Target,
  AlertTriangle,
  FileText,
  BarChart3,
  Calendar,
  Satellite,
} from 'lucide-react'
import { MarketingNav } from '@/components/layout/marketing-nav'

export default function MarketingHomePage() {
  // const [activeTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Industry Research",
      title: "Case Study",
      organization: "Sports Field Management",
      quote: "Professional field monitoring programs typically reduce emergency repairs by identifying issues early, allowing for planned maintenance rather than crisis response.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Field Research",
      title: "University Study",
      organization: "Sports Surface Research",
      quote: "Regular GMAX testing and maintenance scheduling can extend artificial turf field life by maintaining optimal playing conditions throughout the field's lifecycle.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Industry Standards",
      title: "Best Practices",
      organization: "Synthetic Turf Council",
      quote: "Professional testing and documentation provides administrators with the data needed to make informed decisions about field maintenance budgets.",
      image: "/api/placeholder/64/64"
    }
  ]

  const stats = [
    { number: "60-75%", label: "Potential reduction in emergency repairs*" },
    { number: "$10-25K", label: "Typical emergency repair costs*" },
    { number: "2-4 years", label: "Potential field life extension*" },
    { number: "Demo", label: "System showcasing capabilities" }
  ]

  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Navy Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{
            backgroundImage: `url('/aidan-tottori-3zIZZ-9yIhM-unsplash.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%'
          }} />
          {/* Lighter navy gradient overlay to show field photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A]/70 via-[#0D1B2A]/55 to-[#1E88E5]/45" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <span className="inline-flex items-center bg-[#1E88E5]/10 text-[#1E88E5] border border-[#1E88E5]/20 px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                  Independent Testing • Field Management Software
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Professional Field Health
                <span className="block text-[#1E88E5] mt-2">Management</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                <strong className="text-white">MEASURE. MAINTAIN. MAXIMIZE.</strong><br/>
                Independent 3rd party testing combined with intelligent software that protects athletes and extends field life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/schedule-assessment">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-white px-10 py-4 rounded-lg text-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 w-full sm:w-auto"
                    style={{ background: '#1E88E5' }}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Get Your Free Quote</span>
                  </motion.button>
                </Link>
                <Link href="#platform">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-4 rounded-lg text-lg font-bold transition-all hover:bg-white/20 flex items-center justify-center space-x-2 w-full sm:w-auto"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>View Platform</span>
                  </motion.button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-[#43B02A] flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Independent 3rd Party Testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-[#43B02A] flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Predictive Analytics</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0D1B2A] mb-6">Intelligent Field Management</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#43B02A]/5 to-[#43B02A]/10 rounded-xl border border-[#43B02A]/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#43B02A] rounded-lg flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0D1B2A]">GMAX Safety</p>
                          <p className="text-sm text-gray-600">68.5 (Excellent)</p>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-[#43B02A]" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1E88E5]/5 to-[#1E88E5]/10 rounded-xl border border-[#1E88E5]/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#1E88E5] rounded-lg flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0D1B2A]">Shear Factor</p>
                          <p className="text-sm text-gray-600">28.7 Nm (Good)</p>
                        </div>
                      </div>
                      <BarChart3 className="w-5 h-5 text-[#1E88E5]" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500/5 to-amber-500/10 rounded-xl border border-amber-500/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0D1B2A]">Infill Depth</p>
                          <p className="text-sm text-gray-600">12.3mm (Monitor)</p>
                        </div>
                      </div>
                      <Target className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-[#0D1B2A] mb-3 flex items-center gap-2">
                    <Satellite className="w-5 h-5 text-[#1E88E5]" />
                    Predictive Insights
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E88E5] font-bold mt-0.5">•</span>
                      <span>Infill redistribution recommended within 30 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E88E5] font-bold mt-0.5">•</span>
                      <span>Estimated cost: $3,200</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E88E5] font-bold mt-0.5">•</span>
                      <span>Prevent potential emergency repairs</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-[#1E88E5] to-[#1976D2] text-white p-4 rounded-2xl shadow-xl"
              >
                <Shield className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4">Proven Results</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Professional field management delivers measurable impact on safety and cost savings</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-[#1E88E5] to-[#1976D2] bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-700 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">* Statistics based on industry research and potential outcomes</p>
          </div>
        </div>
      </section>

      {/* Athlete Safety Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30" id="athlete-safety">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
                Athlete Safety First
              </h2>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                Professional testing protects athletes from serious injuries caused by unsafe field conditions
              </p>
              <div className="bg-[#0D1B2A]/5 border-2 border-[#0D1B2A]/20 rounded-xl p-6 max-w-3xl mx-auto">
                <p className="text-[#0D1B2A] font-bold text-lg">
                  ⚠️ Fields with GMAX scores above 200 increase the risk of life-threatening head injuries
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Head Injury Risks */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#0D1B2A]/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0D1B2A] flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0D1B2A]">Head Injury & Concussion Risks</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#0D1B2A]/5 to-[#0D1B2A]/10 p-5 rounded-xl border border-[#0D1B2A]/20">
                  <p className="font-bold text-[#0D1B2A] mb-3">Critical Safety Thresholds:</p>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#43B02A] font-bold mt-0.5">•</span>
                      <span>GMAX below 165: Safe for most sports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span>GMAX 165-200: Monitor closely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0D1B2A] font-bold mt-0.5">•</span>
                      <span>GMAX above 200: Life-threatening risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E88E5] font-bold mt-0.5">•</span>
                      <span>NFL uses pre-game limit of 156</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Research Data:</strong> 21.5% of sports-related head injuries result from surface impact</p>
                  <p className="text-gray-700"><strong>Real Case:</strong> Boston field repeatedly failed GMAX tests with scores &gt;200, exposing thousands of youth athletes</p>
                  <p className="text-gray-700"><strong>Maintenance Impact:</strong> Without regular maintenance, GMAX can rise 20-30% over 3-5 years</p>
                </div>
              </div>
            </motion.div>

            {/* Lower Extremity Risks */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#1E88E5]/30"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#1E88E5] flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0D1B2A]">Foot, Ankle & Knee Injuries</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#1E88E5]/5 to-[#1E88E5]/10 p-5 rounded-xl border border-[#1E88E5]/20">
                  <p className="font-bold text-[#0D1B2A] mb-3">Increased Injury Rates on Poor Turf:</p>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E88E5] font-bold mt-0.5">•</span>
                      <span>ACL tears: 1.6x higher on artificial turf</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E88E5] font-bold mt-0.5">•</span>
                      <span>Ankle sprains: up to 2x higher on compromised fields</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1E88E5] font-bold mt-0.5">•</span>
                      <span>Foot injuries: elevated risk in 75% of studies</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-700"><strong>NCAA Data (2004-2014):</strong> 142 ACL tears per 10,000 exposures on turf vs 111 on grass</p>
                  <p className="text-gray-700"><strong>2022 Review:</strong> Systematic analysis of 53 studies confirmed higher foot/ankle injury rates</p>
                  <p className="text-gray-700"><strong>Contributing Factors:</strong> Higher friction, poor drainage, uneven surfaces from delayed maintenance</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Safety Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#43B02A]/30"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-4">How Professional Testing Protects Athletes</h3>
              <p className="text-lg text-gray-600">Regular maintenance can reduce injury risks by 20-50% while extending field life by 2+ years</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#43B02A' }}>165</div>
                <div className="text-sm text-gray-600">GMAX safety limit recommended by Synthetic Turf Council</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#43B02A' }}>20-50%</div>
                <div className="text-sm text-gray-600">Potential injury risk reduction with proper maintenance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#43B02A' }}>&lt;$1,000</div>
                <div className="text-sm text-gray-600">Annual GMAX testing cost vs. potential injury liability</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="/athlete-safety"
                className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ background: '#43B02A' }}
              >
                <Shield className="w-5 h-5" />
                <span>Learn More About Athlete Safety</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-50" id="solutions">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Most Schools Have Invested $300K-$800K in Artificial Turf Fields...
              </h2>
              <p className="text-xl text-gray-600">
                But have no systematic artificial turf maintenance program to monitor synthetic field condition or plan turf maintenance budgets
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Problems */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 p-8 rounded-2xl border-2 border-red-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <h3 className="text-2xl font-bold text-red-800">The Current Reality</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-red-700">Reactive artificial turf maintenance leading to athlete injuries and budget surprises ($25K-$75K emergency synthetic field repairs)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-red-700">No systematic artificial turf field monitoring puts athletes at risk - no safety compliance documentation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-red-700">Uncertainty about when artificial turf fields need major maintenance work or synthetic field replacement</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-red-700">Difficulty justifying artificial turf maintenance budgets to administration without professional field testing data</p>
                </div>
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 p-8 rounded-2xl border-2 border-green-200"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-[#43B02A]" />
                <h3 className="text-2xl font-bold text-green-800">Our Solution</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#43B02A] mt-1 flex-shrink-0" />
                  <p className="text-green-700">Professional quarterly assessments catch problems before they become disasters</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#43B02A] mt-1 flex-shrink-0" />
                  <p className="text-green-700">Predictable budgeting with 3-5 year maintenance forecasts</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#43B02A] mt-1 flex-shrink-0" />
                  <p className="text-green-700">Safety compliance documentation for insurance and liability protection</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#43B02A] mt-1 flex-shrink-0" />
                  <p className="text-green-700">Expert guidance without hiring full-time staff or buying equipment</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Software Platform Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border-2 border-gray-200 mb-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                See Your Field Data in Real-Time
              </h3>
              <p className="text-gray-600">
                Our software platform gives you instant visibility into field conditions with professional insights
              </p>
            </div>

            {/* Dashboard Mockup */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img src="/logo-icon.svg" alt="Field Health Systems" className="w-8 h-8" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Field Health Systems Dashboard</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#43B02A] rounded-full"></div>
                    <span className="text-sm text-gray-600">Live Data</span>
                  </div>
                </div>

                {/* Status Overview */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#43B02A]">4</div>
                    <div className="text-xs text-gray-600">Excellent</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-xs text-gray-600">Good</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-xs text-gray-600">Monitor</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-xs text-gray-600">Critical</div>
                  </div>
                </div>

                {/* Field Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">North Field - Football</h5>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Excellent</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">GMAX:</span>
                        <span className="font-medium text-[#43B02A]">68.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Test:</span>
                        <span className="text-gray-900">Jan 15, 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">South Field - Soccer</h5>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Monitor</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Infill Depth:</span>
                        <span className="font-medium text-yellow-600">12.3mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Action Due:</span>
                        <span className="font-medium text-yellow-600">30 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-[#0D1B2A] to-[#1a2e42] text-white p-12 rounded-2xl shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Independent Testing + Intelligent Software = Unbiased Decisions
            </h3>
            <p className="text-xl mb-6 text-gray-300">
              No conflicts of interest, no upselling — just data-driven recommendations
            </p>
            <div className="text-2xl md:text-3xl font-bold text-[#1E88E5]">
              Predictive insights prevent 60-75% of emergency repairs*
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service-First Positioning */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30" id="platform">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
                Independent Testing + Intelligent Analytics
              </h2>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                3rd party objectivity combined with AI-powered predictive maintenance recommendations
              </p>
              <div className="bg-[#1E88E5]/10 border-2 border-[#1E88E5]/30 rounded-xl p-6 max-w-3xl mx-auto">
                <p className="text-[#0D1B2A] font-semibold text-lg">
                  Unbiased testing data feeds intelligent software that predicts maintenance needs before they become costly problems
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Professional Service Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#43B02A]/30"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-[#43B02A]" />
                <h3 className="text-2xl font-bold text-[#0D1B2A]">Independent 3rd Party Testing</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D1B2A]">20+ Years Industry Experience</p>
                    <p className="text-sm text-gray-600">Certified technicians with decades of turf management expertise</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D1B2A]">Professional-Grade Equipment</p>
                    <p className="text-sm text-gray-600">$15,000+ calibrated GMAX testing equipment, not basic consumer tools</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D1B2A]">Unbiased Recommendations</p>
                    <p className="text-sm text-gray-600">No maintenance services to upsell - just objective data and insights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D1B2A]">Legal Documentation</p>
                    <p className="text-sm text-gray-600">Professional liability coverage and compliance reporting</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#43B02A]/5 to-[#43B02A]/10 p-5 rounded-xl border border-[#43B02A]/20">
                <p className="text-sm text-[#0D1B2A]">
                  <strong>Professional Service:</strong> We don&apos;t just give you software - we provide expert analysis,
                  immediate response, and professional accountability for athlete safety.
                </p>
              </div>
            </motion.div>

            {/* Technology Platform Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#1E88E5]/30"
            >
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-8 h-8 text-[#1E88E5]" />
                <h3 className="text-2xl font-bold text-[#0D1B2A]">Advanced Technology Platform</h3>
              </div>

              {/* App Screenshot Mockup - Laptop */}
              <div className="mb-6">
                <div className="bg-gray-900 rounded-lg p-1 shadow-2xl">
                  <div className="bg-white rounded-md p-3">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-[#43B02A] rounded-full"></div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-[#43B02A]" />
                          <span className="font-semibold text-gray-900">Field Health Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-[#43B02A] rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-600">Live Data</span>
                        </div>
                      </div>

                      {/* Satellite Field View */}
                      <div className="bg-[#43B02A] rounded-lg p-4 mb-3 relative">
                        <div className="text-white text-center mb-2">
                          <div className="text-xs font-medium">Main Football Field - Satellite View</div>
                        </div>
                        {/* Testing location markers */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mx-auto"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full mx-auto"></div>
                        </div>
                        <div className="text-xs text-green-100 text-center mt-1">8 Test Locations</div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white rounded p-2">
                          <div className="text-lg font-bold text-[#43B02A]">118.6</div>
                          <div className="text-xs text-gray-600">GMAX</div>
                        </div>
                        <div className="bg-white rounded p-2">
                          <div className="text-lg font-bold text-blue-600">32.75</div>
                          <div className="text-xs text-gray-600">Shear</div>
                        </div>
                        <div className="bg-white rounded p-2">
                          <div className="text-lg font-bold text-purple-600">29mm</div>
                          <div className="text-xs text-gray-600">Infill</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Satellite imagery with GPS-precise testing locations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Real-time alerts when safety thresholds are exceeded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Predictive analytics for maintenance planning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Mobile access for instant field status updates</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile App Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Mobile Access</h3>
            <div className="flex justify-center items-center space-x-8">
              {/* Phone Mockup */}
              <div className="relative">
                <div className="w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl p-3 overflow-hidden">
                    <div className="text-center mb-3">
                      <div className="w-24 h-1 bg-gray-900 rounded mx-auto mb-3"></div>
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Shield className="w-4 h-4 text-[#43B02A]" />
                        <span className="text-sm font-semibold text-gray-900">Field Health</span>
                      </div>
                    </div>

                    {/* Alert notification */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <div className="text-xs">
                          <div className="font-semibold text-red-800">Safety Alert</div>
                          <div className="text-red-600">Practice Field GMAX: 198</div>
                        </div>
                      </div>
                    </div>

                    {/* Field status cards */}
                    <div className="space-y-2">
                      <div className="bg-green-50 border border-green-200 rounded p-2">
                        <div className="flex items-center justify-between">
                          <div className="text-xs">
                            <div className="font-semibold text-gray-900">Main Field</div>
                            <div className="text-[#43B02A]">GMAX: 118.6</div>
                          </div>
                          <div className="w-3 h-3 bg-[#43B02A] rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-2">
                        <div className="flex items-center justify-between">
                          <div className="text-xs">
                            <div className="font-semibold text-gray-900">Soccer Field</div>
                            <div className="text-blue-600">GMAX: 100.4</div>
                          </div>
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <div className="flex items-center justify-between">
                          <div className="text-xs">
                            <div className="font-semibold text-gray-900">Practice Field</div>
                            <div className="text-red-600">GMAX: 198.1</div>
                          </div>
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <div className="text-xs text-gray-500">Tap for emergency contact</div>
                      <div className="bg-red-600 text-white text-xs py-1 px-3 rounded mt-1">Call Tech</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-left max-w-md">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Instant Safety Alerts</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Critical Threshold Alerts</p>
                      <p className="text-sm text-gray-600">Immediate notifications when GMAX exceeds safety limits</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-[#43B02A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Direct Technician Contact</p>
                      <p className="text-sm text-gray-600">One-tap access to certified professionals for emergency response</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BarChart3 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Real-Time Field Status</p>
                      <p className="text-sm text-gray-600">Live updates on all your fields with visual safety indicators</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Independent 3rd Party Testing & Field Management Platform
              </h2>
              <p className="text-xl text-gray-600">
                Unbiased field testing combined with intelligent software that predicts maintenance needs and optimizes field performance
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Service 1: Professional Technicians */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 * 0.1 }}
              className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#43B02A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Independent Field Testing</h3>
              <p className="text-gray-600 mb-4">Unbiased 3rd party testing by certified technicians using professional-grade equipment for accurate, reliable data</p>

              {/* Field Testing Image Placeholder */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-[#43B02A] rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Live Testing Session</p>
                    <p className="text-xs text-gray-600">North Field - Football</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GMAX Reading:</span>
                    <span className="font-medium text-[#43B02A]">68.5 (Excellent)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Technician:</span>
                    <span className="font-medium">J. Martinez, Certified</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#43B02A] h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500">Assessment: 85% complete</p>
                </div>
              </div>
            </motion.div>

            {/* Service 2: Data Analytics Platform */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.1 }}
              className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-[#43B02A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Analytics Platform</h3>
              <p className="text-gray-600 mb-4">Proprietary software platform with real-time dashboards, trend analysis, and predictive insights</p>

              {/* Dashboard Screenshot Mockup */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm">Field Health Dashboard</h4>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#43B02A] rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-[#43B02A]">4</div>
                    <div className="text-xs text-gray-600">Excellent</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-blue-600">2</div>
                    <div className="text-xs text-gray-600">Good</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#43B02A] rounded-full"></div>
                    <div className="flex-1 bg-gray-200 h-1 rounded-full">
                      <div className="bg-[#43B02A] h-1 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-xs text-gray-600">75%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-200 h-1 rounded-full">
                      <div className="bg-blue-500 h-1 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-xs text-gray-600">60%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 3: Professional Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2 * 0.1 }}
              className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-[#43B02A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Predictive Maintenance Insights</h3>
              <p className="text-gray-600 mb-4">AI-powered recommendations with cost predictions, timeline forecasting, and proactive maintenance scheduling</p>

              {/* Report Preview */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-4 h-4 text-[#43B02A]" />
                  <span className="font-medium text-sm text-gray-900">Q1 2025 Field Report</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Executive Summary</span>
                    <CheckCircle className="w-3 h-3 text-[#43B02A]" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Field Performance Data</span>
                    <CheckCircle className="w-3 h-3 text-[#43B02A]" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maintenance Calendar</span>
                    <CheckCircle className="w-3 h-3 text-[#43B02A]" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget Planning</span>
                    <CheckCircle className="w-3 h-3 text-[#43B02A]" />
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">12 pages • PDF</span>
                    <span className="text-xs font-medium" style={{ color: '#43B02A' }}>Ready for Review</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What&apos;s Included in Every Assessment</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: "GMAX Testing", desc: "Shock absorption measurement" },
                { icon: BarChart3, title: "Shear Factor", desc: "Traction and safety analysis" },
                { icon: MapPin, title: "Infill Depth", desc: "Coverage and distribution check" },
                { icon: FileText, title: "Visual Inspection", desc: "Seams, drainage, wear patterns" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-[#43B02A]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-4">
                Custom Pricing for Your Needs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get a free quote tailored to your facility and testing schedule
              </p>
              <p className="text-lg text-[#1E88E5] mt-3 font-semibold">
                Volume discounts available for multiple fields and regular testing
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* One-Time Testing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">One-Time Testing</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#1E88E5] to-[#1976D2] bg-clip-text text-transparent mb-2">Custom Quote</div>
                <div className="text-gray-600">single field inspection</div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-[#43B02A] font-semibold bg-[#43B02A]/10 px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  Free quote • No obligation
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Comprehensive GMAX, shear, infill testing",
                  "Digital photo documentation",
                  "Professional written report",
                  "Safety compliance assessment",
                  "Maintenance recommendations",
                  "No ongoing software access"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${index === 5 ? 'bg-gray-200' : 'bg-[#43B02A]'}`}>
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${index === 5 ? 'text-gray-500' : 'text-gray-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/schedule-assessment" className="w-full">
                <button
                  className="w-full text-white py-4 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                  style={{ background: '#1E88E5' }}
                >
                  Schedule Assessment
                </button>
              </Link>
            </motion.div>

            {/* Premium Monitoring Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl shadow-2xl border-2 text-white relative bg-gradient-to-br from-[#0D1B2A] to-[#1a2e42]"
              style={{ borderColor: '#1E88E5' }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#1E88E5] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium Monitoring</h3>
                <div className="text-4xl font-bold mb-2">Custom Quote</div>
                <div className="text-gray-300">per field, per year</div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-[#43B02A] font-semibold bg-[#43B02A]/20 px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  Free quote • Volume discounts available
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "4 quarterly professional assessments",
                  "Comprehensive GMAX, shear, infill testing",
                  "Digital photo documentation",
                  "Professional written reports",
                  "Full software dashboard access",
                  "Comprehensive field audit & baseline",
                  "Historical data migration",
                  "Staff training on platform",
                  "Custom maintenance calendar",
                  "Insurance documentation package",
                  "Priority customer support",
                  "Mobile app access"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Mobile App Preview */}
              <div className="mb-6">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-32 h-56 bg-gray-900 rounded-2xl p-1">
                      <div className="w-full h-full bg-white rounded-xl p-2">
                        <div className="text-center mb-2">
                          <div className="w-16 h-4 bg-gray-900 rounded mx-auto mb-1"></div>
                          <div className="text-xs text-gray-900 font-medium">Field Health App</div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center p-1 bg-green-50 rounded">
                            <div className="text-xs text-gray-900">North Field</div>
                            <div className="w-3 h-3 bg-[#43B02A] rounded-full"></div>
                          </div>
                          <div className="flex justify-between items-center p-1 bg-blue-50 rounded">
                            <div className="text-xs text-gray-900">East Field</div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="flex justify-between items-center p-1 bg-yellow-50 rounded">
                            <div className="text-xs text-gray-900">South Field</div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-green-100 text-sm">Mobile access included</p>
                </div>
              </div>

              <Link href="/schedule-assessment" className="w-full">
                <button className="w-full bg-[#1E88E5] py-4 rounded-lg font-bold hover:bg-[#1976D2] transition-all shadow-lg text-white">
                  Get Your Free Quote
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Volume Discount Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center max-w-4xl mx-auto"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Common Discounts Available</h3>
              <p className="text-gray-600">Save more with volume and frequency discounts tailored to your facility</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-[#43B02A]/5 to-[#43B02A]/10 rounded-xl border border-[#43B02A]/20">
                <div className="w-16 h-16 bg-[#43B02A] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-[#0D1B2A] mb-2">Multiple Fields</h4>
                <p className="text-sm text-gray-600">Save more as you add fields to your monitoring program</p>
                <p className="text-xs text-[#43B02A] font-bold mt-2">2+ fields qualify for discounts</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#1E88E5]/5 to-[#1E88E5]/10 rounded-xl border border-[#1E88E5]/20">
                <div className="w-16 h-16 bg-[#1E88E5] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-[#0D1B2A] mb-2">Testing Frequency</h4>
                <p className="text-sm text-gray-600">Lower per-test costs with quarterly or bi-annual programs</p>
                <p className="text-xs text-[#1E88E5] font-bold mt-2">Annual programs get best rates</p>
              </div>
            </div>

            <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#0D1B2A] mb-4">What affects your quote?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Number of fields</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Testing frequency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-[#43B02A] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Service level selected</span>
                </div>
              </div>
            </div>

            <Link href="/schedule-assessment">
              <button className="bg-[#1E88E5] text-white px-10 py-4 rounded-lg font-bold hover:bg-[#1976D2] transition-all shadow-md hover:shadow-lg">
                Get Your Free Custom Quote
              </button>
            </Link>
            <p className="mt-4 text-sm text-gray-600 text-center">No obligation • Typically respond within 24 hours</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Industry Research & Insights
              </h2>
              <p className="text-xl text-gray-600">
                Data-driven insights on proactive field monitoring benefits
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-4 text-base leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-[#43B02A] font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-600">{testimonial.title}</div>
                      <div className="text-xs text-gray-500">{testimonial.organization}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Professional Report Interface Screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-2xl"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Reporting Interface</h3>
                <p className="text-gray-600">Generate comprehensive reports that administrators trust</p>
              </div>

              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 shadow-lg">
                {/* Report Header */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#43B02A' }}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Quarterly Field Assessment Report</h4>
                        <p className="text-sm text-gray-600">Lincoln High School - Q1 2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium" style={{ color: '#43B02A' }}>Report Ready</div>
                      <div className="text-xs text-gray-500">Generated: Jan 28, 2025</div>
                    </div>
                  </div>
                </div>

                {/* Report Sections */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-[#43B02A]" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">Executive Summary</div>
                      <div className="text-xs text-gray-600">Overall field health assessment</div>
                    </div>
                    <div className="text-xs text-[#43B02A] font-medium">Complete</div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">Performance Analytics</div>
                      <div className="text-xs text-gray-600">GMAX, shear, infill depth trends</div>
                    </div>
                    <div className="text-xs text-blue-600 font-medium">Complete</div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">Maintenance Schedule</div>
                      <div className="text-xs text-gray-600">Recommended actions & timeline</div>
                    </div>
                    <div className="text-xs text-yellow-600 font-medium">Action Required</div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">Budget Planning</div>
                      <div className="text-xs text-gray-600">Cost projections & ROI analysis</div>
                    </div>
                    <div className="text-xs text-gray-600 font-medium">Complete</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 mt-4">
                  <button
                    className="flex-1 text-white py-2 px-4 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                    style={{ background: '#43B02A' }}
                  >
                    Download PDF
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Share Report
                  </button>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Professional reports that administrators understand and trust
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions About Artificial Turf Field Maintenance
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about professional synthetic field testing and monitoring
              </p>
            </motion.div>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How often should artificial turf fields be professionally tested?",
                answer: "Professional artificial turf maintenance testing should be conducted quarterly (every 3 months) to monitor field safety, performance metrics like GMAX and infill depth, and identify potential issues before they become costly emergency repairs. Regular synthetic field testing ensures optimal playing conditions and extends field lifespan."
              },
              {
                question: "What is GMAX testing and why is it important for artificial turf maintenance?",
                answer: "GMAX testing measures the shock absorption of artificial turf fields, which is critical for athlete safety. Professional GMAX testing ensures your synthetic field meets safety standards (under 200 for football, under 130 for soccer). Regular GMAX monitoring helps identify when artificial turf maintenance is needed to prevent injuries."
              },
              {
                question: "How much does professional artificial turf field maintenance cost?",
                answer: "Our comprehensive artificial turf maintenance monitoring service costs $2,500 per field per year, which includes quarterly professional testing, GMAX analysis, infill depth measurement, and detailed maintenance recommendations. This proactive approach may help avoid costly emergency synthetic field repairs.*"
              },
              {
                question: "What artificial turf maintenance services are included in field monitoring?",
                answer: "Our artificial turf maintenance program includes professional GMAX testing, shear factor analysis, infill depth measurement, visual field inspection, digital photo documentation, professional written reports, online dashboard access, and expert maintenance planning consultation for your synthetic sports field."
              },
              {
                question: "Can artificial turf maintenance prevent expensive field repairs?",
                answer: "Professional artificial turf maintenance monitoring can help reduce emergency repairs by identifying synthetic field issues early through regular testing and professional assessment. Schools may be able to schedule planned maintenance that typically costs less than emergency turf field repairs.*"
              },
              {
                question: "What synthetic field testing equipment do you use?",
                answer: "We use professional-grade artificial turf testing equipment including calibrated GMAX devices for shock absorption measurement, infill depth gauges, and specialized tools for shear factor analysis. All synthetic field testing equipment is regularly calibrated to ensure accurate artificial turf maintenance assessments."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Protect Your Athletes & Field Investment?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your initial field safety assessment and protect your athletes from preventable injuries
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/schedule-assessment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  style={{ color: '#43B02A' }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Assessment</span>
                </motion.button>
              </Link>

              <div className="flex justify-center">
                <a href="mailto:andrew@fieldhealthsystems.com" className="flex items-center space-x-2 hover:text-green-200 transition-colors text-white">
                  <Mail className="w-5 h-5" />
                  <span className="text-base font-medium">andrew@fieldhealthsystems.com</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>No obligation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>30-minute assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Professional recommendations</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="/logo-icon.svg" alt="Field Health Systems" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Field Health Systems</h3>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Professional field monitoring that protects your athletes from injury risks while safeguarding your investment
                through expert safety analysis and predictive maintenance planning.
              </p>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-green-400" />
                <a href="mailto:andrew@fieldhealthsystems.com" className="hover:text-white transition-colors">
                  andrew@fieldhealthsystems.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Testing Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/services/gmax-testing" className="hover:text-white transition-colors">
                    GMAX Testing
                  </Link>
                </li>
                <li>
                  <Link href="/services/shear-factor-testing" className="hover:text-white transition-colors">
                    Shear Factor Testing
                  </Link>
                </li>
                <li>
                  <Link href="/services/infill-depth-testing" className="hover:text-white transition-colors">
                    Infill Depth Testing
                  </Link>
                </li>
                <li>
                  <Link href="/services/field-condition-assessment" className="hover:text-white transition-colors">
                    Field Condition Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/schedule-assessment" className="hover:text-white transition-colors">
                    Schedule an Assessment
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/athlete-safety" className="hover:text-white transition-colors">
                    Athlete Safety
                  </Link>
                </li>
                <li>
                  <Link href="/partnerships" className="hover:text-white transition-colors">
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/service-areas/texas" className="hover:text-white transition-colors">
                    Service Areas
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Field Health Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
