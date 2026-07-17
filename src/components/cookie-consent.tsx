'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'multisphere-cookie-consent'

type Consent = 'accepted' | 'declined'

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent | null
      if (!stored) {
        // Small delay so it doesn't clash with hero animations
        const t = setTimeout(() => setVisible(true), 1800)
        return () => clearTimeout(t)
      }
    } catch {
      // localStorage may be unavailable (private mode) — show banner anyway
      const t = setTimeout(() => setVisible(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  const choose = (choice: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // ignore storage errors
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[60]"
          role="region"
          aria-label="Consentement aux cookies"
          aria-live="polite"
        >
          <div className="relative rounded-2xl border border-border/70 bg-card/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/10 ring-1 ring-black/5">
            {/* Accent bar */}
            <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-11 w-11 rounded-2xl bg-primary/10 items-center justify-center shrink-0">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1.5">
                  Votre confidentialité compte pour nous
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser
                  le trafic de manière anonyme. Aucune donnée n'est revendue.{' '}
                  <a
                    href="#politique-confidentialite"
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    En savoir plus
                  </a>
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => choose('accepted')}
                    size="sm"
                    className="rounded-full h-9 flex-1 sm:flex-none"
                  >
                    <Check className="mr-1.5 h-4 w-4" />
                    Tout accepter
                  </Button>
                  <Button
                    onClick={() => choose('declined')}
                    size="sm"
                    variant="outline"
                    className="rounded-full h-9 flex-1 sm:flex-none"
                  >
                    Refuser
                  </Button>
                </div>
              </div>
              <button
                onClick={() => choose('declined')}
                aria-label="Fermer"
                className="sm:hidden absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
