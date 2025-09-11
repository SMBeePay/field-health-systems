# Resources Section Implementation Plan

## Next.js App Router Structure

### Directory Structure
```
app/
├── resources/
│   ├── layout.tsx                    # Resources section layout
│   ├── page.tsx                      # Resources landing page
│   ├── loading.tsx                   # Loading component
│   ├── not-found.tsx                 # 404 page
│   │
│   ├── maintenance/
│   │   ├── layout.tsx               # Maintenance section layout
│   │   ├── page.tsx                 # Maintenance hub page
│   │   ├── guides/
│   │   │   ├── page.tsx             # Guides index
│   │   │   ├── artificial-turf-maintenance-complete-guide/
│   │   │   │   └── page.tsx         # Complete maintenance guide
│   │   │   ├── synthetic-field-cleaning-procedures/
│   │   │   │   └── page.tsx
│   │   │   └── infill-maintenance-best-practices/
│   │   │       └── page.tsx
│   │   ├── schedules/
│   │   │   ├── page.tsx
│   │   │   ├── maintenance-schedule-templates/
│   │   │   │   └── page.tsx
│   │   │   └── quarterly-inspection-calendar/
│   │   │       └── page.tsx
│   │   └── troubleshooting/
│   │       ├── page.tsx
│   │       ├── common-turf-problems-solutions/
│   │       │   └── page.tsx
│   │       └── field-drainage-issues/
│   │           └── page.tsx
│   │
│   ├── testing/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Testing hub page
│   │   ├── gmax/
│   │   │   ├── page.tsx
│   │   │   ├── gmax-testing-complete-guide/
│   │   │   │   └── page.tsx         # Primary GMAX content
│   │   │   └── gmax-standards-requirements/
│   │   │       └── page.tsx
│   │   ├── procedures/
│   │   │   ├── page.tsx
│   │   │   └── field-testing-protocols/
│   │   │       └── page.tsx
│   │   └── equipment/
│   │       ├── page.tsx
│   │       └── testing-equipment-reviews/
│   │           └── page.tsx
│   │
│   ├── cost-analysis/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Cost analysis hub
│   │   ├── calculators/
│   │   │   ├── page.tsx
│   │   │   ├── maintenance-cost-calculator/
│   │   │   │   └── page.tsx         # Interactive calculator
│   │   │   └── roi-analysis-tool/
│   │   │       └── page.tsx
│   │   └── budgeting/
│   │       ├── page.tsx
│   │       └── annual-budget-templates/
│   │           └── page.tsx
│   │
│   └── industry-insights/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── standards/
│       │   └── page.tsx
│       └── case-studies/
│           └── page.tsx
```

## Component Architecture

### Shared Components
```typescript
// components/resources/
├── ResourceCard.tsx         # Resource preview card
├── ResourceGrid.tsx         # Grid layout for resources
├── SearchFilters.tsx        # Resource filtering
├── DownloadableResource.tsx # Gated content component
├── InteractiveCalculator.tsx # Cost calculator base
├── ResourceNavigation.tsx   # Section navigation
└── RelatedResources.tsx     # Related content suggestions
```

### Layout Components
```typescript
// app/resources/layout.tsx
import ResourceNavigation from '@/components/resources/ResourceNavigation'
import SearchFilters from '@/components/resources/SearchFilters'

export const metadata = {
  title: "Artificial Turf Resources | Field Health Systems",
  description: "Comprehensive resources for artificial turf maintenance, testing, and cost analysis. Expert guides, calculators, and industry insights."
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="resources-section">
      <ResourceNavigation />
      <main className="resources-content">
        {children}
      </main>
    </div>
  )
}
```

## SEO Implementation Strategy

### 1. Metadata Templates
```typescript
// app/resources/maintenance/guides/artificial-turf-maintenance-complete-guide/page.tsx
export const metadata = {
  title: "Complete Artificial Turf Maintenance Guide | Field Health Systems",
  description: "Expert artificial turf maintenance guide covering cleaning, infill management, testing schedules, and cost optimization. Reduce field repairs by 73%.",
  keywords: "artificial turf maintenance, synthetic turf care, field maintenance guide, turf cleaning procedures, infill maintenance, GMAX testing schedule",
  openGraph: {
    title: "Complete Artificial Turf Maintenance Guide",
    description: "Expert maintenance strategies to extend field life and ensure player safety. Comprehensive guide with schedules, procedures, and cost analysis.",
    type: "article",
    images: [
      {
        url: "https://www.fieldhealthsystems.com/resources/artificial-turf-maintenance-og.jpg",
        width: 1200,
        height: 630,
        alt: "Artificial turf maintenance procedures and equipment"
      }
    ]
  },
  alternates: {
    canonical: "https://www.fieldhealthsystems.com/resources/maintenance/guides/artificial-turf-maintenance-complete-guide"
  }
}
```

