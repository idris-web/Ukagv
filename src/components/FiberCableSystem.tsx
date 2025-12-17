'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// Cable configuration - each cable has start, control points, and end positions
// for both chaotic and organized states
const CABLES = [
  // Left side cables
  {
    id: 1,
    color: '#06b6d4', // cyan
    strokeWidth: 4,
    chaos: { start: [-50, -100], cp1: [300, 200], cp2: [100, 500], end: [400, 800] },
    organized: { start: [100, 0], cp1: [150, 300], cp2: [300, 600], end: [50, 100] }, // percentage of page
  },
  {
    id: 2,
    color: '#3b82f6', // blue
    strokeWidth: 3.5,
    chaos: { start: [-30, 50], cp1: [350, 150], cp2: [50, 450], end: [450, 750] },
    organized: { start: [150, 0], cp1: [200, 350], cp2: [350, 650], end: [50, 100] },
  },
  {
    id: 3,
    color: '#10b981', // green
    strokeWidth: 3,
    chaos: { start: [-80, 200], cp1: [400, 300], cp2: [80, 550], end: [380, 850] },
    organized: { start: [200, 0], cp1: [280, 400], cp2: [400, 700], end: [50, 100] },
  },
  {
    id: 4,
    color: '#8b5cf6', // purple
    strokeWidth: 2.5,
    chaos: { start: [50, -50], cp1: [450, 250], cp2: [150, 500], end: [350, 900] },
    organized: { start: [250, 0], cp1: [350, 350], cp2: [450, 680], end: [50, 100] },
  },
  // Right side cables
  {
    id: 5,
    color: '#f59e0b', // orange
    strokeWidth: 4,
    chaos: { start: [1970, -100], cp1: [1620, 200], cp2: [1820, 500], end: [1520, 800] },
    organized: { start: [1820, 0], cp1: [1770, 300], cp2: [1620, 600], end: [50, 100] },
  },
  {
    id: 6,
    color: '#14b8a6', // teal
    strokeWidth: 3.5,
    chaos: { start: [1950, 50], cp1: [1570, 150], cp2: [1870, 450], end: [1470, 750] },
    organized: { start: [1770, 0], cp1: [1720, 350], cp2: [1570, 650], end: [50, 100] },
  },
  {
    id: 7,
    color: '#ec4899', // pink
    strokeWidth: 3,
    chaos: { start: [2000, 200], cp1: [1520, 300], cp2: [1840, 550], end: [1540, 850] },
    organized: { start: [1720, 0], cp1: [1640, 400], cp2: [1520, 700], end: [50, 100] },
  },
  {
    id: 8,
    color: '#60a5fa', // light blue
    strokeWidth: 2.5,
    chaos: { start: [1870, -50], cp1: [1470, 250], cp2: [1770, 500], end: [1570, 900] },
    organized: { start: [1670, 0], cp1: [1570, 350], cp2: [1470, 680], end: [50, 100] },
  },
  // Center cables (subtle)
  {
    id: 9,
    color: '#22d3ee', // light cyan
    strokeWidth: 2,
    opacity: 0.25,
    chaos: { start: [600, -50], cp1: [800, 200], cp2: [500, 450], end: [750, 700] },
    organized: { start: [800, 0], cp1: [900, 400], cp2: [950, 700], end: [50, 100] },
  },
  {
    id: 10,
    color: '#a78bfa', // light purple
    strokeWidth: 1.5,
    opacity: 0.2,
    chaos: { start: [960, -80], cp1: [1100, 150], cp2: [820, 400], end: [1000, 650] },
    organized: { start: [960, 0], cp1: [960, 400], cp2: [960, 700], end: [50, 100] },
  },
  {
    id: 11,
    color: '#34d399', // light green
    strokeWidth: 2,
    opacity: 0.25,
    chaos: { start: [1320, -50], cp1: [1120, 200], cp2: [1420, 450], end: [1170, 700] },
    organized: { start: [1120, 0], cp1: [1020, 400], cp2: [980, 700], end: [50, 100] },
  },
]

