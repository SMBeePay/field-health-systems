// Google Analytics 4 Configuration
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return
  
  // Load gtag script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script1)

  // Initialize gtag
  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_title: document.title,
      page_location: window.location.href,
    });
  `
  document.head.appendChild(script2)
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track business-specific events
export const trackBusinessEvent = {
  scheduleAssessment: () => trackEvent('schedule_assessment', 'lead_generation', 'cta_button'),
  downloadReport: () => trackEvent('download_report', 'engagement', 'sample_report'),
  contactForm: () => trackEvent('contact_form_submit', 'lead_generation', 'contact_page'),
  phoneCall: () => trackEvent('phone_call', 'lead_generation', 'header_phone'),
  serviceView: (service: string) => trackEvent('service_view', 'engagement', service),
  emergencyContact: () => trackEvent('emergency_contact', 'lead_generation', 'urgent_service'),
  priceCalculator: () => trackEvent('price_calculator', 'engagement', 'pricing_tool'),
  athleteSafetyView: () => trackEvent('athlete_safety_view', 'engagement', 'safety_content'),
}

// Enhanced ecommerce tracking for service packages
export const trackServiceInterest = (serviceName: string, price: number) => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', 'view_item', {
    currency: 'USD',
    value: price,
    items: [{
      item_id: serviceName.toLowerCase().replace(/\s+/g, '_'),
      item_name: serviceName,
      item_category: 'Field Testing Services',
      price: price,
      quantity: 1,
    }]
  })
}