# Demo User Credentials

## Live Site Access

**URL:** https://www.fieldhealthsystems.com/auth/login

**Demo Account:**
- **Email:** `demo@fieldhealthsystems.com`
- **Password:** `DemoField2025!`
- **Role:** Organization Admin (Field Manager)
- **Organization:** Demo Sports Complex

## What You Can Test

The demo user has access to:

1. **Dashboard** - View field health overview
2. **Fields** - 1 demo football field with complete data
3. **Testing Data** - GMAX, shear, and infill depth readings
4. **Maintenance Recommendations** - View and manage maintenance tasks
5. **Compliance Reports** - ASTM F1936 compliance documentation
6. **Field Details** - Satellite view, dimensions, and testing locations

## Setup Instructions (For Deployment)

### First-Time Setup in Vercel

1. **Set Environment Variables:**
   ```bash
   # In Vercel Dashboard > Settings > Environment Variables
   DEMO_EMAIL=demo@fieldhealthsystems.com
   DEMO_PASSWORD=DemoField2025!
   ```

2. **Run Database Seed:**
   ```bash
   npx prisma db seed
   ```

### Updating Demo Password

If you need to change the demo password:

1. Update `DEMO_PASSWORD` in Vercel environment variables
2. Run the password update script:
   ```bash
   npx tsx scripts/update-passwords.ts
   ```

## Security Notes

⚠️ **Important:**
- This is a demo account for testing purposes
- Do not use this password for production admin accounts
- The demo organization is isolated from real data
- All demo data is clearly marked with "Demo" prefix

## Admin Account

For system administration, use the separate admin account:
- **Email:** `andrew@fieldhealthsystems.com`
- **Password:** (Set via `ADMIN_PASSWORD` environment variable)
- **Role:** SUPER_ADMIN

---

*Last Updated: 2025-12-18*
