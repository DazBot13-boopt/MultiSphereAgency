import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { TrustedBy } from '@/components/sections/trusted-by'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { WhyUs } from '@/components/sections/why-us'
import { Process } from '@/components/sections/process'
import { Portfolio } from '@/components/sections/portfolio'
import { Chatbot } from '@/components/sections/chatbot'
import { ProjectEstimator } from '@/components/sections/project-estimator'
import { Testimonials } from '@/components/sections/testimonials'
import { Team } from '@/components/sections/team'
import { Blog } from '@/components/sections/blog'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { ScrollToTop, ReadingProgress } from '@/components/scroll-to-top'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { CookieConsent } from '@/components/cookie-consent'
import { LegalModal } from '@/components/legal-modal'
import { JsonLd } from '@/components/json-ld'
import { SectionDivider } from '@/components/section-divider'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgress />
      <JsonLd />
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <SectionDivider variant="gradient" />
        <About />
        <SectionDivider variant="dots" />
        <Services />
        <SectionDivider variant="gradient" />
        <WhyUs />
        <SectionDivider variant="line" />
        <Process />
        <SectionDivider variant="gradient" />
        <Portfolio />
        <SectionDivider variant="dots" />
        <Chatbot />
        <SectionDivider variant="gradient" />
        <ProjectEstimator />
        <SectionDivider variant="line" />
        <Testimonials />
        <SectionDivider variant="gradient" />
        <Team />
        <SectionDivider variant="dots" />
        <Blog />
        <SectionDivider variant="gradient" />
        <FAQ />
        <SectionDivider variant="gradient" />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <LegalModal />
    </div>
  )
}
