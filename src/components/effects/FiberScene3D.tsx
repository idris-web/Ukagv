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
  const progressRef = useRef(0)

  // Create smooth curve from points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points)
  }, [points])

  // Create tube geometry
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, thickness, 8, false)
  }, [curve, thickness])

  // Pulse geometry (smaller sphere that travels along the cable)
  const pulseGeometry = useMemo(() => {
    return new THREE.SphereGeometry(thickness * 3, 16, 16)
  }, [thickness])

  useFrame((state, delta) => {
    // Animate pulse along the cable
    progressRef.current = (progressRef.current + delta * pulseSpeed * 0.3) % 1

    if (pulseRef.current) {
      const point = curve.getPointAt(progressRef.current)
      pulseRef.current.position.copy(point)

      // Pulsing glow effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.3
      pulseRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      {/* Main cable */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Glowing core */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Light pulse traveling along cable */}
      <mesh ref={pulseRef} geometry={pulseGeometry}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

// Floating particles using Points with pre-built geometry
function Particles({ count = 100, color = '#06b6d4' }) {
  const particlesRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10

      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
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
      // Add velocity
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]

      // Mouse influence
      const dx = mouse.x * 5 - posArray[i * 3]
      const dy = mouse.y * 5 - posArray[i * 3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 3) {
        posArray[i * 3] -= dx * 0.01
        posArray[i * 3 + 1] -= dy * 0.01
      }

      // Wrap around
      if (Math.abs(posArray[i * 3]) > 10) posArray[i * 3] *= -0.9
      if (Math.abs(posArray[i * 3 + 1]) > 10) posArray[i * 3 + 1] *= -0.9
      if (Math.abs(posArray[i * 3 + 2]) > 5) posArray[i * 3 + 2] *= -0.9
    }

    positionAttr.needsUpdate = true

    // Slow rotation
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Animated gradient background plane
function GradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#0a0a0f') },
    uColor2: { value: new THREE.Color('#06b6d4') },
    uColor3: { value: new THREE.Color('#3b82f6') },
  }), [])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
  })

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    void main() {
      float noise = sin(vUv.x * 10.0 + uTime * 0.5) * sin(vUv.y * 10.0 + uTime * 0.3) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, vUv.y + noise * 0.2);
      color = mix(color, uColor3, sin(uTime * 0.2 + vUv.x * 3.0) * 0.3 + 0.3);
      gl_FragColor = vec4(color, 0.3);
    }
  `

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[30, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

// Camera that responds to scroll
function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.y = -scrollProgress * 2
    camera.position.z = 5 + scrollProgress * 2
    camera.lookAt(0, -scrollProgress * 2, 0)
  })

  return null
}

// Main 3D Scene Component
export default function FiberScene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Define multiple fiber cable paths
  const fiberPaths = useMemo(() => [
    // Main central cable
    [
      new THREE.Vector3(-10, 5, 0),
      new THREE.Vector3(-5, 3, 1),
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(5, 2, -1),
      new THREE.Vector3(10, 4, 0),
    ],
    // Secondary cable
    [
      new THREE.Vector3(-10, 0, 1),
      new THREE.Vector3(-3, -1, 0),
      new THREE.Vector3(2, 1, 1),
      new THREE.Vector3(7, -1, 0),
      new THREE.Vector3(10, 0, 1),
    ],
    // Third cable
    [
      new THREE.Vector3(-10, -4, -1),
      new THREE.Vector3(-4, -3, 1),
      new THREE.Vector3(1, -5, 0),
      new THREE.Vector3(6, -3, -1),
      new THREE.Vector3(10, -4, 0),
    ],
  ], [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? scrollY / maxScroll : 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <ScrollCamera scrollProgress={scrollProgress} />
        <GradientPlane />

        {/* Multiple fiber cables with different colors and speeds */}
        {fiberPaths.map((points, index) => (
          <FiberCable
            key={index}
            points={points}
            color={['#06b6d4', '#3b82f6', '#8b5cf6'][index]}
            pulseSpeed={1 + index * 0.3}
            thickness={0.015 + index * 0.005}
          />
        ))}

        <Particles count={150} color="#06b6d4" />
      </Canvas>
    </div>
  )
}
