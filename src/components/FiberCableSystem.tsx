'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function FiberCableSystem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)

  const { scrollYProgress } = useScroll()

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Transform values for different scroll stages
  // Stage 1 (0-0.3): Installation animation - wavy cables
  // Stage 2 (0.3-0.7): Straightening - cables become more structured
  // Stage 3 (0.7-1): Convergence - cables meet at center bottom

  // Cable wave intensity (high at top, zero at bottom)
  const waveIntensity = useTransform(smoothProgress, [0, 0.4, 0.7], [40, 15, 0])

  // Cable opacity
  const cableOpacity = useTransform(smoothProgress, [0, 0.1], [0.8, 0.6])

  // Convergence point Y position
  const convergenceY = useTransform(smoothProgress, [0.7, 1], [100, 95])

  // Cable spread at bottom (100 = full spread, 0 = all converge to center)
  const bottomSpread = useTransform(smoothProgress, [0.6, 0.95], [100, 5])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Fiber cable gradients */}
          <linearGradient id="cableCyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cableBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cableGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cableOrange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cableTeal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cablePurple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="cableGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Strong glow for pulses */}
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Connection point glow */}
          <radialGradient id="connectionGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cable paths - each cable goes from top edge to bottom convergence point */}
        {[
          { id: 1, startX: 5, gradient: 'cableCyan', delay: 0 },
          { id: 2, startX: 15, gradient: 'cableBlue', delay: 0.1 },
          { id: 3, startX: 25, gradient: 'cableGreen', delay: 0.2 },
          { id: 4, startX: 35, gradient: 'cableTeal', delay: 0.15 },
          { id: 5, startX: 45, gradient: 'cablePurple', delay: 0.25 },
          { id: 6, startX: 55, gradient: 'cablePurple', delay: 0.25 },
          { id: 7, startX: 65, gradient: 'cableTeal', delay: 0.15 },
          { id: 8, startX: 75, gradient: 'cableGreen', delay: 0.2 },
          { id: 9, startX: 85, gradient: 'cableBlue', delay: 0.1 },
          { id: 10, startX: 95, gradient: 'cableOrange', delay: 0 },
        ].map((cable) => (
          <FiberCable
            key={cable.id}
            startX={cable.startX}
            gradient={cable.gradient}
            delay={cable.delay}
            waveIntensity={waveIntensity}
            convergenceY={convergenceY}
            bottomSpread={bottomSpread}
            cableOpacity={cableOpacity}
          />
        ))}

        {/* Connection point at bottom */}
        <motion.g style={{ opacity: useTransform(smoothProgress, [0.7, 0.9], [0, 1]) }}>
          <motion.circle
            cx="50"
            style={{ cy: convergenceY }}
            r="3"
            fill="url(#connectionGlow)"
          />
          <motion.circle
            cx="50"
            style={{ cy: convergenceY }}
            r="1.5"
            fill="#22d3ee"
            filter="url(#pulseGlow)"
          >
            <animate
              attributeName="r"
              values="1;2;1"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        </motion.g>
      </svg>
    </div>
  )
}

// Individual fiber cable component
interface FiberCableProps {
  startX: number
  gradient: string
  delay: number
  waveIntensity: any
  convergenceY: any
  bottomSpread: any
  cableOpacity: any
}

function FiberCable({
  startX,
  gradient,
  delay,
  waveIntensity,
  convergenceY,
  bottomSpread,
  cableOpacity
}: FiberCableProps) {
  const { scrollYProgress } = useScroll()

  // Calculate end X position based on spread
  const centerX = 50
  const distanceFromCenter = startX - centerX
  const endX = useTransform(bottomSpread, (spread: number) => {
    return centerX + (distanceFromCenter * spread / 100)
  })

  // Path installation progress (cable "grows" from top to bottom)
  const installProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1])

  // Generate animated path
  const pathD = useTransform(
    [waveIntensity, convergenceY, endX, installProgress],
    ([wave, convY, eX, progress]: number[]) => {
      const waveAmount = wave as number
      const targetY = convY as number
      const targetX = eX as number
      const prog = Math.min(progress as number, 1)

      // Control points for bezier curve with wave effect
      const cp1X = startX + Math.sin(startX * 0.1) * waveAmount * 0.3
      const cp1Y = 25
      const cp2X = startX + Math.cos(startX * 0.15) * waveAmount * 0.2
      const cp2Y = 50
      const cp3X = targetX + Math.sin(startX * 0.2) * waveAmount * 0.15
      const cp3Y = 75

      // Interpolate path based on installation progress
      const currentY = -5 + (targetY + 5) * prog
      const currentEndX = startX + (targetX - startX) * prog

      if (prog < 0.33) {
        const subProg = prog / 0.33
        const midY = cp1Y * subProg
        const midX = startX + (cp1X - startX) * subProg
        return `M ${startX} -5 Q ${midX} ${midY / 2}, ${midX} ${midY}`
      } else if (prog < 0.66) {
        const subProg = (prog - 0.33) / 0.33
        const midY = cp1Y + (cp2Y - cp1Y) * subProg
        const midX = cp1X + (cp2X - cp1X) * subProg
        return `M ${startX} -5 Q ${cp1X} ${cp1Y / 2}, ${cp1X} ${cp1Y} Q ${midX} ${(cp1Y + midY) / 2}, ${midX} ${midY}`
      } else {
        const subProg = (prog - 0.66) / 0.34
        return `M ${startX} -5
                Q ${cp1X} ${cp1Y / 2}, ${cp1X} ${cp1Y}
                Q ${cp2X} ${(cp1Y + cp2Y) / 2}, ${cp2X} ${cp2Y}
                Q ${cp3X} ${(cp2Y + cp3Y) / 2}, ${cp3X} ${cp3Y}
                Q ${currentEndX} ${(cp3Y + targetY) / 2}, ${currentEndX} ${targetY}`
      }
    }
  )

  return (
    <g>
      {/* Main cable path */}
      <motion.path
        d={pathD}
        stroke={`url(#${gradient})`}
        strokeWidth="0.4"
        fill="none"
        filter="url(#cableGlowFilter)"
        style={{ opacity: cableOpacity }}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: delay, ease: "easeOut" }}
      />

      {/* Light pulse traveling along cable */}
      <motion.circle
        r="0.6"
        fill="#22d3ee"
        filter="url(#pulseGlow)"
        initial={{ offsetDistance: '0%', opacity: 0 }}
        animate={{
          offsetDistance: '100%',
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3 + delay * 2,
          repeat: Infinity,
          ease: "linear",
          delay: delay + 1,
          repeatDelay: 2
        }}
        style={{ offsetPath: `path('${getStaticPath(startX)}')` }}
      />
    </g>
  )
}

// Helper function to get a static path for the light pulse
function getStaticPath(startX: number): string {
  const centerX = 50
  return `M ${startX} 0 Q ${startX} 25, ${startX} 50 Q ${startX} 75, ${centerX} 95`
}
