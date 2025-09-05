import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(request: NextRequest) {
    const token = request.nextauth.token
    const { pathname } = request.nextUrl

    // Allow public routes
    if (
      pathname.startsWith('/api/auth') ||
      pathname.startsWith('/auth') ||
      pathname === '/' ||
      pathname.startsWith('/partnerships') ||
      pathname.startsWith('/schedule-assessment') ||
      pathname.startsWith('/athlete-safety') ||
      pathname.startsWith('/testing') ||
      pathname.startsWith('/maintenance') ||
      pathname.startsWith('/analytics') ||
      pathname.startsWith('/reports') ||
      pathname.startsWith('/team') ||
      pathname.startsWith('/marketing') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/public') ||
      pathname.includes('.')
    ) {
      return NextResponse.next()
    }

    // Redirect unauthenticated users to login
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Admin routes - only SUPER_ADMIN can access
    if (pathname.startsWith('/admin')) {
      if (token.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/auth/unauthorized', request.url))
      }
      return NextResponse.next()
    }

    // Organization routes - /app/[orgSlug]
    if (pathname.startsWith('/app/')) {
      const pathParts = pathname.split('/')
      const orgSlug = pathParts[2]

      // Super admin can access any org
      if (token.role === 'SUPER_ADMIN') {
        return NextResponse.next()
      }

      // Users can only access their own organization
      if (token.organizationSlug !== orgSlug) {
        return NextResponse.redirect(new URL('/auth/unauthorized', request.url))
      }

      return NextResponse.next()
    }

    // Dashboard routes - authenticated users only
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) {
      return NextResponse.next()
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes without a token
        const { pathname } = req.nextUrl
        
        if (
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/auth') ||
          pathname === '/' ||
          pathname.startsWith('/partnerships') ||
          pathname.startsWith('/schedule-assessment') ||
          pathname.startsWith('/athlete-safety') ||
          pathname.startsWith('/testing') ||
          pathname.startsWith('/maintenance') ||
          pathname.startsWith('/analytics') ||
          pathname.startsWith('/reports') ||
          pathname.startsWith('/team') ||
          pathname.startsWith('/marketing') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/public') ||
          pathname.includes('.')
        ) {
          return true
        }

        // All other routes require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}