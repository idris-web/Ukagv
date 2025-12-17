'use client'

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface Layer {
  content: ReactNode
  speed: number
  className?: string
  zIndex?: number
}

interface ParallaxLayersProps {
  layers: Layer[]
  className?: string
  height?: string
}

// Individual layer component to properly use hooks
function ParallaxLayer({
  content,
  speed,
  className = '',
  zIndex = 0,
  scrollYProgress
}: {
  content: ReactNode
  speed: number
  className?: string
  zIndex?: number
  scrollYProgress: MotionValue<number>
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${speed * 100}%`]
  )

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        y,
        zIndex
      }}
    >
      {content}
    </motion.div>
  )
}

export default function ParallaxLayers({
  layers,
  className = '',
  height = '100vh'
}: ParallaxLayersProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          content={layer.content}
          speed={layer.speed}
          className={layer.className}
          zIndex={layer.zIndex || index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}

// Pre-built decorative parallax background
export function DecorativeParallax({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%'])
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const y5 = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1 - Largest, slowest */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fiber-500/5 blur-3xl"
        style={{ y: y1, scale }}
      />

      {/* Layer 2 */}
      <motion.div
        className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-primary-500/5 blur-3xl"
        style={{ y: y2, rotate: rotate1 }}
      />

      {/* Layer 3 */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-fiber-400/10 blur-2xl"
        style={{ y: y3 }}
      />

      {/* Layer 4 - Grid lines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: y4 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="parallaxGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#06b6d4" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#parallaxGrid)" />
        </svg>
      </motion.div>

      {/* Layer 5 - Small floating elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-fiber-500/30"
        style={{ y: y5, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-2/3 left-1/3 w-3 h-3 rounded-full bg-primary-500/30"
        style={{ y: y5, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-5 h-5 rounded-full bg-fiber-400/20"
        style={{ y: y3, rotate: rotate2 }}
      />
    </div>
  )
}
