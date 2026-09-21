import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artificial Turf Field Safety Risks | Field Health Systems',
  description: 'Poorly maintained artificial turf fields create documented injury risks. See the data on surface impact and traction, and why independent testing matters.',
  keywords: 'artificial turf safety, turf field injury risk, gmax safety testing, artificial turf head injury risk, turf field liability',
  openGraph: {
    title: 'Artificial Turf Field Safety Risks | Field Health Systems',
    description: 'Poorly maintained artificial turf fields create documented injury risks. See the data on surface impact and traction, and why independent testing matters.',
    url: 'https://www.fieldhealthsystems.com/athlete-safety',
    type: 'website',
    images: [{
      url: 'https://www.fieldhealthsystems.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Artificial Turf Field Safety Risks | Field Health Systems'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artificial Turf Field Safety Risks | Field Health Systems',
    description: 'Poorly maintained artificial turf fields create documented injury risks. See the data on surface impact and traction, and why independent testing matters.'
  },
  alternates: {
    canonical: 'https://www.fieldhealthsystems.com/athlete-safety'
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
