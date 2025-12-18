'use client'

import { useEffect, useState, memo } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// SIDE CABLES - Links und Rechts, oval verteilt
// ═══════════════════════════════════════════════════════════════════════════════

interface SideCable {
  id: string
  color: string
  side: 'left' | 'right'
  startY: number
  curveIntensity: number
  duration: number
}

// Cyan + Magenta/Pink Farbpalette
const COLORS = {
  cyan: '#00D4FF',
  cyanLight: '#00FFFF',
  magenta: '#FF00FF',
  pink: '#FF69B4',
  purple: '#A855F7',
  blue: '#3B82F6',
}

const CANVAS = {
  width: 1920,
  height: 900,
}

// Konvergenzpunkt - UNTER dem Text
const CONVERGE = { x: 960, y: 820 }

// Kabel von links und rechts - schön verteilt
const SIDE_CABLES: SideCable[] = [
  // LINKE SEITE - Cyan Töne
  { id: 'left-1', color: COLORS.cyan, side: 'left', startY: 80, curveIntensity: 0.3, duration: 3.0 },
  { id: 'left-2', color: COLORS.cyanLight, side: 'left', startY: 180, curveIntensity: 0.4, duration: 3.3 },
  { id: 'left-3', color: COLORS.cyan, side: 'left', startY: 300, curveIntensity: 0.5, duration: 3.6 },
  { id: 'left-4', color: COLORS.cyanLight, side: 'left', startY: 420, curveIntensity: 0.6, duration: 3.9 },
  { id: 'left-5', color: COLORS.cyan, side: 'left', startY: 550, curveIntensity: 0.5, duration: 3.4 },
  { id: 'left-6', color: COLORS.blue, side: 'left', startY: 680, curveIntensity: 0.3, duration: 3.1 },

  // RECHTE SEITE - Magenta/Pink Töne
  { id: 'right-1', color: COLORS.magenta, side: 'right', startY: 80, curveIntensity: 0.3, duration: 3.1 },
  { id: 'right-2', color: COLORS.pink, side: 'right', startY: 180, curveIntensity: 0.4, duration: 3.4 },
  { id: 'right-3', color: COLORS.magenta, side: 'right', startY: 300, curveIntensity: 0.5, duration: 3.7 },
  { id: 'right-4', color: COLORS.pink, side: 'right', startY: 420, curveIntensity: 0.6, duration: 4.0 },
  { id: 'right-5', color: COLORS.magenta, side: 'right', startY: 550, curveIntensity: 0.5, duration: 3.5 },
  { id: 'right-6', color: COLORS.purple, side: 'right', startY: 680, curveIntensity: 0.3, duration: 3.2 },
]

// Kabel von unten - links und rechts
interface BottomCable {
  id: string
  color: string
  path: string
  duration: number
}

