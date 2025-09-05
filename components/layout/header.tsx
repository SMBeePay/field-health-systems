'use client'

import { motion } from 'framer-motion'
import { Activity, User, Settings, LogOut } from 'lucide-react'
import { designTokens } from '@/lib/design-tokens'
import { mockUser } from '@/lib/mock-data'

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10"
          >
            <img src="/logo-icon.svg" alt="Field Health Systems" className="w-10 h-10" />
          </motion.div>
          <div>
            <h1 className={designTokens.typography.heading.h4}>Field Health Systems</h1>
            <p className={designTokens.typography.body.small}>Lincoln High School</p>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-right">
              <p className={designTokens.typography.body.small + ' font-medium'}>{mockUser.name}</p>
              <p className={designTokens.typography.body.xs}>Athletic Director</p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}