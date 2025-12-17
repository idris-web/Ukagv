'use client'

import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

// Fiber optic cable colors (realistic)
const CABLE_COLORS = [
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // orange/yellow
  '#8b5cf6', // purple
  '#14b8a6', // teal
  '#ec4899', // pink/magenta
  '#60a5fa', // light blue
]

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  })

  // Background glow opacity - must be before conditional return
  const bgGlowOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.06) 0%, transparent 60%)',
          opacity: bgGlowOpacity
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter */}
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Strong glow for convergence and pulses */}
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* LEFT SIDE CABLES (4 cables) */}
        <Cable
          index={0}
          color={CABLE_COLORS[0]}
          side="left"
          scrollProgress={smoothProgress}
          startOffset={0}
        />
        <Cable
          index={1}
          color={CABLE_COLORS[1]}
          side="left"
          scrollProgress={smoothProgress}
          startOffset={80}
        />
        <Cable
          index={2}
          color={CABLE_COLORS[2]}
          side="left"
          scrollProgress={smoothProgress}
          startOffset={160}
        />
        <Cable
          index={3}
          color={CABLE_COLORS[3]}
          side="left"
          scrollProgress={smoothProgress}
          startOffset={240}
        />

        {/* RIGHT SIDE CABLES (4 cables) */}
        <Cable
          index={4}
          color={CABLE_COLORS[4]}
          side="right"
          scrollProgress={smoothProgress}
          startOffset={0}
        />
        <Cable
          index={5}
          color={CABLE_COLORS[5]}
          side="right"
          scrollProgress={smoothProgress}
          startOffset={80}
        />
        <Cable
          index={6}
          color={CABLE_COLORS[6]}
          side="right"
          scrollProgress={smoothProgress}
          startOffset={160}
        />
        <Cable
          index={7}
          color={CABLE_COLORS[7]}
          side="right"
          scrollProgress={smoothProgress}
          startOffset={240}
        />

        {/* Convergence point */}
        <ConvergencePoint scrollProgress={smoothProgress} />

        {/* Light pulses */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <LightPulse
            key={i}
            index={i}
            color={CABLE_COLORS[i]}
            scrollProgress={smoothProgress}
          />
        ))}
      </svg>

      {/* CTA Button at convergence */}
      <CTAButton scrollProgress={smoothProgress} />
    </div>
  )
}

// Individual cable with angular/zigzag pattern
interface CableProps {
  index: number
  color: string
  side: 'left' | 'right'
  scrollProgress: MotionValue<number>
  startOffset: number
}

function Cable({ index, color, side, scrollProgress, startOffset }: CableProps) {
  const isLeft = side === 'left'
  const localIndex = isLeft ? index : index - 4

  // Base positions
  const baseStartX = isLeft ? -150 + startOffset : 2070 - startOffset
  const baseY = -300 - localIndex * 60

  // How much the cable moves horizontally toward center based on scroll
  // At scroll 0: cables are spread out (chaotic)
  // At scroll 1: cables converge to center
  const spreadAmount = isLeft
    ? 250 + localIndex * 150  // How far left cables spread
    : -(250 + localIndex * 150) // How far right cables spread (negative)

  // Horizontal offset decreases as you scroll (cables come together)
  const xOffset = useTransform(scrollProgress, [0, 0.6, 1], [spreadAmount, spreadAmount * 0.3, 0])

  // Cable segments - each segment has its own transform
  // Segment 1: Entry (top, outside viewport going down)
  const seg1EndY = 200
  const seg1X = useTransform(scrollProgress, [0, 0.3], [
    isLeft ? 100 + localIndex * 100 : 1820 - localIndex * 100,
    isLeft ? 300 + localIndex * 60 : 1620 - localIndex * 60
  ])

  // Segment 2: First horizontal + vertical (organizing)
  const seg2Y = 400
  const seg2X = useTransform(scrollProgress, [0.1, 0.5], [
    isLeft ? 200 + localIndex * 80 : 1720 - localIndex * 80,
    isLeft ? 500 + localIndex * 40 : 1420 - localIndex * 40
  ])

  // Segment 3: Second horizontal + vertical (more organized)
  const seg3Y = 600
  const seg3X = useTransform(scrollProgress, [0.3, 0.7], [
    isLeft ? 400 + localIndex * 50 : 1520 - localIndex * 50,
    isLeft ? 700 + localIndex * 25 : 1220 - localIndex * 25
  ])

  // Segment 4: Third section (converging)
  const seg4Y = 800
  const seg4X = useTransform(scrollProgress, [0.5, 0.9], [
    isLeft ? 600 + localIndex * 30 : 1320 - localIndex * 30,
    isLeft ? 860 + localIndex * 15 : 1060 - localIndex * 15
  ])

  // Final convergence point
  const finalX = 960
  const finalY = 950

  // Path length animation (drawing effect)
  const pathLength = useTransform(scrollProgress, [0, 0.15, 0.9], [0.2, 0.5, 1])

  // Opacity
  const opacity = useTransform(scrollProgress, [0, 0.1], [0.6, 0.9])

  // Stroke width varies slightly
  const strokeWidth = 3.5 - (localIndex % 2) * 0.5

  return (
    <motion.g style={{ opacity }}>
      {/* Main cable path - using multiple segments with transforms */}
      <motion.path
        d={`
          M ${baseStartX} ${baseY}
          L ${baseStartX} ${seg1EndY - 50}
        `}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        filter="url(#cableGlow)"
        strokeLinecap="round"
        style={{
          pathLength,
          x: xOffset
        }}
      />

      {/* Segment 1 to 2 */}
      <CableSegment
        fromX={baseStartX}
        fromY={seg1EndY - 50}
        toX={seg1X}
        toY={seg1EndY}
        nextX={seg1X}
        nextY={seg2Y}
        color={color}
        strokeWidth={strokeWidth}
        scrollProgress={scrollProgress}
        xOffset={xOffset}
        pathLength={pathLength}
      />

      {/* Segment 2 to 3 */}
      <CableSegment
        fromX={seg1X}
        fromY={seg2Y}
        toX={seg2X}
        toY={seg2Y}
        nextX={seg2X}
        nextY={seg3Y}
        color={color}
        strokeWidth={strokeWidth}
        scrollProgress={scrollProgress}
        xOffset={xOffset}
        pathLength={pathLength}
      />

      {/* Segment 3 to 4 */}
      <CableSegment
        fromX={seg2X}
        fromY={seg3Y}
        toX={seg3X}
        toY={seg3Y}
        nextX={seg3X}
        nextY={seg4Y}
        color={color}
        strokeWidth={strokeWidth}
        scrollProgress={scrollProgress}
        xOffset={xOffset}
        pathLength={pathLength}
      />

      {/* Segment 4 to convergence */}
      <CableSegment
        fromX={seg3X}
        fromY={seg4Y}
        toX={seg4X}
        toY={seg4Y}
        nextX={960}
        nextY={finalY}
        color={color}
        strokeWidth={strokeWidth}
        scrollProgress={scrollProgress}
        xOffset={xOffset}
        pathLength={pathLength}
      />
    </motion.g>
  )
}

