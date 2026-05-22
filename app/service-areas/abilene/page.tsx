'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Abilene ISD',
  'Wylie ISD',
  'Jim Ned CISD',
  'Merkel ISD',
  'Clyde CISD',
  'Sweetwater ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function AbilenePage() {
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
            Artificial Turf Testing in Abilene
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Abilene is home to three universities and a growing investment in both K-12 and collegiate
            athletic facilities. Field Health Systems provides independent GMAX, shear, and infill depth
            testing for Abilene-area school districts and university programs throughout the Big Country.
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
            Three Universities and Strong K-12 Investment in a Growing City
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Abilene is unusual among Texas cities of its size in hosting three private universities
              within its boundaries: Abilene Christian University (ACU), McMurry University, and
              Hardin-Simmons University (HSU). All three operate athletic programs with outdoor facilities,
              and ACU in particular has invested in its athletic infrastructure as part of its transition
              to NCAA Division I competition. University athletic programs in the Southland Conference
              and similar mid-major conferences face the same field safety and documentation requirements
              as programs in larger conferences.
            </p>
            <p>
              Abilene ISD serves the city's public school population with athletic facilities across
              its high school campuses including Cooper High School and Abilene High School. The rivalry
              between those two programs is one of the most-watched in the West Texas region, and the
              stadiums and supporting practice facilities have been maintained with that tradition in mind.
              Wylie ISD, serving the communities east and northeast of Abilene, has grown significantly
              over the past decade and built modern athletic facilities to serve its expanding student
              population.
            </p>
            <p>
              Jim Ned CISD, serving the small communities of Tuscola and Buffalo Gap south of Abilene,
              is a strong small-school program that competes effectively at the 3A and 4A levels. Small
              and mid-size school districts across West Texas often lack the internal expertise to
              evaluate their own synthetic turf field conditions, making independent third-party testing
              especially valuable. An objective assessment from Field Health Systems gives these programs
              the same quality of information that large urban districts rely on.
            </p>
            <p>
              The Big Country climate is semi-arid and windy. Abilene sits in a transitional zone between
              the plains to the north and the Hill Country to the south, and the area sees significant
              weather variability. Summer temperatures regularly reach triple digits, while winter cold
              fronts can bring freezing conditions rapidly. This thermal range affects infill behavior
              across seasons and makes periodic testing more informative than one-time assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Abilene Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Also serving ACU, McMurry University, Hardin-Simmons University, and municipal facilities.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> for your facility.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Abilene</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule an Abilene Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Whether you're managing a K-12 athletic facility or a university program, Field Health Systems
            provides the independent data you need to make informed decisions about your fields.
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
