'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Killeen ISD',
  'Temple ISD',
  'Belton ISD',
  'Copperas Cove ISD',
  'Lampasas ISD',
  'Gatesville ISD',
  'Troy ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function KilleenTemplePage() {
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
            Artificial Turf Testing in Killeen and Temple
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The Fort Cavazos corridor anchored by Killeen and Temple has a large military population
            and strong demand for youth sports facilities. Field Health Systems provides independent
            turf field testing for school districts and athletic facilities throughout the region.
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
            Military Community and the Value of Documented Field Safety Records
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The Killeen-Temple-Fort Cavazos corridor in Bell County is defined by its military presence.
              Fort Cavazos, formerly known as Fort Hood, is one of the largest military installations
              in the world and the anchor of the region's economy and community life. Military families
              cycle in and out on two to three year rotation schedules, which creates a community dynamic
              where institutional knowledge does not accumulate the same way it does in stable civilian
              communities. Athletic facility records, including field testing history, are especially
              valuable in this context.
            </p>
            <p>
              When an athletic director or facilities manager rotates out and a new one arrives, documented
              field testing records through the Field Health Systems platform provide immediate context:
              when the field was last tested, what the results were, how they compare to prior years, and
              whether any areas of the field showed elevated readings. That institutional continuity
              cannot come from informal knowledge transfer -- it has to be in the records.
            </p>
            <p>
              Killeen ISD is the largest district in Bell County, serving a student population that is
              directly tied to the Fort Cavazos mission and the surrounding community. The district operates
              multiple high school campuses with synthetic turf athletic facilities. Copperas Cove ISD,
              serving a city on the Coryell County side of the fort, has a similarly military-connected
              student population and comparable athletic facilities.
            </p>
            <p>
              Temple ISD and Belton ISD serve communities to the east and southeast of Fort Cavazos
              with more civilian-focused demographics, but both participate in the same regional athletic
              ecosystem. Belton in particular has seen enrollment growth and investment in its athletic
              program. The Temple-Belton corridor along I-35 is developing rapidly, with new construction
              and facility upgrades that create opportunities for baseline testing on new installations.
            </p>
          </div>
        </div>
      </section>

      {/* Military Note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Fort Cavazos On-Post Facilities</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              Field Health Systems can coordinate with Fort Cavazos athletic and recreational facilities
              managers for on-post field testing. Military installation facilities serving service members
              and their families carry the same field safety obligations as civilian school district
              facilities, and independent testing supports the documentation requirements of Army
              Morale, Welfare and Recreation programs.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Killeen-Temple Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for Fort Cavazos and municipal facility scheduling.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Killeen and Temple</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Killeen-Temple Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Consistent field testing records protect athletes and support the institutional continuity
            that military community athletic programs need. Contact Field Health Systems to get started.
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
