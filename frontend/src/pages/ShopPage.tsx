import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product, ProductCategory } from '@/types'
import { products } from '@/data/products'
import type { ShopFilters } from '@/components/shop/FilterPanel'
import { FilterPanel, filterProducts } from '@/components/shop/FilterPanel'
import { MobileFilterDrawer } from '@/components/shop/MobileFilterDrawer'
import { ProductCard } from '@/components/home/ProductCard'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'

const DEFAULT_FILTERS: ShopFilters = {
  categories: [],
  sizes: [],
  colors: [],
  materials: [],
  sort: 'featured',
}

function uniqueBy<T>(items: T[], keyFn: (v: T) => string): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const item of items) {
    const k = keyFn(item)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(item)
  }
  return out
}

function getAvailableSizes(list: Product[]) {
  const sizes = uniqueBy(
    list.flatMap((p) => p.sizes.map((s) => s.size).filter(Boolean)),
    (s) => s,
  )
  return sizes.sort((a, b) => {
    const an = Number(a)
    const bn = Number(b)
    const aIsNum = Number.isFinite(an)
    const bIsNum = Number.isFinite(bn)
    if (aIsNum && bIsNum) return an - bn
    if (aIsNum) return -1
    if (bIsNum) return 1
    return a.localeCompare(b)
  })
}

function getAvailableMaterials(list: Product[]) {
  return uniqueBy(
    list.flatMap((p) => (p.leather_type ? [p.leather_type] : [])),
    (m) => m.toLowerCase(),
  ).sort((a, b) => a.localeCompare(b))
}

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') as ProductCategory | null

  const [filters, setFilters] = useState<ShopFilters>(() => {
    if (!initialCategory) return DEFAULT_FILTERS
    return { ...DEFAULT_FILTERS, categories: [initialCategory] }
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const availableColors = useMemo(() => {
    return uniqueBy(
      products.flatMap((p) => p.colors.map((c) => c)),
      (c) => c.name.toLowerCase(),
    ).sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const availableSizes = useMemo(() => getAvailableSizes(products), [])

  const availableMaterials = useMemo(
    () => getAvailableMaterials(products),
    [],
  )

  const filtered = useMemo(() => filterProducts(products, filters), [filters])

  const resultCount = filtered.length

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 lg:px-12 lg:pt-20">
          <SectionLabel>Archive</SectionLabel>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
                Shop
              </h1>
              <p className="mt-4 max-w-2xl font-serif text-lg italic text-espresso/55">
                Leather footwear, built to age. Choose a category, then refine by material, size, and color.
              </p>
            </div>
            <p className="label-caps text-xs tracking-[0.22em] text-espresso/40">
              {String(resultCount).padStart(2, '0')} pieces
            </p>
          </div>
          <StitchedDivider className="mt-10" label="Refine" />
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                availableColors={availableColors}
                availableMaterials={availableMaterials}
                availableSizes={availableSizes}
              />
            </aside>

            <div className="lg:col-span-9">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="font-sans text-sm text-espresso/60">
                  Showing <span className="font-display text-espresso">{resultCount}</span>{' '}
                  pieces.
                </p>

                <button
                  type="button"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                  aria-label="Open filters"
                >
                  <span className="inline-flex items-center gap-2 rounded-[6px] border border-espresso/25 bg-bone px-4 py-2 text-xs uppercase tracking-[0.16em] text-espresso transition-colors hover:border-brass hover:text-leather">
                    Refine
                    <span className="rounded-[3px] border border-brass/30 bg-parchment px-2 py-0.5 font-sans text-[0.65rem] leading-none text-espresso/70">
                      {resultCount}
                    </span>
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product, i) => (
                  <div key={product.id} className="min-w-0">
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="mt-16 rounded-[8px] border border-espresso/15 bg-parchment/30 p-8 text-center">
                  <p className="font-display text-2xl text-espresso">No matches.</p>
                  <p className="mt-3 font-sans text-sm italic text-espresso/55">
                    Adjust filters to find a new pair—something the hide is willing to reveal.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <MobileFilterDrawer
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filters={filters}
          onChange={setFilters}
          availableColors={availableColors}
          availableMaterials={availableMaterials}
          availableSizes={availableSizes}
          resultCount={resultCount}
        />
      </NoiseOverlay>
    </main>
  )
}
