'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface InfiniteMarqueeProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  gap?: number
}

export default function InfiniteMarquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  gap = 40
}: InfiniteMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimationControls()

  const duration = 50 / (speed / 30)

  useEffect(() => {
    if (isPaused) {
      controls.stop()
    } else {
      controls.start({
        x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        transition: {
          duration,
          ease: 'linear',
          repeat: Infinity,
        }
      })
    }
  }, [isPaused, direction, duration, controls])

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex"
        animate={controls}
        style={{ gap }}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

// Text marquee variant
export function TextMarquee({
  text,
  speed = 30,
  direction = 'left',
  className = '',
  textClassName = ''
}: {
  text: string
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  textClassName?: string
}) {
  return (
    <InfiniteMarquee speed={speed} direction={direction} className={className} gap={60}>
      {Array(4).fill(null).map((_, i) => (
        <span key={i} className={`whitespace-nowrap ${textClassName}`}>
          {text}
          <span className="mx-8 text-fiber-500">•</span>
        </span>
      ))}
    </InfiniteMarquee>
  )
}
