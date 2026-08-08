import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function TestimonialSection() {
  const reduced = useReducedMotion()
  const sorted = [...testimonials].sort((a, b) => a.order - b.order)
  const [index, setIndex] = useState(0)
  const total = sorted.length
  const current = sorted[index] ?? sorted[0]

  if (!current) return null

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + total) % total)
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-espresso text-parchment"
    >
      <NoiseOverlay
        className="absolute inset-0"
        overlayClassName="opacity-[0.05] mix-blend-soft-light"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,color-mix(in_srgb,var(--leather)_40%,transparent),transparent_50%)]" />
      </NoiseOverlay>

      <div className="relative z-[2] mx-auto max-w-[1100px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel className="mb-4 text-brass">
              From the wearers
            </SectionLabel>
            <h2
              id="testimonials-heading"
              className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[-0.02em] text-parchment"
            >
              Worn into memory
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-parchment/40">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex size-10 items-center justify-center border border-brass/40 text-brass transition-colors hover:border-brass hover:bg-brass/10"
              >
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex size-10 items-center justify-center border border-brass/40 text-brass transition-colors hover:border-brass hover:bg-brass/10"
              >
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[280px] border-t border-dashed border-brass/30 pt-12 sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={reduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote>
                <p className="max-w-3xl font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.25] tracking-[-0.015em] text-parchment">
                  “{current.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-brass">
                  {current.attribution}
                </span>
                <span aria-hidden className="text-parchment/25">
                  ·
                </span>
                <span className="font-display text-base italic text-parchment/55">
                  {current.product_name}
                </span>
                <span aria-hidden className="text-parchment/25">
                  ·
                </span>
                <span className="font-sans text-xs tracking-[0.12em] text-parchment/40">
                  {current.location}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Progress ticks */}
        <div
          className="mt-14 flex gap-2"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {sorted.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={[
                'h-px transition-all duration-300',
                i === index
                  ? 'w-12 bg-brass'
                  : 'w-6 bg-parchment/25 hover:bg-parchment/50',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
