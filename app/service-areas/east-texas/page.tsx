'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Tyler ISD',
  'Longview ISD',
  'Kilgore ISD',
  'Pine Tree ISD',
  'Whitehouse ISD',
  'Chapel Hill ISD',
  'Hallsville ISD',
  'Marshall ISD',
  'Nacogdoches ISD',
  'Lufkin ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function EastTexasPage() {
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
            Artificial Turf Testing in Tyler and East Texas
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            East Texas oil country has strong school district funding and deep investment in athletic
            facilities. The region's humidity, rainfall, and pine forest environment create specific
            challenges for synthetic turf that make independent field testing especially valuable.
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
            Strong Athletic Funding and Challenging Climate Conditions
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The Piney Woods of East Texas -- the area anchored by Tyler and Longview and stretching
              from Marshall in the north to Nacogdoches and Lufkin in the south -- is one of the most
              distinctly different environments in the state. Where West Texas is dry and windy, East Texas
              is humid, heavily forested, and sees significantly more annual rainfall than any other region
              of Texas. Annual rainfall in Tyler averages around 46 inches, compared to 14 inches in El Paso
              and 37 inches in Dallas.
            </p>
            <p>
              That moisture matters for synthetic turf. Organic debris from pine trees and deciduous
              vegetation accumulates in infill material, creating conditions that promote microbial growth
              within the infill layer. High humidity keeps the infill material damp for extended periods
              between uses, which affects its performance characteristics and can create hygiene concerns
              at facilities without proper drainage systems. Drainage testing as part of a full field
              condition assessment is especially important for East Texas facilities.
            </p>
            <p>
              Tyler ISD serves the largest student population in the region with several high school campuses
              including Tyler High and Robert E. Lee High, both with significant athletic programs and turf
              field installations. Whitehouse ISD and Pine Tree ISD serve growing suburban communities
              outside Tyler with newer facilities. Longview ISD and Kilgore ISD represent the Gregg County
              part of the region, where oil and gas wealth has historically supported strong athletic programs.
              Hallsville ISD, Chapel Hill ISD, and Marshall ISD round out the Longview corridor with their
              own investment in synthetic turf.
            </p>
            <p>
              The deep football culture of East Texas is well documented. These communities take their
              athletic programs seriously, and the facilities reflect that commitment. Regular independent
              testing gives East Texas athletic directors data that matches the level of investment their
              communities have made.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>East Texas Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Serving Tyler, Longview, Nacogdoches, Lufkin, and surrounding East Texas communities.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for your district.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in East Texas</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule an East Texas Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            East Texas communities invest heavily in their athletic programs. Independent field testing
            is how you protect that investment and document that your fields are safe for athletes.
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
