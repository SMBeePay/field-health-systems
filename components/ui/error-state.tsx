import { AlertTriangle } from 'lucide-react'

/** "Keep context visible and offer a safe retry" (wireframe 11). */
export function ErrorState({
  title = 'Unable to load data',
  message = 'Keep navigation and current context visible.',
  onRetry,
}: {
  title?: string
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1.5 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm font-semibold transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
