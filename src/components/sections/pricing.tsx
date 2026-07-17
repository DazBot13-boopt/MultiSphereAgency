'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Crown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { pricingPlans } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const planIcons: Record<string, React.ElementType> = {
  essentiel: Zap,
  professionnel: Sparkles,
  entreprise: Crown,
}

export function Pricing() {
  return (
    <section id="formules" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Nos formules
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Des formules claires,
            <span className="text-gradient"> adaptées à vos ambitions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Une tarification transparente et sans surprise. Choisissez la formule qui
            correspond à votre projet — tout est adaptable sur devis.
          </motion.p>

          {/* Reassurance row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Devis gratuit sous 24h
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" />
              Sans engagement
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-primary" />
              Paiement Mobile Money accepté
            </span>
          </motion.div>
        </div>

        {/* Plans grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, i) => {
            const Icon = planIcons[plan.id] ?? Sparkles
            const popular = plan.popular
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={cn(
                  'relative flex flex-col rounded-3xl border p-7 lg:p-8 transition-all duration-300',
                  popular
                    ? 'border-primary/40 bg-card shadow-2xl shadow-primary/10 lg:-mt-4 lg:mb-4'
                    : 'border-border/60 bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-1'
                )}
              >
                {/* Popular badge */}
                {popular && (
                  <>
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/20 via-transparent to-transparent -z-10" />
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30">
                        <Sparkles className="h-3.5 w-3.5" />
                        Le plus choisi
                      </span>
                    </div>
                  </>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={cn(
                      'h-11 w-11 rounded-2xl flex items-center justify-center transition-colors',
                      popular
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-5 mb-1">
                  {plan.price === 'Sur devis' ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl lg:text-4xl font-bold text-gradient">
                        Sur devis
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-sm text-muted-foreground">à partir de</span>
                      <span className="text-3xl lg:text-4xl font-bold tracking-tight tabular-nums">
                        {plan.price}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {plan.currency}
                      </span>
                    </div>
                  )}
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed min-h-[2.5rem]">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={cn(
                          'h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                          popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  variant={popular ? 'default' : 'outline'}
                  className={cn(
                    'mt-7 w-full rounded-full h-11 group',
                    popular && 'shadow-lg shadow-primary/25'
                  )}
                >
                  <a href="#contact">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          Besoin d'une formule sur mesure ?{' '}
          <a href="#contact" className="font-medium text-primary hover:underline underline-offset-4">
            Parlons de votre projet
          </a>
          {' '}— nous adaptons chaque mission à votre budget et vos objectifs.
        </motion.p>
      </div>
    </section>
  )
}