const BOTTOM_CABLES: BottomCable[] = [
  // Von unten-links Ecke - länger
  {
    id: 'bottom-left',
    color: COLORS.purple,
    path: `M -400 950 C -100 870, 400 830, ${CONVERGE.x} ${CONVERGE.y}`,
    duration: 4.0
  },
  // Von unten-rechts Ecke - länger
  {
    id: 'bottom-right',
    color: COLORS.blue,
    path: `M 2320 950 C 2020 870, 1520 830, ${CONVERGE.x} ${CONVERGE.y}`,
    duration: 4.2
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// PATH GENERATOR - Elegante Kurven von Seite zum Konvergenzpunkt
// ═══════════════════════════════════════════════════════════════════════════════

function createCablePath(cable: SideCable): string {
  const isLeft = cable.side === 'left'
  const startX = isLeft ? -30 : CANVAS.width + 30
  const startY = cable.startY

  // Kontrollpunkte für schöne Bezier-Kurve
  const cp1X = isLeft ? 250 + cable.curveIntensity * 150 : CANVAS.width - 250 - cable.curveIntensity * 150
  const cp1Y = startY + (CONVERGE.y - startY) * 0.3

  const cp2X = isLeft ? 500 + cable.curveIntensity * 100 : CANVAS.width - 500 - cable.curveIntensity * 100
  const cp2Y = startY + (CONVERGE.y - startY) * 0.7

  return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${CONVERGE.x} ${CONVERGE.y}`
}

// ═══════════════════════════════════════════════════════════════════════════════
// CABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const SideCableLine = memo(function SideCableLine({
  cable,
}: {
  cable: SideCable
}) {
  const path = createCablePath(cable)
  const opacity = 0.45
  const glowOpacity = 0.15

  return (
    <g>
      {/* Outer glow */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={12}
        fill="none"
        opacity={glowOpacity * 0.5}
        strokeLinecap="round"
      />

      {/* Inner glow */}
      <path
        d={path}
        stroke={cable.color}
        strokeWidth={5}
        fill="none"
        opacity={glowOpacity}
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

      {/* Animierter Lichtpuls - nach außen */}
      <circle r={4} fill="white" opacity={0.95}>
        <animateMotion
          dur={`${cable.duration}s`}
          repeatCount="indefinite"
          path={path}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="0.8s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="3;5;3"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Zweiter Puls versetzt - nach außen */}
      <circle r={3} fill={cable.color} opacity={0.85}>
        <animateMotion
          dur={`${cable.duration * 1.1}s`}
          repeatCount="indefinite"
          path={path}
          begin={`${cable.duration * 0.4}s`}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.95;0.4"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
})

// ═══════════════════════════════════════════════════════════════════════════════
// BOTTOM CABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const BottomCableLine = memo(function BottomCableLine({
  cable,
}: {
  cable: BottomCable
}) {
  const opacity = 0.45
  const glowOpacity = 0.15

  return (
    <g>
      {/* Outer glow */}
      <path
        d={cable.path}
        stroke={cable.color}
        strokeWidth={12}
        fill="none"
        opacity={glowOpacity * 0.5}
        strokeLinecap="round"
      />

      {/* Inner glow */}
      <path
        d={cable.path}
        stroke={cable.color}
        strokeWidth={5}
        fill="none"
        opacity={glowOpacity}
        strokeLinecap="round"
      />

      {/* Core line */}
      <path
        d={cable.path}
        stroke={cable.color}
        strokeWidth={2}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
      />

      {/* Animierter Lichtpuls - nach außen */}
      <circle r={4} fill="white" opacity={0.95}>
        <animateMotion
          dur={`${cable.duration}s`}
          repeatCount="indefinite"
          path={cable.path}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="0.8s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="3;5;3"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Zweiter Puls versetzt - nach außen */}
      <circle r={3} fill={cable.color} opacity={0.85}>
        <animateMotion
          dur={`${cable.duration * 1.1}s`}
          repeatCount="indefinite"
          path={cable.path}
          begin={`${cable.duration * 0.4}s`}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.95;0.4"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
})

// ═══════════════════════════════════════════════════════════════════════════════
// CENTER GLOW - Kleiner leuchtender Punkt wo Kabel konvergieren
// ═══════════════════════════════════════════════════════════════════════════════

const ConvergeGlow = memo(function ConvergeGlow() {
  return (
    <g>
      {/* Äußerer Glow */}
      <circle
        cx={CONVERGE.x}
        cy={CONVERGE.y}
        r={60}
        fill="url(#convergeGradient)"
        opacity={0.4}
      />
      {/* Innerer Kern */}
      <circle
        cx={CONVERGE.x}
        cy={CONVERGE.y}
        r={15}
        fill="white"
        opacity={0.7}
      >
        <animate
          attributeName="r"
          values="12;18;12"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0.9;0.5"
          dur="2s"
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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="absolute top-0 left-0 right-0 h-screen pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <svg
        className="absolute w-full h-screen"
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="convergeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor={COLORS.cyan} stopOpacity="0.5" />
            <stop offset="100%" stopColor={COLORS.magenta} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Kabel von beiden Seiten */}
        <g>
          {SIDE_CABLES.map((cable) => (
            <SideCableLine key={cable.id} cable={cable} />
          ))}
        </g>

        {/* Kabel von unten */}
        <g>
          {BOTTOM_CABLES.map((cable) => (
            <BottomCableLine key={cable.id} cable={cable} />
          ))}
        </g>

        {/* Konvergenz-Leuchtpunkt */}
        <ConvergeGlow />
      </svg>
    </div>
  )
}
