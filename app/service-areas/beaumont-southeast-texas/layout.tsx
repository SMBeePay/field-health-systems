import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Artificial Turf Testing in Beaumont & Southeast Texas | Field Health Systems',
  description: 'Synthetic turf field testing in Beaumont & Southeast Texas: Gmax, rotational resistance, infill depth and digital condition reports for schools and municipalities.',
  path: '/service-areas/beaumont-southeast-texas',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
