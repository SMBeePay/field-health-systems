import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { isCustomerAdmin, ROLE_LABELS } from '@/lib/permissions'
import { StatusPill } from '@/components/ui/status-pill'

export default async function SettingsPage({ params }: { params: Promise<{ orgSlug: string }> }) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)

  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    include: { users: { orderBy: { name: 'asc' } } },
  })

  if (!organization || !session) return null

  const canManageUsers = isCustomerAdmin(session.user.role)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Organization profile and account preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-[#0D1B2A] mb-4">Organization Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Field label="Name" value={organization.name} />
          <Field label="Address" value={[organization.address, organization.city, organization.state, organization.zipCode].filter(Boolean).join(', ') || '—'} />
          <Field label="Phone" value={organization.phone ?? '—'} />
          <Field label="Website" value={organization.website ?? '—'} />
        </div>
      </div>

      {canManageUsers && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold text-[#0D1B2A] mb-4">Team Members</h2>
          <div className="divide-y divide-slate-100">
            {organization.users.map((u) => (
              <div key={u.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-[#0D1B2A]">{u.name ?? u.email}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <StatusPill
                  style={{ label: ROLE_LABELS[u.role], text: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200', dot: 'bg-slate-400' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold text-slate-500 mb-1">{label}</div>
      <div className="text-slate-800">{value}</div>
    </div>
  )
}