export default function FiberCableSystem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [pageHeight, setPageHeight] = useState(5000)
  const [viewportHeight, setViewportHeight] = useState(1080)

  const { scrollYProgress } = useScroll()

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Animation progress for initial drawing (0 to 1 over 3 seconds)
  const drawProgress = useMotionValue(0)

  // Chaos intensity (starts at 1, goes to 0 as you scroll)
  const chaosIntensity = useTransform(smoothProgress, [0, 0.15, 0.5], [1, 1, 0])

  // Organization intensity (inverse of chaos)
  const organizationIntensity = useTransform(smoothProgress, [0, 0.15, 0.5], [0, 0, 1])

  // Convergence visibility (appears at the end)
  const convergenceOpacity = useTransform(smoothProgress, [0.75, 0.95], [0, 1])

  useEffect(() => {
    setMounted(true)

    // Get page dimensions
    const updateDimensions = () => {
      setPageHeight(document.documentElement.scrollHeight)
      setViewportHeight(window.innerHeight)
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // Animate draw progress
    animate(drawProgress, 1, {
      duration: 2.5,
      ease: [0.25, 0.1, 0.25, 1],
    })

    return () => window.removeEventListener('resize', updateDimensions)
  }, [drawProgress])

  if (!mounted) return null

  // Calculate convergence point (center-bottom of page)
  const convergenceX = 960
  const convergenceY = pageHeight - viewportHeight * 0.3

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: chaosIntensity
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: chaosIntensity
          }}
        />
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filters */}
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render all cables */}
        {CABLES.map((cable, index) => (
          <Cable
            key={cable.id}
            cable={cable}
            index={index}
            drawProgress={drawProgress}
            chaosIntensity={chaosIntensity}
            organizationIntensity={organizationIntensity}
            smoothProgress={smoothProgress}
          />
        ))}

        {/* Light pulses traveling along cables */}
        {CABLES.slice(0, 8).map((cable, index) => (
          <LightPulse
            key={`pulse-${cable.id}`}
            color={cable.color}
            delay={index * 0.7}
            duration={4 + index * 0.3}
            index={index}
          />
        ))}

        {/* Convergence point at bottom */}
        <motion.g style={{ opacity: convergenceOpacity }}>
          {/* Outer rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="960"
              cy="950"
              r={30 + i * 15}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={1}
              filter="url(#cableGlow)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
          {/* Central glow */}
          <motion.circle
            cx="960"
            cy="950"
            r={20}
            fill="url(#convergenceGradient)"
            filter="url(#pulseGlow)"
            animate={{
              r: [15, 25, 15],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Inner bright core */}
          <motion.circle
            cx="960"
            cy="950"
            r={8}
            fill="#22d3ee"
            filter="url(#pulseGlow)"
          />
        </motion.g>

        {/* Gradient for convergence */}
        <defs>
          <radialGradient id="convergenceGradient">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

// Individual cable component with drawing and morphing animation
interface CableProps {
  cable: typeof CABLES[0]
  index: number
  drawProgress: any
  chaosIntensity: any
  organizationIntensity: any
  smoothProgress: any
}

function Cable({ cable, index, drawProgress, chaosIntensity, organizationIntensity, smoothProgress }: CableProps) {
  const baseOpacity = cable.opacity || 0.8

  // Create chaotic path
  const chaosPath = `M ${cable.chaos.start[0]} ${cable.chaos.start[1]} C ${cable.chaos.cp1[0]} ${cable.chaos.cp1[1]}, ${cable.chaos.cp2[0]} ${cable.chaos.cp2[1]}, ${cable.chaos.end[0]} ${cable.chaos.end[1]}`

  // Create organized path that converges to center-bottom
  const orgStart = cable.organized.start
  const organizedPath = `M ${orgStart[0]} 0 C ${cable.organized.cp1[0]} ${cable.organized.cp1[1]}, ${cable.organized.cp2[0]} ${cable.organized.cp2[1]}, 960 950`

  // Path length for drawing animation
  const pathLength = useTransform(drawProgress, [0, 1], [0, 1])

  // Vertical offset based on scroll (cables move down as you scroll)
  const yOffset = useTransform(smoothProgress, [0, 1], [0, 200])

  // Slight horizontal wobble at the start
  const [wobble, setWobble] = useState(0)

  useEffect(() => {
    let frame: number
    let startTime = Date.now()
    const duration = 4000 // 4 seconds of initial wobble

    const animate = () => {
      const elapsed = Date.now() - startTime
      if (elapsed < duration) {
        const progress = elapsed / duration
        const fadeOut = 1 - progress
        const wobbleAmount = Math.sin(elapsed / 200 + index * 0.5) * 8 * fadeOut
        setWobble(wobbleAmount)
        frame = requestAnimationFrame(animate)
      } else {
        setWobble(0)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [index])

  return (
    <g>
      {/* Chaotic path (visible at start, fades as you scroll) */}
      <motion.path
        d={chaosPath}
        stroke={cable.color}
        strokeWidth={cable.strokeWidth}
        fill="none"
        filter="url(#cableGlow)"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,
          opacity: useTransform(chaosIntensity, (v: number) => v * baseOpacity),
          translateX: wobble,
          translateY: wobble * 0.5,
        }}
      />

      {/* Organized path (fades in as you scroll) */}
      <motion.path
        d={organizedPath}
        stroke={cable.color}
        strokeWidth={cable.strokeWidth}
        fill="none"
        filter="url(#cableGlow)"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,
          opacity: useTransform(organizationIntensity, (v: number) => v * baseOpacity),
          translateY: yOffset,
        }}
      />
    </g>
  )
}

// Light pulse traveling effect - paths are deterministic based on index
const PULSE_PATHS = [
  "M 50 -50 Q 500 400, 960 950",
  "M 150 -50 Q 600 400, 960 950",
  "M 250 -50 Q 700 400, 960 950",
  "M 350 -50 Q 750 400, 960 950",
  "M 1870 -50 Q 1400 400, 960 950",
  "M 1770 -50 Q 1300 400, 960 950",
  "M 1670 -50 Q 1200 400, 960 950",
  "M 1570 -50 Q 1150 400, 960 950",
]

interface LightPulseProps {
  color: string
  delay: number
  duration: number
  index: number
}

function LightPulse({ color, delay, duration, index }: LightPulseProps) {
  const path = PULSE_PATHS[index % PULSE_PATHS.length]

  return (
    <motion.circle
      r={6}
      fill={color}
      filter="url(#pulseGlow)"
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{
        offsetDistance: ['0%', '100%'],
        opacity: [0, 1, 1, 0.8, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
        repeatDelay: 2
      }}
      style={{
        offsetPath: `path('${path}')`
      }}
    />
  )
}
