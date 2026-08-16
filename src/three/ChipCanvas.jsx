import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Chip from './Chip'

/*
  3D stage for the neon processor.
  PERF: the canvas only runs its render loop while it is on-screen
  (IntersectionObserver -> frameloop). Off-screen canvases stop rendering
  entirely, which is the big win when two chips exist on one page.
  dpr is capped so high-DPI screens don't render 4x the pixels through bloom.
*/
export default function ChipCanvas({
  interactive = false,
  open = false,
  onToggle,
  dust = true,
  scale = 1.05,
  lift = 0,
}) {
  const wrapRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: '120px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.3, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 4]} intensity={1.0} color="#ffd7f0" />
        <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ff2d95" />
        <pointLight position={[0, -3, 2]} intensity={0.5} color="#d81ce0" />

        <Suspense fallback={null}>
          <Chip interactive={interactive} open={open} onToggle={onToggle} scale={scale} lift={lift} />
          {dust && (
            <Sparkles count={28} scale={[10, 6, 6]} size={2.6} speed={0.3} color="#ff7ad4" opacity={0.5} />
          )}
        </Suspense>

        <EffectComposer>
          <Bloom mipmapBlur intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.3} radius={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
