import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Sports Surface Testing Education Hub | Field Safety & Compliance Resources",
  description: "Complete educational resource for athletic field safety testing, ASTM compliance, and sports surface maintenance. Professional guides for athletic directors, facility managers, and maintenance teams.",
  keywords: "sports surface testing, athletic field safety, ASTM F355A compliance, GMAX testing education, field safety standards, sports facility management, artificial turf testing, field maintenance training, athletic field compliance, sports surface safety",
  openGraph: {
    title: "Sports Surface Testing Education Hub | Professional Field Safety Resources",
    description: "Comprehensive educational resources for sports surface testing, field safety compliance, and athletic facility management. Expert guidance for protecting athletes and investments.",
    type: "website",
    images: [
      {
        url: "https://www.fieldhealthsystems.com/testing-education-hub-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sports surface testing education and field safety compliance resources"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Surface Testing Education Hub",
    description: "Professional education resources for athletic field safety, testing procedures, and compliance standards."
  },
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/resources/testing/education-hub"
  }
}

interface RoleCard {
  title: string
  subtitle: string
  description: string
  features: string[]
  href: string
  icon: string
}

interface ResourceCard {
  category: string
  title: string
  description: string
  items: string[]
  href: string
  icon: string
}

const roleCards: RoleCard[] = [
  {
    title: "Athletic Directors",
    subtitle: "Safety Compliance & Liability Protection",
    description: "Focus on protecting athletes while managing regulatory requirements and institutional liability.",
    features: [
      "ASTM compliance requirements and deadlines",
      "Safety threshold guidelines and monitoring", 
      "Liability protection through proper documentation",
      "Budget planning for testing and maintenance"
    ],
    href: "/resources/testing/education-hub/athletic-directors",
    icon: "🏟️"
  },
  {
    title: "Facility Managers", 
    subtitle: "Operational Excellence & Cost Management",
    description: "Optimize operations while controlling costs and ensuring consistent field performance.",
    features: [
      "Predictive maintenance planning guides",
      "Cost-benefit analysis tools and calculators",
      "Equipment specifications and calibration requirements",
      "Vendor evaluation criteria and best practices"
    ],
    href: "/resources/testing/education-hub/facility-managers",
    icon: "⚙️"
  },
  {
    title: "Maintenance Teams",
    subtitle: "Technical Procedures & Standards", 
    description: "Master the technical aspects of field testing and maintenance for optimal safety outcomes.",
    features: [
      "Step-by-step testing procedures and protocols",
      "Equipment operation and calibration guides",
      "Troubleshooting common field condition issues",
      "Professional development and certification resources"
    ],
    href: "/resources/testing/education-hub/maintenance-teams",
    icon: "🔧"
  }
]

const resourceCategories: ResourceCard[] = [
  {
    category: "Essential Testing Guides",
    title: "Master the fundamentals of professional field testing",
    description: "Comprehensive guides covering all aspects of sports surface testing and analysis.",
    items: [
      "Complete GMAX Testing Procedures Guide",
      "Shear Factor Analysis Explained", 
      "Infill Depth Monitoring Best Practices",
      "Equipment Calibration Standards"
    ],
    href: "/resources/testing/procedures",
    icon: "📊"
  },
  {
    category: "Compliance & Safety",
    title: "Stay ahead of requirements and protect your athletes",
    description: "Essential resources for maintaining safety compliance and regulatory adherence.",
    items: [
      "ASTM F355A & F1936 Compliance Checklist",
      "Safety Threshold Quick Reference",
      "Documentation Requirements Guide", 
      "Emergency Response Protocols"
    ],
    href: "/resources/testing/compliance",
    icon: "🛡️"
  },
  {
    category: "Industry Intelligence",
    title: "Stay informed with data-driven insights",
    description: "Research reports and trend analysis to inform strategic decision-making.",
    items: [
      "2024 Sports Surface Safety Trends Report",
      "Predictive Maintenance Cost Analysis",
      "Technology Evolution in Field Testing",
      "Regulatory Update Summaries"
    ],
    href: "/resources/industry-insights",
    icon: "📈"
  },
  {
    category: "Real-World Applications",
    title: "Learn from actual field testing scenarios", 
    description: "Case studies and practical examples from real facility management situations.",
    items: [
      "University Athletic Complex Case Study",
      "Municipal Recreation Center Success Story",
      "Professional Stadium Maintenance Planning",
      "Emergency Field Assessment Examples"
    ],
    href: "/resources/industry-insights/case-studies",
    icon: "🏛️"
  }
]

