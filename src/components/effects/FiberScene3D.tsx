'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

// Animated fiber optic cable with light pulses
function FiberCable({
  points,
  color = '#06b6d4',
  pulseSpeed = 1,
  thickness = 0.02
}: {
  points: THREE.Vector3[],
  color?: string,
  pulseSpeed?: number,
  thickness?: number
}) {
  const pulseRef = useRef<THREE.Mesh>(null)
  const progressRef = useRef(Math.random()) // Random start position

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points)
  }, [points])

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 150, thickness, 8, false)
  }, [curve, thickness])

  const pulseGeometry = useMemo(() => {
    return new THREE.SphereGeometry(thickness * 4, 16, 16)
  }, [thickness])

  useFrame((state, delta) => {
    progressRef.current = (progressRef.current + delta * pulseSpeed * 0.15) % 1

    if (pulseRef.current) {
      const point = curve.getPointAt(progressRef.current)
      pulseRef.current.position.copy(point)
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.4
      pulseRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      {/* Main cable - more visible */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color={color} transparent opacity={0.75} />
      </mesh>

      {/* Glowing core */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>

      {/* Light pulse */}
      <mesh ref={pulseRef} geometry={pulseGeometry}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>
    </group>
  )
}

// Floating particles spanning full page
function Particles({ count = 300, color = '#06b6d4' }) {
  const particlesRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100 // Tall to span page
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20

      vel[i * 3] = (Math.random() - 0.5) * 0.012
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.012
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.006
    }

    return [pos, vel]
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame((state) => {
    if (!particlesRef.current) return

    const positionAttr = particlesRef.current.geometry.attributes.position
    const posArray = positionAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]

      const dx = mouse.x * 10 - posArray[i * 3]
      const dy = mouse.y * 10 - posArray[i * 3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 5) {
        posArray[i * 3] -= dx * 0.006
        posArray[i * 3 + 1] -= dy * 0.006
      }

      if (Math.abs(posArray[i * 3]) > 25) posArray[i * 3] *= -0.95
      if (Math.abs(posArray[i * 3 + 1]) > 50) posArray[i * 3 + 1] *= -0.95
      if (Math.abs(posArray[i * 3 + 2]) > 10) posArray[i * 3 + 2] *= -0.95
    }

    positionAttr.needsUpdate = true
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.008
  })

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.07} color={color} transparent opacity={0.75} sizeAttenuation />
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

  // Fiber paths spanning entire page height
  const fiberPaths = useMemo(() => {
    const paths = []

    // Main vertical cables spanning page (y from +25 to -55)
    for (let i = 0; i < 6; i++) {
      const xOffset = (i - 2.5) * 8
      const zOffset = (i % 2) * 3 - 1.5

      paths.push([
        new THREE.Vector3(-12 + xOffset, 25, zOffset),
        new THREE.Vector3(-6 + xOffset + Math.sin(i) * 3, 15, zOffset + 2),
        new THREE.Vector3(-2 + xOffset, 5, zOffset - 1),
        new THREE.Vector3(4 + xOffset + Math.cos(i) * 2, -5, zOffset + 1),
        new THREE.Vector3(-3 + xOffset, -15, zOffset),
        new THREE.Vector3(5 + xOffset + Math.sin(i * 2) * 2, -25, zOffset - 2),
        new THREE.Vector3(-1 + xOffset, -35, zOffset + 1),
        new THREE.Vector3(3 + xOffset, -45, zOffset),
        new THREE.Vector3(-4 + xOffset, -55, zOffset - 1),
      ])
    }

    // Crossing cables for visual interest
    paths.push([
      new THREE.Vector3(-25, 20, 3),
      new THREE.Vector3(-10, 10, 0),
      new THREE.Vector3(5, -5, 2),
      new THREE.Vector3(20, -20, -1),
      new THREE.Vector3(25, -40, 2),
    ])

    paths.push([
      new THREE.Vector3(25, 15, -3),
      new THREE.Vector3(10, 0, 1),
      new THREE.Vector3(-5, -15, 0),
      new THREE.Vector3(-20, -30, 3),
      new THREE.Vector3(-25, -50, -1),
    ])

    // Additional diagonal cables
    paths.push([
      new THREE.Vector3(-20, 22, 0),
      new THREE.Vector3(0, 5, 2),
      new THREE.Vector3(20, -20, -2),
    ])

    paths.push([
      new THREE.Vector3(18, 18, 1),
      new THREE.Vector3(-5, -10, -1),
      new THREE.Vector3(-22, -45, 2),
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

  const colors = ['#06b6d4', '#0ea5e9', '#3b82f6', '#22d3ee', '#0891b2', '#0284c7', '#06b6d4', '#3b82f6', '#0ea5e9', '#22d3ee']

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    >
      <Canvas
        camera={{ position: [0, 20, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[15, 15, 15]} intensity={1.5} />
        <pointLight position={[-15, -30, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[10, -50, 8]} intensity={0.8} color="#3b82f6" />

        <ScrollCamera scrollProgress={scrollProgress} />

        {/* Fiber cables spanning the entire page */}
        {fiberPaths.map((points, index) => (
          <FiberCable
            key={index}
            points={points}
            color={colors[index % colors.length]}
            pulseSpeed={0.6 + (index % 4) * 0.25}
            thickness={0.02 + (index % 3) * 0.005}
          />
        ))}

        <Particles count={350} color="#06b6d4" />
      </Canvas>
    </div>
  )
}
