import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Team Management | Field Health Systems',
  description: 'Internal Field Health Systems page.',
  path: '/team',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
