import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductImage } from '@/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const reduced = useReducedMotion()
  const sorted = [...images].sort((a, b) => a.order - b.order)
  const [index, setIndex] = useState(0)
  const current = sorted[index] ?? sorted[0]

  if (!current) {
    return (
      <div className="aspect-[4/5] bg-parchment/50 flex items-center justify-center text-espresso/40">
        No image
      </div>
    )
  }

  const prev = () => setIndex((i) => (i - 1 + sorted.length) % sorted.length)
  const next = () => setIndex((i) => (i + 1) % sorted.length)

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden border border-espresso/10 bg-parchment/30">
        <div className="absolute left-3 top-3 z-10 label-caps rounded-[2px] border border-brass/40 bg-bone/80 px-2 py-1 text-[9px] text-brass backdrop-blur-[2px]">
          Plate {String(index + 1).padStart(2, '0')} / {String(sorted.length).padStart(2, '0')}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id}
              src={current.url}
              alt={current.alt || productName}
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduced ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
        {sorted.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-[4px] border border-espresso/20 bg-bone/90 p-2 text-espresso"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-[4px] border border-espresso/20 bg-bone/90 p-2 text-espresso"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-16 shrink-0 overflow-hidden border transition-colors ${
                i === index ? 'border-brass' : 'border-espresso/15 hover:border-brass/50'
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
