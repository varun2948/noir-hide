import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { useUI } from '@/context/UIContext'
import { products } from '@/data/products'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/home/ProductCard'

export default function AccountPage() {
  const { favorites, clearFavorites } = useUI()
  const [toast, setToast] = useState<string | null>(null)

  const favoredProducts = useMemo(() => {
    const set = new Set(favorites)
    return products.filter((p) => set.has(p.id))
  }, [favorites])

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
          <SectionLabel>Account</SectionLabel>
          <h1 className="mt-3 font-display text-[clamp(2.3rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
            Workshop profile
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg italic text-espresso/55">
            This is a demo atelier account—your favorites are stored locally in this browser.
          </p>

          <StitchedDivider className="mt-10" label="Saved" />

          <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="label-caps text-xs tracking-[0.22em] text-espresso/45">
                Favorites
              </p>
              <p className="mt-3 font-display text-3xl text-espresso">
                {favorites.length ? String(favorites.length).padStart(2, '0') : '00'}
              </p>
              <p className="mt-3 font-sans text-sm text-espresso/60">
                Tap the heart on any product to save it for later.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop">
                <Button variant="secondary">Continue browsing</Button>
              </Link>
              <Button
                variant="ghost"
                disabled={favorites.length === 0}
                onClick={() => {
                  clearFavorites()
                  setToast('Favorites cleared.')
                  window.setTimeout(() => setToast(null), 1800)
                }}
              >
                Clear favorites
              </Button>
            </div>
          </div>

          {toast ? (
            <p role="status" className="mt-6 font-sans text-sm italic text-oxblood">
              {toast}
            </p>
          ) : null}

          {favoredProducts.length === 0 ? (
            <div className="mt-14 rounded-[8px] border border-espresso/15 bg-parchment/30 p-8 text-center">
              <p className="font-display text-2xl text-espresso">No favorites yet</p>
              <p className="mt-3 font-sans text-sm italic text-espresso/55">
                Find a piece, then save it for later—like marking a bench note.
              </p>
              <div className="mt-8">
                <Link to="/shop" className="inline-block">
                  <Button variant="brass">Browse footwear</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favoredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </section>
      </NoiseOverlay>
    </main>
  )
}

