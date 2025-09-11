import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Field Maintenance Cost Analysis Tools | Field Health Systems",
  description: "Interactive calculators and budgeting tools for artificial turf maintenance costs. ROI analysis, budget templates, and cost optimization strategies.",
  keywords: "turf maintenance cost calculator, artificial turf budget planning, field maintenance ROI, synthetic turf cost analysis, maintenance cost optimization",
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/resources/cost-analysis"
  }
}

const costAnalysisTools = [
  {
    title: "Maintenance Cost Calculator",
    description: "Interactive calculator to estimate annual maintenance costs based on field size, age, usage, and testing frequency. Plan your budget with precision.",
    href: "/resources/cost-analysis/calculators/maintenance-cost-calculator",
    category: "Calculator",
    type: "Interactive Tool",
    icon: "💰"
  },
  {
    title: "ROI Analysis Tool",
    description: "Calculate the return on investment for professional maintenance programs versus reactive maintenance approaches.",
    href: "/resources/cost-analysis/calculators/roi-analysis-tool",
    category: "Calculator", 
    type: "Interactive Tool",
    icon: "📈"
  },
  {
    title: "Annual Budget Templates",
    description: "Comprehensive budget planning templates for artificial turf maintenance, testing, and emergency repairs.",
    href: "/resources/cost-analysis/budgeting/annual-budget-templates",
    category: "Template",
    type: "Download",
    icon: "📊"
  },
  {
    title: "Cost Comparison Guide",
    description: "Compare costs between different maintenance approaches, equipment options, and service provider arrangements.",
    href: "/resources/cost-analysis/budgeting/cost-comparison-guides",
    category: "Guide",
    type: "8 min read",
    icon: "📋"
  }
]

const costFactors = [
  {
    factor: "Field Size",
    impact: "Direct linear relationship",
    description: "Larger fields require proportionally more materials, labor, and time",
    icon: "📏"
  },
  {
    factor: "Usage Level",
    impact: "40-60% cost variation",
    description: "High-traffic fields need more frequent maintenance and faster wear replacement",
    icon: "⚽"
  },
  {
    factor: "Field Age",
    impact: "8-12% annual increase",
    description: "Older fields require more intensive maintenance and frequent repairs",
    icon: "📅"
  },
  {
    factor: "Climate Conditions",
    impact: "20-30% regional variation",
    description: "Weather patterns affect cleaning frequency and material degradation",
    icon: "🌦️"
  }
]

export default function CostAnalysisResourcesPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/resources" className="text-green-600 hover:text-green-700">Resources</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">Cost Analysis</span>
      </nav>

      <div className="max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Field Maintenance Cost Analysis
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Professional tools and resources to help you understand, budget, and optimize your artificial 
            turf maintenance costs. From interactive calculators to comprehensive budget templates, 
            make data-driven decisions that maximize your field investment.
          </p>
        </header>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">$0.15</div>
            <div className="text-sm text-green-800">Average cost per sq ft for annual maintenance</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">73%</div>
            <div className="text-sm text-blue-800">Reduction in emergency repairs with proper planning</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">5:1</div>
            <div className="text-sm text-orange-800">ROI of preventive vs reactive maintenance</div>
          </div>
        </div>

        {/* Featured Calculator */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-8">
            <div className="flex items-start space-x-4">
              <span className="text-4xl flex-shrink-0">💰</span>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded">
                    Featured Tool
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Maintenance Cost Calculator
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get instant estimates for your artificial turf maintenance costs based on field size, age, 
                  usage patterns, and testing frequency. Plan your budget with confidence using real industry data.
                </p>
                <Link 
                  href="/resources/cost-analysis/calculators/maintenance-cost-calculator"
                  className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Use Cost Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cost Analysis Resource Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link 
              href="/resources/cost-analysis/calculators"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">🧮</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculators</h3>
              <p className="text-gray-600 text-sm">Interactive tools for cost estimation and ROI analysis</p>
            </Link>

            <Link 
              href="/resources/cost-analysis/budgeting"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">📊</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Planning</h3>
              <p className="text-gray-600 text-sm">Templates and guides for comprehensive budget planning</p>
            </Link>

            <Link 
              href="/resources/cost-analysis/savings"
              className="p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">💡</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Optimization</h3>
              <p className="text-gray-600 text-sm">Strategies to reduce costs and maximize efficiency</p>
            </Link>
          </div>
        </section>

        {/* Cost Analysis Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cost Analysis Tools & Resources</h2>
          
          <div className="space-y-6">
            {costAnalysisTools.map((tool, index) => (
              <Link 
                key={index}
                href={tool.href}
                className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                      <span className="text-xs text-gray-500">{tool.type}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cost Factors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Cost Factors</h2>
          <p className="text-gray-600 mb-6">
            Understanding the primary factors that influence artificial turf maintenance costs helps you 
            budget more accurately and identify optimization opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {costFactors.map((factor, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl flex-shrink-0">{factor.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{factor.factor}</h3>
                    <p className="text-sm font-medium text-green-600 mb-2">{factor.impact}</p>
                    <p className="text-gray-600 text-sm">{factor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Optimization Tips */}
        <section className="mb-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">💡 Cost Optimization Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-900 mb-3">Preventive Maintenance</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Regular brushing reduces deep cleaning costs</li>
                  <li>• Quarterly testing prevents emergency repairs</li>
                  <li>• Seasonal inspections catch issues early</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-3">Bulk Purchasing</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Annual contracts reduce material costs 20-30%</li>
                  <li>• Shared purchasing with other facilities</li>
                  <li>• Off-season equipment purchases save 10-15%</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-3">Staff Training</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Proper technique reduces equipment damage</li>
                  <li>• Early problem detection saves repair costs</li>
                  <li>• Efficient processes reduce labor time</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-3">Data-Driven Decisions</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Track maintenance costs per square foot</li>
                  <li>• Monitor ROI of preventive programs</li>
                  <li>• Compare vendor performance annually</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Maintenance Costs?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get professional cost analysis and maintenance planning consultation to maximize your field 
            investment and minimize unexpected expenses.
          </p>
          <div className="space-x-4">
            <Link 
              href="/resources/cost-analysis/calculators/maintenance-cost-calculator"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Cost Calculator
            </Link>
            <Link 
              href="/contact"
              className="inline-block border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get Expert Analysis
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}