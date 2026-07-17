'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { SocialPillRow } from '@/components/social-links'
import { navLinks, siteConfig } from '@/lib/site-config'

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState<string>('#accueil')

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          {/* Logo — real MultiSphere Agency mark (square icon) */}
          <Link href="#accueil" className="flex items-center group shrink-0 relative">
            <span className="absolute -inset-1 rounded-2xl bg-primary/30 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/images/logo-header.jpeg"
              alt="MultiSphere Agency"
              width={1600}
              height={1600}
              priority
              className="h-11 w-11 lg:h-12 lg:w-12 rounded-xl object-cover ring-1 ring-black/10 shadow-md shadow-primary/10 bg-white transition-transform group-hover:scale-[1.06] group-hover:rotate-3 duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors hover:text-primary ${
                  active === link.href ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.phoneHref}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{siteConfig.phone}</span>
            </a>
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex rounded-full shadow-sm">
              <a href="#contact">Demander un devis</a>
            </Button>

            {/* Mobile menu — always visible on screens below lg */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="lg:hidden rounded-full h-11 w-11 shrink-0 border-primary/40 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground shadow-md transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu de navigation principal de MultiSphere Agency
                </SheetDescription>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center">
                      <Image
                        src="/images/logo-header.jpeg"
                        alt="MultiSphere Agency"
                        width={1600}
                        height={1600}
                        className="h-11 w-11 rounded-xl object-cover ring-1 ring-black/10 shadow-md bg-white"
                      />
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                    {navLinks.map((link, i) => {
                      const isActive = active === link.href
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <SheetClose asChild>
                            <Link
                              href={link.href}
                              className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                                isActive
                                  ? 'bg-primary/10 text-primary'
                                  : 'hover:bg-primary/10 hover:text-primary'
                              }`}
                            >
                              {/* Active indicator bar */}
                              <span
                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-primary transition-all ${
                                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                                }`}
                              />
                              {/* Number prefix */}
                              <span
                                className={`text-xs font-mono tabular-nums w-5 ${
                                  isActive ? 'text-primary' : 'text-muted-foreground/50'
                                }`}
                              >
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="flex-1">{link.label}</span>
                              {isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                              )}
                            </Link>
                          </SheetClose>
                        </motion.div>
                      )
                    })}
                  </nav>
                  <div className="p-6 border-t space-y-4">
                    <Button asChild className="w-full rounded-full">
                      <a href="#contact">Demander un devis</a>
                    </Button>
                    <a
                      href={siteConfig.phoneHref}
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {siteConfig.phone}
                    </a>
                    {/* Social networks row — visible inside the mobile menu */}
                    <div className="pt-2">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 text-center">
                        Nos réseaux
                      </p>
                      <SocialPillRow className="justify-center" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
