import { getOrganizationReports } from '@/lib/data'
import { ReportsExplorer, type ReportRow } from '@/components/reports/reports-explorer'

export default async function DocumentsPage({ params }: { params: Promise<{ orgSlug: string }> }) {
  const { orgSlug } = await params
  const reports = await getOrganizationReports(orgSlug)

  const rows: ReportRow[] = reports.map((r) => ({
    id: r.id,
    title: r.title ?? r.reportType,
    fieldName: r.field.name,
    facility: r.field.facility,
    issuedDate: r.issuedDate,
    reportType: r.reportType,
    status: r.status,
    reportDocument: r.reportDocument,
  }))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Documents</h1>
        <p className="text-sm text-slate-500 mt-1">Certifications, compliance records, and other field documentation.</p>
      </div>

      <ReportsExplorer reports={rows} emptyMessage="Documents appear here once an assessment is finalized." />
    </div>
  )
}
