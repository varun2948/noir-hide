import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { subscribeNewsletter } from '@/lib/api'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const reduced = useReducedMotion()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }
    if (!EMAIL_RE.test(trimmed)) {
      setError('Enter a valid email — workshop letters only go to real inboxes.')
      return
    }

    setPending(true)
    try {
      const res = await subscribeNewsletter(trimmed)
      setSuccess(res.detail || 'You are on the atelier list.')
      setEmail('')
    } catch {
      setError('Something went wrong. Please try again shortly.')
    } finally {
      setPending(false)
    }
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden bg-parchment/50 px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,color-mix(in_srgb,var(--brass)_14%,transparent),transparent_50%)]"
      />

      <div className="relative z-[1] mx-auto max-w-[720px] text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <SectionLabel className="mb-5">Correspondence</SectionLabel>
          <h2
            id="newsletter-heading"
            className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-espresso"
          >
            Letters from the{' '}
            <span className="italic text-leather">Workshop</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md font-sans text-sm leading-relaxed text-espresso/65">
            New collections, care guides, and notes from the bench — sent
            sparingly, never shouted.
          </p>
        </motion.div>

        <StitchedDivider className="my-10" />

        {success ? (
          <motion.p
            role="status"
            className="font-display text-xl italic text-leather"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {success}
          </motion.p>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError(null)
              }}
              placeholder="your@email.com"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-error' : undefined}
              className="min-h-[48px] flex-1 border border-espresso/25 bg-bone px-4 py-3 font-sans text-sm text-espresso placeholder:text-espresso/35 transition-colors focus:border-brass focus:outline-none"
            />
            <Button
              type="submit"
              variant="brass"
              size="lg"
              disabled={pending}
              className="shrink-0 sm:min-w-[140px]"
            >
              {pending ? 'Sending…' : 'Subscribe'}
            </Button>
          </form>
        )}

        {error ? (
          <p
            id="newsletter-error"
            role="alert"
            className="mt-4 font-sans text-sm text-oxblood"
          >
            {error}
          </p>
        ) : null}

        <p
          aria-hidden
          className="mt-10 font-display text-sm italic text-espresso/35"
        >
          Postmark · Atelier list since 1987
        </p>
      </div>
    </section>
  )
}
