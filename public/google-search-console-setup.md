# Google Search Console Setup Instructions

## Step 1: Add Property to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Choose "URL prefix" and enter: `https://fieldhealthsystems.com`
4. Click "Continue"

## Step 2: Verify Domain Ownership

### Method 1: HTML File Upload (Recommended)
1. Download the HTML verification file from Google Search Console
2. Upload it to `/public/` directory in your project
3. The file will be accessible at `https://fieldhealthsystems.com/[filename].html`

### Method 2: HTML Meta Tag (Already Implemented)
- Add the verification meta tag to your layout.tsx file in the `<head>` section
- The tag looks like: `<meta name="google-site-verification" content="your-verification-code" />`

### Method 3: Google Analytics (Automatic)
- Since Google Analytics 4 is already configured with ID: G-YW047TY1K3
- Google Search Console can automatically verify through GA4

## Step 3: Submit Sitemap

1. Once verified, go to "Sitemaps" in the left sidebar
2. Add sitemap URL: `https://fieldhealthsystems.com/sitemap.xml`
3. Click "Submit"

## Step 4: Configure Settings

### Index Coverage
- Monitor which pages are being indexed
- Check for any crawl errors

### Performance
- Monitor search performance metrics
- Track keyword rankings and click-through rates

### Enhancements
- Submit structured data for rich results
- Monitor Core Web Vitals

## Important URLs to Monitor

- Homepage: `https://fieldhealthsystems.com`
- Athlete Safety: `https://fieldhealthsystems.com/athlete-safety`
- Services: `https://fieldhealthsystems.com/services`
- Local service pages (when created)

## Monitoring Checklist

- [ ] Verify domain ownership
- [ ] Submit sitemap
- [ ] Check indexing status weekly
- [ ] Monitor Core Web Vitals
- [ ] Track keyword performance
- [ ] Monitor structured data validity

## Technical SEO Monitoring

### Critical Metrics to Watch
1. **Core Web Vitals**
   - Largest Contentful Paint (LCP) < 2.5s
   - First Input Delay (FID) < 100ms
   - Cumulative Layout Shift (CLS) < 0.1

2. **Mobile Usability**
   - Mobile-friendly test results
   - Touch target sizes
   - Viewport configuration

3. **Structured Data**
   - LocalBusiness schema validation
   - Service schema monitoring
   - Rich results appearance

### Weekly Review Tasks
- Check crawl errors
- Review new page indexing
- Monitor keyword rankings
- Analyze click-through rates
- Review mobile usability reports