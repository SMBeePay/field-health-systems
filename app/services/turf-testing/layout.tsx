import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Artificial Turf Testing Services | Field Health Systems',
  description: 'Independent on-site artificial turf testing: Gmax impact attenuation, rotational resistance, infill depth and visual condition, documented in a digital report.',
  path: '/services/turf-testing',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
