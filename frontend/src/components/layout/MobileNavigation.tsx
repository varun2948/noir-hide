import { useEffect, useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useUI } from '@/context/UIContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { primaryNav, BRAND } from '@/data/navigation'
import { StitchedDivider } from '@/components/ui/StitchedDivider'

export function MobileNavigation() {
  const { isMobileNavOpen, closeMobileNav } = useUI()
  const reducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isMobileNavOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileNav()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileNavOpen, closeMobileNav])

  const duration = reducedMotion ? 0 : 0.35

  return (
    <AnimatePresence>
      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-charcoal/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={closeMobileNav}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 left-0 flex w-[min(100%,22rem)] flex-col bg-espresso text-parchment shadow-2xl"
            initial={reducedMotion ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: '-100%' }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-dashed border-brass/30 px-5 py-4">
              <p
                id={titleId}
                className="font-display text-lg tracking-[0.22em] text-parchment"
              >
                {BRAND.name}
              </p>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeMobileNav}
                className="p-2 text-parchment/80 transition-colors hover:text-brass"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>

            <nav
              className="flex-1 overflow-y-auto px-5 py-6"
              aria-label="Mobile primary"
            >
              <ul className="space-y-6">
                {primaryNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={closeMobileNav}
                      className="font-display text-2xl tracking-wide text-parchment transition-colors hover:text-brass"
                    >
                      {link.label}
                    </Link>
                    {link.children?.length ? (
                      <ul className="mt-3 space-y-2 border-l border-dashed border-brass/35 pl-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              onClick={closeMobileNav}
                              className="label-caps text-[0.65rem] tracking-[0.18em] text-parchment/65 transition-colors hover:text-brass"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>

              <StitchedDivider className="my-8 border-brass/35" />

              <p className="font-serif text-sm italic leading-relaxed text-parchment/55">
                {BRAND.tagline}
              </p>
            </nav>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
