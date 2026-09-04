import { getServerSession } from 'next-auth/next'
import { AlertTriangle, CheckCircle2, Clock, ListChecks } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import { getOrganizationAlerts, daysUntil } from '@/lib/data'
import { can } from '@/lib/permissions'
import { StatCard } from '@/components/dashboard/stat-card'
import { AlertRow } from '@/components/alerts/alert-row'
import { EmptyState } from '@/components/ui/empty-state'

export default async function AlertsPage({ params }: { params: Promise<{ orgSlug: string }> }) {
  const { orgSlug } = await params
  const [session, recommendations] = await Promise.all([getServerSession(authOptions), getOrganizationAlerts(orgSlug)])

  const openActions = recommendations.filter((r) => r.status === 'OPEN' || r.status === 'IN_PROGRESS')
  const needsAttention = openActions.filter((r) => r.priority === 'HIGH' || r.priority === 'CRITICAL')
  const dueIn30 = openActions.filter((r) => {
    const d = daysUntil(r.dueDate)
    return d !== null && d >= 0 && d <= 30
  })
  const completed = recommendations.filter((r) => r.status === 'COMPLETED')

  const canUpdate = session ? can(session.user.role, 'create_recommendations') : false

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Alerts & Recommendations</h1>
        <p className="text-sm text-slate-500 mt-1">Prioritize field issues and track recommended maintenance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={ListChecks} iconClassName="bg-amber-50 text-amber-600" value={openActions.length} label="Open Actions" />
        <StatCard icon={AlertTriangle} iconClassName="bg-red-50 text-red-600" value={needsAttention.length} label="Needs Attention" />
        <StatCard icon={Clock} iconClassName="bg-blue-50 text-[#1E88E5]" value={dueIn30.length} label="Due in 30 Days" />
        <StatCard icon={CheckCircle2} iconClassName="bg-green-50 text-green-600" value={completed.length} label="Completed" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-[#0D1B2A] mb-4">Open Recommendations</h2>

        {openActions.length === 0 ? (
          <EmptyState icon={CheckCircle2} title="Nothing open" message="Recommendations appear here when a field needs follow-up." />
        ) : (
          <div className="space-y-3">
            {openActions.map((r) => (
              <AlertRow
                key={r.id}
                orgSlug={orgSlug}
                id={r.id}
                fieldId={r.field.id}
                fieldName={r.field.name}
                facility={r.field.facility}
                title={r.title}
                priority={r.priority}
                status={r.status}
                dueDate={r.dueDate}
                canUpdate={canUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
