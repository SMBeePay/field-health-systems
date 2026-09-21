import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule a Professional Artificial Turf Field Assessment',
  description: 'Book independent GMAX, shear factor, infill depth, and field condition testing for your artificial turf fields. ASTM-compliant results, fast scheduling.',
  keywords: 'schedule artificial turf testing, book turf field assessment, gmax testing appointment, artificial turf testing services',
  openGraph: {
    title: 'Schedule a Professional Artificial Turf Field Assessment',
    description: 'Book independent GMAX, shear factor, infill depth, and field condition testing for your artificial turf fields. ASTM-compliant results, fast scheduling.',
    url: 'https://www.fieldhealthsystems.com/schedule-assessment',
    type: 'website',
    images: [{
      url: 'https://www.fieldhealthsystems.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Schedule a Professional Artificial Turf Field Assessment'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schedule a Professional Artificial Turf Field Assessment',
    description: 'Book independent GMAX, shear factor, infill depth, and field condition testing for your artificial turf fields. ASTM-compliant results, fast scheduling.'
  },
  alternates: {
    canonical: 'https://www.fieldhealthsystems.com/schedule-assessment'
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
