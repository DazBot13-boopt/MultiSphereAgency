'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { whyChooseUs } from '@/lib/site-config'
import { getIcon } from '@/lib/icon-registry'

export function WhyUs() {
  return (
    <section id="pourquoi-nous" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Sticky header */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5">
                Pourquoi nous choisir
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Nous accompagnons votre croissance à
                <span className="text-gradient"> 360°</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Une équipe pluridisciplinaire, un engagement de résultat et une vision
                globale de votre réussite. Voici ce qui fait la différence MultiSphere.
              </p>

              {/* Mini stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-card p-4">
                  <p className="text-3xl font-bold text-gradient">98%</p>
                  <p className="text-xs text-muted-foreground mt-1">Taux de satisfaction</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-4">
                  <p className="text-3xl font-bold text-gradient">100%</p>
                  <p className="text-xs text-muted-foreground mt-1">Projets livrés</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reasons grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 lg:gap-5">
            {whyChooseUs.map((item, i) => {
              const Icon = getIcon(item.icon, Sparkles)
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
