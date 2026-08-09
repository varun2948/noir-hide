import { type FormEvent, useState } from 'react'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { Button } from '@/components/ui/Button'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !message.trim()) return
    setStatus('Message drafted for the atelier (mock only).')
    setName('')
    setEmail('')
    setMessage('')
    window.setTimeout(() => setStatus(null), 2200)
  }

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[980px] px-5 py-16 sm:px-8 lg:px-10">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.15rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
            Write to the Mocchi workshop
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg italic text-espresso/55">
            Care questions, sizing notes, and repair inquiries. This form is a mock for UX testing.
          </p>

          <StitchedDivider className="mt-10" label="Draft a note" />

          <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-[8px] border border-espresso/15 bg-parchment/25 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="label-caps text-[0.65rem] text-espresso/55">
                  Name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-[6px] border border-espresso/20 bg-bone px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/35 focus:border-brass focus:outline-none"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="label-caps text-[0.65rem] text-espresso/55">
                  Email
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="mt-2 w-full rounded-[6px] border border-espresso/20 bg-bone px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/35 focus:border-brass focus:outline-none"
                  placeholder="you@email.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="label-caps text-[0.65rem] text-espresso/55">
                Message
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="mt-2 w-full resize-none rounded-[6px] border border-espresso/20 bg-bone px-4 py-3 text-sm text-espresso placeholder:text-espresso/35 focus:border-brass focus:outline-none"
                placeholder="What can we help you with?"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-xs text-espresso/55">
                We reply only with bench notes and care guidance—no spam.
              </p>
              <Button type="submit" variant="brass" size="lg" disabled={!email.trim() || !message.trim()}>
                Send message
              </Button>
            </div>

            {status ? (
              <p role="status" className="font-sans text-sm italic text-oxblood">
                {status}
              </p>
            ) : null}
          </form>
        </section>
      </NoiseOverlay>
    </main>
  )
}

