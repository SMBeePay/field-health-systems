import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
const publicPaths = [
  '/api/auth',
  '/auth',
  '/',
  '/partnerships',
  '/schedule-assessment',
  '/athlete-safety',
  '/marketing',
  '/resources',
  '/blog',
  '/contact',
  '/services',
  '/_next',
  '/public',
]

function isPublicPath(pathname: string): boolean {
  // Check if it's a public path
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return true
  }
  // Check if it's a static file
  if (pathname.includes('.')) {
    return true
  }
  return false
}

export default withAuth(
  function middleware(request: NextRequest) {
    const token = request.nextauth.token
    const { pathname } = request.nextUrl

    // Allow public routes
    if (isPublicPath(pathname)) {
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

    // Organization app routes - /app/[orgSlug]/*
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

    // Legacy dashboard/settings routes - redirect to new app structure
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings') || pathname.startsWith('/fields')) {
      if (token.organizationSlug) {
        const newPath = pathname.replace(/^\/(dashboard|settings|fields)/, `/app/${token.organizationSlug}/$1`)
        return NextResponse.redirect(new URL(newPath, request.url))
      }
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to public routes without a token
        if (isPublicPath(pathname)) {
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
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (files in public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
