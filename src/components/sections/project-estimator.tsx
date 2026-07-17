'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PartyPopper,
  Code2,
  Megaphone,
  ShieldCheck,
  ClipboardList,
  Clock,
  Zap,
  RefreshCw,
  Circle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { services } from '@/lib/site-config'

// Pricing data (FCFA) — base prices per service
const servicePrices: Record<string, { base: number; label: string }> = {
  evenementiel: { base: 350000, label: 'Événementiel' },
  communication: { base: 250000, label: 'Communication' },
  developpement: { base: 500000, label: 'Développement' },
  cybersecurite: { base: 200000, label: 'Cybersécurité' },
  gestion: { base: 100000, label: 'Gestion' },
}

// Complexity multipliers
const complexities = [
  { id: 'simple', label: 'Simple', desc: 'Projet standard, périmètre clair', multiplier: 1 },
  { id: 'medium', label: 'Intermédiaire', desc: 'Personnalisations, intégrations', multiplier: 1.6 },
  { id: 'complex', label: 'Complexe', desc: 'Sur-mesure, multi-acteurs', multiplier: 2.4 },
]

// Delivery options
const deliveries = [
  { id: 'standard', label: 'Standard', desc: '3 à 4 semaines', multiplier: 1, icon: Clock },
  { id: 'fast', label: 'Express', desc: 'Sous 2 semaines (+30%)', multiplier: 1.3, icon: Zap },
  { id: 'relaxed', label: 'Souple', desc: 'Plus d\'1 mois (-10%)', multiplier: 0.9, icon: Sparkles },
]

const serviceIcons: Record<string, React.ElementType> = {
  evenementiel: PartyPopper,
  communication: Megaphone,
  developpement: Code2,
  cybersecurite: ShieldCheck,
  gestion: ClipboardList,
}

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' FCFA'
}

