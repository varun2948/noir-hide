import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BRAND, collections, footerNav, primaryNav } from '@/data/navigation'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

const shopLinks = primaryNav.find((n) => n.label === 'Shop')?.children ?? [
  { label: 'All Footwear', href: '/shop' },
]

const journalLinks = [
  { label: 'All Articles', href: '/journal' },
  { label: 'Leather Care', href: '/journal/five-steps-to-proper-leather-care' },
  { label: 'Craft Notes', href: '/journal' },
]

const currencies = ['USD', 'EUR', 'GBP'] as const

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [currency, setCurrency] = useState<(typeof currencies)[number]>('USD')

  const onNewsletter = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative overflow-hidden border-t border-espresso/12 bg-[#171411] text-parchment">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <p className="font-display text-2xl tracking-[0.16em] text-parchment">
              {BRAND.name}
            </p>
            <p className="mt-4 max-w-sm font-serif text-base italic leading-relaxed text-parchment/65">
              {BRAND.tagline} Small-batch leather footwear from the bench -
              built to be resoled, conditioned, and worn into something only
              you could make.
            </p>
          </div>

          <div>
            <SectionLabel className="text-brass/90">Shop</SectionLabel>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-parchment/70 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {collections.slice(0, 3).map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/collections/${c.slug}`}
                    className="font-sans text-sm text-parchment/70 transition-colors hover:text-brass"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel className="text-brass/90">Customer care</SectionLabel>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-parchment/70 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel className="text-brass/90">Journal</SectionLabel>
            <ul className="mt-4 space-y-2.5">
              {journalLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-parchment/70 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <SectionLabel className="mt-8 text-brass/90">
              Newsletter
            </SectionLabel>
            {subscribed ? (
              <p className="mt-3 font-serif text-sm italic text-parchment/60">
                Welcome to the atelier list. We write rarely, and only about
                leather worth keeping.
              </p>
            ) : (
              <form onSubmit={onNewsletter} className="mt-3 space-y-3">
                <label className="block">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full rounded-[8px] border border-parchment/20 bg-transparent px-3 py-2 font-sans text-sm text-parchment placeholder:text-parchment/35 focus:border-parchment/45 focus:outline-none"
                  />
                </label>
                <Button type="submit" variant="brass" size="sm">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <StitchedDivider className="my-10 border-brass/30" />

        <div className="flex flex-col gap-6 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <label className="inline-flex items-center gap-2">
              <span className="label-caps text-[0.6rem] text-parchment/45">
                Currency
              </span>
              <select
                value={currency}
                onChange={(e) =>
                  setCurrency(e.target.value as (typeof currencies)[number])
                }
                className="border border-brass/35 bg-espresso px-2 py-1.5 font-sans text-xs text-parchment focus:border-brass focus:outline-none"
                aria-label="Display currency"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <p className="font-sans text-xs text-parchment/40">
              Prices shown in {currency} for display only.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Legal"
          >
            <Link
              to="/terms"
              className="label-caps text-[0.6rem] text-parchment/45 transition-colors hover:text-brass"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="label-caps text-[0.6rem] text-parchment/45 transition-colors hover:text-brass"
            >
              Privacy
            </Link>
            <Link
              to="/shipping"
              className="label-caps text-[0.6rem] text-parchment/45 transition-colors hover:text-brass"
            >
              Shipping
            </Link>
          </nav>
        </div>

        <p className="pb-4 font-sans text-xs text-parchment/35">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </div>

      {/* Large but softer wordmark */}
      <div
        aria-hidden
        className="pointer-events-none relative z-0 select-none overflow-hidden pb-0 pt-4"
      >
        <p className="translate-y-[22%] text-center font-display text-[clamp(3.5rem,13vw,9rem)] font-medium leading-none tracking-[0.08em] text-parchment/[0.045]">
          {BRAND.name}
        </p>
      </div>
    </footer>
  )
}
