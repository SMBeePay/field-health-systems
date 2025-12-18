import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NewFieldForm } from './new-field-form'
import { ArrowLeft } from 'lucide-react'

interface NewFieldPageProps {
  params: Promise<{ orgSlug: string }>
}

export default async function NewFieldPage({ params }: NewFieldPageProps) {
  const { orgSlug } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  // Fetch organization
  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    select: { id: true, name: true }
  })

  if (!organization) {
    redirect('/auth/unauthorized')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/app/${orgSlug}/fields`}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Field</h1>
          <p className="text-gray-500">Create a new synthetic turf field for {organization.name}</p>
        </div>
      </div>

      {/* Form */}
      <NewFieldForm orgSlug={orgSlug} organizationId={organization.id} />
    </div>
  )
}
