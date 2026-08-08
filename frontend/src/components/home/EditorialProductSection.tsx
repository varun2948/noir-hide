import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { essentialFour } from '@/data/products'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ProductGrid } from './ProductGrid'

export function EditorialProductSection() {
  const reduced = useReducedMotion()
  const products = essentialFour.slice(0, 4)

  return (
    <section
      id="essentials"
      aria-labelledby="essentials-heading"
      className="relative overflow-hidden bg-bone px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel className="mb-4">The Essential Four</SectionLabel>
              <h2
                id="essentials-heading"
                className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-espresso"
              >
                A rotation built to{' '}
                <span className="italic text-leather">outlast seasons</span>
              </h2>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.12 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start"
            >
              <p className="max-w-sm font-sans text-sm leading-relaxed text-espresso/65">
                Oxford, service boot, loafer, sneaker — four lasts from the
                workshop bench, each meant to collect miles rather than sit
                untouched.
              </p>
              <p
                aria-hidden
                className="font-display text-sm italic text-brass/80"
              >
                Spec sheet · Vol. I
              </p>
            </motion.div>
          </div>
        </div>

        <StitchedDivider className="mb-12 lg:mb-14" label="01 — 04" />

        <ProductGrid products={products} />

        <div className="mt-12 flex justify-end lg:mt-16">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-espresso transition-colors hover:text-brass"
          >
            View all footwear
            <span
              aria-hidden
              className="h-px w-8 bg-brass/50 transition-all group-hover:w-12 group-hover:bg-brass"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
