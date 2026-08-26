import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { team } from '../data/content'

const ease = [0.16, 1, 0.3, 1]
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function fill(i) {
  const h = 315 - i * 30
  return (
    `radial-gradient(120% 90% at 25% 15%, hsla(${h},85%,55%,0.5), transparent 60%),` +
    `radial-gradient(120% 120% at 70% 110%, hsla(${h + 60},80%,50%,0.45), transparent 62%),` +
    `linear-gradient(180deg,#160809,#0d0406)`
  )
}


function Photo({ m, i, className }) {
  const candidates = [`/team/${slug(m.name)}.jpg`, `/team/${slug(m.name)}.png`]
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`grid place-items-center ${className}`} style={{ background: fill(i) }}>
        <span className="font-display text-6xl font-extrabold text-white/70">{m.initials}</span>
      </div>
    )
  }
  return (
    <img
      src={candidates[idx]}
      onError={() => (idx < candidates.length - 1 ? setIdx(idx + 1) : setFailed(true))}
      alt={m.name}
      loading="lazy"
      className={className}
    />
  )
}

// grid card that flips on hover to a "CLICK ME" back; click opens the enlarged view
function MemberCard({ m, i, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(m)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (i % 5) * 0.05, ease }}
      className="group relative aspect-[4/5] cursor-pointer [perspective:1100px]"
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT — photo */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/12 bg-[#0d0406] shadow-lg [backface-visibility:hidden]">
          <Photo m={m} i={i} className="absolute inset-0 h-full w-full object-cover" />
          <div className="scanlines absolute inset-0 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
          <span className="absolute left-4 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/70">
            IQ · BOARD
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display text-lg font-bold leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] md:text-xl">
              {m.name}
            </h3>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-neon">{m.role}</p>
          </div>
        </div>

        {/* BACK — click me */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-pink/60 p-4 text-center shadow-[0_0_45px_rgba(255,35,56,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ background: fill(i) }}
        >
          <div className="scanlines absolute inset-0 opacity-40" />
          <span className="pointer-events-none absolute inset-0 grid place-items-center font-display text-7xl font-extrabold text-white/10">
            {m.initials}
          </span>
          <span className="relative animate-pulse-soft font-mono text-[12px] uppercase tracking-[0.4em] text-neon">
            Click me
          </span>
          <span className="relative font-display text-lg font-bold text-white">{m.name}</span>
          <span className="relative font-mono text-[9px] uppercase tracking-[0.25em] text-muted">{m.role}</span>
        </div>
      </div>
    </motion.button>
  )
}

// enlarged view (opens on click) with the message shown
function MemberModal({ m, onClose }) {
  const i = team.members.indexOf(m)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-void/85 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 8 }}
        transition={{ duration: 0.32, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-[3/4] max-h-[88vh] w-[86vw] max-w-[440px] overflow-hidden rounded-3xl border-2 border-pink/70 shadow-[0_0_90px_rgba(255,35,56,0.45)] md:w-[40vw]"
      >
        <Photo m={m} i={i} className="absolute inset-0 h-full w-full object-cover" />
        <div className="scanlines absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
        <span className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
          IQ · BOARD
        </span>

        {/* message */}
        <div className="absolute inset-x-0 bottom-0 p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon">{m.role}</p>
          <h3 className="mt-2 font-display text-3xl font-extrabold text-white md:text-4xl">{m.name}</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/90">
            {m.bio || 'A proud member of the Innovators Quest board.'}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-void/50 text-white transition-colors hover:border-pink hover:text-neon"
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function TeamCarousel() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="team" className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:py-32">
      {/* blended group banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease }}
        className="relative mb-16 h-[66vh] min-h-[420px] w-full overflow-hidden rounded-3xl"
      >
        <img
          src="/team/group.jpg"
          alt="The Innovators Quest board"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: 'center 14%',
            filter: 'saturate(0.95) contrast(1.03)',
            WebkitMaskImage: 'radial-gradient(140% 120% at 50% 40%, #000 62%, transparent 100%)',
            maskImage: 'radial-gradient(140% 120% at 50% 40%, #000 62%, transparent 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink/20 via-transparent to-magenta/15 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/5 to-transparent" />
        <div className="scanlines absolute inset-0 opacity-30" />
        <div className="absolute inset-0 flex items-end">
          <div className="p-8 md:p-12">
            <p className="eyebrow">{team.eyebrow}</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold leading-[0.9] tracking-tight text-white text-glow-white md:text-7xl">
              THE <span className="text-pink text-glow-pink">MINDS</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/90">
              {team.members.length} minds, one quest. {team.subheading}{' '}
              <span className="text-neon">Click a card to enlarge.</span>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {team.members.map((m, i) => (
          <MemberCard key={m.name} m={m} i={i} onOpen={setOpen} />
        ))}
      </div>

      <AnimatePresence>
        {open && <MemberModal m={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
