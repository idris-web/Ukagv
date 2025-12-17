'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { num: '01', title: 'Anfrage', desc: 'Sie kontaktieren uns' },
  { num: '02', title: 'Vor-Ort-Termin', desc: 'Wir besichtigen' },
  { num: '03', title: 'Angebot', desc: 'Transparent & fair' },
  { num: '04', title: 'Umsetzung', desc: 'Professionell & pünktlich' },
  { num: '05', title: 'Fertig', desc: 'Sie surfen los' },
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="process" className="py-32 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            So einfach geht's
          </h2>
          <p className="text-dark-400 text-lg">
            Von der Anfrage zum schnellen Internet
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-6 p-4 rounded-xl bg-dark-900/30 border border-dark-800/50"
            >
              <span className="text-2xl font-bold text-fiber-500/50">{step.num}</span>
              <div className="text-left">
                <div className="font-semibold text-white">{step.title}</div>
                <div className="text-sm text-dark-400">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
