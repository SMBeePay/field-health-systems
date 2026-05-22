'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { CheckCircle, AlertTriangle, BarChart2, ClipboardList, ArrowRight, Shield } from 'lucide-react'

export default function GmaxTestingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav activePath="/services/gmax-testing" />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1567459169668-d0a3f5155e8a?w=1920&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-[#12324A]/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm inline-block mb-6">
              ASTM F1936 Certified Testing
            </span>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              GMAX Testing for<br />
              <span className="text-green-400">Artificial Turf Fields</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              GMAX is the single most important safety metric on an artificial turf field. It measures how hard the surface hits back when an athlete falls. Fields that fail this test represent a documented head injury risk -- and a legal liability for the organizations that operate them.
            </p>
            <Link
              href="/schedule-assessment"
              className="inline-flex items-center space-x-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-green-600 transition-colors"
            >
              <span>Schedule a GMAX Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-[#12324A] py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { stat: '200G', label: 'ASTM F1936 pass/fail limit' },
              { stat: '165G', label: 'STC recommended threshold' },
              { stat: 'Annual', label: 'minimum testing frequency' },
            ].map(({ stat, label }) => (
              <div key={stat} className="border border-white/10 rounded-xl py-6 px-4">
                <div className="text-3xl font-bold text-green-400 mb-1">{stat}</div>
                <div className="text-gray-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What GMAX Measures */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What GMAX Actually Measures</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            GMAX -- short for maximum G-force -- measures shock attenuation: the ability of a surface to absorb and reduce the impact force generated when an athlete's head or body strikes the turf. The test uses a standardized drop weight called a Clegg hammer, which is dropped from a fixed height onto the playing surface and records the peak deceleration in G's.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            A G-force reading represents how many times Earth's gravitational acceleration the impact generates. A reading of 100G means the impacting object decelerates at 100 times the force of gravity. The higher the number, the harder the surface, and the more force is transmitted to whatever -- or whoever -- hits it.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            The governing standard is ASTM F1936, which defines the test procedure and sets the maximum acceptable threshold. Under ASTM F1936, a surface that produces a GMAX reading above 200G fails the standard. The Synthetic Turf Council (STC) goes further, recommending that fields operate at or below 165G to maintain a meaningful safety margin and allow for normal degradation between testing cycles.
          </p>
        </div>
      </section>

      {/* What the Numbers Mean */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What the Numbers Tell You</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            GMAX numbers are not arbitrary. They tell a specific story about the risk profile of a field, and small differences in the reading have real-world consequences.
          </p>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-700 rounded-lg px-3 py-1 font-bold text-lg flex-shrink-0">140G</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Well Within the Safe Zone</h3>
                  <p className="text-gray-600">A field testing at 140G is performing at a level consistent with a well-maintained natural grass surface. There is substantial headroom before either the STC threshold or the ASTM limit. This is the target range for a well-managed field in its first three to five years.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-yellow-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 font-bold text-lg flex-shrink-0">180G</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">In the Warning Zone</h3>
                  <p className="text-gray-600">A reading of 180G is still technically below the ASTM limit, but it is 15G above the STC recommended threshold. This field is harder than it should be, and if degradation continues at a normal rate, it will breach 200G before the next annual test. This is a maintenance trigger: the field needs infill replenishment or grooming before conditions worsen.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-700 rounded-lg px-3 py-1 font-bold text-lg flex-shrink-0">210G+</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Failing. Take Action Now.</h3>
                  <p className="text-gray-600">A reading above 200G represents a documented failure under ASTM F1936. At these levels, research correlates surface hardness directly with increased risk of traumatic brain injury, concussion, and -- at extreme values above 300G -- skull fracture. Operating a field in this condition creates measurable legal liability for the district, conference, or organization responsible for the facility.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How GMAX Changes Over Time */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Fields Get Harder Over Time</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            New artificial turf fields rarely fail GMAX testing. The problem develops gradually through two parallel processes that most field managers do not monitor closely enough.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Infill Compaction</h3>
              <p className="text-gray-600 leading-relaxed">
                Infill -- the crumb rubber, sand, or organic material between the fibers -- is what gives the surface its cushioning properties. Under repeated foot traffic, particularly in high-use zones like goal mouths and hash marks, infill particles compress and lock together, reducing their ability to absorb and distribute impact force. A compacted infill layer transmits more force to the backing and subbase, driving GMAX up.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Fiber Breakdown</h3>
              <p className="text-gray-600 leading-relaxed">
                The synthetic fiber blades themselves degrade over time. UV exposure, abrasion from cleats, and temperature cycling cause the fibers to stiffen, flatten, and lose their natural resilience. As fiber pile height decreases and fibers lose their upright orientation, the surface cushioning they provide diminishes and the underlying infill layer bears more of the impact load.
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Together these two processes cause GMAX to rise steadily over a field's lifespan. A field that tested at 130G in year one may test at 160G by year three and 185G by year five without any maintenance intervention. Annual testing captures this trend before it becomes a crisis.
          </p>
        </div>
      </section>

      {/* What's at Stake */}
      <section className="py-20 bg-red-50 border-y border-red-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">What Is at Stake</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Surface hardness is not an abstract engineering number. It is the most direct physical variable between a field and an athlete's brain. The evidence connecting hard playing surfaces to head injury risk is extensive and well-documented.
          </p>
          <div className="space-y-4 mb-8">
            {[
              'Concussion rates on overly hard surfaces are measurably higher than on properly maintained surfaces, across multiple sports and age groups.',
              'At GMAX values substantially above the ASTM limit, the risk of severe head impact -- including skull fracture -- increases significantly.',
              'School districts, municipalities, and facility operators have faced litigation over athlete injuries sustained on fields with documented testing deficiencies.',
              'Insurance carriers are increasingly requesting testing documentation as a condition of coverage or as evidence in claims investigations.',
              'Failing to test, or testing infrequently, removes the primary defense an organization has: documented due diligence.',
            ].map((point) => (
              <div key={point} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Third-party, independent testing is critical here because it carries evidentiary weight that self-reported or installer-conducted testing does not. When a school district or facility operator can produce a documented testing history from an independent testing company, it demonstrates a proactive safety program that is far more defensible than no testing at all.
          </p>
        </div>
      </section>

      {/* How We Test */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <ClipboardList className="w-8 h-8 text-green-600 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">How Field Health Systems Conducts GMAX Testing</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            A single GMAX reading from the center of a field tells you almost nothing useful. Fields do not wear uniformly -- they wear in patterns determined by the sport, the practice and game schedule, and the positions where athletes spend the most time. Our testing protocol reflects that reality.
          </p>
          <div className="space-y-4 mb-8">
            {[
              'We test at a structured grid of points across the entire playing surface, including all high-traffic zones such as goal mouths, hash marks, sideline areas, and center field.',
              'We include baseline control points in lower-traffic areas to establish a clear comparison between worn and relatively unworn sections of the same field.',
              'We conduct multiple drops at each test point and record the highest reading, consistent with ASTM F1936 methodology.',
              'All readings are geo-referenced so they can be mapped and compared against the same locations on future visits.',
              'We do not average results across the field. A field can pass on average but have localized zones well above 200G. We report every point.',
            ].map((point) => (
              <div key={point} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Results are delivered in a written report within 24 to 48 hours of the visit. The report identifies each test point, the reading at that point, the pass/fail status against both the ASTM limit and the STC recommended threshold, and any zones that require immediate attention.
          </p>
        </div>
      </section>

      {/* Software & Trend Tracking */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart2 className="w-8 h-8 text-[#12324A] flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">Trend Tracking Over Time</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            A single test result is a snapshot. The value in GMAX testing compounds when you have multiple test cycles to compare. Our software platform stores every result from every visit and builds a longitudinal record of each field's performance.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            With trend data, you can see how fast a specific zone of a field is hardening -- whether it is increasing by 5G per year or 20G per year. That rate of change determines whether you need to act before the next annual visit or whether the current maintenance program is sufficient to keep the field in safe range.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            When a field is approaching the STC recommended threshold of 165G, the platform generates an alert so your facilities team can schedule grooming or infill replenishment before the next test cycle. This proactive approach eliminates the scenario where a field fails a test and requires emergency remediation or closure.
          </p>
        </div>
      </section>

      {/* Testing Frequency */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Often Should You Test?</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The Synthetic Turf Council recommends GMAX testing at a minimum of once per year. For high-use fields -- those hosting 200 or more events per year across multiple sports and programs -- semi-annual testing provides better resolution on how quickly conditions are changing.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Fields in their first two to three years may show relatively stable GMAX numbers and annual testing is sufficient. Fields in years four through eight, when infill compaction and fiber wear become more pronounced, benefit most from consistent annual data that allows trend modeling.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We recommend pairing GMAX testing with shear factor testing and infill depth measurement on every visit. These three metrics together give a complete biomechanical picture of the field: how hard it is (GMAX), how grippy it is (shear factor), and why it is behaving that way (infill depth). Treating them as a package rather than individual tests is both more cost-efficient and more informative.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white text-center" style={{ background: '#12324A' }}>
        <div className="max-w-3xl mx-auto px-6">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Get Your Fields Tested</h2>
          <p className="text-gray-300 text-xl mb-8">
            Independent GMAX testing across all zones of your field, with results in your software dashboard within 48 hours. Serving all of Texas from our DFW base.
          </p>
          <Link
            href="/schedule-assessment"
            className="inline-flex items-center space-x-2 bg-green-500 text-white font-semibold px-10 py-4 rounded-lg text-lg hover:bg-green-600 transition-colors"
          >
            <span>Schedule an Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
