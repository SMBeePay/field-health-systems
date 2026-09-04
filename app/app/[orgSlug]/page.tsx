import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { MapPin, CheckCircle2, AlertTriangle, CalendarClock, Calendar } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import { getOrganizationDashboard, daysUntil } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import type { FieldHealthStatus } from '@/lib/field-status'
import { StatCard } from '@/components/dashboard/stat-card'
import { HealthDonut } from '@/components/dashboard/health-donut'
import { FieldsExplorer } from '@/components/fields/fields-explorer'

export default async function OrganizationDashboard({ params }: { params: Promise<{ orgSlug: string }> }) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)
  const data = await getOrganizationDashboard(orgSlug)

  if (!data) {
    return null
  }

  const { fields } = data
  const firstName = session?.user.name?.split(' ')[0] ?? 'there'

  const counts: Record<FieldHealthStatus, number> = { healthy: 0, monitor: 0, needs_attention: 0, critical: 0 }
  fields.forEach((f) => counts[f.health]++)

  const needsAttentionCount = counts.needs_attention + counts.critical
  const upcomingIn30Days = fields.filter((f) => {
    const d = daysUntil(f.nextDue)
    return d !== null && d >= 0 && d <= 30
  }).length

  const upcoming = fields
    .filter((f) => f.nextDue)
    .sort((a, b) => (a.nextDue as Date).getTime() - (b.nextDue as Date).getTime())
    .slice(0, 3)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Good morning, {firstName}</h1>
        <p className="text-sm text-slate-500 mt-1">Here&apos;s the latest on your fields.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={MapPin} iconClassName="bg-blue-50 text-[#1E88E5]" value={fields.length} label="Total Fields" />
        <StatCard icon={CheckCircle2} iconClassName="bg-green-50 text-green-600" value={counts.healthy} label="Fields Healthy" />
        <StatCard icon={AlertTriangle} iconClassName="bg-red-50 text-red-600" value={needsAttentionCount} label="Needs Attention" />
        <StatCard icon={CalendarClock} iconClassName="bg-amber-50 text-amber-600" value={upcomingIn30Days} label="Upcoming Assessments Next 30 days" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-[#0D1B2A] mb-4">Field Health Status</h2>
          <HealthDonut counts={counts} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#0D1B2A]">Upcoming Assessments</h2>
            <Link href={`/app/${orgSlug}/assessments`} className="text-sm font-semibold text-[#1E88E5] hover:underline">
              View All
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-500">No upcoming assessments scheduled.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map((f) => {
                const d = daysUntil(f.nextDue) ?? 0
                return (
                  <div key={f.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#1E88E5]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#0D1B2A] truncate">
                        {f.facility ?? ''} {f.facility ? '- ' : ''}
                        {f.name}
                      </p>
                      <p className="text-xs text-slate-500">Scheduled for {f.nextDue ? formatDate(f.nextDue) : '—'}</p>
                    </div>
                    <span className={`text-xs font-semibold ${d <= 7 ? 'text-red-600' : d <= 14 ? 'text-amber-600' : 'text-green-600'}`}>
                      {d} days
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bold text-[#0D1B2A]">Fields</h2>
      </div>
      <FieldsExplorer fields={fields} orgSlug={orgSlug} defaultView="card" showCount={false} />
    </div>
  )
}
