'use client'

import * as React from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/**
 * Floating scroll-to-top button with a circular reading-progress indicator.
 * Appears after the user scrolls past 400px. The circular ring around the
 * arrow fills up according to the page scroll progress (0 → 100%).
 * Shows the scroll percentage on hover.
 */
export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false)
  const [percent, setPercent] = React.useState(0)
  const [hovered, setHovered] = React.useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setPercent(docH > 0 ? Math.round((window.scrollY / docH) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollTop}
          aria-label="Remonter en haut de page"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center hover:bg-primary/90"
        >
          {/* Circular progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" className="opacity-20" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
              fill="none"
            />
          </svg>
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.span
                key="percent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[10px] font-bold relative"
              >
                {percent}%
              </motion.span>
            ) : (
              <motion.span
                key="arrow"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <ArrowUp className="h-5 w-5 relative" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/**
 * Thin reading-progress bar fixed at the very top of the viewport.
 * Fills from left → right as the user scrolls down the page.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary origin-left z-[60]"
      aria-hidden="true"
    />
  )
}
