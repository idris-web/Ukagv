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
  '#06b6d4', // teal
  '#ec4899', // pink
  '#60a5fa', // light blue
  '#34d399', // light green
  '#f472b6', // light pink
]

interface CableDefinition {
  chaotic: number[]  // Horizontal chaos in hero
  organized: number[] // Sides down, then horizontal to center
}

// 10 cables - horizontal in hero, then to sides, then horizontal connection at bottom
// Each cable: M (start) + 4 bezier curves = 26 coordinates
const CABLES: CableDefinition[] = [
  // LEFT SIDE CABLES (5 cables) - start from left, go across hero, then down left side, then horizontal to center

  // Cable 1 - Top left horizontal
  {
    chaotic: [
      -50, 120,
      150, 80, 300, 160, 450, 100,
      600, 40, 750, 180, 900, 120,
      1050, 60, 1150, 140, 1200, 100,
    ],
    organized: [
      -50, 120,
      -20, 200, 0, 350, 20, 500,
      40, 650, 50, 780, 80, 880,
      200, 950, 400, 980, 580, 1000,
    ]
  },
  // Cable 2 - Second from top left
  {
    chaotic: [
      -30, 200,
      180, 240, 280, 160, 480, 220,
      680, 280, 820, 180, 980, 240,
      1100, 200, 1180, 260, 1220, 220,
    ],
    organized: [
      -30, 200,
      -10, 300, 10, 420, 30, 560,
      50, 700, 70, 800, 120, 890,
      250, 955, 420, 985, 585, 1005,
    ]
  },
  // Cable 3 - Middle left
  {
    chaotic: [
      -40, 280,
      200, 320, 350, 240, 520, 300,
      700, 360, 850, 260, 1000, 320,
      1120, 280, 1200, 340, 1240, 300,
    ],
    organized: [
      -40, 280,
      0, 380, 30, 500, 50, 620,
      70, 740, 100, 840, 160, 910,
      300, 960, 450, 990, 590, 1010,
    ]
  },
  // Cable 4 - Lower left
  {
    chaotic: [
      -20, 360,
      220, 320, 380, 400, 560, 340,
      740, 400, 880, 320, 1040, 380,
      1140, 340, 1220, 400, 1260, 360,
    ],
    organized: [
      -20, 360,
      20, 450, 50, 560, 80, 680,
      110, 780, 150, 860, 220, 920,
      360, 965, 480, 992, 595, 1012,
    ]
  },
  // Cable 5 - Bottom left
  {
    chaotic: [
      -60, 440,
      180, 480, 340, 400, 520, 460,
      700, 520, 860, 420, 1020, 480,
      1160, 440, 1240, 500, 1280, 460,
    ],
    organized: [
      -60, 440,
      10, 520, 60, 620, 100, 730,
      140, 820, 190, 890, 280, 940,
      400, 972, 510, 998, 598, 1015,
    ]
  },

  // RIGHT SIDE CABLES (5 cables) - start from right, go across hero, then down right side, then horizontal to center

  // Cable 6 - Top right horizontal
  {
    chaotic: [
      1200, 140,
      1050, 100, 900, 180, 750, 120,
      600, 60, 450, 160, 300, 100,
      150, 140, 50, 80, -50, 120,
    ],
    organized: [
      1200, 140,
      1170, 240, 1150, 380, 1130, 520,
      1110, 660, 1090, 780, 1050, 880,
      920, 950, 750, 982, 620, 1002,
    ]
  },
  // Cable 7 - Second from top right
  {
    chaotic: [
      1220, 220,
      1080, 260, 920, 180, 760, 240,
      600, 300, 440, 200, 280, 260,
      140, 220, 40, 280, -40, 240,
    ],
    organized: [
      1220, 220,
      1180, 320, 1160, 450, 1140, 580,
      1120, 710, 1100, 810, 1040, 895,
      900, 958, 740, 988, 615, 1007,
    ]
  },
  // Cable 8 - Middle right
  {
    chaotic: [
      1240, 300,
      1100, 340, 940, 260, 780, 320,
      620, 380, 460, 280, 300, 340,
      160, 300, 60, 360, -40, 320,
    ],
    organized: [
      1240, 300,
      1190, 400, 1170, 520, 1150, 650,
      1130, 760, 1100, 850, 1020, 915,
      880, 962, 730, 992, 610, 1012,
    ]
  },
  // Cable 9 - Lower right
  {
    chaotic: [
      1260, 380,
      1120, 420, 960, 340, 800, 400,
      640, 460, 480, 360, 320, 420,
      180, 380, 80, 440, -30, 400,
    ],
    organized: [
      1260, 380,
      1200, 470, 1180, 590, 1160, 710,
      1140, 810, 1100, 880, 1000, 930,
      860, 968, 720, 995, 605, 1014,
    ]
  },
  // Cable 10 - Bottom right
  {
    chaotic: [
      1280, 460,
      1140, 500, 980, 420, 820, 480,
      660, 540, 500, 440, 340, 500,
      200, 460, 100, 520, -50, 480,
    ],
    organized: [
      1280, 460,
      1210, 540, 1190, 650, 1170, 760,
      1150, 850, 1100, 910, 980, 955,
      840, 978, 710, 1000, 602, 1016,
    ]
  },
]

