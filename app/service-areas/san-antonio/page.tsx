'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'North East ISD (NEISD)',
  'Northside ISD',
  'San Antonio ISD',
  'Judson ISD',
  'South San Antonio ISD',
  'East Central ISD',
  'Southwest ISD',
  'Schertz-Cibolo-Universal City ISD',
  'New Braunfels ISD',
  'Boerne ISD',
  'Medina Valley ISD',
  'Comal ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function SanAntonioPage() {
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
            Artificial Turf Testing in San Antonio
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Field Health Systems serves Bexar County school districts, military installation athletic facilities,
            and the rapidly growing suburban districts north and south of San Antonio with independent turf
            field testing and condition assessments.
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
            A Growing City with Expanding Athletic Infrastructure
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              San Antonio is the second largest city in Texas and one of the fastest growing in the country.
              Northside ISD, the largest district in the San Antonio metro, serves over 100,000 students and
              operates synthetic turf fields across multiple high school and middle school campuses. North East ISD,
              serving the northeastern corridor toward the Hill Country, has made comparable investments in
              modern athletic facilities at campuses like Reagan, Churchill, and MacArthur high schools.
            </p>
            <p>
              The San Antonio metro has a strong military presence centered on Joint Base San Antonio, which
              encompasses Lackland Air Force Base, Fort Sam Houston, and Randolph Air Force Base. The military
              community in San Antonio creates substantial demand for youth and adult recreational athletic
              facilities, and installations across JBSA maintain outdoor sports fields used by service members,
              dependents, and civilian staff. These facilities carry the same field safety obligations as school
              district installations.
            </p>
            <p>
              The suburban growth corridor from Schertz and Cibolo north through New Braunfels and Comal County
              is one of the fastest developing regions in the state. Schertz-Cibolo-Universal City ISD has
              added new high school campuses in recent years, each bringing new synthetic turf installations
              that are still in their early years of service -- but early testing establishes a baseline that
              makes future comparisons meaningful.
            </p>
            <p>
              South San Antonio ISD, East Central ISD, and Southwest ISD serve communities on the south and east
              sides of the city with large student populations and limited per-student funding relative to
              wealthier suburban counterparts. Independent testing helps these districts get the most out of
              their existing installations by identifying areas of field wear early, before a partial replacement
              becomes a full replacement.
            </p>
          </div>
        </div>
      </section>

      {/* Military Note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Military Installation Facilities</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              Field Health Systems can work with athletic facility managers at Joint Base San Antonio to
              coordinate testing access through appropriate channels. High turnover in military communities
              means field safety records are especially important -- incoming staff need objective baseline
              data rather than relying on institutional memory from personnel who may have rotated out.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>San Antonio Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for availability at specific campuses or facilities not listed above.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in San Antonio</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a San Antonio Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Contact Field Health Systems to discuss your facility and get an on-site assessment on the calendar.
            Serving all Bexar County districts and surrounding communities.
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