const interactiveTools = [
  {
    title: "Field Safety Assessment Calculator",
    description: "Input your current field conditions and get immediate safety analysis based on ASTM standards.",
    href: "/resources/cost-analysis/calculators/field-safety-assessment",
    icon: "🧮"
  },
  {
    title: "Maintenance Cost Predictor", 
    description: "Estimate future maintenance needs and costs based on current field testing data.",
    href: "/resources/cost-analysis/calculators/maintenance-cost-predictor",
    icon: "💰"
  },
  {
    title: "Compliance Timeline Tracker",
    description: "Never miss critical testing deadlines with our automated compliance calendar.",
    href: "/resources/testing/compliance/timeline-tracker",
    icon: "📅"
  },
  {
    title: "ROI Calculator for Professional Testing",
    description: "Quantify the value of professional testing versus in-house alternatives.",
    href: "/resources/cost-analysis/calculators/roi-calculator",
    icon: "📊"
  }
]

const gettingStartedSteps = [
  {
    step: "1",
    title: "Understand the Basics",
    description: "Review our Field Safety Fundamentals guide",
    href: "/resources/testing/fundamentals",
    icon: "📖"
  },
  {
    step: "2", 
    title: "Know Your Standards",
    description: "Download the ASTM Compliance Checklist",
    href: "/resources/testing/compliance/astm-checklist",
    icon: "📋"
  },
  {
    step: "3",
    title: "Assess Your Current Situation", 
    description: "Use our Field Safety Assessment Calculator",
    href: "/resources/cost-analysis/calculators/field-safety-assessment",
    icon: "🧮"
  },
  {
    step: "4",
    title: "Plan Your Approach",
    description: "Review our Maintenance Planning Guide",
    href: "/resources/maintenance/guides/maintenance-planning",
    icon: "📋"
  },
  {
    step: "5",
    title: "Connect with Experts",
    description: "Schedule a consultation for personalized guidance",
    href: "/contact",
    icon: "🤝"
  }
]

