import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

// Admin credentials (in production, store in environment variables)
const ADMIN_EMAIL = 'admin@admin.com'
const ADMIN_PASSWORD = 'admin123'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Normalize email for comparison
    const normalizedEmail = email.toLowerCase().trim()
    const normalizedPassword = password.trim()

    // Check if it's admin login first
    if (normalizedEmail === ADMIN_EMAIL.toLowerCase().trim() && normalizedPassword === ADMIN_PASSWORD) {
      console.log('Admin login detected in regular login API')
      return NextResponse.json(
        {
          message: 'Login successful',
          user: {
            email: ADMIN_EMAIL,
            name: 'Admin',
            role: 'admin',
          },
          isAdmin: true,
        },
        { status: 200 }
      )
    }

    // Regular user login
    try {
      await connectDB()
    } catch (dbError: any) {
      console.error('Database connection failed:', dbError)
      console.error('Error details:', {
        message: dbError.message,
        code: dbError.code,
        name: dbError.name
      })
      
      // Handle different types of connection errors
      if (dbError.code === 'ETIMEOUT' || dbError.message?.includes('timeout') || dbError.message?.includes('serverSelectionTimeoutMS')) {
        return NextResponse.json(
          { error: 'Database connection timeout. Please check MongoDB Atlas Network Access settings - allow 0.0.0.0/0 (all IPs) for Vercel deployment.' },
          { status: 503 }
        )
      }
      
      if (dbError.code === 'MISSING_URI' || dbError.message?.includes('MONGODB_URI')) {
        return NextResponse.json(
          { error: 'Database configuration missing. Please configure MONGODB_URI in Vercel environment variables.' },
          { status: 500 }
        )
      }
      
      if (dbError.code === 8000 || dbError.message?.includes('authentication')) {
        return NextResponse.json(
          { error: 'Database authentication failed. Please check MongoDB username and password.' },
          { status: 500 }
        )
      }
      
      if (dbError.code === 'ENOTFOUND' || dbError.message?.includes('ENOTFOUND')) {
        return NextResponse.json(
          { error: 'Database host not found. Please check your MongoDB cluster URL.' },
          { status: 500 }
        )
      }
      
      throw dbError
    }

    // Find user
    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return NextResponse.json(
        { error: 'This email is not registered. Please sign up first.' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return user without password
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    }

    return NextResponse.json(
      { message: 'Login successful', user: userResponse, isAdmin: false },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Login error:', error)
    
    if (error.message?.includes('connection') || error.message?.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB configuration.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

