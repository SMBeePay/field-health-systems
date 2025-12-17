# Field Health Systems - App Section Restructure PRD

**Last Updated:** December 17, 2025
**Status:** Planning / Awaiting Approval

---

## 1. EXECUTIVE SUMMARY

Restructure the application to create a clear separation between public-facing marketing pages and authenticated app functionality, establishing `fieldhealthsystems.com/app/*` as the primary namespace for all authenticated user interactions.

---

## 2. CURRENT STATE ANALYSIS

### Existing Structure Issues:
- **Mixed Page Organization**: App pages (`/dashboard`, `/fields`, `/settings`) are at root level alongside marketing pages
- **Inconsistent Routing**: Already have `/app/[orgSlug]` for organizations, but other app pages aren't under `/app/*`
- **Navigation Complexity**: Sidebar navigation points to root-level routes instead of namespaced app routes
- **URL Confusion**: No clear visual separation between marketing and app sections

### What's Already Working:
✅ NextAuth authentication with role-based access (SUPER_ADMIN, ORG_ADMIN, USER, DEMO)
✅ Middleware protecting routes
✅ Multi-tenant support via `/app/[orgSlug]` structure
✅ Prisma ORM with User, Organization, Field, TestingData models
✅ Existing UI components (Header, Sidebar, Field cards, Charts)

---

## 3. PROPOSED URL STRUCTURE

### Option A: Full Migration (RECOMMENDED)
Move ALL app functionality under `/app/[orgSlug]/*` for true multi-tenant isolation:

```
PUBLIC MARKETING (No Auth Required):
/                              → Marketing homepage
/marketing                     → Marketing page
/resources/*                   → Educational content
/blog/*                        → Blog posts
/contact                       → Contact form
/partnerships                  → Partnerships page
/athlete-safety                → Athlete safety info
/testing                       → Testing info
/maintenance                   → Maintenance info
/team                          → Team page
/services/*                    → Service pages
/schedule-assessment           → Assessment booking

AUTHENTICATION:
/auth/login                    → Login page
/auth/forgot-password          → Password reset
/auth/reset-password           → Password reset form
/auth/unauthorized             → Unauthorized access

AUTHENTICATED APP (Requires Login):
/app/[orgSlug]/dashboard       → Organization dashboard (main landing after login)
/app/[orgSlug]/fields          → Field management list
/app/[orgSlug]/fields/[id]     → Individual field details
/app/[orgSlug]/fields/new      → Add new field
/app/[orgSlug]/testing         → Testing data management
/app/[orgSlug]/testing/[id]    → Test results details
/app/[orgSlug]/testing/new     → Schedule/enter new test
/app/[orgSlug]/maintenance     → Maintenance recommendations
/app/[orgSlug]/maintenance/[id]→ Maintenance task details
/app/[orgSlug]/reports         → Compliance reports
/app/[orgSlug]/reports/[id]    → Report details
/app/[orgSlug]/reports/generate→ Generate new report
/app/[orgSlug]/analytics       → Organization analytics
/app/[orgSlug]/team            → Team management (view/invite users)
/app/[orgSlug]/settings        → Organization settings

ADMIN PANEL (SUPER_ADMIN Only):
/admin                         → Admin dashboard
/admin/users                   → User management
/admin/organizations           → Organization management
/admin/settings                → System settings
```

### Option B: Hybrid Approach
Keep `/admin/*` separate but move user app under `/app/[orgSlug]/*`:
- Same as Option A, but `/admin/*` stays at root level
- Simpler migration path
- Still achieves clear marketing vs. app separation

**Decision Needed:** Which option do you prefer?

---

## 4. IMPLEMENTATION CHECKLIST

### PHASE 1: Foundation & Structure Setup
**Goal:** Establish the new `/app/[orgSlug]/*` architecture without breaking existing functionality

- [ ] **1.1** Create new directory structure under `/app/[orgSlug]/`
  - [ ] Create `/app/[orgSlug]/layout.tsx` (App layout with Header, Sidebar, Session handling)
  - [ ] Create `/app/[orgSlug]/dashboard/page.tsx` (migrate from current org page)
  - [ ] Create subdirectories: `fields/`, `testing/`, `maintenance/`, `reports/`, `analytics/`, `team/`, `settings/`

- [ ] **1.2** Update middleware configuration
  - [ ] Update protected route patterns to `/app/[orgSlug]/*`
  - [ ] Remove old root-level patterns (`/dashboard/*`, `/fields/*`, `/settings/*`)
  - [ ] Ensure proper orgSlug validation (users can only access their org)
  - [ ] Test SUPER_ADMIN can access any org

