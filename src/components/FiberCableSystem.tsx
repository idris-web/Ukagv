'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// THE 6 SERVICES — Each cable is a promise
// ═══════════════════════════════════════════════════════════════════════════════

interface ServiceCable {
  id: string
  name: string
  color: string
  side: 'left' | 'right'
  index: number // 0 = outermost, 2 = innermost
}

const SERVICE_CABLES: ServiceCable[] = [
  // Left side — outer to inner
  { id: 'privat', name: 'Privatanschlüsse', color: '#22d3ee', side: 'left', index: 0 },
  { id: 'gewerbe', name: 'Gewerbe & Industrie', color: '#3b82f6', side: 'left', index: 1 },
  { id: 'tiefbau', name: 'Tiefbauarbeiten', color: '#10b981', side: 'left', index: 2 },
  // Right side — inner to outer (mirrored)
  { id: 'netzwerk', name: 'Netzwerkinstallation', color: '#a855f7', side: 'right', index: 2 },
  { id: 'spleissen', name: 'Spleißarbeiten', color: '#ec4899', side: 'right', index: 1 },
  { id: 'hausmeister', name: 'Hausmeisterdienste', color: '#14b8a6', side: 'right', index: 0 },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MATH UTILITIES — The poetry of movement
// ═══════════════════════════════════════════════════════════════════════════════

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

// Easing: slow start, fast middle, slow end — like a breath
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// Easing: gentle deceleration — like arriving home
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

// Seeded random for consistent chaos
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// ═══════════════════════════════════════════════════════════════════════════════
// THE CANVAS — Responsive dimensions
// ═══════════════════════════════════════════════════════════════════════════════

const CANVAS = {
  width: 1920,
  height: 6000,
  // Where cables converge — center bottom of CTA section
  convergence: { x: 960, y: 5400 },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SINGLE FIBER CABLE — A promise visualized
// ═══════════════════════════════════════════════════════════════════════════════

interface FiberCableProps {
  cable: ServiceCable
  progress: number
}

function FiberCable({ cable, progress }: FiberCableProps) {
  // ─────────────────────────────────────────────────────────────────────────────
  // THE THREE ACTS
  // ─────────────────────────────────────────────────────────────────────────────

  // Act 1: Entry (0% - 20%) — Chaos to order
  const entryProgress = clamp(progress / 0.2, 0, 1)
  const entryEased = easeOutQuart(entryProgress)

  // Act 2: Journey (20% - 65%) — Flowing alongside content
  const journeyProgress = clamp((progress - 0.2) / 0.45, 0, 1)

  // Act 3: Convergence (65% - 100%) — All paths lead to one
  const convergeProgress = clamp((progress - 0.65) / 0.35, 0, 1)
  const convergeEased = easeInOutCubic(convergeProgress)

  // ─────────────────────────────────────────────────────────────────────────────
  // POSITION CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const isLeft = cable.side === 'left'
  const seed = cable.id.charCodeAt(0) * 137

  // Sorted X position (where the cable "belongs" during journey)
  // Left: 4%, 7%, 10% from edge | Right: mirrored
  const sortedXPercent = isLeft
    ? 4 + cable.index * 3
    : 96 - cable.index * 3
  const sortedX = (sortedXPercent / 100) * CANVAS.width

  // Chaotic entry position (off-screen, spread out)
  const chaosOffsetX = seededRandom(seed) * 300 - 150
  const chaosOffsetY = seededRandom(seed + 1) * 200
  const chaosX = isLeft
    ? -100 + chaosOffsetX
    : CANVAS.width + 100 + chaosOffsetX
  const chaosY = -150 - chaosOffsetY

  // ─────────────────────────────────────────────────────────────────────────────
  // PATH CONSTRUCTION — The cable's journey through the page
  // ─────────────────────────────────────────────────────────────────────────────

  // Start point (transitions from chaos to sorted)
  const startX = lerp(chaosX, sortedX, entryEased)
  const startY = lerp(chaosY, -50, entryEased)

  // First control point (guides the entry curve)
  const cp1X = lerp(
    isLeft ? chaosX + 200 : chaosX - 200,
    sortedX,
    entryEased
  )
  const cp1Y = lerp(chaosY + 400, 400, entryEased)

  // Journey midpoint (cable flows down the page)
  const midY = 2800
  const midX = sortedX

  // Second control point (maintains vertical flow)
  const cp2X = sortedX
  const cp2Y = 1800

  // Third control point (begins the convergence bend)
  const cp3X = lerp(sortedX, (sortedX + CANVAS.convergence.x) / 2, convergeEased * 0.6)
  const cp3Y = lerp(3800, 4600, convergeEased * 0.5)

  // Fourth control point (tightens toward convergence)
  const cp4X = lerp(sortedX, CANVAS.convergence.x, convergeEased * 0.85)
  const cp4Y = lerp(4800, CANVAS.convergence.y - 300, convergeEased)

  // End point (converges to the CTA)
  const endX = lerp(sortedX, CANVAS.convergence.x, convergeEased * 0.98)
  const endY = lerp(5200, CANVAS.convergence.y, convergeEased)

  // The complete path — a cubic Bezier journey
  const path = `
    M ${startX} ${startY}
    C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${midX} ${midY}
    C ${cp3X} ${cp3Y}, ${cp4X} ${cp4Y}, ${endX} ${endY}
  `

  // ─────────────────────────────────────────────────────────────────────────────
  // VISUAL PROPERTIES
  // ─────────────────────────────────────────────────────────────────────────────

  const thickness = 2 + (2 - cable.index) * 0.3 // Outer cables slightly thicker
  const glowIntensity = 0.15 + convergeEased * 0.15 // Glow increases during convergence
  const cableOpacity = 0.5 + convergeEased * 0.3 // More vivid as they converge

  // Light pulse speed — varies by service (creates rhythm)
  const pulseDuration = 5 + cable.index * 1.5
  const pulseDelay = cable.index * 0.3

  return (
    <g>
      {/* Outer glow — the aura */}
      <motion.path
        d={path}
        stroke={cable.color}
        strokeWidth={thickness + 6}
        fill="none"
        opacity={glowIntensity}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          delay: cable.index * 0.15,
          ease: "easeOut"
        }}
      />

      {/* The cable itself */}
      <motion.path
        d={path}
        stroke={cable.color}
        strokeWidth={thickness}
        fill="none"
        opacity={cableOpacity}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.8,
          delay: cable.index * 0.15,
          ease: "easeOut"
        }}
      />

      {/* Light pulse — data traveling through the fiber */}
      <motion.circle
        r={thickness + 1.5}
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: pulseDelay + 2
        }}
      >
        <animateMotion
          dur={`${pulseDuration}s`}
          repeatCount="indefinite"
          path={path}
        />
      </motion.circle>

      {/* Secondary pulse — creates depth */}
      <motion.circle
        r={thickness * 2}
        fill={cable.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: pulseDelay + 2.5
        }}
      >
        <animateMotion
          dur={`${pulseDuration}s`}
          repeatCount="indefinite"
          path={path}
        />
      </motion.circle>
    </g>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONVERGENCE GLOW — The moment of connection
