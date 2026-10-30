import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Field Health Systems | Field Health Systems',
  description: 'Internal Field Health Systems page.',
  path: '/pitch',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
