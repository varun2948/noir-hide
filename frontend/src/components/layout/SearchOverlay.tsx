import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useUI } from '@/context/UIContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { products } from '@/data/products'
import { formatPrice, parsePrice } from '@/lib/format'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI()
  const reducedMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('')
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => inputRef.current?.focus(), 40)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isSearchOpen, closeSearch])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.leather_type.toLowerCase().includes(q),
      )
      .slice(0, 8)
  }, [query])

  const duration = reducedMotion ? 0 : 0.28

  return (
    <AnimatePresence>
      {isSearchOpen ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[70] flex flex-col bg-bone/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <div className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <SectionLabel id={titleId}>Search the atelier</SectionLabel>
                <p className="mt-2 font-serif text-lg text-espresso/70">
                  Find footwear by name, category, or leather.
                </p>
              </div>
              <button
                type="button"
                onClick={closeSearch}
                className="p-2 text-espresso/70 transition-colors hover:text-oxblood"
                aria-label="Close search"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>

            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search
                className="pointer-events-none absolute left-0 top-1/2 size-5 -translate-y-1/2 text-brass"
                strokeWidth={1.4}
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “oxford”, “oxblood”, “care”…"
                className="w-full border-0 border-b border-dashed border-brass/50 bg-transparent py-3 pl-8 pr-2 font-display text-2xl text-espresso placeholder:text-espresso/35 focus:border-brass focus:outline-none sm:text-3xl"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </label>

            <div className="mt-8">
              {!query.trim() ? (
                <p className="font-sans text-sm text-espresso/50">
                  Start typing to search the catalog.
                </p>
              ) : results.length === 0 ? (
                <p className="font-sans text-sm text-espresso/50">
                  No pieces matched “{query.trim()}”.
                </p>
              ) : (
                <ul className="divide-y divide-dashed divide-brass/30">
                  {results.map((product) => {
                    const image =
                      product.primary_image ||
                      product.images.find((img) => img.is_primary)?.url ||
                      product.images[0]?.url ||
                      ''
                    return (
                      <li key={product.id}>
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={closeSearch}
                          className="group flex items-center gap-4 py-4 transition-colors hover:bg-parchment/40"
                        >
                          <div className="size-16 shrink-0 overflow-hidden bg-parchment sm:size-20">
                            {image ? (
                              <img
                                src={image}
                                alt=""
                                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-lg text-espresso group-hover:text-leather sm:text-xl">
                              {product.name}
                            </p>
                            <p className="label-caps mt-1 text-[0.65rem] text-espresso/45">
                              {product.category} · {product.collection}
                            </p>
                          </div>
                          <p className="shrink-0 font-sans text-sm text-espresso/70">
                            {formatPrice(parsePrice(product.price))}
                          </p>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
