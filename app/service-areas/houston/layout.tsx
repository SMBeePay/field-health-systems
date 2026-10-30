import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Artificial Turf Testing in Houston, TX | Field Health Systems',
  description: 'Synthetic turf field testing in Houston: Gmax, rotational resistance, infill depth and digital condition reports for schools and municipalities.',
  path: '/service-areas/houston',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
