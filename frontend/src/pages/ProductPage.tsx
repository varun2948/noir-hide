import { useEffect, useMemo, useState } from 'react'
import { Heart, HeartOff } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product, ProductSize } from '@/types'
import { products } from '@/data/products'
import type { ProductColor } from '@/types'
import { fetchProduct } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { useUI } from '@/context/UIContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ColorSwatches } from '@/components/product/ColorSwatches'
import { SizeSelector } from '@/components/product/SizeSelector'
import { ProductCard } from '@/components/home/ProductCard'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { formatPrice, parsePrice } from '@/lib/format'

function getStockLabel(stock_status: Product['stock_status']): string {
  switch (stock_status) {
    case 'in_stock':
      return 'In stock'
    case 'low_stock':
      return 'Low stock'
    case 'out_of_stock':
      return 'Out of stock'
    case 'made_to_order':
      return 'Made to order'
    default:
      return 'Availability'
  }
}

function getPrimaryColor(colors: ProductColor[]): string | undefined {
  return colors[0]?.name
}

function getPrimarySize(sizes: ProductSize[], initialPreferred?: string) {
  if (initialPreferred) {
    const preferred = sizes.find((s) => s.size === initialPreferred)
    if (preferred?.in_stock) return preferred.size
  }
  return sizes.find((s) => s.in_stock)?.size ?? sizes[0]?.size
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const reduced = useReducedMotion()
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useUI()

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      if (!slug) return
      const p = await fetchProduct(slug)
      if (!active) return
      setProduct(p)
      if (p) {
        setSelectedColor(getPrimaryColor(p.colors))
        setSelectedSize(getPrimarySize(p.sizes))
      }
      setLoading(false)
    }
    load()
    return () => {
      active = false
    }
  }, [slug])

  const favored = product ? isFavorite(product.id) : false

  const selectedSizeObj = useMemo(() => {
    if (!product || !selectedSize) return null
    return product.sizes.find((s) => s.size === selectedSize) ?? null
  }, [product, selectedSize])

  const canAdd = useMemo(() => {
    if (!product) return false
    if (product.stock_status === 'out_of_stock') return false
    if (!selectedSizeObj?.in_stock) return false
    if (product.colors.length > 0 && !selectedColor) return false
    if (product.colors.length === 0 && selectedColor) return true
    return true
  }, [product, selectedSizeObj, selectedColor])

  const recommended = useMemo(() => {
    if (!product) return []
    const list = products
      .filter((p) => p.id !== product.id)
      .filter((p) => p.category === product.category || p.collection === product.collection)
      .sort((a, b) => Number(parsePrice(a.price)) - Number(parsePrice(b.price)))
    return list.slice(0, 6)
  }, [product])

  const onAddToBag = () => {
    if (!product) return
    if (!selectedSize) return
    addItem({
      product,
      quantity: 1,
      color: product.colors.length ? selectedColor : undefined,
      size: selectedSize,
    })
  }

  return (
    <main className="bg-bone">
      <NoiseOverlay className="relative !overflow-visible">
        <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 lg:px-12">
          <SectionLabel>Atelier piece</SectionLabel>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-espresso">
                {loading ? 'Loading…' : product?.name ?? 'Product'}
              </h1>
              {product ? (
                <p className="mt-4 font-sans text-sm text-espresso/60">
                  {product.category.toUpperCase()} · {product.collection}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-4">
              {product ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(product.id)
                  }}
                  aria-pressed={favored}
                  aria-label={favored ? 'Remove from favorites' : 'Add to favorites'}
                  className="inline-flex size-11 items-center justify-center rounded-[8px] border border-espresso/20 bg-parchment/40 text-espresso transition-colors hover:border-brass"
                >
                  {favored ? (
                    <Heart className="size-5 text-oxblood" strokeWidth={1.7} />
                  ) : (
                    <HeartOff className="size-5" strokeWidth={1.7} />
                  )}
                </button>
              ) : null}
              <Link
                to="/shop"
                className="label-caps text-[0.65rem] tracking-[0.22em] text-espresso/50 hover:text-espresso"
              >
                Back to shop
              </Link>
            </div>
          </div>

          <StitchedDivider className="mt-10" label="Specs" />
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
          {loading || !product ? (
            <div className="rounded-[8px] border border-espresso/15 bg-parchment/20 p-10">
              <p className="font-display text-2xl text-espresso">Preparing the workshop notes…</p>
              <p className="mt-3 font-sans text-sm italic text-espresso/55">
                Loading gallery, sizes, and construction details.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductGallery images={product.images} productName={product.name} />
                </motion.div>

                <div className="mt-12 lg:hidden">
                  <StitchedDivider className="mb-8" label="Materials" />
                  <div className="space-y-6">
                    <div>
                      <p className="label-caps text-brass">Leather</p>
                      <p className="mt-2 font-display text-2xl text-espresso">
                        {product.leather_type || 'Atelier leather'}
                      </p>
                      <p className="mt-4 font-sans text-sm leading-relaxed text-espresso/65">
                        {product.material_info}
                      </p>
                    </div>
                    <div>
                      <p className="label-caps text-brass">Construction</p>
                      <p className="mt-2 font-display text-xl italic text-espresso/85">
                        {product.construction}
                      </p>
                    </div>
                    <div>
                      <p className="label-caps text-brass">Care</p>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-espresso/65">
                        {product.care_info}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-5 lg:sticky lg:top-[7.5rem] lg:self-start">
                <div className="rounded-[8px] border border-espresso/15 bg-parchment/35 p-5 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label-caps text-brass">Price</p>
                      <p className="mt-2 font-display text-4xl text-espresso">
                        {formatPrice(parsePrice(product.price))}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="label-caps text-brass">Stock</p>
                      <p
                        className={[
                          'mt-2 font-sans text-sm font-medium',
                          product.stock_status === 'low_stock'
                            ? 'text-oxblood'
                            : product.stock_status === 'out_of_stock'
                              ? 'text-espresso/40'
                              : 'text-espresso/80',
                        ].join(' ')}
                      >
                        {getStockLabel(product.stock_status)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <ColorSwatches
                      colors={product.colors}
                      value={selectedColor}
                      onChange={setSelectedColor}
                    />

                    <SizeSelector
                      sizes={product.sizes}
                      value={selectedSize}
                      onChange={setSelectedSize}
                    />

                    <div>
                      <p className="label-caps text-brass">Size & color</p>
                      <p className="mt-2 font-sans text-sm text-espresso/65">
                        {[selectedColor ? `Color: ${selectedColor}` : null, selectedSize ? `Size: ${selectedSize}` : null]
                          .filter(Boolean)
                          .join(' · ') || 'Select your options'}
                      </p>
                    </div>

                    <Button
                      variant="oxblood"
                      fullWidth
                      disabled={!canAdd}
                      onClick={onAddToBag}
                    >
                      Add to bag
                    </Button>

                    <p className="text-xs font-sans leading-relaxed text-espresso/55">
                      Mock checkout only. Your selection is stored locally in this browser.
                    </p>
                  </div>

                  <StitchedDivider className="my-7" />

                  <div className="space-y-6">
                    <div>
                      <p className="label-caps text-brass">Material</p>
                      <p className="mt-2 font-display text-xl text-espresso/90">
                        {product.leather_type || 'Atelier leather'}
                      </p>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-espresso/65">
                        {product.material_info}
                      </p>
                    </div>

                    <div>
                      <p className="label-caps text-brass">Construction method</p>
                      <p className="mt-2 font-sans text-sm italic leading-relaxed text-espresso/70">
                        {product.construction}
                      </p>
                    </div>

                    <div>
                      <p className="label-caps text-brass">Shipping & returns</p>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-espresso/65">
                        {product.shipping_info}
                      </p>
                    </div>

                    <div>
                      <p className="label-caps text-brass">Product care</p>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-espresso/65">
                        {product.care_info}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {product ? (
            <div className="mt-16">
              <StitchedDivider className="mb-10" label="Recommended" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommended.map((p, i) => (
                  <div key={p.id} className="min-w-0">
                    <ProductCard product={p} index={i} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </NoiseOverlay>
    </main>
  )
}
