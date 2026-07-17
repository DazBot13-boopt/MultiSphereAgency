'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { testimonials } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export function Testimonials() {
  const [[index, dir], setState] = React.useState<[number, number]>([0, 0])

  const paginate = React.useCallback((newDir: number) => {
    setState(([prev]) => {
      const next = (prev + newDir + testimonials.length) % testimonials.length
      return [next, newDir]
    })
  }, [])

  // Auto-advance
  React.useEffect(() => {
    const id = setInterval(() => setState(([prev]) => [(prev + 1) % testimonials.length, 1]), 6000)
    return () => clearInterval(id)
  }, [])

  const current = testimonials[index]

  return (
    <section id="temoignages" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            Témoignages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Ce que nos clients
            <span className="text-gradient"> disent de nous</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="relative min-h-[20rem] sm:min-h-[18rem] flex items-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full"
              >
                <div className="relative rounded-3xl border border-border/60 bg-card p-8 lg:p-12 shadow-xl hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                  <Quote className="absolute top-6 right-8 h-16 w-16 text-primary/10" />

                  {/* Decorative glow */}
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(current.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
                      >
                        <Star className="h-5 w-5 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg lg:text-xl leading-relaxed mb-8 relative z-10">
                    « {current.content} »
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar with gradient ring */}
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-accent opacity-60" />
                      <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold ring-2 ring-card">
                        {current.initials}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{current.name}</p>
                      <p className="text-sm text-muted-foreground">{current.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full h-11 w-11"
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Témoignage ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === index ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/50'
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full h-11 w-11"
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
