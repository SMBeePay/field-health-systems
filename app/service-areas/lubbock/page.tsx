'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Lubbock ISD',
  'Frenship ISD',
  'Lubbock-Cooper ISD',
  'Slaton ISD',
  'Idalou ISD',
  'Shallowater ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function LubbockPage() {
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
            Artificial Turf Testing in Lubbock
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            West Texas temperature extremes and persistent South Plains wind create turf field conditions that
            demand regular independent testing. Field Health Systems serves Lubbock-area school districts and
            the Texas Tech University campus with GMAX, shear, and infill depth assessments.
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
            South Plains Climate Makes Regular GMAX Testing Essential
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Lubbock sits at 3,200 feet of elevation on the Llano Estacado, and the climate there is unlike
              any other major Texas city. Summer temperatures regularly exceed 100 degrees, and the region
              experiences temperature swings of 40 degrees or more between seasons -- sometimes within the
              same week during spring and fall. These thermal cycles affect synthetic turf infill in measurable
              ways. Crumb rubber and synthetic infill materials expand and contract with temperature, and
              repeated cycling over years of service changes the compaction profile of the infill layer.
            </p>
            <p>
              The South Plains wind is a constant factor. Lubbock ranks among the windiest cities in the
              country, and that wind does not just affect the playing experience -- it gradually displaces
              infill material, particularly on fields without windscreen protection. Fields that show lower
              infill depth on the windward side and higher accumulation on the leeward side are not unusual
              in Lubbock, and those infill depth variations directly affect GMAX performance across the field.
              Testing at multiple locations reveals these patterns; a single-point inspection does not.
            </p>
            <p>
              Frenship ISD serves a large and growing district on the western and southern edges of Lubbock
              with strong athletic programs at its high school campuses. Lubbock-Cooper ISD has built modern
              athletic facilities that reflect its community's investment in football and other sports.
              Lubbock ISD serves the urban core and operates older installations alongside newer ones -- a
              mix that benefits from consistent data tracking to understand which fields are aging normally
              and which may need attention sooner.
            </p>
            <p>
              Texas Tech University operates major synthetic turf facilities including Jones AT&T Stadium
              and practice fields for the Red Raiders football program. University athletic departments are
              subject to conference and NCAA standards that can require documented testing records.
              Independent third-party testing provides the documentation those programs need.
            </p>
          </div>
        </div>
      </section>

      {/* Climate Note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-900 mb-2">West Texas Temperature Extremes and Infill Behavior</h3>
            <p className="text-orange-800 text-sm leading-relaxed">
              Lubbock fields can experience sub-freezing temperatures in winter and surface temperatures
              exceeding 160 degrees Fahrenheit in summer. Cold weather makes infill more rigid, increasing
              GMAX values temporarily -- but repeated freeze cycles can cause permanent changes in infill
              density over time. Summer testing captures the high-temperature performance profile when most
              athletic activity occurs. Both data points matter for a complete picture of field safety.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Lubbock Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Also serving Texas Tech University facilities and Lubbock parks and recreation department.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for your facility.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Lubbock</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Lubbock Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            West Texas climate conditions make independent testing more important, not less. Contact Field
            Health Systems to get your Lubbock-area fields assessed by an independent specialist.
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
