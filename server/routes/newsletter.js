import { Router } from 'express'
import Subscriber, { EMAIL_RE } from '../models/Subscriber.js'

const router = Router()

const clean = (v) => String(v ?? '').trim().toLowerCase()

/**
 * POST /api/subscribe   body: { email }
 * Handles new signups, duplicates, and re-subscribing after an unsubscribe.
 */
router.post('/subscribe', async (req, res) => {
  try {
    const email = clean(req.body?.email)
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
    }

    const existing = await Subscriber.findOne({ email })

    if (existing) {
      if (existing.status === 'subscribed') {
        return res.status(200).json({
          ok: true,
          alreadySubscribed: true,
          message: "You're already on the list.",
        })
      }
      // Was unsubscribed before — bring them back.
      existing.status = 'subscribed'
      existing.unsubscribedAt = null
      await existing.save()
      return res.status(200).json({
        ok: true,
        resubscribed: true,
        message: 'Welcome back — you are subscribed again.',
      })
    }

    await Subscriber.create({ email, source: clean(req.body?.source) || 'website' })
    return res.status(201).json({ ok: true, message: "You're on the list. Welcome aboard." })
  } catch (err) {
    // Duplicate key can slip through under a race — treat it as "already subscribed".
    if (err?.code === 11000) {
      return res
        .status(200)
        .json({ ok: true, alreadySubscribed: true, message: "You're already on the list." })
    }
    console.error('[subscribe]', err.message)
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' })
  }
})

/**
 * POST /api/unsubscribe   body: { email }
 */
router.post('/unsubscribe', async (req, res) => {
  try {
    const email = clean(req.body?.email)
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
    }
    const sub = await Subscriber.findOne({ email })
    if (!sub || sub.status === 'unsubscribed') {
      return res.status(200).json({ ok: true, message: 'You are unsubscribed.' })
    }
    sub.status = 'unsubscribed'
    sub.unsubscribedAt = new Date()
    await sub.save()
    return res.status(200).json({ ok: true, message: 'You have been unsubscribed.' })
  } catch (err) {
    console.error('[unsubscribe]', err.message)
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' })
  }
})

/**
 * GET /api/subscribers/count  → { ok, count }
 * Public — handy if you ever want to show "N members on the list".
 */
router.get('/subscribers/count', async (_req, res) => {
  try {
    const count = await Subscriber.countDocuments({ status: 'subscribed' })
    res.json({ ok: true, count })
  } catch {
    res.status(500).json({ ok: false, error: 'Something went wrong.' })
  }
})

/**
 * GET /api/subscribers  → full list (newest first)
 * Locked unless ADMIN_TOKEN is set in .env AND sent as the x-admin-token header.
 */
router.get('/subscribers', async (req, res) => {
  const token = process.env.ADMIN_TOKEN
  if (!token || req.get('x-admin-token') !== token) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }
  const list = await Subscriber.find().sort({ createdAt: -1 }).lean()
  res.json({ ok: true, count: list.length, subscribers: list })
})

export default router
