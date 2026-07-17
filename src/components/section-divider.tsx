'use client'

import { motion } from 'framer-motion'

type DividerVariant = 'wave' | 'dots' | 'line' | 'gradient'

interface SectionDividerProps {
  variant?: DividerVariant
  className?: string
}

export function SectionDivider({ variant = 'gradient', className = '' }: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
            className="fill-muted/30"
          />
          <path
            d="M0 35C240 55 480 10 720 35C960 55 1200 10 1440 35V60H0V35Z"
            className="fill-muted/15"
          />
        </svg>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`flex items-center justify-center gap-1.5 py-2 ${className}`}
        aria-hidden="true"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
        <div className="h-2 w-2 rounded-full bg-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
      </motion.div>
    )
  }

  if (variant === 'line') {
    return (
      <div className={`flex items-center justify-center py-1 ${className}`} aria-hidden="true">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="mx-3 h-1.5 w-1.5 rounded-full bg-primary/40" />
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    )
  }

  // Default: gradient fade
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent ${className}`}
      aria-hidden="true"
    />
  )
}
