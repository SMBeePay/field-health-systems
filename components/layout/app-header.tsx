'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Search, Bell, HelpCircle, Building2, ChevronDown, LogOut, Menu } from 'lucide-react'

export function AppHeader({
  orgName,
  userName,
  userRoleLabel,
  alertsCount,
  onMenuClick,
}: {
  orgName: string
  userName: string
  userRoleLabel: string
  alertsCount: number
  onMenuClick?: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center gap-3">
      <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100">
        <Menu className="w-5 h-5" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search fields, assessments, reports..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          {alertsCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[1rem] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
              {alertsCount}
            </span>
          )}
        </button>
        <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors hidden sm:inline-flex">
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-md bg-[#0D1B2A] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-[#0D1B2A] hidden sm:inline">{orgName}</span>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg py-2 z-20">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900 truncate">{userName}</p>
                <p className="text-xs text-slate-500">{userRoleLabel}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
