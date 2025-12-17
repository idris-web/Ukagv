'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
  speed?: number
}

export default function HorizontalScroll({
  children,
  className = '',
  speed = 1
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform vertical scroll to horizontal
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${100 * speed}%`])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: '300vh' }} // Tall container for scrolling
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex h-full items-center"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

// Individual scroll panel
export function ScrollPanel({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex-shrink-0 w-screen h-screen flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}
