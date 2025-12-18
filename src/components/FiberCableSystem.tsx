'use client'

import { useScroll, useSpring } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// CABLES CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

interface ServiceCable {
  id: string
  color: string
  side: 'left' | 'right'
  index: number
}

const SERVICE_CABLES: ServiceCable[] = [
  { id: 'privat', color: '#22d3ee', side: 'left', index: 0 },
  { id: 'gewerbe', color: '#3b82f6', side: 'left', index: 1 },
  { id: 'tiefbau', color: '#10b981', side: 'left', index: 2 },
  { id: 'beratung', color: '#f59e0b', side: 'left', index: 3 },
  { id: 'wartung', color: '#ef4444', side: 'right', index: 3 },
  { id: 'netzwerk', color: '#a855f7', side: 'right', index: 2 },
  { id: 'spleissen', color: '#ec4899', side: 'right', index: 1 },
  { id: 'hausmeister', color: '#14b8a6', side: 'right', index: 0 },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MATH UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS
// ═══════════════════════════════════════════════════════════════════════════════

const CANVAS = {
  width: 1920,
  height: 6000,
  convergence: { x: 960, y: 5400 },
}

// ═══════════════════════════════════════════════════════════════════════════════
// FIBER CABLE WITH MULTIPLE STRANDS - Optimized
// ═══════════════════════════════════════════════════════════════════════════════

const STRAND_COUNT = 3
const STRAND_SPACING = 10
const STRAND_THICKNESS = 2.5

const FiberCable = memo(function FiberCable({
  cable,
  progress
}: {
  cable: ServiceCable
  progress: number
}) {
  const entryProgress = clamp(progress / 0.15, 0, 1)
  const entryEased = easeOutQuart(entryProgress)
  const convergeProgress = clamp((progress - 0.85) / 0.15, 0, 1)
  const convergeEased = easeInOutCubic(convergeProgress)

  const isLeft = cable.side === 'left'
  const seed = cable.id.charCodeAt(0) * 137

  const sortedXPercent = isLeft ? 4 + cable.index * 3 : 96 - cable.index * 3
  const sortedX = (sortedXPercent / 100) * CANVAS.width

  const chaosOffsetX = seededRandom(seed) * 300 - 150
  const chaosOffsetY = seededRandom(seed + 1) * 200
  const chaosX = isLeft ? -100 + chaosOffsetX : CANVAS.width + 100 + chaosOffsetX
  const chaosY = -150 - chaosOffsetY

  // Base path calculation
  const startX = lerp(chaosX, sortedX, entryEased)
  const startY = lerp(chaosY, -50, entryEased)
  const cp1X = lerp(isLeft ? chaosX + 200 : chaosX - 200, sortedX, entryEased)
  const cp1Y = lerp(chaosY + 400, 400, entryEased)
  const midX = sortedX
  const midY = 2800
  const cp2X = sortedX
  const cp2Y = 1800
  const cp3X = lerp(sortedX, (sortedX + CANVAS.convergence.x) / 2, convergeEased * 0.6)
  const cp3Y = lerp(3800, 4600, convergeEased * 0.5)
  const cp4X = lerp(sortedX, CANVAS.convergence.x, convergeEased * 0.85)
  const cp4Y = lerp(4800, CANVAS.convergence.y - 300, convergeEased)
  const endX = lerp(sortedX, CANVAS.convergence.x, convergeEased * 0.98)
  const endY = lerp(5200, CANVAS.convergence.y, convergeEased)

  const opacity = 0.7 + convergeEased * 0.3
  const glowOpacity = 0.2 + convergeEased * 0.15

  // Generate strands with offsets
  const strands = []
  for (let i = 0; i < STRAND_COUNT; i++) {
    const offset = (i - (STRAND_COUNT - 1) / 2) * STRAND_SPACING
    const strandSeed = seed + i * 100
    const wobble = seededRandom(strandSeed) * 6 - 3

    const path = `M ${startX + offset + wobble} ${startY} C ${cp1X + offset} ${cp1Y}, ${cp2X + offset} ${cp2Y}, ${midX + offset} ${midY} C ${cp3X + offset * (1 - convergeEased)} ${cp3Y}, ${cp4X + offset * (1 - convergeEased * 0.8)} ${cp4Y}, ${endX} ${endY}`

    strands.push({ path, offset, i })
  }

  return (
    <g>
      {/* Bundle glow - thick outer glow */}
      <path
        d={strands[Math.floor(STRAND_COUNT / 2)].path}
        stroke={cable.color}
        strokeWidth={STRAND_THICKNESS + 18}
        fill="none"
        opacity={glowOpacity * 0.4}
        strokeLinecap="round"
      />

      {/* Individual strand glows and cores */}
      {strands.map(({ path, i }) => (
        <g key={i}>
          {/* Strand glow */}
          <path
            d={path}
            stroke={cable.color}
            strokeWidth={STRAND_THICKNESS + 6}
            fill="none"
            opacity={glowOpacity * 0.6}
            strokeLinecap="round"
          />
          {/* Strand core */}
          <path
            d={path}
            stroke={cable.color}
            strokeWidth={STRAND_THICKNESS}
            fill="none"
            opacity={opacity}
            strokeLinecap="round"
          />
          {/* Light pulse per strand - CSS animation */}
          <circle r={4} fill="white" opacity={0.9}>
            <animateMotion
              dur={`${4 + cable.index * 0.3 + i * 0.7}s`}
              repeatCount="indefinite"
              path={path}
            />
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="1.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="3;5;3"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </g>
  )
})

// ═══════════════════════════════════════════════════════════════════════════════
// CONVERGENCE GLOW - Simplified
// ═══════════════════════════════════════════════════════════════════════════════

const ConvergenceGlow = memo(function ConvergenceGlow({ progress }: { progress: number }) {
  const glowProgress = clamp((progress - 0.88) / 0.12, 0, 1)
  if (glowProgress <= 0) return null

  const eased = easeInOutCubic(glowProgress)
  const { x, y } = CANVAS.convergence

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={40 + eased * 60}
        fill="url(#convergenceGradient)"
        opacity={eased * 0.4}
      />
      <circle
        cx={x}
        cy={y}
        r={10 + eased * 20}
        fill="white"
        opacity={0.6 + eased * 0.4}
      />
    </g>
  )
})

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND NETWORK - Reduced and optimized
// ═══════════════════════════════════════════════════════════════════════════════

// Pre-generate static network (fewer nodes)
const NETWORK_DATA = (() => {
  const nodes: { x: number; y: number; color: string }[] = []
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
  const colors = ['#22d3ee', '#3b82f6', '#a855f7', '#10b981']

  // Only 24 nodes instead of 96
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const id = row * 6 + col
      const x = (col + 0.5) * (CANVAS.width / 6) + (seededRandom(id * 17) - 0.5) * 100
      const y = (row + 0.5) * (1000 / 4) + (seededRandom(id * 31) - 0.5) * 60
      nodes.push({ x, y, color: colors[id % colors.length] })
    }
  }

  // Create fewer connections
  nodes.forEach((node, i) => {
    nodes.forEach((other, j) => {
      if (i < j) {
        const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2)
        if (dist < 350 && seededRandom(i * j) > 0.6) {
          lines.push({ x1: node.x, y1: node.y, x2: other.x, y2: other.y })
        }
      }
    })
  })

  return { nodes, lines }
})()