- [ ] **1.3** Update authentication redirects
  - [ ] Modify `/lib/auth.ts` callbacks to redirect to `/app/[orgSlug]/dashboard`
  - [ ] Update login page redirect logic
  - [ ] Handle cases where user has no organization assigned

- [ ] **1.4** Create shared app layout components
  - [ ] Update `/components/layout/header.tsx` for app context
  - [ ] Update `/components/layout/sidebar.tsx` with new navigation links
  - [ ] Add organization switcher component (for SUPER_ADMIN)
  - [ ] Add breadcrumb navigation component
  - [ ] Ensure mobile responsiveness

### PHASE 2: Page Migration & Feature Parity
**Goal:** Migrate existing functionality to new structure

- [ ] **2.1** Dashboard Page (`/app/[orgSlug]/dashboard/`)
  - [ ] Migrate existing org dashboard content
  - [ ] Add welcome message with user name
  - [ ] Display field status overview (existing StatusOverview component)
  - [ ] Show recent activity/alerts
  - [ ] Quick action cards (Add Field, Schedule Test, View Reports)
  - [ ] Role-based feature visibility

- [ ] **2.2** Fields Management (`/app/[orgSlug]/fields/`)
  - [ ] **List View** (`/fields/page.tsx`)
    - [ ] Display all organization fields in grid/list
    - [ ] Filter by field type (Football, Soccer, Baseball, etc.)
    - [ ] Filter by status (Excellent, Good, Monitor, Critical)
    - [ ] Search by field name
    - [ ] Sort options (name, status, last tested)
    - [ ] "Add New Field" button

  - [ ] **Detail View** (`/fields/[id]/page.tsx`)
    - [ ] Field information display (name, type, location, dimensions)
    - [ ] Current status with visual indicator
    - [ ] Testing history timeline
    - [ ] Maintenance history
    - [ ] Associated compliance reports
    - [ ] Photo gallery
    - [ ] Edit/Delete actions (if user has permission)

  - [ ] **New/Edit Form** (`/fields/new/page.tsx`, `/fields/[id]/edit/page.tsx`)
    - [ ] Form fields: name, type, location, dimensions, manufacturer info
    - [ ] Image upload functionality
    - [ ] Validation with Zod schema
    - [ ] Save and cancel actions

- [ ] **2.3** Testing Data (`/app/[orgSlug]/testing/`)
  - [ ] **List View** (`/testing/page.tsx`)
    - [ ] Display all testing records for organization
    - [ ] Group by field or show all
    - [ ] Filter by date range, technician, field
    - [ ] Status indicators for GMAX/Shear compliance
    - [ ] "Schedule New Test" button

  - [ ] **Detail View** (`/testing/[id]/page.tsx`)
    - [ ] Display all test data (GMAX, Shear, Infill readings)
    - [ ] Show compliance status with visual indicators
    - [ ] Weather conditions, technician notes
    - [ ] Photo documentation
    - [ ] Generate PDF report action

  - [ ] **New Test Form** (`/testing/new/page.tsx`)
    - [ ] Select field from dropdown
    - [ ] Testing date picker
    - [ ] Technician information
    - [ ] GMAX/Shear/Infill data entry with real-time validation
    - [ ] Weather conditions
    - [ ] Notes and photo upload
    - [ ] Auto-calculate compliance status

- [ ] **2.4** Maintenance (`/app/[orgSlug]/maintenance/`)
  - [ ] **List View** (`/maintenance/page.tsx`)
    - [ ] Display all maintenance recommendations
    - [ ] Filter by priority (High, Medium, Low)
    - [ ] Filter by status (Pending, In Progress, Completed, Deferred)
    - [ ] Filter by field
    - [ ] Sort by due date, priority, estimated cost
    - [ ] "Create Recommendation" button

  - [ ] **Detail View** (`/maintenance/[id]/page.tsx`)
    - [ ] Full recommendation details
    - [ ] Associated field information
    - [ ] Progress tracking
    - [ ] Cost estimates vs. actuals
    - [ ] Photo documentation
    - [ ] Mark complete/update status

  - [ ] **New/Edit Form** (`/maintenance/new/page.tsx`)
    - [ ] Select field
    - [ ] Title, description, priority
    - [ ] Estimated cost, hours, due date
    - [ ] Vendor assignment (future feature)

