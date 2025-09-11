'use client'

import Link from 'next/link'

// Analytics tracking function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

const trackResourceClick = (resourceName: string, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'resource_click', {
      event_category: 'Resource Engagement',
      event_label: resourceName,
      resource_category: category,
      page_location: window.location.href
    })
  }
}

interface ResourceCard {
  title: string
  description: string
  href: string
  category: string
  readTime: string
  featured?: boolean
  icon: string
}

const featuredResources: ResourceCard[] = [
  {
    title: "Sports Surface Testing Education Hub",
    description: "Complete educational resource for athletic field safety testing, ASTM compliance, and sports surface maintenance. Professional guides for athletic directors, facility managers, and maintenance teams.",
    href: "/resources/testing/education-hub",
    category: "Testing",
    readTime: "Education Center",
    featured: true,
    icon: "🎓"
  },
  {
    title: "Complete Artificial Turf Maintenance Guide",
    description: "Comprehensive guide covering all aspects of artificial turf maintenance, from daily cleaning to seasonal deep maintenance. Reduce field repairs by 73% with proper care.",
    href: "/resources/maintenance/guides/artificial-turf-maintenance-complete-guide",
    category: "Maintenance",
    readTime: "12 min read",
    featured: true,
    icon: "🔧"
  },
  {
    title: "GMAX Testing Complete Guide", 
    description: "Everything you need to know about GMAX testing procedures, equipment requirements, and regulatory compliance for artificial turf fields.",
    href: "/resources/testing/gmax/gmax-testing-complete-guide",
    category: "Testing",
    readTime: "8 min read",
    featured: true,
    icon: "📊"
  }
]

const allResources: ResourceCard[] = [
  {
    title: "Synthetic Field Cleaning Procedures",
    description: "Step-by-step cleaning protocols for different types of artificial turf systems and contamination levels.",
    href: "/resources/maintenance/guides/synthetic-field-cleaning-procedures",
    category: "Maintenance",
    readTime: "6 min read",
    icon: "🧹"
  },
  {
    title: "Maintenance Schedule Templates",
    description: "Downloadable maintenance schedule templates for quarterly, seasonal, and annual turf field care planning.",
    href: "/resources/maintenance/schedules/maintenance-schedule-templates",
    category: "Maintenance", 
    readTime: "Download",
    icon: "📅"
  },
  {
    title: "Common Turf Problems & Solutions",
    description: "Visual guide to diagnosing and solving the most common artificial turf field issues before they become costly repairs.",
    href: "/resources/maintenance/troubleshooting/common-turf-problems-solutions",
    category: "Maintenance",
    readTime: "10 min read",
    icon: "🔍"
  },
  {
    title: "Field Testing Protocols",
    description: "Standardized testing procedures for comprehensive artificial turf field assessment and safety compliance.",
    href: "/resources/testing/procedures/field-testing-protocols", 
    category: "Testing",
    readTime: "7 min read",
    icon: "📋"
  },
  {
    title: "Testing Equipment Reviews",
    description: "Comprehensive reviews and comparisons of artificial turf testing equipment, from handheld devices to professional systems.",
    href: "/resources/testing/equipment/testing-equipment-reviews",
    category: "Testing",
    readTime: "15 min read", 
    icon: "⚙️"
  },
  {
    title: "Annual Budget Templates",
    description: "Comprehensive budget planning templates for artificial turf maintenance, testing, and emergency repairs.",
    href: "/resources/cost-analysis/budgeting/annual-budget-templates",
    category: "Cost Analysis",
    readTime: "Download",
    icon: "📊"
  }
]

function ResourceCard({ resource }: { resource: ResourceCard }) {
  const cardClasses = resource.featured 
    ? "bg-gradient-to-br from-green-50 to-blue-50 border-green-200 hover:from-green-100 hover:to-blue-100" 
    : "bg-white border-gray-200 hover:bg-gray-50"

  return (
    <Link 
      href={resource.href}
      onClick={() => trackResourceClick(resource.title, resource.category)}
      className={`block p-6 rounded-lg border-2 transition-colors duration-200 ${cardClasses}`}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700">
            {resource.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {resource.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function ResourcesPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Artificial Turf Resources",
            "description": "Comprehensive collection of artificial turf maintenance guides, testing procedures, and cost analysis tools.",
            "url": "https://www.fieldhealthsystems.com/resources",
            "provider": {
              "@type": "Organization",
              "name": "Field Health Systems",
              "url": "https://www.fieldhealthsystems.com"
            },
            "hasPart": featuredResources.map(resource => ({
              "@type": "Article",
              "name": resource.title,
              "description": resource.description,
              "url": `https://www.fieldhealthsystems.com${resource.href}`
            }))
          })
        }}
      />

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Artificial Turf Resources
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Expert guides, calculators, and tools to help you maintain, test, and optimize your artificial turf fields. 
          From daily maintenance to long-term planning, find everything you need to maximize field performance and safety.
        </p>
      </div>

      {/* Featured Resources */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Resources</h2>
          <div className="ml-4 flex-grow h-px bg-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </section>

      {/* Resource Categories */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
          <div className="ml-4 flex-grow h-px bg-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            href="/resources/maintenance"
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <div className="text-center">
              <span className="text-4xl block mb-3">🔧</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maintenance</h3>
              <p className="text-sm text-gray-600">Cleaning, care, and maintenance schedules for optimal field performance</p>
            </div>
          </Link>
          
          <Link 
            href="/resources/testing"
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <div className="text-center">
              <span className="text-4xl block mb-3">📊</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing</h3>
              <p className="text-sm text-gray-600">GMAX testing, safety compliance, and field assessment procedures</p>
            </div>
          </Link>
          
          <Link 
            href="/resources/cost-analysis"
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <div className="text-center">
              <span className="text-4xl block mb-3">💰</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Analysis</h3>
              <p className="text-sm text-gray-600">Budget calculators, ROI tools, and cost optimization strategies</p>
            </div>
          </Link>
          
          <Link 
            href="/resources/industry-insights"
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <div className="text-center">
              <span className="text-4xl block mb-3">📈</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Insights</h3>
              <p className="text-sm text-gray-600">Standards, regulations, case studies, and industry trends</p>
            </div>
          </Link>
        </div>
      </section>

      {/* All Resources */}
      <section>
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Resources</h2>
          <div className="ml-4 flex-grow h-px bg-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Need Expert Field Assessment?</h2>
        <p className="text-lg mb-6 opacity-90">
          Get professional GMAX testing and comprehensive field health analysis from certified experts.
        </p>
        <Link 
          href="/contact"
          className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Schedule Consultation
        </Link>
      </section>
    </>
  )
}