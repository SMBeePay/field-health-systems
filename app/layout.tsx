import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AuthSessionProvider from "@/components/providers/SessionProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fieldhealthsystems.com"),
  // Fallback only: every indexable page sets its own title, description and
  // canonical via pageMetadata() in lib/seo.ts.
  title: "Synthetic Turf Field Testing & Gmax Testing | Field Health Systems",
  description: "Independent synthetic turf field testing for schools and municipalities. Gmax, rotational resistance, infill depth, and digital field condition reports.",
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
    siteName: "Field Health Systems",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.fieldhealthsystems.com/#organization",
      "name": "Field Health Systems",
            "url": "https://www.fieldhealthsystems.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fieldhealthsystems.com/logo.svg",
        "width": 400,
        "height": 400
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://www.fieldhealthsystems.com/opengraph-image",
        "width": 1200,
        "height": 630
      },
      "description": "Independent on-site synthetic turf field testing: Gmax impact attenuation, rotational resistance, infill depth, visual assessment and digital field condition reports.",
      "foundingDate": "2024",
      "slogan": "Measure. Maintain. Maximize.",
      "knowsAbout": [
        "Artificial Turf Maintenance",
        "GMAX Testing",
        "Sports Field Safety",
        "Synthetic Turf Management",
        "Field Testing Equipment",
        "Athletic Field Compliance"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "andrew@fieldhealthsystems.com",
        "contactType": "Customer Service",
        "availableLanguage": ["English"],
        "hoursAvailable": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ]
      },
      "areaServed": [
        {
          "@type": "State",
          "name": "Texas"
        },
        {
          "@type": "State", 
          "name": "Oklahoma"
        },
        {
          "@type": "State",
          "name": "Arkansas"
        },
        {
          "@type": "State",
          "name": "Louisiana"
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 32.7767,
          "longitude": -96.7970
        },
        "geoRadius": "500 miles"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.fieldhealthsystems.com/#service",
      "name": "Synthetic Turf Field Testing",
      "serviceType": "Synthetic turf field testing",
      "description": "Independent on-site testing of synthetic turf athletic fields: Gmax impact attenuation, rotational resistance (shear), infill depth and visual condition, documented in a digital field condition report.",
      "provider": {
        "@id": "https://www.fieldhealthsystems.com/#organization"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "School districts, athletic directors, facility managers, municipalities, insurers and risk pools"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.fieldhealthsystems.com/#website",
      "url": "https://www.fieldhealthsystems.com",
      "name": "Field Health Systems",
      "description": "Independent synthetic turf field testing",
      "publisher": {
        "@id": "https://www.fieldhealthsystems.com/#organization"
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#0D1B2A" />
        <meta name="msapplication-TileColor" content="#0D1B2A" />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
