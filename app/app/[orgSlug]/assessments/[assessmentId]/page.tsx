import { notFound } from 'next/navigation'
import { getAssessmentDetail } from '@/lib/data'
import { parseTestLocations } from '@/lib/test-points'
import { getAssessmentStatus, testingStatusToAssessmentStatus } from '@/lib/field-status'
import { AssessmentDetailClient } from '@/components/assessments/assessment-detail-client'

export default async function AssessmentDetailPage({
  params,
}: {
  params: Promise<{ orgSlug: string; assessmentId: string }>
}) {
  const { orgSlug, assessmentId } = await params
  const assessment = await getAssessmentDetail(orgSlug, assessmentId)

  if (!assessment) notFound()

  const locations = parseTestLocations(assessment.testingLocations)
  const overallStatus = locations.length > 0 ? getAssessmentStatus(locations) : testingStatusToAssessmentStatus(assessment.overallStatus)

  return (
    <AssessmentDetailClient
      orgSlug={orgSlug}
      fieldId={assessment.field.id}
      fieldName={assessment.field.name}
      facility={assessment.field.facility}
      testingDate={assessment.testingDate}
      testingTechnician={assessment.testingTechnician}
      gmaxAverage={assessment.gmaxAverage}
      shearAverage={assessment.shearAverage}
      infillDepthAverage={assessment.infillDepthAverage}
      overallStatus={overallStatus}
      locations={locations}
    />
  )
}
