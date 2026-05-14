'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield } from 'lucide-react'

interface MarketingNavProps {
  /** Highlight one nav link as active (matches href) */
  activePath?: string
}

const NAV_LINKS = [
  { label: 'Services',     href: '/services/gmax-testing' },
  { label: 'Solutions',    href: '/#solutions' },
  { label: 'Resources',    href: '/resources' },
  { label: 'Athlete Safety', href: '/athlete-safety' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
]

export function MarketingNav({ activePath }: MarketingNavProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b"
      style={{ background: '#12324A', borderColor: '#0d2438' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
              style={{ background: '#4CAF50' }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-tight block">Field Health Systems</span>
            </div>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activePath === href
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium transition-colors"
                  style={{ color: isActive ? '#4CAF50' : '#94a3b8' }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#4CAF50' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden md:block text-sm font-medium transition-colors"
              style={{ color: '#94a3b8' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#94a3b8')}
            >
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/schedule-assessment"
                className="inline-block text-sm font-semibold text-white px-5 py-2 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: '#4CAF50' }}
              >
                Schedule Assessment
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
