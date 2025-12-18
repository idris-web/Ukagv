'use client'

import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Phone, MessageCircle, X, ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { scrollY } = useScroll()

  // Show floating CTA after scrolling past hero section
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 500)
    })
    return () => unsubscribe()
  }, [scrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile - Fixed Bottom Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <div className="bg-dark-900/95 backdrop-blur-lg border-t border-fiber-500/20 p-4">
              <div className="flex gap-3">
                <motion.a
                  href={siteConfig.contact.phoneHref}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-fiber-500 to-primary-500 text-white font-semibold"
                  whileTap={{ scale: 0.98 }}
                  aria-label="Jetzt anrufen"
                >
                  <Phone className="w-5 h-5" />
                  Jetzt anrufen
                </motion.a>
                <motion.a
                  href={`https://wa.me/4991147768323?text=Hallo,%20ich%20interessiere%20mich%20für%20Glasfaser-Tiefbau.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 rounded-xl bg-[#25D366] text-white"
                  whileTap={{ scale: 0.98 }}
                  aria-label="WhatsApp Nachricht senden"
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Desktop - Floating Buttons Right Side */}
          <div className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col gap-3">
            {/* Expanded Contact Options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex flex-col gap-3"
                >
                  {/* Phone Button */}
                  <motion.a
                    href={siteConfig.contact.phoneHref}
                    className="group flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-fiber-500 to-primary-500 text-white shadow-lg shadow-fiber-500/30 hover:shadow-fiber-500/50 transition-shadow"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Anrufen"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">Anrufen</span>
                  </motion.a>

                  {/* WhatsApp Button */}
                  <motion.a
                    href={`https://wa.me/4991147768323?text=Hallo,%20ich%20interessiere%20mich%20für%20Glasfaser-Tiefbau.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-5 py-3 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="WhatsApp Nachricht senden"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">WhatsApp</span>
                  </motion.a>

                  {/* Scroll to Top */}
                  <motion.button
                    onClick={scrollToTop}
                    className="group flex items-center gap-3 px-5 py-3 rounded-full glass border border-fiber-500/20 text-white hover:bg-fiber-500/10 transition-colors"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowUp className="w-5 h-5" />
                    <span className="font-medium">Nach oben</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isExpanded
                  ? 'bg-dark-800 border border-fiber-500/30'
                  : 'bg-gradient-to-r from-fiber-500 to-primary-500 shadow-fiber-500/30'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isExpanded ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Phone className="w-6 h-6 text-white" />
                )}
              </motion.div>

              {/* Pulse Animation when not expanded */}
              {!isExpanded && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-fiber-500"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.button>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
