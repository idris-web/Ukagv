'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { href: '#services', label: 'Leistungen' },
  { href: '#about', label: 'Über uns' },
  { href: '#projects', label: 'Projekte' },
  { href: '#karriere', label: 'Karriere' },
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 py-4 bg-dark-950/80 backdrop-blur-lg border-b border-white/5"
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo - Animated */}
          <a href="#home" className="flex items-center group">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              {/* Glow background */}
              <motion.div
                className="absolute -inset-2 rounded-lg bg-gradient-to-r from-fiber-400/20 via-blue-500/20 to-fiber-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'linear-gradient(90deg, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.2) 50%, rgba(6,182,212,0.2) 100%)',
                    'linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.2) 50%, rgba(59,130,246,0.2) 100%)',
                    'linear-gradient(90deg, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.2) 50%, rgba(6,182,212,0.2) 100%)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              <span className="relative text-xl md:text-2xl font-black tracking-tight">
                <motion.span
                  className="text-white"
                  whileHover={{ textShadow: '0 0 8px rgba(255,255,255,0.5)' }}
                >
                  UKA
                </motion.span>
                <motion.span
                  className="text-fiber-400"
                  animate={{
                    textShadow: [
                      '0 0 4px rgba(6,182,212,0.3)',
                      '0 0 12px rgba(6,182,212,0.6)',
                      '0 0 4px rgba(6,182,212,0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  -GV
                </motion.span>
              </span>

              {/* Fiber line under logo */}
              <motion.div
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-fiber-400 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 text-base text-dark-300 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-fiber-400 group-hover:w-6 transition-all duration-300" />
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              className="ml-6 flex items-center gap-2 px-6 py-2.5 text-base font-medium text-dark-950 bg-fiber-400 rounded-full hover:bg-fiber-300 transition-colors"
            >
              Kontakt
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-400 hover:text-white transition-colors"
            aria-label="Menü"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-950/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col min-h-screen">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <motion.span
                  className="text-xl font-black"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-white">UKA</span>
                  <motion.span
                    className="text-fiber-400"
                    animate={{
                      textShadow: [
                        '0 0 4px rgba(6,182,212,0.3)',
                        '0 0 12px rgba(6,182,212,0.6)',
                        '0 0 4px rgba(6,182,212,0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    -GV
                  </motion.span>
                </motion.span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-dark-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl text-white font-light"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex items-center gap-2 px-8 py-3 text-lg font-medium text-dark-950 bg-fiber-400 rounded-full"
                >
                  Kontakt
                  <ArrowRight size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
