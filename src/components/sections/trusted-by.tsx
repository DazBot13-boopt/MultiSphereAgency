'use client'

import { motion } from 'framer-motion'
import { partners } from '@/lib/site-config'

export function TrustedBy() {
  return (
    <section id="confiance" className="py-14 border-y border-border/60 bg-muted/30 overflow-hidden relative">
      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-24 w-24 rounded-full bg-primary/5 blur-2xl -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-24 w-24 rounded-full bg-accent/5 blur-2xl -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30" />
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Ils nous font confiance
          </p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30" />
        </motion.div>

        {/* Marquee container */}
        <div className="relative group">
          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/80 to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <div className="flex animate-marquee gap-12 lg:gap-16 shrink-0 pr-12 lg:pr-16">
              {[...partners, ...partners].map((p, i) => (
                <span
                  key={i}
                  className="text-xl lg:text-2xl font-bold text-muted-foreground/40 hover:text-primary/80 transition-colors duration-300 whitespace-nowrap tracking-tight group-hover:blur-[1px] hover:!blur-none"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Partner count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground/60 mt-5"
        >
          +{partners.length} entreprises et organisations nous font déjà confiance
        </motion.p>
      </div>
    </section>
  )
}
