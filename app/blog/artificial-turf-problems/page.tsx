import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { Calendar, Clock, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'

export default function ArtificialTurfProblemsPage() {
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
            <span className="bg-red-500/20 text-red-300 border border-red-400/30 px-3 py-1 rounded-full text-xs font-medium">Field Safety</span>
            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">For Athletic Directors</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Artificial Turf Problems: How to Spot Field Issues Before They Become Injuries
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Many synthetic turf field problems are invisible to the naked eye. Here is what to watch for, what the warning signs actually mean, and when to call for professional testing.
          </p>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> May 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 6 min read</span>
            <span>By Andrew Neal, Field Health Systems</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Synthetic turf fields do not fail overnight. Problems develop gradually, often over months or years, and many of the most serious safety issues give almost no visible warning before they cross the line from manageable to hazardous. By the time a field looks obviously worn, it may have been operating outside safe parameters for a full season.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          This guide covers the most common artificial turf problems, what causes them, what they look like when you can see them, and what is happening beneath the surface when you cannot. It is written for athletic directors, facilities managers, and coaches who want to stay ahead of problems rather than respond to them after an injury occurs.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem 1: Surface Hardness Beyond Safe Limits</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          This is the most serious and least visible problem in synthetic turf. Every field has a GMAX score, a measurement of how hard the surface impacts an athlete who falls. The ASTM F1936 standard sets a maximum of 200G. The Synthetic Turf Council recommends staying below 165G for fields with regular youth and high school athletic use.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          A field operating above 200G presents a documented elevated risk of head injury, including concussion and in extreme cases skull fracture, when athletes fall and contact the surface. The field does not look different. It does not feel dramatically different to walk on. Athletes and coaches have no way to know the surface is out of spec without test equipment.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          What drives surface hardness up over time: infill compaction from repeated use, infill loss from displacement, and fiber breakdown that removes the cushioning effect of the pile layer. New fields often test in the 90-130G range. Fields approaching end-of-life that have not been properly maintained can test above 200G while still appearing functional. This is why annual GMAX testing is the minimum standard, not an optional extra.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 mb-1">Visual warning signs: almost none</p>
            <p className="text-red-700 text-sm leading-relaxed">A field with a failing GMAX score may look perfectly normal. The only reliable way to identify this problem is calibrated impact testing using ASTM F1936 protocol at multiple points across the field surface.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem 2: Infill Loss and Uneven Distribution</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Infill is the material between the fibers that provides cushioning, stability, and traction. Every field is designed around a specific infill depth, specified by the manufacturer, usually between 1.5 and 2.5 inches depending on the product. Fields lose infill continuously through normal use. Cleats kick it out. Grooming equipment displaces it toward edges. Rain washes it to low spots. Wind carries it off the field entirely.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          When infill depth drops below spec, the surface becomes firmer, which drives GMAX scores up. It also changes traction characteristics, which affects shear factor and lower-extremity injury risk. Fields can lose 20 to 30 percent of their designed infill depth in the first three to five years without proactive management.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Critically, infill loss is not uniform. Goal mouth areas and sideline zones near benches typically lose infill much faster than midfield. A field can test within spec in one area and be significantly below spec in another. Spot-checking a single location gives you a false picture of the whole field.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 mb-1">Visual warning signs: sometimes visible</p>
            <p className="text-amber-700 text-sm leading-relaxed">Bare or shiny-looking turf backing visible between fibers in high-traffic zones is a clear sign of severe infill loss. But significant infill depletion can occur before the backing becomes visible. Depth probe measurements across multiple field zones are the accurate method.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem 3: Rotational Traction Outside the Safe Range</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Shear factor, also called rotational traction, measures how much the surface grips an athlete's planted cleat when the body rotates. This is the mechanical factor most directly linked to ACL tears and other lower-extremity injuries on synthetic turf.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The problem can go in either direction. A surface with too much rotational grip locks the foot in place during a cutting movement. The knee absorbs the torsional force that the surface should have released. A surface with too little grip causes slipping and falling. The ASTM F1337 standard defines the acceptable range, and fields outside that range in either direction represent an injury risk that is not visible to anyone watching practice or a game.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Shear factor is directly influenced by infill type, infill depth, and grooming frequency. Rubber crumb infill behaves differently than organic infill under cleat load. As infill compacts or is lost, traction properties change. A field tested at installation may be operating at a significantly different shear factor two seasons later.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 mb-1">Visual warning signs: none</p>
            <p className="text-amber-700 text-sm leading-relaxed">Rotational traction cannot be assessed visually or by walking the field. It requires a calibrated rotational traction device and follows ASTM F1337 test protocol.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem 4: Seam Failures</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Turf fields are assembled from panels joined by adhesive seams in the backing material. Seam failures are one of the few turf problems that can be identified visually, but they often go unnoticed until they become significant because they typically start small and progress rapidly.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          A seam that begins to lift creates a ridge or lip in the surface. Athletes trip on it. Over time, foot traffic accelerates the separation, turning a small repair into a large one. Seam failures are most common along the edges of the field, in goal mouth areas where surface stress is highest, and anywhere water pools because of drainage issues.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Seam repairs are typically the responsibility of the maintenance provider or the installer under warranty. The key is catching them early. A field condition assessment that walks the entire seam network, rather than just a visual scan from the sideline, catches failures at the stage where repair is straightforward.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-800 mb-1">Visual warning signs: sometimes visible if you look closely</p>
            <p className="text-green-700 text-sm leading-relaxed">A seam beginning to lift may appear as a slight color change, a subtle ridge, or a narrow gap between panels. Walking the seam lines of the field and running a hand along them is a useful periodic check between professional inspections.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem 5: Drainage Failure</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Synthetic turf is designed to drain quickly, typically at a rate of 30 inches per hour or more. When drainage slows significantly, water pools on or just below the surface. This creates multiple downstream problems: the surface becomes slippery, infill shifts, and prolonged moisture creates conditions for mold and bacterial growth in the infill layer.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Drainage failure is caused by compacted infill blocking the backing perforations, debris accumulation in the drainage system, and in some cases, soil settlement beneath the field that creates low spots. A field that drains slowly after a rain event warrants investigation. Standing water 30 minutes after rain stops is a clear indicator something has gone wrong.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem 6: Fiber Wear and Breakdown</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Synthetic fibers are rated for a certain number of equivalent full-time play hours, typically in the range of 3,000 to 5,000 hours depending on the product. As fibers wear, they lose their height and resilience. Heavily worn fibers in high-traffic zones no longer contribute to energy absorption the way they did when new. This is one of the factors that drives GMAX scores upward as fields age.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Significant fiber wear in goal mouths and along frequently used paths is visible as a color change, a reduction in pile height, or a flattened, shiny appearance to the turf. Moderate wear is harder to assess without measuring actual pile height across the field.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Call for Professional Testing</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Annual testing is the minimum standard for any field in active athletic use. Beyond that baseline, these specific situations warrant an unscheduled assessment:
        </p>

        <ul className="space-y-3 mb-8 text-gray-700">
          {[
            'A student-athlete sustains an injury that involves contact with the surface and the mechanism is unclear',
            'The field has had an unusually high-volume season with significantly more events than normal',
            'Visible infill loss is evident in goal mouth or sideline zones',
            'Seam lifting or separation is observed anywhere on the field',
            'The field is approaching the end of its manufacturer warranty and condition documentation is needed',
            'The maintenance provider recommends infill replenishment but you want independent confirmation of depth before approving the expense',
            'The field is being considered for purchase or a facilities assessment is required',
          ].map(item => (
            <li key={item} className="flex gap-3">
              <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-gray-700 mb-10 leading-relaxed">
          The cost of testing is a small fraction of the cost of a single serious injury, and a fraction of the cost of premature field replacement. For a district with multiple fields, a systematic testing program that tracks each field over time is the single most effective tool for managing the risk.
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
          <h2 className="text-3xl font-bold text-white mb-4">Get an Objective Picture of Your Field</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Independent testing across GMAX, shear factor, infill depth, and field condition gives you the data to make informed decisions before problems become injuries.
          </p>
          <Link href="/schedule-assessment">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2">
              Schedule an Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  )
}
