import { cn } from '@/lib/utils'

interface StatusStyle {
  label: string
  text: string
  bg: string
  border: string
  dot: string
}

export function StatusPill({
  style,
  label,
  showDot = false,
  className,
}: {
  style: StatusStyle
  label?: string
  showDot?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
        style.text,
        style.bg,
        style.border,
        className
      )}
    >
      {showDot && <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} />}
      {label ?? style.label}
    </span>
  )
}
