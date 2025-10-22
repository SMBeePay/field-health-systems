/**
 * Script to update admin and demo user passwords
 *
 * Usage:
 *   1. Set ADMIN_PASSWORD and DEMO_PASSWORD in .env.local
 *   2. Run: npx tsx scripts/update-passwords.ts
 *
 * This script will update the passwords for existing users without
 * affecting any other data in the database.
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function updatePasswords() {
  console.log('🔐 Updating user passwords...')

  // Validate environment variables
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD environment variable is required')
  }
  if (!process.env.DEMO_PASSWORD) {
    throw new Error('DEMO_PASSWORD environment variable is required')
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'andrew@fieldhealthsystems.com'
  const demoEmail = process.env.DEMO_EMAIL || 'demo@fieldhealthsystems.com'

  try {
    // Update admin password
    const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
    const adminUser = await prisma.user.update({
      where: { email: adminEmail },
      data: { password: hashedAdminPassword },
    })
    console.log('✅ Updated admin password for:', adminUser.email)

    // Update demo password
    const hashedDemoPassword = await bcrypt.hash(process.env.DEMO_PASSWORD, 12)
    const demoUser = await prisma.user.update({
      where: { email: demoEmail },
      data: { password: hashedDemoPassword },
    })
    console.log('✅ Updated demo password for:', demoUser.email)

    console.log('\n🎉 Password update completed successfully!')
    console.log('\n⚠️  IMPORTANT: These new passwords are now active.')
    console.log('   Make sure to securely store the credentials from your .env.local file')
  } catch (error) {
    console.error('❌ Failed to update passwords:')
    console.error(error)
    throw error
  }
}

updatePasswords()
  .catch((e) => {
    console.error('Error updating passwords:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
