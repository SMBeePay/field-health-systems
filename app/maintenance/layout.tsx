import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Maintenance Management | Field Health Systems',
  description: 'Internal Field Health Systems page.',
  path: '/maintenance',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
