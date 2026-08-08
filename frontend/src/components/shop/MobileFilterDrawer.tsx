import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { FilterPanel, type ShopFilters } from './FilterPanel'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MobileFilterDrawerProps {
  open: boolean
  onClose: () => void
  filters: ShopFilters
  onChange: (next: ShopFilters) => void
  availableColors: { name: string; hex: string }[]
  availableMaterials: string[]
  availableSizes: string[]
  resultCount: number
}

export function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  availableColors,
  availableMaterials,
  availableSizes,
  resultCount,
}: MobileFilterDrawerProps) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-charcoal/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[8px] bg-bone p-5 pb-8 shadow-2xl"
            initial={reduced ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reduced ? undefined : { y: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="label-caps text-brass">Refine</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[4px] border border-espresso/20 p-2 text-espresso"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <FilterPanel
              filters={filters}
              onChange={onChange}
              availableColors={availableColors}
              availableMaterials={availableMaterials}
              availableSizes={availableSizes}
            />
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full rounded-[6px] bg-espresso py-3.5 text-xs uppercase tracking-[0.16em] text-bone"
            >
              Show {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
