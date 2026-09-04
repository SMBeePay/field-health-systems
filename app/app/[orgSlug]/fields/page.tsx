import { getOrganizationDashboard } from '@/lib/data'
import { FieldsExplorer } from '@/components/fields/fields-explorer'

export default async function FieldsPortfolioPage({ params }: { params: Promise<{ orgSlug: string }> }) {
  const { orgSlug } = await params
  const data = await getOrganizationDashboard(orgSlug)

  if (!data) return null

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Fields</h1>
        <p className="text-sm text-slate-500 mt-1">Portfolio view optimized for districts and facilities with many fields.</p>
      </div>

      <FieldsExplorer fields={data.fields} orgSlug={orgSlug} defaultView="table" />
    </div>
  )
}
