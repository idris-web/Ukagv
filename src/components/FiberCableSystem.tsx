'use client'

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

// Fiber optic colors - vibrant but not too bright
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

// Cable definition with chaotic and organized control points
interface CableDefinition {
  chaotic: number[]
  organized: number[]
}

// 10 beautiful cables - thin, elegant, flowing
// Each cable: M (start) + 4 bezier curves = 2 + 24 = 26 coordinates
const CABLES: CableDefinition[] = [
  // Cable 1 - Left side, gentle wave
  {
    chaotic: [
      -20, 80,
      80, 120, 40, 200, 120, 280,
      200, 360, 100, 440, 180, 520,
      260, 600, 160, 700, 240, 780,
      320, 860, 280, 920, 400, 980,
    ],
    organized: [
      -20, 80,
      60, 150, 140, 250, 220, 350,
      300, 450, 360, 550, 420, 650,
      470, 750, 510, 830, 540, 900,
      560, 950, 570, 980, 580, 1000,
    ]
  },
  // Cable 2 - Left, slightly higher
  {
    chaotic: [
      -30, 150,
      100, 130, 60, 240, 160, 300,
      260, 360, 140, 450, 240, 520,
      340, 590, 220, 700, 320, 770,
      420, 840, 340, 920, 440, 980,
    ],
    organized: [
      -30, 150,
      80, 200, 160, 280, 250, 370,
      340, 460, 400, 550, 450, 650,
      500, 750, 530, 840, 555, 910,
      570, 960, 578, 990, 585, 1005,
    ]
  },
  // Cable 3 - Top left corner
  {
    chaotic: [
      50, -20,
      30, 80, 100, 60, 80, 160,
      60, 260, 140, 220, 120, 340,
      100, 460, 180, 400, 160, 540,
      140, 680, 220, 760, 280, 880,
    ],
    organized: [
      50, -20,
      80, 80, 130, 180, 200, 290,
      280, 400, 350, 510, 420, 620,
      480, 730, 530, 830, 560, 910,
      580, 970, 588, 1000, 592, 1010,
    ]
  },
  // Cable 4 - Top center-left
  {
    chaotic: [
      280, -30,
      260, 70, 320, 50, 290, 150,
      260, 250, 340, 200, 310, 320,
      280, 440, 360, 380, 330, 500,
      300, 620, 380, 720, 420, 860,
    ],
    organized: [
      280, -30,
      300, 80, 340, 190, 390, 310,
      440, 430, 480, 540, 520, 660,
      550, 770, 570, 860, 585, 930,
      595, 980, 600, 1000, 602, 1010,
    ]
  },
  // Cable 5 - Top center
  {
    chaotic: [
      500, -25,
      520, 80, 480, 60, 510, 170,
      540, 280, 490, 240, 520, 360,
      550, 480, 510, 420, 540, 560,
      570, 700, 540, 800, 580, 920,
    ],
    organized: [
      500, -25,
      510, 90, 530, 200, 560, 330,
      580, 460, 595, 570, 605, 680,
      610, 790, 612, 880, 612, 940,
      610, 980, 608, 1000, 606, 1010,
    ]
  },
  // Cable 6 - Top center-right
  {
    chaotic: [
      720, -20,
      700, 90, 760, 60, 730, 180,
      700, 300, 780, 250, 750, 380,
      720, 510, 800, 440, 770, 580,
      740, 720, 800, 820, 760, 940,
    ],
    organized: [
      720, -20,
      700, 100, 680, 220, 660, 350,
      640, 480, 625, 590, 618, 700,
      615, 810, 612, 890, 610, 950,
      608, 985, 606, 1000, 605, 1010,
    ]
  },
  // Cable 7 - Top right
  {
    chaotic: [
      950, -30,
      980, 60, 920, 100, 970, 200,
      1020, 300, 940, 350, 990, 440,
      1040, 530, 960, 600, 1000, 700,
      1040, 800, 940, 880, 880, 960,
    ],
    organized: [
      950, -30,
      900, 90, 850, 210, 790, 340,
      730, 470, 680, 580, 650, 700,
      630, 810, 618, 890, 612, 950,
      608, 985, 605, 1000, 603, 1010,
    ]
  },
  // Cable 8 - Right side high
  {
    chaotic: [
      1150, 100,
      1100, 150, 1130, 240, 1080, 320,
      1030, 400, 1100, 480, 1050, 550,
      1000, 620, 1060, 720, 1000, 800,
      940, 880, 980, 940, 900, 980,
    ],
    organized: [
      1150, 100,
      1080, 180, 1000, 280, 920, 390,
      840, 500, 770, 600, 710, 710,
      660, 810, 630, 890, 615, 950,
      605, 985, 602, 1000, 600, 1010,
    ]
  },
  // Cable 9 - Right side middle
  {
    chaotic: [
      1160, 280,
      1100, 320, 1140, 400, 1080, 460,
      1020, 520, 1090, 600, 1030, 660,
      970, 720, 1040, 800, 980, 860,
      920, 920, 960, 960, 880, 990,
    ],
    organized: [
      1160, 280,
      1080, 340, 990, 420, 900, 510,
      820, 600, 760, 690, 710, 780,
      670, 860, 640, 920, 620, 960,
      608, 985, 603, 1000, 598, 1010,
    ]
  },
  // Cable 10 - Right side lower
  {
    chaotic: [
      1150, 450,
      1090, 480, 1130, 550, 1070, 600,
      1010, 650, 1080, 720, 1020, 770,
      960, 820, 1020, 880, 960, 920,
      900, 960, 940, 990, 860, 1000,
    ],
    organized: [
      1150, 450,
      1070, 500, 980, 560, 890, 630,
      810, 700, 750, 770, 700, 840,
      660, 900, 635, 950, 618, 980,
      608, 995, 602, 1005, 596, 1010,
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
      {/* Subtle glow underneath */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={4}
        fill="none"
        opacity={0.15}
        filter="url(#softGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: index * 0.1 }}
      />
      {/* Main thin cable */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        filter="url(#cableGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.8, ease: "easeOut", delay: index * 0.1 },
          opacity: { duration: 0.5, delay: index * 0.08 }
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
    const interpolated = interpolatePoints(cable.chaotic, cable.organized, progress)
    return pointsToPath(interpolated)
  }, [cable, progress])

  if (progress < 0.15) return null

  return (
    <motion.circle
      r={3}
      fill={color}
      filter="url(#pulseGlow)"
      style={{ offsetPath: `path('${path}')` }}
      animate={{ offsetDistance: ['0%', '100%'] }}
      transition={{
        duration: 2.5 + index * 0.2,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.5 + 0.5,
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

  const convergenceOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.65) / 0.25))
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.72) / 0.18))
  const ctaY = Math.max(0, 40 - (scrollProgress - 0.72) * 200)
  const ctaScale = 0.85 + Math.min(0.15, (scrollProgress - 0.72) * 0.8)

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1100 1020"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle glow for cables */}
          <filter id="cableGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Softer glow for background layer */}
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          {/* Strong glow for pulses */}
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Convergence glow */}
          <filter id="centerGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* All cables morphing */}
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

        {/* Convergence point */}
        <g style={{ opacity: convergenceOpacity }}>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="600"
              cy="1005"
              r={12 + i * 10}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={1.5 - i * 0.3}
              filter="url(#centerGlow)"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                r: [12 + i * 10, 16 + i * 10, 12 + i * 10],
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
            r={8}
            fill="#06b6d4"
            filter="url(#centerGlow)"
            animate={{ opacity: [0.8, 1, 0.8], r: [6, 10, 6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="600" cy="1005" r={4} fill="white" filter="url(#cableGlow)" />
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
