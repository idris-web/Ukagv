'use client'

import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
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
  '#22d3ee', // light cyan
  '#a78bfa', // light purple
]

// Chaotic curved paths - natural, flowing, messy
const CHAOTIC_PATHS = [
  // Left side - wild curves
  "M -100 -50 C 200 100, 100 300, 350 400 C 500 500, 200 600, 450 750 C 600 850, 400 950, 600 1100",
  "M -50 100 C 300 50, 150 250, 400 350 C 550 450, 250 550, 500 700 C 650 800, 450 900, 650 1100",
  "M -150 200 C 250 150, 50 350, 300 450 C 450 550, 150 650, 400 800 C 550 900, 350 1000, 550 1150",
  "M -80 -100 C 350 0, 100 200, 450 300 C 600 400, 300 500, 550 650 C 700 750, 500 850, 700 1050",
  "M 100 -80 C 400 50, 200 250, 500 350 C 650 450, 350 550, 600 700 C 750 800, 550 900, 750 1100",
  // Right side - wild curves
  "M 2020 -50 C 1720 100, 1820 300, 1570 400 C 1420 500, 1720 600, 1470 750 C 1320 850, 1520 950, 1320 1100",
  "M 1970 100 C 1620 50, 1770 250, 1520 350 C 1370 450, 1670 550, 1420 700 C 1270 800, 1470 900, 1270 1100",
  "M 2070 200 C 1670 150, 1870 350, 1620 450 C 1470 550, 1770 650, 1520 800 C 1370 900, 1570 1000, 1370 1150",
  "M 2000 -100 C 1570 0, 1820 200, 1470 300 C 1320 400, 1620 500, 1370 650 C 1220 750, 1420 850, 1220 1050",
  "M 1820 -80 C 1520 50, 1720 250, 1420 350 C 1270 450, 1570 550, 1320 700 C 1170 800, 1370 900, 1170 1100",
]

// Organized paths - all converging smoothly to center bottom
const ORGANIZED_PATHS = [
  // Left side - organized, flowing to center
  "M -100 -50 C 100 100, 200 300, 400 500 C 600 700, 800 850, 960 1000",
  "M -50 100 C 150 150, 300 350, 500 550 C 700 750, 850 880, 960 1000",
  "M -150 200 C 50 250, 250 400, 450 600 C 650 800, 820 900, 960 1000",
  "M -80 -100 C 200 50, 350 250, 550 450 C 750 650, 880 820, 960 1000",
  "M 100 -80 C 250 100, 400 300, 600 500 C 800 700, 900 850, 960 1000",
  // Right side - organized, flowing to center
  "M 2020 -50 C 1820 100, 1720 300, 1520 500 C 1320 700, 1120 850, 960 1000",
  "M 1970 100 C 1770 150, 1620 350, 1420 550 C 1220 750, 1070 880, 960 1000",
  "M 2070 200 C 1870 250, 1670 400, 1470 600 C 1270 800, 1100 900, 960 1000",
  "M 2000 -100 C 1720 50, 1570 250, 1370 450 C 1170 650, 1040 820, 960 1000",
  "M 1820 -80 C 1670 100, 1520 300, 1320 500 C 1120 700, 1020 850, 960 1000",
]

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001
  })

  // Transform values for animations
  const chaosOpacity = useTransform(smoothProgress, [0, 0.3, 0.5], [1, 0.5, 0])
  const organizedOpacity = useTransform(smoothProgress, [0, 0.3, 0.5], [0, 0.5, 1])
  const organizedPathLength = useTransform(smoothProgress, [0.2, 0.8], [0.3, 1])
  const convergenceOpacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1])
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.92], [0, 1])
  const ctaY = useTransform(smoothProgress, [0.75, 0.92], [50, 0])
  const ctaScale = useTransform(smoothProgress, [0.75, 0.92], [0.8, 1])
  const subtitleOpacity = useTransform(smoothProgress, [0.88, 0.98], [0, 1])

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
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* CHAOTIC CABLES - visible at start, fade out as you scroll */}
        <motion.g style={{ opacity: chaosOpacity }}>
          {CHAOTIC_PATHS.map((path, index) => (
            <motion.path
              key={`chaos-${index}`}
              d={path}
              stroke={CABLE_COLORS[index]}
              strokeWidth={3.5 - (index % 3) * 0.5}
              fill="none"
              filter="url(#cableGlow)"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{
                pathLength: { duration: 2.5, ease: "easeOut", delay: index * 0.15 },
                opacity: { duration: 0.8, delay: index * 0.1 }
              }}
            />
          ))}
        </motion.g>

        {/* ORGANIZED CABLES - fade in as you scroll */}
        <motion.g style={{ opacity: organizedOpacity }}>
          {ORGANIZED_PATHS.map((path, index) => (
            <motion.path
              key={`org-${index}`}
              d={path}
              stroke={CABLE_COLORS[index]}
              strokeWidth={3.5 - (index % 3) * 0.5}
              fill="none"
              filter="url(#cableGlow)"
              strokeLinecap="round"
              style={{ pathLength: organizedPathLength }}
            />
          ))}
        </motion.g>

        {/* Light pulses on organized cables */}
        {ORGANIZED_PATHS.slice(0, 6).map((path, index) => (
          <LightPulse
            key={`pulse-${index}`}
            path={path}
            color={CABLE_COLORS[index]}
            index={index}
            scrollProgress={smoothProgress}
          />
        ))}

        {/* Convergence point - glowing center where all cables meet */}
        <motion.g style={{ opacity: convergenceOpacity }}>
          {/* Outer pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="960"
              cy="1000"
              r={25 + i * 18}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={2.5 - i * 0.5}
              filter="url(#strongGlow)"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                r: [25 + i * 18, 30 + i * 18, 25 + i * 18],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Bright center */}
          <motion.circle
            cx="960"
            cy="1000"
            r={18}
            fill="#06b6d4"
            filter="url(#strongGlow)"
            animate={{
              opacity: [0.7, 1, 0.7],
              r: [15, 22, 15]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* White core */}
          <circle cx="960" cy="1000" r={8} fill="white" filter="url(#cableGlow)" />
        </motion.g>
      </svg>

      {/* CTA Button at convergence */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{
          bottom: '5%',
          opacity: ctaOpacity,
          y: ctaY,
          scale: ctaScale
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
          style={{ opacity: subtitleOpacity }}
        >
          Alle Leitungen verbunden – jetzt sind Sie dran!
        </motion.p>
      </motion.div>
    </div>
  )
}

// Light pulse traveling along cable
function LightPulse({ path, color, index, scrollProgress }: {
  path: string
  color: string
  index: number
  scrollProgress: MotionValue<number>
}) {
  const pulseOpacity = useTransform(scrollProgress, [0.3, 0.5], [0, 1])

  return (
    <motion.circle
      r={6}
      fill={color}
      filter="url(#strongGlow)"
      style={{
        offsetPath: `path('${path}')`,
        opacity: pulseOpacity
      }}
      animate={{
        offsetDistance: ['0%', '100%'],
        opacity: [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration: 3 + index * 0.2,
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.6,
        repeatDelay: 1.5,
      }}
    />
  )
}