// Interpolate between two arrays
function interpolatePoints(from: number[], to: number[], progress: number): number[] {
  return from.map((val, i) => val + (to[i] - val) * progress)
}

// Convert points to SVG path
function pointsToPath(points: number[]): string {
  const [startX, startY, ...rest] = points
  let path = `M ${startX} ${startY}`
  for (let i = 0; i < rest.length; i += 6) {
    path += ` C ${rest[i]} ${rest[i+1]}, ${rest[i+2]} ${rest[i+3]}, ${rest[i+4]} ${rest[i+5]}`
  }
  return path
}

// Single morphing cable
function MorphingCable({
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
    const interpolated = interpolatePoints(cable.chaotic, cable.organized, progress)
    return pointsToPath(interpolated)
  }, [cable, progress])

  return (
    <g>
      {/* Subtle glow */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={4}
        fill="none"
        opacity={0.12}
        filter="url(#softGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.08 }}
      />
      {/* Main cable */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        filter="url(#cableGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{
          pathLength: { duration: 1.5, ease: "easeOut", delay: index * 0.08 },
          opacity: { duration: 0.4, delay: index * 0.06 }
        }}
      />
    </g>
  )
}

// Light pulse along cable
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
    const interpolated = interpolatePoints(cable.chaotic, cable.organized, progress)
    return pointsToPath(interpolated)
  }, [cable, progress])

  if (progress < 0.1) return null

  return (
    <motion.circle
      r={3}
      fill={color}
      filter="url(#pulseGlow)"
      style={{ offsetPath: `path('${path}')` }}
      animate={{ offsetDistance: ['0%', '100%'] }}
      transition={{
        duration: 2 + index * 0.15,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.3 + 0.5,
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
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const convergenceOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.2))
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.15))
  const ctaY = Math.max(0, 30 - (scrollProgress - 0.75) * 150)
  const ctaScale = 0.9 + Math.min(0.1, (scrollProgress - 0.75) * 0.5)

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 1020"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="cableGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="centerGlow" x="-200%" y="-200%" width="500%" height="500%">
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
          <MorphingCable
            key={`cable-${index}`}
            cable={cable}
            color={CABLE_COLORS[index]}
            index={index}
            progress={scrollProgress}
          />
        ))}

        {/* Light pulses */}
        {CABLES.slice(0, 6).map((cable, index) => (
          <LightPulse
            key={`pulse-${index}`}
            cable={cable}
            color={CABLE_COLORS[index]}
            index={index}
            progress={scrollProgress}
          />
        ))}

        {/* Horizontal connection point at bottom */}
        <g style={{ opacity: convergenceOpacity }}>
          {/* Horizontal line connecting all cables */}
          <motion.line
            x1="400"
            y1="1005"
            x2="800"
            y2="1005"
            stroke="#06b6d4"
            strokeWidth={2}
            filter="url(#centerGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Center connection glow */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="600"
              cy="1005"
              r={10 + i * 8}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={1.5 - i * 0.3}
              filter="url(#centerGlow)"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                r: [10 + i * 8, 14 + i * 8, 10 + i * 8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
          <motion.circle
            cx="600"
            cy="1005"
            r={6}
            fill="#06b6d4"
            filter="url(#centerGlow)"
            animate={{ opacity: [0.8, 1, 0.8], r: [5, 8, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="600" cy="1005" r={3} fill="white" filter="url(#cableGlow)" />
        </g>
      </svg>

      {/* CTA Button */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{
          bottom: '5%',
          opacity: ctaOpacity,
          transform: `translateX(-50%) translateY(${ctaY}px) scale(${ctaScale})`,
        }}
      >
        <motion.a
          href="#contact"
          className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.5), 0 0 80px rgba(6, 182, 212, 0.2)',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 60px rgba(6, 182, 212, 0.7), 0 0 100px rgba(6, 182, 212, 0.3)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
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
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.a>
        <motion.p
          className="text-center text-dark-400 text-sm mt-3"
          style={{ opacity: Math.max(0, (scrollProgress - 0.88) / 0.1) }}
        >
          Alle Leitungen verbunden – jetzt sind Sie dran!
        </motion.p>
      </motion.div>
    </div>
  )
}
