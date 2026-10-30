import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Brand Mockups | Field Health Systems',
  description: 'Internal Field Health Systems page.',
  path: '/mockup',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
