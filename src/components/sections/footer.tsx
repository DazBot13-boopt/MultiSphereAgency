'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, ArrowUp, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SocialLinks } from '@/components/social-links'
import { siteConfig, services, navLinks } from '@/lib/site-config'

export function Footer() {
  const [email, setEmail] = React.useState('')
  const [subscribing, setSubscribing] = React.useState(false)

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
      if (!res.ok) throw new Error()
      toast.success('Inscription confirmée !', {
        description: 'Vous recevrez nos actualités.',
      })
      setEmail('')
    } catch {
      toast.error('Inscription impossible', {
        description: 'Veuillez réessayer plus tard.',
      })
    } finally {
      setSubscribing(false)
    }
  }

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative mt-auto border-t border-border/60 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link href="#accueil" className="inline-flex items-center mb-5 group">
              <Image
                src="/images/logo-header.jpeg"
                alt="MultiSphere Agency"
                width={1600}
                height={1600}
                className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/10 shadow-md bg-white transition-transform group-hover:scale-105 duration-300"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              « L'union des expertises, la force de vos projets. » MultiSphere Agency
              rassemble sous un même toit toutes les expertises dont votre projet a besoin :
              événementiel, communication digitale, développement web & mobile, cybersécurité
              et gestion administrative.
            </p>

            {/* Newsletter */}
            <form onSubmit={onSubscribe} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                disabled={subscribing}
                className="rounded-full shrink-0"
                aria-label="S'inscrire"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Liens rapides</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertises */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Nos expertises</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Nous contacter</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>

            {/* Social — real MultiSphere networks */}
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2.5">
                Suivez-nous
              </p>
              <SocialLinks size="sm" variant="solid" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} MultiSphere Agency. Tous droits réservés.
            </p>
            {/* Legal links */}
            <div className="flex items-center gap-3 text-xs">
              <a
                href="#mentions-legales"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Mentions légales
              </a>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              <a
                href="#politique-confidentialite"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Confidentialité
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Conçu avec passion à Abomey-Calavi, Bénin
            </span>
            <button
              onClick={scrollTop}
              aria-label="Retour en haut"
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:scale-110 flex items-center justify-center transition-transform shadow-lg shadow-primary/20"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
