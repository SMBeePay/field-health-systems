import Link from 'next/link'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Artificial Turf Maintenance: A Guide for Athletic Directors | Field Health Systems',
  description: 'Learn what artificial turf maintenance actually involves, what to expect from your maintenance provider, and how regular testing protects your field investment.',
}

export default function ArtificialTurfMaintenanceGuidePage() {
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
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-3 py-1 rounded-full text-xs font-medium">Maintenance</span>
            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">For Athletic Directors</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Artificial Turf Maintenance: A Practical Guide for Athletic Directors
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Your turf field represents a significant capital investment. Here is what proper maintenance looks like, what to watch for, and how regular testing keeps you ahead of problems.
          </p>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> May 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 7 min read</span>
            <span>By Andrew Neal, Field Health Systems</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 py-12">

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          A typical synthetic turf field costs between $800,000 and $1.2 million to install. Most carry an 8-to-10-year manufacturer warranty. Whether your field reaches the end of that warranty in good shape, or requires costly early replacement, comes down largely to how well it is maintained and monitored along the way.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          For athletic directors managing one or more turf fields, understanding what maintenance actually involves and what your maintenance provider should be doing is not optional. This guide walks through the core components of synthetic turf maintenance, the warning signs of a neglected field, and the role that independent testing plays in protecting both your athletes and your investment.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Artificial Turf Maintenance Actually Involves</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Synthetic turf maintenance is not the same as natural grass care. There is no mowing, fertilizing, or watering. But artificial fields require consistent attention to stay safe and perform well. The major maintenance tasks fall into a few categories:
        </p>

        <div className="space-y-5 mb-8">
          <div className="flex gap-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Grooming and Fiber Maintenance</h3>
              <p className="text-gray-600 leading-relaxed">Regular mechanical grooming keeps the synthetic fibers upright and distributes infill evenly across the surface. Without it, fibers mat down in high-traffic areas, infill migrates toward the edges, and certain zones of the field degrade much faster than others. Goal mouths, hash marks, and sideline areas near benches tend to show wear first.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Infill Replenishment (Topdressing)</h3>
              <p className="text-gray-600 leading-relaxed">Infill is the material between the fibers, whether crumb rubber, sand, organic cork, or a blend. It provides cushioning, controls how hard the surface plays, and directly affects your field's GMAX and shear factor readings. Fields lose infill over time through normal use, grooming, wind, and rain runoff. When infill depth drops below manufacturer specifications, the surface becomes firmer and impact absorption decreases. Topdressing adds infill back to bring the field back into spec.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Debris Removal and Cleaning</h3>
              <p className="text-gray-600 leading-relaxed">Leaves, trash, and organic material that works into the infill layer can cause odor, mold, and bacteria growth over time. Periodic cleaning and debris removal, especially after wet seasons, keeps the surface hygienic and prevents organic matter from accelerating fiber breakdown.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Seam and Edge Inspections</h3>
              <p className="text-gray-600 leading-relaxed">Turf panels are joined together by seams, which are adhesive bonds in the backing material. Seams that begin to lift create tripping hazards that worsen quickly with foot traffic. Routine visual inspection and prompt seam repairs prevent small failures from becoming large ones.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Drainage Maintenance</h3>
              <p className="text-gray-600 leading-relaxed">Synthetic turf is designed to drain rapidly, but drains and field edges can become blocked by compacted infill, debris, or settlement over time. Standing water after rain events is a sign that drainage is compromised. Persistent moisture accelerates microbial growth and backing deterioration.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Often Should Maintenance Happen?</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Grooming frequency depends on field use. A high-use multi-sport field that hosts games five days a week needs more frequent attention than a field used two or three times per week. At a minimum, most field manufacturers recommend grooming at least monthly during the active season, with heavier grooming before the season begins and after heavy event weekends.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Infill replenishment typically happens annually or every other year depending on usage levels, field age, and infill type. Organic infill products tend to break down faster than crumb rubber and may require more frequent replacement. Your maintenance provider should be monitoring infill depth and recommending topdressing based on actual measurements rather than on a fixed calendar.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Maintenance Cannot Tell You</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Here is the gap that most athletic directors do not realize exists: maintenance providers can groom a field, add infill, and repair visible seams. What they cannot do is tell you whether the field's GMAX score is within the safe range, whether shear factor is in the zone that minimizes ACL injury risk, or whether infill depth is consistent across all zones rather than just in the areas that are easiest to access.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          These metrics require calibrated equipment, standardized test procedures, and an independent technician who is not also selling you maintenance services. A field can look fine visually and still be registering GMAX scores above the 200G safety threshold. Conversely, a field can show visible wear in the goal mouth while the rest of the surface remains within spec. You do not know which situation you are in until you test.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-amber-900 mb-2">A Note on Maintenance Providers and Testing</h3>
          <p className="text-amber-800 leading-relaxed text-sm">
            Some maintenance companies offer GMAX testing as an add-on service. There is an inherent conflict of interest when the same company that sells you maintenance services also certifies whether your field is safe. If testing reveals a problem, they benefit from the remediation work. Independent third-party testing, conducted by a company with no financial stake in your maintenance contracts, gives you an objective picture.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Building a Maintenance and Testing Schedule</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The most effective approach treats maintenance and testing as complementary rather than separate functions. A practical annual schedule for a Texas school district field looks something like this:
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-3">
          {[
            { period: 'Before the season (August)', task: 'Full field grooming, visual seam and edge inspection, drainage check' },
            { period: 'Pre-season (August/September)', task: 'Independent GMAX, shear factor, and infill depth testing. Establish baseline before athlete contact' },
            { period: 'Mid-season (October/November)', task: 'Grooming, debris removal, visual inspection of high-traffic zones' },
            { period: 'Post-season (December/January)', task: 'Deep clean, drainage maintenance, seam repairs' },
            { period: 'Spring (April/May)', task: 'Pre-summer inspection, second independent test if field shows visible wear or had heavy use' },
          ].map(({ period, task }) => (
            <div key={period} className="flex gap-4">
              <span className="text-green-600 font-semibold text-sm w-52 flex-shrink-0">{period}</span>
              <span className="text-gray-700 text-sm">{task}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Protecting the Warranty</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Most manufacturer warranties require documented proof that the field was maintained according to their specifications. This typically means grooming logs, infill depth records, and evidence that the field was kept within the designed operational parameters. Fields that cannot demonstrate proper maintenance history may find warranty claims denied even when the failure appears to be a product defect.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Independent testing records, stored and accessible over time, provide exactly the kind of documentation that supports a warranty claim. If your field is approaching the end of its warranty period and showing signs of degradation, having a clear testing history that shows the field was maintained properly gives you a much stronger position with the manufacturer.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Ask Your Maintenance Provider</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          If you are evaluating maintenance providers or auditing your current one, these questions give you a clear picture of the quality of service you are receiving:
        </p>

        <ul className="space-y-2 mb-8 text-gray-700">
          {[
            'Do you measure infill depth before and after grooming, or do you groom on a fixed schedule regardless of actual depth?',
            'How do you document seam conditions across the whole field, not just obvious failures?',
            'What is your protocol when you identify a drainage issue?',
            'Do you provide written reports after each maintenance visit, and what data is included?',
            'Do you offer your own testing services? If so, who conducts those tests and what equipment do they use?',
          ].map(q => (
            <li key={q} className="flex gap-3">
              <span className="text-green-500 font-bold flex-shrink-0">Q.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>

        <p className="text-gray-700 mb-10 leading-relaxed">
          A maintenance provider who struggles to answer these questions directly is one worth reconsidering. Quality providers document their work, measure what matters, and communicate clearly about what they found.
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
          <h2 className="text-3xl font-bold text-white mb-4">Know Where Your Field Actually Stands</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Independent GMAX, shear factor, and infill depth testing gives you the objective data your maintenance decisions should be built on.
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
