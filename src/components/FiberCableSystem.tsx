'use client'

import { useScroll, useSpring } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// DIAGONAL CABLES CONFIG - Daxnet Style
// ═══════════════════════════════════════════════════════════════════════════════

interface DiagonalCable {
  id: string
  color: string
  startX: number  // % von rechts (oben)
  endX: number    // % von links (unten)
  index: number
}

// 8 Kabel diagonal von oben-rechts nach unten-links
const DIAGONAL_CABLES: DiagonalCable[] = [
  { id: 'rot', color: '#FF0000', startX: 95, endX: 5, index: 0 },
  { id: 'gruen', color: '#00DD00', startX: 91, endX: 9, index: 1 },
  { id: 'blau', color: '#0066FF', startX: 87, endX: 13, index: 2 },
  { id: 'gelb', color: '#FFEE00', startX: 83, endX: 17, index: 3 },
  { id: 'hellrot', color: '#FF6B6B', startX: 79, endX: 21, index: 4 },
  { id: 'violett', color: '#A855F7', startX: 75, endX: 25, index: 5 },
  { id: 'rosa', color: '#FF69B4', startX: 71, endX: 29, index: 6 },
  { id: 'orange', color: '#FF8C00', startX: 67, endX: 33, index: 7 },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS
// ═══════════════════════════════════════════════════════════════════════════════

const CANVAS = {
  width: 1920,
  height: 6000,
}

// ═══════════════════════════════════════════════════════════════════════════════
// DIAGONAL FIBER CABLE - Dezent hinter Content
// ═══════════════════════════════════════════════════════════════════════════════

const STRAND_THICKNESS = 2

const DiagonalFiberCable = memo(function DiagonalFiberCable({
  cable,
  progress
}: {
  cable: DiagonalCable
  progress: number
}) {
  // Positionen berechnen
  const startX = (cable.startX / 100) * CANVAS.width
  const startY = -100 + cable.index * 40  // Gestaffelt oben
  const endX = (cable.endX / 100) * CANVAS.width
  const endY = CANVAS.height + 100

  // Sanfte S-Kurve durch die Mitte
  const cp1X = startX - 150
  const cp1Y = CANVAS.height * 0.25
  const cp2X = endX + 150
  const cp2Y = CANVAS.height * 0.75

  const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`

  // Dezente Opacity (0.15 → 0.25 beim Scrollen)
  const opacity = 0.15 + progress * 0.10
  const glowOpacity = 0.05 + progress * 0.05

  return (
    <g>
      {/* Outer glow - sehr dezent */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={STRAND_THICKNESS + 8}
        fill="none"
        opacity={glowOpacity * 0.5}
        strokeLinecap="round"
      />

      {/* Inner glow */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={STRAND_THICKNESS + 4}
        fill="none"
        opacity={glowOpacity}
        strokeLinecap="round"
      />

      {/* Core line */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={STRAND_THICKNESS}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
      />

      {/* Animierter Lichtpuls */}
      <circle r={3} fill="white" opacity={0.8}>
        <animateMotion
          dur={`${3 + cable.index * 0.4}s`}
          repeatCount="indefinite"
          path={path}
        />
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="2;4;2"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
})

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function FiberCableSystem() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
  })

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      setProgress((prev) => {
        if (Math.abs(v - prev) > 0.002) return v
        return prev
      })
    })
    return unsubscribe
  }, [smoothProgress])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1, willChange: 'auto' }}  // z-1: hinter Content (z-10)
    >
      <svg
        className="absolute w-full"
        style={{ height: '600vh', top: 0 }}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        preserveAspectRatio="xMidYMin slice"
      >
        <g>
          {DIAGONAL_CABLES.map((cable) => (
            <DiagonalFiberCable key={cable.id} cable={cable} progress={progress} />
          ))}
        </g>
      </svg>
    </div>
  )
}
