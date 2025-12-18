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

interface AppSidebarProps {
  orgSlug: string
  userRole: string
}

export function AppSidebar({ orgSlug, userRole }: AppSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: `/app/${orgSlug}/dashboard`, icon: LayoutDashboard },
    { name: 'Fields', href: `/app/${orgSlug}/fields`, icon: MapPin },
    { name: 'Testing', href: `/app/${orgSlug}/testing`, icon: TestTube },
    { name: 'Maintenance', href: `/app/${orgSlug}/maintenance`, icon: Wrench },
    { name: 'Reports', href: `/app/${orgSlug}/reports`, icon: FileText },
    { name: 'Analytics', href: `/app/${orgSlug}/analytics`, icon: BarChart3 },
    { name: 'Team', href: `/app/${orgSlug}/team`, icon: Users },
    { name: 'Settings', href: `/app/${orgSlug}/settings`, icon: Settings },
  ]

  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="w-64 bg-white border-r border-gray-200 px-3 py-6 flex flex-col"
    >
      {/* Logo */}
      <div className="px-3 mb-6">
        <Link href={`/app/${orgSlug}/dashboard`} className="flex items-center space-x-3">
          <img src="/logo-icon.svg" alt="Field Health Systems" className="w-8 h-8" />
          <span className="text-lg font-bold text-gray-900">FHS</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="space-y-1 flex-1">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200',
                      isActive
                        ? 'text-green-600'
                        : 'text-gray-500 group-hover:text-gray-900'
                    )}
                  />
                </motion.div>
                {item.name}
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Admin Link (for SUPER_ADMIN only) */}
      {userRole === 'SUPER_ADMIN' && (
        <div className="pt-4 border-t border-gray-200 mt-4">
          <Link
            href="/admin"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-purple-700 hover:bg-purple-50 transition-all duration-200"
          >
            <Shield className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600" />
            Admin Panel
          </Link>
        </div>
      )}
    </motion.nav>
  )
}
