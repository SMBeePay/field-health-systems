'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, Phone, ArrowRight } from 'lucide-react'

const SERVICE_AREAS = [
  { label: 'Dallas-Fort Worth', href: '/service-areas/dallas-fort-worth', note: 'Largest metro, Andrew\'s home base' },
  { label: 'Houston', href: '/service-areas/houston', note: 'Harris County + surrounding districts' },
  { label: 'San Antonio', href: '/service-areas/san-antonio', note: 'Bexar County + Hill Country fringe' },
  { label: 'Austin', href: '/service-areas/austin', note: 'Fastest-growing metro in Texas' },
  { label: 'Corpus Christi', href: '/service-areas/corpus-christi', note: 'Coastal Bend region' },
  { label: 'Lubbock', href: '/service-areas/lubbock', note: 'South Plains + Texas Tech' },
  { label: 'Amarillo', href: '/service-areas/amarillo', note: 'Texas Panhandle' },
  { label: 'El Paso', href: '/service-areas/el-paso', note: 'Far West Texas, high desert' },
  { label: 'Tyler / East Texas', href: '/service-areas/east-texas', note: 'Piney Woods, oil country' },
  { label: 'Waco', href: '/service-areas/waco', note: 'Heart of Texas, Baylor country' },
  { label: 'Killeen / Temple', href: '/service-areas/killeen-temple', note: 'Fort Cavazos corridor' },
  { label: 'McAllen / Rio Grande Valley', href: '/service-areas/rio-grande-valley', note: 'Extreme South Texas heat' },
  { label: 'Beaumont / Southeast Texas', href: '/service-areas/beaumont-southeast-texas', note: 'Gulf Coast, petrochemical region' },
  { label: 'Midland / Odessa', href: '/service-areas/midland-odessa', note: 'Permian Basin, Friday Night Lights' },
  { label: 'Abilene', href: '/service-areas/abilene', note: 'Big Country, three universities' },
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function TexasPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />

      {/* Hero */}
      <section style={{ background: '#12324A' }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium uppercase tracking-wide text-sm">Statewide Coverage</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Artificial Turf Field Testing Across Texas
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Field Health Systems provides independent GMAX testing, shear factor testing, infill depth analysis,
            and full field condition assessments to school districts, municipalities, and universities throughout the state.
          </p>
          <Link href="/schedule-assessment">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Schedule Assessment
            </button>
          </Link>
        </div>
      </section>

      {/* Why Texas */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#12324A' }}>
            Why Texas Has More at Stake Than Any Other State
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Texas has more high school football programs than any other state -- over 1,400 UIL member schools field
              football teams, and hundreds of those programs have invested in synthetic turf. When you add middle school
              fields, baseball and softball complexes, soccer and lacrosse facilities, and municipal recreation centers,
              the total number of synthetic turf installations across Texas runs well into the thousands. No other state
              concentrates this much synthetic turf on this many campuses.
            </p>
            <p>
              The culture of Texas athletics drives that investment. Communities fund stadium renovations and field
              upgrades at a level that is rare elsewhere in the country. Frisco ISD built a 12,000-seat high school
              stadium. Allen ISD's Eagle Stadium seats over 18,000. The level of commitment to athletic facilities
              in Texas school districts is unmatched -- and with that investment comes significant responsibility to
              maintain and verify those fields are safe.
            </p>
            <p>
              Synthetic turf does not last forever. Most installations carry a 10-year design life, but field hardness
              as measured by GMAX and HIC scores begins to drift well before that. Infill compacts, fibers wear, and
              fields that looked fine at year three can present elevated injury risk by year six without anyone noticing
              unless they are tested. Independent, third-party testing is the only way to know.
            </p>
            <p>
              Field Health Systems founder Andrew Neal is based in the Dallas-Fort Worth area, which means the entire
              state of Texas is accessible for on-site testing visits. From El Paso to Beaumont, from Amarillo to the
              Rio Grande Valley, Andrew travels to where the fields are. No region of Texas is too remote to schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>
            Texas Service Areas
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Select your region to learn about local districts served, climate conditions, and why regular field
            testing matters in your area.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {SERVICE_AREAS.map((area) => (
              <Link key={area.href} href={area.href}>
                <div className="border border-gray-200 rounded-lg p-5 hover:border-green-500 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                        {area.label}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{area.note}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 mt-1 flex-shrink-0 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Testing Services Available Statewide</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Every service is performed on-site by Andrew Neal, a certified independent testing specialist.
            Results are delivered through the Field Health Systems platform with permanent recordkeeping.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
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
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#12324A' }} className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Schedule a Field Assessment?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Contact Field Health Systems to discuss your facility, get a quote, and schedule an on-site visit.
            Serving all Texas school districts, municipalities, and universities.
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
