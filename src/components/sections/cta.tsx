'use client'

import { motion } from 'framer-motion'
import { Phone, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

export function CTA() {
  return (
    <section id="devis" className="py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cta-bg.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/75" />
            <div className="absolute inset-0 bg-grid opacity-20" />
          </div>

          {/* Floating decorative shapes */}
          <motion.div
            aria-hidden
            animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-[15%] h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 rotate-12 hidden sm:block"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-12 left-[8%] h-12 w-12 rounded-full bg-accent/30 backdrop-blur-sm border border-white/15 hidden sm:block"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-[40%] right-[6%] h-8 w-8 rounded-lg bg-white/15 backdrop-blur-sm rotate-45 hidden lg:block"
          />

          {/* Animated gradient border glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20" />
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.15), transparent, rgba(255,255,255,0.08), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative px-6 py-12 sm:px-12 lg:px-16 lg:py-20 text-primary-foreground">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6"
                >
                  <Sparkles className="h-4 w-4" />
                  Commencez maintenant
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                >
                  Un projet en tête ?
                  <br />
                  Discutons-en.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 text-lg opacity-90 max-w-md"
                >
                  Nous vous préparons un devis sur mesure, gratuitement et sans engagement.
                  Réponse sous 24 heures.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 flex flex-col sm:flex-row gap-3"
                >
                  <Button asChild size="lg" variant="secondary" className="rounded-full text-base h-12 px-7 group bg-background text-foreground hover:bg-background/90 shadow-xl shadow-black/10">
                    <a href="#contact">
                      Demander un devis gratuit
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full text-base h-12 px-7 border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
                    <a href={siteConfig.phoneHref}>
                      <Phone className="mr-2 h-4 w-4" />
                      {siteConfig.phone}
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* Right benefits */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                {[
                  { text: 'Réponse sous 24 h', icon: '⚡' },
                  { text: 'Devis gratuit et sans engagement', icon: '📋' },
                  { text: 'Accompagnement dédié', icon: '🤝' },
                  { text: 'Tarification transparente', icon: '💎' },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 glass rounded-xl px-4 py-3 border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
