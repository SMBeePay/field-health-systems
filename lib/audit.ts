import { prisma } from './prisma'
import { AuditAction } from '@prisma/client'

interface AuditLogData {
  userId?: string
  action: AuditAction
  resource: string
  resourceId?: string
  ipAddress?: string
  userAgent?: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  metadata?: Record<string, any>
}

export class AuditLogger {
  static async log(data: AuditLogData) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          resource: data.resource,
          resourceId: data.resourceId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          oldValues: data.oldValues,
          newValues: data.newValues,
          metadata: data.metadata,
        },
      })
    } catch (error) {
      console.error('Audit logging failed:', error)
      // Don't throw error to avoid breaking the main functionality
    }
  }

  static async logUserAction(
    userId: string,
    action: AuditAction,
    resource: string,
    resourceId?: string,
    additionalData?: {
      oldValues?: Record<string, any>
      newValues?: Record<string, any>
      metadata?: Record<string, any>
    }
  ) {
    return this.log({
      userId,
      action,
      resource,
      resourceId,
      ...additionalData,
    })
  }

  static async logSystemAction(
    action: AuditAction,
    resource: string,
    resourceId?: string,
    metadata?: Record<string, any>
  ) {
    return this.log({
      action,
      resource,
      resourceId,
      metadata,
    })
  }

  // Helper methods for common audit actions
  static async logLogin(userId: string, ipAddress?: string, userAgent?: string) {
    return this.log({
      userId,
      action: 'LOGIN',
      resource: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
    })
  }

  static async logLogout(userId: string, ipAddress?: string, userAgent?: string) {
    return this.log({
      userId,
      action: 'LOGOUT',
      resource: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
    })
  }

  static async logPasswordReset(email: string, ipAddress?: string, userAgent?: string) {
    return this.log({
      action: 'PASSWORD_RESET',
      resource: 'User',
      ipAddress,
      userAgent,
      metadata: { email },
    })
  }

  static async logDataAccess(
    userId: string,
    resource: string,
    resourceId: string,
    metadata?: Record<string, any>
  ) {
    return this.log({
      userId,
      action: 'READ',
      resource,
      resourceId,
      metadata,
    })
  }

  static async logDataModification(
    userId: string,
    action: 'CREATE' | 'UPDATE' | 'DELETE',
    resource: string,
    resourceId: string,
    oldValues?: Record<string, any>,
    newValues?: Record<string, any>
  ) {
    return this.log({
      userId,
      action,
      resource,
      resourceId,
      oldValues,
      newValues,
    })
  }

  static async logRoleChange(
    userId: string,
    targetUserId: string,
    oldRole: string,
    newRole: string
  ) {
    return this.log({
      userId,
      action: 'ROLE_CHANGE',
      resource: 'User',
      resourceId: targetUserId,
      oldValues: { role: oldRole },
      newValues: { role: newRole },
    })
  }

  static async logExport(
    userId: string,
    resource: string,
    exportType: string,
    metadata?: Record<string, any>
  ) {
    return this.log({
      userId,
      action: 'EXPORT',
      resource,
      metadata: {
        exportType,
        ...metadata,
      },
    })
  }

  static async logImport(
    userId: string,
    resource: string,
    importType: string,
    recordsCount: number,
    metadata?: Record<string, any>
  ) {
    return this.log({
      userId,
      action: 'IMPORT',
      resource,
      metadata: {
        importType,
        recordsCount,
        ...metadata,
      },
    })
  }
}

// Middleware helper to extract request information
export function getRequestInfo(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ipAddress = forwarded?.split(',')[0] || realIp || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  return { ipAddress, userAgent }
}