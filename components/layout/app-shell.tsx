'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { AppSidebar } from './app-sidebar'
import { AppHeader } from './app-header'

export function AppShell({
  orgSlug,
  orgName,
  userName,
  userRoleLabel,
  alertsCount,
  children,
}: {
  orgSlug: string
  orgName: string
  userName: string
  userRoleLabel: string
  alertsCount: number
  children: React.ReactNode
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()

  // Technician assessment entry is a dedicated full-screen, edge-to-edge experience
  // (wireframes 03/06) - it renders its own header/progress bar, not the standard shell.
  const isFullScreenRoute = /\/entry(\/|$)/.test(pathname)

  if (isFullScreenRoute) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FA]">
      <div className="hidden md:flex">
        <AppSidebar
          orgSlug={orgSlug}
          orgName={orgName}
          userName={userName}
          userRoleLabel={userRoleLabel}
          alertsCount={alertsCount}
        />
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <div className="relative h-full">
              <button
                onClick={() => setMobileNavOpen(false)}
                className="absolute right-3 top-3 z-10 p-1.5 rounded-lg bg-white/10 text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <AppSidebar
                orgSlug={orgSlug}
                orgName={orgName}
                userName={userName}
                userRoleLabel={userRoleLabel}
                alertsCount={alertsCount}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          orgName={orgName}
          userName={userName}
          userRoleLabel={userRoleLabel}
          alertsCount={alertsCount}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
