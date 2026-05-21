'use client'

import Link from 'next/link'
import { Shield, CheckCircle, BarChart3, Bell, FileText, Layers, Activity, Gauge, ArrowRight, Monitor } from 'lucide-react'
import { MarketingNav } from '@/components/layout/marketing-nav'

const testingServices = [
  {
    icon: <Gauge className="w-8 h-8 text-green-600" />,
    name: 'GMAX Testing',
    standard: 'ASTM F1936',
    description: 'Measures the shock attenuation of your turf surface -- the critical metric for head injury prevention. Every field we visit is tested at multiple points across all high-use zones.',
    what: [
      'Shock absorption capacity at each test point',
      'Hardness variation across the full field surface',
      'Compliance status against the 165 g safety threshold',
      'Zone-by-zone heat map of impact values',
    ],
    color: 'green',
  },
  {
    icon: <Activity className="w-8 h-8 text-blue-600" />,
    name: 'Shear Factor Testing',
    standard: 'ASTM F1337',
    description: 'Rotational traction testing that measures how much resistance the surface provides when an athlete plants and cuts. Too much traction causes ACL tears. Too little causes slips and falls.',
    what: [
      'Rotational resistance at multiple field locations',
      'Traction uniformity across playing surface',
      'Identification of high-risk zones before injuries occur',
      'Trending data to catch degradation early',
    ],
    color: 'blue',
  },
  {
    icon: <Layers className="w-8 h-8 text-purple-600" />,
    name: 'Infill Depth Measurement',
    standard: 'Manufacturer spec',
    description: 'Infill is what gives artificial turf its performance characteristics. As it compacts and migrates, fields become harder and more dangerous. We measure depth across the full field to identify where maintenance is needed.',
    what: [
      'Infill depth at a grid of points across the entire field',
      'Comparison against manufacturer specification',
      'Identification of low-fill zones requiring grooming or top-dressing',
      'Migration patterns that indicate drainage or maintenance issues',
    ],
    color: 'purple',
  },
  {
    icon: <Shield className="w-8 h-8 text-orange-600" />,
    name: 'Field Condition Assessment',
    standard: 'Visual + physical',
    description: 'A trained eye on the complete field -- seams, fiber wear, drainage, edge conditions, and any damage or safety hazards that don\'t show up in quantitative testing alone.',
    what: [
      'Fiber wear and pile height across all zones',
      'Seam integrity and separation inspection',
      'Drainage performance and standing water risk areas',
      'Edge and border condition',
      'Photo documentation of all findings',
    ],
    color: 'orange',
  },
]

const softwareFeatures = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Historical Trend Tracking',
    desc: 'Every test result is stored and graphed over time so you can see exactly how each field is changing between visits.',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Maintenance Alerts',
    desc: 'Automated alerts when a field metric approaches a threshold so you can act before it becomes a safety issue or an emergency repair.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Compliance Documentation',
    desc: 'Insurer-ready reports available any time. If a carrier or a plaintiff\'s attorney asks for your testing history, you have it.',
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    title: 'Multi-Field Dashboard',
    desc: 'See the health status of every turf field across your district in one place -- from the stadium field to the middle school practice field.',
  },
]

