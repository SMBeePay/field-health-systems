'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'McAllen ISD',
  'Edinburg CISD',
  'Mission CISD',
  'Hidalgo ISD',
  'La Joya ISD',
  'Pharr-San Juan-Alamo ISD',
  'Weslaco ISD',
  'Harlingen CISD',
  'San Benito CISD',
  'Brownsville ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function RioGrandeValleyPage() {
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
            Artificial Turf Testing in the Rio Grande Valley
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            South Texas extreme heat pushes synthetic turf surface temperatures to levels that stress
            both fibers and athletes. The Valley is growing rapidly, investing heavily in school athletics,
            and needs independent field testing to match that investment with verified safety data.
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
            The Hottest Synthetic Turf Conditions in Texas
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The Rio Grande Valley -- the four-county region of Hidalgo, Cameron, Starr, and Willacy
              along the Texas-Mexico border -- is the southernmost part of the continental United States.
              Summers in the Valley are extreme by any measure: ambient temperatures above 100 degrees
              are common from May through September, and synthetic turf surface temperatures on peak
              summer days regularly exceed 180 degrees Fahrenheit. This is not an exaggeration -- it is
              a documented, measurable phenomenon that affects every synthetic turf field in the region
              from the first hot week of spring through October.
            </p>
            <p>
              At 180 degrees, the infill material in a synthetic turf field is under significant thermal
              stress. Crumb rubber changes its elastic properties at high temperatures. Alternative
              infills -- cork, coconut coir, silica sand, and various synthetic options -- all respond
              differently to sustained heat exposure. Fiber polymers degrade faster at higher temperatures.
              The result, measured in GMAX values, is that Valley fields accumulate wear faster than
              fields in cooler climates, and a 10-year design life projection from a manufacturer does
              not fully account for the specific conditions in McAllen or Edinburg.
            </p>
            <p>
              La Joya ISD and Pharr-San Juan-Alamo ISD are among the largest districts in the Valley
              by enrollment, each serving tens of thousands of students with athletic programs that
              include football, soccer, track, and baseball. McAllen ISD and Edinburg CISD have built
              facilities that reflect the Valley's investment in competitive athletics. The Valley is
              producing college and professional athletes in meaningful numbers, and the athletic
              infrastructure is growing to match that talent pipeline.
            </p>
            <p>
              Harlingen CISD and Brownsville ISD serve the Cameron County part of the Valley, closer
              to the Gulf Coast, where summer heat combines with Gulf humidity to create conditions
              that are different from the drier heat of the Hidalgo County metro. Both climate profiles
              create field degradation, but in different ways -- a reality that makes single-standard
              maintenance schedules less reliable than direct testing data.
            </p>
          </div>
        </div>
      </section>

      {/* Heat Warning */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-900 mb-2">RGV Turf Surface Temperatures: What the Data Shows</h3>
            <p className="text-red-800 text-sm leading-relaxed">
              Research studies on synthetic turf surface temperatures in South Texas have documented
              readings above 180 degrees Fahrenheit in direct sun during peak summer hours. At these
              temperatures, infill properties change in ways that are not recoverable when the field
              cools -- the compaction is permanent. Valley fields that have been in service more than
              four years without independent testing may already be showing elevated GMAX values.
              Testing now establishes where the field stands before additional seasons of heat exposure
              compound the issue.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Rio Grande Valley Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Serving all Valley districts from McAllen to Brownsville.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for scheduling.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in the Rio Grande Valley</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Rio Grande Valley Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Valley fields face the most demanding heat conditions in the state. Independent testing
            gives you objective data on exactly where your field stands before another season begins.
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
