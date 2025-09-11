import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.fieldhealthsystems.com'
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /.well-known/
Disallow: /private/

# Block common bot traps
Disallow: /*?*sort=
Disallow: /*?*filter=
Disallow: /*?*page=
Disallow: /*?*limit=

# Allow important CSS and JS for SEO
Allow: /_next/static/
Allow: /favicon.ico
Allow: /robots.txt
Allow: /sitemap.xml`

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}