import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = 'andrew@fieldhealthsystems.com'
const FROM_EMAIL = 'noreply@fieldhealthsystems.com'

// Validation schemas
const contactFormSchema = z.object({
  formType: z.literal('CONTACT'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  title: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  urgency: z.string().optional(),
})

const partnershipFormSchema = z.object({
  formType: z.literal('PARTNERSHIP'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().min(1, 'Company is required'),
  title: z.string().min(1, 'Title is required'),
  companyType: z.string().optional(),
  interests: z.array(z.string()).default([]),
  educationExposure: z.string().optional(),
  additionalInfo: z.string().optional(),
})

const scheduleAssessmentSchema = z.object({
  formType: z.literal('SCHEDULE_ASSESSMENT'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  fieldDetails: z.object({
    fieldName: z.string().optional(),
    fieldType: z.string().optional(),
    installDate: z.string().optional(),
    lastTestingDate: z.string().optional(),
    urgency: z.string().optional(),
    notes: z.string().optional(),
  }).optional(),
})

const formSchema = z.discriminatedUnion('formType', [
  contactFormSchema,
  partnershipFormSchema,
  scheduleAssessmentSchema,
])

function generateEmailHtml(submission: {
  formType: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  organization?: string
  title?: string
  formData: Record<string, unknown>
}) {
  const { formType, firstName, lastName, email, phone, company, organization, title, formData } = submission

  let subject = ''
  let bodyRows = ''

  const row = (label: string, value: string | undefined) =>
    value ? `<tr><td style="padding:6px 12px;font-weight:600;color:#555;width:160px;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#222">${value}</td></tr>` : ''

  switch (formType) {
    case 'CONTACT':
      subject = `New Contact Form Submission from ${firstName} ${lastName}`
      bodyRows = `
        ${row('Name', `${firstName} ${lastName}`)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Organization', organization)}
        ${row('Title', title)}
        ${row('Service Needed', formData.serviceType as string)}
        ${row('Urgency', formData.urgency as string)}
        ${row('Message', formData.message as string)}
      `
      break

    case 'PARTNERSHIP':
      subject = `New Partnership Inquiry from ${company}`
      bodyRows = `
        ${row('Name', `${firstName} ${lastName}`)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Company', company)}
        ${row('Title', title)}
        ${row('Company Type', formData.companyType as string)}
        ${row('Education Exposure', formData.educationExposure as string)}
        ${row('Interests', Array.isArray(formData.interests) ? (formData.interests as string[]).join(', ') : undefined)}
        ${row('Additional Info', formData.additionalInfo as string)}
      `
      break

    case 'SCHEDULE_ASSESSMENT': {
      subject = `New Field Assessment Request from ${firstName} ${lastName}`
      const fd = formData.fieldDetails as Record<string, string> | undefined
      bodyRows = `
        ${row('Name', `${firstName} ${lastName}`)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Organization', company)}
        ${row('Title', title)}
        ${fd ? row('Field Name', fd.fieldName) : ''}
        ${fd ? row('Field Type', fd.fieldType) : ''}
        ${fd ? row('Install Date', fd.installDate) : ''}
        ${fd ? row('Last Testing', fd.lastTestingDate) : ''}
        ${fd ? row('Urgency', fd.urgency) : ''}
        ${fd ? row('Notes', fd.notes) : ''}
      `
      break
    }
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
      <div style="background:#12324A;padding:20px 24px">
        <h2 style="color:#fff;margin:0;font-size:18px">Field Health Systems</h2>
        <p style="color:#a0b8cc;margin:4px 0 0;font-size:14px">${subject}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        ${bodyRows}
      </table>
      <div style="padding:12px 24px;background:#f9fafb;border-top:1px solid #e5e7eb">
        <p style="margin:0;font-size:12px;color:#888">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT</p>
      </div>
    </div>
  `

  return { subject, html }
}

export async function POST(request: NextRequest) {
  console.log('📧 Form submission received')

  try {
    const body = await request.json()
    const validatedData = formSchema.parse(body)

    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const { formType, firstName, lastName, email, phone, ...formSpecificData } = validatedData
    const company = 'company' in formSpecificData ? formSpecificData.company as string : undefined
    const organization = 'organization' in formSpecificData ? formSpecificData.organization as string : undefined
    const title = 'title' in formSpecificData ? formSpecificData.title as string : undefined

    // Save to database
    let submission
    try {
      submission = await prisma.formSubmission.create({
        data: {
          formType,
          firstName,
          lastName,
          email,
          phone,
          company: company || organization,
          title,
          formData: formSpecificData,
          ipAddress,
          userAgent,
          source: 'website',
        }
      })
      console.log('✅ Saved to database:', submission.id)
    } catch (dbError) {
      console.error('❌ Database save failed:', dbError instanceof Error ? dbError.message : dbError)
      submission = { id: 'fallback-' + Date.now() }
    }

    // Send email via Resend
    let emailSent = false
    let emailError: string | null = null

    try {
      const { subject, html } = generateEmailHtml({
        formType,
        firstName,
        lastName,
        email,
        phone,
        company,
        organization,
        title,
        formData: formSpecificData,
      })

      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject,
        html,
      })

      emailSent = true
      console.log('✅ Email sent via Resend')
    } catch (err) {
      emailError = err instanceof Error ? err.message : 'Unknown email error'
      console.error('❌ Resend email failed:', emailError)
    }

    // Update DB with email status
    if (!String(submission.id).startsWith('fallback-')) {
      try {
        await prisma.formSubmission.update({
          where: { id: submission.id as string },
          data: {
            emailSent,
            emailSentAt: emailSent ? new Date() : null,
            emailError,
          }
        })
      } catch (e) {
        console.log('❌ Could not update email status:', e instanceof Error ? e.message : e)
      }
    }

    return NextResponse.json({
      success: true,
      message: "We'll be in touch within 24 hours.",
      submissionId: submission.id,
      emailSent,
    })

  } catch (error) {
    console.error('❌ Form submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Please check all required fields and try again.', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
