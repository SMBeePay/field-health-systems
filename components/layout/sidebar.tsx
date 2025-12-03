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
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { designTokens } from '@/lib/design-tokens'

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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-64 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 border-r-2 border-indigo-100/50 px-4 py-6 overflow-hidden"
    >
      {/* Field Grid Pattern Background */}
      <div className={cn(
        "absolute inset-0 opacity-30",
        designTokens.patterns.fieldGrid
      )} />

      {/* Gradient Accent Bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600" />

      {/* Logo/Brand Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mb-8 pb-6 border-b-2 border-gradient-to-r from-indigo-200 to-purple-200"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Field Health</p>
            <p className="text-xs text-slate-600">Systems</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Items */}
      <div className="relative space-y-2">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05 + 0.3,
                ease: "easeOut"
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  'group relative flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 overflow-hidden',
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-700 hover:bg-white/60 hover:shadow-md hover:scale-[1.02]'
                )}
              >
                {/* Active state glow effect */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon with enhanced animations */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative z-10"
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0 transition-all duration-300',
                      isActive
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                        : 'text-indigo-600 group-hover:text-purple-600'
                    )}
                  />
                </motion.div>

                <span className="relative z-10">{item.name}</span>

                {/* Active indicator - floating orb */}
                {isActive && (
                  <motion.div
                    layoutId="activeOrb"
                    className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Hover effect - shimmer */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20" />
    </motion.nav>
  )
}