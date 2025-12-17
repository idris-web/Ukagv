'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode, Children } from 'react'

interface StaggeredGridProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate'
  once?: boolean
}

export default function StaggeredGrid({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
  once = true
}: StaggeredGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 }
      case 'down':
        return { opacity: 0, y: -50 }
      case 'left':
        return { opacity: 0, x: 50 }
      case 'right':
        return { opacity: 0, x: -50 }
      case 'scale':
        return { opacity: 0, scale: 0.8 }
      case 'rotate':
        return { opacity: 0, scale: 0.8, rotate: -10 }
      default:
        return { opacity: 0, y: 50 }
    }
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  const itemVariants: Variants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Masonry grid variant with stagger
export function StaggeredMasonry({
  children,
  className = '',
  columns = 3,
  staggerDelay = 0.08
}: {
  children: ReactNode
  className?: string
  columns?: number
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const childArray = Children.toArray(children)

  // Distribute children into columns
  const columnArrays: ReactNode[][] = Array.from({ length: columns }, () => [])
  childArray.forEach((child, index) => {
    columnArrays[index % columns].push(child)
  })

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`grid gap-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {columnArrays.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6">
          {column.map((child, itemIndex) => (
            <motion.div
              key={itemIndex}
              variants={itemVariants}
              custom={colIndex * childArray.length / columns + itemIndex}
            >
              {child}
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  )
}
