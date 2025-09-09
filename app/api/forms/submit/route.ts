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
  // Check if we have real email credentials (not placeholders)
  const hasRealCredentials = process.env.EMAIL_SERVER_USER && 
                           process.env.EMAIL_SERVER_PASSWORD &&
                           process.env.EMAIL_SERVER_USER !== 'your-email@gmail.com' &&
                           process.env.EMAIL_SERVER_PASSWORD !== 'your-app-password'

  if (!hasRealCredentials) {
    console.log('📧 Email configuration uses placeholder values - skipping email sending')
    return null
  }

  console.log('📧 Creating email transporter with real credentials')
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
  console.log('📧 Form submission received')
  
  try {
    const body = await request.json()
    console.log('📧 Request body parsed:', { ...body, email: body.email ? '[REDACTED]' : 'missing' })
    
    // Validate the form data
    const validatedData = formSchema.parse(body)
    console.log('✅ Form data validated successfully')
    
    // Get request metadata
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Prepare form-specific data
    const { formType, firstName, lastName, email, phone, company, title, ...formSpecificData } = validatedData
    
    console.log('💾 Attempting to save to database...')
    
    let submission
    try {
      // Save to database
      submission = await prisma.formSubmission.create({
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
      console.log('✅ Saved to database with ID:', submission.id)
    } catch (dbError) {
      console.error('❌ Database save failed:', dbError.message)
      
      // Fallback: Create a submission object for logging
      submission = {
        id: 'fallback-' + Date.now(),
        formType,
        firstName,
        lastName,
        email,
        phone,
        company,
        title,
        formData: formSpecificData,
        createdAt: new Date(),
      }
      
      console.log('📋 Using fallback submission logging')
    }
    
    // Send notification email (non-blocking)
    console.log('📨 Attempting to send notification email...')
    const transporter = createEmailTransporter()
    const emailResult = await sendNotificationEmail(submission, transporter)
    
    if (emailResult.sent) {
      console.log('✅ Email sent successfully')
    } else {
      console.log('❌ Email failed:', emailResult.error)
      
      // Fallback: Log to console for manual checking
      console.log('📋 FORM SUBMISSION RECEIVED (for manual review):')
      console.log('=====================================')
      console.log(`Name: ${firstName} ${lastName}`)
      console.log(`Email: ${email}`)
      console.log(`Company: ${company}`)
      console.log(`Title: ${title}`)
      console.log(`Phone: ${phone || 'Not provided'}`)
      console.log(`Form Type: ${formType}`)
      console.log(`Submission ID: ${submission.id}`)
      console.log(`Time: ${new Date().toLocaleString()}`)
      if (formSpecificData.additionalInfo) {
        console.log(`Additional Info: ${formSpecificData.additionalInfo}`)
      }
      console.log('=====================================')
    }
    
    // Update submission with email status (only if saved to database)
    if (!submission.id.startsWith('fallback-')) {
      try {
        await prisma.formSubmission.update({
          where: { id: submission.id },
          data: {
            emailSent: emailResult.sent,
            emailSentAt: emailResult.sent ? new Date() : null,
            emailError: emailResult.error,
          }
        })
      } catch (updateError) {
        console.log('❌ Could not update submission email status:', updateError.message)
      }
    }
    
    console.log('✅ Form submission completed successfully')
    
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully. We\'ll respond within 24 hours.',
      submissionId: submission.id,
      emailSent: emailResult.sent
    })
    
  } catch (error) {
    console.error('❌ Form submission error:', error)
    
    if (error instanceof z.ZodError) {
      console.error('❌ Validation error:', error.errors)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check all required fields and try again.',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    // Database connection errors
    if (error.message?.includes('PrismaClient') || 
        error.message?.includes('SQLITE') ||
        error.message?.includes('database') ||
        error.code === 'P1001' ||
        error.code === 'P2002') {
      console.error('❌ Database connection error:', error.message)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection failed. Please try again in a moment.' 
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again or contact support.' 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}