export default function TestingEducationHub() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Sports Surface Testing Education Hub",
            "description": "Comprehensive educational resource for athletic field safety testing and compliance",
            "url": "https://www.fieldhealthsystems.com/resources/testing/education-hub",
            "provider": {
              "@type": "Organization",
              "name": "Field Health Systems",
              "url": "https://www.fieldhealthsystems.com"
            },
            "educationalCredentialAwarded": "Sports Surface Testing Certification",
            "offers": {
              "@type": "Course",
              "name": "Sports Surface Testing Professional Development",
              "description": "Comprehensive training in athletic field safety testing and compliance"
            }
          })
        }}
      />

      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/resources" className="text-green-600 hover:text-green-700">Resources</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/resources/testing" className="text-green-600 hover:text-green-700">Testing</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">Education Hub</span>
      </nav>

      <article className="max-w-6xl">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sports Surface Testing Education Hub
          </h1>
          <p className="text-2xl text-green-600 font-semibold mb-8">
            Your Complete Resource for Athletic Field Safety & Compliance
          </p>
          
          <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed space-y-4">
            <p>
              When athlete safety is on the line, you need more than guesswork. You need data-driven insights 
              from independent experts who understand the real stakes of field management.
            </p>
            <p>
              Welcome to the most comprehensive educational resource for sports surface testing - where facility 
              managers, athletic directors, and maintenance professionals get the unbiased guidance they need to 
              protect athletes and investments.
            </p>
          </div>
        </header>

        {/* Why This Hub Exists */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why This Hub Exists</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Every week, we see facilities making critical safety decisions based on incomplete information. 
                A high school athletic director wondering if their field meets safety standards. A facility manager 
                trying to predict when expensive maintenance will be needed. A maintenance crew unsure about proper 
                testing procedures.
              </p>
              <p>
                <strong>These aren&apos;t just operational questions - they&apos;re about preventing injuries that could 
                change young athletes&apos; lives forever.</strong>
              </p>
              <p>
                That&apos;s why we&apos;ve created this comprehensive education center. No sales pitches. No product pushing. 
                Just the professional-grade knowledge you need to make informed decisions about field safety and maintenance.
              </p>
            </div>
          </div>
        </section>

        {/* Navigate by Role */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Navigate by Your Role</h2>
            <p className="text-lg text-gray-600">
              Get targeted resources and guidance designed specifically for your responsibilities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {roleCards.map((role, index) => (
              <Link 
                key={index}
                href={role.href}
                className="block bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-center mb-6">
                  <span className="text-4xl block mb-3">{role.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-green-600 font-semibold text-sm">{role.subtitle}</p>
                </div>
                
                <p className="text-gray-600 mb-6 text-center">{role.description}</p>
                
                <ul className="space-y-2">
                  {role.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
                      <span className="text-green-600 mr-2 font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Educational Resources */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Educational Resources</h2>
            <p className="text-lg text-gray-600">
              Comprehensive guides and tools covering every aspect of sports surface testing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                    <p className="text-sm text-green-600 font-medium">{category.title}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={category.href}
                  className="inline-block text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Explore {category.category} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Tools */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Tools & Calculators</h2>
            <p className="text-lg text-gray-600">
              Professional-grade tools to assess, plan, and optimize your field management approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interactiveTools.map((tool, index) => (
              <Link 
                key={index}
                href={tool.href}
                className="block bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 hover:from-blue-100 hover:to-green-100 transition-colors"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-4 flex-shrink-0">{tool.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Getting Started</h2>
            <p className="text-center text-gray-600 mb-8">
              New to sports surface testing? Follow this step-by-step approach:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {gettingStartedSteps.map((step, index) => (
                <Link 
                  key={index}
                  href={step.href}
                  className="block text-center bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {step.step}
                  </div>
                  <span className="text-lg block mb-2">{step.icon}</span>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Trust This Resource */}
        <section className="mb-16">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Trust This Resource?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This educational hub is maintained by Field Health Systems, the independent third-party testing 
                specialists who&apos;ve been protecting athletes and investments through professional field monitoring 
                for over a decade.
              </p>
              <p>
                <strong>We have no conflicts of interest</strong> - we don&apos;t sell field products or maintenance services. 
                We simply provide the unbiased, data-driven testing and analysis that helps you make informed decisions 
                about field safety and maintenance.
              </p>
              <p>
                Our professional-grade calibrated equipment and ASTM-compliant procedures ensure you&apos;re getting accurate, 
                reliable information you can trust when making critical safety decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-6 opacity-90">
              Field safety standards and best practices evolve constantly. Subscribe to our monthly updates to receive:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-200 mr-2">•</span>
                  New testing procedures and standards
                </li>
                <li className="flex items-center">
                  <span className="text-green-200 mr-2">•</span>
                  Industry trend analysis and insights
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-200 mr-2">•</span>
                  Regulatory changes and compliance updates
                </li>
                <li className="flex items-center">
                  <span className="text-green-200 mr-2">•</span>
                  Case studies and real-world applications
                </li>
              </ul>
            </div>

            <Link 
              href="/contact"
              className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Subscribe to Updates
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to protect your athletes and investment with professional field testing?
          </h2>
          
          <div className="space-x-4">
            <Link 
              href="/contact"
              className="inline-block bg-green-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg"
            >
              Schedule Your Initial Field Safety Assessment
            </Link>
          </div>
          
          <p className="text-gray-600 mt-6">
            Or explore our educational resources to build your expertise in sports surface testing and maintenance planning.
          </p>
        </section>
      </article>
    </>
  )
}