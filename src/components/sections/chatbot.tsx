'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, RefreshCw, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

interface Message {
  role: 'user' | 'model'
  content: string
  unavailable?: boolean
  whatsappUrl?: string
}

const SUGGESTIONS = [
  'Quels sont vos services ?',
  'Combien coûte un site web ?',
  'Où êtes-vous situés ?',
  'Comment obtenir un devis ?',
]

export function Chatbot() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'model',
      content:
        "Bonjour ! 👋 Je suis l'assistant virtuel de MultiSphere Agency. Je peux vous renseigner sur nos services (événementiel, communication, développement web, cybersécurité, gestion administrative). Comment puis-je vous aider ?",
    },
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      // Build history for the API (exclude the welcome message)
      const history = messages
        .filter((m, i) => i > 0 || m.role === 'user')
        .map((m) => ({ role: m.role, parts: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })

      const data = await res.json()

      const botMsg: Message = {
        role: 'model',
        content: data.reply,
        unavailable: data.unavailable,
        whatsappUrl: data.whatsappUrl,
      }

      setMessages((prev) => [...prev, botMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content:
            "Je suis actuellement indisponible. Veuillez nous contacter directement sur WhatsApp au " +
            siteConfig.phone +
            ".",
          unavailable: true,
          whatsappUrl: siteConfig.whatsappHref,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const reset = () => {
    setMessages([
      {
        role: 'model',
        content:
          "Bonjour ! 👋 Je suis l'assistant virtuel de MultiSphere Agency. Comment puis-je vous aider ?",
      },
    ])
  }

  return (
    <section id="assistant" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Assistant IA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Discutez avec notre
            <span className="text-gradient"> assistant virtuel</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Posez vos questions sur nos services, nos expertises ou votre projet.
            Réponse instantanée, 24h/24.
          </motion.p>
        </div>

        {/* Chat card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-border/60 bg-card shadow-2xl shadow-primary/5 overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

          {/* Chat header */}
          <div className="px-5 sm:px-6 py-4 border-b border-border/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">Assistant MultiSphere</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En ligne
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={reset}
              className="h-9 w-9 rounded-full"
              aria-label="Recommencer la conversation"
              title="Recommencer"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages area */}
          <div
            ref={scrollRef}
            className="p-5 sm:p-6 h-[400px] overflow-y-auto space-y-4 bg-muted/20"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex gap-2.5 max-w-[85%] ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {msg.role === 'model' && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-0.5">
                        {msg.unavailable ? (
                          <AlertCircle className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : msg.unavailable
                          ? 'bg-amber-500/10 border border-amber-500/30 text-foreground rounded-tl-sm'
                          : 'bg-card border border-border/60 rounded-tl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.unavailable && msg.whatsappUrl && (
                        <a
                          href={msg.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-3 py-1.5 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Contacter sur WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-card border border-border/60 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggestions (only when few messages) */}
          {messages.length <= 2 && !loading && (
            <div className="px-5 sm:px-6 py-3 border-t border-border/60 bg-muted/10">
              <p className="text-xs text-muted-foreground mb-2">Questions suggérées :</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs rounded-full border border-border/60 bg-card px-3 py-1.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-5 border-t border-border/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              disabled={loading}
              maxLength={1000}
              className="flex-1 h-11 rounded-full border border-border/60 bg-background px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all disabled:opacity-50"
              aria-label="Votre message"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="h-11 w-11 rounded-full shrink-0"
              aria-label="Envoyer"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-xs text-muted-foreground max-w-lg mx-auto">
          🔒 Cet assistant ne traite que les questions relatives à MultiSphere Agency. Pour les
          demandes sensibles ou détaillées, utilisez le formulaire de contact ou WhatsApp.
        </p>
      </div>
    </section>
  )
}
