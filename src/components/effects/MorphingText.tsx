'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MorphingTextProps {
  words: string[]
  className?: string
  interval?: number
}

export default function MorphingText({
  words,
  className = '',
  interval = 3000
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  const currentWord = words[currentIndex]

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="inline-flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentWord.split('').map((char, index) => (
            <motion.span
              key={`${currentIndex}-${index}`}
              className="inline-block"
              initial={{
                opacity: 0,
                y: 20,
                rotateX: -90,
                filter: 'blur(10px)'
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: 'blur(0px)'
              }}
              exit={{
                opacity: 0,
                y: -20,
                rotateX: 90,
                filter: 'blur(10px)'
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                transformStyle: 'preserve-3d',
                display: char === ' ' ? 'inline' : 'inline-block',
                minWidth: char === ' ' ? '0.3em' : 'auto'
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>

      {/* Underline animation */}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-fiber-500 to-primary-500"
        initial={{ width: '0%' }}
        animate={{ width: isAnimating ? '0%' : '100%' }}
        transition={{
          duration: isAnimating ? 0.3 : (interval - 1000) / 1000,
          ease: 'linear'
        }}
      />
    </span>
  )
}

// Typewriter variant
export function TypewriterText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true
}: {
  text: string
  className?: string
  speed?: number
  delay?: number
  cursor?: boolean
}) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0

      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-fiber-400 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  )
}
