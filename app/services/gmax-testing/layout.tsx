import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Gmax Testing for Synthetic Turf Fields | Field Health Systems',
  description: 'Independent Gmax impact attenuation testing for synthetic turf fields, measured at mapped points and documented in a digital field condition report.',
  path: '/services/gmax-testing',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
