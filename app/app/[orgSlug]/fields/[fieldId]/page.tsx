import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getFieldDetail } from '@/lib/data'
import { testingStatusToAssessmentStatus } from '@/lib/field-status'
import { can } from '@/lib/permissions'
import { FieldDetailClient } from '@/components/fields/field-detail-client'

export default async function FieldDetailPage({
  params,
}: {
  params: Promise<{ orgSlug: string; fieldId: string }>
}) {
  const { orgSlug, fieldId } = await params
  const [session, result] = await Promise.all([getServerSession(authOptions), getFieldDetail(orgSlug, fieldId)])

  if (!result) notFound()

  const { field, health } = result

  return (
    <FieldDetailClient
      orgSlug={orgSlug}
      fieldId={field.id}
      fieldName={field.name}
      facility={field.facility}
      fieldType={field.type}
      health={health.health}
      latitude={field.latitude}
      longitude={field.longitude}
      canCreateAssessment={session ? can(session.user.role, 'create_edit_assessments') : false}
      assessments={field.testingData.map((t) => ({
        id: t.id,
        testingDate: t.testingDate,
        testingTechnician: t.testingTechnician,
        gmaxAverage: t.gmaxAverage,
        shearAverage: t.shearAverage,
        infillDepthAverage: t.infillDepthAverage,
        overallStatus: testingStatusToAssessmentStatus(t.overallStatus),
        testingLocations: t.testingLocations,
      }))}
    />
  )
}
