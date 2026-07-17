'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, FolderOpen, ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { portfolio } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const categories = ['Tous', 'Événementiel', 'Communication', 'Développement', 'Cybersécurité', 'Gestion']

export function Portfolio() {
  const [active, setActive] = React.useState('Tous')

  const filtered = React.useMemo(() => {
    if (active === 'Tous') return portfolio
    return portfolio.filter((p) => p.category === active)
  }, [active])

  const countFor = (cat: string) =>
    cat === 'Tous' ? portfolio.length : portfolio.filter((p) => p.category === cat).length

  return (
    <section id="realisations" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle decorative orbs */}
      <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
            >
              Réalisations
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Des projets qui
              <span className="text-gradient"> parlent d'eux-mêmes</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md"
          >
            Un aperçu de projets récents, illustrant la complémentarité de nos expertises
            et la diversité de nos clients.
          </motion.p>
        </div>

        {/* Filter tabs with counts */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const count = countFor(cat)
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                  active === cat
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                )}
              >
                {cat}
                <span
                  className={cn(
                    'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-bold tabular-nums',
                    active === cat
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-background text-muted-foreground'
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-border/60 bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-background/90 backdrop-blur text-primary">
                      {item.category}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-bold mb-1.5">{item.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2 mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 backdrop-blur border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state — shouldn't happen but just in case */}
        {filtered.length === 0 && (
          <div className="text-center py-16 rounded-3xl border-2 border-dashed border-border/60">
            <FolderOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune réalisation dans cette catégorie pour le moment.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Votre projet sera notre prochaine référence.
          </p>
          <Button asChild variant="outline" className="rounded-full group">
            <a href="#contact">
              Démarrer mon projet
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
