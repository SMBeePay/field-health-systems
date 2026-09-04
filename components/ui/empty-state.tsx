import { LucideIcon, Plus } from 'lucide-react'

/** "Explain what is missing and what happens next" (wireframe 11). */
export function EmptyState({
  icon: Icon = Plus,
  title,
  message,
  actionLabel,
  onAction,
  actionHref,
}: {
  icon?: LucideIcon
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-blue-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1.5 max-w-sm">{message}</p>
      {actionLabel && (actionHref || onAction) && (
        <a
          href={actionHref}
          onClick={onAction}
          className="mt-6 inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {actionLabel}
        </a>
      )}
    </div>
  )
}
