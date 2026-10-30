import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Synthetic Turf Field Testing in Texas | Field Health Systems',
  description: 'Independent synthetic turf field testing for Texas schools, colleges and municipalities, based in the Dallas-Fort Worth area and serving the state.',
  path: '/service-areas/texas',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
