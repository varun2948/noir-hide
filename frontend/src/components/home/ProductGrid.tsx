import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  className?: string
}

/**
 * Asymmetrical editorial layout:
 * large featured | two stacked
 * one wide spanning lower row
 */
export function ProductGrid({ products, className = '' }: ProductGridProps) {
  const [featured, second, third, wide] = products

  if (!featured) return null

  return (
    <div
      className={[
        'grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-5 lg:gap-7',
        className,
      ].join(' ')}
    >
      <div className="md:col-span-7 md:row-span-2">
        <ProductCard product={featured} featured index={0} />
      </div>

      {second ? (
        <div className="md:col-span-5">
          <ProductCard product={second} index={1} />
        </div>
      ) : null}

      {third ? (
        <div className="md:col-span-5">
          <ProductCard product={third} index={2} />
        </div>
      ) : null}

      {wide ? (
        <div className="md:col-span-12 md:mt-2">
          <ProductCard product={wide} wide index={3} />
        </div>
      ) : null}
    </div>
  )
}
