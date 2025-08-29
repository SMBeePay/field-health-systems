'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Phone,
  MapPin,
  Star,
  Target,
  AlertTriangle,
  FileText,
  BarChart3,
  Calendar
} from 'lucide-react'

export default function MarketingHomePage() {
  // const [activeTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Mike Chen",
      title: "Athletic Director",
      organization: "Lincoln High School",
      quote: "Field Health Systems saved us $35,000 in emergency repairs last year. The quarterly assessments caught problems before they became disasters.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Sarah Rodriguez",
      title: "Facilities Director", 
      organization: "Metro School District",
      quote: "We went from reactive maintenance chaos to predictable budgeting. Our fields are in the best condition they've been in years.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "David Johnson",
      title: "Principal",
      organization: "Westfield Academy",
      quote: "The professional reports give us exactly what we need for budget meetings. Administration finally understands our field maintenance needs.",
      image: "/api/placeholder/64/64"
    }
  ]

  const stats = [
    { number: "73%", label: "Reduction in emergency repairs" },
    { number: "$18,500", label: "Average annual cost savings" },
    { number: "2.8 years", label: "Average field life extension" },
    { number: "500+", label: "Fields under professional monitoring" }
  ]

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
              <a href="#services" className="text-gray-700 hover:text-green-600 font-medium">Services</a>
              <a href="#solutions" className="text-gray-700 hover:text-green-600 font-medium">Solutions</a>
              <a href="#pricing" className="text-gray-700 hover:text-green-600 font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium">Success Stories</a>
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
      <section className="relative py-20 overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/sports-field-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  Professional Field Monitoring + Analytics
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Professional Artificial Turf Field Maintenance &
                <span className="text-green-400"> Testing Services</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Expert artificial turf maintenance monitoring with GMAX testing, infill depth analysis, and synthetic field safety inspections. 
                Reduce emergency repairs by 73% with professional quarterly assessments and predictive maintenance planning.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Get Your Free Assessment</span>
                </motion.button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>No equipment purchase required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Professional service from day one</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Field Health Report</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">GMAX Safety</p>
                          <p className="text-sm text-gray-600">68.5 (Excellent)</p>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Shear Factor</p>
                          <p className="text-sm text-gray-600">28.7 Nm (Good)</p>
                        </div>
                      </div>
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Infill Depth</p>
                          <p className="text-sm text-gray-600">12.3mm (Monitor)</p>
                        </div>
                      </div>
                      <Target className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Schedule infill redistribution within 30 days</li>
                    <li>• Estimated cost: $3,200</li>
                    <li>• Prevents $15,000+ emergency repair</li>
                  </ul>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
              >
                <Shield className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
                  <p className="text-red-700">Reactive artificial turf maintenance leading to budget surprises ($25K-$75K emergency synthetic field repairs)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-red-700">No systematic artificial turf field monitoring or synthetic field safety compliance documentation</p>
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
                <Shield className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-green-800">Our Solution</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-green-700">Professional quarterly assessments catch problems before they become disasters</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-green-700">Predictable budgeting with 3-5 year maintenance forecasts</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-green-700">Safety compliance documentation for insurance and liability protection</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
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
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Field Health Systems Dashboard</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Live Data</span>
                  </div>
                </div>
                
                {/* Status Overview */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">4</div>
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
                        <span className="font-medium text-green-600">68.5</span>
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
            className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white p-12 rounded-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">
              Professional field health assessments, just like regular medical check-ups
            </h3>
            <p className="text-xl mb-6 opacity-90">
              At a fraction of the cost of emergency repairs
            </p>
            <div className="text-2xl font-bold">
              $2,500/year vs $25,000+ problem resolution
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
                Professional Artificial Turf Field Maintenance Services
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive synthetic field testing and monitoring to protect your turf investment and athlete safety
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
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Technicians</h3>
              <p className="text-gray-600 mb-4">Certified technicians conduct comprehensive quarterly assessments using professional-grade equipment</p>
              
              {/* Field Testing Image Placeholder */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
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
                    <span className="font-medium text-green-600">68.5 (Excellent)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Technician:</span>
                    <span className="font-medium">J. Martinez, Certified</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
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
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Analytics Platform</h3>
              <p className="text-gray-600 mb-4">Proprietary software platform with real-time dashboards, trend analysis, and predictive insights</p>
              
              {/* Dashboard Screenshot Mockup */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm">Field Health Dashboard</h4>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-green-600">4</div>
                    <div className="text-xs text-gray-600">Excellent</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-blue-600">2</div>
                    <div className="text-xs text-gray-600">Good</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-200 h-1 rounded-full">
                      <div className="bg-green-500 h-1 rounded-full" style={{width: '75%'}}></div>
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
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Reports</h3>
              <p className="text-gray-600 mb-4">Detailed quarterly reports with maintenance recommendations, budget planning, and compliance documentation</p>
              
              {/* Report Preview */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-sm text-gray-900">Q1 2025 Field Report</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Executive Summary</span>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Field Performance Data</span>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maintenance Calendar</span>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget Planning</span>
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">12 pages • PDF</span>
                    <span className="text-xs text-green-600 font-medium">Ready for Review</span>
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
                    <item.icon className="w-8 h-8 text-green-600" />
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Professional monitoring at a price that fits your budget
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Standard Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard Monitoring</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">$2,500</div>
                <div className="text-gray-600">per field, per year</div>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  "4 quarterly professional assessments",
                  "Comprehensive GMAX, shear, infill testing",
                  "Digital photo documentation",
                  "Professional written reports",
                  "Software dashboard access",
                  "Budget planning consultation"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-green-600 p-8 rounded-2xl shadow-lg border-2 border-green-600 text-white relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium Setup</h3>
                <div className="text-4xl font-bold mb-2">$1,250</div>
                <div className="text-green-100">one-time setup fee</div>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  "Comprehensive field audit & baseline",
                  "Historical data migration",
                  "Staff training on platform",
                  "Custom maintenance calendar",
                  "Insurance documentation package",
                  "Priority customer support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-200 flex-shrink-0" />
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
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
              
              <button className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Add Premium Setup
              </button>
            </motion.div>

            {/* Volume Discounts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Volume Discounts</h3>
                <div className="text-lg text-gray-600">Multiple fields save more</div>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">2-3 fields</span>
                  <span className="font-semibold text-green-600">$2,400/field (4% off)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">4-6 fields</span>
                  <span className="font-semibold text-green-600">$2,250/field (10% off)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">7+ fields</span>
                  <span className="font-semibold text-green-600">$2,100/field (16% off)</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Payment Options</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Annual payment (5% discount)</li>
                  <li>• Quarterly payments</li>
                  <li>• Monthly payments available</li>
                  <li>• Budget year alignment</li>
                </ul>
              </div>
              
              <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Get Custom Quote
              </button>
            </motion.div>
          </div>
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
                Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                See how schools across the country are protecting their investments
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
                      <span className="text-green-600 font-semibold text-sm">
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
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Quarterly Field Assessment Report</h4>
                        <p className="text-sm text-gray-600">Lincoln High School - Q1 2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">Report Ready</div>
                      <div className="text-xs text-gray-500">Generated: Jan 28, 2025</div>
                    </div>
                  </div>
                </div>
                
                {/* Report Sections */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">Executive Summary</div>
                      <div className="text-xs text-gray-600">Overall field health assessment</div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">Complete</div>
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
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
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
                answer: "Our comprehensive artificial turf maintenance monitoring service costs $2,500 per field per year, which includes quarterly professional testing, GMAX analysis, infill depth measurement, and detailed maintenance recommendations. This investment typically saves schools $15,000-$45,000 in emergency synthetic field repairs."
              },
              {
                question: "What artificial turf maintenance services are included in field monitoring?",
                answer: "Our artificial turf maintenance program includes professional GMAX testing, shear factor analysis, infill depth measurement, visual field inspection, digital photo documentation, professional written reports, online dashboard access, and expert maintenance planning consultation for your synthetic sports field."
              },
              {
                question: "Can artificial turf maintenance prevent expensive field repairs?",
                answer: "Yes, professional artificial turf maintenance monitoring reduces emergency repairs by up to 73%. By identifying synthetic field issues early through regular testing and professional assessment, schools can schedule planned maintenance that costs significantly less than emergency turf field repairs."
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
              Ready to Protect Your Field Investment?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your free initial field assessment and see what professional monitoring can reveal
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Free Assessment</span>
              </motion.button>
              
              <div className="flex items-center space-x-4 text-white">
                <Phone className="w-5 h-5" />
                <span className="text-lg font-semibold">(555) 123-TURF</span>
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
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Field Health Systems</h3>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Professional field monitoring and data insights that protect your investment 
                and your athletes through expert analysis and predictable maintenance planning.
              </p>
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-green-400" />
                <span>(555) 123-TURF</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Field Health Monitoring</li>
                <li>Professional Assessments</li>
                <li>Data Analytics Platform</li>
                <li>Maintenance Planning</li>
                <li>Compliance Reporting</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Success Stories</li>
                <li>Contact Us</li>
                <li>Schedule Assessment</li>
                <li>Support</li>
              </ul>
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