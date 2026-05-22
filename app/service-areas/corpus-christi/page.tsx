'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Corpus Christi ISD',
  'Calallen ISD',
  'Carroll ISD',
  'Tuloso-Midway ISD',
  'West Oso ISD',
  'Flour Bluff ISD',
  'Robstown ISD',
  'Gregory-Portland ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function CorpusChristiPage() {
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
            Artificial Turf Testing in Corpus Christi
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The Coastal Bend's salt air, intense heat, and high year-round humidity create uniquely demanding
            conditions for synthetic turf fields. Field Health Systems provides independent testing for
            Corpus Christi area school districts and athletic facilities throughout the region.
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
            Coastal Conditions Accelerate Turf Field Degradation
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Corpus Christi sits on Corpus Christi Bay along the Gulf of Mexico, and every synthetic turf
              field in the Coastal Bend exists in an environment that synthetic turf was not originally designed
              to handle. Salt-laden air from the Gulf accelerates the oxidation of metal components in field
              anchor systems and affects the chemical stability of some infill materials over time. Combined
              with the intense solar radiation and heat of South Texas summers, the Coastal Bend is among the
              most demanding environments for synthetic turf longevity in the state.
            </p>
            <p>
              Corpus Christi ISD serves the city's largest student population and maintains turf fields across
              its high school campuses including Ray, Carroll, Miller, and King. Carroll ISD, Calallen ISD,
              and Gregory-Portland ISD serve communities outside the city proper with strong athletic programs
              and significant investment in their facilities. Tuloso-Midway ISD, serving a tight-knit
              community in the northwest part of the metro, has built athletic infrastructure that reflects
              the community's commitment to its programs.
            </p>
            <p>
              Coastal fields face a specific challenge around infill drainage. High humidity keeps moisture
              in the infill profile, while the fine sand and salt particulates carried by sea breezes gradually
              infiltrate the infill layer, changing its density and compaction characteristics. This process
              affects GMAX scores in ways that are not visible from the surface -- a field that looks and feels
              fine during a walkthrough may show elevated hardness values when properly instrumented tested.
            </p>
            <p>
              For Coastal Bend athletic directors, the case for regular independent testing is not abstract.
              Coastal weather events, including the aftermath of tropical systems that move through the Gulf,
              can redistribute infill material and compromise field drainage in ways that create localized
              areas of elevated impact risk. Post-storm assessments help identify these areas before athletes
              return to the field.
            </p>
          </div>
        </div>
      </section>

      {/* Climate Warning */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-2">Coastal Environment and Field Safety</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Surface temperatures on Corpus Christi-area turf fields regularly exceed 155 degrees Fahrenheit
              in July and August. These temperatures stress synthetic fibers and can cause differential infill
              compaction between shaded and sun-exposed areas of the same field. Independent GMAX testing
              at multiple locations across the field surface captures this variation in a way that single-point
              inspections cannot.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Coastal Bend Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for availability at other Coastal Bend locations.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Corpus Christi</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Corpus Christi Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Coastal Bend fields face conditions that demand more frequent attention. Get objective data on
            your field's current safety status from an independent third-party testing specialist.
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
