# App Section Restructure - Execution Plan

**Approach:** Option A - Full Migration to `/app/[orgSlug]/*`
**Goal:** Separate authenticated app functionality from public marketing pages under clean URL hierarchy

---

## CONTEXT

**Current State:**
- Next.js 15.5.0 with NextAuth 4.24.11 (JWT sessions)
- Prisma ORM with SQLite
- Existing routes: `/dashboard`, `/fields`, `/settings` mixed with marketing pages at root
- Already has `/app/[orgSlug]/page.tsx` (minimal org dashboard)
- Middleware at `/middleware.ts` protects routes
- Auth config at `/lib/auth.ts`
- User roles: SUPER_ADMIN, ORG_ADMIN, USER, DEMO

**Target URL Structure:**
```
PUBLIC: /, /marketing, /resources/*, /blog/*, /contact, /partnerships, /services/*
AUTH: /auth/login, /auth/forgot-password, /auth/reset-password
APP: /app/[orgSlug]/dashboard, /fields, /testing, /maintenance, /reports, /analytics, /team, /settings
ADMIN: /admin/* (SUPER_ADMIN only)
```

---

## IMPLEMENTATION STEPS

### STEP 1: Create App Directory Structure

Create the following directories and files:

```
/app/app/[orgSlug]/
├── layout.tsx                    [NEW - App layout with Header, Sidebar, auth check]
├── dashboard/
│   └── page.tsx                  [MIGRATE from /app/app/[orgSlug]/page.tsx]
├── fields/
│   ├── page.tsx                  [NEW - Field list view]
│   ├── [id]/
│   │   ├── page.tsx              [NEW - Field detail view]
│   │   └── edit/
│   │       └── page.tsx          [NEW - Edit field form]
│   └── new/
│       └── page.tsx              [NEW - Create field form]
├── testing/
│   ├── page.tsx                  [NEW - Testing data list]
│   ├── [id]/
│   │   └── page.tsx              [NEW - Test details]
│   └── new/
│       └── page.tsx              [NEW - New test entry form]
├── maintenance/
│   ├── page.tsx                  [NEW - Maintenance list]
│   ├── [id]/
│   │   └── page.tsx              [NEW - Maintenance details]
│   └── new/
│       └── page.tsx              [NEW - New maintenance form]
├── reports/
│   ├── page.tsx                  [NEW - Reports list]
│   ├── [id]/
│   │   └── page.tsx              [NEW - Report details]
│   └── generate/
│       └── page.tsx              [NEW - Generate report]
├── analytics/
│   └── page.tsx                  [NEW - Analytics dashboard]
├── team/
│   ├── page.tsx                  [NEW - Team list]
│   ├── [userId]/
│   │   └── page.tsx              [NEW - User details]
│   └── invite/
│       └── page.tsx              [NEW - Invite user]
└── settings/
    └── page.tsx                  [NEW - Organization settings]
```

### STEP 2: Create App Layout (`/app/app/[orgSlug]/layout.tsx`)

