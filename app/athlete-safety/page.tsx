'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, 
  AlertTriangle, 
  Activity,
  TrendingDown,
  CheckCircle, 
  Users, 
  Heart,
  Brain,
  Calendar,
  Mail,
  FileText,
  BarChart3,
  Target
} from 'lucide-react'

export default function AthleteSafetyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Field Health Systems</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#services" className="text-gray-700 hover:text-green-600 font-medium">Services</Link>
              <Link href="/#solutions" className="text-gray-700 hover:text-green-600 font-medium">Solutions</Link>
              <Link href="/#pricing" className="text-gray-700 hover:text-green-600 font-medium">Pricing</Link>
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Schedule Assessment
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mb-6">
              <span className="bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-full text-sm font-medium">
                Critical Information for Athletic Directors
              </span>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Hidden Dangers of Poorly Maintained 
              <span className="text-red-600"> Artificial Turf Fields</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              Comprehensive research shows that artificial turf fields with poor maintenance significantly increase 
              the risk of serious athlete injuries, including life-threatening head trauma and career-ending ACL tears.
            </p>
            
            <div className="bg-red-100 border-2 border-red-200 rounded-lg p-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-red-800">Critical Safety Alert</h3>
              </div>
              <p className="text-red-800 font-semibold text-lg">
                Fields with GMAX scores above 200 can increase the risk of fatal head injuries. 
                The Synthetic Turf Council recommends GMAX below 165 for safety.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Research is Clear</h2>
            <p className="text-xl text-gray-600">Data from peer-reviewed studies and real-world cases</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-red-50 rounded-lg border border-red-200"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">21.5%</div>
              <div className="text-gray-700 text-sm">of sports-related head injuries result from surface impact</div>
              <div className="text-xs text-gray-500 mt-2">Source: Sports injury research</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200"
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">1.6x</div>
              <div className="text-gray-700 text-sm">higher ACL tear rate on artificial turf vs. natural grass</div>
              <div className="text-xs text-gray-500 mt-2">Source: NCAA data 2004-2014</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200"
            >
              <div className="text-4xl font-bold text-yellow-600 mb-2">20-30%</div>
              <div className="text-gray-700 text-sm">GMAX increase over 3-5 years without proper maintenance</div>
              <div className="text-xs text-gray-500 mt-2">Source: Field testing reports</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">20-50%</div>
              <div className="text-gray-700 text-sm">potential injury risk reduction with proper maintenance</div>
              <div className="text-xs text-gray-500 mt-2">Source: Industry best practices</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Head Injury Risks */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="w-12 h-12 text-red-600" />
              <h2 className="text-4xl font-bold text-gray-900">Head Injuries & Concussion Risks</h2>
            </div>
            <p className="text-xl text-gray-600">
              Poorly maintained artificial turf hardens over time, dramatically increasing head injury risk
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* GMAX Safety Standards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Critical GMAX Safety Thresholds</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <div className="font-semibold text-gray-900">GMAX Below 165</div>
                    <div className="text-sm text-gray-600">Synthetic Turf Council recommended safety limit</div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <div className="font-semibold text-gray-900">GMAX 156 (NFL Standard)</div>
                    <div className="text-sm text-gray-600">Pre-game testing limit used by NFL</div>
                  </div>
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <div className="font-semibold text-gray-900">GMAX 165-200</div>
                    <div className="text-sm text-gray-600">Requires immediate monitoring and action</div>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <div className="font-semibold text-gray-900">GMAX Above 200</div>
                    <div className="text-sm text-gray-600">Life-threatening risk - field closure recommended</div>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>ASTM Standard:</strong> GMAX limit of 200 to avoid life-threatening head injuries. 
                  Scores above 200 can increase the risk of fatal outcomes.
                </p>
              </div>
            </motion.div>

            {/* Real Case Studies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Real-World Case Studies</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800 mb-2">Boston Youth Athletics Field</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    An aging turf field repeatedly failed GMAX tests with scores exceeding 200 in multiple locations, 
                    exposing thousands of youth athletes to dangerous concussion risks.
                  </p>
                  <p className="text-xs text-red-600 font-medium">Status: Field closed pending remediation</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Hardy Middle School, DC</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Testing revealed 6 out of 10 test spots with GMAX readings above 165, correlating with 
                    higher sub-concussive impacts during gameplay.
                  </p>
                  <p className="text-xs text-orange-600 font-medium">Action: Immediate maintenance required</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800 mb-2">Maryland High School Field</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Field testing showed GMAX readings exceeding 185, well above safety guidelines 
                    and significantly increasing player injury risks.
                  </p>
                  <p className="text-xs text-red-600 font-medium">Result: Season suspended until repairs</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800">
                    <strong>Maintenance Factor:</strong> Without regular infill replenishment and grooming, 
                    GMAX can rise 20-30% over 3-5 years, per field testing reports.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lower Extremity Injuries */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Activity className="w-12 h-12 text-orange-600" />
              <h2 className="text-4xl font-bold text-gray-900">Lower Extremity Injuries</h2>
            </div>
            <p className="text-xl text-gray-600">
              Artificial turf&apos;s higher friction and hardness increase foot, ankle, knee, and hip injury rates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Research Data */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Peer-Reviewed Research Data</h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">2022 PubMed Systematic Review</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Analysis of 53 studies (1972-2020) found consistently higher foot/ankle injury rates 
                    on artificial turf vs. natural grass:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Old-generation turf: 3 out of 4 studies showed increased risk</li>
                    <li>• New-generation turf: 9 out of 19 studies showed elevated risk</li>
                    <li>• Elite football players: Higher knee injury rates consistently observed</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">2023 Lancet Review</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Comprehensive analysis reported:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Lower overall injury incidence on turf (IRR 0.82 for men; 0.83 for women)</li>
                    <li>• However, higher foot/ankle risks, particularly for soccer and football</li>
                    <li>• Higher frictional coefficients on turf contribute to injury rates</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">NCAA Data (2004-2014)</h4>
                  <p className="text-sm text-gray-700">
                    <strong>ACL Tears:</strong> 1.6x higher on turf for Divisions 2/3 athletes 
                    (142 on turf vs. 111 on grass per 10,000 exposures)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Maintenance Impact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How Poor Maintenance Increases Risk</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Compromised Drainage</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Poor drainage leads to slippery conditions, increasing ankle sprain risk by up to 2x
                  </p>
                  <div className="bg-orange-50 p-2 rounded text-xs text-orange-700">
                    Solution: Regular drainage inspections and maintenance
                  </div>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800 mb-2">Uneven Surfaces</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Rushed installations and delayed maintenance create uneven playing surfaces
                  </p>
                  <div className="bg-red-50 p-2 rounded text-xs text-red-700">
                    Impact: Increased risk of trips, falls, and awkward landings
                  </div>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Infill Degradation</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Insufficient infill depth reduces shock absorption and affects traction
                  </p>
                  <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-700">
                    Standard: 25-38mm infill depth for optimal performance
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">The Cost of Inaction</h4>
                  <p className="text-sm text-gray-700">
                    Each preventable injury can cost hundreds of thousands in medical expenses, 
                    liability, and potential litigation - far exceeding the cost of preventive maintenance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Testing Solution */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-12 h-12 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900">Professional Testing Protects Athletes</h2>
            </div>
            <p className="text-xl text-gray-600">
              Regular GMAX testing and maintenance monitoring can reduce injury risks by 20-50%
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Annual GMAX Testing</h3>
              <p className="text-gray-600 mb-4">
                Professional testing costs less than $1,000 annually - a fraction of potential injury liability
              </p>
              <div className="text-2xl font-bold text-green-600">$15,000</div>
              <div className="text-sm text-gray-500">Equipment cost for in-house testing</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Reduction</h3>
              <p className="text-gray-600 mb-4">
                Proper maintenance can reduce injury risks significantly while extending field life
              </p>
              <div className="text-2xl font-bold text-blue-600">20-50%</div>
              <div className="text-sm text-gray-500">Potential injury risk reduction</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Field Life Extension</h3>
              <p className="text-gray-600 mb-4">
                Regular maintenance extends field life while maintaining optimal safety standards
              </p>
              <div className="text-2xl font-bold text-purple-600">2+ years</div>
              <div className="text-sm text-gray-500">Additional field lifespan</div>
            </motion.div>
          </div>

          {/* Compliance Standards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Industry Standards & Guidelines</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Synthetic Turf Council</h4>
                <p className="text-sm text-gray-600">GMAX &lt;165 recommended for safety compliance</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">ASTM Standards</h4>
                <p className="text-sm text-gray-600">GMAX &lt;200 to avoid life-threatening injuries</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">DC Guidelines</h4>
                <p className="text-sm text-gray-600">Annual testing protocols for municipal fields</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">PubMed/Lancet</h4>
                <p className="text-sm text-gray-600">Peer-reviewed research validates testing importance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recommendations for Athletic Directors
            </h2>
            <p className="text-xl text-gray-600">
              Evidence-based steps to protect your athletes and minimize liability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">Immediate Actions</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-800">Emergency GMAX Testing</h4>
                    <p className="text-sm text-red-700">
                      If any field hasn&apos;t been tested in over 12 months, schedule immediate GMAX assessment
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Calendar className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-800">Establish Testing Schedule</h4>
                    <p className="text-sm text-orange-700">
                      Implement quarterly professional assessments to monitor field degradation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Documentation Protocol</h4>
                    <p className="text-sm text-blue-700">
                      Maintain detailed records of all testing for insurance and liability protection
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">Long-term Strategy</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Heart className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800">Preventive Maintenance Program</h4>
                    <p className="text-sm text-green-700">
                      Regular grooming and infill top-off can extend field life by 2+ years and reduce risks by 20-50%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <BarChart3 className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-purple-800">Budget Planning</h4>
                    <p className="text-sm text-purple-700">
                      Use testing data to plan maintenance budgets and avoid emergency repair costs
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Users className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Staff Training</h4>
                    <p className="text-sm text-yellow-700">
                      Train maintenance staff on proper field care and early warning signs of deterioration
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cost Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gray-50 p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cost of Prevention vs. Cost of Consequences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-100 p-6 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Professional Testing & Maintenance
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Annual GMAX testing: $1,000</li>
                  <li>• Quarterly assessments: $2,500/field/year</li>
                  <li>• Preventive maintenance: $3,000-5,000/year</li>
                  <li>• Professional equipment: $15,000 (optional)</li>
                </ul>
                <div className="mt-4 p-3 bg-green-200 rounded">
                  <div className="font-bold text-green-800">Total: $6,500-8,500/year</div>
                </div>
              </div>
              
              <div className="bg-red-100 p-6 rounded-lg border-2 border-red-200">
                <h4 className="font-bold text-red-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Consequences of Poor Maintenance
                </h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Emergency field repairs: $25,000-75,000</li>
                  <li>• Injury medical costs: $100,000+</li>
                  <li>• Liability and litigation: $500,000+</li>
                  <li>• Reputation and enrollment impact: Immeasurable</li>
                </ul>
                <div className="mt-4 p-3 bg-red-200 rounded">
                  <div className="font-bold text-red-800">Potential Cost: $625,000+</div>
                </div>
              </div>
            </div>
          </motion.div>
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
              Don&apos;t Wait for an Injury to Take Action
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Professional field testing costs a fraction of potential injury liability. 
              Protect your athletes and your institution with regular safety assessments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Schedule Emergency Field Assessment</span>
              </motion.button>
              
              <div className="flex items-center space-x-4 text-white">
                <Mail className="w-5 h-5" />
                <a href="mailto:andrew@fieldhealthsystems.com" className="text-lg font-semibold hover:text-green-200 transition-colors">
                  andrew@fieldhealthsystems.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>24-hour emergency response</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Professional liability protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Detailed safety documentation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Field Health Systems</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Protecting athletes through professional field monitoring and safety assessments
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Mail className="w-5 h-5 text-green-400" />
              <a href="mailto:andrew@fieldhealthsystems.com" className="hover:text-white transition-colors">
                andrew@fieldhealthsystems.com
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Field Health Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}