const BackgroundNetwork = memo(function BackgroundNetwork({ progress }: { progress: number }) {
  const opacity = Math.max(0, 1 - progress * 4)
  if (opacity <= 0) return null

  return (
    <g opacity={opacity * 0.2} style={{ willChange: 'opacity' }}>
      {/* Static lines */}
      {NETWORK_DATA.lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="url(#networkGradient)"
          strokeWidth={0.5}
          opacity={0.6}
        />
      ))}
      {/* Static nodes */}
      {NETWORK_DATA.nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={3}
          fill={node.color}
          opacity={0.5}
        />
      ))}
    </g>
  )
})

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  // Smoother spring with less reactivity
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
  })

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      // Throttle updates - only update if difference is significant
      setProgress((prev) => {
        if (Math.abs(v - prev) > 0.002) return v
        return prev
      })
    })
    return unsubscribe
  }, [smoothProgress])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5, willChange: 'auto' }}
    >
      <svg
        className="absolute w-full"
        style={{ height: '600vh', top: 0 }}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <radialGradient id="convergenceGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <BackgroundNetwork progress={progress} />

        <g>
          {SERVICE_CABLES.map((cable) => (
            <FiberCable key={cable.id} cable={cable} progress={progress} />
          ))}
          <ConvergenceGlow progress={progress} />
        </g>
      </svg>
    </div>
  )
}
