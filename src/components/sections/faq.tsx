'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, MessageCircleQuestion, X } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { faqs } from '@/lib/site-config'

export function FAQ() {
  const [query, setQuery] = React.useState('')

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <section id="faq" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            Questions fréquentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Tout ce que vous devez
            <span className="text-gradient"> savoir</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground"
          >
            Une question ? Voici les réponses aux interrogations les plus courantes. Pour
            le reste, notre équipe est à un message près.
          </motion.p>
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="relative mb-8 mx-auto max-w-xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une question (ex. devis, paiement, délais)…"
            className="h-12 pl-11 pr-10 rounded-full text-base shadow-sm border-border/60 focus-visible:ring-primary/30"
            aria-label="Rechercher dans les questions fréquentes"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Effacer la recherche"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filtered.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3">
              {filtered.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className="group relative rounded-2xl border border-border/60 bg-card px-5 data-[state=open]:border-primary/40 data-[state=open]:shadow-md data-[state=open]:shadow-primary/5 transition-all overflow-hidden motion-safe:animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Accent bar on the left, visible when open */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent opacity-0 group-data-[state=open]:opacity-100 transition-opacity duration-300" />
                  <AccordionTrigger className="text-left text-base lg:text-lg font-semibold py-5 hover:no-underline [&[data-state=open]>svg]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 rounded-2xl border border-dashed border-border/60 bg-muted/20"
            >
              <p className="text-muted-foreground mb-4">
                Aucune réponse trouvée pour « <span className="font-medium text-foreground">{query}</span> ».
              </p>
              <Button asChild className="rounded-full">
                <a href="#contact">Poser ma question</a>
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Count hint */}
        {query && filtered.length > 0 && (
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {filtered.length} réponse{filtered.length > 1 ? 's' : ''} trouvée
            {filtered.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </section>
  )
}
