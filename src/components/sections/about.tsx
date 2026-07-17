'use client'

import { motion } from 'framer-motion'
import { Check, Phone, ArrowRight, Quote } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { siteConfig, whyChooseUs } from '@/lib/site-config'

export function About() {
  return (
    <section id="a-propos" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl border-2 border-primary/20 -z-10" />
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-gradient-to-tr from-primary/10 to-accent/10 -z-10" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/team-photo.png"
                  alt="L'équipe MultiSphere Agency en collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating quote card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -right-4 lg:-right-8 glass rounded-2xl p-5 max-w-xs shadow-xl"
              >
                <Quote className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm font-medium leading-relaxed">
                  « Un interlocuteur unique, une coordination fluide entre expertises, pour
                  des projets exécutés avec cohérence et créativité. »
                </p>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -top-4 right-6 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-2xl font-bold leading-none">5</p>
                <p className="text-[10px] uppercase tracking-wider opacity-90 mt-1">Expertises</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
            >
              À propos de nous
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            >
              Une agence pluridisciplinaire,
              <span className="text-gradient"> un seul partenaire.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              MultiSphere Agency rassemble sous un même toit tous les métiers indispensables
              à la réussite de vos projets : événementiel, communication et marketing digital,
              développement web et mobile, cybersécurité, et gestion administrative & financière.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-base text-muted-foreground/80 leading-relaxed"
            >
              Notre force ? Vous offrir un interlocuteur unique et une coordination fluide
              entre les expertises, pour des projets exécutés avec cohérence, rigueur et
              créativité — de la stratégie jusqu'à la livraison.
            </motion.p>

            {/* Highlight checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 grid sm:grid-cols-2 gap-3"
            >
              {[
                'Approche 360°',
                'Équipe experte',
                'Support réactif',
                'Tarifs justes',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="mt-8 grid grid-cols-3 gap-3"
            >
              {[
                { value: '3+', label: "Ans d'expérience" },
                { value: '98%', label: 'Satisfaction client' },
                { value: '24h', label: 'Délai de réponse' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/60 bg-card/50 px-3 py-3 text-center hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <p className="text-lg sm:text-xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button asChild className="rounded-full group">
                <a href="#contact">
                  Discutons de votre projet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  Appelez-nous
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
