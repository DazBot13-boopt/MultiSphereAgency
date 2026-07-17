'use client'

import * as React from 'react'
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react'

import { TikTokIcon, WhatsAppIcon } from '@/components/icons/social-icons'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

type SocialLinksProps = {
  /** Size of each icon button */
  size?: 'sm' | 'md' | 'lg'
  /** Visual variant */
  variant?: 'solid' | 'ghost' | 'gradient'
  /** Show labels (only meaningful in vertical/card layouts) */
  withLabels?: boolean
  className?: string
  /** Optional list of networks to show (defaults to all) */
  networks?: Array<'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'whatsapp' | 'email'>
}

const sizeMap = {
  sm: { btn: 'h-8 w-8', icon: 'h-3.5 w-3.5' },
  md: { btn: 'h-10 w-10', icon: 'h-4 w-4' },
  lg: { btn: 'h-12 w-12', icon: 'h-5 w-5' },
} as const

const networkConfig = {
  facebook: {
    label: 'Facebook',
    href: siteConfig.social.facebook,
    Icon: Facebook,
    hoverClass: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white',
  },
  instagram: {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    Icon: Instagram,
    hoverClass:
      'hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:border-transparent hover:text-white',
  },
  linkedin: {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    Icon: Linkedin,
    hoverClass: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white',
  },
  tiktok: {
    label: 'TikTok',
    href: siteConfig.social.tiktok,
    Icon: TikTokIcon,
    hoverClass: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
  },
  whatsapp: {
    label: 'WhatsApp',
    href: siteConfig.social.whatsapp,
    Icon: WhatsAppIcon,
    hoverClass: 'hover:bg-[#25D366] hover:border-[#25D366] hover:text-white',
  },
  email: {
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
    hoverClass: 'hover:bg-primary hover:border-primary hover:text-primary-foreground',
  },
} as const

export function SocialLinks({
  size = 'md',
  variant = 'ghost',
  withLabels = false,
  className,
  networks = ['facebook', 'instagram', 'linkedin', 'tiktok', 'whatsapp'],
}: SocialLinksProps) {
  const { btn, icon } = sizeMap[size]

  const base =
    variant === 'gradient'
      ? 'bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-primary'
      : variant === 'solid'
      ? 'bg-muted text-foreground border border-border'
      : 'bg-transparent text-foreground/70 border border-border/60'

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2',
        withLabels && 'flex-col gap-3 items-stretch',
        className
      )}
    >
      {networks.map((key) => {
        const { label, href, Icon, hoverClass } = networkConfig[key]
        return (
          <a
            key={key}
            href={href}
            target={key === 'email' ? undefined : '_blank'}
            rel={key === 'email' ? undefined : 'noopener noreferrer'}
            aria-label={label}
            title={label}
            className={cn(
              'group inline-flex items-center justify-center rounded-full transition-all duration-200',
              btn,
              base,
              hoverClass,
              'hover:scale-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            <Icon className={icon} />
            <span className="sr-only">{label}</span>
          </a>
        )
      })}
    </div>
  )
}

/** Compact pill row used inside the mobile sheet menu */
export function SocialPillRow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 p-1.5',
        className
      )}
    >
      {(['facebook', 'instagram', 'linkedin', 'tiktok', 'whatsapp'] as const).map((key) => {
        const { label, href, Icon, hoverClass } = networkConfig[key]
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 transition-all duration-200',
              hoverClass,
              'hover:scale-110'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        )
      })}
    </div>
  )
}
