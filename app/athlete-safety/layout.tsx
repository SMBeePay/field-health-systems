import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Artificial Turf Field Safety & Surface Testing | Field Health Systems',
  description: 'How surface hardness, traction and infill depth change as synthetic turf ages, and how independent field testing documents those conditions over time.',
  path: '/athlete-safety',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
