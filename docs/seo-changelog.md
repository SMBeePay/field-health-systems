# SEO Change Log

Tracks changes made against the SEO implementation brief. Baseline: [`seo-baseline-2026-10-30.md`](./seo-baseline-2026-10-30.md).
Nothing here is deployed to production until it is merged to `master`.

## Pass 2 — P0 technical fixes (2026-10-30)

### Homepage, before → after

| | Before | After |
|---|---|---|
| Title | Field Health Systems - Artificial Turf Field Maintenance & Testing \| Professional Sports Field Analytics (104) | Synthetic Turf Field Testing & Gmax Testing \| Field Health Systems (66) |
| Description | 262 chars, maintenance-led | Independent synthetic turf field testing for schools and municipalities. Gmax, rotational resistance, infill depth, and digital field condition reports. (152) |
| H1 | Professional Field Health Management | Independent Synthetic Turf Field Testing & Safety Assessments |
| Hero badge | Independent Testing • Field Management Software | Gmax • Rotational Resistance • Infill Depth |
| Primary CTA | Get Your Free Quote / Get Free Quote (nav) | Request a Field Assessment (nav shows "Request Assessment" below 1280px) |
| Meta keywords | present | removed sitewide |
| Hero image | 3.5 MB JPEG as CSS background | `next/image`, `priority`, responsive WebP/AVIF |

### Sitewide

| Area | Change |
|---|---|
| Titles / descriptions / canonicals | 27 pages inherited the homepage's title, description and canonical. All indexable pages now have unique metadata and a self-referencing canonical (`lib/seo.ts` → `pageMetadata()`). |
| `/resources/gmax-testing-ultimate-guide` | Canonical fixed (was `/resources`). |
| robots.txt | Single source `app/robots.ts`. `/_next/` no longer blocked. Disallows only `/app/`, `/api/`, `/admin/`, `/dashboard/`, `/settings/`, `/fields/`. |
| Internal/demo pages | `/team`, `/maintenance`, `/pitch`, `/mockup`, `/wireframes`, `/marketing` now `noindex, follow` (previously robots-blocked but indexable). |
| Sitemap | Removed `/services/gmax-testing` (redirects). Dead `/api/sitemap` + `/api/robots` routes and rewrites deleted. |
| `/blog/<unknown>` | Now 404 (placeholder route removed). |
| Structured data | Removed invented ASTM certification credential, injury-prevention wording, SearchAction to nonexistent `/search`, conflicting offer prices, `LocalBusiness` type (no address). Education hub no longer claims to award a certification. |
| Social images | Removed `og:image` references to files that don't exist. |
| Headings | Single H1 on `/schedule-assessment`; homepage heading order fixed; FAQ heading now "…Synthetic Turf Field Testing". |
| Mobile | Nav logo was rendering at 70px tall on phones, pushing the menu button off-screen (117px horizontal scroll). Fixed. |

### Verification (local production build)

- `npm run build`: passes.
- Crawl of all 35 sitemap URLs: 35/35 unique titles, 35/35 self-canonical, 0 keywords tags, 1 H1 each.
- Horizontal overflow: 0px at 390, 1280 and 1440px wide (was 117px on mobile).
- `npm run lint`: 79 problems (baseline 81), none in changed files. `tsc`: 55 errors (baseline 55), none in changed files.
