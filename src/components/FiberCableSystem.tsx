'use client'

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState, useMemo, useCallback } from 'react'

// Realistic fiber optic colors
const CABLE_COLORS = [
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // orange
  '#8b5cf6', // purple
  '#14b8a6', // teal
  '#ec4899', // pink
  '#60a5fa', // light blue
]

// Each cable is defined by control points that will interpolate
// Structure: [startX, startY, ...bezier control points..., endX, endY]
// Each cable has: M (start) + 5 cubic beziers (C command needs 3 points each = 6 coords per curve)
// Total: 2 (start) + 5 * 6 (5 curves) = 32 coordinates per cable

interface CableDefinition {
  chaotic: number[]  // Control points in chaotic state
  organized: number[] // Control points in organized state (all end at center bottom)
}

// Define 8 cables with chaotic and organized states
// Cables go through the entire page - from edges through hero, content, to footer
const CABLES: CableDefinition[] = [
  // Cable 1 - From top-left, wild curves through page
  {
    chaotic: [
      -50, 50,      // Start
      150, -30, 80, 180, 250, 120,     // Curve 1 - loops up then down
      400, 60, 180, 320, 350, 280,     // Curve 2 - zigzags through hero
      500, 240, 280, 450, 420, 480,    // Curve 3 - continues wildly
      560, 510, 380, 620, 500, 680,    // Curve 4 - through content
      620, 740, 450, 850, 550, 920,    // Curve 5 - approaches bottom
    ],
    organized: [
      -50, 50,      // Start (same)
      100, 100, 200, 200, 300, 300,    // Smooth curve
      400, 400, 450, 500, 480, 600,    // Continues smoothly
      510, 700, 520, 780, 530, 850,    // Getting straighter
      540, 900, 545, 940, 550, 970,    // Approaching center
      555, 990, 558, 1000, 560, 1010,  // Ends near center
    ]
  },
  // Cable 2 - From left side, weaves through content
  {
    chaotic: [
      -80, 200,     // Start
      200, 150, 50, 350, 280, 250,     // Wild loop
      450, 150, 180, 400, 380, 350,    // Through hero text area
      550, 300, 320, 520, 480, 500,    // Continues
      620, 480, 400, 680, 540, 700,    // Through sections
      680, 720, 500, 880, 580, 950,    // To bottom
    ],
    organized: [
      -80, 200,     // Start (same)
      80, 250, 180, 320, 280, 400,     // Smooth
      380, 480, 430, 560, 470, 640,    // Flow
      510, 720, 530, 790, 545, 860,    // Converging
      555, 920, 558, 960, 560, 990,    // Approaching center
      562, 1005, 563, 1010, 565, 1015, // Ends near center
    ]
  },
  // Cable 3 - From top, dips down wildly
  {
    chaotic: [
      400, -50,     // Start from top
      350, 120, 500, 80, 420, 200,     // Loops in hero
      340, 320, 550, 250, 450, 380,    // Weaves around
      350, 510, 580, 450, 480, 560,    // Through content
      380, 670, 600, 620, 520, 720,    // Continues
      440, 820, 620, 900, 560, 980,    // To bottom
    ],
    organized: [
      400, -50,     // Start (same)
      420, 100, 460, 200, 500, 320,    // Flowing down
      530, 440, 545, 540, 555, 640,    // Smooth curve
      560, 740, 562, 820, 563, 890,    // Straightening
      564, 940, 565, 970, 566, 1000,   // Approaching center
      567, 1010, 568, 1015, 570, 1020, // End
    ]
  },
  // Cable 4 - From right side
  {
    chaotic: [
      1150, 100,    // Start from right
      1000, 50, 1100, 250, 950, 180,   // Loops left
      800, 110, 1020, 350, 880, 300,   // Through hero
      740, 250, 950, 480, 820, 450,    // Wild
      680, 400, 880, 620, 760, 600,    // Through content
      640, 580, 800, 800, 680, 850,    // Approaches
    ],
    organized: [
      1150, 100,    // Start (same)
      1000, 180, 900, 280, 800, 380,   // Flowing
      700, 480, 650, 580, 620, 680,    // Smooth
      600, 780, 590, 860, 585, 920,    // Converging
      580, 960, 578, 990, 575, 1010,   // Center
      572, 1015, 570, 1018, 568, 1020, // End
    ]
  },
  // Cable 5 - From top-right, dramatic curves
  {
    chaotic: [
      1100, -30,    // Start
      1150, 150, 950, 50, 1050, 220,   // Wild start
      1150, 390, 880, 180, 1000, 380,  // Loops
      1100, 580, 820, 350, 950, 520,   // Through page
      1050, 690, 780, 500, 900, 660,   // Continues
      980, 800, 750, 720, 850, 880,    // To bottom
    ],
    organized: [
      1100, -30,    // Start (same)
      1000, 100, 920, 220, 850, 340,   // Flowing
      780, 460, 720, 560, 680, 660,    // Smooth
      640, 760, 615, 840, 600, 910,    // Converging
      590, 960, 583, 990, 578, 1010,   // Center
      575, 1018, 573, 1022, 572, 1025, // End
    ]
  },
  // Cable 6 - From bottom-left, rises then falls
  {
    chaotic: [
      -60, 600,     // Start from side lower
      180, 500, 50, 700, 250, 550,     // Goes up
      400, 400, 150, 650, 350, 520,    // Loops through
      500, 390, 280, 600, 450, 540,    // Content area
      600, 480, 380, 700, 520, 650,    // Continues
      660, 600, 480, 800, 580, 820,    // Approaches bottom
    ],
    organized: [
      -60, 600,     // Start (same)
      100, 620, 200, 660, 300, 710,    // Flowing
      400, 760, 460, 810, 500, 860,    // Smooth
      530, 900, 550, 940, 560, 970,    // Converging
      565, 990, 568, 1005, 570, 1015,  // Center
      572, 1020, 573, 1022, 574, 1025, // End
    ]
  },
  // Cable 7 - From right side middle
  {
    chaotic: [
      1150, 400,    // Start
      1050, 300, 1120, 520, 980, 380,  // Loops
      840, 240, 1050, 550, 900, 470,   // Through content
      750, 390, 980, 640, 840, 580,    // Wild curves
      700, 520, 900, 750, 780, 700,    // Continues
      660, 650, 850, 880, 720, 860,    // Approaches
    ],
    organized: [
      1150, 400,    // Start (same)
      1000, 450, 900, 510, 820, 580,   // Flowing
      740, 650, 690, 720, 650, 790,    // Smooth
      620, 860, 600, 910, 590, 950,    // Converging
      582, 980, 578, 1000, 575, 1015,  // Center
      573, 1020, 572, 1023, 571, 1025, // End
    ]
  },
  // Cable 8 - From top center, spreads out then converges
  {
    chaotic: [
      560, -40,     // Start from top center
      480, 100, 650, 50, 520, 180,     // Loops
      390, 260, 680, 150, 550, 300,    // Wild in hero
      420, 440, 700, 350, 580, 480,    // Through content
      460, 620, 720, 550, 600, 640,    // Continues
      520, 760, 740, 800, 620, 900,    // Approaches bottom
    ],
    organized: [
      560, -40,     // Start (same)
      560, 100, 560, 200, 560, 320,    // Straight down initially
      560, 440, 562, 540, 565, 640,    // Slight curve
      568, 740, 570, 830, 572, 900,    // Converging
      573, 950, 574, 980, 575, 1005,   // Center
      575, 1015, 575, 1020, 575, 1025, // End
    ]
  },
]

