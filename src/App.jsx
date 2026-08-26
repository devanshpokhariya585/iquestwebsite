import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import useLenis from './lib/useLenis'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

const PastEvents = lazy(() => import('./pages/PastEvents'))
const Calendar = lazy(() => import('./pages/Calendar'))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const go = () => {
      if (hash) {
        const el = document.querySelector(hash)
        if (el) {
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 })
          else el.scrollIntoView({ behavior: 'smooth' })
          return true
        }
        return false
      }
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
      return true
    }
    if (!go()) setTimeout(go, 150)
    else if (hash) setTimeout(go, 150)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [booted, setBooted] = useState(false)
  useLenis()

  return (
    <>
      <Loader onDone={() => setBooted(true)} />
      <ScrollManager />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/past" element={<PastEvents />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
        <Footer />
      </motion.div>
    </>
  )
}
