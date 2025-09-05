import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, we sent a reset link.' },
        { status: 200 }
      )
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token
    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token,
        expires,
        userId: user.id,
      }
    })

    // Send email (if configured)
    if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER) {
      try {
        const transporter = nodemailer.createTransporter({
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        })

        const resetUrl = `${process.env.APP_URL}/auth/reset-password?token=${token}`

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Password Reset Request - Field Health Systems',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Password Reset Request</h2>
              <p>You requested a password reset for your Field Health Systems account.</p>
              <p>Click the link below to reset your password:</p>
              <a href="${resetUrl}" style="display: inline-block; background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
              <p>This link will expire in 1 hour.</p>
              <p>If you didn't request this reset, please ignore this email.</p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Continue anyway - token is saved in database
      }
    }

    return NextResponse.json(
      { message: 'If an account with that email exists, we sent a reset link.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}