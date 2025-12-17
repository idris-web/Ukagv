'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface CardTilt3DProps {
  children: ReactNode
  className?: string
  glareEnabled?: boolean
  tiltAmount?: number
  perspective?: number
}

export default function CardTilt3D({
  children,
  className = '',
  glareEnabled = true,
  tiltAmount = 15,
  perspective = 1000
}: CardTilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 300 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [0, 1], [tiltAmount, -tiltAmount])
  const rotateY = useTransform(springX, [0, 1], [-tiltAmount, tiltAmount])

  // Glare position
  const glareX = useTransform(springX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(springY, [0, 1], ['0%', '100%'])
  const glareOpacity = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(
        Math.pow(latestX - 0.5, 2) + Math.pow(latestY - 0.5, 2)
      )
      return distance * 0.5
    }
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const xPos = (e.clientX - rect.left) / rect.width
    const yPos = (e.clientY - rect.top) / rect.height

    x.set(xPos)
    y.set(yPos)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: 'preserve-3d'
      }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare overlay */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.3) 0%, transparent 60%)`
            }}
          />
        )}

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              105deg,
              transparent 40%,
              rgba(255,255,255,0.05) 45%,
              rgba(255,255,255,0.1) 50%,
              rgba(255,255,255,0.05) 55%,
              transparent 60%
            )`,
            opacity: glareOpacity
          }}
        />
      </motion.div>
    </motion.div>
  )
}
