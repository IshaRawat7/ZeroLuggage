"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Environment, OrbitControls, useGLTF } from "@react-three/drei"
import { Suspense } from "react"
import { cn } from "@/lib/utils"

// Built-in sample model per guidelines
function DuckModel() {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  return <primitive object={scene} scale={1.6} />
}

// New animated shape (no external assets required)
function AnimatedShape() {
  return (
    <group>
      <mesh rotation={[0.6, 0.2, 0]}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color={"#1e66ff"} metalness={0.35} roughness={0.25} />
      </mesh>
    </group>
  )
}

export function Hero3D({ className }: { className?: string }) {
  return (
    <div
      className={cn("aspect-video w-full max-w-[520px] overflow-hidden rounded-lg border bg-card shadow-sm", className)}
    >
      <Canvas camera={{ position: [2.5, 1.6, 3.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 2]} intensity={0.9} />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
            <AnimatedShape />
          </Float>
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}

// Keep named and default exports
export default Hero3D
