import { MetadataRoute } from 'next'

// Internal and demo pages (/team, /maintenance, /pitch, /mockup, /wireframes,
// /marketing) are excluded with a noindex meta tag rather than Disallow, so
// crawlers can read the tag and drop any copies already indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/app/', '/api/', '/admin/', '/dashboard/', '/settings/', '/fields/'],
    },
    sitemap: 'https://www.fieldhealthsystems.com/sitemap.xml',
  }
}
