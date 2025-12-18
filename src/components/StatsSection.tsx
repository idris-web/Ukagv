'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Cable, FolderCheck, Home, Users } from 'lucide-react'

const stats = [
  {
    value: 24500,
    suffix: '+ km',
    label: 'Glasfaser',
    detail: 'eingeblasen',
    icon: Cable,
    color: 'from-cyan-400 to-blue-500'
  },
  {
    value: 21000,
    suffix: '+',
    label: 'Kunden',
    detail: 'zufrieden betreut',
    icon: Users,
    color: 'from-emerald-400 to-teal-500'
  },
  {
    value: 3500,
    suffix: '+',
    label: 'Hausanschlüsse',
    detail: 'pro Jahr',
    icon: Home,
    color: 'from-violet-400 to-purple-500'
  },
  {
    value: 100,
    suffix: '%',
    label: 'Einsatz',
    detail: 'landesweit',
    icon: FolderCheck,
    color: 'from-amber-400 to-orange-500'
  },
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  const formatted = count.toLocaleString('de-DE')

  return <>{formatted}{suffix}</>
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="py-16 relative">
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`} />

                <div className="relative bg-dark-800/40 backdrop-blur-sm rounded-2xl p-6 border border-dark-700/50 group-hover:border-dark-600 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  {/* Value */}
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </div>

                  {/* Label */}
                  <div className="text-white font-medium mt-1">{stat.label}</div>
                  <div className="text-sm text-dark-400">{stat.detail}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
