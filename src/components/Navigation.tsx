'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Leistungen' },
  { href: '#about', label: 'Über uns' },
  { href: '#process', label: 'Ablauf' },
  { href: '#testimonials', label: 'Referenzen' },
  { href: '#contact', label: 'Kontakt' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass py-3'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo - UKAGV */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative flex items-center">
              {/* Fiber Optic Icon */}
              <svg viewBox="0 0 48 32" className="w-12 h-8">
                <defs>
                  <linearGradient id="navFiberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0ca5ea" />
                  </linearGradient>
                  <filter id="navGlow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Cable bundle */}
                <circle cx="6" cy="16" r="5" fill="#1e293b" stroke="#0ca5ea" strokeWidth="1" />
                {/* Fiber strands */}
                <motion.path
                  d="M11 14 Q 20 10, 30 14 T 48 12"
                  stroke="url(#navFiberGrad)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#navGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.path
                  d="M11 16 Q 20 16, 30 16 T 48 16"
                  stroke="url(#navFiberGrad)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#navGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                />
                <motion.path
                  d="M11 18 Q 20 22, 30 18 T 48 20"
                  stroke="url(#navFiberGrad)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#navGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
                {/* Glowing dots */}
                <motion.circle
                  cx="6" cy="14" r="1.5" fill="#22d3ee"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="6" cy="16" r="1.5" fill="#06b6d4"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="6" cy="18" r="1.5" fill="#22d3ee"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">
                <span className="metallic-text">UKA</span>
                <span className="gradient-text">GV</span>
              </span>
              <span className="text-[10px] text-dark-400 tracking-widest uppercase">GmbH</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-dark-300 hover:text-fiber-400 transition-colors duration-200 text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-fiber-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="btn-primary text-sm"
            >
              Kostenlose Beratung
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-dark-950/98 backdrop-blur-xl pt-24 px-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-2xl font-semibold text-white py-3 border-b border-fiber-500/20"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="btn-primary text-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kostenlose Beratung
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
