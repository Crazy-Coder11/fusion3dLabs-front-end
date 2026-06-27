'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Core({ hovered, color }: { hovered: boolean; color: string }) {
  const solidRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const spd = hovered ? 3.2 : 1
    if (solidRef.current) {
      solidRef.current.rotation.x += delta * 0.35 * spd
      solidRef.current.rotation.y += delta * 0.55 * spd
      const ts = hovered ? 1.12 : 1
      solidRef.current.scale.setScalar(THREE.MathUtils.lerp(solidRef.current.scale.x, ts, 0.1))
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.2 * spd
      wireRef.current.rotation.y += delta * 0.4 * spd
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.6 * spd
      ring1Ref.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.4) * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.4 * spd
      ring2Ref.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.3) * 0.12
    }
  })

  return (
    <>
      <mesh ref={solidRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.08}
          transparent
          opacity={0.92}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.08}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial
          color={hovered ? '#ff8c42' : '#e8630a'}
          wireframe
          transparent
          opacity={hovered ? 0.45 : 0.12}
        />
      </mesh>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.018, 8, 60]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.7 : 0.25} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.6, 0.01, 6, 48]} />
        <meshBasicMaterial color="#ff8c42" transparent opacity={hovered ? 0.4 : 0.1} />
      </mesh>
    </>
  )
}

function Particles({ hovered, color }: { hovered: boolean; color: string }) {
  const ref = useRef<THREE.Points>(null)
  const count = 100

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 1.7 + Math.random() * 0.9
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const spd = hovered ? 2.8 : 0.7
    ref.current.rotation.y += delta * 0.12 * spd
    ref.current.rotation.x += delta * 0.06 * spd

    const pos = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const phi = i * 0.18 + t * spd * 0.2
      const theta = i * 0.3 + t * spd * 0.12
      const r = 1.7 + Math.sin(t * 0.5 + i * 0.3) * (hovered ? 0.25 : 0.08)
      pos.setXYZ(
        i,
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={hovered ? 0.045 : 0.022}
        transparent
        opacity={hovered ? 0.95 : 0.35}
        sizeAttenuation
      />
    </points>
  )
}

export default function ProductCardScene({ hovered = false, color = '#e8630a' }: {
  hovered?: boolean
  color?: string
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <pointLight position={[3, 3, 3]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-3, -2, -2]} intensity={1.0} color="#e8630a" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#ff8c42" />
        <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.3}>
          <Core hovered={hovered} color={color} />
        </Float>
        <Particles hovered={hovered} color={color} />
      </Suspense>
    </Canvas>
  )
}
