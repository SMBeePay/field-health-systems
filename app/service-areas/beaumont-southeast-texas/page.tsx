'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Beaumont ISD',
  'Port Arthur ISD',
  'Nederland ISD',
  'Port Neches-Groves ISD',
  'Lumberton ISD',
  'Vidor ISD',
  'Orangefield ISD',
  'Bridge City ISD',
  'Silsbee ISD',
  'Hardin-Jefferson ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function BeaumontSoutheastTexasPage() {
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
            Artificial Turf Testing in Beaumont and Southeast Texas
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The Golden Triangle region of Southeast Texas combines petrochemical industry wealth with
            some of the most demanding weather conditions for synthetic turf fields in the state.
            Field Health Systems provides independent testing for Beaumont-area school districts
            and athletic facilities throughout the region.
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
            Gulf Coast Humidity, Flooding Risk, and Strong Athletic Programs
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The Beaumont-Port Arthur metro, often called the Golden Triangle for the wealth generated
              by the refining and petrochemical industries along the Gulf Coast, has historically funded
              athletic programs at levels well above what the region's population size would suggest.
              Nederland ISD and Port Neches-Groves ISD are among the most storied programs in Texas
              high school football, and both have invested in modern athletic facilities. Lumberton ISD
              and Vidor ISD serve growing communities north and east of Beaumont with programs that
              have risen in prominence as their enrollment has grown.
            </p>
            <p>
              The Southeast Texas climate is demanding for synthetic turf in a way that is distinct from
              other parts of the state. Jefferson County and Orange County sit at sea level along the
              Gulf Coast, and the region receives some of the highest rainfall totals in Texas --
              Beaumont averages over 55 inches of rain per year, placing it among the wettest cities
              in the continental United States. That rainfall, combined with very high humidity year-round
              and the flat terrain that slows drainage, means that synthetic turf fields in this region
              are wet far more often than fields elsewhere in Texas.
            </p>
            <p>
              Sustained moisture in infill material creates conditions that affect both field performance
              and hygiene. Organic infill materials can harbor microbial growth when kept damp.
              Even synthetic infill materials perform differently when saturated versus dry, and
              repeated wetting and drying cycles over years of service can change infill compaction
              characteristics. Fields that drain poorly -- a particular concern given the flat topography
              and high water table of Southeast Texas -- may accumulate moisture-driven wear faster
              than their design life accounts for.
            </p>
            <p>
              The region is also in the path of Gulf tropical systems. When a significant storm moves
              through Southeast Texas, the resulting flooding can redistribute infill material, compromise
              backing integrity, and leave debris embedded in the field surface. Post-storm assessments
              help athletic directors understand whether their fields are safe for return to play before
              athletes are back on the surface.
            </p>
          </div>
        </div>
      </section>

      {/* Weather Note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-2">Post-Storm Field Assessment</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Southeast Texas is regularly affected by Gulf Coast tropical systems. After any significant
              storm event that results in field flooding or damage, a post-event assessment from Field
              Health Systems can document the field's current condition, identify areas of infill
              displacement or backing damage, and provide the data needed to support an insurance claim
              or repair authorization from district administration.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Southeast Texas Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Serving Jefferson County, Orange County, and surrounding Southeast Texas communities.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for availability.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Southeast Texas</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Southeast Texas Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Golden Triangle programs have built great athletic traditions. Protect them with independent
            field data that tells you exactly where your facilities stand.
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
