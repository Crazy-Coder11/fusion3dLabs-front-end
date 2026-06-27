'use client'

import { useRef, useMemo, useState, Suspense, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

const ACCENT = '#e8630a'
const ACCENT2 = '#c2410c'
const COLORS = [ACCENT, ACCENT2, '#ff8c42', '#3a3a4a', '#4a3520', '#ff6b2c']

function ShardMesh({ position, rotation, scale, color, energy }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  energy: React.MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const vel = useMemo(() => ({
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    z: (Math.random() - 0.5) * 1,
  }), [])

  const geometry = useMemo(() => {
    const type = Math.random()
    const geo = type > 0.6
      ? new THREE.IcosahedronGeometry(1, 0)
      : type > 0.3
        ? new THREE.OctahedronGeometry(1, 0)
        : new THREE.TetrahedronGeometry(1, 0)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        pos.getX(i) + (Math.random() - 0.5) * 0.35,
        pos.getY(i) + (Math.random() - 0.5) * 0.35,
        pos.getZ(i) + (Math.random() - 0.5) * 0.35,
      )
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const e = energy.current
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.3 + position[0]) * 0.12 + vel.x * e * 0.4
    meshRef.current.rotation.y = rotation[1] + t * (0.15 + e * 0.8)
    meshRef.current.rotation.z = rotation[2] + Math.cos(t * 0.2 + position[1]) * 0.06
    if (e > 0) {
      meshRef.current.position.x = position[0] + vel.x * e * 0.5
      meshRef.current.position.y = position[1] + vel.y * e * 0.5
      meshRef.current.position.z = position[2] + vel.z * e * 0.3
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
        metalness={0.75}
        roughness={0.15}
        transparent
        opacity={0.88}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}

function FocalObject({ energy }: { energy: React.MutableRefObject<number> }) {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const e = energy.current
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * (0.12 + e * 0.6)
      outerRef.current.rotation.y += delta * (0.2 + e * 0.8)
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * (0.08 + e * 0.4)
      innerRef.current.rotation.y -= delta * (0.15 + e * 0.5)
    }
    if (wireRef.current) {
      wireRef.current.rotation.x += delta * 0.05
      wireRef.current.rotation.y -= delta * 0.1
      wireRef.current.rotation.z += delta * 0.07
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (0.3 + e * 1.5)
      ringRef.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.3) * 0.15
    }
  })

  return (
    <group position={[2.5, 0, -1]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial color={ACCENT} metalness={0.9} roughness={0.05} transparent opacity={0.85} envMapIntensity={2} />
      </mesh>
      <mesh ref={innerRef} scale={0.6}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color="#ff8c42" metalness={1} roughness={0} transparent opacity={0.5} envMapIntensity={3} />
      </mesh>
      <mesh ref={wireRef} scale={1.25}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color={ACCENT2} wireframe transparent opacity={0.2} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.025, 8, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function ShardField({ energy }: { energy: React.MutableRefObject<number> }) {
  const { size } = useThree()
  const isMobile = size.width < 768

  const shards = useMemo(() => {
    const count = isMobile ? 16 : 35
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 - 2,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.15 + Math.random() * 0.7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  }, [isMobile])

  return (
    <>
      {shards.map(s => (
        <Float key={s.id} speed={0.8 + Math.random() * 1.2} rotationIntensity={0.25} floatIntensity={0.6}>
          <ShardMesh {...s} energy={energy} />
        </Float>
      ))}
    </>
  )
}

function ParticleDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3
    }
    return pos
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.015
    const pos = pointsRef.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + Math.sin(state.clock.elapsedTime * 0.3 + i * 0.7) * 0.002
      pos.setY(i, y)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color={ACCENT} size={0.025} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

function MouseReactiveCamera() {
  const { camera, size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.8 - camera.position.x) * 0.04
    camera.position.y += (-mouse.current.y * 1.2 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1
      mouse.current.y = (e.clientY / size.height) * 2 - 1
    }
  }

  return null
}

export default function HeroScene() {
  const energy = useRef(0)

  const handleClick = useCallback(() => {
    energy.current = 1
    const decay = () => {
      energy.current = Math.max(0, energy.current - 0.025)
      if (energy.current > 0) requestAnimationFrame(decay)
    }
    requestAnimationFrame(decay)
  }, [])

  return (
    <div className="absolute inset-0 cursor-crosshair" aria-hidden="true" onClick={handleClick}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color={ACCENT} />
          <pointLight position={[5, -3, 2]} intensity={0.4} color="#ff8c42" />
          <pointLight position={[-3, 4, 2]} intensity={0.2} color="#4466ff" />
          <Environment preset="city" />
          <ParticleDust />
          <ShardField energy={energy} />
          <FocalObject energy={energy} />
          <MouseReactiveCamera />
        </Suspense>
      </Canvas>
    </div>
  )
}
