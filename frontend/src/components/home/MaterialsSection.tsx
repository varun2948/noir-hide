import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { materials } from '@/data/materials'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StitchedDivider } from '@/components/ui/StitchedDivider'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function DurabilityMarks({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Durability ${rating} of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={[
            'h-1 w-5',
            i < rating ? 'bg-brass' : 'bg-espresso/15',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

export function MaterialsSection() {
  const reduced = useReducedMotion()
  const [activeSlug, setActiveSlug] = useState(materials[0]?.slug ?? 'full-grain')
  const active =
    materials.find((m) => m.slug === activeSlug) ?? materials[0]

  if (!active) return null

  return (
    <section
      id="materials"
      aria-labelledby="materials-heading"
      className="relative overflow-hidden bg-parchment/40 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,color-mix(in_srgb,var(--brass)_12%,transparent),transparent_45%)]"
      />

      <div className="relative z-[1] mx-auto max-w-[1440px]">
        <div className="mb-10 grid grid-cols-1 gap-6 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel className="mb-4">Archival Library</SectionLabel>
            <h2
              id="materials-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-espresso"
            >
              Know Your{' '}
              <span className="italic text-leather">Leather</span>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-espresso/60 lg:col-span-5 lg:justify-self-end">
            Sample drawers from the atelier — texture, aging, and care notes for
            the leathers we cut most often.
          </p>
        </div>

        <StitchedDivider className="mb-10" label="Material samples" />

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Leather types"
          className="mb-10 flex flex-wrap gap-2 border-b border-dashed border-brass/30 pb-4"
        >
          {materials.map((m) => {
            const selected = m.slug === active.slug
            return (
              <button
                key={m.slug}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`material-tab-${m.slug}`}
                aria-controls={`material-panel-${m.slug}`}
                onClick={() => setActiveSlug(m.slug)}
                className={[
                  'rounded-[4px] px-4 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.18em] transition-colors',
                  selected
                    ? 'bg-espresso text-bone'
                    : 'bg-transparent text-espresso/55 hover:bg-espresso/5 hover:text-espresso',
                ].join(' ')}
              >
                {m.name}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            id={`material-panel-${active.slug}`}
            role="tabpanel"
            aria-labelledby={`material-tab-${active.slug}`}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <div className="relative lg:col-span-5">
              <div className="stitched-border relative aspect-[4/5] overflow-hidden bg-bone">
                <img
                  src={active.texture_image_url}
                  alt={`${active.name} leather texture`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 border border-brass/45 bg-bone/90 px-2.5 py-1.5 backdrop-blur-sm">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.22em] text-brass">
                    Sample
                  </p>
                  <p className="mt-0.5 font-display text-lg text-espresso">
                    {active.sample_number}
                  </p>
                </div>
              </div>
              <p
                aria-hidden
                className="mt-3 font-display text-sm italic text-espresso/45"
              >
                Workshop note — drawer {active.id} · shelf B
              </p>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <h3 className="font-display text-3xl tracking-[-0.02em] text-espresso sm:text-4xl">
                {active.name}
              </h3>
              <p className="mt-5 max-w-xl font-sans text-[0.95rem] leading-relaxed text-espresso/70">
                {active.description}
              </p>

              <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <dt className="label-caps mb-2 text-brass">Durability</dt>
                  <dd>
                    <DurabilityMarks rating={active.durability_rating} />
                  </dd>
                </div>
                <div>
                  <dt className="label-caps mb-2 text-brass">Typical products</dt>
                  <dd className="font-sans text-sm text-espresso/75">
                    {active.typical_products}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="label-caps mb-2 text-brass">Aging behavior</dt>
                  <dd className="font-display text-lg italic leading-snug text-espresso/80">
                    {active.aging_behavior}
                  </dd>
                </div>
                <div className="sm:col-span-2 border-t border-dashed border-brass/30 pt-6">
                  <dt className="label-caps mb-2 text-brass">Care</dt>
                  <dd className="max-w-xl font-sans text-sm leading-relaxed text-espresso/70">
                    {active.care_recommendation}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