// Cable segment with horizontal turn then vertical
interface CableSegmentProps {
  fromX: MotionValue<number> | number
  fromY: number
  toX: MotionValue<number>
  toY: number
  nextX: MotionValue<number> | number
  nextY: number
  color: string
  strokeWidth: number
  scrollProgress: MotionValue<number>
  xOffset: MotionValue<number>
  pathLength: MotionValue<number>
}

function CableSegment({
  fromX,
  fromY,
  toX,
  toY,
  nextX,
  nextY,
  color,
  strokeWidth,
  scrollProgress,
  xOffset,
  pathLength
}: CableSegmentProps) {
  // Create motion path using the motion values
  return (
    <motion.line
      x1={fromX}
      y1={fromY}
      x2={toX}
      y2={toY}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      filter="url(#cableGlow)"
      strokeLinecap="round"
      style={{
        pathLength,
        x: xOffset
      }}
    />
  )
}

// Convergence point
function ConvergencePoint({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.65, 0.85], [0, 1])
  const scale = useTransform(scrollProgress, [0.7, 0.95], [0.3, 1])

  return (
    <motion.g style={{ opacity }}>
      {/* Outer pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="960"
          cy="950"
          r={20 + i * 15}
          fill="none"
          stroke="#06b6d4"
          strokeWidth={2.5 - i * 0.5}
          filter="url(#strongGlow)"
          style={{ scale }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            r: [20 + i * 15, 25 + i * 15, 20 + i * 15],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Bright center */}
      <motion.circle
        cx="960"
        cy="950"
        r={15}
        fill="#06b6d4"
        filter="url(#strongGlow)"
        style={{ scale }}
        animate={{
          opacity: [0.7, 1, 0.7],
          r: [12, 18, 12]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* White core */}
      <motion.circle
        cx="960"
        cy="950"
        r={6}
        fill="white"
        filter="url(#cableGlow)"
        style={{ scale }}
      />
    </motion.g>
  )
}

// Light pulse traveling effect
function LightPulse({ index, color, scrollProgress }: { index: number, color: string, scrollProgress: MotionValue<number> }) {
  const isLeft = index < 3
  const localIdx = isLeft ? index : index - 3

  // Simplified path for pulses
  const startX = isLeft ? 100 + localIdx * 100 : 1820 - localIdx * 100
  const midX = isLeft ? 500 + localIdx * 50 : 1420 - localIdx * 50
  const path = `M ${startX} -100 L ${startX} 300 L ${midX} 500 L 960 950`

  const pulseOpacity = useTransform(scrollProgress, [0, 0.3], [0.5, 0.9])

  return (
    <motion.circle
      r={5}
      fill={color}
      filter="url(#strongGlow)"
      style={{
        offsetPath: `path('${path}')`,
        opacity: pulseOpacity
      }}
      animate={{
        offsetDistance: ['0%', '100%'],
      }}
      transition={{
        duration: 5 + index * 0.3,
        repeat: Infinity,
        ease: "linear",
        delay: index * 1,
        repeatDelay: 2
      }}
    />
  )
}

// CTA Button
function CTAButton({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.8, 0.95], [0, 1])
  const y = useTransform(scrollProgress, [0.8, 0.95], [40, 0])
  const scale = useTransform(scrollProgress, [0.8, 0.95], [0.85, 1])
  const subtitleOpacity = useTransform(scrollProgress, [0.9, 1], [0, 1])

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
      style={{
        bottom: '6%',
        opacity,
        y,
        scale
      }}
    >
      <motion.a
        href="#contact"
        className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          boxShadow: '0 0 50px rgba(6, 182, 212, 0.6), 0 0 100px rgba(6, 182, 212, 0.3)',
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 70px rgba(6, 182, 212, 0.8), 0 0 120px rgba(6, 182, 212, 0.4)',
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
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        />

        {/* Lightning icon */}
        <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>

        <span className="text-white relative z-10 font-bold tracking-wide">Kostenlose Beratung</span>

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
        style={{ opacity: subtitleOpacity }}
      >
        Alle Kabel verbunden - Ihre Verbindung wartet!
      </motion.p>
    </motion.div>
  )
}
