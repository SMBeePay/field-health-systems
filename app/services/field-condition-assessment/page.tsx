'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { CheckCircle, AlertTriangle, BarChart2, ClipboardList, ArrowRight, Shield, Eye } from 'lucide-react'

export default function FieldConditionAssessmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav activePath="/services/field-condition-assessment" />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-[#12324A]/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm inline-block mb-6">
              Visual + Physical Field Inspection
            </span>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Field Condition<br />
              <span className="text-green-400">Assessment</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Numbers alone do not tell the whole story. A field condition assessment is a structured, comprehensive inspection of every physical element of the playing surface -- from seam integrity and fiber wear to drainage, edge containment, and infill distribution. It is the complete picture that GMAX and shear factor data alone cannot provide.
            </p>
            <Link
              href="/schedule-assessment"
              className="inline-flex items-center space-x-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-green-600 transition-colors"
            >
              <span>Schedule a Field Condition Assessment</span>
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
              { stat: '8+ Components', label: 'inspected across every field' },
              { stat: 'Photo Documented', label: 'every finding recorded with images' },
              { stat: 'Annual', label: 'recommended alongside GMAX testing' },
            ].map(({ stat, label }) => (
              <div key={stat} className="border border-white/10 rounded-xl py-6 px-4">
                <div className="text-3xl font-bold text-green-400 mb-1">{stat}</div>
                <div className="text-gray-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What an FCA Is */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-8 h-8 text-green-600 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">What a Field Condition Assessment Is</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            A field condition assessment is a systematic, zone-by-zone inspection of the entire artificial turf installation -- not just the playing surface, but every component that contributes to safety, performance, and longevity. It is designed to identify conditions that quantitative testing instruments do not capture: seams beginning to separate, drainage that is failing silently, fiber wear patterns that indicate accelerated degradation in specific zones.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The assessment is conducted by a trained inspector who walks the entire field systematically, examining each element and rating it against defined condition criteria. Findings are photographically documented and logged by zone so the report is specific, not general. Instead of "some seams show wear," you get the exact location of each seam with a condition rating and a photograph.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            The FCA does not replace quantitative testing -- it completes it. A field can pass GMAX and shear factor testing and still have a failing seam that is a tripping hazard. A field can have adequate infill depth on average and still have drainage channels that are quietly building toward surface degradation. The condition assessment is the layer of inspection that catches what the instruments miss.
          </p>
        </div>
      </section>

      {/* What Is Inspected */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Is Inspected</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Seam Integrity',
                desc: 'Every seam on the field is inspected for separation, lifting, or delamination. Seams are the most structurally vulnerable points on any artificial turf installation. A seam that is beginning to lift creates a tripping hazard that is not visible from a distance. Once a seam starts to fail, the failure typically accelerates as the exposed edge catches cleats and foot traffic with each use.',
                risk: 'Tripping injury, accelerating damage',
              },
              {
                title: 'Fiber Pile Height and Wear Patterns',
                desc: 'Fiber pile height is measured across different zones and compared against new-installation specifications. Fiber wear patterns reveal which zones are experiencing accelerated degradation. Heavily worn fiber -- particularly in goal mouths, hash mark areas, and frequently used sideline zones -- means reduced cushioning and altered playing characteristics in those areas. A well-maintained field has relatively consistent pile height across the playing surface.',
                risk: 'Reduced cushioning, inconsistent play surface',
              },
              {
                title: 'Backing Condition',
                desc: 'The backing is inspected for any signs of delamination, tears, blistering, or structural compromise. Backing damage that is not visible from above can be detected along seam lines and at high-stress points such as field edge transitions. Backing failures, when they occur, are typically expensive to repair and can compromise the structural integrity of a large section of the field.',
                risk: 'Structural failure, costly repair',
              },
              {
                title: 'Drainage Performance',
                desc: 'The drainage system is assessed both structurally and functionally. Drain locations are inspected for blockage or debris accumulation. Surface slope and drainage patterns are evaluated to identify any zones where water is likely to pool. Standing water on an artificial turf field is not just a playability problem -- it is a surface degradation accelerant that promotes mold, bacteria growth, and backing deterioration.',
                risk: 'Standing water, mold, surface degradation',
              },
              {
                title: 'Surface Uniformity and Infill Distribution',
                desc: 'The playing surface is assessed visually for uniformity of infill distribution, fiber orientation, and surface texture. High-infill zones that have accumulated displaced material from other areas create uneven playing surfaces. Low-infill zones create hardspots. The visual inspection identifies the spatial pattern of these imbalances and informs the infill depth testing data with observational context.',
                risk: 'Uneven performance, inconsistent safety profile',
              },
              {
                title: 'Edge Containment and Border Condition',
                desc: 'Field edges, banding, and perimeter containment systems are inspected for separation, lifting, or damage. Edge failure allows infill to escape the playing surface more rapidly and can create hazardous exposed backing material at field boundaries. Border seam connections are among the most failure-prone areas on any installation.',
                risk: 'Infill loss, tripping hazard at field edge',
              },
              {
                title: 'In-Field Lines and Markings',
                desc: 'In-fill line markings -- lines that are part of the turf system rather than painted on -- are inspected for lifting, separation, or wear-through. Lifted line markings create the same tripping hazard as lifted seams and are common failure points in older installations. Painted line condition is assessed where applicable.',
                risk: 'Tripping hazard',
              },
              {
                title: 'Infill Type Consistency',
                desc: 'In fields with specific infill specifications -- particularly those using organic or coated infill systems -- visual inspection checks for evidence of infill mixing or contamination from adjacent areas or maintenance equipment. Infill type inconsistency affects performance characteristics and may indicate a maintenance protocol issue.',
                risk: 'Performance inconsistency',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-600 font-medium whitespace-nowrap flex-shrink-0">
                    {item.risk}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seams and Drainage Deep Dive */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Two Conditions That Accelerate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <h3 className="font-bold text-gray-900 text-lg">Failing Seams: Why Early Detection Matters</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Seam failure on artificial turf rarely happens all at once. It typically begins as minor lifting at a join point -- a few centimeters of separation that is invisible to a casual observer but detectable to a trained inspector. In this early stage, repair is straightforward and inexpensive.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Left undetected, seam separation accelerates. Each game and practice pulls at the exposed edge, extending the separation. What starts as a 10-centimeter lift can become a meter-long seam failure within a single season of heavy use. At that stage, the repair scope is dramatically larger and the tripping hazard is real. The condition assessment catches seam failures in the early, inexpensive stage rather than the late, costly one.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <h3 className="font-bold text-gray-900 text-lg">Drainage Problems: The Silent Degrader</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Modern artificial turf is designed to drain efficiently -- typically through perforations in the backing and into a stone or sand subbase. When this system works correctly, the field is playable within 30 minutes of a rain event. When it does not, standing water is the visible symptom of a deeper problem.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Standing water accelerates multiple degradation mechanisms simultaneously: it softens adhesives holding seams, promotes mold and bacterial growth in the fiber pile, causes backing delamination over time, and can damage the subbase structure if water infiltrates where it should drain. Blocked drains, low spots in the subbase, and inadequate perimeter drainage are all detectable in a field condition assessment before they have caused irreversible damage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Numbers Alone Miss */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Quantitative Tests Alone Cannot Tell You</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            GMAX, shear factor, and infill depth are critical measurements. They quantify how the surface is performing against defined standards. But they measure what is happening at specific, discrete points on the surface at the moment of testing. They cannot tell you about conditions that develop between test points or that exist independent of the surface's biomechanical properties.
          </p>
          <div className="space-y-3 mb-8">
            {[
              'A field can pass GMAX testing while having a seam that will trip an athlete in the next game.',
              'A field can have adequate average infill depth while having drainage that is quietly directing water toward the backing in ways that will cause failure in two years.',
              'A field can have acceptable shear factor values while having fiber wear so advanced in the goal mouth that the fiber pile effectively offers no traction cushioning.',
              'A field can appear fine in quantitative testing while having backing delamination at an edge that will become a 6-meter repair scope within one season.',
            ].map((point) => (
              <div key={point} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#12324A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            The field condition assessment fills this gap. Together with GMAX, shear factor, and infill depth testing, it gives facility managers a complete picture of the field -- not just how it is performing today in measurable terms, but what structural and physical conditions are developing that will affect performance, safety, and longevity in the future.
          </p>
        </div>
      </section>

      {/* How We Test */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <ClipboardList className="w-8 h-8 text-green-600 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">How Field Health Systems Conducts the Assessment</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our field condition assessments follow a structured protocol that ensures consistent, comparable results across visits and across fields in your inventory.
          </p>
          <div className="space-y-4 mb-8">
            {[
              'The inspector walks the entire field in a systematic pattern, covering every zone of the playing surface plus all seams, edges, drains, and border areas.',
              'Each inspected element receives a condition rating on a defined scale, allowing direct comparison between visits and between fields.',
              'Every finding -- any seam issue, drainage concern, wear pattern, or structural observation -- is photographically documented with a geo-referenced location marker.',
              'Fiber pile height is measured at multiple representative points across the field and compared against available installation specifications.',
              'Observations are correlated with quantitative test data from the same visit: if a zone has elevated GMAX and the condition assessment shows heavily worn fiber, that correlation is documented and explained.',
              'The report identifies any conditions requiring immediate attention versus conditions to monitor, with a clear recommended action for each finding.',
            ].map((point) => (
              <div key={point} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">A Note on Maintenance Referrals</h3>
            <p className="text-gray-600 leading-relaxed">
              Field Health Systems provides independent testing and assessment -- we do not perform maintenance or repairs. When the field condition assessment identifies issues that require maintenance attention, we provide specific, data-driven guidance on what needs to be done and in which zones. For seam repairs, infill replenishment, fiber grooming, and drainage corrections, we can refer you to qualified contractors in your area who work with artificial turf systems.
            </p>
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart2 className="w-8 h-8 text-[#12324A] flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">Documentation in the Platform</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Every field condition assessment is stored in the Field Health Systems platform alongside all quantitative test data from the same visit. Photos, zone ratings, and inspector notes are attached to their specific locations on a field diagram, so you can navigate the field visually rather than reading through a linear report.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            When the same field is assessed in subsequent years, the platform places the current and previous findings side by side. A seam that was rated as minor in year two and moderate in year three is clearly on a degradation trajectory that warrants action before year four. This longitudinal view is only possible when assessment findings are consistently documented and stored in a structured format.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            For facility managers with multiple fields, the platform provides a portfolio view that shows the condition status of every field simultaneously. High-priority findings across any field surface in the district appear in a single prioritized list, making it straightforward to allocate maintenance resources to the areas of greatest need.
          </p>
        </div>
      </section>

      {/* Testing Frequency */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommended Assessment Frequency</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            A field condition assessment should be conducted annually at minimum, timed to coincide with GMAX testing and infill depth measurement. Combining all three visits into a single annual site visit is the most efficient and cost-effective approach -- one mobilization covers all four assessment components.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            For high-use fields hosting 200 or more events per year, a mid-season inspection focused on seam integrity and drainage -- particularly following any significant weather events -- is a worthwhile addition to the annual full assessment.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            New fields in their first two years benefit from a baseline assessment within six months of installation to document the as-installed condition and identify any installation deficiencies before the manufacturer warranty period runs. Establishing a baseline early is particularly valuable if a warranty claim becomes necessary later.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white text-center" style={{ background: '#12324A' }}>
        <div className="max-w-3xl mx-auto px-6">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Get the Complete Picture</h2>
          <p className="text-gray-300 text-xl mb-8">
            A full field condition assessment paired with GMAX, shear factor, and infill depth testing -- all on one visit, all documented in your software dashboard. Serving all of Texas from DFW.
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
