'use client'

import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { CheckCircle, AlertTriangle, BarChart2, ClipboardList, ArrowRight, Shield } from 'lucide-react'

export default function ShearFactorTestingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav activePath="/services/shear-factor-testing" />

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-[#12324A]/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm inline-block mb-6">
              ASTM F1337 Certified Testing
            </span>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Shear Factor Testing<br />
              <span className="text-green-400">for Turf Fields</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Rotational traction -- the grip a surface exerts on a planted cleat -- is one of the most direct mechanical contributors to ACL tears and other lower-extremity injuries. Shear factor testing measures whether your field's grip is in the safe range, or whether it is putting athletes at risk every time they plant and cut.
            </p>
            <Link
              href="/schedule-assessment"
              className="inline-flex items-center space-x-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-green-600 transition-colors"
            >
              <span>Schedule a Shear Factor Assessment</span>
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
              { stat: 'ASTM F1337', label: 'governing test standard' },
              { stat: '25-50 Nm', label: 'typical safe operating range' },
              { stat: 'ACL Tears', label: 'primary injury shear factor prevents' },
            ].map(({ stat, label }) => (
              <div key={stat} className="border border-white/10 rounded-xl py-6 px-4">
                <div className="text-3xl font-bold text-green-400 mb-1">{stat}</div>
                <div className="text-gray-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Shear Factor Measures */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Shear Factor Measures</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Shear factor -- also called rotational traction -- measures the resistive torque a surface produces when a loaded cleat rotates. In practical terms: when an athlete plants a foot and pivots, the surface either releases the foot smoothly or grips it and holds. The magnitude of that grip is what shear factor quantifies.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The test is conducted per ASTM F1337 using a rotational traction device: a weighted probe with a cleat pattern is pressed into the surface under a standardized load, then rotated. The torque required to rotate it -- measured in Newton-meters (Nm) -- is the shear factor value.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Unlike GMAX, which has a single direction of failure (too high), shear factor can fail in both directions. A surface that grips too strongly is dangerous. A surface that releases too easily is also dangerous. The field has to occupy a specific middle range to be both functional and safe for athletic use.
          </p>
        </div>
      </section>

      {/* The Injury Mechanism */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How Rotational Traction Causes Injuries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <h3 className="font-bold text-gray-900 text-lg">Too High: Cleat Catches, Joint Breaks</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                When a surface grips too strongly, the cleat locks into the turf during a rotational movement. The foot cannot release, but the momentum of the body continues to rotate. The energy of that rotation has to go somewhere -- and it goes into the knee. The ACL, MCL, and meniscus absorb the torsional load the surface should have released. This is the most well-documented injury mechanism associated with artificial turf, and it explains why ACL injury rates in sports played on synthetic surfaces have been a persistent topic in sports medicine research.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <h3 className="font-bold text-gray-900 text-lg">Too Low: Loss of Traction, Falls</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A surface with too little rotational traction does not provide the grip athletes rely on for cutting, accelerating, and decelerating. Cleats slide on the surface rather than purchasing into it, increasing the risk of slipping and falling. This is a less common failure mode on modern turf fields but becomes relevant on over-groomed surfaces, surfaces that have lost infill through displacement, or fields that have been over-watered or are covered in debris. Ankle sprains and hamstring injuries are the most common consequence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACL Research */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Research on ACL Tears and Synthetic Turf</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The relationship between synthetic turf and ACL injury rates has been studied extensively in professional, collegiate, and youth sports. Multiple peer-reviewed studies across soccer, American football, and rugby have found elevated lower-extremity injury rates on synthetic surfaces compared to natural grass, with non-contact ACL tears appearing disproportionately in the synthetic turf cohorts.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            A 2019 study in the American Journal of Sports Medicine found that NFL players on artificial turf sustained non-contact lower extremity injuries at a significantly higher rate than on natural grass, with anterior cruciate ligament and posterior cruciate ligament injuries specifically elevated. Similar findings have emerged from studies of collegiate soccer and professional rugby.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            The critical nuance is that not all synthetic turf surfaces behave the same. Rotational traction varies substantially between field types, infill systems, and maintenance states. A well-tested and properly maintained synthetic field can operate within safe traction parameters. The problem arises when fields are not tested and traction is allowed to drift outside the safe range without anyone knowing. Shear factor testing is what closes that information gap.
          </p>
        </div>
      </section>

      {/* Infill and Shear Factor */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Infill Controls Rotational Traction</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The infill system is the primary mechanical variable determining shear factor on a given field. Different infill materials produce different traction profiles, and the depth and condition of the infill layer directly controls where on the traction spectrum the field operates.
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Crumb Rubber (SBR and TPE)</h3>
              <p className="text-gray-600">Crumb rubber is the most common infill material in North American fields. It has relatively high rotational traction values compared to sand, especially when compacted. As crumb rubber infill compacts and particle surfaces become smooth through use, traction values increase. Fields with heavily compacted crumb rubber are among the most likely to exceed safe shear factor limits.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Sand Infill</h3>
              <p className="text-gray-600">Sand-based infill systems generally produce lower rotational traction values than rubber-based systems. Fields using angular sand have higher traction than those using rounded sand. As sand depth decreases through displacement or weathering, traction can drop toward the lower safety threshold, creating slip risk.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Organic Infill (Cork, Coconut Fiber, Wood Fiber)</h3>
              <p className="text-gray-600">Organic infills are increasingly specified in new installations due to lower heat retention and improved environmental profile. These materials tend to have different traction characteristics than rubber and can behave differently when wet versus dry. Their traction properties also change as the organic material breaks down over time, making periodic testing particularly important on these systems.</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 mt-8 leading-relaxed">
            Because different infill materials degrade differently, shear factor does not always move in the same direction as GMAX. A field can have decreasing GMAX (becoming softer, which sounds good) while shear factor is increasing (becoming stickier, which is dangerous). GMAX testing alone does not catch this scenario. Shear factor testing does.
          </p>
        </div>
      </section>

      {/* Why This Test Is Under-Ordered */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Most Important Test Nobody Orders</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            GMAX testing gets the most attention in the industry because head injury is the most visible and widely publicized risk associated with hard playing surfaces. As a result, many facilities order GMAX testing but never order shear factor testing.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            This creates a gap. ACL tears are career-ending injuries in young athletes. They require surgery, months of rehabilitation, and carry a documented re-injury risk. An athlete who tears their ACL on a field with excessive rotational traction that was never tested represents a preventable outcome -- and one that a testing record could have helped avoid or at least demonstrate due diligence on.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            The argument for pairing shear factor testing with GMAX testing is straightforward: the incremental cost is low and the protective value is high. You already have a testing crew on site. You already have a report being generated. Adding shear factor to the protocol adds relatively little time and fills a real safety gap that GMAX data alone cannot address.
          </p>
        </div>
      </section>

      {/* How We Test */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <ClipboardList className="w-8 h-8 text-green-600 flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">How Field Health Systems Tests Shear Factor</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We conduct shear factor testing per ASTM F1337 using a calibrated rotational traction device. As with GMAX testing, we test at multiple points across the full playing surface rather than a single center-field measurement.
          </p>
          <div className="space-y-4 mb-8">
            {[
              'We test at a grid of points covering all major playing zones, with additional focus on high-traffic areas where infill displacement is most pronounced.',
              'We document both the torque value at each point and the surface condition observed at that location -- including visible infill depth, fiber condition, and any anomalies.',
              'Results are reported point-by-point so you can see the spatial distribution of traction values across the field rather than a single averaged number.',
              'We flag any zones where values fall outside the safe operating range in either direction -- too high or too low.',
              'All shear factor data is stored in the Field Health Systems platform alongside GMAX and infill depth data, allowing direct comparison across all three metrics.',
            ].map((point) => (
              <div key={point} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Reports are delivered within 24 to 48 hours. Each report includes a plain-language interpretation of what the traction profile means for the field's safety status and what, if any, maintenance actions are recommended. We do not do maintenance ourselves -- that is the job of your turf maintenance contractor -- but we can provide specific, data-driven guidance on what the maintenance crew should address and in which zones.
          </p>
        </div>
      </section>

      {/* Software */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart2 className="w-8 h-8 text-[#12324A] flex-shrink-0" />
            <h2 className="text-3xl font-bold text-gray-900">Tracking Shear Factor Over Time</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Because shear factor can move in either direction depending on infill type, use patterns, and maintenance history, longitudinal tracking is particularly valuable. A single shear factor reading tells you where the field is today. Multiple readings over several years tell you whether the field's traction profile is drifting toward a dangerous range and how fast.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our software platform stores all shear factor results alongside GMAX and infill depth data, allowing you to see the full biomechanical picture of each field in one place. When any metric approaches a threshold that warrants attention, the platform generates an alert so your team can act before the next scheduled assessment.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white text-center" style={{ background: '#12324A' }}>
        <div className="max-w-3xl mx-auto px-6">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Know Your Field's Traction Profile</h2>
          <p className="text-gray-300 text-xl mb-8">
            Independent shear factor testing across all zones of your field. We test, report, and track results over time so you always know where your fields stand.
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
