'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

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

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

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
        </defs>

        {/* Left side cables */}
        <FiberCable
          color={CABLE_COLORS[0]}
          index={0}
          side="left"
          scrollProgress={smoothProgress}
        />
        <FiberCable
          color={CABLE_COLORS[1]}
          index={1}
          side="left"
          scrollProgress={smoothProgress}
        />
        <FiberCable
          color={CABLE_COLORS[2]}
          index={2}
          side="left"
          scrollProgress={smoothProgress}
        />
        <FiberCable
          color={CABLE_COLORS[3]}
          index={3}
          side="left"
          scrollProgress={smoothProgress}
        />

        {/* Right side cables */}
        <FiberCable
          color={CABLE_COLORS[4]}
          index={0}
          side="right"
          scrollProgress={smoothProgress}
        />
        <FiberCable
          color={CABLE_COLORS[5]}
          index={1}
          side="right"
          scrollProgress={smoothProgress}
        />
        <FiberCable
          color={CABLE_COLORS[6]}
          index={2}
          side="right"
          scrollProgress={smoothProgress}
        />
        <FiberCable
          color={CABLE_COLORS[7]}
          index={3}
          side="right"
          scrollProgress={smoothProgress}
        />

        {/* Light pulses */}
        {[0, 1, 2, 3].map(i => (
          <LightPulse key={`left-${i}`} index={i} side="left" color={CABLE_COLORS[i]} />
        ))}
        {[0, 1, 2, 3].map(i => (
          <LightPulse key={`right-${i}`} index={i} side="right" color={CABLE_COLORS[i + 4]} />
        ))}
      </svg>
    </div>
  )
}

interface FiberCableProps {
  color: string
  index: number
  side: 'left' | 'right'
  scrollProgress: any
}

function FiberCable({ color, index, side, scrollProgress }: FiberCableProps) {
  const isLeft = side === 'left'

  // Calculate spread based on scroll (cables come together as you scroll)
  const spreadMultiplier = useTransform(scrollProgress, [0, 0.5, 1], [1, 0.6, 0.2])

  // Vertical position moves down as you scroll
  const yOffset = useTransform(scrollProgress, [0, 1], [0, 150])

  // Cable opacity - more visible overall
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.6])

  // Path reveal (drawing effect) - controlled by scroll
  const pathLength = useTransform(scrollProgress, [0, 0.1, 0.8], [0.4, 0.7, 1])

  // Base positions for zigzag cable path
  const baseSpread = 200 + index * 120

  // Calculate X offset from spread multiplier (must be outside of style prop)
  const xOffset = useTransform(spreadMultiplier, (v) => isLeft ? -baseSpread * (1 - v) : baseSpread * (1 - v))

  // Create zigzag path from top to bottom
  const startX = isLeft ? -100 - index * 50 : 2020 + index * 50
  const startY = -200 - index * 80

  const getPath = () => {
    if (isLeft) {
      return `
        M ${startX} ${startY}
        L ${startX} 100
        L ${100 + index * 80} 100
        L ${100 + index * 80} 280
        L ${250 + index * 60} 280
        L ${250 + index * 60} 460
        L ${400 + index * 45} 460
        L ${400 + index * 45} 640
        L ${550 + index * 30} 640
        L ${550 + index * 30} 820
        L ${700 + index * 20} 820
        L ${700 + index * 20} 1000
        L 960 1000
        L 960 1200
      `
    } else {
      return `
        M ${startX} ${startY}
        L ${startX} 100
        L ${1820 - index * 80} 100
        L ${1820 - index * 80} 280
        L ${1670 - index * 60} 280
        L ${1670 - index * 60} 460
        L ${1520 - index * 45} 460
        L ${1520 - index * 45} 640
        L ${1370 - index * 30} 640
        L ${1370 - index * 30} 820
        L ${1220 - index * 20} 820
        L ${1220 - index * 20} 1000
        L 960 1000
        L 960 1200
      `
    }
  }

  return (
    <motion.g
      style={{
        x: xOffset,
        y: yOffset,
      }}
    >
      <motion.path
        d={getPath()}
        stroke={color}
        strokeWidth={3.5 - index * 0.3}
        fill="none"
        filter="url(#glow)"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,
          opacity,
        }}
      />
    </motion.g>
  )
}

function LightPulse({ index, side, color }: { index: number, side: 'left' | 'right', color: string }) {
  const isLeft = side === 'left'

  // Simplified path for light pulse
  const getPath = () => {
    if (isLeft) {
      return `M ${-100 - index * 50} ${-200 - index * 80} L ${-100 - index * 50} 100 L ${400 + index * 45} 460 L 960 1000`
    } else {
      return `M ${2020 + index * 50} ${-200 - index * 80} L ${2020 + index * 50} 100 L ${1520 - index * 45} 460 L 960 1000`
    }
  }

  return (
    <motion.circle
      r={6}
      fill={color}
      filter="url(#glow)"
      style={{
        offsetPath: `path('${getPath()}')`,
      }}
      animate={{
        offsetDistance: ['0%', '100%'],
        opacity: [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration: 3.5 + index * 0.3, // Faster: 3.5-4.7s instead of 6-10s
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.8 + (isLeft ? 0 : 0.4),
        repeatDelay: 1, // Shorter repeat delay
      }}
    />
  )
}
