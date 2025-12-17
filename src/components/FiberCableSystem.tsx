'use client'

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Fiber optic colors - matching pairs for left/right
const CABLE_COLORS = [
  '#22d3ee', // cyan
  '#3b82f6', // blue
  '#a855f7', // purple
  '#f59e0b', // amber
  '#10b981', // emerald
  '#ec4899', // pink
]

interface CableDefinition {
  start: number[]  // Chaotic: slight offset, small waves
  end: number[]    // Organized: straight, parallel, clean
}

// ViewBox: 1920 x 1080
// Design: Cables come from top in BUNDLES, flow down PARALLEL on sides,
// have GENTLE curves, converge SMOOTHLY at CTA (x:960, y:1000)

const CABLES: CableDefinition[] = [
  // === LEFT BUNDLE (3 cables, start close together, flow parallel) ===

  // Left Cable 1 - Outermost
  {
    // Chaotic: slight sway, small offset
    start: [
      80, -50,
      70, 150, 90, 300, 60, 450,
      80, 600, 50, 750, 100, 850,
      250, 920, 500, 970, 960, 1000,
    ],
    // Organized: straight down, then gentle curve to center
    end: [
      80, -50,
      80, 150, 80, 300, 80, 450,
      80, 600, 80, 750, 150, 870,
      350, 940, 650, 985, 960, 1010,
    ]
  },
  // Left Cable 2 - Middle
  {
    start: [
      140, -50,
      150, 150, 130, 300, 160, 450,
      140, 600, 170, 750, 190, 850,
      340, 920, 580, 970, 960, 1005,
    ],
    end: [
      140, -50,
      140, 150, 140, 300, 140, 450,
      140, 600, 145, 750, 200, 870,
      400, 940, 680, 985, 960, 1012,
    ]
  },
  // Left Cable 3 - Innermost
  {
    start: [
      200, -50,
      220, 150, 190, 300, 230, 450,
      200, 600, 240, 750, 270, 850,
      420, 920, 650, 970, 960, 1008,
    ],
    end: [
      200, -50,
      200, 150, 200, 300, 200, 450,
      200, 600, 210, 750, 260, 870,
      450, 940, 710, 985, 960, 1015,
    ]
  },

  // === RIGHT BUNDLE (3 cables, mirror of left) ===

  // Right Cable 1 - Outermost
  {
    start: [
      1840, -50,
      1850, 150, 1830, 300, 1860, 450,
      1840, 600, 1870, 750, 1820, 850,
      1670, 920, 1420, 970, 960, 1000,
    ],
    end: [
      1840, -50,
      1840, 150, 1840, 300, 1840, 450,
      1840, 600, 1840, 750, 1770, 870,
      1570, 940, 1270, 985, 960, 1010,
    ]
  },
  // Right Cable 2 - Middle
  {
    start: [
      1780, -50,
      1770, 150, 1790, 300, 1760, 450,
      1780, 600, 1750, 750, 1730, 850,
      1580, 920, 1340, 970, 960, 1005,
    ],
    end: [
      1780, -50,
      1780, 150, 1780, 300, 1780, 450,
      1780, 600, 1775, 750, 1720, 870,
      1520, 940, 1240, 985, 960, 1012,
    ]
  },
  // Right Cable 3 - Innermost
  {
    start: [
      1720, -50,
      1700, 150, 1730, 300, 1690, 450,
      1720, 600, 1680, 750, 1650, 850,
      1500, 920, 1270, 970, 960, 1008,
    ],
    end: [
      1720, -50,
      1720, 150, 1720, 300, 1720, 450,
      1720, 600, 1710, 750, 1660, 870,
      1470, 940, 1210, 985, 960, 1015,
    ]
  },
]

// Smooth eased interpolation
function interpolatePoints(from: number[], to: number[], progress: number): number[] {
  // Smooth ease-in-out
  const eased = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2
  return from.map((val, i) => val + (to[i] - val) * eased)
}

