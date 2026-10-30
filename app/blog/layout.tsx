import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Synthetic Turf Testing & Field Safety Blog | Field Health Systems',
  description: 'Practical articles for athletic directors and facility managers on Gmax testing, synthetic turf condition, field inspections and maintenance planning.',
  path: '/blog',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
