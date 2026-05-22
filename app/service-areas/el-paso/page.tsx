'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'El Paso ISD',
  'Ysleta ISD',
  'Socorro ISD',
  'Canutillo ISD',
  'Clint ISD',
  'Anthony ISD',
  'Fabens ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function ElPasoPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />

      {/* Hero */}
      <section style={{ background: '#12324A' }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium uppercase tracking-wide text-sm">Texas Service Area</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Artificial Turf Testing in El Paso
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            El Paso's high desert climate subjects synthetic turf fields to extreme heat, intense UV radiation,
            and low humidity -- conditions that accelerate fiber and infill degradation faster than
            manufacturer projections from temperate climates. Field Health Systems provides independent
            testing for El Paso area school districts and athletic facilities.
          </p>
          <Link href="/schedule-assessment">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Schedule Assessment
            </button>
          </Link>
        </div>
      </section>

      {/* Local Context */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#12324A' }}>
            High Desert Conditions and Synthetic Turf Longevity
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              El Paso sits at 3,800 feet of elevation in the Chihuahuan Desert, and the combination of
              altitude, low humidity, and intense sunshine creates UV exposure levels that are significantly
              higher than in lower-elevation Texas cities. Ultraviolet radiation is the primary cause of
              synthetic fiber degradation -- it breaks down the polymer chains in synthetic grass blades,
              making fibers brittle over time and reducing their ability to absorb and distribute impact
              energy. At El Paso's elevation and with the region's typical 300-plus sunny days per year,
              fiber degradation happens faster than in cities like Houston or San Antonio.
            </p>
            <p>
              Infill compaction in El Paso's arid environment presents a different problem than in humid
              climates. The very low humidity means infill material does not retain moisture, which affects
              the cushioning properties of some infill types. Dust and fine desert sand infiltrate the
              infill layer over time, increasing density and stiffness. These changes manifest as elevated
              GMAX readings -- a field that was soft and compliant at installation can become measurably
              harder without any obvious visual change.
            </p>
            <p>
              El Paso ISD operates the largest number of campuses in the region, including several high
              schools with established athletic programs. Ysleta ISD and Socorro ISD serve large student
              populations in the eastern and southeastern parts of the metro, and both have invested in
              synthetic turf at their high school campuses. Canutillo ISD, serving the northwest corridor
              near the New Mexico state line, has built facilities that serve its growing community.
            </p>
            <p>
              El Paso is geographically isolated -- the nearest major Texas city is over 300 miles away in
              any direction. That isolation has historically made it harder for El Paso athletic facilities
              to access specialized testing services. Field Health Systems makes the trip to El Paso to
              provide the same independent assessment available to DFW and Houston districts.
            </p>
          </div>
        </div>
      </section>

      {/* Climate Note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-900 mb-2">High Desert Heat and Turf Surface Temperatures</h3>
            <p className="text-red-800 text-sm leading-relaxed">
              El Paso synthetic turf fields can exceed 170 degrees Fahrenheit on peak summer afternoons.
              These extreme surface temperatures do not just create heat stress for athletes -- they
              accelerate infill compaction and fiber stiffness at a rate that can push fields past safe
              GMAX thresholds well ahead of their expected service life. Testing at regular intervals
              captures this accelerated aging before it becomes a safety issue.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>El Paso Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Also serving UTEP athletics and Fort Bliss installation facilities.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> to discuss your location.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in El Paso</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href}>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-sm transition-all group">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-gray-800 group-hover:text-green-700 transition-colors">
                    {service.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 ml-auto transition-colors" />
                </div>
              </Link>
            ))}
          </div>
          <Link href="/service-areas/texas">
            <span className="text-green-600 hover:underline text-sm font-medium">View all Texas service areas</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#12324A' }} className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Schedule an El Paso Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Distance is not a barrier. Field Health Systems serves El Paso and Far West Texas with the same
            independent, certified testing your athletes deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule-assessment">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Schedule Assessment
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Contact Andrew
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
