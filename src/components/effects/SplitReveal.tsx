'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SplitRevealProps {
  children: ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  leftColor?: string
  rightColor?: string
}

export default function SplitReveal({
  children,
  className = '',
  direction = 'horizontal',
  leftColor = '#06b6d4',
  rightColor = '#3b82f6'
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const leftTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' ? ['-100%', '0%'] : ['0%', '0%']
  )

  const rightTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' ? ['100%', '0%'] : ['0%', '0%']
  )

  const leftY = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? ['-100%', '0%'] : ['0%', '0%']
  )

  const rightY = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? ['100%', '0%'] : ['0%', '0%']
  )

  const contentOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1])
  const contentScale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Left/Top panel */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          x: leftTranslate,
          y: leftY,
          clipPath: direction === 'horizontal'
            ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
            : 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
          background: `linear-gradient(135deg, ${leftColor}20, ${leftColor}40)`
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${leftColor}30, transparent 70%)`
          }}
        />
      </motion.div>

      {/* Right/Bottom panel */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          x: rightTranslate,
          y: rightY,
          clipPath: direction === 'horizontal'
            ? 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
            : 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
          background: `linear-gradient(135deg, ${rightColor}20, ${rightColor}40)`
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 50%, ${rightColor}30, transparent 70%)`
          }}
        />
      </motion.div>

      {/* Content revealed behind */}
      <motion.div
        className="relative z-20"
        style={{
          opacity: contentOpacity,
          scale: contentScale
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
