'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  LayoutGrid,
  Calendar,
  BarChart3,
  Bell,
  FileText,
  Settings,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CUSTOMER_NAV } from '@/lib/permissions'

const ICONS: Record<string, LucideIcon> = {
  Home,
  LayoutGrid,
  Calendar,
  BarChart3,
  Bell,
  FileText,
  Settings,
}

export function AppSidebar({
  orgSlug,
  orgName,
  userName,
  userRoleLabel,
  alertsCount,
  onNavigate,
}: {
  orgSlug: string
  orgName: string
  userName: string
  userRoleLabel: string
  alertsCount: number
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const base = `/app/${orgSlug}`

  return (
    <nav className="w-64 flex-shrink-0 flex flex-col h-full bg-[#0D1B2A]">
      <div className="px-5 py-5 border-b border-white/10">
        <Image src="/fhs-logo.png" alt="Field Health Systems" width={130} height={36} className="h-8 w-auto object-contain" priority />
      </div>

      <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {CUSTOMER_NAV.map((item) => {
          const href = `${base}${item.href}`
          const isActive = item.href === '' ? pathname === base : pathname === href || pathname.startsWith(href + '/')
          const Icon = ICONS[item.icon]
          return (
            <Link
              key={item.name}
              href={href}
              onClick={onNavigate}
              className={cn(
                'group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150',
                isActive ? 'bg-[#1E88E5] text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              )}
            >
              <span className="flex items-center">
                <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                {item.name}
              </span>
              {item.name === 'Alerts' && alertsCount > 0 && (
                <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold">
                  {alertsCount}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      <div className="px-5 py-4 border-t border-white/10">
        <div className="text-xs font-semibold text-white truncate">{orgName}</div>
        <div className="text-xs mt-2 text-slate-400 truncate">{userName}</div>
        <div className="text-xs text-slate-500 truncate">{userRoleLabel}</div>
      </div>
    </nav>
  )
}
