'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface FiberCableProps {
  className?: string
}

export default function FiberCable({ className = '' }: FiberCableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 800"
        className="absolute w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fiberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Fiber Cable Path */}
        <motion.path
          d="M-100 400 Q 200 200, 400 350 T 700 300 T 1000 400 T 1300 350"
          stroke="url(#fiberGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          style={{ pathLength }}
        />

        {/* Secondary Fiber Paths */}
        <motion.path
          d="M-50 500 Q 250 350, 450 450 T 750 400 T 1050 500 T 1350 450"
          stroke="url(#fiberGradient)"
          strokeWidth="2"
          fill="none"
          opacity={0.5}
          filter="url(#glow)"
          style={{ pathLength }}
        />

        <motion.path
          d="M-100 300 Q 200 450, 400 250 T 700 350 T 1000 250 T 1300 300"
          stroke="url(#fiberGradient)"
          strokeWidth="2"
          fill="none"
          opacity={0.3}
          filter="url(#glow)"
          style={{ pathLength }}
        />

        {/* Glowing Dots along the path */}
        <motion.circle
          cx="400"
          cy="350"
          r="6"
          fill="#0ea5e9"
          filter="url(#glow)"
          style={{ opacity: glowOpacity }}
        />
        <motion.circle
          cx="700"
          cy="300"
          r="6"
          fill="#d946ef"
          filter="url(#glow)"
          style={{ opacity: glowOpacity }}
        />
        <motion.circle
          cx="1000"
          cy="400"
          r="6"
          fill="#0ea5e9"
          filter="url(#glow)"
          style={{ opacity: glowOpacity }}
        />
      </svg>
    </div>
  )
}
