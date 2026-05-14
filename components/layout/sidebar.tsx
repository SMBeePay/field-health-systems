'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MapPin,
  TestTube,
  Wrench,
  FileText,
  BarChart3,
  Users,
  Settings,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Fields', href: '/fields', icon: MapPin },
  { name: 'Testing Data', href: '/testing', icon: TestTube },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="w-64 flex-shrink-0 flex flex-col"
      style={{ background: '#12324A', borderRight: '1px solid #0d2438', minHeight: '100vh' }}
    >
      {/* Logo area */}
      <div className="px-5 py-5 border-b" style={{ borderColor: '#0d2438' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#4CAF50' }}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Field Health</div>
            <div className="text-xs leading-tight" style={{ color: '#64748b' }}>Systems</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-3 py-4 space-y-0.5">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.04 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 relative',
                  isActive
                    ? 'text-white'
                    : 'hover:text-white'
                )}
                style={isActive ? {
                  background: '#1a4466',
                  color: '#fff',
                  borderLeft: '3px solid #1F8A8A',
                  paddingLeft: '9px',
                } : {
                  color: '#94a3b8',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = '#1a4466'
                    ;(e.currentTarget as HTMLElement).style.color = '#fff'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = ''
                    ;(e.currentTarget as HTMLElement).style.color = '#94a3b8'
                  }
                }}
              >
                <item.icon
                  className="mr-3 h-4 w-4 flex-shrink-0 transition-colors duration-150"
                  style={{ color: isActive ? '#1F8A8A' : undefined }}
                />
                {item.name}
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom org label */}
      <div className="px-5 py-4 border-t" style={{ borderColor: '#0d2438' }}>
        <div className="text-xs font-medium" style={{ color: '#64748b' }}>Lincoln High School</div>
        <div className="text-xs mt-0.5" style={{ color: '#475569' }}>Athletic Director</div>
      </div>
    </motion.nav>
  )
}
