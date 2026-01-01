import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

// Don't throw error if URI is missing - will handle in connectDB

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined')
    const error = new Error('Database connection string is missing. Please configure MONGODB_URI environment variable.')
    ;(error as any).code = 'MISSING_URI'
    throw error
  }

  // Check if connection is already established
  if (cached.conn) {
    // Verify connection is still active
    if (mongoose.connection.readyState === 1) {
      return cached.conn
    } else {
      // Connection lost, reset cache
      cached.conn = null
      cached.promise = null
    }
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // 30 seconds (Vercel needs more time)
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 30000, // 30 seconds
      maxPoolSize: 5, // Reduced for serverless
      minPoolSize: 0, // Serverless doesn't need persistent pool
      retryWrites: true,
      retryReads: true,
      // Additional options for better connection stability
      heartbeatFrequencyMS: 10000,
      serverSelectionRetryMS: 5000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully')
      return mongoose
    }).catch((error: any) => {
      console.error('❌ MongoDB connection error:', error.message)
      console.error('Error code:', error.code)
      console.error('Error name:', error.name)
      
      // Better error messages
      if (error.message?.includes('authentication') || error.code === 8000) {
        console.error('💡 Tip: Check your username and password in MongoDB Atlas')
      } else if (error.message?.includes('network') || error.message?.includes('timeout') || error.code === 'ETIMEOUT') {
        console.error('💡 Tip: Check Network Access in MongoDB Atlas - allow 0.0.0.0/0 (all IPs)')
      } else if (error.message?.includes('ENOTFOUND') || error.message?.includes('DNS') || error.code === 'ENOTFOUND') {
        console.error('💡 Tip: Check your cluster URL in the connection string')
      } else if (error.code === 'ECONNREFUSED') {
        console.error('💡 Tip: MongoDB server is not accessible. Check Network Access settings.')
      }
      
      // Clear cache on error
      cached.promise = null
      cached.conn = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e: any) {
    cached.promise = null
    cached.conn = null
    
    // Enhanced error for timeout
    if (e.code === 'ETIMEOUT' || e.message?.includes('timeout')) {
      const timeoutError = new Error('Database connection timeout. Please check MongoDB Atlas Network Access settings and ensure 0.0.0.0/0 is allowed.')
      ;(timeoutError as any).code = 'ETIMEOUT'
      throw timeoutError
    }
    
    throw e
  }

  return cached.conn
}

export default connectDB

