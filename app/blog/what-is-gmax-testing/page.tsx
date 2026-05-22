import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'

export default function WhatIsGmaxTestingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav activePath="/blog" />

      {/* Hero */}
      <div className="bg-[#12324A] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex gap-3 mb-4">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-3 py-1 rounded-full text-xs font-medium">GMAX Testing</span>
            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">Explainer</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            What is GMAX Testing? A Plain-English Explanation for Athletic Directors
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            GMAX is the most important safety measurement for any synthetic turf field. Here is what it actually measures, what the numbers mean, and why testing matters.
          </p>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> May 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 5 min read</span>
            <span>By Andrew Neal, Field Health Systems</span>
          </div>
        </div>
      </div>

      {/* Key stats bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-6 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { stat: '200G', label: 'ASTM maximum (pass/fail)' },
            { stat: '165G', label: 'STC recommended limit' },
            { stat: 'Annual', label: 'minimum testing frequency' },
          ].map(({ stat, label }) => (
            <div key={stat}>
              <div className="text-2xl font-bold text-[#12324A]">{stat}</div>
              <div className="text-gray-500 text-xs mt-1">{stat === 'Annual' ? label : label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          If you manage athletic facilities that include synthetic turf fields, you have probably heard the term GMAX. Maybe a maintenance vendor mentioned it, or a coach asked whether the field has been tested. This article explains exactly what GMAX is, why it matters for your athletes, and what the numbers actually mean in plain language.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">What GMAX Measures</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          GMAX stands for maximum G-force. In athletic field testing, it measures how hard the surface pushes back when something impacts it. Specifically, it quantifies the peak deceleration force experienced by a standardized test head form when dropped onto the surface from a fixed height.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Think of it this way: when an athlete falls and their head contacts the ground, the surface either absorbs some of that impact force or transmits it directly back into the head. A softer surface with more cushioning absorbs more energy and returns a lower GMAX reading. A harder surface returns a higher reading. The GMAX number tells you how much force the surface is transmitting back on impact.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          This is not a theoretical concern. Head-to-surface contact occurs regularly in football, soccer, lacrosse, and field hockey. The hardness of the surface is a direct variable in the severity of that contact.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Standards: What the Numbers Mean</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          GMAX testing for synthetic turf follows ASTM F1936, the governing standard published by ASTM International. The standard defines the test procedure, equipment specifications, and pass/fail threshold.
        </p>

        <div className="space-y-4 mb-8">
          <div className="border-l-4 border-green-500 pl-5 py-1">
            <p className="font-semibold text-gray-900">Below 165G: Well within safe range</p>
            <p className="text-gray-600 text-sm mt-1">The Synthetic Turf Council recommends fields stay below 165G for fields with regular youth and high school use. A field in this range has good energy absorption and is performing as designed.</p>
          </div>
          <div className="border-l-4 border-yellow-400 pl-5 py-1">
            <p className="font-semibold text-gray-900">165G to 199G: Monitor closely</p>
            <p className="text-gray-600 text-sm mt-1">Fields in this range pass the ASTM standard but are approaching the threshold recommended by the Synthetic Turf Council. Increased monitoring and maintenance attention is warranted, particularly infill assessment and grooming.</p>
          </div>
          <div className="border-l-4 border-red-500 pl-5 py-1">
            <p className="font-semibold text-gray-900">200G or above: Failing</p>
            <p className="text-gray-600 text-sm mt-1">A GMAX score at or above 200G means the field fails the ASTM F1936 standard. At this level, the surface presents a documented elevated risk of head injury. Continued use for contact sports without remediation exposes the organization to both athlete safety risk and legal liability.</p>
          </div>
          <div className="border-l-4 border-red-900 pl-5 py-1">
            <p className="font-semibold text-gray-900">Above 220G: Serious concern</p>
            <p className="text-gray-600 text-sm mt-1">Fields testing in this range have significantly compromised impact absorption. At extreme values, the surface offers protection comparable to concrete. Fields at this level should be taken out of athletic use pending remediation or replacement.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why GMAX Scores Change Over Time</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          A new synthetic turf field typically tests in the 90-130G range. That same field, if not properly maintained, may test above 200G within five to seven years. The change is gradual and happens through two main mechanisms.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The first is infill compaction and loss. The infill, whether crumb rubber, sand, or organic material, is the primary cushioning layer. Under repeated athletic use, infill particles compress and compact together. The compacted infill transmits impact force more efficiently than loose infill, which means higher GMAX scores. Simultaneously, infill is lost from the surface over time through displacement by cleats, grooming, and weather. Less infill means less cushioning, which means harder impact readings.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          The second is fiber degradation. The synthetic grass fibers contribute to energy absorption when they are upright and resilient. As fibers break down from UV exposure and mechanical wear, they lose their cushioning contribution. A field with worn, matted fibers and compacted infill is a field that has lost most of what made it safe when it was new.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">How GMAX Testing is Conducted</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          GMAX testing requires a calibrated impact device, a standardized falling mass with an accelerometer, and a technician trained in ASTM F1936 protocol. The device is positioned at multiple points across the field surface. At each location, the device is dropped from a standard height and the accelerometer records the peak deceleration, which is the GMAX reading.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The number of test points matters significantly. Testing only the center of the field tells you nothing about the goal mouth areas, the corners, the hash marks, or the sideline zones near player benches. These high-traffic areas often test at values five to fifteen points higher than midfield on the same day. A thorough assessment covers the full field with test points distributed across all use zones.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Environmental conditions also affect readings. Field temperature influences both infill behavior and fiber properties. Tests conducted in extreme heat or cold may produce different readings than tests at moderate temperatures. A professional technician records ambient and surface temperature alongside GMAX values and accounts for these variables in the final report.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Third-Party Testing Matters</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Many turf installers conduct GMAX testing at installation and may offer ongoing testing as part of a service package. There is an inherent tension when the organization that installed and maintains the field also certifies whether it is safe. Their financial interest in the field's continued use creates pressure, even unintentionally, toward findings that minimize problems.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Third-party testing, conducted by an independent company with no stake in your maintenance contracts or field replacement decisions, produces a result that stands on its own. For districts where field safety is subject to oversight from school boards, risk management departments, or insurance providers, independent documentation from a neutral party carries significantly more weight than self-certification from the installer.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Often Should Fields Be Tested?</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The Synthetic Turf Council recommends annual GMAX testing for all synthetic turf fields in athletic use. Annual testing establishes a trend over time, which is more valuable than any single data point. A field that tested at 145G last year and tests at 172G this year is telling you something important about the rate of degradation, even though both readings pass the standard.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Fields with heavy use, fields approaching mid-life, and fields where visible wear is present in high-traffic zones warrant testing more frequently. Fields that have had infill replenishment should be retested after the work is complete to confirm the remediation brought scores back into the desired range.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">GMAX Testing and Liability</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          If a student-athlete is seriously injured on your field and a question arises about field safety, the first question any investigation will ask is: when was this field last tested, and what were the results? A district with current independent test documentation showing the field was within spec has a very different legal position than a district that cannot answer that question.
        </p>

        <p className="text-gray-700 mb-10 leading-relaxed">
          Annual GMAX testing is not just a maintenance best practice. It is a risk management tool. The cost of testing is negligible compared to the cost of a serious injury claim or an early field replacement that could have been avoided with earlier remediation.
        </p>

        {/* Author */}
        <div className="border-t border-gray-200 pt-8 mb-10 flex items-center gap-4">
          <img src="/logo-icon.svg" alt="Field Health Systems" className="w-12 h-12" />
          <div>
            <p className="font-semibold text-gray-900">Andrew Neal</p>
            <p className="text-gray-500 text-sm">Founder, Field Health Systems. Third-party synthetic turf testing and field health monitoring across Texas.</p>
          </div>
        </div>

      </article>

      {/* CTA */}
      <section className="bg-[#12324A] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Know Your Field's GMAX Score?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Independent GMAX testing with a full written report and multi-point field coverage. Serving school districts and facilities across Texas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule-assessment">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2">
                Schedule an Assessment
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/services/gmax-testing">
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Learn More About GMAX Testing
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
