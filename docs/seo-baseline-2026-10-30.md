# SEO Baseline — fieldhealthsystems.com

**Captured:** October 30, 2026 against production (`master` @ `2efd790`, deployed via Vercel).
**Method:** live HTTP crawl of every sitemap URL plus known internal/demo routes (raw HTML, no JS execution), repository inspection, local `npm run build`, Lighthouse 12.2.1 (headless Chromium) on the homepage.
**Scope note:** DataForSEO figures in the brief are third-party estimates. No Search Console or GA4 data was available for this baseline (see §9).

---

## 1. Stack and deployment

| Item | Finding |
|---|---|
| Framework | Next.js 15.5 (App Router), React 19, Tailwind 4, Prisma 6 (Neon Postgres), NextAuth 4 |
| Hosting | Vercel project `field-health-systems`; production = `master`; every branch gets a preview deploy |
| Build | `vercel-build`: `prisma generate` → additive SQL migrations → `next build` |
| Canonical host | `https://www.fieldhealthsystems.com` |
| Build config | `typescript.ignoreBuildErrors: true`, `eslint.ignoreDuringBuilds: true` |
| Marketing nav | `components/layout/marketing-nav.tsx` — primary CTA label **"Get Free Quote"** → `/schedule-assessment` |

## 2. Host, protocol and redirects

| Request | Result | Note |
|---|---|---|
| `http://fieldhealthsystems.com/` | 308 → `https://fieldhealthsystems.com/` | OK |
| `https://fieldhealthsystems.com/` | **307** → `https://www.fieldhealthsystems.com/` | Temporary redirect. Should be permanent (308/301). Set in Vercel → Domains, not in code. |
| `https://www.fieldhealthsystems.com/` | 200, HSTS present | OK |
| `/services/gmax-testing` | **308 → `/services/turf-testing`** (`next.config.ts` redirect) | The GMAX service page exists in the repo but is unreachable, yet it is listed in the sitemap. |

## 3. robots.txt and sitemap

Three competing implementations exist; only one of each is actually served:

| File | Served? |
|---|---|
| `app/robots.txt` (static) | **Yes** — live robots.txt |
| `app/robots.ts` | No (shadowed). Different rules (`Disallow: /private/` only). |
| `app/api/robots/route.ts` + `next.config.ts` rewrite | No (shadowed). Contains `Crawl-delay`, parameter blocks. |
| `app/sitemap.ts` | **Yes** — live sitemap.xml (36 URLs) |
| `app/api/sitemap/route.ts` + rewrite | No (shadowed). Lists URLs that 404 (`/services`, `/pricing`, `/about`, `/service-areas/dallas-texas`, …). |

Live robots.txt disallows `/app/`, `/api/`, `/_next/`, `/wireframes`, `/mockup`, `/pitch`, `/marketing`, `/team`.
Issues:
- `Disallow: /_next/` blocks Googlebot from the JS/CSS needed to render the pages.
- Disallowed demo pages still return 200 with `index, follow`. Robots.txt does not stop a URL being indexed if linked; these need `noindex`.
- `/maintenance` (internal app UI, 198 words, duplicate H1) is explicitly `Allow`ed.
- Sitemap includes `/services/gmax-testing`, which redirects.
- `/resources/gmax-testing-ultimate-guide` is in the sitemap but has **0 internal links** pointing to it.

## 4. URL inventory and metadata (live)

Default (root-layout) metadata = title "Field Health Systems - Artificial Turf Field Maintenance & Testing | Professional Sports Field Analytics" (104 chars), 262-char description, canonical = homepage.

**Critical:** pages without their own metadata export inherit the root layout's title, description **and canonical URL**, so 27 indexable pages tell Google they are duplicates of the homepage.