- [ ] **2.5** Reports (`/app/[orgSlug]/reports/`)
  - [ ] **List View** (`/reports/page.tsx`)
    - [ ] Display all compliance reports
    - [ ] Filter by report type, status, field
    - [ ] Show expiration warnings
    - [ ] "Generate Report" button

  - [ ] **Detail View** (`/reports/[id]/page.tsx`)
    - [ ] Full report display
    - [ ] Download PDF
    - [ ] Share report functionality
    - [ ] Compliance status indicators

  - [ ] **Generate Report** (`/reports/generate/page.tsx`)
    - [ ] Select field(s) for report
    - [ ] Select report type
    - [ ] Date range selection
    - [ ] Preview before generation
    - [ ] Generate PDF

- [ ] **2.6** Analytics (`/app/[orgSlug]/analytics/`)
  - [ ] **Overview Dashboard** (`/analytics/page.tsx`)
    - [ ] Organization-wide metrics
    - [ ] Field performance trends (using Recharts)
    - [ ] Testing compliance rate over time
    - [ ] Maintenance costs tracking
    - [ ] Alert frequency analysis
    - [ ] Export data functionality

  - [ ] **Field-Specific Analytics**
    - [ ] Individual field performance over time
    - [ ] GMAX/Shear trend charts
    - [ ] Maintenance cost per field
    - [ ] Compare fields side-by-side

- [ ] **2.7** Team Management (`/app/[orgSlug]/team/`)
  - [ ] **Team List** (`/team/page.tsx`)
    - [ ] Display all organization users
    - [ ] Show roles and status
    - [ ] Search and filter users
    - [ ] "Invite User" button (ORG_ADMIN only)

  - [ ] **User Detail** (`/team/[userId]/page.tsx`)
    - [ ] User profile information
    - [ ] Activity history
    - [ ] Edit role/permissions (ORG_ADMIN only)
    - [ ] Deactivate user

  - [ ] **Invite User** (`/team/invite/page.tsx`)
    - [ ] Email input with validation
    - [ ] Role selection
    - [ ] Send invitation
    - [ ] Pending invitations list

- [ ] **2.8** Organization Settings (`/app/[orgSlug]/settings/`)
  - [ ] **General Settings** (`/settings/page.tsx`)
    - [ ] Organization name, logo
    - [ ] Contact information
    - [ ] Subscription info (read-only for non-admins)

  - [ ] **User Profile Settings**
    - [ ] User name, email, phone, title
    - [ ] Profile photo
    - [ ] Change password
    - [ ] Notification preferences

### PHASE 3: UI/UX Enhancements
**Goal:** Polish the user experience with modern, intuitive UI

- [ ] **3.1** Design System
  - [ ] Establish color palette for app section (distinct from marketing)
  - [ ] Define typography scale
  - [ ] Create consistent spacing system
  - [ ] Document component patterns

- [ ] **3.2** Navigation Enhancements
  - [ ] Active state indicators in sidebar
  - [ ] Breadcrumb navigation on all pages
  - [ ] Mobile-responsive hamburger menu
  - [ ] Search functionality in header (global search)
  - [ ] Quick actions menu/command palette (Cmd+K)

- [ ] **3.3** Data Visualization
  - [ ] Status badges with consistent color coding
  - [ ] Progress bars for tasks/compliance
  - [ ] Interactive charts (Recharts configuration)
  - [ ] Data tables with sorting, filtering, pagination
  - [ ] Empty states with helpful CTAs

- [ ] **3.4** User Feedback
  - [ ] Toast notifications for actions (success/error)
  - [ ] Loading states for async operations
  - [ ] Confirmation modals for destructive actions
  - [ ] Form validation with helpful error messages
  - [ ] Success states with clear next steps

- [ ] **3.5** Accessibility
  - [ ] Keyboard navigation support
  - [ ] Screen reader compatibility (ARIA labels)
  - [ ] Focus states on interactive elements
  - [ ] Sufficient color contrast ratios
  - [ ] Semantic HTML structure

- [ ] **3.6** Performance
  - [ ] Implement loading skeletons for data fetching
  - [ ] Optimize images (next/image)
  - [ ] Code splitting for large pages
  - [ ] Prefetch critical routes
  - [ ] Monitor Core Web Vitals

### PHASE 4: Testing & Migration
**Goal:** Ensure reliability and smooth transition

- [ ] **4.1** Automated Testing
  - [ ] Unit tests for new components
  - [ ] Integration tests for page flows
  - [ ] E2E tests for critical user journeys (login → dashboard → add field)
  - [ ] Test role-based access controls

- [ ] **4.2** Migration Strategy
  - [ ] Deploy new `/app/[orgSlug]/*` structure alongside old routes
  - [ ] Add redirects from old routes to new routes
  - [ ] Update all internal links
  - [ ] Monitor error logs for broken links
  - [ ] Remove old route files after successful migration

