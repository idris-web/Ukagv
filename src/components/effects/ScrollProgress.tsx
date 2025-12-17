'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressProps {
  position?: 'top' | 'bottom' | 'left' | 'right'
  color?: string
  height?: number
}

export default function ScrollProgress({
  position = 'top',
  color = 'from-fiber-500 via-primary-500 to-fiber-400',
  height = 3
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const isHorizontal = position === 'top' || position === 'bottom'

  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 bottom-0 left-0',
    right: 'top-0 bottom-0 right-0'
  }

  return (
    <motion.div
      className={`fixed z-50 ${positionClasses[position]} bg-gradient-to-r ${color}`}
      style={{
        scaleX: isHorizontal ? scaleX : 1,
        scaleY: isHorizontal ? 1 : scaleX,
        transformOrigin: isHorizontal ? 'left' : 'top',
        height: isHorizontal ? height : '100%',
        width: isHorizontal ? '100%' : height,
      }}
    />
  )
}
