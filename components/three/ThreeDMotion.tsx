import { Canvas } from '@react-three/fiber'

export default function ThreeDMotion() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Floating cubes - static with slight rotation via CSS in the about page */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} rotation={[(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5]}>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#22C55E' : '#86EFAC'}
              opacity={0.4 + (i % 3) * 0.1}
              transparent
            />
          </mesh>
        ))}
      </group>
    </Canvas>
  )
}