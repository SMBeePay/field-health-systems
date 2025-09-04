import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'organization', 'numberOfFields']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
New Field Assessment Request

CONTACT INFORMATION:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Organization: ${formData.organization}
- Title: ${formData.title || 'Not provided'}

FIELD INFORMATION:
- Number of Fields: ${formData.numberOfFields}
- Field Types: ${formData.fieldTypes?.join(', ') || 'Not specified'}
- Primary Concern: ${formData.primaryConcern || 'Not specified'}

SCHEDULING PREFERENCES:
- Preferred Contact Method: ${formData.preferredContact}
- Preferred Timeframe: ${formData.timeframe || 'Not specified'}

ADDITIONAL INFORMATION:
${formData.additionalInfo || 'None provided'}

---
Submitted at: ${new Date().toLocaleString()}
Lead Source: Schedule Assessment Landing Page
`

    // For now, we'll log the submission and return success
    // In production, you would integrate with an email service like SendGrid, Resend, or AWS SES
    console.log('Assessment Request Received:', {
      timestamp: new Date().toISOString(),
      organization: formData.organization,
      email: formData.email,
      numberOfFields: formData.numberOfFields,
      fieldTypes: formData.fieldTypes
    })
    
    console.log('Email Content to send to andrew@fieldhealthsystems.com:')
    console.log(emailContent)

    // TODO: Implement actual email sending
    // Example with Resend (you would need to install @resend/node and configure):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'noreply@fieldhealthsystems.com',
      to: 'andrew@fieldhealthsystems.com',
      subject: `New Assessment Request from ${formData.organization}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    })
    */

    // For now, simulate successful email sending
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