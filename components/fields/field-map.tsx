'use client'

import { cn } from '@/lib/utils'
import type { TestLocation } from '@/lib/test-points'

export function FieldMap({
  locations,
  selectedIndex,
  onSelect,
  size = 'lg',
  className,
}: {
  locations: TestLocation[]
  selectedIndex?: number
  onSelect?: (index: number) => void
  size?: 'lg' | 'sm'
  className?: string
}) {
  const pinSize = size === 'lg' ? 'w-9 h-9 text-sm' : 'w-6 h-6 text-[10px]'

  return (
    <div className={cn('relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-[#2d6a27]', className)}>
      <div className="absolute inset-0 flex">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={cn('flex-1 border-r border-white/25 last:border-r-0', i % 2 === 1 && 'bg-white/[0.03]')} />
        ))}
      </div>
      <div className="absolute inset-0 border-2 border-white/70 m-1.5 rounded-sm" />

      {locations.map((loc) => {
        const isSelected = selectedIndex === loc.index
        return (
          <button
            key={loc.index}
            type="button"
            onClick={() => onSelect?.(loc.index)}
            style={{ left: `${loc.x * 100}%`, top: `${loc.y * 100}%` }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-md transition-transform hover:scale-110',
              pinSize,
              isSelected ? 'bg-green-500 ring-4 ring-green-300/50' : 'bg-[#1E88E5]',
              onSelect && 'cursor-pointer'
            )}
          >
            {loc.index}
          </button>
        )
      })}
    </div>
  )
}
