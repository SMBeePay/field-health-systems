import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artificial Turf Testing & Maintenance Blog | Field Health Systems',
  description: 'Field safety research, testing guides, and maintenance insights for artificial turf fields -- GMAX testing, ASTM compliance, and injury prevention.',
  keywords: 'artificial turf blog, turf testing articles, gmax testing, artificial turf maintenance, field safety',
  openGraph: {
    title: 'Artificial Turf Testing & Maintenance Blog | Field Health Systems',
    description: 'Field safety research, testing guides, and maintenance insights for artificial turf fields -- GMAX testing, ASTM compliance, and injury prevention.',
    url: 'https://www.fieldhealthsystems.com/blog',
    type: 'website',
    images: [{
      url: 'https://www.fieldhealthsystems.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Artificial Turf Testing & Maintenance Blog | Field Health Systems'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artificial Turf Testing & Maintenance Blog | Field Health Systems',
    description: 'Field safety research, testing guides, and maintenance insights for artificial turf fields -- GMAX testing, ASTM compliance, and injury prevention.'
  },
  alternates: {
    canonical: 'https://www.fieldhealthsystems.com/blog'
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
