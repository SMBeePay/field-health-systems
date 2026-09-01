'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface MarketingNavProps {
  /** Highlight one nav link as active (matches href) */
  activePath?: string
}

const NAV_LINKS = [
  { label: 'Services',     href: '/services/turf-testing' },
  { label: 'Solutions',    href: '/#solutions' },
  { label: 'Resources',    href: '/resources' },
  { label: 'Athlete Safety', href: '/athlete-safety' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Contact',      href: '/contact' },
]

export function MarketingNav({ activePath }: MarketingNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm shadow-sm"
      style={{ borderColor: '#E6E6EA' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/fhs-horizontal-approved.svg"
              alt="Field Health Systems"
              width={160}
              height={24}
              className="h-5 sm:h-6 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activePath === href
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-semibold transition-colors relative group/link whitespace-nowrap"
                  style={{ color: isActive ? '#1E88E5' : '#0D1B2A' }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#1E88E5' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#0D1B2A' }}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#1E88E5]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <Link
              href="/app/login"
              className="text-sm font-semibold transition-colors whitespace-nowrap"
              style={{ color: '#0D1B2A' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#1E88E5')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#0D1B2A')}
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/schedule-assessment"
                className="inline-block text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                style={{ background: '#1E88E5' }}
              >
                Get Free Quote
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0D1B2A] hover:text-[#1E88E5] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
            style={{ borderColor: '#E6E6EA' }}
          >
            <nav className="px-4 py-4 space-y-3 bg-white">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activePath === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-base font-semibold transition-colors"
                    style={{ color: isActive ? '#1E88E5' : '#0D1B2A' }}
                  >
                    {label}
                  </Link>
                )
              })}
              <div className="pt-4 space-y-3 border-t" style={{ borderColor: '#E6E6EA' }}>
                <Link
                  href="/app/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold"
                  style={{ color: '#0D1B2A' }}
                >
                  Sign In
                </Link>
                <Link
                  href="/schedule-assessment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-base font-semibold text-white px-5 py-3 rounded-lg"
                  style={{ background: '#1E88E5' }}
                >
                  Get Free Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
