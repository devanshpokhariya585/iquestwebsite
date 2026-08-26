import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'

const { lerp } = THREE.MathUtils
const PINK = '#ff2338'
const NEON = '#ff5c6e'
const WHITE = '#ffffff'
const HOT = '#ffdadd' // hot filament white with a pink bias — reads "lit" but stays on-brand

function Trace({ position, args, color = NEON, intensity = 1.4 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#1e0a0c" emissive={color} emissiveIntensity={intensity} toneMapped={false} />
    </mesh>
  )
}

function Via({ position, color = NEON, r = 0.035, intensity = 1.8 }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[r, r, 0.05, 12]} />
      <meshStandardMaterial color="#1e0a0c" emissive={color} emissiveIntensity={intensity} toneMapped={false} />
    </mesh>
  )
}

function LidContent({ sign }) {
  const fins = [-0.9, -0.45, 0, 0.45, 0.9]
  return (
    <group>
      {/* main lid body */}
      <mesh>
        <boxGeometry args={[1.5, 0.3, 3.0]} />
        <meshStandardMaterial color="#140708" metalness={0.9} roughness={0.25} emissive="#2a060e" emissiveIntensity={0.5} />
        <Edges scale={1.01} threshold={15} color={PINK} />
      </mesh>
      {/* recessed inset panel */}
      <mesh position={[sign * 0.12, 0.155, 0]}>
        <boxGeometry args={[1.05, 0.04, 2.5]} />
        <meshStandardMaterial color="#0d0406" metalness={0.8} roughness={0.4} />
        <Edges threshold={15} color={NEON} />
      </mesh>
      {/* heat fins */}
      {fins.map((z) => (
        <Trace key={z} position={[sign * 0.12, 0.185, z]} args={[0.85, 0.012, 0.03]} color={PINK} intensity={0.9} />
      ))}
      {/* an L-shaped signal trace toward the seam */}
      <Trace position={[sign * 0.55, 0.185, -1.1]} args={[0.4, 0.012, 0.02]} />
      <Trace position={[sign * 0.36, 0.185, -0.75]} args={[0.02, 0.012, 0.75]} />
      {/* pad node */}
      <mesh position={[sign * 0.36, 0.185, -0.4]}>
        <boxGeometry args={[0.08, 0.03, 0.08]} />
        <meshStandardMaterial color="#1e0a0c" emissive={WHITE} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
    </group>
  )
}

function usePins() {
  return useMemo(() => {
    const pins = []
    const n = 10
    const span = 2.9
    for (let i = 0; i < n; i++) {
      const p = -span / 2 + (span / (n - 1)) * i
      pins.push([-2.02, -0.1, p])
      pins.push([2.02, -0.1, p])
      pins.push([p, -0.1, -2.02])
      pins.push([p, -0.1, 2.02])
    }
    return pins
  }, [])
}

// radiating signal traces from the core out to the pin banks (revealed on open)
function useBoard() {
  return useMemo(() => {
    const traces = []
    const vias = []
    const sides = ['+x', '-x', '+z', '-z']
    const offs = [-0.42, 0.42]
    const inner = 0.72
    const outer = 1.88
    const mid = (inner + outer) / 2
    const len = outer - inner
    sides.forEach((side) => {
      offs.forEach((o) => {
        if (side === '+x') {
          traces.push({ pos: [mid, -0.02, o], args: [len, 0.012, 0.02] })
          vias.push([outer, -0.015, o]); vias.push([inner, -0.015, o])
        } else if (side === '-x') {
          traces.push({ pos: [-mid, -0.02, o], args: [len, 0.012, 0.02] })
          vias.push([-outer, -0.015, o]); vias.push([-inner, -0.015, o])
        } else if (side === '+z') {
          traces.push({ pos: [o, -0.02, mid], args: [0.02, 0.012, len] })
          vias.push([o, -0.015, outer]); vias.push([o, -0.015, inner])
        } else {
          traces.push({ pos: [o, -0.02, -mid], args: [0.02, 0.012, len] })
          vias.push([o, -0.015, -outer]); vias.push([o, -0.015, -inner])
        }
      })
    })
    return { traces, vias }
  }, [])
}

