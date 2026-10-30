import { pageMetadata } from '@/lib/seo'

// Earlier draft of the homepage, kept for reference. Not for search results.
export const metadata = pageMetadata({
  title: 'Marketing Draft | Field Health Systems',
  description: 'Internal Field Health Systems page.',
  path: '/marketing',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
