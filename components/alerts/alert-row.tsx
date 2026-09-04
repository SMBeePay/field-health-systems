'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PRIORITY_STYLES, MAINTENANCE_STATUS_STYLES } from '@/lib/field-status'
import { StatusPill } from '@/components/ui/status-pill'
import { updateRecommendationStatus } from '@/lib/actions/recommendations'
import type { MaintenancePriority, MaintenanceStatus } from '@prisma/client'

const NEXT_STATUS: Partial<Record<MaintenanceStatus, MaintenanceStatus>> = {
  OPEN: 'IN_PROGRESS',
  IN_PROGRESS: 'COMPLETED',
}

const NEXT_LABEL: Partial<Record<MaintenanceStatus, string>> = {
  OPEN: 'Start Progress',
  IN_PROGRESS: 'Mark Complete',
}

export function AlertRow({
  orgSlug,
  id,
  fieldId,
  fieldName,
  facility,
  title,
  priority,
  status,
  dueDate,
  canUpdate,
}: {
  orgSlug: string
  id: string
  fieldId: string
  fieldName: string
  facility: string | null
  title: string
  priority: MaintenancePriority
  status: MaintenanceStatus
  dueDate: Date | null
  canUpdate: boolean
}) {
  const [currentStatus, setCurrentStatus] = useState(status)
  const [isPending, startTransition] = useTransition()
  const nextStatus = NEXT_STATUS[currentStatus]

  return (
    <div className="border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="font-bold text-[#0D1B2A]">
            {facility ? `${facility} · ` : ''}
            {fieldName}
          </h3>
          <StatusPill style={PRIORITY_STYLES[priority]} />
          <StatusPill style={MAINTENANCE_STATUS_STYLES[currentStatus]} />
        </div>
        <p className="text-sm text-slate-600">{title}</p>
        {dueDate && <p className="text-xs text-slate-400 mt-1">Due {formatDate(dueDate)}</p>}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Link href={`/app/${orgSlug}/fields/${fieldId}`} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          View Field
        </Link>
        {canUpdate && nextStatus && (
          <button
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await updateRecommendationStatus(orgSlug, id, nextStatus)
                setCurrentStatus(nextStatus)
              })
            }
            className="px-4 py-2 rounded-lg bg-[#1E88E5] hover:bg-[#1976D2] disabled:opacity-60 text-white text-sm font-semibold"
          >
            {isPending ? 'Updating...' : NEXT_LABEL[currentStatus]}
          </button>
        )}
      </div>
    </div>
  )
}
