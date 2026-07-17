import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, budget, message } = body

    // Basic validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nom invalide' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }
    if (!service || typeof service !== 'string') {
      return NextResponse.json({ error: 'Service requis' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message trop court' }, { status: 400 })
    }

    const record = await db.contactRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        service: service.trim(),
        budget: budget?.trim() || null,
        message: message.trim(),
        status: 'new',
      },
    })

    // In production, you would also send an email notification here.
    console.log(`[Contact] Nouvelle demande #${record.id} de ${name} <${email}> pour "${service}"`)

    return NextResponse.json({
      success: true,
      id: record.id,
      message: 'Demande reçue avec succès',
    })
  } catch (error) {
    console.error('[Contact API]', error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de la demande" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const requests = await db.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        status: true,
        createdAt: true,
      },
    })
    return NextResponse.json({ requests, total: requests.length })
  } catch (error) {
    console.error('[Contact API GET]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
