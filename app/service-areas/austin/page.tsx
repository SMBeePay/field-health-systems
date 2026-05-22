'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Austin ISD',
  'Round Rock ISD',
  'Pflugerville ISD',
  'Georgetown ISD',
  'Leander ISD',
  'Lake Travis ISD',
  'Dripping Springs ISD',
  'Hays CISD',
  'Del Valle ISD',
  'Eanes ISD',
  'Manor ISD',
  'Taylor ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function AustinPage() {
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
            Artificial Turf Testing in Austin
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Austin is the fastest growing major metro in Texas, and new synthetic turf field installations are
            coming online every year as school districts expand to meet population growth. Field Health Systems
            provides independent testing and field condition assessments throughout the Austin metro and Central Texas.
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
            Rapid Growth Means New Fields Coming Online Every Year
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The Austin metro added more residents in the last decade than any other major Texas city. That
              growth has put enormous pressure on school districts across the region to build new campuses
              quickly. Round Rock ISD, Georgetown ISD, Leander ISD, Hays CISD, and Dripping Springs ISD have
              all opened multiple new high school or middle school campuses in recent years, and each new
              campus typically includes at least one synthetic turf installation. Some districts are adding
              fields at existing campuses to keep up with growing extracurricular participation as well.
            </p>
            <p>
              New fields need baseline testing. When a field is tested at installation and then at years two,
              four, and six, the data tells a clear story about whether that specific field is aging normally
              or showing accelerated wear. Without a baseline, you are comparing a field to a standard rather
              than to its own history. Districts in rapidly growing areas like Pflugerville and Manor, where
              budget pressures are real and fields must last as long as possible, benefit the most from data
              that supports informed maintenance and replacement decisions.
            </p>
            <p>
              The University of Texas at Austin operates major synthetic turf installations at Darrell K
              Royal-Texas Memorial Stadium and ancillary practice facilities. University facilities, which
              often see very high-intensity use from varsity programs, practice teams, and club sports, are
              well served by regular independent testing. Lake Travis ISD and Eanes ISD, serving some of the
              higher-income communities in the Austin area, have built state-of-the-art athletic facilities
              that represent significant community investment and carry corresponding responsibility to maintain
              documented safety records.
            </p>
            <p>
              Austin ISD's urban campuses present a different testing context: fields in the urban core often
              serve as multi-purpose community spaces with higher-than-average foot traffic. Del Valle ISD and
              Manor ISD serve communities east of Austin with growing student populations and newer installations
              that benefit from early-lifecycle baseline testing before heavy use patterns are established.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Austin Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Also serving UT Austin, Texas State University (San Marcos), and municipal parks facilities.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> to confirm your location.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Austin</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href}>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-sm transition-all group">
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule an Austin Area Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Whether you have a new installation that needs a baseline test or a field approaching mid-lifecycle,
            Field Health Systems provides the independent data your program needs.
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
