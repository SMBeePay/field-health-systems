import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sports Surface Testing Resources | Field Health Systems",
  description: "Comprehensive testing guides, procedures, and compliance resources for artificial turf fields. GMAX testing, safety standards, and equipment information.",
  keywords: "sports surface testing, GMAX testing, artificial turf testing, field safety testing, ASTM compliance, synthetic field testing, turf testing equipment",
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/resources/testing"
  }
}

const testingResources = [
  {
    title: "Sports Surface Testing Education Hub",
    description: "Complete educational resource for athletic field safety testing, ASTM compliance, and sports surface maintenance. Professional guides for all roles.",
    href: "/resources/testing/education-hub",
    category: "Education Center",
    readTime: "Hub",
    featured: true,
    icon: "🎓"
  },
  {
    title: "GMAX Testing Complete Guide",
    description: "Everything you need to know about GMAX testing procedures, equipment requirements, and regulatory compliance for artificial turf fields.",
    href: "/resources/testing/gmax/gmax-testing-complete-guide",
    category: "GMAX Testing",
    readTime: "8 min read",
    icon: "📊"
  },
  {
    title: "Field Testing Protocols",
    description: "Standardized testing procedures for comprehensive artificial turf field assessment and safety compliance.",
    href: "/resources/testing/procedures/field-testing-protocols",
    category: "Procedures",
    readTime: "7 min read",
    icon: "📋"
  },
  {
    title: "Testing Equipment Reviews",
    description: "Comprehensive reviews and comparisons of artificial turf testing equipment, from handheld devices to professional systems.",
    href: "/resources/testing/equipment/testing-equipment-reviews",
    category: "Equipment",
    readTime: "15 min read",
    icon: "⚙️"
  }
]

export default function TestingResourcesPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/resources" className="text-green-600 hover:text-green-700">Resources</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">Testing</span>
      </nav>

      <div className="max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Sports Surface Testing Resources
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Professional testing guides, procedures, and compliance resources for artificial turf fields. 
            From GMAX testing to equipment selection, find everything you need to ensure field safety, 
            regulatory compliance, and optimal athletic performance.
          </p>
        </header>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">200G</div>
            <div className="text-sm text-red-800">Maximum GMAX reading for safe artificial turf</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">Quarterly</div>
            <div className="text-sm text-blue-800">Recommended GMAX testing frequency</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">ASTM</div>
            <div className="text-sm text-green-800">F355A & F1936 compliance standards</div>
          </div>
        </div>

        {/* Featured Resource - Education Hub */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <span className="text-4xl flex-shrink-0">🎓</span>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded">
                    Featured Resource
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Sports Surface Testing Education Hub
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your complete educational resource for athletic field safety testing and compliance. 
                  Comprehensive guides organized by role - Athletic Directors, Facility Managers, and Maintenance Teams.
                </p>
                <Link 
                  href="/resources/testing/education-hub"
                  className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Education Hub
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Testing Resource Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link 
              href="/resources/testing/gmax"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">📊</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GMAX Testing</h3>
              <p className="text-gray-600 text-sm">Complete GMAX testing procedures and compliance</p>
            </Link>

            <Link 
              href="/resources/testing/procedures"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">📋</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing Procedures</h3>
              <p className="text-gray-600 text-sm">Standardized protocols and methodologies</p>
            </Link>

            <Link 
              href="/resources/testing/equipment"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">⚙️</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Equipment</h3>
              <p className="text-gray-600 text-sm">Testing equipment reviews and specifications</p>
            </Link>

            <Link 
              href="/resources/testing/compliance"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">✅</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance</h3>
              <p className="text-gray-600 text-sm">Safety standards and regulatory requirements</p>
            </Link>
          </div>
        </section>

        {/* All Testing Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Testing Resources</h2>
          
          <div className="space-y-6">
            {testingResources.map((resource, index) => {
              const cardClasses = resource.featured 
                ? "bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200" 
                : "bg-white border border-gray-200"
              
              return (
                <Link 
                  key={index}
                  href={resource.href}
                  className={`block rounded-lg p-6 hover:shadow-lg transition-all ${cardClasses}`}
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-2xl flex-shrink-0">{resource.icon}</span>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          resource.featured 
                            ? 'text-blue-600 bg-blue-100' 
                            : 'text-green-600 bg-green-100'
                        }`}>
                          {resource.category}
                        </span>
                        <span className="text-xs text-gray-500">{resource.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Professional Field Testing?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get certified GMAX testing and comprehensive field safety assessment from independent 
            testing specialists. Ensure compliance and protect your athletes with professional testing services.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Schedule Professional Testing
          </Link>
        </section>
      </div>
    </>
  )
}