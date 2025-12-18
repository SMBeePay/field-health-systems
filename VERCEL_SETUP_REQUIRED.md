# 🚨 URGENT: Vercel Environment Variables Required

## The Issue

You're getting a `Configuration` error because **critical environment variables are missing** in your Vercel production deployment.

NextAuth requires these variables to function (see lib/auth.ts:89):
- `NEXTAUTH_SECRET` - **MISSING** ❌
- `NEXTAUTH_URL` - **MISSING** ❌
- `DATABASE_URL` - **MISSING** ❌

## Immediate Fix Required

### Step 1: Access Vercel Dashboard

1. Go to: https://vercel.com
2. Select your project: **field-health-systems**
3. Navigate to: **Settings → Environment Variables**

### Step 2: Add Required Environment Variables

Add these variables for **Production** environment:

#### 🔐 Authentication (CRITICAL)

```bash
NEXTAUTH_SECRET=st36y3oyNtw+w4Fvr/ler5PEUkV2MUgXAdqvA+Jcq9I=
NEXTAUTH_URL=https://www.fieldhealthsystems.com
```

#### 💾 Database (CRITICAL)

You need a production database. Choose one:

**Option A: Neon (Recommended - Free tier available)**
```bash
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.neon.tech/neondb?sslmode=require
```

**Option B: PlanetScale**
```bash
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/database_name?sslaccept=strict
```

**Option C: Vercel Postgres**
```bash
# Vercel will auto-populate this if you add Vercel Postgres
DATABASE_URL=postgres://default:xxx@xxx-pooler.vercel-storage.com:5432/verceldb
```

#### 👤 User Credentials (REQUIRED)

```bash
ADMIN_EMAIL=andrew@fieldhealthsystems.com
ADMIN_PASSWORD=YourSecureAdminPassword123!

DEMO_EMAIL=demo@fieldhealthsystems.com
DEMO_PASSWORD=DemoField2025!
```

#### 📧 Email (Optional - for password reset)

```bash
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@fieldhealthsystems.com
```

### Step 3: Set Up Database

After adding environment variables:

1. **If using a new database**, you need to initialize it:

```bash
# In your local terminal or Vercel CLI
npx prisma db push
npx prisma db seed
```

2. **Or use Vercel CLI** (if installed):

```bash
vercel env pull .env.production
npx prisma db push
npx prisma db seed
```

### Step 4: Redeploy

After adding all environment variables:

1. Go to: **Deployments** tab in Vercel
2. Click on the latest deployment
3. Click: **⋯** (three dots) → **Redeploy**
4. Check: ✅ Use existing build cache
5. Click: **Redeploy**

## Quick Database Setup Options

### Fastest Option: Neon (PostgreSQL)

1. Go to: https://neon.tech
2. Sign up (free tier available)
3. Create new project: "field-health-systems"
4. Copy the connection string
5. Add to Vercel as `DATABASE_URL`

### Vercel Native: Vercel Postgres

1. In Vercel Dashboard → Storage
2. Create → Postgres
3. Connect to your project
4. Environment variable auto-populated ✅

## Verification Checklist

After setup, verify these:

- [ ] All environment variables added in Vercel
- [ ] Database created and accessible
- [ ] Deployment successful (no build errors)
- [ ] Visit: https://www.fieldhealthsystems.com/auth/login
- [ ] No "Configuration" error
- [ ] Can see login form
- [ ] Can login with demo credentials

## Test Login After Setup

Once everything is configured:

```
URL:      https://www.fieldhealthsystems.com/auth/login
Email:    demo@fieldhealthsystems.com
Password: DemoField2025!
```

## Common Issues

### "Configuration" Error Still Appears

- Check: NEXTAUTH_SECRET is set
- Check: NEXTAUTH_URL matches your domain exactly
- Try: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### "Database Error"

- Verify: DATABASE_URL is correct
- Check: Database exists and is accessible
- Run: `npx prisma db push` to create tables

### "User Not Found"

- Database needs seeding
- Run: `npx prisma db seed`
- Or manually update passwords: `npx tsx scripts/update-passwords.ts`

## Need Help?

If you're stuck, tell me:
1. Which database provider you want to use
2. If you've already created a database
3. Any error messages you see

I can provide specific step-by-step instructions based on your choice!

---

**Created:** 2025-12-18
**Priority:** 🚨 URGENT - Site is non-functional without these variables
