import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDB } from './db.js'
import newsletterRoutes from './routes/newsletter.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) =>
  res.json({ ok: true, service: 'iquest-api', time: new Date().toISOString() })
)

// Newsletter API
app.use('/api', newsletterRoutes)

// In production, serve the built frontend (npm run build → /dist) from the same
// server, so `npm start` runs the whole app on one port. Skipped in dev, where
// Vite serves the frontend and proxies /api here.
const distDir = path.resolve(__dirname, '..', 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ ok: false, error: 'Not found' })
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`[api] listening on http://localhost:${PORT}`))
  } catch (err) {
    console.error('[api] failed to start:', err.message)
    console.error('[api] Is MongoDB running and is MONGODB_URI correct in .env?')
    process.exit(1)
  }
}

start()