// ═══════════════════════════════════════════════════════════════════════════════

function ConvergenceGlow({ progress }: { progress: number }) {
  // Only visible during convergence phase
  const glowProgress = clamp((progress - 0.7) / 0.3, 0, 1)
  const eased = easeInOutCubic(glowProgress)

  if (glowProgress <= 0) return null

  const { x, y } = CANVAS.convergence
  const coreRadius = 8 + eased * 25
  const innerGlowRadius = 30 + eased * 50
  const outerGlowRadius = 60 + eased * 100
  const coreOpacity = 0.6 + eased * 0.4
  const glowOpacity = eased * 0.6

  return (
    <g>
      {/* Outer glow — the anticipation */}
      <motion.circle
        cx={x}
        cy={y}
        r={outerGlowRadius}
        fill="url(#convergenceGradient)"
        opacity={glowOpacity * 0.3}
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Inner glow — the warmth */}
      <circle
        cx={x}
        cy={y}
        r={innerGlowRadius}
        fill="url(#convergenceGradient)"
        opacity={glowOpacity * 0.5}
      />

      {/* Core — the connection point */}
      <motion.circle
        cx={x}
        cy={y}
        r={coreRadius}
        fill="white"
        opacity={coreOpacity}
        animate={{
          r: [coreRadius, coreRadius * 1.2, coreRadius],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Sparkle effect */}
      {eased > 0.5 && (
        <motion.circle
          cx={x}
          cy={y}
          r={coreRadius * 0.3}
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </g>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// THE SYSTEM — All cables united
// ═══════════════════════════════════════════════════════════════════════════════

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  // Smooth spring for organic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
  })

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', setProgress)
    return unsubscribe
  }, [smoothProgress])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      <svg
        className="absolute w-full"
        style={{ height: '600vh', top: 0 }}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          {/* Glow filter for cables */}
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Convergence gradient — all colors merging */}
          <radialGradient id="convergenceGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g filter="url(#cableGlow)">
          {SERVICE_CABLES.map((cable) => (
            <FiberCable key={cable.id} cable={cable} progress={progress} />
          ))}
          <ConvergenceGlow progress={progress} />
        </g>
      </svg>
    </div>
  )
}
