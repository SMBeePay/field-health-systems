import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: UserRole
      organizationId: string
      organizationSlug: string
    }
  }

  interface User {
    role: UserRole
    organizationId: string
    organizationSlug: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    organizationId: string
    organizationSlug: string
  }
}