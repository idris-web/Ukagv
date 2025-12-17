'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface GradientMeshProps {
  className?: string
  colors?: string[]
  speed?: number
}

export default function GradientMesh({
  className = '',
  colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#06b6d4'],
  speed = 1
}: GradientMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    // Create gradient blobs
    const blobs = colors.map((color, index) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 200 + Math.random() * 200,
      color,
      speedX: (Math.random() - 0.5) * 0.5 * speed,
      speedY: (Math.random() - 0.5) * 0.5 * speed,
      phase: index * (Math.PI * 2) / colors.length
    }))

    const animate = () => {
      time += 0.01 * speed

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw each blob
      blobs.forEach((blob, index) => {
        // Update position with sine wave motion
        blob.x += blob.speedX + Math.sin(time + blob.phase) * 0.5
        blob.y += blob.speedY + Math.cos(time + blob.phase) * 0.5

        // Wrap around edges
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius

        // Pulsing radius
        const pulsingRadius = blob.radius + Math.sin(time * 2 + blob.phase) * 50

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          pulsingRadius
        )

        gradient.addColorStop(0, blob.color + '40')
        gradient.addColorStop(0.5, blob.color + '20')
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, pulsingRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [colors, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ filter: 'blur(60px)' }}
    />
  )
}
