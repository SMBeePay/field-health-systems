# Vercel Deployment Fix - Quick Action Guide

## 🚨 Why Deployment Failed

Your Vercel deployment is failing because **critical environment variables are missing**. The app cannot build without these.

## ✅ Fix This in 5 Minutes

### Step 1: Go to Vercel Environment Variables
1. Open: https://vercel.com/dashboard
2. Select project: **field-health-systems**
3. Click: **Settings** → **Environment Variables**

### Step 2: Add ALL These Variables for Production

Click "Add New" for each variable below:

#### 🔴 CRITICAL - App Won't Build Without These

```bash
Name:  DATABASE_URL
Value: postgresql://YOUR_DB_URL_HERE
Environment: Production ✓
```
**Note:** If you don't have a database yet:
- Fastest option: Use Neon (free): https://console.neon.tech/signup
- Copy the connection string they give you
- It looks like: `postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require`

```bash
Name:  NEXTAUTH_SECRET
Value: st36y3oyNtw+w4Fvr/ler5PEUkV2MUgXAdqvA+Jcq9I=
Environment: Production ✓
```

```bash
Name:  NEXTAUTH_URL
Value: https://www.fieldhealthsystems.com
Environment: Production ✓
```

#### 📧 Required for User Accounts

```bash
Name:  ADMIN_EMAIL
Value: andrew@fieldhealthsystems.com
Environment: Production ✓
```

```bash
Name:  ADMIN_PASSWORD
Value: AdminField2025!
Environment: Production ✓
```

```bash
Name:  DEMO_EMAIL
Value: demo@fieldhealthsystems.com
Environment: Production ✓
```

```bash
Name:  DEMO_PASSWORD
Value: DemoField2025!
Environment: Production ✓
```

### Step 3: Redeploy

**After adding ALL variables:**

1. Go to: **Deployments** tab
2. Find the failed deployment (top of list)
3. Click: **⋯** (three dots) → **Redeploy**
4. ✓ Check: "Use existing Build Cache"
5. Click: **Redeploy**

### Step 4: Initialize Database (One-Time Setup)

After successful deployment, run these commands locally:

```bash
# Pull production environment variables
vercel env pull .env.production

# Initialize database schema
npx prisma db push

# Seed with demo data
npx prisma db seed
```

**Don't have Vercel CLI?**
```bash
npm i -g vercel
vercel login
vercel link  # Select your project
```

## 🔍 Verify It Worked

1. ✅ Deployment shows "Ready" status in Vercel
2. ✅ Visit: https://www.fieldhealthsystems.com
3. ✅ No errors, site loads
4. ✅ Visit: https://www.fieldhealthsystems.com/auth/login
5. ✅ Can login with demo credentials

## ⚠️ Common Issues

### "Still failing after adding variables"
- Make sure you selected **Production** environment for each variable
- Verify you clicked "Save" on each one
- Try "Redeploy" again (sometimes takes 2 tries)

### "Database connection error"
- Double-check DATABASE_URL is correct
- Make sure database exists and is accessible
- Neon databases sometimes need a few minutes to provision

### "Can't seed database"
- Make sure Vercel CLI is installed: `npm i -g vercel`
- Make sure you're in the project directory
- Run `vercel link` first if you haven't

## 📋 Quick Verification Checklist

Before redeploying, verify ALL these are set in Vercel:

- [ ] DATABASE_URL
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL
- [ ] ADMIN_EMAIL
- [ ] ADMIN_PASSWORD
- [ ] DEMO_EMAIL
- [ ] DEMO_PASSWORD

All 7 must be present for Production environment.

## 🎯 Next Time - Prevent This

To avoid this in future deployments:

1. **Environment variables are persistent** - Once set, they survive all deployments
2. **Only need to redeploy** - After setting env vars once, future pushes will auto-deploy successfully
3. **Test builds locally** - Run `npm run build` before pushing to catch errors early

---

**Created:** 2026-08-31
**Status:** Action Required - Add environment variables to Vercel immediately
