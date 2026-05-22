'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Frisco ISD',
  'Plano ISD',
  'Allen ISD',
  'McKinney ISD',
  'Prosper ISD',
  'Denton ISD',
  'Lewisville ISD',
  'Keller ISD',
  'Southlake Carroll ISD',
  'Arlington ISD',
  'Grand Prairie ISD',
  'Garland ISD',
  'Mesquite ISD',
  'Richardson ISD',
  'Carrollton-Farmers Branch ISD',
  'Forney ISD',
  'Wylie ISD',
  'Rockwall ISD',
  'Mansfield ISD',
  'Crowley ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function DallasFortWorthPage() {
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
            Artificial Turf Testing in Dallas-Fort Worth
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Field Health Systems is based in DFW and serves the full metro -- from Prosper and Frisco in the north
            to Mansfield and Crowley in the south -- providing independent GMAX, shear, and infill testing for
            school district athletic facilities across the Metroplex.
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
            The DFW Metro Has More Synthetic Turf Fields Than Almost Any Metro in the Country
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The Dallas-Fort Worth Metroplex is ground zero for Texas high school athletics. Allen ISD's Eagle
              Stadium seats over 18,000 people. Frisco ISD operates multiple high school campuses, each with
              its own turf football field and several with additional turf baseball and soccer facilities.
              McKinney ISD, Prosper ISD, and Denton ISD are adding new high school campuses at a pace that
              reflects the explosive growth of the northern suburbs -- and each new campus typically arrives
              with at least one synthetic turf installation.
            </p>
            <p>
              What many athletic directors in DFW know, but don't always act on, is that synthetic turf fields
              require independent verification of safety. District-owned fields are not self-reporting. A field
              that tested within safe GMAX limits at installation can drift out of compliance as infill compacts
              over time, especially on heavily used fields where football, soccer, marching band, and physical
              education all share the same surface. Fields at middle school campuses in districts like Richardson
              ISD, Garland ISD, and Carrollton-Farmers Branch ISD often see heavier combined use per square yard
              than the featured varsity stadium field -- but they receive less attention.
            </p>
            <p>
              Andrew Neal, founder of Field Health Systems, is based locally in DFW. That means scheduling is
              flexible, travel fees are minimal for Metroplex locations, and Andrew can respond quickly when a
              field raises concerns before a season starts or after a significant weather event.
            </p>
            <p>
              North Texas summers push surface temperatures on synthetic turf past 160 degrees Fahrenheit on
              peak July and August days. That heat accelerates the breakdown of crumb rubber and alternative
              infill materials, changing the cushioning properties of the field faster than the calendar age
              alone would suggest. Annual or biennial testing gives DFW athletic programs the documented
              evidence they need to make data-driven decisions about field maintenance and replacement timing.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>DFW School Districts Served</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Field Health Systems serves all school districts and municipalities throughout the DFW Metroplex,
            including independent school districts, charter campuses with athletic facilities, and city parks departments.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Don't see your district? All DFW area school districts and facilities are within our service area.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us to confirm availability.</Link>
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Testing Services in DFW</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Every test is performed on-site by Andrew Neal. Results are documented in the Field Health Systems
            platform with permanent records, trend tracking, and shareable reports for district administration.
          </p>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a DFW Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Local scheduling, minimal travel time, and fast turnaround on reports. Contact Field Health Systems
            to get your DFW facility on the calendar.
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
