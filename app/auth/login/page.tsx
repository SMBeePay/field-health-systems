'use client'

import { useState, Suspense } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Shield } from 'lucide-react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        const session = await getSession()
        if (session?.user.role === 'SUPER_ADMIN') {
          router.push('/admin')
        } else if (session?.user.organizationSlug) {
          router.push(`/app/${session.user.organizationSlug}`)
        } else {
          router.push(callbackUrl)
        }
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: '#F7FAFC' }}>
      <div className="w-full max-w-sm">

        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md" style={{ background: '#12324A' }}>
            <Shield className="w-6 h-6" style={{ color: '#4CAF50' }} />
          </div>
          <h1 className="text-2xl font-bold text-center" style={{ color: '#12324A' }}>
            Field Health Systems
          </h1>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-8" style={{ borderColor: '#e2e8f0' }}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: '#334155' }}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full px-3 py-2.5 border rounded-lg text-sm transition-colors"
                style={{ borderColor: '#cbd5e1', color: '#334155', outline: 'none' }}
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={e => (e.target.style.borderColor = '#1F8A8A')}
                onBlur={e => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: '#334155' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-3 py-2.5 border rounded-lg text-sm transition-colors"
                style={{ borderColor: '#cbd5e1', color: '#334155', outline: 'none' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={e => (e.target.style.borderColor = '#1F8A8A')}
                onBlur={e => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium transition-colors"
                style={{ color: '#1F8A8A' }}
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#4CAF50' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#94a3b8' }}>
          Professional Turf Monitoring Platform
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F7FAFC' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: '#1F8A8A' }}></div>
          <p className="text-sm" style={{ color: '#64748b' }}>Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
