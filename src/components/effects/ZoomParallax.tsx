'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ZoomParallaxProps {
  children: ReactNode
  className?: string
  scaleRange?: [number, number]
  opacityRange?: [number, number]
}

export default function ZoomParallax({
  children,
  className = '',
  scaleRange = [1, 1.3],
  opacityRange = [1, 0.8]
}: ZoomParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [opacityRange[0], 1, opacityRange[1]])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        style={{ scale, opacity, y }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Hero zoom effect - zooms in as you scroll down
export function HeroZoom({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="w-full h-full origin-center"
        style={{
          scale,
          opacity,
          filter: `blur(${blur}px)`
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Image reveal zoom - image zooms out as it reveals
export function ImageRevealZoom({
  src,
  alt,
  className = ''
}: {
  src: string
  alt: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1])
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(40% 40% 40% 40%)', 'inset(0% 0% 0% 0%)']
  )

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ clipPath }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ scale }}
        />
      </motion.div>
    </div>
  )
}
