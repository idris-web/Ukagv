'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface LiquidButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  color?: string
}

export default function LiquidButton({
  children,
  className = '',
  onClick,
  href,
  color = '#06b6d4'
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const Component = href ? motion.a : motion.button

  const liquidVariants = {
    initial: {
      borderRadius: '12px',
    },
    hover: {
      borderRadius: ['12px', '20px 8px 20px 8px', '8px 20px 8px 20px', '16px'],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'mirror' as const
      }
    }
  }

  const blobVariants = {
    initial: {
      scale: 0,
      opacity: 0
    },
    hover: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity
      }
    }
  }

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={liquidVariants}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      whileTap={{ scale: 0.95 }}
    >
      {/* Liquid blob background */}
      <motion.div
        className="absolute inset-0"
        variants={blobVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="liquid-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              />
            </filter>
          </defs>
          <g filter="url(#liquid-filter)">
            <motion.ellipse
              cx="100"
              cy="40"
              rx="80"
              ry="30"
              fill={color}
              animate={isHovered ? {
                rx: [80, 90, 85, 80],
                ry: [30, 35, 32, 30],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'mirror'
              }}
            />
            <motion.circle
              cx="40"
              cy="40"
              r="20"
              fill={color}
              animate={isHovered ? {
                cx: [40, 50, 45, 40],
                cy: [40, 35, 45, 40],
                r: [20, 25, 22, 20]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'mirror'
              }}
            />
            <motion.circle
              cx="160"
              cy="40"
              r="20"
              fill={color}
              animate={isHovered ? {
                cx: [160, 150, 155, 160],
                cy: [40, 45, 35, 40],
                r: [20, 25, 22, 20]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: 0.3
              }}
            />
          </g>
        </svg>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          boxShadow: `0 0 30px ${color}40`,
        }}
        animate={isHovered ? {
          boxShadow: [`0 0 30px ${color}40`, `0 0 50px ${color}60`, `0 0 30px ${color}40`]
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      />

      {/* Content */}
      <motion.span
        className="relative z-10 block"
        animate={isHovered ? { y: [-1, 1, -1] } : {}}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'mirror'
        }}
      >
        {children}
      </motion.span>
    </Component>
  )
}
