'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm shadow-sm"
      style={{ borderColor: '#E6E6EA' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/fhs-mark-approved.svg"
              alt="Field Health Systems"
              width={140}
              height={40}
              className="h-8 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activePath === href
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-semibold transition-colors relative group/link"
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

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/app/login"
              className="hidden md:block text-sm font-semibold transition-colors"
              style={{ color: '#0D1B2A' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#1E88E5')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#0D1B2A')}
            >
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/schedule-assessment"
                className="inline-block text-sm font-bold text-white px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                style={{ background: '#1E88E5' }}
              >
                Get Your Free Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
