'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { getIcon } from '@/lib/icon-registry'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/site-config'

type IconName = keyof typeof Icons

export function Services() {
  const [selected, setSelected] = React.useState<number | null>(null)

  return (
    <section id="services" className="py-20 lg:py-28 relative">
      {/* Soft background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            Nos expertises
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Cinq expertises au service de
            <span className="text-gradient"> votre réussite</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground"
          >
            Un seul interlocuteur pour piloter l'ensemble de votre projet, avec la
            complémentarité de cinq métiers d'expertise.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, idx) => {
            const Icon = getIcon(service.icon, Sparkles)
            const isFeatured = idx === 0 // make the first card span 2 cols on lg

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group relative ${isFeatured ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-left w-full h-full">
                      <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group/card">
                        {/* Subtle gradient ring on hover */}
                        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover/card:from-primary/10 group-hover/card:via-accent/10 group-hover/card:to-primary/10 transition-all duration-500 pointer-events-none -z-10 blur-md" />
                        {/* Image */}
                        <div className={`relative overflow-hidden ${isFeatured ? 'aspect-[16/9] lg:aspect-[2/1]' : 'aspect-[16/10]'}`}>
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            loading={isFeatured ? 'eager' : 'lazy'}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Dual-tone overlay for featured card */}
                          {isFeatured && (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 mix-blend-overlay" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                          {/* Icon badge */}
                          <div className="absolute top-4 left-4 h-12 w-12 rounded-2xl bg-background/90 backdrop-blur flex items-center justify-center shadow-lg group-hover/card:bg-primary group-hover/card:scale-110 transition-all duration-300">
                            <Icon className="h-6 w-6 text-primary group-hover/card:text-primary-foreground transition-colors" />
                          </div>
                          {/* Number badge */}
                          <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center text-xs font-bold text-muted-foreground/80 shadow-md group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-all duration-300">
                            0{idx + 1}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                            {service.title}
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {service.short}
                          </p>

                          {/* Feature pills (first 3) — cleaner on mobile */}
                          <div className="hidden sm:flex flex-wrap gap-1.5">
                            {service.features.slice(0, isFeatured ? 4 : 3).map((f) => (
                              <span
                                key={f}
                                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/40"
                              >
                                {f.split('(')[0].split(':')[0].slice(0, 28)}
                                {f.length > 32 ? '…' : ''}
                              </span>
                            ))}
                          </div>
                          {/* Mobile hint */}
                          <p className="sm:hidden text-xs text-primary font-medium mt-1">
                            Voir les détails →
                          </p>
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>

                  <DialogContent
                    className="max-w-2xl p-0 overflow-hidden gap-0"
                    aria-describedby={undefined}
                  >
                    <div className="relative aspect-[16/8] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6">
                        <DialogHeader className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-2xl bg-primary/15 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <DialogTitle className="text-2xl font-bold">{service.title}</DialogTitle>
                          </div>
                        </DialogHeader>
                      </div>
                    </div>
                    <div className="p-6 pt-2">
                      <DialogDescription className="text-base text-muted-foreground mb-5">
                        {service.description}
                      </DialogDescription>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Ce que nous livrons
                      </h4>
                      <ul className="space-y-2.5">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="mt-6 w-full rounded-full">
                        <a href="#contact" onClick={() => setSelected(idx)}>
                          Demander un devis pour ce service
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )
          })}

          {/* CTA card to fill the 6th slot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: services.length * 0.08 }}
            className="relative rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 flex flex-col justify-between overflow-hidden text-primary-foreground shadow-xl"
          >
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
            <div className="relative">
              <Sparkles className="h-8 w-8 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Un besoin sur mesure ?</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Vos projets mélangent plusieurs expertises ? C'est justement notre force.
                Parlons-en et construisons une offre 360° pour vous.
              </p>
            </div>
            <Button asChild variant="secondary" className="mt-6 rounded-full w-fit bg-background text-foreground hover:bg-background/90">
              <a href="#contact">Demander un devis</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
