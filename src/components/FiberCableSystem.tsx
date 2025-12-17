'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export default function FiberCableSystem() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  const [initialAnimationDone, setInitialAnimationDone] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Initial chaotic movement settles after 4 seconds
    const timer = setTimeout(() => {
      setInitialAnimationDone(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001
  })

  // Convergence point transforms (must be before conditional return)
  const convergenceOpacity = useTransform(smoothProgress, [0.7, 0.95], [0, 1])
  const outerRadius = useTransform(smoothProgress, [0.8, 1], [5, 25])
  const outerOpacity = useTransform(smoothProgress, [0.8, 1], [0.3, 0.6])
  const innerRadius = useTransform(smoothProgress, [0.8, 1], [2, 8])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Background gradient for consistency */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Fiber optic color gradients */}
          <linearGradient id="gCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== LEFT SIDE CABLES ===== */}
        <AnimatedCable
          gradient="gCyan"
          strokeWidth={4}
          chaosPath="M-50 -100 C 200 50, 100 200, 350 300 C 500 400, 200 500, 450 600 C 300 750, 500 850, 350 950 C 200 1050, 400 1100, 300 1200"
          organizedPath="M50 -50 C 100 200, 150 400, 200 600 C 300 800, 500 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0}
          drawDuration={2}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gBlue"
          strokeWidth={3.5}
          chaosPath="M-30 50 C 150 150, 50 300, 280 400 C 400 500, 150 650, 380 750 C 250 850, 420 950, 280 1050 C 150 1150, 350 1200, 250 1250"
          organizedPath="M100 -50 C 150 200, 200 400, 280 600 C 400 800, 600 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.2}
          drawDuration={2.2}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gGreen"
          strokeWidth={3}
          chaosPath="M-80 200 C 180 280, 20 400, 320 500 C 450 600, 180 720, 400 820 C 280 920, 450 1000, 320 1100 C 180 1180, 380 1220, 280 1280"
          organizedPath="M150 -50 C 200 200, 280 400, 380 600 C 520 800, 700 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.4}
          drawDuration={2}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gPurple"
          strokeWidth={2.5}
          chaosPath="M-100 350 C 200 400, 50 550, 350 650 C 480 750, 220 850, 450 950 C 320 1020, 480 1080, 380 1150 C 250 1200, 420 1250, 350 1300"
          organizedPath="M200 -50 C 280 200, 380 400, 500 600 C 660 800, 800 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.6}
          drawDuration={1.8}
          initialAnimationDone={initialAnimationDone}
        />

        {/* ===== RIGHT SIDE CABLES ===== */}
        <AnimatedCable
          gradient="gOrange"
          strokeWidth={4}
          chaosPath="M1970 -100 C 1720 50, 1820 200, 1570 300 C 1420 400, 1720 500, 1470 600 C 1620 750, 1420 850, 1570 950 C 1720 1050, 1520 1100, 1620 1200"
          organizedPath="M1870 -50 C 1820 200, 1770 400, 1720 600 C 1620 800, 1420 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.1}
          drawDuration={2}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gTeal"
          strokeWidth={3.5}
          chaosPath="M1950 50 C 1770 150, 1870 300, 1640 400 C 1520 500, 1770 650, 1540 750 C 1670 850, 1500 950, 1640 1050 C 1770 1150, 1570 1200, 1670 1250"
          organizedPath="M1820 -50 C 1770 200, 1720 400, 1640 600 C 1520 800, 1320 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.3}
          drawDuration={2.2}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gPink"
          strokeWidth={3}
          chaosPath="M2000 200 C 1740 280, 1900 400, 1600 500 C 1470 600, 1740 720, 1520 820 C 1640 920, 1470 1000, 1600 1100 C 1740 1180, 1540 1220, 1640 1280"
          organizedPath="M1770 -50 C 1720 200, 1640 400, 1540 600 C 1400 800, 1220 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.5}
          drawDuration={2}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gBlue"
          strokeWidth={2.5}
          chaosPath="M2020 350 C 1720 400, 1870 550, 1570 650 C 1440 750, 1700 850, 1470 950 C 1600 1020, 1440 1080, 1540 1150 C 1670 1200, 1500 1250, 1570 1300"
          organizedPath="M1720 -50 C 1640 200, 1540 400, 1420 600 C 1260 800, 1120 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.7}
          drawDuration={1.8}
          initialAnimationDone={initialAnimationDone}
        />

        {/* ===== CENTER/MIDDLE CABLES (subtle, behind text) ===== */}
        <AnimatedCable
          gradient="gCyan"
          strokeWidth={2}
          opacity={0.2}
          chaosPath="M400 -50 C 600 100, 450 250, 700 350 C 850 450, 600 550, 800 650 C 700 750, 850 850, 750 950 C 650 1050, 800 1100, 700 1200"
          organizedPath="M600 -50 C 700 200, 800 450, 850 650 C 900 850, 940 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.8}
          drawDuration={2.5}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gPurple"
          strokeWidth={1.5}
          opacity={0.15}
          chaosPath="M960 -50 C 1100 80, 820 180, 1050 280 C 1180 380, 900 480, 1100 580 C 980 680, 1120 780, 1000 880 C 920 980, 1020 1050, 960 1150"
          organizedPath="M960 -50 C 960 200, 960 450, 960 650 C 960 850, 960 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={1}
          drawDuration={2.5}
          initialAnimationDone={initialAnimationDone}
        />
        <AnimatedCable
          gradient="gGreen"
          strokeWidth={2}
          opacity={0.2}
          chaosPath="M1520 -50 C 1320 100, 1470 250, 1220 350 C 1070 450, 1320 550, 1120 650 C 1220 750, 1070 850, 1170 950 C 1270 1050, 1120 1100, 1220 1200"
          organizedPath="M1320 -50 C 1220 200, 1120 450, 1070 650 C 1020 850, 980 950, 960 1050"
          scrollProgress={smoothProgress}
          drawDelay={0.9}
          drawDuration={2.5}
          initialAnimationDone={initialAnimationDone}
        />

        {/* ===== CONVERGENCE POINT AT BOTTOM ===== */}
        <motion.g style={{ opacity: convergenceOpacity }}>
          {/* Outer glow */}
          <motion.circle
            cx="960"
            cy="1050"
            r={outerRadius}
            fill="url(#gCyan)"
            filter="url(#strongGlow)"
            style={{ opacity: outerOpacity }}
          />
          {/* Inner bright point */}
          <motion.circle
            cx="960"
            cy="1050"
            r={innerRadius}
            fill="#22d3ee"
            filter="url(#strongGlow)"
          />
          {/* Pulsing animation */}
          <motion.circle
            cx="960"
            cy="1050"
            r="12"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.5, 0.5], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* ===== LIGHT PULSES ===== */}
        <LightPulse
          path="M50 0 C 100 200, 150 400, 200 600 C 300 800, 500 950, 960 1050"
          color="#22d3ee"
          size={7}
          duration={5}
          delay={0}
          scrollProgress={smoothProgress}
        />
        <LightPulse
          path="M100 0 C 150 200, 200 400, 280 600 C 400 800, 600 950, 960 1050"
          color="#60a5fa"
          size={6}
          duration={5.5}
          delay={1}
          scrollProgress={smoothProgress}
        />
        <LightPulse
          path="M1870 0 C 1820 200, 1770 400, 1720 600 C 1620 800, 1420 950, 960 1050"
          color="#fbbf24"
          size={7}
          duration={5}
          delay={0.5}
          scrollProgress={smoothProgress}
        />
        <LightPulse
          path="M1820 0 C 1770 200, 1720 400, 1640 600 C 1520 800, 1320 950, 960 1050"
          color="#2dd4bf"
          size={6}
          duration={5.5}
          delay={1.5}
          scrollProgress={smoothProgress}
        />
        <LightPulse
          path="M960 0 C 960 200, 960 450, 960 650 C 960 850, 960 950, 960 1050"
          color="#a78bfa"
          size={5}
          duration={4}
          delay={2}
          scrollProgress={smoothProgress}
        />
        {/* Extra pulses for more activity */}
        <LightPulse
          path="M150 0 C 200 200, 280 400, 380 600 C 520 800, 700 950, 960 1050"
          color="#34d399"
          size={5}
          duration={6}
          delay={2.5}
          scrollProgress={smoothProgress}
        />
        <LightPulse
          path="M1770 0 C 1720 200, 1640 400, 1540 600 C 1400 800, 1220 950, 960 1050"
          color="#f472b6"
          size={5}
          duration={6}
          delay={3}
          scrollProgress={smoothProgress}
        />
      </svg>
    </div>
  )
}

