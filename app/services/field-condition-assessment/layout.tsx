import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Synthetic Turf Field Condition Assessments | Field Health Systems',
  description: 'A complete on-site condition assessment for synthetic turf: Gmax, rotational resistance, infill depth and visual inspection, mapped in one report.',
  path: '/services/field-condition-assessment',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
