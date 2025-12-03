'use client'

import { motion } from 'framer-motion'
import { User, Settings, LogOut, Bell, Search } from 'lucide-react'
import { designTokens } from '@/lib/design-tokens'
import { mockUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-gradient-to-r from-white via-slate-50 to-indigo-50/30 border-b-2 border-indigo-100/50 px-6 py-4 overflow-hidden backdrop-blur-xl"
    >
      {/* Subtle grid pattern */}
      <div className={cn(
        "absolute inset-0 opacity-20",
        designTokens.patterns.dots
      )} />

      {/* Top gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand with enhanced styling */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center space-x-4"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30"
          >
            <img
              src="/logo-icon.svg"
              alt="Field Health Systems"
              className="w-7 h-7 brightness-0 invert"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-50" />
          </motion.div>

          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Field Health Systems
            </h1>
            <p className="text-sm text-slate-600 font-medium">Lincoln High School</p>
          </div>
        </motion.div>

        {/* Search Bar - New Feature */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center flex-1 max-w-md mx-8"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search fields, reports, analytics..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border-2 border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:shadow-lg focus:shadow-indigo-500/10 transition-all duration-300 placeholder:text-slate-400"
            />
          </div>
        </motion.div>

        {/* User Menu with enhanced design */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center space-x-3"
        >
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
          >
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg shadow-rose-500/50" />
          </motion.button>

          {/* User Profile Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm border-2 border-indigo-100 rounded-xl hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md shadow-indigo-500/30">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-right hidden lg:block">
              <p className="text-sm font-bold text-slate-800">{mockUser.name}</p>
              <p className="text-xs text-slate-600">Athletic Director</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-10" />
      <div className="absolute -bottom-10 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl opacity-10" />
    </motion.header>
  )
}