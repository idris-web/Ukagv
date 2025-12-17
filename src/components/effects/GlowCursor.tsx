'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GlowCursorProps {
  color?: string
  size?: number
  trailLength?: number
}

export default function GlowCursor({
  color = '#06b6d4',
  size = 20,
  trailLength = 6 // Reduced default for better performance
}: GlowCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smoother spring config
  const springConfig = { damping: 30, stiffness: 250, restDelta: 0.001 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    let trailId = 0
    let lastTrailUpdate = 0
    const TRAIL_THROTTLE = 30 // Only update trail every 30ms

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      // Throttle trail updates for better performance
      const now = Date.now()
      if (now - lastTrailUpdate > TRAIL_THROTTLE) {
        lastTrailUpdate = now
        setTrail((prev) => {
          const newTrail = [
            ...prev,
            { x: e.clientX, y: e.clientY, id: trailId++ }
          ]
          return newTrail.slice(-trailLength)
        })
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTrail([]) // Clear trail on leave
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, trailLength])

  // Clean up old trail points - slower interval for smoother fade
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.length > 0 ? prev.slice(1) : prev)
    }, 80) // Slower cleanup for smoother trails

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length * 0.3
        const scale = (index + 1) / trail.length * 0.5

        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: size * scale,
              height: size * scale,
              backgroundColor: color,
              opacity,
              transform: 'translate(-50%, -50%)',
              filter: `blur(${size * scale * 0.3}px)`
            }}
          />
        )
      })}

      {/* Main cursor glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: springX,
          top: springY,
          width: size,
          height: size,
          backgroundColor: color,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
          filter: `blur(${size * 0.2}px)`
        }}
      />

      {/* Inner bright core */}
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          left: springX,
          top: springY,
          width: size / 3,
          height: size / 3,
          transform: 'translate(-50%, -50%)',
          opacity: 0.8
        }}
      />
    </div>
  )
}
