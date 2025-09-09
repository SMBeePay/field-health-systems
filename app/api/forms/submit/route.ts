import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

// Validation schemas
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
  partnershipFormSchema,
  scheduleAssessmentSchema,
])

// Email transporter setup
function createEmailTransporter() {
  if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER) {
    console.warn('Email configuration incomplete - emails will not be sent')
    return null
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })
}

async function sendNotificationEmail(submission: {
  formType: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  title?: string
  formData: Record<string, unknown>
}, transporter: nodemailer.Transporter | null) {
  if (!transporter) return { sent: false, error: 'Email not configured' }

  try {
    const emailContent = generateEmailContent(submission)
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@fieldhealthsystems.com',
      to: process.env.ADMIN_EMAIL || 'andrew@fieldhealthsystems.com',
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    })

    return { sent: true, error: null }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { 
      sent: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    }
  }
}

function generateEmailContent(submission: {
  formType: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  title?: string
  formData: Record<string, unknown>
}) {
  const { formType, firstName, lastName, email, phone, company, title, formData } = submission

  let subject = ''
  let content = ''

  switch (formType) {
    case 'PARTNERSHIP':
      subject = `New Partnership Inquiry from ${company}`
      content = `
        <h2>New Partnership Form Submission</h2>
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Company:</strong> ${company}</li>
          <li><strong>Title:</strong> ${title}</li>
        </ul>
        
        <h3>Company Details:</h3>
        <ul>
          <li><strong>Company Type:</strong> ${(formData as Record<string, unknown>).companyType || 'Not specified'}</li>
          <li><strong>Education Sector Exposure:</strong> ${(formData as Record<string, unknown>).educationExposure || 'Not specified'}</li>
          <li><strong>Areas of Interest:</strong> ${Array.isArray((formData as Record<string, unknown>).interests) ? ((formData as Record<string, unknown>).interests as string[]).join(', ') : 'None specified'}</li>
        </ul>
        
        ${(formData as Record<string, unknown>).additionalInfo ? `
        <h3>Additional Information:</h3>
        <p>${(formData as Record<string, unknown>).additionalInfo}</p>
        ` : ''}
        
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `
      break
    
    case 'SCHEDULE_ASSESSMENT':
      subject = `New Field Assessment Request from ${firstName} ${lastName}`
      content = `
        <h2>New Field Assessment Request</h2>
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Company:</strong> ${company || 'Not provided'}</li>
          <li><strong>Title:</strong> ${title || 'Not provided'}</li>
        </ul>
        
        ${(formData as Record<string, unknown>).fieldDetails ? `
        <h3>Field Details:</h3>
        <ul>
          <li><strong>Field Name:</strong> ${((formData as Record<string, unknown>).fieldDetails as Record<string, unknown>)?.fieldName || 'Not provided'}</li>
          <li><strong>Field Type:</strong> ${((formData as Record<string, unknown>).fieldDetails as Record<string, unknown>)?.fieldType || 'Not provided'}</li>
          <li><strong>Install Date:</strong> ${((formData as Record<string, unknown>).fieldDetails as Record<string, unknown>)?.installDate || 'Not provided'}</li>
          <li><strong>Last Testing:</strong> ${((formData as Record<string, unknown>).fieldDetails as Record<string, unknown>)?.lastTestingDate || 'Not provided'}</li>
          <li><strong>Urgency:</strong> ${((formData as Record<string, unknown>).fieldDetails as Record<string, unknown>)?.urgency || 'Not specified'}</li>
        </ul>
        
        ${((formData as Record<string, unknown>).fieldDetails as Record<string, unknown>)?.notes ? `
        <h3>Additional Notes:</h3>
        <p>${((formData as Record<string, unknown>).fieldDetails as Record<string, unknown>)?.notes}</p>
        ` : ''}
        ` : ''}
        
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `
      break
  }

  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

  return { subject, html: content, text }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = formSchema.parse(body)
    
    // Get request metadata
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Prepare form-specific data
    const { formType, firstName, lastName, email, phone, company, title, ...formSpecificData } = validatedData
    
    // Save to database
    const submission = await prisma.formSubmission.create({
      data: {
        formType,
        firstName,
        lastName,
        email,
        phone,
        company,
        title,
        formData: formSpecificData,
        ipAddress,
        userAgent,
        source: 'website',
      }
    })
    
    // Send notification email
    const transporter = createEmailTransporter()
    const emailResult = await sendNotificationEmail(submission, transporter)
    
    // Update submission with email status
    await prisma.formSubmission.update({
      where: { id: submission.id },
      data: {
        emailSent: emailResult.sent,
        emailSentAt: emailResult.sent ? new Date() : null,
        emailError: emailResult.error,
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission.id
    })
    
  } catch (error) {
    console.error('Form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}