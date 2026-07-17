'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2, User, AtSign, MessageSquare, Briefcase, Banknote, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SocialLinks } from '@/components/social-links'
import { siteConfig, services } from '@/lib/site-config'

const schema = z.object({
  name: z.string().min(2, 'Veuillez saisir votre nom'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Veuillez choisir un service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Décrivez votre projet (10 caractères min.)'),
})

type FormValues = z.infer<typeof schema>

const budgets = ['< 500 000 FCFA', '500 000 – 2 M FCFA', '2 M – 5 M FCFA', '> 5 M FCFA', 'À définir']

export function Contact() {
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [whatsappUrl, setWhatsappUrl] = React.useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', service: '', budget: '', message: '' },
  })

  const serviceValue = watch('service')
  const budgetValue = watch('budget')

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Échec de l\'envoi')
      const result = await res.json()
      // Build a WhatsApp deep link with the form data pre-filled
      const waText = encodeURIComponent(
        `Bonjour MultiSphere Agency,\n\n` +
        `Nom: ${data.name}\n` +
        `Email: ${data.email}\n` +
        (data.phone ? `Téléphone: ${data.phone}\n` : '') +
        `Service: ${data.service}\n` +
        (data.budget ? `Budget: ${data.budget}\n` : '') +
        `\nMessage:\n${data.message}`
      )
      const waUrl = `https://wa.me/2290163918896?text=${waText}`
      toast.success('Demande envoyée !', {
        description: 'Cliquez sur WhatsApp pour finaliser l\'envoi à notre équipe.',
      })
      setSubmitted(true)
      setWhatsappUrl(waUrl)
      reset()
    } catch (err) {
      toast.error('Une erreur est survenue', {
        description: 'Veuillez réessayer ou nous contacter par téléphone.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: siteConfig.phone, href: siteConfig.phoneHref },
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: 'Adresse', value: siteConfig.address, href: '#contact' },
    { icon: Clock, label: 'Disponibilité', value: 'Lun – Sam : 8h – 18h', href: '#contact' },
  ]

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left — info */}
          <div className="lg:col-span-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
            >
              Contact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            >
              Parlons de
              <span className="text-gradient"> votre projet</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg text-muted-foreground"
            >
              Qu'il s'agisse d'une simple question ou d'un cahier des charges détaillé,
              notre équipe est joignable et à l'écoute. Tarification transparente, réponse
              rapide, sans engagement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-3"
            >
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                    <info.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {info.label}
                    </p>
                    <p className="font-semibold text-sm">{info.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Social networks block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 rounded-2xl border border-border/60 bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Suivez-nous sur les réseaux
                </p>
              </div>
              <SocialLinks size="md" variant="ghost" />
              <p className="text-xs text-muted-foreground mt-3">
                Actualités, coulisses, réalisations et conseils — retrouvez MultiSphere Agency
                sur Facebook, Instagram, LinkedIn, TikTok et WhatsApp.
              </p>
            </motion.div>

            {/* Map embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 rounded-2xl border border-border/60 bg-card overflow-hidden"
            >
              <div className="p-4 pb-0 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Notre localisation</p>
              </div>
              <div className="relative aspect-[4/3] mt-3">
                <iframe
                  title="MultiSphere Agency — Abomey-Calavi, Bénin"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.30%2C6.42%2C2.48%2C6.50&layer=mapnik&marker=6.4604%2C2.3876"
                  className="absolute inset-0 w-full h-full border-0 grayscale-[30%] contrast-[1.1] hover:grayscale-0 hover:contrast-100 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen={false}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 glass rounded-xl px-3 py-1.5 text-xs font-medium pointer-events-none">
                  📍 Abomey-Calavi, Bénin
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-3xl border border-border/60 bg-card p-6 sm:p-8 lg:p-10 shadow-xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="relative mb-6"
                  >
                    <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl" />
                    <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                      <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
                  <p className="text-muted-foreground max-w-md mb-2">
                    Merci de votre confiance. Votre demande a été enregistrée.
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mb-6">
                    Pour recevoir votre demande directement sur notre WhatsApp, cliquez ci-dessous :
                  </p>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 shadow-lg shadow-emerald-500/20 transition-colors mb-3"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Envoyer sur WhatsApp
                    </a>
                  )}
                  <Button variant="outline" onClick={() => { setSubmitted(false); setWhatsappUrl('') }} className="rounded-full">
                    Envoyer une autre demande
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="name">
                        Nom complet <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                        <Input
                          id="name"
                          placeholder="Votre nom"
                          {...register('name')}
                          className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="vous@email.com"
                          {...register('email')}
                          className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="phone">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                        <Input
                          id="phone"
                          placeholder="+229 ..."
                          {...register('phone')}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">
                        Budget estimé
                      </label>
                      <div className="relative">
                        <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none z-10" />
                        <Select
                          value={budgetValue}
                          onValueChange={(v) => setValue('budget', v)}
                        >
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgets.map((b) => (
                              <SelectItem key={b} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">
                      Service souhaité <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none z-10" />
                      <Select
                        value={serviceValue}
                        onValueChange={(v) => setValue('service', v)}
                      >
                        <SelectTrigger className={`pl-10 ${errors.service ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="Choisissez une expertise" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.id} value={s.title}>
                              {s.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="Autre">Autre / Multi-expertises</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.service && (
                      <p className="text-xs text-destructive">{errors.service.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="message">
                      Votre message <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/60" />
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                        {...register('message')}
                        className={`pl-10 ${errors.message ? 'border-destructive' : 'resize-none'}`}
                      />
                    </div>
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full rounded-full text-base h-12 group"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    En envoyant ce formulaire, vous acceptez d&apos;être recontacté par
                    MultiSphere Agency. Vos données ne seront pas partagées.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
