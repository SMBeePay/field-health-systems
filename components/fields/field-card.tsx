import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { formatDate, formatFieldType } from '@/lib/utils'
import { FIELD_HEALTH_STYLES } from '@/lib/field-status'
import { StatusPill } from '@/components/ui/status-pill'
import type { FieldWithHealth } from '@/lib/data'

export function FieldCard({ field, orgSlug }: { field: FieldWithHealth; orgSlug: string }) {
  return (
    <Link
      href={`/app/${orgSlug}/fields/${field.id}`}
      className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-bold text-[#0D1B2A] truncate">{field.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{field.facility ?? formatFieldType(field.type)}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
      </div>

      <div className="mt-3">
        <StatusPill style={FIELD_HEALTH_STYLES[field.health]} />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-slate-400">Last Assessment</div>
          <div className="font-medium text-slate-700 mt-0.5">{field.lastTestingDate ? formatDate(field.lastTestingDate) : '—'}</div>
        </div>
        <div>
          <div className="text-slate-400">Next Due</div>
          <div className="font-medium text-slate-700 mt-0.5">{field.nextDue ? formatDate(field.nextDue) : '—'}</div>
        </div>
      </div>
    </Link>
  )
}
