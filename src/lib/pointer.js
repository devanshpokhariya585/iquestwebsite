import { motionValue } from 'framer-motion'

export const pointerNX = motionValue(0) 
export const pointerNY = motionValue(0)

let installed = false
export function installPointer() {
  if (installed || typeof window === 'undefined') return
  installed = true
  const onMove = (e) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    pointerNX.set((e.clientX - cx) / cx)
    pointerNY.set((e.clientY - cy) / cy)
  }
  window.addEventListener('mousemove', onMove, { passive: true })
}
