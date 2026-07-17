'use client'

import * as React from 'react'
import { motion, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Phone, Star, MapPin } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useCountUp } from '@/components/use-count-up'
import { useMouseMotionValues } from '@/components/use-parallax'
import { siteConfig, stats } from '@/lib/site-config'

/** A single animated stat with count-up effect. */
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: animated } = useCountUp(value, 1800, 200)
  return (
    <div className="glass rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient tabular-nums" ref={ref}>
        {animated}
        {suffix}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const visualRef = React.useRef<HTMLDivElement>(null)
  const { x: mouseX, y: mouseY } = useMouseMotionValues(visualRef)

  // Subtle 3D tilt on the hero visual based on mouse position
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })
  // Parallax shift for the glow following the mouse
  const glowX = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const glowY = useTransform(mouseY, [-0.5, 0.5], [-20, 20])
  const glowX2 = useTransform(glowX, (v) => -v)
  const glowY2 = useTransform(glowY, (v) => -v)
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['-30%', '30%'])
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['-30%', '30%'])

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Gradient orbs with parallax via mouse */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute top-1/4 -left-20 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl animate-blob"
        />
        <motion.div
          style={{ x: glowX2, y: glowY2 }}
          className="absolute top-1/3 -right-20 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-3xl animate-blob animation-delay-2000"
        />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-primary/10 blur-3xl animate-blob animation-delay-4000" />
        {/* Radial fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Agence pluridisciplinaire • Abomey-Calavi, Bénin
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {"L'union des expertises,".split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span
                className="block text-gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {"la force de vos projets.".split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.08, ease: 'easeOut' }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              De l'événementiel à la cybersécurité, en passant par la communication
              digitale, le développement web/mobile et la gestion administrative — nous
              rassemblons tous les métiers dont votre projet a besoin, sous un même toit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-full text-base h-12 px-6 sm:px-7 group w-full sm:w-auto">
                <a href="#services">
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base h-12 px-6 sm:px-7 w-full sm:w-auto">
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="sm:hidden">Appeler</span>
                  <span className="hidden sm:inline">{siteConfig.phone}</span>
                </a>
              </Button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['AB', 'KM', 'MT', 'DH'].map((i) => (
                    <div
                      key={i}
                      className="h-9 w-9 rounded-full ring-2 ring-background bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">90+ clients satisfaits</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right visual — illustration MultiSphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 relative order-2 lg:order-2"
            style={{ perspective: 1000 }}
          >
            <div ref={visualRef} className="relative max-w-[18rem] sm:max-w-sm lg:max-w-md mx-auto">
              {/* Soft glow behind the visual — follows mouse */}
              <motion.div
                style={{ x: glowX, y: glowY }}
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/25 via-accent/15 to-primary/10 blur-3xl -z-10"
              />

              {/* Main visual with 3D tilt on hover */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative aspect-square rounded-[1.75rem] overflow-hidden ring-1 ring-border/40 shadow-2xl shadow-primary/10"
              >
                <Image
                  src="/images/hero-visual.png"
                  alt="Illustration MultiSphere Agency — univers créatif et technologique"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 40vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
                {/* Sheen that moves with mouse */}
                <motion.div
                  aria-hidden
                  style={{
                    x: sheenX,
                    y: sheenY,
                  }}
                  className="absolute inset-0 opacity-40 pointer-events-none"
                >
                  <div className="h-full w-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                </motion.div>
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-3 right-2 sm:right-4 glass rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-semibold">5 expertises</span>
                </div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-3 left-2 sm:left-4 glass rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold">Abomey-Calavi</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {stats.map((s) => (
            <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Défiler</span>
          <div className="h-9 w-5 rounded-full border-2 border-current flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1 rounded-full bg-current"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
