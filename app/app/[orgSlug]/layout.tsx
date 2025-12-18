import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppHeader } from '@/components/layout/app-header'

interface AppLayoutProps {
  children: React.ReactNode
  params: Promise<{ orgSlug: string }>
}

export default async function AppLayout({
  children,
  params,
}: AppLayoutProps) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  // Validate user has access to this organization
  if (session.user.role !== 'SUPER_ADMIN' &&
      session.user.organizationSlug !== orgSlug) {
    redirect('/auth/unauthorized')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar orgSlug={orgSlug} userRole={session.user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader
          orgSlug={orgSlug}
          userName={session.user.name || session.user.email || 'User'}
          userRole={session.user.role}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
