import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Rotational Resistance (Shear) Testing for Turf | Field Health Systems',
  description: 'Independent rotational resistance (shear) testing for synthetic turf, measured on site at mapped points and reported alongside Gmax and infill depth.',
  path: '/services/shear-factor-testing',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