```typescript
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgSlug: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  // Validate user has access to this organization
  if (session.user.role !== 'SUPER_ADMIN' &&
      session.user.organizationSlug !== params.orgSlug) {
    redirect('/auth/unauthorized');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar orgSlug={params.orgSlug} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header orgSlug={params.orgSlug} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### STEP 3: Update Sidebar Navigation (`/components/layout/sidebar.tsx`)

Update navigation links to use new `/app/[orgSlug]/*` paths:

```typescript
const navigation = [
  { name: 'Dashboard', href: `/app/${orgSlug}/dashboard`, icon: LayoutDashboard },
  { name: 'Fields', href: `/app/${orgSlug}/fields`, icon: Grid },
  { name: 'Testing', href: `/app/${orgSlug}/testing`, icon: ClipboardCheck },
  { name: 'Maintenance', href: `/app/${orgSlug}/maintenance`, icon: Wrench },
  { name: 'Reports', href: `/app/${orgSlug}/reports`, icon: FileText },
  { name: 'Analytics', href: `/app/${orgSlug}/analytics`, icon: BarChart },
  { name: 'Team', href: `/app/${orgSlug}/team`, icon: Users },
  { name: 'Settings', href: `/app/${orgSlug}/settings`, icon: Settings },
];
```

### STEP 4: Migrate Dashboard Page

Move content from `/app/app/[orgSlug]/page.tsx` to `/app/app/[orgSlug]/dashboard/page.tsx`

Keep existing functionality (field status overview, alerts, quick actions)

### STEP 5: Update Middleware (`/middleware.ts`)

Update protected route patterns:

```typescript
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes - SUPER_ADMIN only
    if (path.startsWith('/admin') && token?.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
    }

    // App routes - validate org access
    if (path.startsWith('/app/')) {
      const orgSlug = path.split('/')[2];
      if (token?.role !== 'SUPER_ADMIN' && token?.organizationSlug !== orgSlug) {
        return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/app/:orgSlug*/:path*',
    '/admin/:path*',
  ],
};
```

### STEP 6: Update Auth Redirects (`/lib/auth.ts`)

Update redirect callback in NextAuth config:

```typescript
callbacks: {
  async redirect({ url, baseUrl }) {
    // After login, redirect based on role
    if (url === baseUrl) {
      const session = await getServerSession(authOptions);
      if (session?.user.role === 'SUPER_ADMIN') {
        return `${baseUrl}/admin`;
      }
      if (session?.user.organizationSlug) {
        return `${baseUrl}/app/${session.user.organizationSlug}/dashboard`;
      }
      return `${baseUrl}/auth/unauthorized`;
    }
    return url.startsWith(baseUrl) ? url : baseUrl;
  },
  // ... other callbacks
}
```

### STEP 7: Build Core Pages (MVP Priority)

**A. Fields List Page** (`/app/app/[orgSlug]/fields/page.tsx`)
- Fetch fields for organization using Prisma
- Display grid of field cards using existing `FieldStatusCard` component
- Add filters: type, status, search
- "Add New Field" button linking to `/app/[orgSlug]/fields/new`

**B. Field Detail Page** (`/app/app/[orgSlug]/fields/[id]/page.tsx`)
- Fetch field data with related testing data, maintenance, reports
- Display field info, status, recent tests
- Show maintenance recommendations
- Edit/Delete buttons

**C. New Field Form** (`/app/app/[orgSlug]/fields/new/page.tsx`)
- Form with: name, type, location, dimensions, manufacturer
- Zod validation
- Create field via Prisma
- Redirect to field detail on success

**D. Testing List** (`/app/app/[orgSlug]/testing/page.tsx`)
- List all testing records for organization
- Filter by field, date range
- Show compliance status indicators
- Link to test details

**E. New Test Form** (`/app/app/[orgSlug]/testing/new/page.tsx`)
- Select field dropdown
- Date picker, technician name
- GMAX/Shear/Infill readings with validation
- Weather, notes, photo upload
- Auto-calculate compliance status
- Create TestingData record

### STEP 8: Add Redirects for Old Routes

Create redirect file at `/app/dashboard/page.tsx`:

```typescript
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function OldDashboardRedirect() {
  const session = await getServerSession(authOptions);
  if (session?.user.organizationSlug) {
    redirect(`/app/${session.user.organizationSlug}/dashboard`);
  }
  redirect('/auth/login');
}
```

Do the same for `/app/fields/page.tsx`, `/app/settings/page.tsx`

### STEP 9: Update All Internal Links

Search and replace links throughout codebase:
- `/dashboard` → `/app/[orgSlug]/dashboard`
- `/fields` → `/app/[orgSlug]/fields`
- `/settings` → `/app/[orgSlug]/settings`

Files to check:
- `/components/layout/header.tsx`
- `/components/layout/sidebar.tsx`
- Any other components with navigation links

### STEP 10: Test Authentication Flow

1. Logout and login as USER → should redirect to `/app/[orgSlug]/dashboard`
2. Login as SUPER_ADMIN → should redirect to `/admin`
3. Try accessing another org's URL as USER → should get unauthorized
4. Try accessing app without auth → should redirect to login

### STEP 11: Remove Old Route Files

After confirming redirects work, delete:
- `/app/dashboard/` (if existed)
- `/app/fields/` (if existed at root)
- `/app/settings/` (if existed at root)

Keep only marketing pages at root level.

---

## DATABASE QUERIES

**Fetch fields for organization:**
```typescript
const fields = await prisma.field.findMany({
  where: { organizationId: orgId },
  include: {
    testingData: { take: 1, orderBy: { testingDate: 'desc' } },
    maintenanceRecommendations: { where: { status: 'PENDING' } },
  },
});
```

**Fetch testing data:**
```typescript
const testingData = await prisma.testingData.findMany({
  where: { field: { organizationId: orgId } },
  include: { field: true },
  orderBy: { testingDate: 'desc' },
});
```

---

## UI COMPONENTS TO REUSE

Existing components you can use:
- `/components/ui/field-status-card.tsx` - For field grid display
- `/components/ui/status-overview.tsx` - For dashboard stats
- `/components/ui/maintenance-alerts.tsx` - For alert display
- `/components/ui/performance-chart.tsx` - For analytics charts

---

## SUCCESS CRITERIA

✅ User logs in → redirects to `/app/[orgSlug]/dashboard`
✅ All app pages accessible under `/app/[orgSlug]/*`
✅ Sidebar navigation works correctly
✅ User can only access their organization (except SUPER_ADMIN)
✅ Fields list, detail, and create form work
✅ Testing data list and create form work
✅ Old routes redirect to new structure
✅ Marketing pages remain public at root level
✅ Mobile responsive layout

---

## NOTES

- Use existing Prisma schema (no DB changes needed)
- Leverage existing UI components where possible
- Keep mobile responsiveness (Tailwind responsive classes)
- Add loading states with Suspense boundaries
- Use server components by default, client components only when needed
- Follow Next.js 15 App Router patterns (server actions, not API routes where possible)

---

## FILE PATHS REFERENCE

- **Auth Config:** `/lib/auth.ts`
- **Middleware:** `/middleware.ts`
- **Prisma Schema:** `/prisma/schema.prisma`
- **Existing Org Page:** `/app/app/[orgSlug]/page.tsx`
- **Sidebar:** `/components/layout/sidebar.tsx`
- **Header:** `/components/layout/header.tsx`

---

**Start with Steps 1-6 to establish foundation, then build pages 7-9. Test everything in Step 10 before cleanup in Step 11.**
