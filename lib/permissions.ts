/**
 * Centralized permissions matrix (wireframe 10). Components and routes should
 * check capabilities through this module rather than comparing role strings
 * inline, so the capability model stays in one place.
 *
 * Role mapping to the wireframe's role names:
 *   Customer User    -> UserRole.USER, UserRole.DEMO
 *   Customer Admin   -> UserRole.ORG_ADMIN
 *   FHS Technician   -> UserRole.TECHNICIAN
 *   FHS Admin        -> UserRole.SUPER_ADMIN
 */

import type { UserRole } from '@prisma/client'

export type Capability =
  | 'view_dashboard'
  | 'view_assessments'
  | 'view_reports'
  | 'view_alerts'
  | 'create_edit_assessments'
  | 'upload_photos_notes'
  | 'create_recommendations'
  | 'manage_customer_users'
  | 'manage_organizations_fields'
  | 'system_administration'

const MATRIX: Record<UserRole, Capability[]> = {
  USER: ['view_dashboard', 'view_assessments', 'view_reports', 'view_alerts'],
  DEMO: ['view_dashboard', 'view_assessments', 'view_reports', 'view_alerts'],
  ORG_ADMIN: ['view_dashboard', 'view_assessments', 'view_reports', 'view_alerts', 'manage_customer_users'],
  TECHNICIAN: [
    'view_dashboard',
    'view_assessments',
    'view_reports',
    'view_alerts',
    'create_edit_assessments',
    'upload_photos_notes',
    'create_recommendations',
  ],
  SUPER_ADMIN: [
    'view_dashboard',
    'view_assessments',
    'view_reports',
    'view_alerts',
    'create_edit_assessments',
    'upload_photos_notes',
    'create_recommendations',
    'manage_customer_users',
    'manage_organizations_fields',
    'system_administration',
  ],
}

export function can(role: UserRole, capability: Capability): boolean {
  return MATRIX[role]?.includes(capability) ?? false
}

/** Customer sidebar always shows this fixed set (handoff doc: no Organizations/Users in customer nav). */
export const CUSTOMER_NAV = [
  { name: 'Dashboard', href: '', icon: 'Home' },
  { name: 'Fields', href: '/fields', icon: 'LayoutGrid' },
  { name: 'Assessments', href: '/assessments', icon: 'Calendar' },
  { name: 'Reports', href: '/reports', icon: 'BarChart3' },
  { name: 'Alerts', href: '/alerts', icon: 'Bell' },
  { name: 'Documents', href: '/documents', icon: 'FileText' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
] as const

export const ROLE_LABELS: Record<UserRole, string> = {
  USER: 'Customer User',
  DEMO: 'Customer User',
  ORG_ADMIN: 'Customer Admin',
  TECHNICIAN: 'FHS Technician',
  SUPER_ADMIN: 'FHS Admin',
}

export function isFhsStaff(role: UserRole): boolean {
  return role === 'TECHNICIAN' || role === 'SUPER_ADMIN'
}

export function isCustomerAdmin(role: UserRole): boolean {
  return role === 'ORG_ADMIN' || role === 'SUPER_ADMIN'
}