- [ ] **4.3** Documentation
  - [ ] Update README with new structure
  - [ ] Document API endpoints and data models
  - [ ] Create user guide for app features
  - [ ] Document admin workflows

### PHASE 5: Future Enhancements (Post-MVP)
**Goal:** Extend functionality based on user feedback

- [ ] **5.1** Advanced Features
  - [ ] Bulk actions (multi-select fields, bulk status updates)
  - [ ] CSV import/export for data
  - [ ] Advanced filtering with saved filters
  - [ ] Customizable dashboards
  - [ ] Scheduled reports via email

- [ ] **5.2** Collaboration
  - [ ] Comments/notes on fields and tests
  - [ ] @mentions for team collaboration
  - [ ] Activity feed showing team actions
  - [ ] Real-time updates (WebSockets)

- [ ] **5.3** Integrations
  - [ ] Calendar integration for scheduled testing
  - [ ] Email notifications for alerts
  - [ ] Third-party vendor portals
  - [ ] API for external tools

---

## 5. TECHNICAL CONSIDERATIONS

### Database Changes Required:
- No major schema changes needed initially
- May need to add indexes for performance on fields filtered by orgSlug
- Consider adding `lastAccessedAt` to User model for analytics

### API Endpoints:
Current API structure should mostly work as-is since they're already namespaced under `/api/organizations/[slug]/*`

### Middleware Updates:
```typescript
// Update protected patterns in middleware.ts
const appRoutes = [
  '/app/:orgSlug/dashboard',
  '/app/:orgSlug/fields',
  '/app/:orgSlug/testing',
  '/app/:orgSlug/maintenance',
  '/app/:orgSlug/reports',
  '/app/:orgSlug/analytics',
  '/app/:orgSlug/team',
  '/app/:orgSlug/settings',
];
```

### Authentication Flow:
```
1. User logs in at /auth/login
2. NextAuth validates credentials
3. If SUPER_ADMIN → redirect to /admin
4. If USER/ORG_ADMIN → redirect to /app/[userOrgSlug]/dashboard
5. If no organization → redirect to /auth/unauthorized with message
```

---

## 6. DESIGN MOCKUP PRIORITIES

Before building, we should create mockups for:

1. **Dashboard** - Primary landing page, sets tone for entire app
2. **Field List & Detail** - Core functionality, most-used feature
3. **Navigation Layout** - Sidebar, header, breadcrumbs (applies to all pages)
4. **Mobile Responsive** - How sidebar collapses, navigation works on mobile

**Question:** Do you have design preferences or would you like me to suggest a design direction based on modern SaaS app patterns?

---

## 7. OPEN QUESTIONS FOR DISCUSSION

1. **URL Structure**: Option A (full migration) or Option B (hybrid)?
2. **Priority Pages**: Which pages are most critical for MVP? (I recommend: Dashboard, Fields, Testing Data)
3. **Design Direction**: Modern, minimal SaaS aesthetic or more traditional enterprise UI?
4. **Mobile Experience**: Mobile-first or desktop-first approach?
5. **Data Migration**: Do we need to migrate/seed any demo data for testing?
6. **User Onboarding**: Should we add a first-time user walkthrough/tour?
7. **Organizations**: How should we handle users without an organization? Create default org? Block access?

---

## 8. SUCCESS METRICS

Post-launch, we'll track:
- User engagement (time in app, pages per session)
- Feature adoption (which sections get used most)
- Mobile vs. desktop usage
- Page load performance
- Error rates and user feedback

---

## 9. TIMELINE ESTIMATE (ROUGH)

- **Phase 1 (Foundation)**: 1-2 days
- **Phase 2 (Page Migration)**: 3-5 days (depending on scope)
- **Phase 3 (UI/UX Polish)**: 2-3 days
- **Phase 4 (Testing)**: 1-2 days
- **Phase 5 (Future)**: Ongoing

**Total MVP Estimate**: 7-12 days of focused development

---

## 10. NEXT STEPS

Once you approve this PRD:

1. **Decide on URL structure** (Option A or B)
2. **Prioritize pages** for MVP (suggest: Dashboard, Fields, Testing)
3. **Approve design direction** (or review mockups first)
4. **I'll begin implementation** following the checklist
5. **Iterative review** after each phase

---

## APPROVAL

**Reviewed By:**
**Approved Date:**
**Priority Adjustments:**
**Scope Changes:**

---

**Ready to proceed?** Let me know:
1. Which URL structure option you prefer
2. Which pages are highest priority for initial build
3. Any design preferences or constraints
4. Any concerns or modifications to this plan
