'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Midland ISD',
  'Ector County ISD',
  'Greenwood ISD',
  'Midland Christian School',
  'Legacy High School',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function MidlandOdessaPage() {
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
            Artificial Turf Testing in Midland and Odessa
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The Permian Basin is Friday Night Lights country -- the region that inspired the book, the
            film, and the television show. Oil money funds exceptional athletic facilities, and the
            extreme West Texas heat and dust create unique infill challenges that make independent
            testing essential.
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
            Friday Night Lights Country Deserves Verified Field Safety
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Odessa Permian High School and Midland Lee High School represent one of the most famous
              athletic rivalries in Texas high school sports. The Friday Night Lights story -- Buzz
              Bissinger's book about the 1988 Permian Panthers season -- put this region on the national
              map, and the communities here have continued to invest in their athletic programs at a
              level that reflects how seriously football is taken in the Permian Basin.
            </p>
            <p>
              Both Midland ISD and Ector County ISD, which operates the Odessa campuses, have maintained
              modern synthetic turf fields at their stadiums and practice facilities. Oil price cycles
              affect school district budgets in the Permian Basin -- boom years bring facility upgrades,
              while lean years require making existing investments last longer. Independent testing data
              helps districts in this position make informed decisions: knowing a field has significant
              remaining service life supports a decision to defer replacement, while data showing
              elevated GMAX readings supports the case for earlier action.
            </p>
            <p>
              The Permian Basin climate is semi-arid, with hot summers, low humidity, and significant
              wind. Dust storms, known locally as sand storms, are a regular occurrence from late winter
              through spring. Fine dust infiltrates synthetic turf infill in ways that increase infill
              density and stiffness over time. Combined with very high summer surface temperatures --
              the Midland-Odessa area regularly records surface temperatures above 165 degrees Fahrenheit
              on peak summer days -- the infill compaction process is accelerated relative to manufacturer
              specifications from more temperate test environments.
            </p>
            <p>
              Greenwood ISD, serving communities west of Midland in Ector County, has a strong athletic
              program and facilities that reflect its community's commitment. The private school market
              in Midland, including Midland Christian School, also maintains synthetic turf athletic
              facilities that carry the same field safety obligations as public school installations.
            </p>
          </div>
        </div>
      </section>

      {/* Dust and Heat Note */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-900 mb-2">Permian Basin Dust and Infill Contamination</h3>
            <p className="text-orange-800 text-sm leading-relaxed">
              Permian Basin dust storms deposit fine particles into turf infill, increasing compaction
              over time in a way that is not visible from the surface. Fields that appear clean and
              well-maintained can show elevated GMAX values because of subsurface infill contamination.
              Infill depth testing combined with GMAX testing at multiple field locations gives the
              most complete picture of a field affected by dust infiltration.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Midland-Odessa Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Serving Midland County, Ector County, and surrounding Permian Basin communities.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> to schedule.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Midland and Odessa</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Permian Basin Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Permian Basin communities have built legendary athletic programs. Independent field testing
            is how you make sure the fields match the investment those communities have made.
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
