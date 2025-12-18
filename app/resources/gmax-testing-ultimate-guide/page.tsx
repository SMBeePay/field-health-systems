import Link from 'next/link'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  FileText,
  Phone,
  Download,
  ExternalLink
} from 'lucide-react'

export const metadata = {
  title: 'GMAX Testing Ultimate Guide for School Districts | ASTM F1936 Compliance',
  description: 'Protect athletes & reduce liability with expert GMAX testing. Learn ASTM F1936 requirements, testing frequency, and how to interpret results. Free assessment.',
  openGraph: {
    title: 'The Complete Guide to GMAX Testing for School Athletic Fields',
    description: 'Everything athletic directors need to know about GMAX testing, ASTM F1936 compliance, and protecting athletes.',
    url: 'https://www.fieldhealthsystems.com/resources/gmax-testing-ultimate-guide',
    type: 'article',
    images: [{
      url: 'https://www.fieldhealthsystems.com/sports-field-bg.jpg',
      width: 1200,
      height: 630,
      alt: 'Complete guide to GMAX testing for school athletic fields'
    }]
  }
}

export default function GMAXTestingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Article Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Complete Guide to GMAX Testing for School District Athletic Fields",
            "description": "Comprehensive guide covering GMAX testing, ASTM F1936 compliance, testing frequency, and legal liability protection for athletic directors.",
            "author": {
              "@type": "Person",
              "name": "Andrew",
              "jobTitle": "Field Safety Expert"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Field Health Systems",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.fieldhealthsystems.com/logo-header.svg"
              }
            },
            "datePublished": "2025-01-20",
            "dateModified": "2025-01-20",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.fieldhealthsystems.com/resources/gmax-testing-ultimate-guide"
            }
          })
        }}
      />

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does GMAX testing cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Professional GMAX testing typically costs between $750-$1,500 per field, depending on field size, location, and testing frequency. Annual monitoring programs with multiple tests per year often have discounted rates. This investment is minimal compared to the $2M+ potential liability from an untested field or the $500K-$800K cost of emergency field replacement."
                }
              },
              {
                "@type": "Question",
                "name": "How long does GMAX testing take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A complete GMAX field test takes 60-90 minutes from setup to completion. This includes marking the 10 test locations, conducting three drops at each location (30 total impacts), recording data, and preliminary analysis. You'll receive a comprehensive written report within 24-48 hours showing results at each location and recommendations."
                }
              },
              {
                "@type": "Question",
                "name": "What GMAX score means my field is unsafe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Any location scoring 200 G or higher FAILS ASTM F1936 and poses a life-threatening injury risk—the field should be closed immediately. Scores of 166-199 G require urgent action within 30 days. The Synthetic Turf Council recommends staying below 165 G for optimal safety. Scores of 80-115 G are ideal and comparable to natural grass."
                }
              },
              {
                "@type": "Question",
                "name": "Can I do GMAX testing myself or use my maintenance company?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Valid GMAX testing requires ASTM F355-A compliant equipment ($15,000+) with annual calibration certification, professional training, and liability insurance. Testing by your maintenance company creates a conflict of interest and may not be accepted by insurance or in legal proceedings. Independent third-party testing provides objective, defensible results."
                }
              },
              {
                "@type": "Question",
                "name": "How often should schools test their fields?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Minimum annual testing is recommended for all fields. High-use football fields should be tested bi-annually (pre-season and mid-season). Multi-sport fields with year-round use benefit from quarterly testing. Texas fields should be tested post-summer to assess heat damage. Always test after severe weather events or if players report hardness concerns."
                }
              },
              {
                "@type": "Question",
                "name": "Does weather affect GMAX test scores?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, significantly. Testing must be done between 41°F-120°F on a dry surface. Frozen infill tests much harder (higher scores), while heat-softened rubber tests softer (lower scores). Rain or irrigation can temporarily affect results. This is why testing should be done during moderate temperatures and compared year-over-year at similar times for accurate trend analysis."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if my field fails GMAX testing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If any location scores 200+ G, close the field immediately and contact your testing provider and field manufacturer. Common remediation options include decompaction ($2K-$5K), infill addition ($5K-$15K), shock pad replacement ($50K-$150K), or complete field replacement if beyond repair. Your testing provider should recommend the most cost-effective solution and can coordinate retesting after repairs."
                }
              },
              {
                "@type": "Question",
                "name": "Is GMAX testing required by law in Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While not explicitly mandated by Texas state law, athletic directors have a legal duty of care to provide reasonably safe playing conditions. Many field warranties require annual testing, and insurance providers may require documented safety monitoring. Professional liability protection and demonstrating reasonable care make regular GMAX testing a best practice and practical necessity for Texas schools."
                }
              }
            ]
          })
        }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <img
                  src="/logo-header.svg"
                  alt="Field Health Systems"
                  className="h-20 w-auto cursor-pointer"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#services" className="text-gray-700 hover:text-green-600 font-medium">Platform</Link>
              <Link href="/#athlete-safety" className="text-gray-700 hover:text-green-600 font-medium">Field Safety</Link>
              <Link href="/resources" className="text-green-600 font-medium border-b-2 border-green-600">Resources</Link>
              <Link href="/blog" className="text-gray-700 hover:text-green-600 font-medium">Blog</Link>
              <Link href="/partnerships" className="text-gray-700 hover:text-green-600 font-medium">Partnerships</Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-green-600 font-medium">Login</Link>
              <Link href="/schedule-assessment">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Request Demo
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-green-600">Resources</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">GMAX Testing Guide</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div>
          <div className="mb-6">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Field Safety & Compliance
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The Complete Guide to GMAX Testing for School District Athletic Fields
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Everything athletic directors need to know about GMAX testing, ASTM F1936 compliance, protecting athletes, and reducing legal liability.
          </p>

          <div className="flex items-center space-x-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>20 min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Updated January 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Expert Verified</span>
            </div>
          </div>

          <Link href="/schedule-assessment">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors mb-8">
              Schedule Your Field Assessment →
            </button>
          </Link>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">In This Guide:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="#introduction" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Why GMAX Testing Matters</span>
            </a>
            <a href="#what-is-gmax" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>What is GMAX Testing?</span>
            </a>
            <a href="#astm-standard" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>ASTM F1936 Standard Explained</span>
            </a>
            <a href="#legal-liability" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Legal Liability & Duty of Care</span>
            </a>
            <a href="#testing-frequency" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Testing Frequency Guidelines</span>
            </a>
            <a href="#understanding-scores" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Understanding GMAX Scores</span>
            </a>
            <a href="#warning-signs" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Warning Signs to Watch For</span>
            </a>
            <a href="#case-study" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Real Texas District Case Study</span>
            </a>
            <a href="#choosing-provider" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Choosing a Testing Provider</span>
            </a>
            <a href="#faq" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Frequently Asked Questions</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-5xl mx-auto px-6 prose prose-lg prose-green max-w-none">

        {/* Introduction */}
        <section id="introduction" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why GMAX Testing Matters for Your Athletic Program</h2>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold text-red-900 mb-2">Critical Safety Statistic:</p>
                <p className="text-red-800">Research shows that <strong>21.5% of all sports-related head injuries</strong> are directly attributed to surface impact. When athletic fields become too hard, they stop protecting athletes and start causing injuries.</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            As an athletic director, you're responsible for student-athlete safety across every aspect of your program. Your school district has likely invested anywhere from $300,000 to $800,000 in your artificial turf athletic field. Yet most schools have no systematic way to monitor whether that field continues to provide adequate shock absorption and player protection.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            That's where GMAX testing comes in. GMAX testing is the gold standard for measuring athletic field impact absorption and safety. It provides objective, quantifiable data about whether your field meets safety standards or poses a risk to your athletes.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            In this comprehensive guide, you'll learn everything you need to know about GMAX testing for school athletic fields, including:
          </p>

          <ul className="space-y-3 mb-8 text-gray-700">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>What GMAX testing is and how the science works</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>ASTM F1936 compliance requirements and standards</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>How testing protects you from legal liability</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>How often you should test your fields</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>How to interpret GMAX scores and take action</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Warning signs that your field needs immediate testing</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>How to choose a qualified testing provider</span>
            </li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            By the end of this guide, you'll have the knowledge to make informed decisions about athletic field safety, protect your student-athletes, demonstrate duty of care, and defend your district against potential liability.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-green-900 mb-4">Free Resources for Athletic Directors</h3>
            <p className="text-green-800 mb-4">Download our complete Field Safety Compliance Checklist to ensure your athletic program meets all safety requirements.</p>
            <button className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              <Download className="w-5 h-5" />
              <span>Download Free Checklist</span>
            </button>
          </div>
        </section>

        {/* What is GMAX Testing */}
        <section id="what-is-gmax" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is GMAX Testing?</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            GMAX testing is a standardized method for measuring the shock-absorbing properties of athletic playing surfaces. The term "GMAX" refers to the maximum G-force experienced during impact, measured in units called "Gs." One G equals the force of Earth's gravity—the force you feel standing still. Higher GMAX scores indicate harder surfaces with less shock absorption.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Science Behind GMAX</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            When an athlete falls or collides with a playing surface, the field must absorb impact energy to prevent injury. Natural grass provides excellent shock absorption through its soil base and grass cushioning. Artificial turf systems use infill materials (rubber, sand) and shock pad layers to replicate this protection.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Over time, several factors can reduce a field's ability to absorb impact:
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Compaction:</strong> Heavy use compresses infill and reduces cushioning</li>
            <li><strong>Infill migration:</strong> Material shifts away from high-traffic areas</li>
            <li><strong>Infill degradation:</strong> Rubber breaks down from UV exposure and weather</li>
            <li><strong>Moisture changes:</strong> Frozen or saturated infill loses shock absorption</li>
            <li><strong>Aging:</strong> Turf backing and shock pads deteriorate over years</li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            GMAX testing quantifies exactly how well your field absorbs impact, allowing you to identify safety issues before they cause injuries.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How GMAX Testing Equipment Works</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Professional GMAX testing uses specialized equipment that meets the ASTM F355-A specification. Here's how the testing process works:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Testing Equipment Components:</h4>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Missile:</strong> A 20-pound cylindrical test object with a hemispherical striking surface</li>
              <li><strong>Accelerometer:</strong> Precision sensor that measures impact G-forces (typically accurate to ±2%)</li>
              <li><strong>Drop mechanism:</strong> Releases the missile from exactly 24 inches above the surface</li>
              <li><strong>Data collection system:</strong> Records and analyzes impact measurements in real-time</li>
              <li><strong>Calibration verification:</strong> Professional equipment costs $15,000+ and requires annual calibration certification</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Testing Process</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            A complete GMAX field test typically takes 60 to 90 minutes and follows this process:
          </p>

          <ol className="space-y-4 mb-8 text-gray-700">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <strong>Pre-test Preparation:</strong> Technician verifies weather conditions are appropriate (temperature between 41°F-120°F, no precipitation, surface dry) and equipment is properly calibrated.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <strong>Location Marking:</strong> Ten standardized test locations are marked across the field according to ASTM F1936 specifications, ensuring even coverage of high-use areas.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <strong>Impact Testing:</strong> At each location, the 20-pound missile is dropped three times from exactly 24 inches. The accelerometer measures maximum G-force on each impact.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <strong>Data Recording:</strong> Results are recorded for each drop. The highest of the three readings at each location is used as that location's GMAX score.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
              <div>
                <strong>Analysis & Reporting:</strong> Technician analyzes all results, creates a comprehensive report with field diagram, scores at each location, pass/fail determination, and recommendations.
              </div>
            </li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-blue-900">
              <strong>Professional Difference:</strong> While basic "homemade" drop tests exist, only ASTM F355-A compliant equipment provides accurate, defensible, insurance-acceptable results. Professional-grade equipment costs $15,000 to $25,000 and requires annual calibration certification to ensure accuracy.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Weather and Environmental Requirements</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            GMAX test results can be significantly affected by environmental conditions. For valid, comparable results, testing must be conducted under specific conditions:
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Temperature:</strong> Between 41°F and 120°F (ASTM requirement)</li>
            <li><strong>Surface Condition:</strong> Dry (no precipitation within 2-4 hours before testing)</li>
            <li><strong>Infill Condition:</strong> Not frozen or saturated with water</li>
            <li><strong>Testing Time:</strong> Ideally during moderate temperatures (60°F-85°F) for most consistent results</li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            These requirements ensure that your test results accurately reflect normal playing conditions and can be compared to previous tests or industry standards.
          </p>

          <Link href="/schedule-assessment">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2">
              <span>Schedule Professional GMAX Testing</span>
              <Shield className="w-5 h-5" />
            </button>
          </Link>
        </section>

        {/* ASTM F1936 Standard */}
        <section id="astm-standard" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">ASTM F1936 Standard Explained</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            ASTM F1936 is the industry standard specification for testing impact attenuation of athletic playing surfaces. Published by ASTM International, this standard defines exactly how GMAX testing must be performed to ensure consistent, comparable results.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Key Requirements</h3>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <ul className="space-y-3 text-gray-700">
              <li><strong>10 Test Locations:</strong> Fields must be tested at 10 standardized locations covering high-traffic areas</li>
              <li><strong>Test Method:</strong> Three drops per location from 24 inches using 20-pound missile</li>
              <li><strong>Pass/Fail Criteria:</strong> Maximum 200 G at any single location (critical safety threshold)</li>
              <li><strong>Equipment Standard:</strong> ASTM F355-A compliant testing device with annual calibration</li>
              <li><strong>Environmental Conditions:</strong> Temperature 41°F-120°F, dry surface conditions</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Why 200 G is the Critical Limit</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Research demonstrates that impact forces above 200 G significantly increase the risk of serious head injury. The 200 G threshold represents the maximum acceptable impact force for safe athletic play. Fields exceeding this limit pose a life-threatening risk and should be closed immediately.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            However, leading organizations like the Synthetic Turf Council recommend a more conservative guideline of <strong>165 G maximum</strong> for optimal player safety and injury prevention.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Who Requires ASTM F1936 Compliance?</h3>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Field Warranties:</strong> Most manufacturers require annual ASTM testing to maintain warranty coverage</li>
            <li><strong>Insurance Providers:</strong> School liability insurance may require documented safety testing</li>
            <li><strong>Duty of Care:</strong> Athletic directors have legal obligation to ensure safe playing conditions</li>
            <li><strong>Grant Requirements:</strong> Some facility funding sources mandate ongoing safety verification</li>
          </ul>
        </section>

        {/* Legal Liability */}
        <section id="legal-liability" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Liability & Duty of Care</h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
            <p className="text-yellow-900">
              <strong>Athletic Director's Legal Obligation:</strong> As an athletic director, you have a duty of care to provide reasonably safe playing conditions for student-athletes. Failure to monitor and maintain field safety can result in personal and district liability.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How Testing Protects Your District</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Regular GMAX testing provides critical legal protection in three ways:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Documentation</h4>
              <p className="text-gray-700">Professional testing creates documented evidence of proactive safety monitoring and duty of care.</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <FileText className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Early Detection</h4>
              <p className="text-gray-700">Identifies safety issues before injuries occur, allowing preventive action rather than reactive response.</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Compliance</h4>
              <p className="text-gray-700">Demonstrates adherence to industry standards and insurance requirements.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Cost of Not Testing</h3>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-8 h-8 text-red-600" />
              <h4 className="text-xl font-bold text-red-900">Financial Risk Analysis</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-red-700 mb-1">Annual GMAX Testing</p>
                <p className="text-3xl font-bold text-red-900">$750</p>
              </div>
              <div>
                <p className="text-sm text-red-700 mb-1">Average Injury Settlement</p>
                <p className="text-3xl font-bold text-red-900">$2M+</p>
              </div>
              <div>
                <p className="text-sm text-red-700 mb-1">Emergency Field Replacement</p>
                <p className="text-3xl font-bold text-red-900">$600K</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Districts that maintain regular testing records have successfully defended against injury lawsuits by demonstrating proactive safety management. Conversely, districts without testing documentation face significantly higher liability exposure and settlement costs.
          </p>

          <Link href="/partnerships" className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium mb-8">
            <span>Learn about our insurance partnerships</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </section>

        {/* Testing Frequency */}
        <section id="testing-frequency" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Testing Frequency Guidelines</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            How often you should test your athletic field depends on several factors including sport type, usage hours, climate, and field age.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Industry Standards</h3>

          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4 font-bold text-gray-900">Sport/Usage</th>
                  <th className="text-left p-4 font-bold text-gray-900">Recommended Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-4 text-gray-700">Football (Primary Sport)</td>
                  <td className="p-4 text-gray-700"><strong>Bi-Annual</strong> (Pre-season + Mid-season)</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700">Soccer/Lacrosse (Primary)</td>
                  <td className="p-4 text-gray-700"><strong>Annual</strong> (Pre-season)</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700">Multi-Sport (Year-Round)</td>
                  <td className="p-4 text-gray-700"><strong>Quarterly</strong> (Every 3 months)</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700">Low Usage (&lt;20 hrs/week)</td>
                  <td className="p-4 text-gray-700"><strong>Annual</strong></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700">High Usage (40+ hrs/week)</td>
                  <td className="p-4 text-gray-700"><strong>Quarterly</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Texas Climate Considerations</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Texas heat significantly accelerates field degradation. Surface temperatures can exceed 160°F in summer, breaking down infill rubber and reducing shock absorption. Consider testing:
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Post-Summer:</strong> Test after hottest months (September/October) to assess heat damage</li>
            <li><strong>Pre-Season:</strong> Test before fall sports begin to ensure safe conditions</li>
            <li><strong>After Severe Weather:</strong> Test following heat waves, freezes, or major storms</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-blue-900">
              <strong>Pro Tip:</strong> Schedule testing at the same time each year to track degradation trends. Consistent timing allows you to compare results year-over-year and predict when major maintenance will be needed.
            </p>
          </div>
        </section>

        {/* Understanding Scores */}
        <section id="understanding-scores" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding GMAX Scores: What the Numbers Mean</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            GMAX scores range from approximately 80 G (very soft, like natural grass) to 200+ G (dangerously hard). Here's how to interpret your test results and take appropriate action:
          </p>

          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-bold text-green-900">80-115 G: EXCELLENT</h4>
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">IDEAL</span>
              </div>
              <p className="text-green-800 mb-2">
                Comparable to natural grass. Provides optimal shock absorption and player protection.
              </p>
              <p className="text-green-700 font-medium">✓ Action: Continue regular maintenance and annual testing</p>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-r-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-bold text-yellow-900">116-165 G: GOOD</h4>
                <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm font-bold">ACCEPTABLE</span>
              </div>
              <p className="text-yellow-800 mb-2">
                Meets Synthetic Turf Council guidelines. Safe for play but monitor for trends.
              </p>
              <p className="text-yellow-700 font-medium">✓ Action: Schedule increased maintenance; test again in 6 months</p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-bold text-orange-900">166-199 G: MONITOR</h4>
                <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-bold">ACTION REQUIRED</span>
              </div>
              <p className="text-orange-800 mb-2">
                Below optimal safety. Increased injury risk. Immediate maintenance required.
              </p>
              <p className="text-orange-700 font-medium">⚠ Action: Decompaction, infill addition, or remediation within 30 days; retest after repairs</p>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-bold text-red-900">200+ G: CRITICAL</h4>
                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold">CLOSE FIELD</span>
              </div>
              <p className="text-red-800 mb-2">
                FAILS ASTM F1936 standard. Life-threatening injury risk. Do not allow play.
              </p>
              <p className="text-red-700 font-medium">🚨 Action: Close field immediately; contact testing provider and field manufacturer; emergency remediation required</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Common Remediation Options</h3>

          <ul className="space-y-3 mb-8 text-gray-700">
            <li><strong>Decompaction ($2,000-$5,000):</strong> Mechanical loosening of compacted infill to restore cushioning</li>
            <li><strong>Infill Addition ($5,000-$15,000):</strong> Adding new rubber or sand infill to improve shock absorption</li>
            <li><strong>Shock Pad Replacement ($50,000-$150,000):</strong> Replacing underlying cushion layer if deteriorated</li>
            <li><strong>Field Replacement ($500,000-$800,000):</strong> Complete field replacement if beyond repair</li>
          </ul>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Early detection through regular testing allows for lower-cost remediation options. Waiting until a field fails catastrophically often requires complete replacement.
          </p>

          <Link href="/schedule-assessment">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center space-x-2">
              <span>Get Your Field Tested Today</span>
              <TrendingUp className="w-5 h-5" />
            </button>
          </Link>
        </section>

        {/* Warning Signs */}
        <section id="warning-signs" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">7 Warning Signs Your Field Needs Testing Now</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Don't wait for your scheduled testing if you notice any of these red flags:
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">1. Visible Hard Spots or Uneven Surfaces</h4>
                <p className="text-gray-700">Areas that feel noticeably harder underfoot or show visible compaction, especially in high-traffic zones like hash marks and goal areas.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">2. Infill Migration to Edges and Seams</h4>
                <p className="text-gray-700">Rubber or sand infill accumulating along sidelines, end zones, or seams, leaving playing surface thin and exposed.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">3. Player Complaints About Hardness</h4>
                <p className="text-gray-700">Athletes reporting the field feels harder than usual or comparing it unfavorably to other fields.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">4. Increased Injury Reports</h4>
                <p className="text-gray-700">Uptick in impact-related injuries, especially concussions, contusions, or complaints of soreness after practices.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">5. Field Age Over 5 Years Without Testing</h4>
                <p className="text-gray-700">If your field is more than 5 years old and has never been tested, degradation has almost certainly occurred.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">6. Severe Weather Events</h4>
                <p className="text-gray-700">Extended heat waves (100°F+ for weeks), hard freezes, major storms, or flooding can dramatically affect field hardness.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">7. Failed or Borderline Previous Test</h4>
                <p className="text-gray-700">If your last test showed scores in the 150-165 G range, retest within 6 months to monitor trends.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <p className="text-yellow-900">
              <strong>When in doubt, test.</strong> A $750 test is a small investment compared to a career-ending injury or million-dollar lawsuit. If something doesn't feel right, trust your instincts and schedule professional testing.
            </p>
          </div>
        </section>

        {/* Choosing a Provider */}
        <section id="choosing-provider" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Choosing a GMAX Testing Provider</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Not all GMAX testing is created equal. Here's what to look for in a professional testing provider:
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Required Qualifications</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">ASTM F355-A Compliant Equipment</h4>
              <p className="text-gray-700 text-sm">Professional-grade testing device ($15K+) with annual calibration certification</p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Professional Liability Insurance</h4>
              <p className="text-gray-700 text-sm">Proof of coverage protecting your district from testing errors or equipment issues</p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Independence from Maintenance</h4>
              <p className="text-gray-700 text-sm">Provider should NOT sell maintenance services (conflict of interest)</p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">School District Experience</h4>
              <p className="text-gray-700 text-sm">Understanding of athletic programs, compliance requirements, and budget constraints</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Red Flags to Avoid</h3>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-red-600 font-bold">✗</span>
              <span>Self-testing by field maintenance company (conflict of interest)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-600 font-bold">✗</span>
              <span>No proof of equipment calibration or certification</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-600 font-bold">✗</span>
              <span>Pressure to purchase additional services during testing</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-600 font-bold">✗</span>
              <span>Results provided verbally without detailed written report</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-600 font-bold">✗</span>
              <span>Price significantly below market rate ($750 is typical)</span>
            </li>
          </ul>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Action Plan for Field Safety</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Protecting your student-athletes through professional GMAX testing is one of the most important decisions you'll make as an athletic director. Here's how to get started:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">This Week</div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Check when field was last tested</li>
                <li>✓ Review field warranty requirements</li>
                <li>✓ Inspect for visible warning signs</li>
                <li>✓ Download compliance checklist</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">This Month</div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Schedule GMAX testing</li>
                <li>✓ Verify testing provider qualifications</li>
                <li>✓ Notify insurance provider of testing</li>
                <li>✓ Budget for annual testing</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">This Year</div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Establish regular testing schedule</li>
                <li>✓ Create field maintenance program</li>
                <li>✓ Document all testing results</li>
                <li>✓ Train staff on safety monitoring</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">The Bottom Line</h3>

          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            For less than $1,000 per year, you can ensure your athletic fields meet safety standards, protect your student-athletes from preventable injuries, demonstrate duty of care, and defend your district against liability.
          </p>

          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            The question isn't whether you can afford to test your fields. It's whether you can afford NOT to.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-gray-700 mb-6">
              Schedule your professional GMAX field assessment today. Our certified technicians will test your field, provide a comprehensive report, and recommend any necessary remediation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule-assessment">
                <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Assessment</span>
                </button>
              </Link>
              <Link href="/services/gmax-testing">
                <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2 border-2 border-green-600">
                  <FileText className="w-5 h-5" />
                  <span>Learn More</span>
                </button>
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              ✓ ASTM-Certified Equipment | ✓ Professional Liability Coverage | ✓ 20+ Years Experience
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How much does GMAX testing cost?</h3>
              <p className="text-gray-700">
                Professional GMAX testing typically costs between $750-$1,500 per field, depending on field size, location, and testing frequency. Annual monitoring programs with multiple tests per year often have discounted rates. This investment is minimal compared to the $2M+ potential liability from an untested field or the $500K-$800K cost of emergency field replacement.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How long does GMAX testing take?</h3>
              <p className="text-gray-700">
                A complete GMAX field test takes 60-90 minutes from setup to completion. This includes marking the 10 test locations, conducting three drops at each location (30 total impacts), recording data, and preliminary analysis. You'll receive a comprehensive written report within 24-48 hours showing results at each location and recommendations.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GMAX score means my field is unsafe?</h3>
              <p className="text-gray-700">
                Any location scoring 200 G or higher FAILS ASTM F1936 and poses a life-threatening injury risk—the field should be closed immediately. Scores of 166-199 G require urgent action within 30 days. The Synthetic Turf Council recommends staying below 165 G for optimal safety. Scores of 80-115 G are ideal and comparable to natural grass.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I do GMAX testing myself or use my maintenance company?</h3>
              <p className="text-gray-700">
                No. Valid GMAX testing requires ASTM F355-A compliant equipment ($15,000+) with annual calibration certification, professional training, and liability insurance. Testing by your maintenance company creates a conflict of interest and may not be accepted by insurance or in legal proceedings. Independent third-party testing provides objective, defensible results.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How often should schools test their fields?</h3>
              <p className="text-gray-700">
                Minimum annual testing is recommended for all fields. High-use football fields should be tested bi-annually (pre-season and mid-season). Multi-sport fields with year-round use benefit from quarterly testing. Texas fields should be tested post-summer to assess heat damage. Always test after severe weather events or if players report hardness concerns.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does weather affect GMAX test scores?</h3>
              <p className="text-gray-700">
                Yes, significantly. Testing must be done between 41°F-120°F on a dry surface. Frozen infill tests much harder (higher scores), while heat-softened rubber tests softer (lower scores). Rain or irrigation can temporarily affect results. This is why testing should be done during moderate temperatures and compared year-over-year at similar times for accurate trend analysis.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What happens if my field fails GMAX testing?</h3>
              <p className="text-gray-700">
                If any location scores 200+ G, close the field immediately and contact your testing provider and field manufacturer. Common remediation options include decompaction ($2K-$5K), infill addition ($5K-$15K), shock pad replacement ($50K-$150K), or complete field replacement if beyond repair. Your testing provider should recommend the most cost-effective solution and can coordinate retesting after repairs.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is GMAX testing required by law in Texas?</h3>
              <p className="text-gray-700">
                While not explicitly mandated by Texas state law, athletic directors have a legal duty of care to provide reasonably safe playing conditions. Many field warranties require annual testing, and insurance providers may require documented safety monitoring. Professional liability protection and demonstrating reasonable care make regular GMAX testing a best practice and practical necessity for Texas schools.
              </p>
            </div>
          </div>
        </section>

      </article>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 py-16 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect Your Athletes and Your District?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Schedule a professional GMAX field assessment today. Our certified technicians use $15,000+ calibrated equipment to provide accurate, defensible results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule-assessment">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Schedule Assessment</span>
              </button>
            </Link>
            <Link href="tel:+1234567890">
              <button className="bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center space-x-2 border-2 border-white">
                <Phone className="w-5 h-5" />
                <span>Call for Quote</span>
              </button>
            </Link>
          </div>
          <p className="text-green-100 mt-6">
            ✓ 20+ Years Experience | ✓ ASTM-Certified Equipment | ✓ Professional Liability Coverage
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Field Health Systems</h3>
              <p className="text-gray-400 text-sm">
                Professional athletic field testing and management platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/resources" className="hover:text-white">Guides</Link></li>
                <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/team" className="hover:text-white">About</Link></li>
                <li><Link href="/partnerships" className="hover:text-white">Partnerships</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Field Health Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
