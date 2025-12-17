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

  // Animation intensity based on scroll (1 = full chaos, 0 = organized)
  const chaosLevel = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [1, 0.7, 0.3, 0])

  // Cable opacity increases slightly as they organize
  const cableOpacity = useTransform(smoothProgress, [0, 1], [0.6, 0.8])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Background gradient overlay for consistency */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: cableOpacity }}
      >
        <defs>
          {/* Fiber optic color gradients - horizontal for movement effect */}
          <linearGradient id="fiberCyanG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#06b6d4" />
            <stop offset="90%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberBlueG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#3b82f6" />
            <stop offset="90%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberGreenG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#10b981" />
            <stop offset="90%" stopColor="#34d399" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberOrangeG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberTealG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#14b8a6" />
            <stop offset="90%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberPurpleG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#8b5cf6" />
            <stop offset="90%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberPinkG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#ec4899" />
            <stop offset="90%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="fiberGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="fiberStrongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========== LEFT SIDE CABLES - ANIMATED & MOVING ========== */}

        {/* Cable L1 - Top Left Primary - THICK */}
        <motion.path
          stroke="url(#fiberCyanG)"
          strokeWidth="4"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M-100 30 Q 150 10, 320 120 Q 490 230, 420 420 Q 350 610, 180 750 Q 50 880, 100 1100",
              "M-100 60 Q 130 40, 350 150 Q 520 270, 440 450 Q 360 630, 200 780 Q 80 920, 120 1100",
              "M-100 20 Q 170 0, 300 100 Q 470 210, 400 400 Q 330 590, 160 730 Q 30 860, 90 1100",
              "M-100 30 Q 150 10, 320 120 Q 490 230, 420 420 Q 350 610, 180 750 Q 50 880, 100 1100",
            ],
            opacity: [0.7, 0.8, 0.7, 0.7]
          }}
          transition={{
            d: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cable L2 - Mid Left */}
        <motion.path
          stroke="url(#fiberBlueG)"
          strokeWidth="3.5"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M-80 180 Q 120 220, 200 380 Q 280 540, 150 720 Q 20 900, -100 1100",
              "M-80 210 Q 100 260, 220 410 Q 310 570, 170 750 Q 30 930, -80 1100",
              "M-80 160 Q 140 200, 180 360 Q 250 520, 130 700 Q 0 880, -100 1100",
              "M-80 180 Q 120 220, 200 380 Q 280 540, 150 720 Q 20 900, -100 1100",
            ],
            opacity: [0.6, 0.7, 0.6, 0.6]
          }}
          transition={{
            d: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 },
            opacity: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />

        {/* Cable L3 - Lower Left */}
        <motion.path
          stroke="url(#fiberGreenG)"
          strokeWidth="3"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M-60 350 Q 80 400, 180 550 Q 280 700, 380 820 Q 480 940, 650 1100",
              "M-60 380 Q 100 430, 200 580 Q 300 730, 400 850 Q 500 970, 670 1100",
              "M-60 330 Q 60 380, 160 530 Q 260 680, 360 800 Q 460 920, 630 1100",
              "M-60 350 Q 80 400, 180 550 Q 280 700, 380 820 Q 480 940, 650 1100",
            ],
            opacity: [0.55, 0.65, 0.55, 0.55]
          }}
          transition={{
            d: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 },
            opacity: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        />

        {/* Cable L4 - Very Top Left */}
        <motion.path
          stroke="url(#fiberPurpleG)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M-100 -20 Q 100 -30, 250 50 Q 400 130, 500 300 Q 600 470, 550 650 Q 500 830, 450 1100",
              "M-100 0 Q 80 -10, 270 70 Q 420 160, 520 330 Q 620 500, 570 680 Q 520 860, 470 1100",
              "M-100 -30 Q 120 -40, 230 40 Q 380 120, 480 290 Q 580 460, 530 640 Q 480 820, 430 1100",
              "M-100 -20 Q 100 -30, 250 50 Q 400 130, 500 300 Q 600 470, 550 650 Q 500 830, 450 1100",
            ],
            opacity: [0.45, 0.55, 0.45, 0.45]
          }}
          transition={{
            d: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            opacity: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        />

        {/* ========== RIGHT SIDE CABLES - ANIMATED & MOVING ========== */}

        {/* Cable R1 - Top Right Primary - THICK */}
        <motion.path
          stroke="url(#fiberOrangeG)"
          strokeWidth="4"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M2020 50 Q 1780 30, 1620 150 Q 1460 270, 1540 470 Q 1620 670, 1800 800 Q 1900 900, 1850 1100",
              "M2020 80 Q 1760 60, 1600 180 Q 1440 300, 1520 500 Q 1600 700, 1780 830 Q 1880 930, 1830 1100",
              "M2020 30 Q 1800 10, 1640 130 Q 1480 250, 1560 450 Q 1640 650, 1820 780 Q 1920 880, 1870 1100",
              "M2020 50 Q 1780 30, 1620 150 Q 1460 270, 1540 470 Q 1620 670, 1800 800 Q 1900 900, 1850 1100",
            ],
            opacity: [0.7, 0.8, 0.7, 0.7]
          }}
          transition={{
            d: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        />

        {/* Cable R2 - Mid Right */}
        <motion.path
          stroke="url(#fiberTealG)"
          strokeWidth="3.5"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M2050 250 Q 1850 300, 1760 480 Q 1670 660, 1780 870 Q 1890 1000, 2000 1100",
              "M2050 280 Q 1830 330, 1740 510 Q 1650 690, 1760 900 Q 1870 1020, 1980 1100",
              "M2050 230 Q 1870 280, 1780 460 Q 1690 640, 1800 850 Q 1910 980, 2020 1100",
              "M2050 250 Q 1850 300, 1760 480 Q 1670 660, 1780 870 Q 1890 1000, 2000 1100",
            ],
            opacity: [0.6, 0.7, 0.6, 0.6]
          }}
          transition={{
            d: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            opacity: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        />

        {/* Cable R3 - Lower Right */}
        <motion.path
          stroke="url(#fiberPinkG)"
          strokeWidth="3"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M2000 480 Q 1800 530, 1680 700 Q 1560 870, 1400 960 Q 1240 1050, 1050 1100",
              "M2000 510 Q 1780 560, 1660 730 Q 1540 900, 1380 990 Q 1220 1080, 1030 1100",
              "M2000 460 Q 1820 510, 1700 680 Q 1580 850, 1420 940 Q 1260 1030, 1070 1100",
              "M2000 480 Q 1800 530, 1680 700 Q 1560 870, 1400 960 Q 1240 1050, 1050 1100",
            ],
            opacity: [0.55, 0.65, 0.55, 0.55]
          }}
          transition={{
            d: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
            opacity: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
          }}
        />

        {/* Cable R4 - Very Top Right */}
        <motion.path
          stroke="url(#fiberBlueG)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M2020 -10 Q 1820 -20, 1680 60 Q 1540 140, 1450 310 Q 1360 480, 1400 660 Q 1440 840, 1500 1100",
              "M2020 10 Q 1800 0, 1660 80 Q 1520 160, 1430 330 Q 1340 500, 1380 680 Q 1420 860, 1480 1100",
              "M2020 -20 Q 1840 -30, 1700 50 Q 1560 130, 1470 300 Q 1380 470, 1420 650 Q 1460 830, 1520 1100",
              "M2020 -10 Q 1820 -20, 1680 60 Q 1540 140, 1450 310 Q 1360 480, 1400 660 Q 1440 840, 1500 1100",
            ],
            opacity: [0.45, 0.55, 0.45, 0.45]
          }}
          transition={{
            d: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 },
            opacity: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }
          }}
        />

        {/* ========== CENTER/CROSSING CABLES - Subtle, behind text ========== */}

        {/* Cable C1 - Top wave crossing (subtle) */}
        <motion.path
          stroke="url(#fiberCyanG)"
          strokeWidth="2"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M-100 100 Q 300 60, 700 150 Q 1100 240, 1500 120 Q 1800 30, 2050 80",
              "M-100 130 Q 300 90, 700 180 Q 1100 270, 1500 150 Q 1800 60, 2050 110",
              "M-100 80 Q 300 40, 700 130 Q 1100 220, 1500 100 Q 1800 10, 2050 60",
              "M-100 100 Q 300 60, 700 150 Q 1100 240, 1500 120 Q 1800 30, 2050 80",
            ],
            opacity: [0.25, 0.35, 0.25, 0.25]
          }}
          transition={{
            d: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cable C2 - Bottom wave crossing */}
        <motion.path
          stroke="url(#fiberGreenG)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M-100 850 Q 200 800, 500 870 Q 800 940, 1100 850 Q 1400 760, 1700 840 Q 1900 900, 2050 870",
              "M-100 880 Q 200 830, 500 900 Q 800 970, 1100 880 Q 1400 790, 1700 870 Q 1900 930, 2050 900",
              "M-100 830 Q 200 780, 500 850 Q 800 920, 1100 830 Q 1400 740, 1700 820 Q 1900 880, 2050 850",
              "M-100 850 Q 200 800, 500 870 Q 800 940, 1100 850 Q 1400 760, 1700 840 Q 1900 900, 2050 870",
            ],
            opacity: [0.35, 0.45, 0.35, 0.35]
          }}
          transition={{
            d: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cable C3 - Mid crossing (very subtle, behind content) */}
        <motion.path
          stroke="url(#fiberPurpleG)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#fiberGlow)"
          animate={{
            d: [
              "M-50 500 Q 400 450, 700 520 Q 1000 590, 1300 480 Q 1600 370, 2050 450",
              "M-50 530 Q 400 480, 700 550 Q 1000 620, 1300 510 Q 1600 400, 2050 480",
              "M-50 480 Q 400 430, 700 500 Q 1000 570, 1300 460 Q 1600 350, 2050 430",
              "M-50 500 Q 400 450, 700 520 Q 1000 590, 1300 480 Q 1600 370, 2050 450",
            ],
            opacity: [0.15, 0.25, 0.15, 0.15]
          }}
          transition={{
            d: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 },
            opacity: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        />

        {/* ========== LIGHT PULSES - TRAVELING ALONG CABLES ========== */}

        {/* Pulse 1 - Left primary */}
        <motion.circle
          r="8"
          fill="#22d3ee"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          style={{ offsetPath: "path('M-100 30 Q 150 10, 320 120 Q 490 230, 420 420 Q 350 610, 180 750 Q 50 880, 100 1100')" }}
        />

        {/* Pulse 2 - Left secondary */}
        <motion.circle
          r="6"
          fill="#60a5fa"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M-80 180 Q 120 220, 200 380 Q 280 540, 150 720 Q 20 900, -100 1100')" }}
        />

        {/* Pulse 3 - Right primary */}
        <motion.circle
          r="8"
          fill="#fbbf24"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1, repeatDelay: 2 }}
          style={{ offsetPath: "path('M2020 50 Q 1780 30, 1620 150 Q 1460 270, 1540 470 Q 1620 670, 1800 800 Q 1900 900, 1850 1100')" }}
        />

        {/* Pulse 4 - Right secondary */}
        <motion.circle
          r="6"
          fill="#2dd4bf"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 3, repeatDelay: 1 }}
          style={{ offsetPath: "path('M2050 250 Q 1850 300, 1760 480 Q 1670 660, 1780 870 Q 1890 1000, 2000 1100')" }}
        />

        {/* Pulse 5 - Bottom wave */}
        <motion.circle
          r="7"
          fill="#22d3ee"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 0.5, repeatDelay: 2 }}
          style={{ offsetPath: "path('M-100 850 Q 200 800, 500 870 Q 800 940, 1100 850 Q 1400 760, 1700 840 Q 1900 900, 2050 870')" }}
        />

        {/* Pulse 6 - Left green */}
        <motion.circle
          r="5"
          fill="#34d399"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 4, repeatDelay: 2 }}
          style={{ offsetPath: "path('M-60 350 Q 80 400, 180 550 Q 280 700, 380 820 Q 480 940, 650 1100')" }}
        />

        {/* Pulse 7 - Right pink */}
        <motion.circle
          r="5"
          fill="#f472b6"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.5, repeatDelay: 2.5 }}
          style={{ offsetPath: "path('M2000 480 Q 1800 530, 1680 700 Q 1560 870, 1400 960 Q 1240 1050, 1050 1100')" }}
        />

        {/* Pulse 8 - Top crossing */}
        <motion.circle
          r="5"
          fill="#a78bfa"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2.5, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M-100 100 Q 300 60, 700 150 Q 1100 240, 1500 120 Q 1800 30, 2050 80')" }}
        />

        {/* Extra pulses for more activity */}
        <motion.circle
          r="4"
          fill="#a78bfa"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0, repeatDelay: 3 }}
          style={{ offsetPath: "path('M-100 -20 Q 100 -30, 250 50 Q 400 130, 500 300 Q 600 470, 550 650 Q 500 830, 450 1100')" }}
        />

        <motion.circle
          r="4"
          fill="#f87171"
          filter="url(#fiberStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5, repeatDelay: 3 }}
          style={{ offsetPath: "path('M2020 -10 Q 1820 -20, 1680 60 Q 1540 140, 1450 310 Q 1360 480, 1400 660 Q 1440 840, 1500 1100')" }}
        />
      </motion.svg>
    </div>
  )
}
