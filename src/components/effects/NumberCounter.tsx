'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface NumberCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
  decimals?: number
}

export default function NumberCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
  decimals = 0
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000
  })

  const displayValue = useTransform(springValue, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals)
    }
    return Math.floor(latest).toLocaleString('de-DE')
  })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  )
}
