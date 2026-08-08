import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '@/types'
import { formatPrice, parsePrice } from '@/lib/format'
import { useCart } from '@/context/CartContext'
import { useUI } from '@/context/UIContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Heart, HeartOff } from 'lucide-react'

interface ProductCardProps {
  product: Product
  featured?: boolean
  wide?: boolean
  className?: string
  index?: number
}

export function ProductCard({
  product,
  featured = false,
  wide = false,
  className = '',
  index = 0,
}: ProductCardProps) {
  const reduced = useReducedMotion()
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useUI()
  const favored = isFavorite(product.id)

  const primary =
    product.primary_image ||
    product.images.find((img) => img.is_primary)?.url ||
    product.images[0]?.url ||
    ''
  const secondary = product.images.find((img) => !img.is_primary)?.url
  const isCare = product.category === 'care'
  const canQuickAdd =
    isCare &&
    product.sizes.length === 1 &&
    product.sizes[0]?.size === 'One Size'

  const handleQuickAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!canQuickAdd) return
    addItem({
      product,
      quantity: 1,
      size: product.sizes[0]?.size,
      color: product.colors[0]?.name,
    })
  }

  return (
    <motion.article
      className={`group relative flex h-full flex-col ${className}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay: reduced ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleFavorite(product.id)
        }}
        aria-pressed={favored}
        aria-label={favored ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute left-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-[8px] border border-espresso/20 bg-white/88 text-espresso shadow-sm backdrop-blur-sm transition-colors hover:border-espresso/40 hover:bg-white"
      >
        {favored ? (
          <Heart className="size-5 text-oxblood" strokeWidth={1.6} />
        ) : (
          <HeartOff className="size-5" strokeWidth={1.6} />
        )}
      </button>

      <Link
        to={`/product/${product.slug}`}
        className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
      >
        <div
          className={[
            'relative overflow-hidden bg-parchment/40',
            featured ? 'aspect-[4/5]' : wide ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[4/5]',
            'rounded-[8px] border border-espresso/10 transition-colors duration-300 group-hover:border-espresso/25',
          ].join(' ')}
        >
          <img
            src={primary}
            alt={product.images[0]?.alt || product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
          {secondary ? (
            <img
              src={secondary}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          ) : null}

          {/* Specs fade on hover */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-espresso/58 via-espresso/28 to-transparent px-4 pb-4 pt-16 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.12em] text-parchment/95">
              {product.construction || product.leather_type || 'Atelier'}
            </p>
            {product.leather_type ? (
              <p className="mt-1 font-display text-sm italic text-bone/90">
                {product.leather_type}
              </p>
            ) : null}
          </div>

        </div>

        <div
          className={[
            'flex flex-1 flex-col px-1 pt-4 transition-colors duration-300',
            featured ? 'sm:pt-5' : '',
          ].join(' ')}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="label-caps text-brass/80">
                {product.category}
              </p>
              <h3
                className={[
                  'mt-1.5 font-display leading-tight text-espresso',
                  featured
                    ? 'text-2xl sm:text-3xl'
                    : wide
                      ? 'text-xl sm:text-2xl'
                      : 'text-lg sm:text-xl',
                ].join(' ')}
              >
                {product.name.replace(/^The\s+/i, '')}
              </h3>
            </div>
            <p className="shrink-0 font-sans text-sm font-medium tracking-wide text-espresso">
              {formatPrice(parsePrice(product.price))}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {product.leather_type ? (
              <p className="font-display text-sm italic text-espresso/55">
                {product.leather_type}
              </p>
            ) : null}
            {product.colors.length > 0 ? (
              <ul className="flex items-center gap-1.5" aria-label="Available colors">
                {product.colors.map((color) => (
                  <li
                    key={color.id}
                    title={color.name}
                    className="size-2.5 rounded-[2px] ring-1 ring-espresso/15"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Link>

      {canQuickAdd ? (
        <button
          type="button"
          onClick={handleQuickAdd}
          className="mt-3 self-start font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brass underline-offset-4 transition-colors hover:text-leather hover:underline"
        >
          Quick add
        </button>
      ) : null}
    </motion.article>
  )
}