// Interpolate between two arrays of numbers
function interpolatePoints(from: number[], to: number[], progress: number): number[] {
  return from.map((val, i) => val + (to[i] - val) * progress)
}

// Convert control points array to SVG path string
function pointsToPath(points: number[]): string {
  const [startX, startY, ...rest] = points
  let path = `M ${startX} ${startY}`

  // Each curve needs 6 numbers (3 points × 2 coords)
  for (let i = 0; i < rest.length; i += 6) {
    path += ` C ${rest[i]} ${rest[i+1]}, ${rest[i+2]} ${rest[i+3]}, ${rest[i+4]} ${rest[i+5]}`
  }

  return path
}

// Single cable component that morphs based on scroll
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
      {/* Main cable */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={3 + (index % 3) * 0.5}
        fill="none"
        filter="url(#cableGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{
          pathLength: { duration: 2, ease: "easeOut", delay: index * 0.12 },
          opacity: { duration: 0.6, delay: index * 0.08 }
        }}
      />
      {/* Glow layer */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={8 + (index % 3)}
        fill="none"
        opacity={0.3}
        filter="url(#cableGlow)"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          pathLength: { duration: 2, ease: "easeOut", delay: index * 0.12 },
        }}
      />
    </g>
  )
}

// Light pulse that travels along a cable
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

  // Only show pulses after some scroll progress
  if (progress < 0.2) return null

  return (
    <motion.circle
      r={5}
      fill={color}
      filter="url(#strongGlow)"
      style={{
        offsetPath: `path('${path}')`,
      }}
      animate={{
        offsetDistance: ['0%', '100%'],
      }}
      transition={{
        duration: 2.5 + index * 0.3,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.4 + 1,
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
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  })

  // Update scroll progress state
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate derived values
  const convergenceOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.6) / 0.3))
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.2))
  const ctaY = Math.max(0, 50 - (scrollProgress - 0.7) * 250)
  const ctaScale = 0.8 + Math.min(0.2, (scrollProgress - 0.7) * 1)

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1100 1050"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* All cables - they morph as you scroll */}
        {CABLES.map((cable, index) => (
          <MorphingCable
            key={`cable-${index}`}
            cable={cable}
            color={CABLE_COLORS[index]}
            index={index}
            progress={scrollProgress}
          />
        ))}

        {/* Light pulses traveling along cables */}
        {CABLES.slice(0, 5).map((cable, index) => (
          <LightPulse
            key={`pulse-${index}`}
            cable={cable}
            color={CABLE_COLORS[index]}
            index={index}
            progress={scrollProgress}
          />
        ))}

        {/* Convergence point - where all cables meet at bottom */}
        <g style={{ opacity: convergenceOpacity }}>
          {/* Pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="570"
              cy="1020"
              r={20 + i * 15}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={2 - i * 0.4}
              filter="url(#strongGlow)"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                r: [20 + i * 15, 25 + i * 15, 20 + i * 15],
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
            cx="570"
            cy="1020"
            r={12}
            fill="#06b6d4"
            filter="url(#strongGlow)"
            animate={{
              opacity: [0.8, 1, 0.8],
              r: [10, 15, 10]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* White core */}
          <circle cx="570" cy="1020" r={6} fill="white" filter="url(#cableGlow)" />
        </g>
      </svg>

      {/* CTA Button at convergence */}
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
          className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            boxShadow: '0 0 60px rgba(6, 182, 212, 0.6), 0 0 120px rgba(6, 182, 212, 0.3)',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 80px rgba(6, 182, 212, 0.8), 0 0 150px rgba(6, 182, 212, 0.4)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />

          {/* Lightning icon */}
          <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>

          <span className="text-white relative z-10 tracking-wide">Kostenlose Beratung</span>

          {/* Animated arrow */}
          <motion.svg
            className="w-5 h-5 text-white relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.a>

        <motion.p
          className="text-center text-dark-400 text-sm mt-4 font-medium"
          style={{ opacity: Math.max(0, (scrollProgress - 0.85) / 0.1) }}
        >
          Alle Leitungen verbunden – jetzt sind Sie dran!
        </motion.p>
      </motion.div>
    </div>
  )
}
