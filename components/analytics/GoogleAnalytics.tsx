'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, trackPageView, GA_MEASUREMENT_ID } from '@/lib/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Google Analytics on first load
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      console.log('🔍 Initializing Google Analytics with ID:', GA_MEASUREMENT_ID)
      initGA()
    } else {
      console.warn('⚠️ Google Analytics not initialized: Missing or invalid measurement ID')
    }
  }, [])

  useEffect(() => {
    // Track page views when route changes
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      const url = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '')
      console.log('📊 Tracking page view:', url)
      trackPageView(url)
    }
  }, [pathname, searchParams])

  // Render Google Analytics scripts for better SEO
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('❌ Google Analytics scripts not rendered: Invalid measurement ID')
    return null
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Enhanced configuration for Field Health Systems
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              allow_google_signals: true,
              allow_ad_personalization_signals: false,
              send_page_view: true,
              // Enhanced ecommerce settings for service tracking
              custom_map: {
                'custom_parameter_1': 'organization_type',
                'custom_parameter_2': 'service_interest',
                'custom_parameter_3': 'field_count'
              },
              // Debug mode for development
              debug_mode: ${process.env.NODE_ENV === 'development'},
              // Field Health Systems specific settings
              site_speed_sample_rate: 100,
              sample_rate: 100
            });
            
            // Track initial page load
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              content_group1: 'Field Health Systems',
              content_group2: window.location.pathname.split('/')[1] || 'home'
            });
            
            console.log('✅ Google Analytics initialized successfully');
          `,
        }}
      />
    </>
  )
}