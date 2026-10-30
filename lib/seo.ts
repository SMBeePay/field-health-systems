import type { Metadata } from 'next'

export const SITE_URL = 'https://www.fieldhealthsystems.com'
export const SITE_NAME = 'Field Health Systems'

interface PageMetadataOptions {
  title: string
  description: string
  /** Path beginning with "/", used for the canonical URL and og:url */
  path: string
  /** Exclude the page from search results (internal, demo or utility pages) */
  noindex?: boolean
}

/**
 * Per-page metadata with a self-referencing canonical. Every indexable page
 * needs its own: without it a page inherits the root layout's values.
 */
export function pageMetadata({ title, description, path, noindex }: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, type: 'website', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title, description },
    ...(noindex && { robots: { index: false, follow: true } }),
  }
}
