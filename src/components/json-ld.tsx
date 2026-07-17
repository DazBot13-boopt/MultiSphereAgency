import { siteConfig, services, faqs } from '@/lib/site-config'

/**
 * Injects JSON-LD structured data for SEO (ProfessionalService + FAQPage + WebSite + Services).
 * Helps Google render rich results (knowledge panel, FAQ accordions, sitelinks search, etc.).
 * Rendered server-side — no client JS needed.
 */
export function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://multisphere.agency',
    name: siteConfig.name,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abomey-Calavi',
      addressCountry: 'BJ',
    },
    areaServed: ['Bénin', 'Afrique de l\u2019Ouest'],
    knowsAbout: services.map((s) => s.title),
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.tiktok,
      siteConfig.social.whatsapp,
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://multisphere.agency/#website',
    url: 'https://multisphere.agency/',
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': 'https://multisphere.agency' },
    inLanguage: 'fr-FR',
  }

  const serviceList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Expertises MultiSphere Agency',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': 'https://multisphere.agency' },
        areaServed: ['Bénin', 'Afrique de l\u2019Ouest'],
      },
    })),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  )
}
