import Link from 'next/link'
import { Calendar, ChevronRight } from 'lucide-react'
import { getOrganizationAssessments } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { ASSESSMENT_STATUS_STYLES, getAssessmentStatus, testingStatusToAssessmentStatus } from '@/lib/field-status'
import { parseTestLocations } from '@/lib/test-points'
import { StatusPill } from '@/components/ui/status-pill'
import { EmptyState } from '@/components/ui/empty-state'

export default async function AssessmentsPage({ params }: { params: Promise<{ orgSlug: string }> }) {
  const { orgSlug } = await params
  const assessments = await getOrganizationAssessments(orgSlug)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Assessments</h1>
        <p className="text-sm text-slate-500 mt-1">Every testing visit across your fields, most recent first.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        {assessments.length === 0 ? (
          <EmptyState icon={Calendar} title="No assessments yet" message="Assessments appear here once a technician completes a testing visit." />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="px-6 py-3 font-semibold">Field</th>
                <th className="px-6 py-3 font-semibold">Facility</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Technician</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {assessments.map((a) => {
                const locations = parseTestLocations(a.testingLocations)
                const status = locations.length > 0 ? getAssessmentStatus(locations) : testingStatusToAssessmentStatus(a.overallStatus)
                return (
                  <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-bold text-[#0D1B2A]">{a.field.name}</td>
                    <td className="px-6 py-4 text-slate-600">{a.field.facility ?? '—'}</td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(a.testingDate)}</td>
                    <td className="px-6 py-4 text-slate-600">{a.testingTechnician}</td>
                    <td className="px-6 py-4">
                      <StatusPill style={ASSESSMENT_STATUS_STYLES[status]} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/app/${orgSlug}/assessments/${a.id}`}>
                        <ChevronRight className="w-4 h-4 text-slate-300 inline-block" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
