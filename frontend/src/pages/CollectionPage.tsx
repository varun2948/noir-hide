import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { collections } from '@/data/navigation'
import { products } from '@/data/products'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { ProductCard } from '@/components/home/ProductCard'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const collection = collections.find((c) => c.slug === slug)

  const collectionName = useMemo(() => {
    if (!slug) return ''
    const map: Record<string, string> = {
      'essential-four': 'Essential Four',
      oxblood: 'Oxblood',
      workshop: 'Workshop',
      atelier: 'Atelier',
      care: 'Care',
    }
    return map[slug] ?? collection?.name ?? ''
  }, [slug, collection])

  const list = useMemo(() => {
    if (!collectionName) return []
    return products
      .filter((p) => p.collection.toLowerCase() === collectionName.toLowerCase())
      .sort((a, b) => (a.featured_order || 999) - (b.featured_order || 999))
  }, [collectionName])

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        {slug === 'oxblood' ? (
          <FeaturedCollection />
        ) : (
          <section className="relative overflow-hidden bg-parchment/40 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_srgb,var(--brass)_20%,transparent)_0%,transparent_55%)]"
            />
            <div className="relative z-[2] mx-auto max-w-[1440px]">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6">
                  <SectionLabel>Collection</SectionLabel>
                  <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
                    {collection?.name ?? (slug ? slug.replace(/-/g, ' ') : 'Collection')}
                  </h1>
                  <p className="mt-6 max-w-xl font-serif text-lg italic text-espresso/55">
                    {collection?.description ??
                      'A limited rotation shaped by material choice and workshop discipline.'}
                  </p>

                  <p className="mt-10 label-caps text-xs tracking-[0.32em] text-espresso/35">
                    Chapter · {String((list[0]?.featured_order || 7) + 1).padStart(2, '0')}
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative overflow-hidden rounded-[8px] border border-espresso/15 bg-bone/40">
                    {collection?.image ? (
                      <img
                        src={collection.image}
                        alt={`${collection.name} collection`}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent"
                    />
                  </div>
                </div>
              </div>
              <StitchedDivider className="mt-14" label="Catalog" />
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
            <p className="font-sans text-sm text-espresso/60">
              Showing <span className="font-display text-espresso">{list.length}</span>{' '}
              pieces from this chapter.
            </p>
            <p className="label-caps text-[0.65rem] tracking-[0.22em] text-espresso/35">
              {collectionName || 'Collection'}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {list.length === 0 ? (
            <div className="mt-16 rounded-[8px] border border-espresso/15 bg-parchment/30 p-8 text-center">
              <p className="font-display text-2xl text-espresso">No pieces found.</p>
              <p className="mt-3 font-sans text-sm italic text-espresso/55">
                This chapter is between cuts.
              </p>
            </div>
          ) : null}
        </section>
      </NoiseOverlay>
    </main>
  )
}
