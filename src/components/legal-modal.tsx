'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Shield, ChevronRight } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { siteConfig } from '@/lib/site-config'

type LegalDoc = 'mentions-legales' | 'politique-confidentialite'

const legalDocs: Record<
  LegalDoc,
  { title: string; subtitle: string; icon: React.ElementType; updated: string; sections: { h: string; p: string[] }[] }
> = {
  'mentions-legales': {
    title: 'Mentions légales',
    subtitle: 'Informations légales sur MultiSphere Agency',
    icon: FileText,
    updated: '17 juillet 2026',
    sections: [
      {
        h: '1. Éditeur du site',
        p: [
          `Le site ${siteConfig.name} est édité par ${siteConfig.name}, agence pluridisciplinaire spécialisée dans l'événementiel, la communication digitale, le développement web & mobile, la cybersécurité et la gestion administrative.`,
          `Siège social : ${siteConfig.address}.`,
          `Contact : ${siteConfig.email} — ${siteConfig.phone}.`,
        ],
      },
      {
        h: '2. Directeur de la publication',
        p: [`Le directeur de la publication est le représentant légal de ${siteConfig.name}.`],
      },
      {
        h: '3. Hébergement',
        p: [
          'Le site est hébergé par un prestataire d\'hébergement web professionnel assurant la disponibilité et la sécurité des données.',
          'Les coordonnées complètes de l\'hébergeur peuvent être obtenues sur simple demande à l\'adresse email de contact.',
        ],
      },
      {
        h: '4. Propriété intellectuelle',
        p: [
          'L\'ensemble des contenus présents sur ce site (textes, visuels, logos, charte graphique, éléments d\'interface) est la propriété exclusive de MultiSphere Agency, sauf mention contraire.',
          'Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite et constitue une contrefaçon.',
        ],
      },
      {
        h: '5. Données personnelles',
        p: [
          'Les données collectées via les formulaires (nom, email, téléphone, message) sont utilisées uniquement pour répondre à vos demandes et vous accompagner dans votre projet.',
          'Pour plus d\'informations, consultez notre Politique de confidentialité.',
          'Conformément à la loi Informatique et Libertés et au Règlement Général sur la Protection des Données (RGPD), vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données.',
        ],
      },
      {
        h: '6. Cookies',
        p: [
          'Ce site utilise des cookies techniques nécessaires à son bon fonctionnement et, sous réserve de votre consentement, des cookies analytiques anonymisés.',
          'Vous pouvez à tout moment modifier vos préférences via le bandeau de consentement.',
        ],
      },
      {
        h: '7. Responsabilité',
        p: [
          'MultiSphere Agency s\'efforce de fournir des informations exactes et à jour. Toutefois, l\'agence ne saurait être tenue responsable des erreurs, omissions ou indisponibilités temporaires du site.',
          'Les liens vers des sites tiers sont fournis à titre indicatif et MultiSphere Agency n\'exerce aucun contrôle sur leur contenu.',
        ],
      },
      {
        h: '8. Droit applicable',
        p: [
          'Les présentes mentions légales sont régies par le droit béninois. En cas de litige, les tribunaux béninois seront seuls compétents.',
        ],
      },
    ],
  },
  'politique-confidentialite': {
    title: 'Politique de confidentialité',
    subtitle: 'Comment nous protégeons vos données personnelles',
    icon: Shield,
    updated: '17 juillet 2026',
    sections: [
      {
        h: '1. Responsable du traitement',
        p: [
          `${siteConfig.name}, basée à ${siteConfig.address}, est responsable du traitement des données personnelles collectées sur ce site.`,
          `Pour toute question : ${siteConfig.email}.`,
        ],
      },
      {
        h: '2. Données collectées',
        p: [
          'Formulaire de contact : nom, email, téléphone (facultatif), service souhaité, budget estimé (facultatif), message.',
          'Newsletter : adresse email uniquement.',
          'Données techniques (automatiques) : type de navigateur, pages visitées, durée de session. Aucune adresse IP n\'est conservée.',
        ],
      },
      {
        h: '3. Finalités du traitement',
        p: [
          'Répondre à vos demandes de devis et vous accompagner dans votre projet.',
          'Vous envoyer nos actualités et conseils (uniquement si vous avez consenti à la newsletter).',
          'Améliorer l\'expérience utilisateur et le contenu du site (statistiques agrégées et anonymisées).',
        ],
      },
      {
        h: '4. Base légale',
        p: [
          'Le traitement de vos données de contact repose sur votre consentement et/ou sur la prise de mesures précontractuelles (réponse à une demande de devis).',
          'L\'envoi de la newsletter repose sur votre consentement explicite, recueilli au moment de l\'inscription.',
        ],
      },
      {
        h: '5. Durée de conservation',
        p: [
          'Demandes de contact : 3 ans à compter du dernier échange.',
          'Inscription newsletter : jusqu\'à votre désinscription (lien présent dans chaque email).',
          'Données techniques : 13 mois maximum.',
        ],
      },
      {
        h: '6. Destinataires',
        p: [
          'Vos données sont strictement réservées à l\'équipe interne de MultiSphere Agency.',
          'Aucune donnée n\'est revendue ni partagée avec des tiers à des fins commerciales.',
          'Seuls les prestataires techniques (hébergeur, service d\'envoi d\'emails) peuvent accéder aux données strictement nécessaires à leur mission, sous engagement de confidentialité.',
        ],
      },
      {
        h: '7. Vos droits',
        p: [
          'Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :',
          '• Droit d\'accès à vos données personnelles.',
          '• Droit de rectification des données inexactes.',
          '• Droit à l\'effacement (« droit à l\'oubli »).',
          '• Droit à la limitation du traitement.',
          '• Droit à la portabilité de vos données.',
          '• Droit d\'opposition au traitement.',
          '• Droit de retirer votre consentement à tout moment.',
          `Pour exercer ces droits, écrivez-nous à ${siteConfig.email} en précisant votre demande.`,
        ],
      },
      {
        h: '8. Sécurité',
        p: [
          'MultiSphere Agency met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre la perte, l\'accès non autorisé, la divulgation ou la modification.',
          'Cela inclut le chiffrement des communications (HTTPS), des sauvegardes régulières et un accès restreint aux données.',
        ],
      },
      {
        h: '9. Cookies',
        p: [
          'Nous n\'utilisons que des cookies strictement nécessaires au fonctionnement du site (préférences de thème, consentement).',
          'Aucun cookie publicitaire ou de tracking commercial n\'est déposé sans votre consentement explicite.',
        ],
      },
    ],
  },
}

