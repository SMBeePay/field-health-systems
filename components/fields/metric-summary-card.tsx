import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { METRIC_STATUS_STYLES, type MetricStatus } from '@/lib/field-status'
import { StatusPill } from '@/components/ui/status-pill'

const ICONS = { within: CheckCircle2, monitor: AlertTriangle, critical: XCircle }

export function MetricSummaryCard({
  label,
  value,
  status,
  target,
}: {
  label: string
  value: string | number
  status: MetricStatus
  target: string
}) {
  const Icon = ICONS[status]
  const style = METRIC_STATUS_STYLES[status]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <StatusPill style={style} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-[#0D1B2A]">{value}</span>
        <Icon className={style.text.replace('text-', 'text-') + ' w-4 h-4'} />
      </div>
      <div className="text-xs text-slate-400 mt-1">Target {target}</div>
    </div>
  )
}
