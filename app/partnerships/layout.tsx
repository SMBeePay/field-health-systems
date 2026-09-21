import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner With Field Health Systems | Reduce Field-Related Claims',
  description: 'Insurance carriers and risk managers: partner with Field Health Systems to reduce field-related injury claims through independent artificial turf testing.',
  keywords: 'artificial turf testing partnership, insurance risk management turf, field liability reduction, turf testing partner program',
  openGraph: {
    title: 'Partner With Field Health Systems | Reduce Field-Related Claims',
    description: 'Insurance carriers and risk managers: partner with Field Health Systems to reduce field-related injury claims through independent artificial turf testing.',
    url: 'https://www.fieldhealthsystems.com/partnerships',
    type: 'website',
    images: [{
      url: 'https://www.fieldhealthsystems.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Partner With Field Health Systems | Reduce Field-Related Claims'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner With Field Health Systems | Reduce Field-Related Claims',
    description: 'Insurance carriers and risk managers: partner with Field Health Systems to reduce field-related injury claims through independent artificial turf testing.'
  },
  alternates: {
    canonical: 'https://www.fieldhealthsystems.com/partnerships'
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
