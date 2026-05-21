import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'andrew@fieldhealthsystems.com'
const FROM_EMAIL = 'noreply@fieldhealthsystems.com'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'organization', 'numberOfFields']
    const missingFields = requiredFields.filter(field => !formData[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      )
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#12324A;padding:20px 24px">
          <h2 style="color:#fff;margin:0;font-size:18px">Field Health Systems</h2>
          <p style="color:#a0b8cc;margin:4px 0 0;font-size:14px">New Field Assessment Request from ${formData.organization}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;width:160px">Name</td><td style="padding:6px 12px;color:#222">${formData.firstName} ${formData.lastName}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Email</td><td style="padding:6px 12px;color:#222">${formData.email}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Phone</td><td style="padding:6px 12px;color:#222">${formData.phone}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Organization</td><td style="padding:6px 12px;color:#222">${formData.organization}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Title</td><td style="padding:6px 12px;color:#222">${formData.title || 'Not provided'}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Number of Fields</td><td style="padding:6px 12px;color:#222">${formData.numberOfFields}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Field Types</td><td style="padding:6px 12px;color:#222">${formData.fieldTypes?.join(', ') || 'Not specified'}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Primary Concern</td><td style="padding:6px 12px;color:#222">${formData.primaryConcern || 'Not specified'}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Contact Method</td><td style="padding:6px 12px;color:#222">${formData.preferredContact || 'Not specified'}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555">Timeframe</td><td style="padding:6px 12px;color:#222">${formData.timeframe || 'Not specified'}</td></tr>
          ${formData.additionalInfo ? `<tr><td style="padding:6px 12px;font-weight:600;color:#555;vertical-align:top">Additional Info</td><td style="padding:6px 12px;color:#222">${formData.additionalInfo}</td></tr>` : ''}
        </table>
        <div style="padding:12px 24px;background:#f9fafb;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#888">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT</p>
        </div>
      </div>
    `

    const apiKey = process.env.RESEND_API_KEY
    console.log('RESEND_API_KEY present:', !!apiKey)

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: formData.email,
      subject: `New Assessment Request from ${formData.organization}`,
      html,
    })

    console.log('✅ Assessment request email sent for:', formData.organization)

    return NextResponse.json({
      success: true,
      message: 'Assessment request submitted successfully',
      data: {
        organization: formData.organization,
        numberOfFields: formData.numberOfFields,
        submissionId: `AR-${Date.now()}`
      }
    })

  } catch (error) {
    console.error('Error processing assessment request:', error)
    return NextResponse.json(
      { error: 'Failed to process assessment request' },
      { status: 500 }
    )
  }
}
