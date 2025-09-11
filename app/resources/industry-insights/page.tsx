import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sports Surface Industry Insights & Trends | Field Health Systems",
  description: "Latest industry trends, market insights, and professional perspectives on artificial turf technology, safety innovations, and field management best practices.",
  keywords: "artificial turf industry trends, sports surface technology, field management insights, synthetic turf innovations, athletic field industry analysis",
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/resources/industry-insights"
  }
}

const industryInsights = [
  {
    title: "2024 Artificial Turf Safety Standards Update",
    description: "Latest changes to ASTM testing standards and their impact on field safety requirements, compliance protocols, and maintenance practices.",
    href: "/resources/industry-insights/safety-standards/2024-astm-updates",
    category: "Safety Standards",
    readTime: "6 min read",
    featured: true,
    icon: "📋"
  },
  {
    title: "Future of Sports Surface Technology",
    description: "Emerging innovations in artificial turf materials, smart field monitoring systems, and next-generation safety technologies.",
    href: "/resources/industry-insights/technology/future-sports-surface-tech",
    category: "Technology",
    readTime: "8 min read",
    icon: "🚀"
  },
  {
    title: "Athletic Field Budget Trends 2024",
    description: "Analysis of maintenance spending patterns, cost optimization strategies, and budget allocation trends across educational institutions.",
    href: "/resources/industry-insights/budget-trends/athletic-field-budget-2024",
    category: "Budget Trends",
    readTime: "7 min read",
    icon: "📊"
  },
  {
    title: "Environmental Impact & Sustainability",
    description: "Current research on environmental considerations for artificial turf, recycling initiatives, and sustainable field management practices.",
    href: "/resources/industry-insights/sustainability/environmental-impact-sustainability",
    category: "Sustainability",
    readTime: "9 min read",
    icon: "🌱"
  }
]

const industryStats = [
  {
    stat: "12,000+",
    description: "Artificial turf fields installed in US schools",
    icon: "🏫"
  },
  {
    stat: "89%",
    description: "Schools report improved field availability with synthetic turf",
    icon: "📈"
  },
  {
    stat: "$2.8B",
    description: "Global artificial turf market size in 2024",
    icon: "💰"
  },
  {
    stat: "15-20 years",
    description: "Expected lifespan of modern artificial turf systems",
    icon: "⏰"
  }
]

export default function IndustryInsightsPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/resources" className="text-green-600 hover:text-green-700">Resources</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">Industry Insights</span>
      </nav>

      <div className="max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Sports Surface Industry Insights
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Stay informed with the latest trends, innovations, and professional insights in the artificial 
            turf and sports surface industry. From safety standard updates to emerging technologies, 
            access expert analysis and data-driven perspectives that shape the future of athletic field management.
          </p>
        </header>

        {/* Industry Statistics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Industry at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats.map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <span className="text-3xl block mb-3">{stat.icon}</span>
                <div className="text-2xl font-bold text-green-600 mb-2">{stat.stat}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Insight */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <span className="text-4xl flex-shrink-0">📋</span>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded">
                    Featured Insight
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2024 Artificial Turf Safety Standards Update
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Critical updates to ASTM testing protocols that affect field safety compliance, 
                  maintenance requirements, and testing frequency. Essential reading for facility managers 
                  and athletic directors planning field assessments.
                </p>
                <Link 
                  href="/resources/industry-insights/safety-standards/2024-astm-updates"
                  className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Read Full Analysis
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Insight Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Industry Insight Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link 
              href="/resources/industry-insights/safety-standards"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">🛡️</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Standards</h3>
              <p className="text-gray-600 text-sm">Updates on testing protocols and compliance requirements</p>
            </Link>

            <Link 
              href="/resources/industry-insights/technology"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">💻</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Technology</h3>
              <p className="text-gray-600 text-sm">Innovations in materials and monitoring systems</p>
            </Link>

            <Link 
              href="/resources/industry-insights/budget-trends"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">📈</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Trends</h3>
              <p className="text-gray-600 text-sm">Market analysis and spending pattern insights</p>
            </Link>

            <Link 
              href="/resources/industry-insights/sustainability"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">🌱</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">Environmental impact and green innovations</p>
            </Link>
          </div>
        </section>

        {/* All Insights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Industry Insights</h2>
          
          <div className="space-y-6">
            {industryInsights.map((insight, index) => {
              const cardClasses = insight.featured 
                ? "bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200" 
                : "bg-white border border-gray-200"
              
              return (
                <Link 
                  key={index}
                  href={insight.href}
                  className={`block rounded-lg p-6 hover:shadow-lg transition-all ${cardClasses}`}
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          insight.featured 
                            ? 'text-blue-600 bg-blue-100' 
                            : 'text-green-600 bg-green-100'
                        }`}>
                          {insight.category}
                        </span>
                        <span className="text-xs text-gray-500">{insight.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Professional Network Section */}
        <section className="mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🤝 Professional Network Insights</h2>
            <p className="text-gray-600 mb-6">
              Connect with industry professionals and access exclusive insights from field managers, 
              athletic directors, and maintenance specialists across the country.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Professional members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Industry experts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">Monthly</div>
                <div className="text-sm text-gray-600">New insights published</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Ahead of Industry Trends</h2>
          <p className="text-lg mb-6 opacity-90">
            Get expert insights, trend analysis, and professional perspectives delivered to help you 
            make informed decisions about field management and safety compliance.
          </p>
          <div className="space-x-4">
            <Link 
              href="/resources/industry-insights/safety-standards/2024-astm-updates"
              className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Read Latest Updates
            </Link>
            <Link 
              href="/contact"
              className="inline-block border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Get Industry Consultation
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}