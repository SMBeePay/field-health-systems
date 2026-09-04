import { getServerSession } from 'next-auth/next'
import { notFound, redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getAssessmentDetail } from '@/lib/data'
import { can } from '@/lib/permissions'
import { parseTestLocations } from '@/lib/test-points'
import { AssessmentWizard } from '@/components/technician/assessment-wizard'

export default async function AssessmentEntryPage({
  params,
}: {
  params: Promise<{ orgSlug: string; assessmentId: string }>
}) {
  const { orgSlug, assessmentId } = await params
  const session = await getServerSession(authOptions)

  if (!session || !can(session.user.role, 'create_edit_assessments')) {
    redirect(`/app/${orgSlug}`)
  }

  const assessment = await getAssessmentDetail(orgSlug, assessmentId)
  if (!assessment) notFound()

  return (
    <AssessmentWizard
      orgSlug={orgSlug}
      assessmentId={assessment.id}
      fieldId={assessment.field.id}
      fieldName={assessment.field.name}
      facility={assessment.field.facility}
      technician={assessment.testingTechnician}
      testingDate={assessment.testingDate}
      initialLocations={parseTestLocations(assessment.testingLocations)}
    />
  )
}