| URL | Status | Title | Canonical | H1 | Words |
|---|---|---|---|---|---|
| `/` | 200 | default (104 ch) | `/` | "Professional Field Health Management" | 1,682 |
| `/schedule-assessment` | 200 | **default** | **→ `/`** | **2 H1s** | 331 |
| `/athlete-safety` | 200 | **default** | **→ `/`** | The Hidden Dangers of Poorly Maintained Artificial Turf Fields | 911 |
| `/partnerships` | 200 | **default** | **→ `/`** | Reduce Field-Related Claims Through Partnership | 563 |
| `/contact` | 200 | Contact Field Health Systems \| … (72) | self | Contact Our Field Testing Experts | 255 |
| `/services/turf-testing` | 200 | **default** | **→ `/`** | Everything Your Fields Need. In One Place. | 663 |
| `/services/gmax-testing` | **308** | — | — | — | — |
| `/services/shear-factor-testing` | 200 | **default** | **→ `/`** | Shear Factor Testing for Turf Fields | 1,455 |
| `/services/infill-depth-testing` | 200 | **default** | **→ `/`** | Infill Depth Testing for Artificial Turf | 1,651 |
| `/services/field-condition-assessment` | 200 | **default** | **→ `/`** | Field Condition Assessment | 1,857 |
| `/service-areas/texas` | 200 | **default** | **→ `/`** | Artificial Turf Field Testing Across Texas | 534 |
| `/service-areas/{15 cities/regions}` | 200 | **default** | **→ `/`** | "Artificial Turf Testing in {City}" | 470–601 |
| `/blog` | 200 | **default** | **→ `/`** | Field Safety & Compliance Blog | 263 |
| `/blog/artificial-turf-maintenance-guide` | 200 | own (82 ch) | **→ `/`** | own | 1,242 |
| `/blog/artificial-turf-problems` | 200 | **default** | **→ `/`** | own | 1,526 |
| `/blog/what-is-gmax-testing` | 200 | **default** | **→ `/`** | own | 1,237 |
| `/blog/<any-slug>` | **200** | default | → `/` | placeholder text | soft 404 (`app/blog/[slug]`) |
| `/resources` | 200 | own (57) | self | own | 356 |
| `/resources/testing` | 200 | own (55) | self | own | 285 |
| `/resources/testing/education-hub` | 200 | own (74) | self | own | 853 |
| `/resources/maintenance` | 200 | own (60) | self | own | 262 |
| `/resources/maintenance/guides/artificial-turf-maintenance-complete-guide` | 200 | own (65) | self | own | 686 |
| `/resources/gmax-testing-ultimate-guide` | 200 | own (72) | **→ `/resources`** (wrong) | own | 2,723 |
| `/resources/cost-analysis` | 200 | own | self | own | 452 — not in sitemap |
| `/resources/industry-insights` | 200 | own | self | own | 367 — not in sitemap |
| `/maintenance` | 200 | default | → `/` | 2 H1s | 198 — internal UI |
| `/team`, `/pitch`, `/mockup`, `/wireframes`, `/marketing` | 200 | default / own | → `/` or none | — | internal / demo, robots-blocked but `index, follow` |

All pages also emit `<meta name="keywords">` (obsolete).

The 15 city pages measure 13–29% pairwise word-sequence similarity (avg 21%): not copy-paste duplicates, but each has only one inbound internal link (from `/service-areas/texas`).

## 5. Internal links

- **~45 broken internal links (404)**, almost all from the resource hub pages to sub-pages that were never built, e.g. `/resources/testing/gmax`, `/resources/testing/compliance/astm-checklist`, `/resources/cost-analysis/calculators/roi-calculator`, `/resources/industry-insights/case-studies`. Also `/analytics`, `/testing`, `/reports` from internal demo pages.
- `/resources/gmax-testing-ultimate-guide` (the longest GMAX content on the site) has no inbound links.
- Homepage: 16 internal links.

## 6. Structured data

Every page emits the same root-layout JSON-LD graph (`LocalBusiness`+`Organization`, `ProfessionalService`, `WebSite`). Problems:

| Problem | Why it matters |
|---|---|
| `hasCredential: "ASTM Field Testing Certification"` | ASTM does not issue such a certification. The brief prohibits unverified credentials. |
| `"Rotational traction testing for injury prevention"` | Injury-prevention claim (prohibited by brief). |
| `WebSite.potentialAction` SearchAction → `/search?q=` | `/search` does not exist. |
| `LocalBusiness` with no `address` | Ineligible for local rich results; `Organization` alone is accurate. |
| `areaServed` lists TX, OK, AR, LA + 500-mile radius | Needs confirmation; site copy is Texas-focused. |
| Offer prices $3,000 / $5,400 per field per year | Homepage FAQ says **$2,500** per field per year. Prices conflict. |
| `logo` → `/logo.svg` (400×400) | Exists; approved brand assets are `fhs-*-approved.svg`. |

Page-level: `/resources/gmax-testing-ultimate-guide` (Article, FAQPage), `/resources/testing/education-hub` (EducationalOrganization with `educationalCredentialAwarded: "Sports Surface Testing Certification"`, which is fabricated), `/resources/maintenance/guides/...` (HowTo), `/resources` (CollectionPage). No BreadcrumbList anywhere.

