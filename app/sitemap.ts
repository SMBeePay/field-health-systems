import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fieldhealthsystems.com'

  const servicePages = [
    '/services/turf-testing',
    '/services/gmax-testing',
    '/services/shear-factor-testing',
    '/services/infill-depth-testing',
    '/services/field-condition-assessment',
  ]

  const serviceAreas = [
    '/service-areas/texas',
    '/service-areas/dallas-fort-worth',
    '/service-areas/houston',
    '/service-areas/san-antonio',
    '/service-areas/austin',
    '/service-areas/corpus-christi',
    '/service-areas/lubbock',
    '/service-areas/amarillo',
    '/service-areas/el-paso',
    '/service-areas/east-texas',
    '/service-areas/waco',
    '/service-areas/killeen-temple',
    '/service-areas/rio-grande-valley',
    '/service-areas/beaumont-southeast-texas',
    '/service-areas/midland-odessa',
    '/service-areas/abilene',
  ]

  const resourcePages = [
    '/resources',
    '/resources/testing',
    '/resources/testing/education-hub',
    '/resources/maintenance',
    '/resources/maintenance/guides/artificial-turf-maintenance-complete-guide',
    '/resources/gmax-testing-ultimate-guide',
  ]

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Core pages
    {
      url: `${baseUrl}/schedule-assessment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/athlete-safety`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partnerships`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Service pages
    ...servicePages.map(path => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // Service area pages
    ...serviceAreas.map((path, i) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: i === 0 ? 0.85 : 0.75, // Texas hub gets slightly higher priority
    })),
    // Resource pages
    ...resourcePages.map(path => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
