'use client'

import { motion } from 'framer-motion'
import { Settings, LogOut, Bell } from 'lucide-react'
import { mockUser } from '@/lib/mock-data'

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b px-6 py-3"
      style={{ borderColor: '#e2e8f0' }}
    >
      <div className="flex items-center justify-between">
        {/* Page context label (filled in by page, defaults to app name) */}
        <div>
          <h1 className="text-lg font-bold" style={{ color: '#12324A' }}>Field Health Systems</h1>
          <p className="text-xs" style={{ color: '#64748b' }}>Professional Turf Monitoring Platform</p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Bell */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg transition-colors hover:bg-slate-100"
            style={{ color: '#64748b' }}
          >
            <Bell className="w-5 h-5" />
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg transition-colors hover:bg-slate-100"
            style={{ color: '#64748b' }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          <div className="w-px h-6 bg-slate-200 mx-1" />

          {/* User avatar */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: '#1F8A8A' }}>
              {mockUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium leading-tight" style={{ color: '#12324A' }}>{mockUser.name}</p>
              <p className="text-xs leading-tight" style={{ color: '#64748b' }}>Athletic Director</p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg transition-colors hover:bg-slate-100"
            style={{ color: '#64748b' }}
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
