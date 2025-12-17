'use client'

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Fiber optic colors
const CABLE_COLORS = [
  '#22d3ee', // cyan
  '#3b82f6', // blue
  '#f59e0b', // amber/orange
  '#a855f7', // purple
  '#10b981', // emerald
  '#ec4899', // pink
]

interface CableDefinition {
  start: number[]  // Chaotic/wavy state
  end: number[]    // Organized/straight, converging to CTA
}

// ViewBox: 1920 x 1080
// Content area (to avoid): roughly x: 400-1520, y: 150-750
// CTA convergence point: x: 960, y: 1000

const CABLES: CableDefinition[] = [
  // === LEFT SIDE CABLES (come from top-left, flow down left side) ===

  // Cable 1 - Leftmost
  {
    start: [
      -50, -100,  // Start above viewport
      50, 100, -30, 250, 80, 350,
      150, 500, 30, 600, 100, 720,
      180, 850, 50, 920, 200, 950,
      400, 980, 700, 1000, 960, 1020,
    ],
    end: [
      -50, -100,
      30, 50, 60, 200, 80, 350,
      100, 500, 110, 650, 130, 780,
      200, 880, 400, 950, 600, 990,
      750, 1010, 880, 1020, 960, 1030,
    ]
  },
  // Cable 2 - Left side inner
  {
    start: [
      100, -80,
      180, 80, 50, 200, 150, 320,
      250, 480, 100, 580, 200, 700,
      300, 840, 150, 900, 350, 960,
      550, 990, 780, 1010, 960, 1025,
    ],
    end: [
      100, -80,
      120, 80, 140, 220, 160, 360,
      180, 500, 200, 640, 230, 770,
      300, 880, 500, 960, 700, 1000,
      820, 1015, 900, 1025, 960, 1032,
    ]
  },
  // Cable 3 - Left side, starts more center-top
  {
    start: [
      300, -60,
      250, 50, 150, 150, 200, 280,
      120, 420, 220, 550, 150, 680,
      250, 800, 180, 880, 380, 940,
      580, 980, 800, 1005, 960, 1028,
    ],
    end: [
      300, -60,
      280, 100, 250, 250, 230, 400,
      220, 550, 240, 690, 280, 810,
      400, 900, 600, 970, 780, 1010,
      870, 1022, 930, 1030, 960, 1035,
    ]
  },

  // === RIGHT SIDE CABLES (come from top-right, flow down right side) ===

  // Cable 4 - Rightmost
  {
    start: [
      1970, -100,
      1870, 100, 1950, 250, 1840, 350,
      1770, 500, 1890, 600, 1820, 720,
      1740, 850, 1870, 920, 1720, 950,
      1520, 980, 1220, 1000, 960, 1020,
    ],
    end: [
      1970, -100,
      1890, 50, 1860, 200, 1840, 350,
      1820, 500, 1810, 650, 1790, 780,
      1720, 880, 1520, 950, 1320, 990,
      1170, 1010, 1040, 1020, 960, 1030,
    ]
  },
  // Cable 5 - Right side inner
  {
    start: [
      1820, -80,
      1740, 80, 1870, 200, 1770, 320,
      1670, 480, 1820, 580, 1720, 700,
      1620, 840, 1770, 900, 1570, 960,
      1370, 990, 1140, 1010, 960, 1025,
    ],
    end: [
      1820, -80,
      1800, 80, 1780, 220, 1760, 360,
      1740, 500, 1720, 640, 1690, 770,
      1620, 880, 1420, 960, 1220, 1000,
      1100, 1015, 1020, 1025, 960, 1032,
    ]
  },
  // Cable 6 - Right side, starts more center-top
  {
    start: [
      1620, -60,
      1670, 50, 1770, 150, 1720, 280,
      1800, 420, 1700, 550, 1770, 680,
      1670, 800, 1740, 880, 1540, 940,
      1340, 980, 1120, 1005, 960, 1028,
    ],
    end: [
      1620, -60,
      1640, 100, 1670, 250, 1690, 400,
      1700, 550, 1680, 690, 1640, 810,
      1520, 900, 1320, 970, 1140, 1010,
      1050, 1022, 990, 1030, 960, 1035,
    ]
  },
]

// Smooth interpolation
function interpolatePoints(from: number[], to: number[], progress: number): number[] {
  const eased = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2
  return from.map((val, i) => val + (to[i] - val) * eased)
}

// Convert to SVG path
function pointsToPath(points: number[]): string {
  const [startX, startY, ...rest] = points
  let path = `M ${startX} ${startY}`
  for (let i = 0; i < rest.length; i += 6) {
    path += ` C ${rest[i]} ${rest[i+1]}, ${rest[i+2]} ${rest[i+3]}, ${rest[i+4]} ${rest[i+5]}`
  }
  return path
}

// Cable component
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
      {/* Outer glow */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={6}
        fill="none"
        opacity={0.15}
        filter="url(#glow)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: index * 0.2 }}
      />
      {/* Main cable */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{
          pathLength: { duration: 2, ease: "easeOut", delay: index * 0.2 },
          opacity: { duration: 0.5, delay: index * 0.15 }
        }}
      />
    </g>
  )
}

// Light pulse
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
      r={4}
      fill="white"
      style={{
        offsetPath: `path('${path}')`,
        filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color})`
      }}
      animate={{ offsetDistance: ['0%', '100%'] }}
      transition={{
        duration: 3 + index * 0.3,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.5,
        repeatDelay: 1,
      }}
    />
  )
}

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001
  })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // CTA visibility
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.15))
  const ctaScale = 0.9 + Math.min(0.1, (scrollProgress - 0.75) * 0.5)

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ctaGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
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

        {/* Convergence point at bottom */}
        <g style={{ opacity: ctaOpacity }}>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="960"
              cy="1030"
              r={10 + i * 8}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={2 - i * 0.4}
              filter="url(#ctaGlow)"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                r: [10 + i * 8, 15 + i * 8, 10 + i * 8],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
          <motion.circle
            cx="960"
            cy="1030"
            r={6}
            fill="#06b6d4"
            filter="url(#ctaGlow)"
            animate={{ r: [5, 8, 5], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="960" cy="1030" r={3} fill="white" />
        </g>
      </svg>

      {/* CTA Button */}
      {ctaOpacity > 0 && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
          style={{
            bottom: '4%',
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
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
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
            style={{ opacity: scrollProgress > 0.9 ? 1 : 0 }}
          >
            Alle Leitungen verbunden
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}