function useMotes() {
  return useMemo(() => {
    const n = 46
    const arr = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 1.0
      arr[i * 3 + 1] = Math.random() * 1.6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.0
      seed[i] = Math.random()
    }
    return { n, arr, seed }
  }, [])
}

// coiled tungsten filament for the bulb + a shell of orbiting sparks
function useBulb() {
  return useMemo(() => {
    // helix filament
    const pts = []
    const turns = 6
    const N = 160
    for (let i = 0; i <= N; i++) {
      const a = i / N
      const ang = a * Math.PI * 2 * turns
      const r = 0.095
      pts.push(new THREE.Vector3(Math.cos(ang) * r, (a - 0.5) * 0.28, Math.sin(ang) * r))
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    const filament = new THREE.TubeGeometry(curve, 180, 0.014, 8, false)

    // spark shell around the glass
    const sn = 14
    const sparks = new Float32Array(sn * 3)
    for (let i = 0; i < sn; i++) {
      const u = Math.random(), v = Math.random()
      const th = u * Math.PI * 2, ph = Math.acos(2 * v - 1)
      const rr = 0.34 + Math.random() * 0.06
      sparks[i * 3] = Math.sin(ph) * Math.cos(th) * rr
      sparks[i * 3 + 1] = 0.42 + Math.cos(ph) * rr * 0.7
      sparks[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * rr
    }
    return { filament, sparks, sparkCount: sn }
  }, [])
}

export default function Chip({ open = false, interactive = false, onToggle, scale = 1.05, lift = 0 }) {
  const outer = useRef()
  const left = useRef()
  const right = useRef()
  const core = useRef()
  const coreMat = useRef()
  const coreInner = useRef()
  const coreLight = useRef()
  const crown = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const ringAMat = useRef()
  const ringBMat = useRef()
  const motes = useRef()
  const motesMat = useRef()
  const pulse = useRef()
  const pulse2 = useRef()
  const pulse3 = useRef()
  // bulb
  const bulb = useRef()
  const filamentMat = useRef()
  const hotspot = useRef()
  const bulbLight = useRef()
  const halo = useRef()
  const haloMat = useRef()
  const sparks = useRef()
  const sparksMat = useRef()
  const t = useRef(0)

  const pins = usePins()
  const { traces, vias } = useBoard()
  const { filament, sparks: sparkPos, sparkCount } = useBulb()
  const { n: moteCount, arr: motePos, seed: moteSeed } = useMotes()

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05)
    const time = state.clock.elapsedTime
    t.current = lerp(t.current, open ? 1 : 0, 0.09)
    const tt = t.current

    if (left.current) {
      left.current.position.x = lerp(-0.8, -2.5, tt)
      left.current.position.y = lerp(0.16, 0.95, tt)
      left.current.rotation.z = tt * 0.55
    }
    if (right.current) {
      right.current.position.x = lerp(0.8, 2.5, tt)
      right.current.position.y = lerp(0.16, 0.95, tt)
      right.current.rotation.z = -tt * 0.55
    }

    const glow = 0.6 + Math.sin(time * 2.6) * 0.18
    if (coreMat.current) coreMat.current.emissiveIntensity = lerp(0.5, 1.35 + glow * 0.3, tt)
    if (coreInner.current) coreInner.current.material.emissiveIntensity = lerp(0.4, 1.2, tt)
    if (coreLight.current) coreLight.current.intensity = lerp(1.0, 4, tt)
    if (core.current) core.current.scale.setScalar(lerp(0.92, 1.08, tt))
    if (crown.current) crown.current.rotation.y += d * (0.6 + tt * 1.2)

    if (ringAMat.current) ringAMat.current.opacity = lerp(0.14, 0.85, tt)
    if (ringBMat.current) ringBMat.current.opacity = lerp(0.1, 0.6, tt)
    if (ringA.current) { ringA.current.rotation.z += d * 0.5; ringA.current.scale.setScalar(lerp(0.95, 1.1, tt)) }
    if (ringB.current) { ringB.current.rotation.z -= d * 0.85; ringB.current.scale.setScalar(lerp(0.8, 0.95, tt)) }

    // traveling data pulses along the edges (staggered directions)
    if (pulse.current) pulse.current.position.x = ((time * 1.2) % 2.8) - 1.4
    if (pulse2.current) pulse2.current.position.x = 1.4 - ((time * 0.9 + 1.4) % 2.8)
    if (pulse3.current) pulse3.current.position.z = ((time * 1.05 + 0.7) % 2.8) - 1.4

    // BULB: rises out of the core and ignites when open
    if (bulb.current) {
      bulb.current.scale.setScalar(Math.max(0.0001, tt * 1.25))
      bulb.current.position.y = lerp(0.34, 0.66, tt) + Math.sin(time * 1.1) * 0.02 * tt
    }
    // filament flicker (fast noise on top of a warm base) so it feels alive
    const flicker = 0.85 + Math.sin(time * 22.0) * 0.06 + Math.sin(time * 7.3) * 0.09
    if (filamentMat.current) filamentMat.current.emissiveIntensity = lerp(0.0, 2.6 * flicker, tt)
    if (hotspot.current) hotspot.current.material.emissiveIntensity = lerp(0.0, 2.2 * flicker, tt)
    if (bulbLight.current) bulbLight.current.intensity = lerp(0.0, 2.4 * flicker, tt)
    if (halo.current) {
      halo.current.rotation.z += d * 0.6
      halo.current.scale.setScalar(lerp(0.7, 1 + Math.sin(time * 2.2) * 0.05, tt))
    }
    if (haloMat.current) haloMat.current.opacity = tt * (0.4 + Math.sin(time * 2.2) * 0.12)
    if (sparks.current) {
      sparks.current.rotation.y += d * 0.9
      sparks.current.rotation.x = Math.sin(time * 0.6) * 0.3
    }
    if (sparksMat.current) sparksMat.current.opacity = tt * 0.9

    // rising motes when open
    if (motes.current) {
      const p = motes.current.geometry.attributes.position.array
      for (let i = 0; i < moteCount; i++) {
        p[i * 3 + 1] += d * (0.4 + moteSeed[i] * 0.6)
        if (p[i * 3 + 1] > 1.8) p[i * 3 + 1] = 0
      }
      motes.current.geometry.attributes.position.needsUpdate = true
      if (motesMat.current) motesMat.current.opacity = tt * 0.9
    }

    if (outer.current) {
      outer.current.position.y = lift + Math.sin(time * 1.0) * 0.07
      const swayY = Math.sin(time * 0.45) * 0.28
      const targetY = swayY + state.pointer.x * 0.3
      const targetX = 0.4 + state.pointer.y * 0.14
      outer.current.rotation.y = lerp(outer.current.rotation.y, targetY, 0.05)
      outer.current.rotation.x = lerp(outer.current.rotation.x, targetX, 0.05)
    }
  })

  const handleClick = (e) => {
    if (!interactive) return
    e.stopPropagation()
    onToggle?.()
  }

  return (
    <group ref={outer} onClick={handleClick} scale={scale}>
      {/* substrate */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.7, 0.22, 3.7]} />
        <meshStandardMaterial color="#0d0406" metalness={0.7} roughness={0.35} />
        <Edges scale={1.001} threshold={15} color={PINK} />
      </mesh>

      {/* etched border trace on substrate top */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[3.0, 0.02, 3.0]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.22} toneMapped={false} />
      </mesh>

      {/* radiating signal traces + vias (fan out from the core to the pins) */}
      {traces.map((tr, i) => (
        <Trace key={`tr${i}`} position={tr.pos} args={tr.args} color={NEON} intensity={1.1} />
      ))}
      {vias.map((v, i) => (
        <Via key={`v${i}`} position={v} color={i % 3 === 0 ? WHITE : NEON} />
      ))}

      {/* concentric power-bus rings around the core */}
      <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.008, 8, 64]} />
        <meshBasicMaterial color={PINK} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.18, 0.006, 8, 64]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.32} toneMapped={false} />
      </mesh>

      {/* traveling data pulses */}
      <mesh ref={pulse} position={[0, -0.02, 1.62]}>
        <boxGeometry args={[0.14, 0.03, 0.05]} />
        <meshBasicMaterial color={WHITE} toneMapped={false} />
      </mesh>
      <mesh ref={pulse2} position={[0, -0.02, -1.62]}>
        <boxGeometry args={[0.14, 0.03, 0.05]} />
        <meshBasicMaterial color={NEON} toneMapped={false} />
      </mesh>
      <mesh ref={pulse3} position={[1.62, -0.02, 0]}>
        <boxGeometry args={[0.05, 0.03, 0.14]} />
        <meshBasicMaterial color={WHITE} toneMapped={false} />
      </mesh>

      {/* corner nodes + SMD parts */}
      {[[-1.65, -1.65], [1.65, -1.65], [-1.65, 1.65], [1.65, 1.65]].map(([x, z], i) => (
        <mesh key={`c${i}`} position={[x, -0.02, z]}>
          <boxGeometry args={[0.2, 0.06, 0.2]} />
          <meshStandardMaterial color="#1e0a0c" emissive={PINK} emissiveIntensity={1.7} toneMapped={false} />
        </mesh>
      ))}
      {[[-1.4, 1.5], [1.4, 1.5], [0, -1.6], [1.55, -0.55], [-1.5, -0.2]].map(([x, z], i) => (
        <mesh key={`s${i}`} position={[x, -0.05, z]}>
          <boxGeometry args={[0.3, 0.08, 0.14]} />
          <meshStandardMaterial color="#16080a" metalness={0.5} roughness={0.6} />
          <Edges threshold={15} color={NEON} />
        </mesh>
      ))}

      {/* secondary QFN micro-chip package (bottom-left) */}
      <group position={[-1.15, -0.02, 1.15]} rotation={[0, Math.PI / 5, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.1, 0.5]} />
          <meshStandardMaterial color="#140708" metalness={0.8} roughness={0.3} emissive="#2a060e" emissiveIntensity={0.4} />
          <Edges threshold={15} color={PINK} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.12, 0.04, 0.12]} />
          <meshStandardMaterial color="#1e0a0c" emissive={WHITE} emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
        {[-0.18, -0.06, 0.06, 0.18].map((p) => (
          <group key={p}>
            <mesh position={[0.28, 0, p]}><boxGeometry args={[0.06, 0.03, 0.03]} /><meshStandardMaterial color="#2a0d12" emissive={NEON} emissiveIntensity={1.1} toneMapped={false} /></mesh>
            <mesh position={[-0.28, 0, p]}><boxGeometry args={[0.06, 0.03, 0.03]} /><meshStandardMaterial color="#2a0d12" emissive={NEON} emissiveIntensity={1.1} toneMapped={false} /></mesh>
          </group>
        ))}
      </group>

      {/* neon pins */}
      {pins.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.07, 0.14, 0.18]} />
          <meshStandardMaterial color="#2a0d12" emissive={NEON} emissiveIntensity={1.1} metalness={0.6} roughness={0.4} toneMapped={false} />
        </mesh>
      ))}

      {/* CORE */}
      <group ref={core} position={[0, 0.04, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.5, 1.2]} />
          <meshStandardMaterial ref={coreMat} color="#2a060e" emissive={PINK} emissiveIntensity={0.7} roughness={0.2} metalness={0.1} />
          <Edges scale={1.02} threshold={15} color={NEON} />
        </mesh>
        {/* bright inner */}
        <mesh ref={coreInner} scale={0.42}>
          <boxGeometry args={[1.2, 0.5, 1.2]} />
          <meshStandardMaterial color={WHITE} emissive={WHITE} emissiveIntensity={1} toneMapped={false} />
        </mesh>
        {/* grid pattern on core top */}
        {[-0.3, 0, 0.3].map((o) => (
          <group key={o}>
            <Trace position={[o, 0.27, 0]} args={[0.015, 0.01, 0.9]} color={WHITE} intensity={1.2} />
            <Trace position={[0, 0.27, o]} args={[0.9, 0.01, 0.015]} color={WHITE} intensity={1.2} />
          </group>
        ))}
        {/* spinning crown ring */}
        <mesh ref={crown} position={[0, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.02, 10, 40]} />
          <meshBasicMaterial color={PINK} toneMapped={false} />
        </mesh>
      </group>
      <pointLight ref={coreLight} position={[0, 0.5, 0]} color={NEON} intensity={1.6} distance={9} />

      {/* ================= THE BULB ================= */}
      <group ref={bulb} position={[0, 0.30, 0]}>
        {/* screw base */}
        <mesh position={[0, 0.055, 0]}>
          <cylinderGeometry args={[0.085, 0.075, 0.11, 20]} />
          <meshStandardMaterial color="#1a1113" metalness={0.95} roughness={0.35} emissive="#2a060e" emissiveIntensity={0.3} />
        </mesh>
        {[0.02, 0.05, 0.08].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.086, 0.009, 8, 24]} />
            <meshStandardMaterial color="#0d0406" metalness={0.9} roughness={0.4} emissive={PINK} emissiveIntensity={0.25} toneMapped={false} />
          </mesh>
        ))}
        {/* glass neck */}
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.2, 0.085, 0.13, 24, 1, true]} />
          <meshStandardMaterial color={HOT} transparent opacity={0.14} roughness={0.05} metalness={0} emissive={PINK} emissiveIntensity={0.12} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
        {/* glass envelope */}
        <mesh position={[0, 0.42, 0]} scale={[1, 1.12, 1]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color={HOT} transparent opacity={0.22} roughness={0.04} metalness={0} emissive={PINK} emissiveIntensity={0.35} depthWrite={false} toneMapped={false} />
        </mesh>
        {/* glass rim highlight — a bright silhouette ring that defines the bulb */}
        <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.006, 8, 48]} />
          <meshBasicMaterial color={HOT} transparent opacity={0.55} toneMapped={false} />
        </mesh>
        {/* lead wires from the base up to the filament */}
        <mesh position={[0.03, 0.29, 0]}><cylinderGeometry args={[0.006, 0.006, 0.18, 6]} /><meshStandardMaterial color="#3a1418" emissive={HOT} emissiveIntensity={0.8} toneMapped={false} /></mesh>
        <mesh position={[-0.03, 0.29, 0]}><cylinderGeometry args={[0.006, 0.006, 0.18, 6]} /><meshStandardMaterial color="#3a1418" emissive={HOT} emissiveIntensity={0.8} toneMapped={false} /></mesh>
        {/* coiled filament */}
        <mesh position={[0, 0.42, 0]} geometry={filament}>
          <meshStandardMaterial ref={filamentMat} color={HOT} emissive={HOT} emissiveIntensity={0} toneMapped={false} />
        </mesh>
        {/* hot core glow at filament center */}
        <mesh ref={hotspot} position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={WHITE} emissive={WHITE} emissiveIntensity={0} toneMapped={false} />
        </mesh>
        {/* inner light */}
        <pointLight ref={bulbLight} position={[0, 0.42, 0]} color={HOT} intensity={0} distance={4} decay={2} />
        {/* pulsing energy halo around the glass */}
        <mesh ref={halo} position={[0, 0.42, 0]} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[0.4, 0.006, 8, 60]} />
          <meshBasicMaterial ref={haloMat} color={PINK} transparent opacity={0} toneMapped={false} />
        </mesh>
        {/* orbiting sparks */}
        <points ref={sparks}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={sparkCount} array={sparkPos} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial ref={sparksMat} color={NEON} size={0.05} transparent opacity={0} depthWrite={false} toneMapped={false} />
        </points>
      </group>

      {/* rising motes */}
      <points ref={motes} position={[0, 0.1, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={moteCount} array={motePos} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={motesMat} color={NEON} size={0.07} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </points>

      {/* LIDS */}
      <group ref={left} position={[-0.8, 0.16, 0]}>
        <LidContent sign={-1} />
      </group>
      <group ref={right} position={[0.8, 0.16, 0]}>
        <LidContent sign={1} />
      </group>

      {/* aura rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <torusGeometry args={[2.85, 0.015, 12, 90]} />
        <meshBasicMaterial ref={ringAMat} color={PINK} transparent opacity={0.14} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <torusGeometry args={[2.4, 0.01, 12, 90]} />
        <meshBasicMaterial ref={ringBMat} color={NEON} transparent opacity={0.1} toneMapped={false} />
      </mesh>
    </group>
  )
}
