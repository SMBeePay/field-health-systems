import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ROLE_LABELS } from '@/lib/permissions'
import { AppShell } from '@/components/layout/app-shell'

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ orgSlug: string }>
}) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/app/auth/login?callbackUrl=/app/${orgSlug}`)
  }

  if (session.user.role !== 'SUPER_ADMIN' && session.user.organizationSlug !== orgSlug) {
    redirect('/app/auth/unauthorized')
  }

  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    select: {
      name: true,
      maintenanceRecommendations: {
        where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
        select: { id: true },
      },
    },
  })

  if (!organization) {
    redirect('/app/auth/unauthorized')
  }

  return (
    <AppShell
      orgSlug={orgSlug}
      orgName={organization.name}
      userName={session.user.name ?? session.user.email}
      userRoleLabel={ROLE_LABELS[session.user.role]}
      alertsCount={organization.maintenanceRecommendations.length}
    >
      {children}
    </AppShell>
  )
}