### 2. Structured Data Implementation
```typescript
// components/resources/StructuredData.tsx
export function HowToStructuredData({ 
  name, 
  description, 
  steps 
}: HowToProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.description,
      image: step.image
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

### 3. Dynamic Sitemap Integration
```typescript
// app/sitemap.ts - Add resources to existing sitemap
const resourcePages = [
  '/resources',
  '/resources/maintenance',
  '/resources/maintenance/guides/artificial-turf-maintenance-complete-guide',
  '/resources/testing/gmax/gmax-testing-complete-guide',
  '/resources/cost-analysis/calculators/maintenance-cost-calculator',
  // ... additional resource pages
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fieldhealthsystems.com'
  
  // Existing pages...
  
  // Add resource pages
  const resourceSitemapEntries = resourcePages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.includes('complete-guide') ? 0.9 : 0.8,
  }))

  return [
    // ... existing entries
    ...resourceSitemapEntries
  ]
}
```

## Interactive Components

### Cost Calculator Component
```typescript
// components/resources/MaintenanceCostCalculator.tsx
'use client'

import { useState } from 'react'

interface CostFactors {
  fieldSize: number
  fieldAge: number
  usageLevel: 'light' | 'moderate' | 'heavy'
  currentCondition: 'excellent' | 'good' | 'fair' | 'poor'
  testingFrequency: 'quarterly' | 'biannual' | 'annual'
}

export function MaintenanceCostCalculator() {
  const [factors, setFactors] = useState<CostFactors>({
    fieldSize: 80000,
    fieldAge: 5,
    usageLevel: 'moderate',
    currentCondition: 'good',
    testingFrequency: 'quarterly'
  })

  const calculateCosts = () => {
    // Cost calculation logic based on research data
    const baseCost = factors.fieldSize * 0.15 // $0.15 per sq ft baseline
    const ageMultiplier = 1 + (factors.fieldAge * 0.08)
    const usageMultiplier = {
      light: 0.8,
      moderate: 1.0,
      heavy: 1.4
    }[factors.usageLevel]
    
    // ... detailed calculation logic
  }

  return (
    <div className="cost-calculator">
      {/* Calculator form and results */}
    </div>
  )
}
```

### Downloadable Resource Component
```typescript
// components/resources/DownloadableResource.tsx
interface DownloadableResourceProps {
  title: string
  description: string
  fileUrl: string
  fileName: string
  gated?: boolean
}

export function DownloadableResource({ 
  title, 
  description, 
  fileUrl, 
  fileName,
  gated = false 
}: DownloadableResourceProps) {
  const handleDownload = async () => {
    if (gated) {
      // Lead capture form logic
      // Track conversion for SEO/marketing
    }
    
    // Download file
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.click()
    
    // Analytics tracking
    gtag('event', 'download', {
      event_category: 'Resource',
      event_label: fileName
    })
  }

  return (
    <div className="downloadable-resource">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleDownload}>
        Download {fileName}
      </button>
    </div>
  )
}
```

## Content Management Strategy

### 1. Content Types
```typescript
// types/resources.ts
export interface ResourceContent {
  id: string
  title: string
  slug: string
  category: 'maintenance' | 'testing' | 'cost-analysis' | 'insights'
  subcategory: string
  content: string
  excerpt: string
  keywords: string[]
  publishedAt: Date
  updatedAt: Date
  author: string
  readTime: number
  downloadableFiles?: DownloadableFile[]
  relatedResources?: string[]
}

export interface DownloadableFile {
  title: string
  description: string
  url: string
  type: 'pdf' | 'xlsx' | 'docx'
  size: string
  gated: boolean
}
```

### 2. Static Content Generation
```typescript
// lib/resources.ts
export async function getResourceContent(slug: string): Promise<ResourceContent> {
  // Content can be stored in markdown files or CMS
  // For initial implementation, use static markdown files
  const filePath = path.join(process.cwd(), 'content/resources', `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  
  const { data: frontmatter, content } = matter(fileContent)
  
  return {
    ...frontmatter,
    content,
    readTime: calculateReadTime(content)
  } as ResourceContent
}
```

## Performance Optimization

### 1. Image Optimization
- Use Next.js Image component for all resource images
- Generate WebP versions for better compression
- Implement lazy loading for below-fold content

### 2. Code Splitting
- Implement dynamic imports for interactive components
- Separate calculator logic into its own bundle
- Use React.lazy for non-critical components

### 3. SEO Performance
- Implement server-side rendering for all content pages
- Generate static pages at build time where possible
- Use ISR for content that updates periodically

## Analytics and Tracking

### 1. Content Performance Metrics
```typescript
// Track resource engagement
gtag('event', 'resource_view', {
  resource_category: 'maintenance',
  resource_title: 'Artificial Turf Maintenance Guide',
  scroll_depth: '75%'
})

// Track tool usage
gtag('event', 'calculator_use', {
  tool_name: 'maintenance_cost_calculator',
  calculation_completed: true
})
```

### 2. Lead Generation Tracking
- Form submissions on gated content
- Calculator usage and completion
- Resource download conversions
- Email newsletter signups

## Implementation Priority

### Phase 1: MVP (Month 1)
1. Basic resources section structure
2. Three Tier 1 pillar pages
3. Basic SEO optimization
4. Analytics implementation

### Phase 2: Enhancement (Month 2)
1. Interactive cost calculator
2. Downloadable resources
3. Advanced SEO features
4. Related content suggestions

### Phase 3: Scale (Month 3+)
1. Full content library
2. Advanced filtering and search
3. Personalization features
4. Performance optimization

This implementation plan provides a solid foundation for the Resources section while maintaining flexibility for future enhancements and optimizations based on user engagement and SEO performance data.