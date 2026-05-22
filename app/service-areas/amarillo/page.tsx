'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const DISTRICTS = [
  'Amarillo ISD',
  'Canyon ISD',
  'Randall ISD',
  'Tascosa ISD',
  'River Road ISD',
  'Bushland ISD',
]

const SERVICES = [
  { label: 'GMAX Impact Testing', href: '/services/gmax-testing' },
  { label: 'Shear Factor Testing', href: '/services/shear-factor-testing' },
  { label: 'Infill Depth Testing', href: '/services/infill-depth-testing' },
  { label: 'Field Condition Assessment', href: '/services/field-condition-assessment' },
  { label: 'Field Health Platform', href: '/services/turf-testing' },
]

export default function AmarilloPage() {
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
            Artificial Turf Testing in Amarillo
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The Texas Panhandle's extreme wind, wide temperature swings, and geographic isolation make regular
            independent field testing more critical than in most regions. Field Health Systems serves
            Amarillo-area school districts and athletic facilities throughout the Panhandle.
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
            Panhandle Conditions Create Unique Challenges for Synthetic Turf
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Amarillo is the largest city in the Texas Panhandle, sitting at over 3,600 feet of elevation
              on the high plains. The region experiences some of the most extreme weather variability in Texas:
              summer days above 100 degrees followed by nights in the 60s, hard freezes from November through
              March, and some of the strongest sustained winds in any populated area of the United States.
              Amarillo regularly ranks among the windiest cities in the country, and that wind is not just a
              nuisance -- it is a direct force on infill material in synthetic turf fields.
            </p>
            <p>
              Infill displacement from wind is a documented problem on Panhandle fields. Without windscreen
              infrastructure -- which many facilities lack -- crumb rubber and alternative infill materials
              migrate across the field surface and accumulate against fence lines and benches. This creates
              areas of field surface with insufficient infill depth, which directly affects cushioning
              performance and GMAX values. An infill depth test across multiple points on the field will
              often reveal significant variation that a visual inspection cannot detect.
            </p>
            <p>
              Amarillo ISD operates several high school campuses including Tascosa, Palo Duro, Caprock,
              and Amarillo High. Canyon ISD and Randall ISD serve the growing communities south of Amarillo
              in Canyon and the surrounding area, with modern athletic facilities that see heavy use across
              football, soccer, and other programs. These Panhandle fields are some distance from any urban
              center with field testing services, which means they often go longer between professional
              assessments than districts in the major metros -- not because the need is less, but because
              the access has historically been harder.
            </p>
            <p>
              Freeze-thaw cycles in the Panhandle cause repeated expansion and contraction of infill material
              through winter, a process that changes infill density in ways that accumulate over multiple
              seasons. Combined with summer UV degradation of synthetic fibers at high elevation, Panhandle
              fields may age differently than manufacturer data from laboratory settings would suggest.
            </p>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#12324A' }}>Amarillo Area Districts Served</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DISTRICTS.map((district) => (
              <div key={district} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{district}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Field Health Systems travels to Amarillo and throughout the Texas Panhandle.{' '}
            <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link> to schedule a visit.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#12324A' }}>Testing Services in Amarillo</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Schedule an Amarillo Field Assessment</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Don't let remote location be the reason your field goes untested. Field Health Systems travels
            to the Panhandle and provides the same independent assessment that major metro districts rely on.
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
