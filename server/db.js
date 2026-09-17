import mongoose from 'mongoose'

/**
 * Connect to MongoDB using the URI from .env (MONGODB_URI).
 * Works with a local MongoDB (the one you inspect in Compass) or Atlas.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('\n[db] Missing MONGODB_URI. Copy .env.example to .env and set it.\n')
    process.exit(1)
  }

  mongoose.connection.on('connected', () => {
    console.log(`[db] MongoDB connected → ${mongoose.connection.name}`)
  })
  mongoose.connection.on('error', (err) => {
    console.error('[db] MongoDB error:', err.message)
  })

  // Fail fast with a clear message if the server can't be reached.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  return mongoose.connection
}