export function ProjectEstimator() {
  const [step, setStep] = React.useState(0) // 0=services, 1=complexity, 2=delivery, 3=results
  const [selectedServices, setSelectedServices] = React.useState<string[]>(['developpement'])
  const [complexity, setComplexity] = React.useState('medium')
  const [delivery, setDelivery] = React.useState('standard')

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const computeEstimate = () => {
    const servicesTotal = selectedServices.reduce(
      (sum, id) => sum + (servicePrices[id]?.base ?? 0),
      0
    )
    const complexityMult = complexities.find((c) => c.id === complexity)?.multiplier ?? 1
    const deliveryMult = deliveries.find((d) => d.id === delivery)?.multiplier ?? 1
    const subtotal = servicesTotal * complexityMult
    const total = subtotal * deliveryMult
    const min = Math.round(total * 0.85)
    const max = Math.round(total * 1.15)
    return { subtotal, total, min, max }
  }

  const estimate = computeEstimate()
  const canAdvance = step === 0 ? selectedServices.length > 0 : true

  const reset = () => {
    setSelectedServices(['developpement'])
    setComplexity('medium')
    setDelivery('standard')
    setStep(0)
  }

  const steps = ['Services', 'Complexité', 'Délai', 'Estimation']

  return (
    <section id="estimateur" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            <Calculator className="h-3.5 w-3.5" />
            Estimateur de budget
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Estimez votre projet
            <span className="text-gradient"> en 30 secondes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Une estimation indicative, instantanée et sans engagement. Pour un devis précis,
            notre équipe étudie votre cahier des charges sous 24h.
          </motion.p>
        </div>

        {/* Stepper card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-border/60 bg-card shadow-2xl shadow-primary/5 overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

          {/* Progress bar */}
          <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-border/60">
            <div className="flex items-center justify-between gap-2">
              {steps.map((label, i) => (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      className={cn(
                        'h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                        i < step && 'bg-primary text-primary-foreground',
                        i === step && 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110',
                        i > step && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {i < step ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span
                      className={cn(
                        'text-[10px] sm:text-xs font-medium transition-colors text-center',
                        i === step ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px bg-border -mt-5">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: i < step ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="p-6 sm:p-8 min-h-[20rem]">
            <AnimatePresence mode="wait">
              {/* Step 0: Services */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-1">Quelles expertises vous faut-il ?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Sélectionnez une ou plusieurs expertises — vous pouvez combiner.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {services.map((service) => {
                      const Icon = serviceIcons[service.id] ?? Circle
                      const isSelected = selectedServices.includes(service.id)
                      const price = servicePrices[service.id]
                      return (
                        <button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={cn(
                            'group relative flex items-start gap-3 p-4 rounded-2xl border text-left transition-all',
                            isSelected
                              ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                              : 'border-border/60 hover:border-primary/40 hover:bg-muted/40'
                          )}
                        >
                          <div
                            className={cn(
                              'h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-primary/10 text-primary'
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-tight">{service.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {service.short}
                            </p>
                            <p className="text-xs font-medium text-primary mt-1.5">
                              à partir de {formatFCFA(price.base)}
                            </p>
                          </div>
                          <div
                            className={cn(
                              'h-5 w-5 rounded-full flex items-center justify-center shrink-0 transition-all',
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'border-2 border-border'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Complexity */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-1">Quelle est la complexité ?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Un projet sur-mesure ou avec de nombreuses intégrations demande plus de temps.
                  </p>
                  <div className="space-y-3">
                    {complexities.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setComplexity(c.id)}
                        className={cn(
                          'w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all',
                          complexity === c.id
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                            : 'border-border/60 hover:border-primary/40 hover:bg-muted/40'
                        )}
                      >
                        <div
                          className={cn(
                            'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                            complexity === c.id
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground/40'
                          )}
                        >
                          {complexity === c.id && (
                            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{c.label}</p>
                          <p className="text-xs text-muted-foreground">{c.desc}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          ×{c.multiplier}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Delivery */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-1">Quel délai visez-vous ?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Un délai court implique une mobilisation d'équipe renforcée.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {deliveries.map((d) => {
                      const Icon = d.icon
                      return (
                        <button
                          key={d.id}
                          onClick={() => setDelivery(d.id)}
                          className={cn(
                            'p-4 rounded-2xl border text-center transition-all',
                            delivery === d.id
                              ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                              : 'border-border/60 hover:border-primary/40 hover:bg-muted/40'
                          )}
                        >
                          <div
                            className={cn(
                              'h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors',
                              delivery === d.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-primary/10 text-primary'
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="font-semibold text-sm">{d.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Results */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="inline-flex h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center mb-4 shadow-lg shadow-primary/30"
                  >
                    <Calculator className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-1">Votre estimation</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fourchette budgétaire indicative pour votre projet.
                  </p>

                  {/* Price reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-6 sm:p-8 mb-6"
                  >
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Estimation fourchette
                    </p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                      <span className="text-gradient tabular-nums">{formatFCFA(estimate.min)}</span>
                      <span className="text-muted-foreground mx-2">—</span>
                      <span className="text-gradient tabular-nums">{formatFCFA(estimate.max)}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Basé sur {selectedServices.length} expertise{selectedServices.length > 1 ? 's' : ''} •
                      Complexité {complexities.find((c) => c.id === complexity)?.label.toLowerCase()} •
                      Délai {deliveries.find((d) => d.id === delivery)?.label.toLowerCase()}
                    </p>
                  </motion.div>

                  {/* Selected services recap */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {selectedServices.map((id) => {
                      const service = services.find((s) => s.id === id)
                      const Icon = serviceIcons[id] ?? Circle
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-xs font-medium"
                        >
                          <Icon className="h-3.5 w-3.5 text-primary" />
                          {service?.title}
                        </span>
                      )
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg" className="rounded-full group">
                      <a href="#contact">
                        Demander un devis précis
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button
                      onClick={reset}
                      variant="outline"
                      size="lg"
                      className="rounded-full group"
                    >
                      <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                      Recalculer
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-6 max-w-md mx-auto">
                    ⚠️ Cette estimation est indicative et n'a pas valeur de devis contractuel.
                    Le devis final peut varier selon la complexité réelle et vos spécifications.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {step < 3 && (
            <div className="px-6 sm:px-8 py-5 border-t border-border/60 flex items-center justify-between gap-3 bg-muted/20">
              <Button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                variant="ghost"
                size="sm"
                disabled={step === 0}
                className="rounded-full"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Précédent
              </Button>

              <p className="text-xs text-muted-foreground hidden sm:block">
                Étape {step + 1} sur {steps.length}
              </p>

              <Button
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                size="sm"
                disabled={!canAdvance}
                className="rounded-full group"
              >
                {step === 2 ? 'Voir l\'estimation' : 'Continuer'}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
