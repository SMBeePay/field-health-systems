import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Professional Artificial Turf Field Maintenance Services | Expert Testing & Monitoring",
  description: "Leading artificial turf maintenance and testing services. Professional GMAX testing, synthetic field monitoring, infill depth analysis, and predictive maintenance planning. Reduce field emergency repairs by 73% with expert quarterly assessments.",
  keywords: "artificial turf field maintenance, synthetic turf maintenance services, turf field testing, artificial grass maintenance, sports field maintenance companies, turf field monitoring, GMAX testing services, synthetic field inspection, artificial turf care, field maintenance contractors, turf field safety testing, sports surface maintenance, synthetic turf testing equipment, field health monitoring, artificial turf maintenance cost, turf field repair services, synthetic sports field maintenance, artificial turf maintenance schedule, turf field maintenance program, professional field testing",
  openGraph: {
    title: "Professional Artificial Turf Field Maintenance Services | Expert Testing & Monitoring",
    description: "Leading artificial turf maintenance and testing services. Professional GMAX testing, synthetic field monitoring, and predictive maintenance planning. Reduce field emergency repairs by 73%.",
    url: "https://fieldhealthsystems.com",
    type: "website",
    images: [
      {
        url: "https://fieldhealthsystems.com/services-og.jpg",
        width: 1200,
        height: 630,
        alt: "Professional artificial turf field maintenance and testing services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Artificial Turf Field Maintenance Services",
    description: "Expert GMAX testing, synthetic field monitoring, and predictive maintenance. Reduce emergency repairs by 73% with quarterly field health assessments."
  },
  alternates: {
    canonical: "https://fieldhealthsystems.com"
  }
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}