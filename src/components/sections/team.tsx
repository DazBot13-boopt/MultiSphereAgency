'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Mail, Sparkles } from 'lucide-react'

import { team } from '@/lib/site-config'

export function Team() {
  return (
    <section id="equipe" className="py-20 lg:py-28 bg-muted/30 border-y border-border/60 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Notre équipe
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Cinq experts passionnés,
            <span className="text-gradient"> au service de vos objectifs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground"
          >
            Une équipe pluridisciplinaire qui combine expertise technique, créativité et
            sens du service. Cinq talents, une seule vision : la réussite de vos projets.
          </motion.p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="group relative rounded-3xl border border-border/60 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
            >
              {/* Gradient top border on hover */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Glow on hover */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

              {/* Avatar with decorative ring */}
              <div className="relative mx-auto mb-5 h-24 w-24">
                {/* Rotating dashed ring (subtle, decorative) */}
                <motion.div
                  aria-hidden
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-2 rounded-full border border-dashed border-primary/25"
                />
                {/* Soft glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-25 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
                {/* Avatar image */}
                <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent shadow-lg ring-4 ring-card group-hover:scale-105 transition-transform duration-300">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-2xl font-bold text-primary-foreground">
                      {member.initials}
                    </div>
                  )}
                </div>
                {/* Online dot */}
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-card" title="Disponible" />
              </div>

              <h3 className="font-bold text-lg leading-tight">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-3 mt-1">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>

              {/* Skill tags */}
              {member.skills && (
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium px-2 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/40 group-hover:border-primary/30 group-hover:text-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Social */}
              <div className="flex items-center justify-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-muted hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors"
                  aria-label={`LinkedIn de ${member.name}`}
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${member.social.email}`}
                  className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label={`Email de ${member.name}`}
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA sous l'équipe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 px-5 py-2.5 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Équipe disponible</span> —
              un interlocuteur dédié pour piloter vos projets à 360°.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
