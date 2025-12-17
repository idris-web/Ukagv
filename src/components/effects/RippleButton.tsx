'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, ReactNode } from 'react'

interface Ripple {
  x: number
  y: number
  id: number
}

interface RippleButtonProps {
  children: ReactNode
  className?: string
  rippleColor?: string
  onClick?: () => void
  href?: string
}

export default function RippleButton({
  children,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.4)',
  onClick,
  href
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = {
      x,
      y,
      id: Date.now()
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  const Component = href ? 'a' : 'button'

  return (
    <Component
      href={href}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 500, height: 500, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </Component>
  )
}
