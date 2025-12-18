'use client'

import { motion } from 'framer-motion'
import { User, Settings, LogOut, Bell } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface AppHeaderProps {
  orgSlug: string
  userName: string
  userRole: string
}

export function AppHeader({ orgSlug, userName, userRole }: AppHeaderProps) {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin'
      case 'ORG_ADMIN':
        return 'Organization Admin'
      case 'USER':
        return 'User'
      case 'DEMO':
        return 'Demo User'
      default:
        return role
    }
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Page Title Area */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Field Health Systems</h1>
          <p className="text-sm text-gray-500">Field Management Dashboard</p>
        </div>

        {/* Right Side - Notifications & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* User Menu */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{getRoleLabel(userRole)}</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-1">
            <Link href={`/app/${orgSlug}/settings`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut({ callbackUrl: '/' })}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
