import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo organization
  const demoOrg = await prisma.organization.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      name: 'Demo Sports Complex',
      slug: 'demo',
      type: 'DEMO',
      status: 'ACTIVE',
      address: '123 Sports Drive',
      city: 'Demo City',
      state: 'TX',
      zipCode: '75001',
      phone: '555-123-4567',
      website: 'https://demosports.com',
      subscriptionTier: 'premium',
      subscriptionStatus: 'active',
    },
  })

  console.log('✅ Created demo organization:', demoOrg.name)

  // Create admin user (SUPER_ADMIN)
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'AdminPassword123!', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'andrew@fieldhealthsystems.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'andrew@fieldhealthsystems.com',
      name: 'Andrew Martinez',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      title: 'System Administrator',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create demo user
  const demoPassword = await bcrypt.hash(process.env.DEMO_PASSWORD || 'DemoPassword123!', 12)
  const demoUser = await prisma.user.upsert({
    where: { email: process.env.DEMO_EMAIL || 'demo@fieldhealthsystems.com' },
    update: {},
    create: {
      email: process.env.DEMO_EMAIL || 'demo@fieldhealthsystems.com',
      name: 'Demo User',
      password: demoPassword,
      role: 'ORG_ADMIN',
      status: 'ACTIVE',
      organizationId: demoOrg.id,
      title: 'Field Manager',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Create demo field
  const demoField = await prisma.field.upsert({
    where: { id: 'demo-field-1' },
    update: {},
    create: {
      id: 'demo-field-1',
      name: 'Main Football Field',
      type: 'FOOTBALL',
      status: 'GOOD',
      organizationId: demoOrg.id,
      installDate: new Date('2020-06-01'),
      manufacturer: 'FieldTurf',
      surface: 'FieldTurf Revolution 360',
      infillType: 'TPE + Sand',
      totalArea: 87120, // 120 yards x 53.33 yards x 144 sq in/sq yd
      lastTestingDate: new Date('2024-08-15'),
      latitude: 32.7767,
      longitude: -96.7970,
      satelliteImageUrl: '/field-satellite.png',
      length: 120,
      width: 53.33,
      orientation: 15, // degrees from north
      createdBy: demoUser.id,
      updatedBy: demoUser.id,
    },
  })

  console.log('✅ Created demo field:', demoField.name)

  // Create demo testing data with realistic values
  const testingData = await prisma.testingData.create({
    data: {
      fieldId: demoField.id,
      testingDate: new Date('2024-08-15'),
      testingTechnician: 'Sarah Johnson, ASTF Certified',
      weatherConditions: 'Clear, 75°F, Light Breeze',
      temperature: 75.2,
      
      // GMAX readings (good values are typically 55-200)
      gmaxReadings: [62, 58, 65, 59, 61, 64, 57, 60, 63, 66, 55, 62],
      gmaxAverage: 61.0,
      gmaxStatus: 'PASSED',
      
      // Shear readings (acceptable range varies)
      shearReadings: [28, 32, 29, 31, 30, 33, 27, 29, 31, 28, 32, 30],
      shearAverage: 30.0,
      shearStatus: 'PASSED',
      
      // Infill depth readings (typically 0.5-2 inches)
      infillDepthReadings: [1.8, 1.9, 1.7, 2.0, 1.8, 1.9, 1.8, 1.9, 1.7, 1.8, 1.9, 1.8],
      infillDepthAverage: 1.83,
      infillDepthStatus: 'PASSED',
      
      overallStatus: 'PASSED',
      
      notes: 'Field condition is excellent. All measurements within acceptable ranges. Minor infill redistribution recommended in high-traffic areas.',
      photos: ['field-test-1.jpg', 'field-test-2.jpg'],
      
      // Testing locations with yard line positions
      testingLocations: {
        locations: [
          { name: 'North End 10 Yard Line Center', x: 50, y: 10, gmax: 62, shear: 28, infillDepth: 1.8 },
          { name: 'North End 25 Yard Line Left Hash', x: 30, y: 25, gmax: 58, shear: 32, infillDepth: 1.9 },
          { name: 'North End 25 Yard Line Right Hash', x: 70, y: 25, gmax: 65, shear: 29, infillDepth: 1.7 },
          { name: 'North End 40 Yard Line Center', x: 50, y: 40, gmax: 59, shear: 31, infillDepth: 2.0 },
          { name: '50 Yard Line Left Hash', x: 30, y: 50, gmax: 61, shear: 30, infillDepth: 1.8 },
          { name: '50 Yard Line Center', x: 50, y: 50, gmax: 64, shear: 33, infillDepth: 1.9 },
          { name: '50 Yard Line Right Hash', x: 70, y: 50, gmax: 57, shear: 27, infillDepth: 1.8 },
          { name: 'South End 40 Yard Line Center', x: 50, y: 60, gmax: 60, shear: 29, infillDepth: 1.9 },
          { name: 'South End 25 Yard Line Left Hash', x: 30, y: 75, gmax: 63, shear: 31, infillDepth: 1.7 },
          { name: 'South End 25 Yard Line Right Hash', x: 70, y: 75, gmax: 66, shear: 28, infillDepth: 1.8 },
          { name: 'South End 10 Yard Line Center', x: 50, y: 90, gmax: 55, shear: 32, infillDepth: 1.9 },
          { name: 'Goal Line Center', x: 50, y: 100, gmax: 62, shear: 30, infillDepth: 1.8 }
        ]
      },
      
      conductedBy: demoUser.id,
    },
  })

  console.log('✅ Created demo testing data')

  // Create maintenance recommendations
  const maintenanceRec = await prisma.maintenanceRecommendation.create({
    data: {
      fieldId: demoField.id,
      organizationId: demoOrg.id,
      title: 'Infill Redistribution - High Traffic Areas',
      description: 'Redistribute infill material in the center field area (between the 20-yard lines) where player traffic is highest. Focus on hash marks and center field positions.',
      priority: 'MEDIUM',
      status: 'OPEN',
      category: 'Infill Maintenance',
      estimatedCost: 750.00,
      estimatedHours: 6,
      dueDate: new Date('2024-10-01'),
      notes: 'Schedule during off-season or between heavy usage periods. Ensure infill levels meet manufacturer specifications.',
    },
  })

  console.log('✅ Created maintenance recommendations')

  // Create compliance report
  const complianceReport = await prisma.complianceReport.create({
    data: {
      fieldId: demoField.id,
      organizationId: demoOrg.id,
      reportType: 'ASTM F1936 - Standard Specification for Impact Attenuation of Turf Playing Systems',
      status: 'COMPLIANT',
      issuedDate: new Date('2024-08-15'),
      expirationDate: new Date('2025-08-15'),
      summary: 'Field successfully meets all ASTM F1936 requirements for impact attenuation. All GMAX readings within acceptable limits.',
      findings: {
        gmaxCompliance: true,
        averageGmax: 61.0,
        maxAllowedGmax: 200,
        testPointsTotal: 12,
        testPointsPassed: 12,
        recommendations: ['Continue quarterly monitoring', 'Maintain current infill levels']
      },
      recommendations: 'Continue current maintenance schedule. Recommend quarterly testing to ensure ongoing compliance.',
      reportDocument: '/compliance-reports/demo-field-astm-2024.pdf',
    },
  })

  console.log('✅ Created compliance report')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📋 Demo Account Details:')
  console.log(`Demo User: ${demoUser.email}`)
  console.log(`Demo Password: ${process.env.DEMO_PASSWORD || 'DemoPassword123!'}`)
  console.log(`Organization: ${demoOrg.name} (/${demoOrg.slug})`)
  console.log('\n👨‍💼 Admin Account Details:')
  console.log(`Admin User: ${adminUser.email}`)
  console.log(`Admin Password: ${process.env.ADMIN_PASSWORD || 'AdminPassword123!'}`)
  console.log(`Role: ${adminUser.role}`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })