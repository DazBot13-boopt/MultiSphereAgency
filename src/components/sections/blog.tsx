'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, BookOpen, ArrowUpRight, Loader2, CheckCircle2, Send, FileText } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { getIcon } from '@/lib/icon-registry'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function Blog() {
  const [featured, ...rest] = blogPosts

  // Newsletter form state
  const [email, setEmail] = React.useState('')
  const [subscribing, setSubscribing] = React.useState(false)
  const [subscribed, setSubscribed] = React.useState(false)

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribing(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Échec')
      const data = await res.json()
      if (data.alreadySubscribed) {
        toast.success('Vous êtes déjà inscrit !', {
          description: 'Merci pour votre intérêt.',
        })
      } else {
        toast.success('Inscription confirmée !', {
          description: 'Vous recevrez nos prochains articles.',
        })
      }
      setSubscribed(true)
      setEmail('')
    } catch {
      toast.error('Inscription impossible', {
        description: 'Veuillez réessayer plus tard.',
      })
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <section id="ressources" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Ressources & Conseils
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Notre expertise,
              <span className="text-gradient"> en libre accès</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Conseils, tendances et retours d'expérience pour faire avancer vos projets.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          >
            <Button variant="outline" className="rounded-full group" asChild>
              <a href="#ressources">
                Tous les articles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Featured + grid layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Featured article — large */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative lg:row-span-2 rounded-3xl overflow-hidden border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Visual header */}
            <div className={cn('relative aspect-[16/10] overflow-hidden bg-gradient-to-br', featured.color)}>
              <div className="absolute inset-0 bg-grid opacity-20" />
              {/* Large icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {(() => {
                  const Icon = getIcon(featured.icon, BookOpen)
                  return <Icon className="h-24 w-24 text-foreground/70 group-hover:scale-110 transition-transform duration-500" />
                })()}
              </div>
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  À la une
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="font-medium text-primary">{featured.category}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(featured.date)}
                </span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featured.readTime}
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                Lire l'article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </motion.article>

          {/* Secondary articles — compact cards */}
          {rest.map((post, i) => {
            const Icon = getIcon(post.icon, FileText)
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                className="group relative rounded-3xl overflow-hidden border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex gap-4 p-5">
                  {/* Icon thumbnail */}
                  <div className={cn('relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl bg-gradient-to-br flex items-center justify-center overflow-hidden', post.color)}>
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <Icon className="h-9 w-9 sm:h-10 sm:w-10 text-foreground/70 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <span className="font-medium text-primary">{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
                  {/* Arrow */}
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:rotate-45 transition-all duration-300 shrink-0 mt-1" />
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 to-accent/5 p-8 lg:p-10 text-center relative overflow-hidden"
        >
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <h3 className="text-xl lg:text-2xl font-bold mb-2">
              Ne manquez aucun conseil
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Recevez nos derniers articles et bonnes pratiques directement dans votre boîte mail.
              Pas de spam, unsubscribe en un clic.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-3 text-primary font-medium"
              >
                <CheckCircle2 className="h-5 w-5" />
                Merci ! Votre inscription est confirmée.
              </motion.div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={onSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@email.com"
                  aria-label="Votre email"
                  className="flex-1 h-11 rounded-full border border-border/60 bg-card px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                />
                <Button
                  type="submit"
                  disabled={subscribing}
                  className="rounded-full h-11 px-6 shrink-0 group"
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription...
                    </>
                  ) : (
                    <>
                      S'abonner
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              🔒 Vos données restent confidentielles. Aucune revente.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
