'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'center'
  duration?: number
}

export default function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  duration = 0.8
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Calculate clip path based on direction
  const getClipPath = (progress: number) => {
    const p = Math.min(Math.max(progress * 2, 0), 1) * 100

    switch (direction) {
      case 'up':
        return `inset(${100 - p}% 0% 0% 0%)`
      case 'down':
        return `inset(0% 0% ${100 - p}% 0%)`
      case 'left':
        return `inset(0% ${100 - p}% 0% 0%)`
      case 'right':
        return `inset(0% 0% 0% ${100 - p}%)`
      case 'center':
        const half = (100 - p) / 2
        return `inset(${half}% ${half}% ${half}% ${half}%)`
      default:
        return 'inset(0% 0% 0% 0%)'
    }
  }

  const clipPath = useTransform(scrollYProgress, [0, 0.5], [getClipPath(0), getClipPath(1)])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          clipPath,
          opacity,
          scale
        }}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    </div>
  )
}
