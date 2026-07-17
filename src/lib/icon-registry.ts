import * as React from 'react'
import {
  Award,
  ClipboardList,
  Code2,
  Compass,
  Headset,
  Layers,
  Megaphone,
  PartyPopper,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  Sparkles,
  Circle,
  BookOpen,
  FileText,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'

/**
 * Shared icon registry — imports ONLY the icons we actually use,
 * instead of `import * as Icons from 'lucide-react'` which pulls in
 * the entire 1000+ icon library and causes OOM during Turbopack compilation.
 */
export const iconRegistry: Record<string, LucideIcon> = {
  Award,
  ClipboardList,
  Code2,
  Compass,
  Headset,
  Layers,
  Megaphone,
  PartyPopper,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  Sparkles,
  Circle,
  BookOpen,
  FileText,
  ArrowRight,
}

export function getIcon(name: string | undefined, fallback: LucideIcon = Sparkles): React.ElementType {
  if (!name) return fallback
  return iconRegistry[name] ?? fallback
}
