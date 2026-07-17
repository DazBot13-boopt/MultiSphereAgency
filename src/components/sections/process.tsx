'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { processSteps } from '@/lib/site-config'
import { getIcon } from '@/lib/icon-registry'

export function Process() {
  return (
    <section id="notre-processus" className="py-20 lg:py-28 relative overflow-hidden bg-muted/30 border-y border-border/60">
      <div className="absolute inset-0 bg-grid opacity-30 -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            Notre méthode
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Une approche structurée,
            <span className="text-gradient"> du concept à la livraison</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground"
          >
            Quatre étapes claires pour transformer votre vision en résultats concrets,
            avec une visibilité totale à chaque phase.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) with animated pulse */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%]">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            {/* Animated pulse dot traveling along the line */}
            <motion.div
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/50"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {processSteps.map((step, i) => {
              const Icon = getIcon(step.icon, Sparkles)
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative group"
                >
                  {/* Number circle */}
                  <div className="relative mx-auto mb-6 h-20 w-20 lg:h-32 lg:w-32 flex items-center justify-center">
                    {/* Outer ring with pulse on hover */}
                    <div className="absolute inset-0 rounded-full bg-background border-2 border-border group-hover:border-primary/40 transition-colors" />
                    <div className="absolute -inset-1 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                    {/* Inner gradient */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors" />
                    {/* Step content */}
                    <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary mb-1" />
                      <span className="text-xs lg:text-sm font-bold text-muted-foreground">
                        {step.number}
                      </span>
                    </div>
                    {/* Pulse dot on active/hover */}
                    <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                    </div>
                  </div>

                  <div className="text-center px-2">
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps (desktop) */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-2 z-10">
                      <div className="h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center shadow-sm group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
