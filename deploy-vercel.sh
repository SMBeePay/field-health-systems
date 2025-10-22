#!/bin/bash

# Vercel Deployment and Environment Setup Script
# This script helps deploy the security fixes and set up environment variables

echo "🚀 Vercel Deployment Helper"
echo "=============================="
echo ""

# Check if changes are pushed
echo "✅ Security fixes have been pushed to: claude/investigate-login-page-011CUNGAYj17otfK1XhG6KaK"
echo ""

# Generate new production passwords
echo "🔐 STEP 1: Generate Production Passwords"
echo "Run these commands to generate secure passwords for production:"
echo ""
echo "openssl rand -base64 32  # For ADMIN_PASSWORD"
echo "openssl rand -base64 32  # For DEMO_PASSWORD"
echo ""

# Set up Vercel environment variables
echo "⚙️  STEP 2: Set Environment Variables in Vercel"
echo "Go to: https://vercel.com/your-project/settings/environment-variables"
echo ""
echo "Add these environment variables:"
echo "  - ADMIN_EMAIL=andrew@fieldhealthsystems.com"
echo "  - ADMIN_PASSWORD=<your-new-secure-password>"
echo "  - DEMO_EMAIL=demo@fieldhealthsystems.com"
echo "  - DEMO_PASSWORD=<your-new-secure-password>"
echo "  - DATABASE_URL=<your-production-database-url>"
echo "  - NEXTAUTH_URL=https://www.fieldhealthsystems.com"
echo "  - NEXTAUTH_SECRET=<your-nextauth-secret>"
echo ""

# Deployment options
echo "📦 STEP 3: Deploy to Vercel (Choose ONE option)"
echo ""
echo "OPTION A: Merge via GitHub (Recommended)"
echo "  1. Go to: https://github.com/SMBeePay/field-health-systems/compare/master...claude/investigate-login-page-011CUNGAYj17otfK1XhG6KaK"
echo "  2. Create and merge the Pull Request"
echo "  3. Vercel will automatically deploy"
echo ""
echo "OPTION B: Deploy via Vercel CLI"
echo "  1. Login: vercel login"
echo "  2. Link project: vercel link"
echo "  3. Set env vars: vercel env pull .env.production"
echo "  4. Deploy: vercel --prod"
echo ""
echo "OPTION C: Deploy with Token"
echo "  vercel --token=YOUR_VERCEL_TOKEN --prod"
echo ""

# Post-deployment
echo "🔄 STEP 4: Update Database Passwords (After Deployment)"
echo "Once deployed, run this in production:"
echo "  npx tsx scripts/update-passwords.ts"
echo ""
echo "Or trigger via Vercel CLI:"
echo "  vercel run npx tsx scripts/update-passwords.ts --prod"
echo ""

# Verification
echo "✅ STEP 5: Verify Deployment"
echo "  1. Visit: https://www.fieldhealthsystems.com/auth/login"
echo "  2. Verify NO credentials are visible"
echo "  3. Test login with new passwords"
echo "  4. Check deployment logs in Vercel dashboard"
echo ""

echo "⚠️  CRITICAL: The old passwords are compromised and must not be used!"
echo ""
