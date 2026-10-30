import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Artificial Turf Testing in Austin, TX | Field Health Systems',
  description: 'Synthetic turf field testing in Austin: Gmax, rotational resistance, infill depth and digital condition reports for schools and municipalities.',
  path: '/service-areas/austin',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
