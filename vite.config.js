import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Dev only: forward /api requests to the Express server on port 5000,
    // so the frontend can just fetch('/api/subscribe') with no CORS setup.
    proxy: {
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Split big vendors so three.js loads as its own cacheable chunk
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three') || id.includes('postprocessing') || id.includes('@react-three'))
            return 'three'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-router')) return 'router'
          return 'vendor'
        },
      },
    },
  },
})