// Convert to SVG path with smooth curves
function pointsToPath(points: number[]): string {
  const [startX, startY, ...rest] = points
  let path = `M ${startX} ${startY}`
  for (let i = 0; i < rest.length; i += 6) {
    path += ` C ${rest[i]} ${rest[i+1]}, ${rest[i+2]} ${rest[i+3]}, ${rest[i+4]} ${rest[i+5]}`
  }
  return path
}

// Cable component with natural glow
function Cable({
  cable,
  color,
  index,
  progress
}: {
  cable: CableDefinition
  color: string
  index: number
  progress: number
}) {
  const path = useMemo(() => {
    const interpolated = interpolatePoints(cable.start, cable.end, progress)
    return pointsToPath(interpolated)
  }, [cable, progress])

  return (
    <g>
      {/* Soft outer glow */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={8}
        fill="none"
        opacity={0.1}
        filter="url(#softGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: index * 0.15 }}
      />
      {/* Inner glow */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={4}
        fill="none"
        opacity={0.25}
        filter="url(#innerGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: index * 0.15 }}
      />
      {/* Core cable */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 2.5, ease: "easeInOut", delay: index * 0.15 },
          opacity: { duration: 0.8, delay: index * 0.1 }
        }}
      />
    </g>
  )
}

// Light pulse traveling along cable
function LightPulse({
  cable,
  color,
  index,
  progress
}: {
  cable: CableDefinition
  color: string
  index: number
  progress: number
}) {
  const path = useMemo(() => {
    const interpolated = interpolatePoints(cable.start, cable.end, progress)
    return pointsToPath(interpolated)
  }, [cable, progress])

  return (
    <motion.circle
      r={3}
      fill="white"
      style={{
        offsetPath: `path('${path}')`,
        filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 8px ${color}) drop-shadow(0 0 12px ${color})`
      }}
      animate={{ offsetDistance: ['0%', '100%'] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.8,
        repeatDelay: 2,
      }}
    />
  )
}

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // CTA visibility
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.78) / 0.12))
  const ctaScale = 0.92 + Math.min(0.08, (scrollProgress - 0.78) * 0.4)

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <filter id="innerGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <filter id="ctaGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* All cables */}
        {CABLES.map((cable, index) => (
          <Cable
            key={`cable-${index}`}
            cable={cable}
            color={CABLE_COLORS[index]}
            index={index}
            progress={scrollProgress}
          />
        ))}

        {/* Light pulses */}
        {CABLES.map((cable, index) => (
          <LightPulse
            key={`pulse-${index}`}
            cable={cable}
            color={CABLE_COLORS[index]}
            index={index}
            progress={scrollProgress}
          />
        ))}

        {/* Convergence point */}
        <g style={{ opacity: ctaOpacity }}>
          {/* Glowing rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="960"
              cy="1010"
              r={12 + i * 10}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={2 - i * 0.5}
              filter="url(#ctaGlow)"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                r: [12 + i * 10, 16 + i * 10, 12 + i * 10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
          {/* Bright center */}
          <motion.circle
            cx="960"
            cy="1010"
            r={8}
            fill="#06b6d4"
            filter="url(#ctaGlow)"
            animate={{ r: [6, 10, 6], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="960" cy="1010" r={4} fill="white" />
        </g>
      </svg>

      {/* CTA Button */}
      {ctaOpacity > 0 && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
          style={{
            bottom: '3%',
            opacity: ctaOpacity,
            transform: `translateX(-50%) scale(${ctaScale})`,
          }}
        >
          <motion.a
            href="#contact"
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.5), 0 0 80px rgba(6, 182, 212, 0.25)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 60px rgba(6, 182, 212, 0.7), 0 0 100px rgba(6, 182, 212, 0.35)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
            <svg className="w-5 h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-white relative z-10">Kostenlose Beratung</span>
            <motion.svg
              className="w-4 h-4 text-white relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
          <motion.p
            className="text-center text-dark-400 text-sm mt-3"
            style={{ opacity: scrollProgress > 0.92 ? 1 : 0 }}
          >
            Alle Leitungen verbunden
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}
