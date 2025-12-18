'use client'

import { useScroll, useSpring } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// CONVERGING NETWORK CABLES - Neon Style
// ═══════════════════════════════════════════════════════════════════════════════

interface NetworkCable {
  id: string
  color: string
  startX: number
  startY: number
  angle: number  // Winkel in Grad
  length: number
}

// Cyan + Magenta/Pink Farbpalette wie im Bild
const COLORS = {
  cyan: '#00D4FF',
  cyanLight: '#00FFFF',
  magenta: '#FF00FF',
  pink: '#FF69B4',
  purple: '#A855F7',
  blue: '#3B82F6',
}

// Konvergenzpunkt in der Mitte des Hero-Bereichs
const CENTER = { x: 960, y: 600 }

// Kabel von allen Richtungen zur Mitte
const NETWORK_CABLES: NetworkCable[] = [
  // Von oben
  { id: 'top1', color: COLORS.cyan, startX: 700, startY: -50, angle: 80, length: 700 },
  { id: 'top2', color: COLORS.cyanLight, startX: 960, startY: -50, angle: 90, length: 650 },
  { id: 'top3', color: COLORS.cyan, startX: 1220, startY: -50, angle: 100, length: 700 },

  // Von rechts
  { id: 'right1', color: COLORS.magenta, startX: 1970, startY: 300, angle: 170, length: 1100 },
  { id: 'right2', color: COLORS.pink, startX: 1970, startY: 600, angle: 180, length: 1010 },
  { id: 'right3', color: COLORS.magenta, startX: 1970, startY: 900, angle: 190, length: 1100 },

  // Von unten
  { id: 'bottom1', color: COLORS.purple, startX: 700, startY: 1250, angle: 280, length: 700 },
  { id: 'bottom2', color: COLORS.blue, startX: 960, startY: 1250, angle: 270, length: 650 },
  { id: 'bottom3', color: COLORS.purple, startX: 1220, startY: 1250, angle: 260, length: 700 },

  // Von links
  { id: 'left1', color: COLORS.cyan, startX: -50, startY: 300, angle: 10, length: 1100 },
  { id: 'left2', color: COLORS.cyanLight, startX: -50, startY: 600, angle: 0, length: 1010 },
  { id: 'left3', color: COLORS.cyan, startX: -50, startY: 900, angle: -10, length: 1100 },

  // Diagonale
  { id: 'diag1', color: COLORS.pink, startX: -50, startY: -50, angle: 40, length: 1400 },
  { id: 'diag2', color: COLORS.magenta, startX: 1970, startY: -50, angle: 140, length: 1400 },
  { id: 'diag3', color: COLORS.pink, startX: 1970, startY: 1250, angle: 220, length: 1400 },
  { id: 'diag4', color: COLORS.magenta, startX: -50, startY: 1250, angle: 320, length: 1400 },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CANVAS - Nur Hero-Bereich
// ═══════════════════════════════════════════════════════════════════════════════

const CANVAS = {
  width: 1920,
  height: 1200,  // Nur Hero-Höhe
}

// ═══════════════════════════════════════════════════════════════════════════════
// NETWORK CABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const NetworkCableLine = memo(function NetworkCableLine({
  cable,
  index
}: {
  cable: NetworkCable
  index: number
}) {
  // Pfad berechnen: Start → Mitte mit leichter Kurve
  const startX = cable.startX
  const startY = cable.startY

  // Kontrollpunkt für sanfte Kurve
  const midX = (startX + CENTER.x) / 2
  const midY = (startY + CENTER.y) / 2

  // Leichte Kurve basierend auf Position
  const curveOffset = 50 + index * 10
  const cpX = midX + (index % 2 === 0 ? curveOffset : -curveOffset)
  const cpY = midY + (index % 3 === 0 ? curveOffset : -curveOffset)

  const path = `M ${startX} ${startY} Q ${cpX} ${cpY} ${CENTER.x} ${CENTER.y}`

  const opacity = 0.4
  const glowOpacity = 0.15

  return (
    <g>
      {/* Outer glow */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={12}
        fill="none"
        opacity={glowOpacity}
        strokeLinecap="round"
      />

      {/* Inner glow */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={6}
        fill="none"
        opacity={glowOpacity * 2}
        strokeLinecap="round"
      />

      {/* Core line */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={2}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
      />

      {/* Animierter Lichtpuls - fährt zum Zentrum */}
      <circle r={4} fill="white" opacity={0.9}>
        <animateMotion
          dur={`${2 + index * 0.2}s`}
          repeatCount="indefinite"
          path={path}
        />
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="0.8s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="2;5;2"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Zweiter Puls versetzt */}
      <circle r={3} fill={cable.color} opacity={0.7}>
        <animateMotion
          dur={`${2.5 + index * 0.15}s`}
          repeatCount="indefinite"
          path={path}
          begin={`${0.5 + index * 0.1}s`}
        />
        <animate
          attributeName="opacity"
          values="0.2;0.8;0.2"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
})

// ═══════════════════════════════════════════════════════════════════════════════
// CENTER GLOW - Leuchtender Konvergenzpunkt
// ═══════════════════════════════════════════════════════════════════════════════

const CenterGlow = memo(function CenterGlow() {
  return (
    <g>
      {/* Äußerer Glow - groß und weich */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={120}
        fill="url(#centerGlowOuter)"
        opacity={0.3}
      />

      {/* Mittlerer Glow */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={60}
        fill="url(#centerGlowMiddle)"
        opacity={0.5}
      />

      {/* Innerer Kern - hell */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={20}
        fill="white"
        opacity={0.8}
      >
        <animate
          attributeName="r"
          values="15;25;15"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Pulsierender Ring */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={40}
        fill="none"
        stroke={COLORS.cyan}
        strokeWidth={2}
        opacity={0.5}
      >
        <animate
          attributeName="r"
          values="30;80;30"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0;0.6"
          dur="3s"
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
  const [opacity, setOpacity] = useState(1)

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
  })

  // Fade out beim Scrollen
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      // Fade out nach 30% scroll
      setOpacity(Math.max(0, 1 - v * 3))
    })
    return unsubscribe
  }, [smoothProgress])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || opacity <= 0) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1, opacity, willChange: 'opacity' }}
    >
      <svg
        className="absolute w-full h-screen"
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient für äußeren Glow */}
          <radialGradient id="centerGlowOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.8" />
            <stop offset="50%" stopColor={COLORS.magenta} stopOpacity="0.3" />
            <stop offset="100%" stopColor={COLORS.purple} stopOpacity="0" />
          </radialGradient>

          {/* Gradient für mittleren Glow */}
          <radialGradient id="centerGlowMiddle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor={COLORS.cyanLight} stopOpacity="0.6" />
            <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Kabel von allen Seiten */}
        <g>
          {NETWORK_CABLES.map((cable, index) => (
            <NetworkCableLine key={cable.id} cable={cable} index={index} />
          ))}
        </g>

        {/* Zentraler Leuchtpunkt */}
        <CenterGlow />
      </svg>
    </div>
  )
}