## 7. Headings and images

- Homepage H1 "Professional Field Health Management"; H2s lead with software/maintenance messaging ("Intelligent Field Management", "Advanced Technology Platform"), FAQ framed as "Artificial Turf Field **Maintenance**".
- Duplicate H1s on `/schedule-assessment` and `/maintenance`.
- No `<img>` missing alt text in server HTML (most imagery is CSS backgrounds).

## 8. Forms and conversion

| Form | Endpoint | Destination | Fields |
|---|---|---|---|
| `/schedule-assessment` | `POST /api/schedule-assessment` | Email to `andrew@fieldhealthsystems.com` via Resend (`RESEND_API_KEY`) | first/last name\*, email\*, phone\*, organization\*, title, number of fields\*, field types, primary concern, contact method, timeframe, notes. **No field location.** |
| `/contact` (`components/forms/ContactForm.tsx`) | `POST /api/forms/submit` | Saved to `FormSubmission` table + Resend email | — |
| `/partnerships` | `POST /api/forms/submit` | same | — |

- User input is interpolated into the notification email HTML without escaping.
- Analytics hooks exist (`lib/analytics.ts`, `trackConversion('schedule_assessment')`) but GA4 is not loaded (§9).
- CTA label is "Get Free Quote"; the brief asks for "Request a Field Assessment".

## 9. Measurement

- **GA4: not active in production.** No `gtag`/`googletagmanager` in the served HTML. `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset (falls back to `G-XXXXXXXXXX`, which the component refuses to load). The Vercel environment-variable list could not be read with the available token.
- **Search Console:** no `google-site-verification` meta tag. Verification may exist via DNS; ownership must be confirmed by the site owner. `public/google-search-console-setup.md` is an internal doc served publicly.

## 10. Content claims needing owner verification

The brief prohibits unverified credentials, guarantees and injury-prevention claims. The following appear on live pages and cannot be verified from the repository:

- "Certified technicians", "certified professionals", "certified independent testing specialist" (homepage, `/service-areas/texas`, `/el-paso`, `/schedule-assessment`, `/contact`, resources)
- "ASTM F1936 Certified Testing" / "ASTM F1337 Certified Testing" badges (service pages); "ASTM-Certified Equipment / Field Testing" (`/partnerships`, GMAX guide)
- "J. Martinez, Certified" (homepage report mock-up)
- "decades of turf management", "20+ Years Experience"
- "24-Hour Response Guarantee" (`/partnerships`)
- Injury framing: "critical metric for head injury prevention", "Too much traction causes ACL tears", "maintenance is needed to prevent injuries", "165 G maximum for … injury prevention"
- Contact FAQ: "Our testing professionals are certified in ASTM testing procedures"

## 11. Performance (Lighthouse, homepage)

_See below. Lab data only; no field (CrUX) data is available for this origin._

| Metric | Mobile | Desktop |
|---|---|---|
| Performance | **38** | 67 |
| Accessibility | 94 | 90 |
| Best Practices | 100 | 96 |
| SEO | 100 | 100 |
| First Contentful Paint | 1.3 s | 0.3 s |
| Largest Contentful Paint | **20.4 s** | 3.4 s |
| Total Blocking Time | **4,530 ms** | 320 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 6.9 s | 1.4 s |
| Page weight | 3,865 KiB | — |

Causes identified:
- Hero background is `public/aidan-tottori-3zIZZ-9yIhM-unsplash.jpg`, a **3.5 MB** JPEG loaded through CSS (not `next/image`, no responsive sizes). `public/sports-field-bg.jpg` is 5.0 MB.
- Hero copy is animated in from `opacity: 0` by framer-motion, so the H1 is invisible until JavaScript hydrates.
- 70 `motion.*` elements on the homepage, including infinite animations; one shared chunk accounts for ~9.5 s of main-thread work on throttled mobile.
- Failed audits: `color-contrast`, `heading-order` (mobile and desktop).
- Lighthouse "SEO 100" only checks basics (title present, crawlable, robots valid); it does not detect the duplicate-canonical problem in §4.

## 12. Test commands and current results

| Command | Result at baseline |
|---|---|
| `npm run lint` | 81 problems (60 errors, 21 warnings), all pre-existing |
| `npx tsc --noEmit` | 55 errors, pre-existing (mostly `app/app/**` dashboard) |
| `npm run build` | Passes |
| Tests | None configured |
