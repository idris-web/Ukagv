'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface FiberCableOverlayProps {
  intensity?: 'high' | 'medium' | 'low'
  className?: string
}

export default function FiberCableOverlay({ intensity = 'high', className = '' }: FiberCableOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Reduce animation intensity based on scroll
  const opacityMultiplier = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.7, 0.4, 0.2])

  const baseOpacity = intensity === 'high' ? 0.6 : intensity === 'medium' ? 0.4 : 0.25

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient definitions for fiber colors */}
          <linearGradient id="fiberCyanAnim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#06b6d4" />
            <stop offset="90%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberBlueAnim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#3b82f6" />
            <stop offset="90%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberGreenAnim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#10b981" />
            <stop offset="90%" stopColor="#34d399" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberOrangeAnim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberTealAnim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#14b8a6" />
            <stop offset="90%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberPurpleAnim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#8b5cf6" />
            <stop offset="90%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberPinkAnim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#ec4899" />
            <stop offset="90%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="cableGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========== LEFT SIDE CABLES - ANIMATED ========== */}

        {/* Cable 1 - Top Left - Flowing wave */}
        <motion.path
          d="M-100 50 Q 200 30, 350 150 Q 500 280, 400 450 Q 300 620, 150 700"
          stroke="url(#fiberCyanAnim)"
          strokeWidth="3"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity,
            d: [
              "M-100 50 Q 200 30, 350 150 Q 500 280, 400 450 Q 300 620, 150 700",
              "M-100 80 Q 180 60, 380 170 Q 520 300, 380 470 Q 280 640, 120 720",
              "M-100 50 Q 200 30, 350 150 Q 500 280, 400 450 Q 300 620, 150 700",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut" },
            opacity: { duration: 1 },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cable 2 - Mid Left */}
        <motion.path
          d="M-80 200 Q 150 250, 200 400 Q 250 550, 100 750 Q -50 950, -100 1100"
          stroke="url(#fiberBlueAnim)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity * 0.8,
            d: [
              "M-80 200 Q 150 250, 200 400 Q 250 550, 100 750 Q -50 950, -100 1100",
              "M-80 220 Q 130 280, 220 420 Q 270 570, 120 770 Q -30 970, -80 1100",
              "M-80 200 Q 150 250, 200 400 Q 250 550, 100 750 Q -50 950, -100 1100",
            ]
          }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeOut", delay: 0.3 },
            opacity: { duration: 1, delay: 0.3 },
            d: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />

        {/* Cable 3 - Bottom Left */}
        <motion.path
          d="M-50 400 Q 100 450, 180 600 Q 260 750, 350 850 Q 450 950, 600 1000"
          stroke="url(#fiberGreenAnim)"
          strokeWidth="2"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity * 0.7,
            d: [
              "M-50 400 Q 100 450, 180 600 Q 260 750, 350 850 Q 450 950, 600 1000",
              "M-50 420 Q 120 470, 200 620 Q 280 770, 370 870 Q 470 970, 620 1020",
              "M-50 400 Q 100 450, 180 600 Q 260 750, 350 850 Q 450 950, 600 1000",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut", delay: 0.5 },
            opacity: { duration: 1, delay: 0.5 },
            d: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        />

        {/* ========== RIGHT SIDE CABLES - ANIMATED ========== */}

        {/* Cable 4 - Top Right */}
        <motion.path
          d="M2020 80 Q 1750 50, 1580 180 Q 1400 320, 1500 500 Q 1600 680, 1800 780"
          stroke="url(#fiberOrangeAnim)"
          strokeWidth="3"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity,
            d: [
              "M2020 80 Q 1750 50, 1580 180 Q 1400 320, 1500 500 Q 1600 680, 1800 780",
              "M2020 100 Q 1730 70, 1560 200 Q 1380 340, 1480 520 Q 1580 700, 1780 800",
              "M2020 80 Q 1750 50, 1580 180 Q 1400 320, 1500 500 Q 1600 680, 1800 780",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut", delay: 0.2 },
            opacity: { duration: 1, delay: 0.2 },
            d: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        />

        {/* Cable 5 - Mid Right */}
        <motion.path
          d="M2050 300 Q 1850 350, 1780 500 Q 1700 650, 1800 850 Q 1900 1050, 2000 1100"
          stroke="url(#fiberTealAnim)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity * 0.8,
            d: [
              "M2050 300 Q 1850 350, 1780 500 Q 1700 650, 1800 850 Q 1900 1050, 2000 1100",
              "M2050 320 Q 1830 370, 1760 520 Q 1680 670, 1780 870 Q 1880 1070, 1980 1120",
              "M2050 300 Q 1850 350, 1780 500 Q 1700 650, 1800 850 Q 1900 1050, 2000 1100",
            ]
          }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeOut", delay: 0.4 },
            opacity: { duration: 1, delay: 0.4 },
            d: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        />

        {/* Cable 6 - Bottom Right */}
        <motion.path
          d="M2000 550 Q 1800 600, 1700 750 Q 1600 900, 1450 980 Q 1300 1060, 1100 1100"
          stroke="url(#fiberPurpleAnim)"
          strokeWidth="2"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity * 0.7,
            d: [
              "M2000 550 Q 1800 600, 1700 750 Q 1600 900, 1450 980 Q 1300 1060, 1100 1100",
              "M2000 570 Q 1780 620, 1680 770 Q 1580 920, 1430 1000 Q 1280 1080, 1080 1120",
              "M2000 550 Q 1800 600, 1700 750 Q 1600 900, 1450 980 Q 1300 1060, 1100 1100",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut", delay: 0.6 },
            opacity: { duration: 1, delay: 0.6 },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
          }}
        />

        {/* ========== CROSSING CABLES - DYNAMIC ========== */}

        {/* Cross Cable 1 - Top flowing across */}
        <motion.path
          d="M-100 150 Q 400 100, 800 200 Q 1200 300, 1600 150 Q 1800 80, 2020 120"
          stroke="url(#fiberPinkAnim)"
          strokeWidth="2"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity * 0.5,
            d: [
              "M-100 150 Q 400 100, 800 200 Q 1200 300, 1600 150 Q 1800 80, 2020 120",
              "M-100 170 Q 400 130, 800 230 Q 1200 330, 1600 180 Q 1800 110, 2020 150",
              "M-100 130 Q 400 80, 800 180 Q 1200 280, 1600 130 Q 1800 60, 2020 100",
              "M-100 150 Q 400 100, 800 200 Q 1200 300, 1600 150 Q 1800 80, 2020 120",
            ]
          }}
          transition={{
            pathLength: { duration: 3, ease: "easeOut", delay: 0.8 },
            opacity: { duration: 1.5, delay: 0.8 },
            d: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cross Cable 2 - Bottom wave */}
        <motion.path
          d="M-50 900 Q 300 850, 600 920 Q 900 990, 1200 900 Q 1500 810, 1800 880 Q 1950 920, 2050 950"
          stroke="url(#fiberCyanAnim)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#cableGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: baseOpacity * 0.6,
            d: [
              "M-50 900 Q 300 850, 600 920 Q 900 990, 1200 900 Q 1500 810, 1800 880 Q 1950 920, 2050 950",
              "M-50 920 Q 300 870, 600 940 Q 900 1010, 1200 920 Q 1500 830, 1800 900 Q 1950 940, 2050 970",
              "M-50 880 Q 300 830, 600 900 Q 900 970, 1200 880 Q 1500 790, 1800 860 Q 1950 900, 2050 930",
              "M-50 900 Q 300 850, 600 920 Q 900 990, 1200 900 Q 1500 810, 1800 880 Q 1950 920, 2050 950",
            ]
          }}
          transition={{
            pathLength: { duration: 3.5, ease: "easeOut", delay: 1 },
            opacity: { duration: 1.5, delay: 1 },
            d: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        />

        {/* ========== LIGHT PULSES ALONG CABLES ========== */}

        {/* Pulse 1 */}
        <motion.circle
          r="6"
          fill="#22d3ee"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          style={{ offsetPath: "path('M-100 50 Q 200 30, 350 150 Q 500 280, 400 450 Q 300 620, 150 700')" }}
        />

        {/* Pulse 2 */}
        <motion.circle
          r="5"
          fill="#60a5fa"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M-80 200 Q 150 250, 200 400 Q 250 550, 100 750 Q -50 950, -100 1100')" }}
        />

        {/* Pulse 3 */}
        <motion.circle
          r="6"
          fill="#fbbf24"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1, repeatDelay: 2 }}
          style={{ offsetPath: "path('M2020 80 Q 1750 50, 1580 180 Q 1400 320, 1500 500 Q 1600 680, 1800 780')" }}
        />

        {/* Pulse 4 */}
        <motion.circle
          r="5"
          fill="#2dd4bf"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 3, repeatDelay: 1 }}
          style={{ offsetPath: "path('M2050 300 Q 1850 350, 1780 500 Q 1700 650, 1800 850 Q 1900 1050, 2000 1100')" }}
        />

        {/* Pulse 5 - Cross cable */}
        <motion.circle
          r="5"
          fill="#f472b6"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 0.5, repeatDelay: 2 }}
          style={{ offsetPath: "path('M-100 150 Q 400 100, 800 200 Q 1200 300, 1600 150 Q 1800 80, 2020 120')" }}
        />

        {/* Pulse 6 - Bottom wave */}
        <motion.circle
          r="6"
          fill="#22d3ee"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2.5, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M-50 900 Q 300 850, 600 920 Q 900 990, 1200 900 Q 1500 810, 1800 880 Q 1950 920, 2050 950')" }}
        />

        {/* Pulse 7 */}
        <motion.circle
          r="4"
          fill="#34d399"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 4, repeatDelay: 2 }}
          style={{ offsetPath: "path('M-50 400 Q 100 450, 180 600 Q 260 750, 350 850 Q 450 950, 600 1000')" }}
        />

        {/* Pulse 8 */}
        <motion.circle
          r="4"
          fill="#a78bfa"
          filter="url(#strongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.5, repeatDelay: 2.5 }}
          style={{ offsetPath: "path('M2000 550 Q 1800 600, 1700 750 Q 1600 900, 1450 980 Q 1300 1060, 1100 1100')" }}
        />
      </svg>
    </div>
  )
}
