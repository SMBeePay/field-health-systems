import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Request a Field Assessment | Field Health Systems',
  description: 'Request an independent synthetic turf field assessment. Tell us about your organization and fields, and we will follow up to schedule on-site testing.',
  path: '/schedule-assessment',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
