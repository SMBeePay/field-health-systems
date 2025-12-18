# Simple Setup Guide for Beginners

**Goal:** Get your demo user login working on the live site

**Time needed:** ~10 minutes

---

## Step 1: Add a Database (3 minutes)

Since Vercel doesn't have built-in Postgres anymore, we'll use **Neon** (free PostgreSQL database) from the Marketplace.

### Option A: Via Vercel Marketplace (Easiest)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com
   - Click on your project: **field-health-systems**

2. **Access Marketplace:**
   - Click the **Storage** tab at the top
   - Scroll down to find **"Explore Marketplace Postgres integrations"**
   - Click that link, OR go directly to: https://vercel.com/integrations/neon

3. **Add Neon Integration:**
   - Click **Add Integration** on the Neon card
   - Select your Vercel account/team
   - Click **Continue**
   - Select your project: **field-health-systems**
   - Click **Continue** and **Add Integration**

4. **Authorize Neon:**
   - You'll be redirected to Neon
   - Click **Authorize** to connect Vercel and Neon
   - Neon will create a free database automatically

5. **Database Created:**
   - Return to Vercel Dashboard → **Settings** → **Environment Variables**
   - You should now see `DATABASE_URL` automatically added! ✅

### Option B: Manual Neon Setup (If Option A doesn't work)

1. **Create Neon Account:**
   - Go to: https://console.neon.tech/signup
   - Sign up (it's free, no credit card needed)

2. **Create Database:**
   - Click **Create a project**
   - Name: `field-health-systems`
   - Region: Choose closest to you
   - Click **Create project**

3. **Copy Connection String:**
   - You'll see a connection string like:
   ```
   postgresql://username:password@ep-xxx-xxx.neon.tech/neondb?sslmode=require
   ```
   - Click **Copy** to copy it

4. **Add to Vercel:**
   - Go to Vercel Dashboard → **Settings** → **Environment Variables**
   - Click **Add New**
   - Name: `DATABASE_URL`
   - Value: Paste your Neon connection string
   - Environment: **Production** ✓
   - Click **Save**

✅ **Done!** The `DATABASE_URL` environment variable is now set.

---

## Step 2: Add Authentication Variables (2 minutes)

1. **Still in Vercel Dashboard:**
   - Click on your project: **field-health-systems**
   - Go to: **Settings** → **Environment Variables**

2. **Add These Variables** (click "Add New" for each):

   **Variable 1:**
   ```
   Name:  NEXTAUTH_SECRET
   Value: st36y3oyNtw+w4Fvr/ler5PEUkV2MUgXAdqvA+Jcq9I=
   Environment: Production ✓
   ```

   **Variable 2:**
   ```
   Name:  NEXTAUTH_URL
   Value: https://www.fieldhealthsystems.com
   Environment: Production ✓
   ```

   **Variable 3:**
   ```
   Name:  ADMIN_EMAIL
   Value: andrew@fieldhealthsystems.com
   Environment: Production ✓
   ```

   **Variable 4:**
   ```
   Name:  ADMIN_PASSWORD
   Value: AdminField2025!
   Environment: Production ✓
   ```

   **Variable 5:**
   ```
   Name:  DEMO_EMAIL
   Value: demo@fieldhealthsystems.com
   Environment: Production ✓
   ```

   **Variable 6:**
   ```
   Name:  DEMO_PASSWORD
   Value: DemoField2025!
   Environment: Production ✓
   ```

✅ **Done!** All required variables are now set.

---

## Step 3: Redeploy Your Site (1 minute)

1. **In Vercel Dashboard:**
   - Click the **Deployments** tab
   - Find the most recent deployment (top of the list)
   - Click the **⋯** (three dots) on the right
   - Click **Redeploy**
   - ✓ Check "Use existing Build Cache"
   - Click **Redeploy** button

2. **Wait for deployment** (usually 1-2 minutes)
   - You'll see a progress indicator
   - Wait until it says "Ready"

✅ **Done!** Your site is redeploying with the new configuration.

---

## Step 4: Initialize the Database (3 minutes)

You need to create the database tables and add demo data.

**Option A: Using Vercel CLI** (if you have it installed):
```bash
# In your local terminal
vercel env pull
npx prisma db push
npx prisma db seed
```

**Option B: Manual approach** (if no CLI):

1. **Download Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login and pull environment:**
   ```bash
   vercel login
   cd /path/to/field-health-systems
   vercel link  # Select your project
   vercel env pull .env.production
   ```

3. **Initialize database:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

**Expected output:**
```
✅ Created demo organization: Demo Sports Complex
✅ Created admin user: andrew@fieldhealthsystems.com
✅ Created demo user: demo@fieldhealthsystems.com
✅ Created demo field: Main Football Field
```

✅ **Done!** Database is ready with demo data.

---

## Step 5: Test Your Login (1 minute)

1. **Visit the login page:**
   - Go to: https://www.fieldhealthsystems.com/auth/login

2. **Login with demo credentials:**
   ```
   Email:    demo@fieldhealthsystems.com
   Password: DemoField2025!
   ```

3. **You should see:**
   ✅ Login successful
   ✅ Dashboard with "Demo Sports Complex"
   ✅ One field: "Main Football Field"

---

## Troubleshooting

### "Configuration" Error Still Appears

**Fix:** Clear your browser cache and hard refresh
- **Windows/Linux:** Press `Ctrl + Shift + R`
- **Mac:** Press `Cmd + Shift + R`

### "Invalid credentials" When Logging In

**Cause:** Database hasn't been seeded yet

**Fix:** Run database seed (see Step 4)

### "Database Error"

**Cause:** Database tables don't exist yet

**Fix:** Run `npx prisma db push` (see Step 4)

### Can't Install Vercel CLI

**Alternative:** You can run commands in Vercel's web dashboard:
1. Go to your project in Vercel
2. Click **Settings** → **General** → scroll to **Command to run seed**
3. Add: `npx prisma db seed`
4. Trigger a new deployment

---

## Summary Checklist

- [ ] Vercel Postgres database created and connected
- [ ] 6 environment variables added (NEXTAUTH_SECRET, NEXTAUTH_URL, etc.)
- [ ] Site redeployed successfully
- [ ] Database initialized with `prisma db push`
- [ ] Demo data seeded with `prisma db seed`
- [ ] Can login at https://www.fieldhealthsystems.com/auth/login
- [ ] See dashboard with demo data

---

## Need Help?

If you get stuck:

1. **Check environment variables:**
   - Vercel Dashboard → Settings → Environment Variables
   - Should see all 7 variables (DATABASE_URL + 6 you added)

2. **Check deployment logs:**
   - Vercel Dashboard → Deployments → Click latest → View Logs
   - Look for any errors in red

3. **Ask for help:**
   - Tell me which step you're stuck on
   - Share any error messages you see

---

**Created:** 2025-12-18
**Estimated Time:** 10 minutes total
