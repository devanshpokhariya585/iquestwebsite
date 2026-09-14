import mongoose from 'mongoose'

// Shared email check — used by the model and by the routes so validation
// is enforced server-side, never trusted from the client alone.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // one document per address
      lowercase: true, // normalise so Foo@x.com === foo@x.com
      trim: true,
      match: [EMAIL_RE, 'Invalid email address'],
    },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed'],
      default: 'subscribed',
    },
    source: { type: String, default: 'website' },
    unsubscribedAt: { type: Date, default: null },
  },
  { timestamps: true } // adds createdAt / updatedAt
)

export default mongoose.model('Subscriber', subscriberSchema)
