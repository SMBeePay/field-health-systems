export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Field Health Systems",
    "url": "https://www.fieldhealthsystems.com",
    "logo": "https://www.fieldhealthsystems.com/images/logo.png",
    "description": "Professional artificial turf testing, GMAX testing, and field safety monitoring services nationwide. ASTM certified testing for athletic fields.",
    "telephone": "+1-555-123-4567",
    "email": "andrew@fieldhealthsystems.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "GMAX Testing",
      "Artificial Turf Testing", 
      "Field Safety Testing",
      "Sports Surface Testing",
      "Athletic Field Monitoring"
    ],
    "sameAs": [
      "https://www.linkedin.com/company/field-health-systems"
    ]
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "GMAX Testing Services",
    "description": "Professional GMAX testing for artificial turf fields using ASTM F355 standards. Certified testing with 24-48 hour reporting nationwide.",
    "provider": {
      "@type": "Organization",
      "name": "Field Health Systems"
    },
    "areaServed": {
      "@type": "Country", 
      "name": "United States"
    },
    "serviceType": "Field Testing",
    "category": "Sports Surface Testing"
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Field Health Systems",
    "url": "https://www.fieldhealthsystems.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.fieldhealthsystems.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
    </>
  )
}