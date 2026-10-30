import { pageMetadata } from '@/lib/seo'
import MarketingHomePage from './home-page'

export const metadata = pageMetadata({
  title: 'Synthetic Turf Field Testing & Gmax Testing | Field Health Systems',
  description: 'Independent synthetic turf field testing for schools and municipalities. Gmax, rotational resistance, infill depth, and digital field condition reports.',
  path: '/',
})

export default function Page() {
  return <MarketingHomePage />
}
