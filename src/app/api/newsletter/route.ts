import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const normalized = email.trim().toLowerCase()

    // Upsert — ignore if already subscribed
    const existing = await db.newsletter.findUnique({ where: { email: normalized } })
    if (existing) {
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }

    await db.newsletter.create({ data: { email: normalized } })
    console.log(`[Newsletter] Nouvel inscrit: ${normalized}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Newsletter API]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
