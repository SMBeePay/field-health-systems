import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Field Diagram Wireframes | Field Health Systems',
  description: 'Internal Field Health Systems page.',
  path: '/wireframes',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
