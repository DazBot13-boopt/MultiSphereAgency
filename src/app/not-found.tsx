import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/lib/site-config'

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative background — matches hero palette */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <div className="text-center max-w-xl mx-auto">
        {/* Big 404 */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[8rem] sm:text-[10rem] font-bold leading-none text-gradient select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground bg-background/80 backdrop-blur px-4 py-1.5 rounded-full border border-border/60">
              Page introuvable
            </span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Oups, cette page semble s'être égarée
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée. Mais pas d'inquiétude —
          nos expertises, elles, sont bien là. Retournons à bon port.
        </p>

        {/* Primary actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button asChild size="lg" className="rounded-full h-12 px-6 group">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6 group">
            <Link href="/#services">
              <Search className="mr-2 h-4 w-4" />
              Voir nos services
            </Link>
          </Button>
        </div>

        {/* Quick nav */}
        <div className="border-t border-border/60 pt-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Navigation rapide
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 mt-10 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          MultiSphere Agency — L'union des expertises
        </Link>
      </div>
    </main>
  )
}
