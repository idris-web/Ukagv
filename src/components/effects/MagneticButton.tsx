'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Rotation based on mouse position
  const rotateX = useTransform(springY, [-50, 50], [10, -10])
  const rotateY = useTransform(springX, [-50, 50], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Component = href ? motion.a : motion.button

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={className}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
          className="block"
        >
          {children}
        </motion.span>
      </Component>
    </motion.div>
  )
}
