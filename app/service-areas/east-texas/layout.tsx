import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Artificial Turf Testing in Tyler & East Texas | Field Health Systems',
  description: 'Synthetic turf field testing in Tyler & East Texas: Gmax, rotational resistance, infill depth and digital condition reports for schools and municipalities.',
  path: '/service-areas/east-texas',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
