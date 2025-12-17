'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextScrambleProps {
  text: string
  className?: string
  duration?: number
  delay?: number
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function TextScramble({
  text,
  className = '',
  duration = 1500,
  delay = 0
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      let iteration = 0
      const maxIterations = text.length * 3
      const intervalTime = duration / maxIterations

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '

              // Characters that are already revealed
              if (index < iteration / 3) {
                return text[index]
              }

              // Scramble remaining characters
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )

        iteration++

        if (iteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
          setIsComplete(true)
        }
      }, intervalTime)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, duration, delay, isInView])

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      {displayText || text.split('').map(() => chars[0]).join('')}
      {!isComplete && isInView && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-fiber-400 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.span>
  )
}
