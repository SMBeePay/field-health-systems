import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const submissions = await prisma.formSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ submissions, total: submissions.length })
  } catch (err) {
    return NextResponse.json({ error: 'Database error', detail: err instanceof Error ? err.message : err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
