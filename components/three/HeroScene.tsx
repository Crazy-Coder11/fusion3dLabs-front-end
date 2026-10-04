'use client'

import { useRef, useMemo, useEffect, Suspense, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Clean, bright, light-theme harmonious colors - NO dark/black shades
const ACCENT = '#22C55E'
const ACCENT_LIGHT = '#4ADE80'
const COLORS = [
  '#22C55E', // primary emerald
  '#4ADE80', // bright mint
  '#86EFAC', // light sage
  '#A7F3D0', // soft pastel mint
  '#34D399', // turquoise emerald
  '#6EE7B7', // luminous green
  '#BBF7D0', // pale crystal green
]

function ShardMesh({
  position,
  rotation,
  scale,
  color,
  energy,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  energy: React.MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const vel = useMemo(
    () => ({
      x: (Math.random() - 0.5) * 1.2,
      y: (Math.random() - 0.5) * 1.2,
      z: (Math.random() - 0.5) * 0.8,
    }),
    []
  )

  const geometry = useMemo(() => {
    const type = Math.random()
    const geo =
      type > 0.6
        ? new THREE.IcosahedronGeometry(1, 0)
        : type > 0.3
        ? new THREE.OctahedronGeometry(1, 0)
        : new THREE.TetrahedronGeometry(1, 0)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        pos.getX(i) + (Math.random() - 0.5) * 0.3,
        pos.getY(i) + (Math.random() - 0.5) * 0.3,
        pos.getZ(i) + (Math.random() - 0.5) * 0.3
      )
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const e = energy.current

    meshRef.current.rotation.x =
      rotation[0] + Math.sin(t * 0.3 + position[0]) * 0.12 + vel.x * e * 0.3
    meshRef.current.rotation.y = rotation[1] + t * (0.12 + e * 0.5)
    meshRef.current.rotation.z =
      rotation[2] + Math.cos(t * 0.2 + position[1]) * 0.06

    if (e > 0) {
      meshRef.current.position.x = position[0] + vel.x * e * 0.4
      meshRef.current.position.y = position[1] + vel.y * e * 0.4
      meshRef.current.position.z = position[2] + vel.z * e * 0.25
    } else {
      meshRef.current.position.x += (position[0] - meshRef.current.position.x) * 0.04
      meshRef.current.position.y += (position[1] - meshRef.current.position.y) * 0.04
      meshRef.current.position.z += (position[2] - meshRef.current.position.z) * 0.04
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.15}
        roughness={0.25}
        transparent
        opacity={0.78}
        envMapIntensity={0.8}
      />
    </mesh>
  )
}

function FocalObject({ energy }: { energy: React.MutableRefObject<number> }) {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const e = energy.current
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * (0.15 + e * 0.5)
      outerRef.current.rotation.y += delta * (0.22 + e * 0.7)
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * (0.1 + e * 0.3)
      innerRef.current.rotation.y -= delta * (0.16 + e * 0.4)
    }
    if (wireRef.current) {
      wireRef.current.rotation.x += delta * 0.06
      wireRef.current.rotation.y -= delta * 0.09
      wireRef.current.rotation.z += delta * 0.07
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (0.25 + e * 1.0)
      ringRef.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.3) * 0.12
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * (0.18 + e * 0.8)
      ring2Ref.current.rotation.y = Math.PI / 3.5 + Math.cos(t * 0.25) * 0.1
    }
  })

  return (
    // Anchored firmly on the right side (x: 2.8) so it never encroaches on left-aligned text
    <group position={[2.8, 0.1, -0.5]}>
      {/* Outer faceted gem */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color={ACCENT}
          metalness={0.2}
          roughness={0.2}
          transparent
          opacity={0.85}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Glowing inner crystal */}
      <mesh ref={innerRef} scale={0.65}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={ACCENT_LIGHT}
          metalness={0.1}
          roughness={0.15}
          transparent
          opacity={0.8}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Wireframe lattice */}
      <mesh ref={wireRef} scale={1.3}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color={ACCENT_LIGHT} wireframe transparent opacity={0.3} />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.9, 0.025, 8, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.6} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.2, 0.018, 8, 64]} />
        <meshBasicMaterial color={ACCENT_LIGHT} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function ShardField({ energy }: { energy: React.MutableRefObject<number> }) {
  const { size } = useThree()
  const isMobile = size.width < 768

  const shards = useMemo(() => {
    const count = isMobile ? 12 : 24
    return Array.from({ length: count }, (_, i) => {
      // On desktop, constrain all shards to the right half (X: 1.3 to 6.2)
      // On mobile, position them slightly lower and centered
      const posX = isMobile
        ? (Math.random() - 0.5) * 3.5
        : 1.3 + Math.random() * 4.8
      const posY = isMobile
        ? -1.6 + (Math.random() - 0.5) * 2.2
        : (Math.random() - 0.5) * 6.0
      const posZ = (Math.random() - 0.5) * 3 - 0.8

      return {
        id: i,
        position: [posX, posY, posZ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: isMobile ? 0.15 + Math.random() * 0.35 : 0.2 + Math.random() * 0.55,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })
  }, [isMobile])

  return (
    <>
      {shards.map(s => (
        <Float
          key={s.id}
          speed={0.7 + Math.random() * 1.0}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <ShardMesh {...s} energy={energy} />
        </Float>
      ))}
    </>
  )
}

function ParticleDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 120

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Biased slightly to the right side
      pos[i * 3] = 0.5 + (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
    }
    return pos
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.012
    const pos = pointsRef.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + Math.sin(state.clock.elapsedTime * 0.25 + i * 0.7) * 0.0015
      pos.setY(i, y)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT_LIGHT}
        size={0.028}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  )
}

function MouseReactiveCamera() {
  const { camera, size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useFrame(() => {
    // Gentle camera parallax that stays centered on the focal object on the right
    const targetX = mouse.current.x * 0.6
    const targetY = -mouse.current.y * 0.4
    camera.position.x += (targetX - camera.position.x) * 0.03
    camera.position.y += (targetY - camera.position.y) * 0.03
    // Look towards the center-right where the 3D art is
    camera.lookAt(1.2, 0, 0)
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1
      mouse.current.y = (e.clientY / size.height) * 2 - 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size.width, size.height])

  return null
}

export default function HeroScene() {
  const energy = useRef(0)

  const handleClick = useCallback(() => {
    energy.current = 1
    const decay = () => {
      energy.current = Math.max(0, energy.current - 0.02)
      if (energy.current > 0) requestAnimationFrame(decay)
    }
    requestAnimationFrame(decay)
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-auto cursor-pointer"
      aria-hidden="true"
      onClick={handleClick}
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Bright omnidirectional illumination - eliminates dark shadows */}
          <ambientLight intensity={1.5} />
          {/* Main key light */}
          <directionalLight position={[4, 5, 6]} intensity={1.6} color="#ffffff" />
          {/* Soft fill light from left so no facet ever goes dark */}
          <directionalLight position={[-4, 2, 4]} intensity={1.1} color="#f0fdf4" />
          {/* Green rim accent light */}
          <pointLight position={[3, 0, 3]} intensity={1.2} color="#86efac" />
          <pointLight position={[1, -2, 2]} intensity={0.7} color="#22c55e" />

          <ParticleDust />
          <ShardField energy={energy} />
          <FocalObject energy={energy} />
          <MouseReactiveCamera />
        </Suspense>
      </Canvas>
    </div>
  )
}
