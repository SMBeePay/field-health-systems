'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Waco ISD',
  'Midway ISD',
  'La Vega ISD',
  'Connally ISD',
  'Robinson ISD',
  'Lorena ISD',
  'Hillsboro ISD',
  'Mexia ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function WacoPage() {
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
            Artificial Turf Testing in Waco
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Waco sits at the center of Texas and is home to Baylor University, growing suburban districts,
            and a strong Central Texas football tradition. Field Health Systems provides independent
            GMAX, shear, and infill testing for Waco-area school districts and university facilities.
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
            Central Texas Hub with Growing Investment in Athletic Facilities
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Waco's location on I-35 at the geographic heart of Texas makes it a natural hub for Central
              Texas athletics. The city and surrounding McLennan County are home to a range of school
              districts with strong programs and varying facility ages -- from Waco ISD's urban campuses
              to Midway ISD's newer suburban facilities north of the city.
            </p>
            <p>
              Midway ISD, serving the communities of Hewitt and Woodway on Waco's north side, has built
              modern athletic facilities at its high school campuses including Midway High and Midway Middle,
              and has seen significant enrollment growth as the Waco suburbs have expanded. Robinson ISD,
              serving the community south of Waco, has similarly invested in its athletic program with
              synthetic turf installations that serve multiple sports.
            </p>
            <p>
              Waco ISD's campuses, including University High, Waco High, and Richfield, serve the urban
              core of the city with programs that have faced funding pressures but maintained active
              athletic traditions. La Vega ISD and Connally ISD, both serving communities in the
              northern and eastern parts of McLennan County, have programs that regularly compete at
              the state level in smaller UIL classifications.
            </p>
            <p>
              Baylor University operates McLane Stadium, one of the newer FBS-level football facilities
              in the Big 12 Conference, along with practice facilities and other synthetic turf
              installations. University-level facilities face additional scrutiny around field safety
              documentation as NCAA and conference standards continue to evolve. Independent testing
              by a third party provides the documentation that differs from manufacturer or in-house
              inspections.
            </p>
            <p>
              Central Texas summer heat is significant, with Waco typically recording more 100-degree
              days per year than any of the state's major metros. That heat exposure contributes to
              infill compaction and fiber degradation on area fields through the extended summer period
              when many fields remain in active use for summer conditioning programs.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Waco Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Also serving Baylor University and municipal athletic facilities in McLennan County.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for availability.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Waco</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Waco Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Field Health Systems serves the Waco metro and surrounding Central Texas communities.
            Get independent field data that supports both athlete safety and smart facility management.
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
