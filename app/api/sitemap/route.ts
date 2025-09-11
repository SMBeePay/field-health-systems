import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.fieldhealthsystems.com'
  
  // Define static pages
  const staticPages = [
    '',
    '/athlete-safety',
    '/services',
    '/pricing',
    '/about',
    '/contact'
  ]

  // Generate service area pages (example cities - expand as needed)
  const serviceAreas = [
    'dallas-texas',
    'houston-texas',
    'austin-texas',
    'san-antonio-texas',
    'fort-worth-texas',
    'plano-texas',
    'arlington-texas',
    'frisco-texas',
    'denton-texas',
    'mckinney-texas'
  ]

  const services = [
    'gmax-testing',
    'field-inspection',
    'quarterly-monitoring',
    'emergency-assessment',
    'maintenance-planning'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  
  ${services.map(service => `
  <url>
    <loc>${baseUrl}/services/${service}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  ${serviceAreas.map(area => `
  <url>
    <loc>${baseUrl}/service-areas/${area}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  
  ${services.flatMap(service => 
    serviceAreas.map(area => `
  <url>
    <loc>${baseUrl}/services/${service}/${area}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`)).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}