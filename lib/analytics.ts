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

// Track conversions - specifically for lead generation
export const trackConversion = (conversionAction: string, parameters: {
  organization?: string
  numberOfFields?: string
  fieldTypes?: string
  value?: number
  [key: string]: string | number | undefined
}) => {
  if (typeof window === 'undefined') return
  
  // Track the specific conversion event
  window.gtag('event', conversionAction, {
    event_category: 'Lead Generation',
    event_label: parameters.organization || 'Unknown Organization',
    value: parameters.value || 2500,
    currency: 'USD',
    custom_parameters: {
      number_of_fields: parameters.numberOfFields,
      field_types: parameters.fieldTypes,
      organization_name: parameters.organization,
      lead_source: 'schedule_assessment_page'
    }
  })

  // Track the generic conversion for goal tracking in GA4
  window.gtag('event', 'conversion', {
    send_to: `${GA_MEASUREMENT_ID}/schedule_assessment`,
    event_category: 'Lead Generation',
    event_label: 'Assessment Request',
    value: parameters.value || 2500,
    currency: 'USD'
  })

  // Track as a goal completion (GA4 recommended event)
  window.gtag('event', 'generate_lead', {
    event_category: 'Lead Generation', 
    event_label: 'Schedule Assessment',
    value: parameters.value || 2500,
    currency: 'USD',
    lead_type: 'assessment_request',
    organization: parameters.organization,
    field_count: parameters.numberOfFields
  })
}

// Track form interactions for optimization
export const trackFormStep = (step: string, formData?: Record<string, string | number | boolean>) => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', 'form_step', {
    event_category: 'Form Interaction',
    event_label: step,
    form_name: 'schedule_assessment',
    ...formData
  })
}

// Track CTA button clicks with location context
export const trackButtonClick = (buttonName: string, location: string) => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', 'click', {
    event_category: 'CTA Click',
    event_label: buttonName,
    page_location: location,
    button_type: 'cta'
  })
}

// Track phone number clicks for lead attribution
export const trackPhoneClick = () => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', 'phone_call_click', {
    event_category: 'Contact',
    event_label: 'Phone Number Click',
    value: 500, // Estimated value of a phone lead
    currency: 'USD'
  })
}

// Track email clicks for lead attribution  
export const trackEmailClick = () => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', 'email_click', {
    event_category: 'Contact',
    event_label: 'Email Click',
    contact_method: 'email'
  })
}