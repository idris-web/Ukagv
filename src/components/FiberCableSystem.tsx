'use client'

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Fiber optic colors
const CABLE_COLORS = [
  '#22d3ee', // cyan
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#a855f7', // purple
]

interface CableDefinition {
  start: number[]   // Hero: wavy, around text
  end: number[]     // Bottom: straight, converging to CTA
}

// 5 cables that:
// - Start: Flow around hero text (top/bottom of viewport, not through center)
// - End: Converge to center bottom where CTA button is
// Each cable: M + 5 cubic beziers = 32 coordinates
const CABLES: CableDefinition[] = [
  // Cable 1 - Top area, flows above hero text
  {
    start: [
      -100, 80,
      200, 100, 350, 60, 500, 90,
      650, 120, 800, 70, 950, 100,
      1100, 80, 1250, 110, 1400, 85,
      1550, 95, 1700, 75, 1850, 90,
    ],
    end: [
      -100, 80,
      100, 150, 300, 300, 500, 500,
      650, 650, 750, 780, 850, 880,
      900, 930, 940, 970, 960, 1000,
      970, 1020, 975, 1030, 980, 1040,
    ]
  },
  // Cable 2 - Upper area
  {
    start: [
      -100, 160,
      180, 140, 320, 180, 480, 150,
      640, 190, 780, 140, 940, 170,
      1100, 150, 1260, 185, 1420, 155,
      1580, 175, 1740, 145, 1900, 165,
    ],
    end: [
      -100, 160,
      80, 250, 280, 400, 480, 580,
      640, 720, 760, 830, 860, 910,
      920, 960, 955, 990, 975, 1015,
      985, 1030, 990, 1038, 993, 1045,
    ]
  },
  // Cable 3 - Lower area (below hero text)
  {
    start: [
      -100, 750,
      200, 780, 360, 720, 520, 760,
      680, 800, 840, 730, 1000, 770,
      1160, 750, 1320, 790, 1480, 755,
      1640, 775, 1800, 740, 1960, 760,
    ],
    end: [
      -100, 750,
      100, 780, 320, 820, 540, 880,
      700, 920, 820, 960, 900, 990,
      950, 1010, 980, 1030, 1000, 1045,
      1010, 1052, 1015, 1055, 1018, 1058,
    ]
  },
  // Cable 4 - Bottom area
  {
    start: [
      -100, 850,
      220, 880, 400, 820, 580, 860,
      760, 900, 920, 830, 1100, 870,
      1280, 850, 1440, 890, 1620, 855,
      1780, 875, 1940, 840, 2100, 860,
    ],
    end: [
      -100, 850,
      120, 870, 360, 900, 580, 940,
      750, 970, 880, 1000, 960, 1025,
      1010, 1042, 1030, 1052, 1040, 1058,
      1045, 1062, 1048, 1065, 1050, 1067,
    ]
  },
  // Cable 5 - Very bottom
  {
    start: [
      -100, 920,
      200, 950, 380, 900, 560, 940,
      740, 970, 900, 910, 1080, 945,
      1260, 930, 1420, 960, 1600, 935,
      1760, 950, 1920, 920, 2080, 940,
    ],
    end: [
      -100, 920,
      100, 940, 340, 960, 560, 990,
      740, 1010, 880, 1030, 980, 1048,
      1030, 1058, 1055, 1065, 1070, 1070,
      1078, 1073, 1082, 1075, 1085, 1076,
    ]
  },
]

// Smooth interpolation with easing
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
        opacity={0.1}
        filter="url(#outerGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
      />
      {/* Main cable */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{
          pathLength: { duration: 1.5, ease: "easeOut", delay: index * 0.2 },
          opacity: { duration: 0.4, delay: index * 0.15 }
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
      r={3}
      fill="white"
      style={{
        offsetPath: `path('${path}')`,
        filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 8px ${color})`
      }}
      animate={{ offsetDistance: ['0%', '100%'] }}
      transition={{
        duration: 2.5 + index * 0.2,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.6,
        repeatDelay: 1.5,
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
    damping: 20,
    restDelta: 0.001
  })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // CTA visibility based on scroll
  const ctaVisible = scrollProgress > 0.75
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.15))
  const ctaScale = 0.9 + Math.min(0.1, (scrollProgress - 0.75) * 0.5)

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <filter id="ctaGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
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

        {/* Connection point where all cables meet */}
        {ctaVisible && (
          <g style={{ opacity: ctaOpacity }}>
            {/* Glowing rings */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx="1000"
                cy="1060"
                r={8 + i * 6}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={1.5 - i * 0.3}
                filter="url(#ctaGlow)"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  r: [8 + i * 6, 12 + i * 6, 8 + i * 6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
            {/* Center point */}
            <motion.circle
              cx="1000"
              cy="1060"
              r={5}
              fill="#06b6d4"
              filter="url(#ctaGlow)"
              animate={{ r: [4, 6, 4], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="1000" cy="1060" r={2} fill="white" />
          </g>
        )}
      </svg>

      {/* CTA Button */}
      {ctaVisible && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
          style={{
            bottom: '4%',
            opacity: ctaOpacity,
            transform: `translateX(-50%) scale(${ctaScale})`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: ctaOpacity, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.a
            href="#contact"
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 50px rgba(6, 182, 212, 0.6), 0 0 80px rgba(6, 182, 212, 0.3)',
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
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0.9 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Alle Leitungen verbunden
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}
