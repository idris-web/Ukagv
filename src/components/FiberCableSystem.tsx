'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FiberCableSystem() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  // Wave intensity: high at top (chaotic), zero at bottom (organized)
  const waveIntensity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [1, 0.6, 0.2, 0])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.7 }}
      >
        <defs>
          {/* Fiber cable gradients - vertical for better effect */}
          <linearGradient id="cableCyanV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cableBlueV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cableGreenV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cableOrangeV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cableTealV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="1" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cablePurpleV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Strong glow for pulses */}
          <filter id="pulseGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === LEFT SIDE CABLES - Stay on left 25% of screen === */}

        {/* Cable L1 - Far left edge */}
        <AnimatedCable
          gradient="cableCyanV"
          waveIntensity={waveIntensity}
          chaoticPath="M-20 -50 C 80 100, 180 200, 120 350 C 60 500, 200 650, 100 800 C 0 950, 150 1000, 50 1150"
          organizedPath="M30 -50 C 30 100, 35 300, 35 500 C 35 700, 30 900, 30 1150"
          strokeWidth={4}
          delay={0}
        />

        {/* Cable L2 */}
        <AnimatedCable
          gradient="cableBlueV"
          waveIntensity={waveIntensity}
          chaoticPath="M50 -50 C 200 50, 100 200, 250 350 C 300 450, 150 600, 280 750 C 200 900, 300 1000, 180 1150"
          organizedPath="M100 -50 C 100 100, 105 300, 105 500 C 105 700, 100 900, 100 1150"
          strokeWidth={3.5}
          delay={0.1}
        />

        {/* Cable L3 */}
        <AnimatedCable
          gradient="cableGreenV"
          waveIntensity={waveIntensity}
          chaoticPath="M120 -50 C 280 80, 50 250, 320 400 C 250 550, 350 700, 200 850 C 300 950, 150 1050, 250 1150"
          organizedPath="M180 -50 C 180 100, 185 300, 185 500 C 185 700, 180 900, 180 1150"
          strokeWidth={3}
          delay={0.2}
        />

        {/* Cable L4 */}
        <AnimatedCable
          gradient="cableTealV"
          waveIntensity={waveIntensity}
          chaoticPath="M200 -50 C 350 100, 150 300, 380 450 C 280 600, 400 750, 300 900 C 350 1000, 250 1080, 320 1150"
          organizedPath="M270 -50 C 270 100, 275 300, 275 500 C 275 700, 270 900, 270 1150"
          strokeWidth={2.5}
          delay={0.15}
        />

        {/* Cable L5 - Inner left */}
        <AnimatedCable
          gradient="cablePurpleV"
          waveIntensity={waveIntensity}
          chaoticPath="M300 -50 C 420 120, 250 280, 450 430 C 350 580, 480 730, 380 880 C 420 980, 350 1050, 400 1150"
          organizedPath="M370 -50 C 370 100, 375 300, 375 500 C 375 700, 370 900, 370 1150"
          strokeWidth={2}
          delay={0.25}
        />

        {/* === RIGHT SIDE CABLES - Stay on right 25% of screen === */}

        {/* Cable R1 - Far right edge */}
        <AnimatedCable
          gradient="cableOrangeV"
          waveIntensity={waveIntensity}
          chaoticPath="M1940 -50 C 1840 100, 1740 200, 1800 350 C 1860 500, 1720 650, 1820 800 C 1920 950, 1770 1000, 1870 1150"
          organizedPath="M1890 -50 C 1890 100, 1885 300, 1885 500 C 1885 700, 1890 900, 1890 1150"
          strokeWidth={4}
          delay={0}
        />

        {/* Cable R2 */}
        <AnimatedCable
          gradient="cableCyanV"
          waveIntensity={waveIntensity}
          chaoticPath="M1870 -50 C 1720 50, 1820 200, 1670 350 C 1620 450, 1770 600, 1640 750 C 1720 900, 1620 1000, 1740 1150"
          organizedPath="M1820 -50 C 1820 100, 1815 300, 1815 500 C 1815 700, 1820 900, 1820 1150"
          strokeWidth={3.5}
          delay={0.1}
        />

        {/* Cable R3 */}
        <AnimatedCable
          gradient="cableBlueV"
          waveIntensity={waveIntensity}
          chaoticPath="M1800 -50 C 1640 80, 1870 250, 1600 400 C 1670 550, 1570 700, 1720 850 C 1620 950, 1770 1050, 1670 1150"
          organizedPath="M1740 -50 C 1740 100, 1735 300, 1735 500 C 1735 700, 1740 900, 1740 1150"
          strokeWidth={3}
          delay={0.2}
        />

        {/* Cable R4 */}
        <AnimatedCable
          gradient="cableGreenV"
          waveIntensity={waveIntensity}
          chaoticPath="M1720 -50 C 1570 100, 1770 300, 1540 450 C 1640 600, 1520 750, 1620 900 C 1570 1000, 1670 1080, 1600 1150"
          organizedPath="M1650 -50 C 1650 100, 1645 300, 1645 500 C 1645 700, 1650 900, 1650 1150"
          strokeWidth={2.5}
          delay={0.15}
        />

        {/* Cable R5 - Inner right */}
        <AnimatedCable
          gradient="cableTealV"
          waveIntensity={waveIntensity}
          chaoticPath="M1620 -50 C 1500 120, 1670 280, 1470 430 C 1570 580, 1440 730, 1540 880 C 1500 980, 1570 1050, 1520 1150"
          organizedPath="M1550 -50 C 1550 100, 1545 300, 1545 500 C 1545 700, 1550 900, 1550 1150"
          strokeWidth={2}
          delay={0.25}
        />

        {/* === LIGHT PULSES === */}
        {[
          { path: "M30 0 L30 1100", color: "#22d3ee", delay: 0, duration: 4 },
          { path: "M100 0 L100 1100", color: "#60a5fa", delay: 1.5, duration: 5 },
          { path: "M180 0 L180 1100", color: "#34d399", delay: 3, duration: 4.5 },
          { path: "M1890 0 L1890 1100", color: "#fbbf24", delay: 0.5, duration: 4 },
          { path: "M1820 0 L1820 1100", color: "#22d3ee", delay: 2, duration: 5 },
          { path: "M1740 0 L1740 1100", color: "#60a5fa", delay: 3.5, duration: 4.5 },
        ].map((pulse, i) => (
          <motion.circle
            key={i}
            r="6"
            fill={pulse.color}
            filter="url(#pulseGlowStrong)"
            initial={{ offsetDistance: '0%', opacity: 0 }}
            animate={{
              offsetDistance: '100%',
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: pulse.duration,
              repeat: Infinity,
              ease: "linear",
              delay: pulse.delay,
              repeatDelay: 2
            }}
            style={{ offsetPath: `path('${pulse.path}')` }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

// Animated cable component that morphs between chaotic and organized paths
interface AnimatedCableProps {
  gradient: string
  waveIntensity: any
  chaoticPath: string
  organizedPath: string
  strokeWidth: number
  delay: number
}

function AnimatedCable({
  gradient,
  waveIntensity,
  chaoticPath,
  organizedPath,
  strokeWidth,
  delay
}: AnimatedCableProps) {
  // Interpolate between chaotic and organized paths based on scroll
  const pathD = useTransform(waveIntensity, (intensity: number) => {
    if (intensity >= 0.9) return chaoticPath
    if (intensity <= 0.1) return organizedPath

    // For intermediate values, we'll use CSS to blend
    return intensity > 0.5 ? chaoticPath : organizedPath
  })

  return (
    <motion.path
      d={pathD}
      stroke={`url(#${gradient})`}
      strokeWidth={strokeWidth}
      fill="none"
      filter="url(#cableGlow)"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{
        pathLength: { duration: 2, delay: delay, ease: "easeOut" },
        opacity: { duration: 1, delay: delay }
      }}
    />
  )
}
