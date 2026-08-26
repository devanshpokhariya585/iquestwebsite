import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

// "Back to home" pill shown at the top of secondary pages (Past Events, Calendar).
export default function BackButton({ label = 'Back to home', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease }}
      className={`mb-8 ${className}`}
    >
      <Link
        to="/"
        className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition-all duration-300 hover:border-pink/60 hover:text-neon"
      >
        <ArrowLeft
          size={14}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        {label}
      </Link>
    </motion.div>
  )
}
