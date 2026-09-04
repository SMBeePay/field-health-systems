import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StatCard({
  icon: Icon,
  iconClassName,
  value,
  label,
}: {
  icon: LucideIcon
  iconClassName?: string
  value: string | number
  label: string
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
      <div className={cn('w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0', iconClassName)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-[#0D1B2A] leading-none">{value}</div>
        <div className="text-sm text-slate-500 mt-1.5">{label}</div>
      </div>
    </div>
  )
}
