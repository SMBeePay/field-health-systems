'use server'

import { getServerSession } from 'next-auth/next'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { can } from '@/lib/permissions'
import type { MaintenanceStatus } from '@prisma/client'

export async function updateRecommendationStatus(orgSlug: string, recommendationId: string, status: MaintenanceStatus) {
  const session = await getServerSession(authOptions)
  if (!session || !can(session.user.role, 'create_recommendations')) {
    throw new Error('Not authorized to update recommendations')
  }

  await prisma.maintenanceRecommendation.update({
    where: { id: recommendationId },
    data: { status, completedDate: status === 'COMPLETED' ? new Date() : null },
  })

  revalidatePath(`/app/${orgSlug}/alerts`)
}
