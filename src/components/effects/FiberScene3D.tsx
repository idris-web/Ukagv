'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

// Animated fiber optic cable with light pulses - OPTIMIZED
function FiberCable({
  points,
  color = '#06b6d4',
  pulseSpeed = 1,
  thickness = 0.015
}: {
  points: THREE.Vector3[],
  color?: string,
  pulseSpeed?: number,
  thickness?: number
}) {
  const pulseRef = useRef<THREE.Mesh>(null)
  const progressRef = useRef(Math.random())

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points)
  }, [points])

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 80, thickness, 6, false)
  }, [curve, thickness])

  const pulseGeometry = useMemo(() => {
    return new THREE.SphereGeometry(thickness * 3, 12, 12)
  }, [thickness])

  useFrame((state, delta) => {
    progressRef.current = (progressRef.current + delta * pulseSpeed * 0.1) % 1

    if (pulseRef.current) {
      const point = curve.getPointAt(progressRef.current)
      pulseRef.current.position.copy(point)
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      pulseRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      {/* Main cable - subtle */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      {/* Light pulse */}
      <mesh ref={pulseRef} geometry={pulseGeometry}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// Floating particles - REDUCED for performance
function Particles({ count = 100, color = '#06b6d4' }) {
  const particlesRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }

    return pos
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

// Camera that follows scroll through the entire page
function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    // Camera moves down the page as user scrolls
    camera.position.y = 20 - scrollProgress * 80
    camera.position.z = 12 + Math.sin(scrollProgress * Math.PI * 2) * 3
    camera.position.x = Math.sin(scrollProgress * Math.PI) * 5
    camera.lookAt(0, 20 - scrollProgress * 80, 0)
  })

  return null
}

// Main 3D Scene Component - Visible throughout entire page
export default function FiberScene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Fiber paths - SIMPLIFIED for cleaner look
  const fiberPaths = useMemo(() => {
    const paths = []

    // Only 4 elegant flowing cables
    paths.push([
      new THREE.Vector3(-15, 25, 2),
      new THREE.Vector3(-8, 10, 0),
      new THREE.Vector3(-5, -5, 2),
      new THREE.Vector3(-10, -25, -1),
      new THREE.Vector3(-8, -45, 1),
    ])

    paths.push([
      new THREE.Vector3(12, 22, -1),
      new THREE.Vector3(6, 8, 2),
      new THREE.Vector3(10, -10, 0),
      new THREE.Vector3(5, -30, 2),
      new THREE.Vector3(8, -50, -1),
    ])

    paths.push([
      new THREE.Vector3(-20, 18, 0),
      new THREE.Vector3(0, 0, 3),
      new THREE.Vector3(18, -25, -2),
    ])

    paths.push([
      new THREE.Vector3(20, 15, 1),
      new THREE.Vector3(-3, -8, -1),
      new THREE.Vector3(-18, -40, 2),
    ])

    return paths
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? scrollY / maxScroll : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const colors = ['#06b6d4', '#0ea5e9', '#3b82f6', '#22d3ee']

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.4, zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 20, 15], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        <ScrollCamera scrollProgress={scrollProgress} />

        {/* Fiber cables - clean and subtle */}
        {fiberPaths.map((points, index) => (
          <FiberCable
            key={index}
            points={points}
            color={colors[index % colors.length]}
            pulseSpeed={0.4 + index * 0.15}
            thickness={0.018}
          />
        ))}

        <Particles count={80} color="#06b6d4" />
      </Canvas>
    </div>
  )
}