export function LegalModal() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [doc, setDoc] = React.useState<LegalDoc>('mentions-legales')

  // Listen to URL hash changes
  React.useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash
      if (hash === '#mentions-legales' || hash === '#politique-confidentialite') {
        setDoc(hash.slice(1) as LegalDoc)
        setOpen(true)
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  const handleClose = () => {
    setOpen(false)
    // Clean the URL hash without scrolling
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  const current = legalDocs[doc]
  const Icon = current.icon

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">{current.title}</DialogTitle>
        <DialogDescription className="sr-only">{current.subtitle}</DialogDescription>

        {/* Header */}
        <div className="relative px-6 sm:px-8 py-6 border-b border-border/60 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{current.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{current.subtitle}</p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Dernière mise à jour : {current.updated}
              </p>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="mt-5 flex gap-1 p-1 bg-muted/60 rounded-full text-xs">
            {(Object.keys(legalDocs) as LegalDoc[]).map((key) => (
              <button
                key={key}
                onClick={() => setDoc(key)}
                className={`flex-1 px-3 py-2 rounded-full font-medium transition-all ${
                  doc === key
                    ? 'bg-card text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {legalDocs[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 max-h-[55vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={doc}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="prose prose-sm dark:prose-invert max-w-none space-y-6"
            >
              {current.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    {section.h}
                  </h3>
                  <div className="pl-6 space-y-2">
                    {section.p.map((para, j) => (
                      <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact CTA */}
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-sm font-semibold mb-1">Une question sur vos données ?</p>
                <p className="text-sm text-muted-foreground">
                  Écrivez-nous à{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>{' '}
                  — nous répondons sous 24h.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
