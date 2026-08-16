import { useEffect } from 'react'
import { motion, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { pointerNX, pointerNY, installPointer } from '../lib/pointer'

const ease = [0.16, 1, 0.3, 1]

/*
  Active-Theory-style floating item.
  - reveals once on scroll (outer)
  - drifts toward the cursor with easing (parallax) using ONE shared pointer
  - idly bobs up and down (inner)
  Disabled gracefully when the user prefers reduced motion.
*/
export default function Floaty({ index = 0, depth = 16, className = '', children }) {
  const reduce = useReducedMotion()
  useEffect(() => {
    installPointer()
  }, [])

  const rx = useTransform(pointerNX, (v) => (reduce ? 0 : v * depth))
  const ry = useTransform(pointerNY, (v) => (reduce ? 0 : v * depth))
  const x = useSpring(rx, { stiffness: 50, damping: 16, mass: 0.6 })
  const y = useSpring(ry, { stiffness: 50, damping: 16, mass: 0.6 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease }}
      className={className}
    >
      <motion.div style={reduce ? undefined : { x, y }}>
        <motion.div
          animate={reduce ? undefined : { y: [0, -9, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4.5 + (index % 3),
            ease: 'easeInOut',
            delay: index * 0.25,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
