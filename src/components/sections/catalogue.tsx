'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Briefcase,
  Check,
  Code2,
  FileText,
  Info,
  Megaphone,
  Package,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  catalogueIntro,
  cataloguePacks,
  cataloguePoles,
  commercialTerms,
  packsIntro,
} from '@/lib/catalogue'
import { cn } from '@/lib/utils'

const catalogueIcons: Record<string, LucideIcon> = {
  Megaphone,
  Code2,
  ShieldCheck,
  Briefcase,
  Wrench,
  Rocket,
  TrendingUp,
  ShoppingCart,
}

function getCatalogueIcon(name: string): LucideIcon {
  return catalogueIcons[name] ?? Sparkles
}

export function Catalogue() {
  return (
    <section id="catalogue" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            <BookOpen className="h-3.5 w-3.5" />
            {catalogueIntro.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            {catalogueIntro.title}
            <span className="text-gradient"> {catalogueIntro.titleAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground"
          >
            {catalogueIntro.description}
          </motion.p>
        </div>

        {/* Pôles — tabbed catalogue */}
        <Tabs defaultValue={cataloguePoles[0].id} className="w-full">
          <TabsList className="h-auto w-full flex-wrap justify-center gap-2 bg-transparent p-0 mb-8">
            {cataloguePoles.map((pole) => {
              const Icon = getCatalogueIcon(pole.icon)
              return (
                <TabsTrigger
                  key={pole.id}
                  value={pole.id}
                  className="gap-2 rounded-full border border-border/60 bg-card px-4 py-2.5 text-sm data-[state=active]:border-primary/40 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{pole.title}</span>
                  <span className="lg:hidden">{pole.shortTitle}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {cataloguePoles.map((pole) => {
            const Icon = getCatalogueIcon(pole.icon)
            return (
              <TabsContent key={pole.id} value={pole.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border border-border/60 bg-card p-6 lg:p-9 shadow-sm"
                >
                  {/* Pôle header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-muted-foreground/70">
                        {pole.number}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold">{pole.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {pole.leadLabel} :{' '}
                        <span className="font-medium text-foreground">{pole.lead}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8">{pole.intro}</p>

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
                    {/* Services */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Nos services
                      </h4>
                      <ul className="space-y-2.5">
                        {pole.services.map((service) => (
                          <li key={service} className="flex items-start gap-3">
                            <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <span className="text-sm leading-relaxed">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tarifs */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Tarifs indicatifs
                      </h4>
                      <div className="overflow-hidden rounded-2xl border border-border/60">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/50 text-left">
                              <th className="px-4 py-2.5 font-medium text-muted-foreground">
                                Service
                              </th>
                              <th className="px-4 py-2.5 font-medium text-muted-foreground text-right whitespace-nowrap">
                                À partir de
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pole.rates.map((rate) => (
                              <tr
                                key={rate.service}
                                className="border-t border-border/50 hover:bg-muted/30 transition-colors"
                              >
                                <td className="px-4 py-2.5">{rate.service}</td>
                                <td className="px-4 py-2.5 text-right font-semibold tabular-nums whitespace-nowrap">
                                  {rate.from}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {pole.note && (
                        <p className="mt-3 text-xs text-muted-foreground italic">{pole.note}</p>
                      )}
                      <Button asChild className="mt-5 w-full rounded-full">
                        <a href="#contact">Demander un devis pour ce pôle</a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            )
          })}
        </Tabs>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4"
        >
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {catalogueIntro.disclaimer}
          </p>
        </motion.div>

        {/* Packs */}
        <div className="mt-20 lg:mt-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
            >
              <Package className="h-3.5 w-3.5" />
              Nos offres
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              Trois offres et
              <span className="text-gradient"> leurs livrables</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-muted-foreground"
            >
              {packsIntro}
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {cataloguePacks.map((pack, i) => {
              const Icon = getCatalogueIcon(pack.icon)
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className={cn(
                    'relative flex flex-col rounded-3xl border p-7 lg:p-8 transition-all duration-300',
                    pack.highlighted
                      ? 'border-primary/40 bg-card shadow-2xl shadow-primary/10 lg:-mt-4 lg:mb-4'
                      : 'border-border/60 bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-1'
                  )}
                >
                  {pack.highlighted && (
                    <>
                      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/20 via-transparent to-transparent -z-10" />
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30">
                          <Sparkles className="h-3.5 w-3.5" />
                          Le plus demandé
                        </span>
                      </div>
                    </>
                  )}

                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        'h-11 w-11 rounded-2xl flex items-center justify-center shrink-0',
                        pack.highlighted
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-bold leading-tight">{pack.name}</h4>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{pack.goal}</p>

                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Prestations */}
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Prestations incluses
                  </h5>
                  <ul className="space-y-2.5 mb-6">
                    {pack.prestations.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm">
                        <span
                          className={cn(
                            'h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                            pack.highlighted
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-primary/10 text-primary'
                          )}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Livrables */}
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Livrables possibles, à confirmer au devis
                  </h5>
                  <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                    {pack.livrables.map((l) => (
                      <span
                        key={l}
                        className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/40"
                      >
                        {l.replace(/\.$/, '')}
                      </span>
                    ))}
                  </div>

                  {/* Range */}
                  <div className="mt-7 rounded-2xl bg-muted/50 border border-border/50 px-4 py-3">
                    <p className="text-xs text-muted-foreground">Fourchette indicative</p>
                    <p className="text-base font-bold tabular-nums">{pack.range}</p>
                  </div>

                  <Button
                    asChild
                    variant={pack.highlighted ? 'default' : 'outline'}
                    className={cn(
                      'mt-4 w-full rounded-full h-11',
                      pack.highlighted && 'shadow-lg shadow-primary/25'
                    )}
                  >
                    <a href="#contact">Choisir cette offre</a>
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Conditions commerciales */}
        <div className="mt-20 lg:mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Conditions
              <span className="text-gradient"> commerciales</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-muted-foreground"
            >
              Ces modalités sont précisées dans le devis ou le contrat applicable au projet.
            </motion.p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {commercialTerms.map((term) => (
              <AccordionItem key={term.point} value={term.point}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {term.point}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {term.condition}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="rounded-full">
              <a href="#contact">Demander un devis personnalisé</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
