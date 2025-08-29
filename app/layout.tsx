import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Field Health Systems - Artificial Turf Field Maintenance & Testing | Professional Sports Field Analytics",
  description: "Professional artificial turf field maintenance monitoring and testing services. Expert GMAX testing, infill depth analysis, and predictive maintenance planning for synthetic sports fields. Reduce emergency repairs by 73% with quarterly field health assessments.",
  keywords: "artificial turf maintenance, synthetic field testing, turf field monitoring, artificial grass maintenance, sports field maintenance, turf field inspection, synthetic turf care, field safety testing, GMAX testing, infill depth measurement, artificial field repair, turf maintenance services, sports surface testing, field health monitoring, synthetic sports fields, turf field management, artificial turf testing equipment, field maintenance planning, sports facility management, turf field safety",
  authors: [{ name: "Field Health Systems" }],
  creator: "Field Health Systems",
  publisher: "Field Health Systems",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fieldhealthsystems.com",
    title: "Professional Artificial Turf Field Maintenance & Testing Services",
    description: "Expert monitoring and maintenance planning for synthetic sports fields. Professional GMAX testing, safety compliance, and predictive maintenance that reduces emergency repairs by 73%.",
    siteName: "Field Health Systems",
    images: [
      {
        url: "https://fieldhealthsystems.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Field Health Systems - Professional Artificial Turf Maintenance"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Artificial Turf Field Maintenance & Testing Services",
    description: "Expert monitoring and maintenance planning for synthetic sports fields. Reduce emergency repairs by 73% with professional field health assessments.",
    images: ["https://fieldhealthsystems.com/twitter-image.jpg"]
  },
  alternates: {
    canonical: "https://fieldhealthsystems.com"
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "business.contact_data.locality": "United States",
    "business.contact_data.country_name": "United States"
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fieldhealthsystems.com/#organization",
      "name": "Field Health Systems",
      "url": "https://fieldhealthsystems.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fieldhealthsystems.com/logo.png",
        "width": 400,
        "height": 400
      },
      "description": "Professional artificial turf field maintenance monitoring and testing services for sports facilities.",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "(555) 123-8873",
        "contactType": "Customer Service",
        "availableLanguage": ["English"]
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      }
    },
    {
      "@type": "Service",
      "@id": "https://fieldhealthsystems.com/#service",
      "name": "Artificial Turf Field Maintenance & Testing",
      "description": "Professional quarterly field monitoring and testing services including GMAX testing, infill depth analysis, and predictive maintenance planning for synthetic sports fields.",
      "provider": {
        "@id": "https://fieldhealthsystems.com/#organization"
      },
      "serviceType": "Sports Field Maintenance",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "offers": {
        "@type": "Offer",
        "price": "2500",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "2500",
          "priceCurrency": "USD",
          "unitText": "per field per year"
        }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://fieldhealthsystems.com/#website",
      "url": "https://fieldhealthsystems.com",
      "name": "Field Health Systems",
      "description": "Professional artificial turf field maintenance and testing services",
      "publisher": {
        "@id": "https://fieldhealthsystems.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://fieldhealthsystems.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