function LaptopMockup() {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Laptop screen bezel */}
      <div className="bg-gray-800 rounded-t-2xl p-3 pb-0 shadow-2xl">
        {/* Browser chrome */}
        <div className="bg-gray-700 rounded-t-lg px-4 py-2 flex items-center space-x-2 mb-0">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 bg-gray-600 rounded-full px-4 py-1 text-xs text-gray-400 text-center mx-4">
            app.fieldhealthsystems.com
          </div>
        </div>

        {/* Dashboard screen */}
        <div className="bg-gray-50 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="bg-[#12324A] w-44 flex-shrink-0 p-3 flex flex-col">
              <div className="flex items-center space-x-2 mb-6 px-1">
                <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-xs font-semibold">Field Health</span>
              </div>
              {['Dashboard', 'My Fields', 'Reports', 'Alerts', 'Settings'].map((item, i) => (
                <div key={item} className={`px-3 py-1.5 rounded-md mb-1 text-xs ${i === 0 ? 'bg-green-500/20 text-green-400' : 'text-gray-400'}`}>
                  {item}
                </div>
              ))}
              <div className="mt-auto">
                <div className="px-3 py-1.5 bg-green-500/10 rounded-md">
                  <div className="text-green-400 text-xs font-medium">Katy ISD</div>
                  <div className="text-gray-500 text-xs">Pro Plan</div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-gray-800 text-sm font-bold">Field Health Overview</h3>
                  <p className="text-gray-400 text-xs">6 fields monitored</p>
                </div>
                <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">All Systems</div>
              </div>

              {/* Field status cards */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { name: 'Stadium Field', gmax: 142, status: 'good', statusColor: 'green' },
                  { name: 'Practice Field A', gmax: 158, status: 'monitor', statusColor: 'yellow' },
                  { name: 'MS North Field', gmax: 134, status: 'good', statusColor: 'green' },
                ].map((field) => (
                  <div key={field.name} className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-600 text-xs truncate">{field.name}</span>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${field.statusColor === 'green' ? 'bg-green-500' : 'bg-yellow-400'}`} />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{field.gmax}</div>
                    <div className="text-gray-400 text-xs">GMAX score</div>
                    <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${field.statusColor === 'green' ? 'bg-green-500' : 'bg-yellow-400'}`}
                        style={{ width: `${(field.gmax / 200) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart section */}
              <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 text-xs font-semibold">Stadium Field -- GMAX Trend</span>
                  <span className="text-gray-400 text-xs">Last 12 months</span>
                </div>
                <div className="flex items-end space-x-1.5 h-12">
                  {[120, 128, 131, 135, 138, 140, 138, 142, 145, 142, 140, 142].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className={`rounded-sm ${val > 140 ? 'bg-yellow-400' : 'bg-green-400'}`}
                        style={{ height: `${(val / 165) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-300 text-xs">Jan</span>
                  <span className="text-gray-300 text-xs">Dec</span>
                </div>
              </div>

              {/* Alert */}
              <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 flex items-center space-x-2">
                <Bell className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                <span className="text-yellow-700 text-xs">Practice Field A approaching monitor threshold -- maintenance recommended before next visit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Laptop base */}
      <div className="bg-gray-700 h-3 rounded-b-sm mx-2 shadow-lg" />
      <div className="bg-gray-600 h-2 rounded-b-xl mx-0 shadow-md" />
      <div className="bg-gray-500 h-1 rounded-b-2xl mx-8 opacity-50" />
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav activePath="/services/gmax-testing" />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1776566347716-72e033880859?w=1920&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-[#12324A]/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm inline-block mb-6">
            Independent Third-Party Field Testing + Software Platform
          </span>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Everything Your Fields Need.<br />
            <span className="text-green-400">In One Place.</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional on-site testing across every key metric -- GMAX, shear factor, infill depth, and field condition -- combined with a software platform that tracks every result over time.
          </p>
          <Link
            href="/schedule-assessment"
            className="inline-flex items-center space-x-2 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-opacity hover:opacity-90"
            style={{ background: '#4CAF50' }}
          >
            <span>Schedule an Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Testing Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">On-Site Testing Services</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Every visit covers all four testing areas. You get a complete picture of your field, not just one metric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testingServices.map((service) => {
              const colorMap: Record<string, string> = {
                green: 'bg-green-50 border-green-200',
                blue: 'bg-blue-50 border-blue-200',
                purple: 'bg-purple-50 border-purple-200',
                orange: 'bg-orange-50 border-orange-200',
              }
              const badgeMap: Record<string, string> = {
                green: 'bg-green-100 text-green-700',
                blue: 'bg-blue-100 text-blue-700',
                purple: 'bg-purple-100 text-purple-700',
                orange: 'bg-orange-100 text-orange-700',
              }
              return (
                <div key={service.name} className={`rounded-xl border p-8 ${colorMap[service.color]}`}>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeMap[service.color]}`}>
                        {service.standard}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-5 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.what.map((item) => (
                      <li key={item} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Software Platform */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="bg-[#12324A] text-green-400 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              Field Health Platform
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Fields. All the Data. One Dashboard.
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Testing results are only valuable if you can see them, track them, and act on them. Our platform gives you that visibility -- for every field, across every visit.
            </p>
          </div>

          {/* Laptop mockup */}
          <div className="mb-16">
            <LaptopMockup />
          </div>

          {/* Software features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softwareFeatures.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-10 h-10 bg-[#12324A] text-green-400 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How testing + software work together */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Testing + Software Together</h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Every other testing company gives you a PDF and leaves. We give you a living record of your fields that gets more valuable with every visit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'We Come to You',
                desc: 'Our technician visits your fields and runs all four testing protocols. Typically 60-90 minutes per field.',
              },
              {
                step: '2',
                title: 'Results Go Into the Platform',
                desc: 'All test data is uploaded to your dashboard where it\'s stored, graphed, and compared against previous visits.',
              },
              {
                step: '3',
                title: 'You Stay Informed Year-Round',
                desc: 'The platform monitors trends between visits and alerts you when any field needs attention before your next scheduled assessment.',
              },
            ].map((step) => (
              <div key={step.step} className="relative">
                <div
                  className="w-14 h-14 rounded-full text-white font-bold text-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: '#4CAF50' }}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-white text-center"
        style={{ background: '#12324A' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-300 text-xl mb-8">
            Tell us about your fields and we will put together a plan that fits your district.
          </p>
          <Link
            href="/schedule-assessment"
            className="inline-flex items-center space-x-2 bg-green-500 text-white font-semibold px-10 py-4 rounded-lg text-lg hover:bg-green-600 transition-colors"
          >
            <span>Schedule an Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
