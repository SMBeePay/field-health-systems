#!/bin/bash

# Demo User Setup Script for Field Health Systems
# This script helps you set up or retrieve demo user credentials

echo "🔐 Field Health Systems - Demo User Setup"
echo "=========================================="
echo ""

DEMO_EMAIL="demo@fieldhealthsystems.com"
DEMO_PASSWORD="DemoField2025!"

echo "📋 Demo User Credentials"
echo "------------------------"
echo "Email:    $DEMO_EMAIL"
echo "Password: $DEMO_PASSWORD"
echo ""

echo "🌐 Live Site: https://www.fieldhealthsystems.com/auth/login"
echo ""

echo "⚙️  To set up in Vercel (for first-time setup):"
echo "1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables"
echo "2. Add these variables for Production:"
echo "   - DEMO_EMAIL=$DEMO_EMAIL"
echo "   - DEMO_PASSWORD=$DEMO_PASSWORD"
echo "3. Redeploy your application"
echo "4. Run database seed: npx prisma db seed"
echo ""

echo "🔄 To update the password for existing demo user:"
echo "1. Set environment variables in Vercel (as above)"
echo "2. Run: npx tsx scripts/update-passwords.ts"
echo ""

echo "✅ You can now login with these credentials!"
echo ""
