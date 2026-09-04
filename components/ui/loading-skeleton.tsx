import { cn } from '@/lib/utils'

/** Preserve the final layout with skeleton blocks (wireframe 11: "Preserve final layout with skeletons"). */
export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-slate-100', className)} />
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-xl bg-slate-50 p-5 space-y-2">
          <SkeletonBlock className="h-4 w-1/3" />
          <SkeletonBlock className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  )
}

export function CardGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <SkeletonBlock className="h-24 w-full" />
          <SkeletonBlock className="h-4 w-2/3" />
          <SkeletonBlock className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-6 px-6 py-5">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-6 w-24 rounded-full" />
          <SkeletonBlock className="h-4 w-24 ml-auto" />
        </div>
      ))}
    </div>
  )
}
