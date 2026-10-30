import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Infill Depth Testing for Synthetic Turf Fields | Field Health Systems',
  description: 'Infill depth measured at mapped points across your synthetic turf field, with a digital report showing where infill is low or uneven.',
  path: '/services/infill-depth-testing',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