// Animated Cable Component
interface AnimatedCableProps {
  gradient: string
  strokeWidth: number
  chaosPath: string
  organizedPath: string
  scrollProgress: any
  drawDelay: number
  drawDuration: number
  initialAnimationDone: boolean
  opacity?: number
}

function AnimatedCable({
  gradient,
  strokeWidth,
  chaosPath,
  organizedPath,
  scrollProgress,
  drawDelay,
  drawDuration,
  initialAnimationDone,
  opacity = 0.7
}: AnimatedCableProps) {
  // Interpolate path based on scroll progress
  const currentPath = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [
    chaosPath,
    chaosPath,
    organizedPath,
    organizedPath
  ])

  // Initial chaotic movement (only at the start)
  const chaoticOffset = useMotionValue(0)

  useAnimationFrame((t) => {
    if (!initialAnimationDone) {
      // Subtle chaotic movement at the start
      chaoticOffset.set(Math.sin(t / 500) * 5)
    } else {
      chaoticOffset.set(0)
    }
  })

  return (
    <motion.path
      d={currentPath}
      stroke={`url(#${gradient})`}
      strokeWidth={strokeWidth}
      fill="none"
      filter="url(#glow)"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: opacity }}
      transition={{
        pathLength: { duration: drawDuration, delay: drawDelay, ease: "easeOut" },
        opacity: { duration: 0.5, delay: drawDelay }
      }}
      style={{
        translateX: chaoticOffset,
        translateY: chaoticOffset
      }}
    />
  )
}

// Light Pulse Component
interface LightPulseProps {
  path: string
  color: string
  size: number
  duration: number
  delay: number
  scrollProgress: any
}

function LightPulse({ path, color, size, duration, delay, scrollProgress }: LightPulseProps) {
  // Pulse size increases slightly as cables organize
  const pulseSize = useTransform(scrollProgress, [0, 1], [size, size * 1.3])

  return (
    <motion.circle
      r={pulseSize}
      fill={color}
      filter="url(#strongGlow)"
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{
        offsetDistance: '100%',
        opacity: [0, 1, 1, 1, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
        repeatDelay: 1.5
      }}
      style={{ offsetPath: `path('${path}')` }}
    />
  )
}
