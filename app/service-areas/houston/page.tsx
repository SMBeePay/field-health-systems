'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Cypress-Fairbanks ISD',
  'Klein ISD',
  'Katy ISD',
  'Spring ISD',
  'Humble ISD',
  'Conroe ISD',
  'Clear Creek ISD',
  'Pasadena ISD',
  'Alief ISD',
  'Spring Branch ISD',
  'Houston ISD',
  'Pearland ISD',
  'Friendswood ISD',
  'Deer Park ISD',
  'Channelview ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function HoustonPage() {
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
            Artificial Turf Testing in Houston
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Field Health Systems provides independent third-party GMAX, shear factor, and infill depth testing
            for Houston-area school districts and municipal facilities across Harris County and surrounding communities.
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
            Houston Is the Largest Athletic Facilities Market in Texas
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Harris County is home to the largest concentration of synthetic turf athletic fields in Texas.
              Cypress-Fairbanks ISD, the largest school district in the Houston area, operates multiple high
              school campuses each with turf football and soccer facilities. Katy ISD, Klein ISD, and Humble ISD
              have made comparable investments as their communities have grown, and Clear Creek ISD serves the
              NASA corridor with a robust athletic program spanning multiple campuses.
            </p>
            <p>
              Houston's Gulf Coast climate creates conditions that are genuinely challenging for synthetic turf.
              The combination of extreme summer heat, very high humidity, and the frequency of significant rain
              events -- including the flooding that follows major Gulf storms -- puts unusual stress on turf
              systems. Standing water accelerates the growth of mold and bacteria in infill material, degrades
              backing integrity over time, and can cause uneven infill distribution after heavy drainage events.
              These are not theoretical concerns: they affect real fields and real athletes.
            </p>
            <p>
              Houston ISD has invested significantly in athletic facility upgrades across its many campuses,
              and Spring Branch ISD, Alief ISD, and Pasadena ISD all maintain turf installations that serve
              high-volume multi-sport use. Multi-sport fields, where football, soccer, lacrosse, and marching
              band all share a single synthetic surface, show infill compaction patterns that differ from
              single-sport installations and require attention at multiple test locations across the field.
            </p>
            <p>
              Independent testing provides Houston-area athletic directors with objective data that goes beyond
              the turf manufacturer's warranty documentation. Third-party GMAX and HIC testing, conducted by
              Field Health Systems on site, gives districts defensible records in the event of an injury claim
              and actionable data to support maintenance and replacement budget requests.
            </p>
          </div>
        </div>
      </section>

      {/* Climate Note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-2">Gulf Coast Climate and Turf Field Safety</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Houston-area fields experience surface temperatures exceeding 150 degrees Fahrenheit on summer
              afternoons, while overnight humidity rarely drops low enough to fully dry out infill material between
              uses. This cycle accelerates infill compaction, which directly affects GMAX scores. Fields in the
              Houston area may reach unsafe hardness levels faster than their design life projections suggest.
              Regular independent testing -- not just manufacturer inspections -- is the only reliable way to
              track this drift.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Houston Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Serving all Harris County districts and surrounding areas including Fort Bend, Montgomery, and Brazoria counties.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us to confirm availability.</Link>
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Houston</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Houston Area Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Field Health Systems travels to Houston-area facilities for on-site testing with fast report turnaround.
            Get objective field data before your next season starts.
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
