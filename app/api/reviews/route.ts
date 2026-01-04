import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Review from '@/models/Review'

// Get reviews for a product
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const productSlug = searchParams.get('productSlug')

    if (!productId && !productSlug) {
      return NextResponse.json(
        { error: 'Product ID or slug is required' },
        { status: 400 }
      )
    }

    const query: any = {}
    if (productId) query.productId = productId
    if (productSlug) query.productSlug = productSlug

    const reviews = await Review.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ reviews }, { status: 200 })
  } catch (error: any) {
    console.error('Get reviews error:', error)
    
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

// Create a new review
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { productId, productSlug, userName, userEmail, rating, comment } = body

    // Validate required fields
    if (!productId || !productSlug || !userName || !userEmail || !rating || !comment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Create review
    const review = await Review.create({
      productId,
      productSlug,
      userName,
      userEmail,
      rating,
      comment,
    })

    return NextResponse.json(
      { 
        message: 'Review submitted successfully',
        review 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create review error:', error)
    
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
