import type { Metadata } from 'next'
import { MarketingNav } from '@/components/layout/marketing-nav'

export const metadata: Metadata = {
  title: "Artificial Turf Resources & Guides | Field Health Systems",
  description: "Comprehensive resources for artificial turf maintenance, GMAX testing, cost analysis, and industry insights. Expert guides, calculators, and tools to optimize your synthetic field performance and budget.",
  keywords: "artificial turf maintenance guide, synthetic turf resources, GMAX testing procedures, turf field cost analysis, artificial turf maintenance schedule, field testing equipment, turf maintenance best practices, synthetic field troubleshooting, artificial turf care tips, field health monitoring resources",
  openGraph: {
    title: "Artificial Turf Resources & Expert Guides | Field Health Systems",
    description: "Access expert artificial turf maintenance guides, cost calculators, testing procedures, and industry insights. Comprehensive resources to optimize field performance and extend turf life.",
    url: "https://www.fieldhealthsystems.com/resources",
    type: "website",
    images: [
      {
        url: "https://www.fieldhealthsystems.com/resources-og.jpg",
        width: 1200,
        height: 630,
        alt: "Field Health Systems artificial turf resources and maintenance guides"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Turf Resources & Expert Guides",
    description: "Comprehensive guides for artificial turf maintenance, testing, and cost optimization. Expert resources to maximize field performance and safety."
  },
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/resources"
  }
}

interface ResourcesLayoutProps {
  children: React.ReactNode
}

export default function ResourcesLayout({ children }: ResourcesLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: '#F7FAFC' }}>
      <MarketingNav activePath="/resources" />
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4" aria-label="Resources Navigation">
            <a
              href="/resources"
              className="font-medium px-3 py-2 rounded-md"
              style={{ color: '#1F8A8A' }}
            >
              All Resources
            </a>
            <a
              href="/resources/maintenance"
              className="text-gray-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
              style={{}}
            >
              Maintenance
            </a>
            <a
              href="/resources/testing"
              className="text-gray-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Testing
            </a>
            <a
              href="/resources/cost-analysis"
              className="text-gray-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Cost Analysis
            </a>
            <a
              href="/resources/industry-insights"
              className="text-gray-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Industry Insights
            </a>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
