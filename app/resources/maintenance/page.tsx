import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Artificial Turf Maintenance Resources | Field Health Systems",
  description: "Comprehensive maintenance guides, schedules, and troubleshooting resources for artificial turf fields. Expert procedures to extend field life and ensure optimal performance.",
  keywords: "artificial turf maintenance, synthetic field care, turf maintenance guides, field cleaning procedures, maintenance schedules, turf troubleshooting",
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/resources/maintenance"
  }
}

const maintenanceResources = [
  {
    title: "Complete Artificial Turf Maintenance Guide",
    description: "Comprehensive guide covering all aspects of artificial turf maintenance, from daily cleaning to seasonal deep maintenance.",
    href: "/resources/maintenance/guides/artificial-turf-maintenance-complete-guide",
    category: "Essential Guide",
    readTime: "12 min read",
    icon: "📖"
  },
  {
    title: "Synthetic Field Cleaning Procedures",
    description: "Step-by-step cleaning protocols for different types of artificial turf systems and contamination levels.",
    href: "/resources/maintenance/guides/synthetic-field-cleaning-procedures",
    category: "Procedures",
    readTime: "6 min read",
    icon: "🧹"
  },
  {
    title: "Maintenance Schedule Templates",
    description: "Downloadable maintenance schedule templates for quarterly, seasonal, and annual turf field care planning.",
    href: "/resources/maintenance/schedules/maintenance-schedule-templates",
    category: "Templates",
    readTime: "Download",
    icon: "📅"
  },
  {
    title: "Common Turf Problems & Solutions",
    description: "Visual guide to diagnosing and solving the most common artificial turf field issues before they become costly repairs.",
    href: "/resources/maintenance/troubleshooting/common-turf-problems-solutions",
    category: "Troubleshooting",
    readTime: "10 min read",
    icon: "🔍"
  }
]

export default function MaintenanceResourcesPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/resources" className="text-green-600 hover:text-green-700">Resources</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">Maintenance</span>
      </nav>

      <div className="max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Artificial Turf Maintenance Resources
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Professional maintenance guides, schedules, and troubleshooting resources to help you extend 
            field life, ensure player safety, and optimize your maintenance investment. From daily care 
            to seasonal deep maintenance, find everything you need to keep your artificial turf performing at its best.
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">73%</div>
            <div className="text-sm text-green-800">Reduction in emergency repairs with proper maintenance</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">40%</div>
            <div className="text-sm text-blue-800">Extended field life with consistent care protocols</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">$25K</div>
            <div className="text-sm text-orange-800">Average annual savings from preventive maintenance</div>
          </div>
        </div>

        {/* Resource Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Maintenance Resource Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link 
              href="/resources/maintenance/guides"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl block mb-3">📚</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maintenance Guides</h3>
              <p className="text-gray-600 text-sm">Comprehensive guides covering all aspects of turf care and maintenance</p>
            </Link>

            <Link 
              href="/resources/maintenance/schedules"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl block mb-3">📅</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedules & Planning</h3>
              <p className="text-gray-600 text-sm">Maintenance calendars, schedules, and planning templates</p>
            </Link>

            <Link 
              href="/resources/maintenance/troubleshooting"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl block mb-3">🔧</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Troubleshooting</h3>
              <p className="text-gray-600 text-sm">Problem diagnosis and solutions for common turf issues</p>
            </Link>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Maintenance Resources</h2>
          
          <div className="space-y-6">
            {maintenanceResources.map((resource, index) => (
              <Link 
                key={index}
                href={resource.href}
                className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <span className="text-2xl flex-shrink-0">{resource.icon}</span>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
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
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Professional Maintenance Assessment?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get expert evaluation of your current maintenance practices and develop a customized care plan 
            that maximizes field performance and minimizes costs.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Schedule Maintenance Consultation
          </Link>
        </section>
      </div>
    </>
  )
}