'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { CheckCircle, AlertTriangle, BarChart2, ClipboardList, ArrowRight, Shield, Layers } from 'lucide-react'

export default function InfillDepthTestingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav activePath="/services/infill-depth-testing" />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551958219-acbc595d4bfd?w=1920&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-[#12324A]/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm inline-block mb-6">
              Manufacturer Specification Compliance
            </span>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Infill Depth Testing<br />
              <span className="text-green-400">for Artificial Turf</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Infill is the foundation of every artificial turf field's performance characteristics. As it migrates, compacts, and depletes over time, it takes both safety performance and warranty compliance with it. Infill depth measurement tells you exactly where your field stands -- before you find out the hard way.
            </p>
            <Link
              href="/schedule-assessment"
              className="inline-flex items-center space-x-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-green-600 transition-colors"
            >
              <span>Schedule an Infill Depth Assessment</span>
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
              { stat: '20-30%', label: 'typical infill loss in first 3-5 years' },
              { stat: 'Warranty', label: 'void risk when below manufacturer spec' },
              { stat: 'Zone-by-Zone', label: 'full field measurement, not spot checks' },
            ].map(({ stat, label }) => (
              <div key={stat} className="border border-white/10 rounded-xl py-6 px-4">
                <div className="text-3xl font-bold text-green-400 mb-1">{stat}</div>
                <div className="text-gray-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Infill Is */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <Layers className="w-8 h-8 text-green-600 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">What Infill Is and Why It Matters</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Artificial turf is not a single material -- it is a system. The synthetic fiber blades are tufted into a backing and extend upward, but those fibers alone would be rigid and unsafe to play on. Infill is the granular material broadcast between the fiber blades that gives the surface its softness, stability, and playability.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Without adequate infill, the fibers collapse flat and the backing becomes the playing surface. With proper infill depth, the fibers stand upright, the surface absorbs impact energy, and the field behaves as the system was designed to perform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: 'Crumb Rubber (SBR / TPE)',
                desc: 'Recycled rubber particles from tires (SBR) or manufactured from virgin rubber (TPE). The most common infill in North American fields. High density, effective at impact attenuation, but heat-retaining and subject to compaction.',
              },
              {
                title: 'Silica Sand',
                desc: 'Used as either the primary infill or as a base layer beneath rubber in dual-infill systems. Provides weight and stability to keep fibers upright. Less effective at impact attenuation on its own but improves drainage characteristics.',
              },
              {
                title: 'Organic Infill (Cork, Coconut, Wood Fiber)',
                desc: 'Increasingly specified in newer installations. Lower heat retention than rubber, environmentally preferable, but more susceptible to biological degradation and compaction over time. Performance characteristics change as the material breaks down.',
              },
              {
                title: 'Coated / Washed Rubber Alternatives',
                desc: 'Newer generation infills including coated TPE and polymer-coated crumb rubber designed to reduce heat and prevent migration. Performance profiles differ from uncoated materials and change differently with age.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Regardless of infill type, every field is installed with a designed infill depth specified by the turf manufacturer. That specification is not arbitrary -- it is the depth at which the system was tested and certified to meet its performance and safety specifications. Falling below it is both a safety problem and a warranty problem.
          </p>
        </div>
      </section>

      {/* How Infill Is Lost */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Infill Depletes Over Time</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Infill loss is not a dramatic event -- it is a slow, continuous process driven by the normal use of the field. By the time it is visible to the naked eye, significant loss has already occurred in the underlying profile.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Athlete Displacement',
                desc: 'Every planted foot, every tackle, every sliding stop moves small amounts of infill from where it started. Over thousands of athlete contacts, this displacement adds up. High-traffic zones like goal mouths in soccer, scrimmage lines in football, and pivot points at hash marks experience infill displacement many times faster than the rest of the field.',
              },
              {
                title: 'Migration to Field Edges',
                desc: 'Infill naturally migrates toward the edges of the playing surface over time. Cleats move it incrementally outward with each game and practice. Fields with drainage that channels toward the perimeter compound this effect. Edge zones and warning tracks often accumulate excess infill while center zones deplete.',
              },
              {
                title: 'Wind and Weather',
                desc: 'Lighter infill materials -- particularly fine crumb rubber and organic materials -- are susceptible to wind displacement. Rain events can wash infill toward drains or off the field entirely, particularly in fields without adequate edge retention. Over multiple seasons, these weather-driven losses accumulate.',
              },
              {
                title: 'Maintenance Equipment',
                desc: 'Dragging, brushing, and grooming equipment is necessary for maintaining fiber upright orientation, but aggressive maintenance with the wrong equipment or wrong settings can displace significant amounts of infill. A maintenance program that is not calibrated to the specific field system can accelerate infill loss rather than slow it.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Industry Data on Infill Loss</h3>
                <p className="text-gray-700 leading-relaxed">
                  Research and field data from the turf industry indicates that fields can lose 20 to 30 percent of their original infill volume within the first three to five years of service without an active infill replenishment program. On a high-use field seeing 200 or more events per year, this timeline can be shorter. Infill loss in this range is not a worst-case scenario -- it is the expected trajectory for a field that is not actively managed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Low Infill Looks Like */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recognizing an Infill-Depleted Field</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Some signs of infill depletion are visible to anyone who walks the field. Others require measurement to detect. Waiting until the visible signs appear means infill has already reached a level that is affecting performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Visible Signs</h3>
              <div className="space-y-3">
                {[
                  'Flattened fiber blades that do not stand upright after light brushing',
                  'Visible backing material in goal mouths, at line of scrimmage areas, or along high-traffic sideline zones',
                  'Hard spots underfoot that feel noticeably different from the rest of the field',
                  'Uneven surface texture with some zones visually different from adjacent zones',
                ].map((sign) => (
                  <div key={sign} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{sign}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Measured Indicators</h3>
              <div className="space-y-3">
                {[
                  'Infill depth readings below manufacturer specification at one or more test points',
                  'GMAX values elevated in specific zones, indicating loss of shock attenuation in those areas',
                  'Shear factor readings outside the safe range in high-traffic zones',
                  'Widening variance between the highest and lowest infill depth readings across the field',
                ].map((sign) => (
                  <div key={sign} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{sign}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty and Manufacturer Spec */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Manufacturer Specifications and Warranty Risk</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Every artificial turf field is designed and installed with a specified infill depth -- typically expressed in millimeters and sometimes broken down by infill type in dual-infill systems. This specification appears in the installation documentation and is part of the product warranty terms.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Most turf warranties include language that ties warranty coverage to maintenance compliance, including maintaining infill at the specified depth. A field operating significantly below spec is not being maintained in accordance with warranty terms. If the manufacturer investigates a premature fiber or backing failure on a field with depleted infill, the warranty claim can be denied.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            For a field with a 10-year warranty representing a $500,000 to $1,000,000 capital investment, documented evidence of infill depth maintenance is not just a safety issue -- it is a financial protection issue. Annual infill depth testing creates the documentation record that supports a warranty claim if and when one becomes necessary.
          </p>
        </div>
      </section>

      {/* The Whole-Field Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why the Whole-Field Picture Matters</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Infill loss is not uniform across a field. It follows the patterns of use. Goal mouths may be at 40 percent of specified depth while the center of the field is still at 85 percent. This creates a field with highly variable performance characteristics depending on where the athlete happens to be standing.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            An athlete sprinting down the center of the field and cutting toward the goal is transitioning from a field behaving at one performance level to a field behaving at a very different level within a few strides. That transition is neither predictable nor consistent -- and inconsistent surface behavior is its own injury risk, separate from the absolute values at either extreme.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            A spot check at the center of the field, or an average across a handful of points, will not reveal this spatial variability. Mapping infill depth across the entire field -- with enough test points to see the distribution, not just the average -- is what gives you actionable information about where the field needs attention.
          </p>
        </div>
      </section>

      {/* How We Test */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <ClipboardList className="w-8 h-8 text-green-600 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">How Field Health Systems Measures Infill Depth</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We measure infill depth using calibrated probes inserted into the turf surface at a structured grid of points across the entire field. Each measurement records the depth of infill above the backing, which is then compared against the manufacturer's specified depth for that field.
          </p>
          <div className="space-y-4 mb-8">
            {[
              'We test at a minimum grid density that captures the spatial distribution of infill across all playing zones, including goal mouths, midfield, hash mark areas, and sideline zones.',
              'We record the manufacturer specified depth for the field and express each reading as both an absolute depth and a percentage of specification.',
              'We identify and flag any zones where infill depth falls below a threshold that warrants replenishment.',
              'All test points are geo-referenced so the results can be mapped and compared against the same locations on future visits.',
              'Infill depth data is correlated with GMAX and shear factor data from the same visit, allowing direct analysis of how infill condition is affecting performance metrics.',
            ].map((point) => (
              <div key={point} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">A Note on Infill Replenishment</h3>
            <p className="text-gray-600 leading-relaxed">
              When infill depth testing identifies zones that need replenishment, the solution is topdressing -- adding new infill material and working it into the fiber pile to restore specified depth. This is maintenance work performed by a qualified turf maintenance contractor, not by Field Health Systems. Our role is to identify where the field stands, document the findings, and provide the data that guides the maintenance decision. We can refer you to qualified maintenance providers in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart2 className="w-8 h-8 text-[#12324A] flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">Tracking Infill Depth Across Test Cycles</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Infill depth data becomes most powerful when tracked over multiple test cycles. The rate of infill loss -- how much is being lost per year, and in which zones -- tells a more complete story than any single reading.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Our software platform stores all infill depth readings from every visit, maps them to their test point locations, and graphs the trend over time. When a zone is losing infill at an accelerating rate, the platform flags it so your team can investigate the cause -- whether it is unusual traffic patterns, an equipment issue, or drainage problems directing infill displacement.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            This trend data also allows for maintenance budget planning. Instead of reacting to a failing field, facilities managers can project when infill replenishment will be needed based on the current loss rate and budget accordingly -- often the difference between a planned topdressing during the off-season and an emergency repair during the playing season.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white text-center" style={{ background: '#12324A' }}>
        <div className="max-w-3xl mx-auto px-6">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Know What Is Under Your Field</h2>
          <p className="text-gray-300 text-xl mb-8">
            Full-field infill depth mapping with zone-by-zone results, manufacturer spec comparison, and trend tracking over time. Serving all of Texas from DFW.
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
