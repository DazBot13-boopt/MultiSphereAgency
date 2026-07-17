import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { siteConfig, services } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Build the system prompt that restricts the chatbot to MultiSphere Agency topics
function buildSystemPrompt(): string {
  const servicesList = services
    .map((s) => `- ${s.title}: ${s.short}`)
    .join('\n')

  return `Tu es l'assistant virtuel de MultiSphere Agency, une agence pluridisciplinaire basée à Abomey-Calavi, Bénin.

## RÔLE
Tu réponds aux questions des visiteurs sur les services et l'agence MultiSphere Agency. Tu es courtois, professionnel et toujours en français.

## INFORMATIONS SUR L'AGENCE
- **Nom**: MultiSphere Agency
- **Slogan**: "L'union des expertises, la force de vos projets."
- **Localisation**: Abomey-Calavi, Bénin
- **Téléphone**: ${siteConfig.phone}
- **Email**: ${siteConfig.email}
- **WhatsApp**: Disponible via le bouton WhatsApp sur le site
- **Réseaux sociaux**: Facebook, Instagram, LinkedIn, TikTok

## SERVICES PROPOSÉS
${servicesList}

## STATISTIQUES
- 90+ clients satisfaits
- 100+ projets réalisés
- 5 expertises
- Délai de réponse: sous 24h

## RÈGLES STRICTES
1. Tu ne parles QUE de MultiSphere Agency, de ses services, de son équipe, de son processus, de ses réalisations et de sujets directement liés (événementiel, communication, développement web/mobile, cybersécurité, gestion administrative).
2. Si on te pose une question hors sujet (politique, religion, sciences, actualités, autres entreprises, etc.), réponds poliment que tu es l'assistant de MultiSphere Agency et ne peux répondre qu'aux questions concernant l'agence. Propose de contacter l'équipe via WhatsApp ou le formulaire de contact.
3. Ne donne JAMAIS de prix exacts — oriente vers l'estimateur de budget ou le formulaire de devis gratuit.
4. Pour les demandes spécifiques (devis, rendez-vous, projet détaillé), encourage le visiteur à utiliser le formulaire de contact (#contact) ou WhatsApp.
5. Sois concis: réponds en 2-4 phrases maximum sauf si on te demande des détails.
6. Utilise un ton chaleureux et professionnel, adapté au contexte ouest-africain.
7. Ne génère pas de fausses informations. Si tu ne sais pas, oriente vers le contact humain.

## FORMAT
- Réponds en français
- Sois direct et utile
- N'utilise pas de markdown lourd, reste en texte simple avec éventuellement des listes courtes`
}

interface ChatMessage {
  role: 'user' | 'model'
  parts: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, history }: { message?: string; history?: ChatMessage[] } = body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 })
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message trop long (max 1000 caractères)' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // If no API key configured, return the fallback message
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Je suis actuellement indisponible. Veuillez nous contacter directement sur WhatsApp au " +
          siteConfig.phone +
          " ou via le formulaire de contact. Notre équipe vous répondra sous 24 heures.",
        unavailable: true,
        whatsappUrl: siteConfig.whatsappHref,
      })
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: buildSystemPrompt(),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.9,
        },
      })

      // Build the chat with history
      const chat = model.startChat({
        history: (history || []).map((m) => ({
          role: m.role,
          parts: [{ text: m.parts }],
        })),
      })

      const result = await chat.sendMessage(message.trim())
      const reply = result.response.text()

      if (!reply || reply.trim().length === 0) {
        throw new Error('Réponse vide du modèle')
      }

      return NextResponse.json({
        reply: reply.trim(),
        unavailable: false,
      })
    } catch (aiError) {
      console.error('[Chat API] Gemini error:', aiError)

      // Check for quota/rate limit errors → fallback message
      const errorMsg = aiError instanceof Error ? aiError.message : String(aiError)
      const isQuotaError =
        errorMsg.includes('429') ||
        errorMsg.includes('quota') ||
        errorMsg.includes('RATE_LIMIT') ||
        errorMsg.includes('RESOURCE_EXHAUSTED') ||
        errorMsg.includes('API key not valid') ||
        errorMsg.includes('PERMISSION_DENIED')

      return NextResponse.json({
        reply:
          "Je suis actuellement indisponible. Veuillez nous contacter directement sur WhatsApp au " +
          siteConfig.phone +
          " ou via le formulaire de contact. Notre équipe vous répondra sous 24 heures.",
        unavailable: true,
        whatsappUrl: siteConfig.whatsappHref,
        error: isQuotaError ? 'quota_or_auth_error' : 'unknown_error',
      })
    }
  } catch (error) {
    console.error('[Chat API] Fatal:', error)
    return NextResponse.json(
      {
        reply:
          "Je suis actuellement indisponible. Veuillez nous contacter directement sur WhatsApp au " +
          siteConfig.phone +
          " ou via le formulaire de contact.",
        unavailable: true,
        whatsappUrl: siteConfig.whatsappHref,
      },
      { status: 200 } // Return 200 so frontend displays the fallback gracefully
    )
  }
}
