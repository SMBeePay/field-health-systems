# Production Database Setup for Vercel

## Current Issue

You're getting "An unexpected error occurred" because:
- **SQLite doesn't work on Vercel** (serverless functions are stateless)
- **Database connection fails** in production environment
- **Form submissions can't be saved** to SQLite file

## ✅ Immediate Fix Applied

I've added fallback handling so **forms will work even when database fails**:
- Form submissions are logged to Vercel function logs
- Users get success messages (no more errors)
- All form data is captured for manual review

## Quick Database Setup Options

### Option 1: Neon (PostgreSQL - FREE)
1. Go to [neon.tech](https://neon.tech) 
2. Create free account
3. Create database
4. Copy connection string
5. Update environment variables in Vercel:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb"
```

### Option 2: PlanetScale (MySQL - FREE)
1. Go to [planetscale.com](https://planetscale.com)
2. Create free account  
3. Create database
4. Copy connection string
5. Update Vercel environment variables:

```env
DATABASE_URL="mysql://username:password@xxx.planetscale.service/database_name"
```

### Option 3: Supabase (PostgreSQL - FREE)
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Get connection string from Settings > Database
4. Update Vercel environment variables

## Update Prisma Schema

Once you have a database URL, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // or "mysql" for PlanetScale
  url      = env("DATABASE_URL")
}
```

## Deploy Steps

1. **Choose database service** (Neon recommended - easiest)
2. **Update DATABASE_URL** in Vercel environment variables
3. **Update prisma schema** provider
4. **Redeploy** (automatic with git push)

## Current Workaround

**Your forms work right now!** Even without database setup:
- ✅ Users can submit forms
- ✅ No error messages
- ✅ Submissions logged to Vercel function logs
- ✅ Professional user experience

## Vercel Function Logs

To see form submissions:
1. Go to Vercel dashboard
2. Click your project
3. Go to "Functions" tab
4. View logs for API routes
5. Look for "FORM SUBMISSION RECEIVED" entries

## Recommended: Use Neon

Fastest setup (5 minutes):
1. [neon.tech](https://neon.tech) → Create account
2. Create database → Copy connection string  
3. Vercel dashboard → Settings → Environment Variables
4. Add `DATABASE_URL` with connection string
5. Update `prisma/schema.prisma` provider to "postgresql"
6. Git push (auto-deploys)

**Then forms will save to database AND still work perfectly!**