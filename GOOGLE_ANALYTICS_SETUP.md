# Google Analytics 4 Setup & Verification Guide

## Overview

Your Field Health Systems website now has comprehensive Google Analytics 4 (GA4) tracking implemented. This guide explains how to verify it's working and what data you'll see.

## 🔧 Technical Implementation

### Analytics Configuration
- **Measurement ID**: `G-YW047TY1K3`
- **Environment**: Configured for both development and production
- **Tracking**: Page views, events, conversions, and custom business metrics

### Files Modified/Created
- `components/analytics/GoogleAnalytics.tsx` - Enhanced with debugging and Field Health Systems specific tracking
- `lib/analytics.ts` - Comprehensive event tracking functions
- `app/analytics-test/page.tsx` - Testing page to verify analytics
- `.env` and `.env.local` - Environment configuration

## 🎯 What's Being Tracked

### Automatic Tracking
1. **Page Views** - Every page visit with enhanced metadata
2. **Site Navigation** - Route changes and user flow
3. **Content Groups** - Organized by site sections (resources, testing, etc.)

### Business-Specific Events
1. **Resource Engagement** - Clicks on guides, calculators, tools
2. **Lead Generation** - Form submissions, consultation requests
3. **Contact Actions** - Phone clicks, email clicks
4. **Service Interest** - Views of specific services and pricing

### Enhanced Ecommerce
- Service package views with estimated values
- Lead generation events with conversion values
- Custom parameters for organization type and field count

## ✅ How to Verify Analytics is Working

### Method 1: Real-Time Reports (Immediate)
1. Open [Google Analytics 4](https://analytics.google.com)
2. Select your Field Health Systems property
3. Go to **Reports → Real-time**
4. Visit your website in another tab
5. You should see real-time visitors and page views

### Method 2: Analytics Test Page (Recommended)
1. Visit: `https://yourdomain.com/analytics-test`
2. Open browser developer console (F12)
3. Look for analytics console messages:
   - `🔍 Initializing Google Analytics with ID: G-YW047TY1K3`
   - `✅ Google Analytics initialized successfully`
   - `📊 Tracking page view: /analytics-test`
4. Click the test buttons on the page
5. Check GA4 real-time events for test events

### Method 3: Browser Developer Tools
1. Open your website
2. Press F12 to open developer tools
3. Go to **Network** tab
4. Look for requests to `google-analytics.com/collect`
5. Check **Console** tab for analytics debug messages

## 📊 Expected Data in Google Analytics

### Real-Time Data (Available Immediately)
- **Active Users** - Current visitors on your site
- **Page Views** - Pages being viewed right now
- **Events** - Custom events like resource clicks, form submissions
- **Traffic Sources** - How users are finding your site

### Historical Data (Available 24-48 hours after implementation)
- **Audience Demographics** - User characteristics and behavior
- **Acquisition Reports** - Traffic sources and campaigns
- **Engagement Reports** - Page performance and user interaction
- **Conversion Reports** - Goal completions and lead generation

## 🚀 Key Business Metrics to Monitor

### Lead Generation Tracking
- **Assessment Requests** - Schedule assessment form submissions
- **Contact Form Submissions** - General inquiry forms
- **Phone Click-to-Call** - Header phone number clicks
- **Email Clicks** - Contact email interactions

### Content Engagement
- **Resource Downloads** - PDF guides, templates, checklists
- **Tool Usage** - Cost calculators, assessment tools
- **Education Hub Engagement** - Testing guides and procedures
- **Service Page Views** - GMAX testing, maintenance services

### Conversion Funnel
1. **Awareness** - Organic search, direct visits
2. **Interest** - Resource page views, guide downloads
3. **Consideration** - Service page views, cost calculator usage
4. **Intent** - Contact form views, phone number clicks
5. **Action** - Assessment requests, consultation bookings

## 🔍 Troubleshooting

### If You Don't See Data

1. **Check Configuration**
   - Verify measurement ID: `G-YW047TY1K3`
   - Ensure environment variables are set correctly
   - Check browser console for error messages

2. **Browser Issues**
   - Disable ad blockers temporarily
   - Try incognito/private browsing mode
   - Clear browser cache and cookies

3. **GA4 Property Settings**
   - Verify data retention settings
   - Check if data filtering is applied
   - Ensure property is active and collecting data

### Common Issues & Solutions

**No real-time data:**
- GA4 real-time can take 5-10 minutes to show data
- Check if ad blockers are preventing tracking
- Verify the measurement ID matches your GA4 property

**Events not appearing:**
- Custom events can take 24-48 hours to appear in standard reports
- Use DebugView in GA4 for immediate event verification
- Check browser console for gtag errors

**Page views not tracking:**
- Ensure JavaScript is enabled
- Check for CSP (Content Security Policy) blocking scripts
- Verify the analytics component is rendering correctly

## 📈 Advanced Analytics Features

### Custom Dimensions Available
- **Organization Type** - Educational, Municipal, Professional
- **Service Interest** - Specific services viewed or requested
- **Field Count** - Number of fields in assessment requests
- **Lead Source** - Which page/content drove the conversion

### Conversion Events Setup
- **generate_lead** - High-value lead generation
- **schedule_assessment** - Assessment booking requests
- **download_resource** - Educational content downloads
- **contact_form_submit** - General inquiries

### Goals & Conversion Tracking
1. Set up conversion goals in GA4
2. Create audiences for retargeting
3. Connect Google Ads for enhanced attribution
4. Enable enhanced ecommerce for service tracking

## 🎯 Next Steps

### Immediate Actions
1. **Verify Implementation** - Visit `/analytics-test` and check GA4 real-time
2. **Set Up Goals** - Configure conversion goals in GA4 interface
3. **Create Dashboards** - Build custom reports for key business metrics
4. **Enable Alerts** - Set up notifications for significant changes

### Ongoing Optimization
1. **Monthly Review** - Analyze traffic patterns and conversion rates
2. **A/B Testing** - Test different CTAs and page layouts
3. **Content Performance** - Identify top-performing resources and guides
4. **Lead Quality Analysis** - Track which sources generate best leads

## 🔗 Useful Links

- [Google Analytics 4 Property](https://analytics.google.com)
- [GA4 DebugView Documentation](https://support.google.com/analytics/answer/7201382)
- [Enhanced Ecommerce Setup](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Conversion Tracking Guide](https://support.google.com/analytics/answer/9267568)

## 📞 Support

If you encounter any issues with analytics tracking:

1. Check the `/analytics-test` page for diagnostic information
2. Review browser console for error messages
3. Verify environment configuration in `.env.local`
4. Contact development team with specific error details

---

**Last Updated**: September 2024  
**Analytics Version**: Google Analytics 4 (GA4)  
**Measurement ID**: G-YW047TY1K3