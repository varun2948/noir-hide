import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '@/data/images'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STAGES = [
  {
    id: '01',
    title: 'Hide Selection',
    body: 'We read the hide before we cut it — grain density, scars, and pull that will become character, not defect.',
    image: images.heroWorkshop,
    note: 'Workshop ledger · hide lot',
  },
  {
    id: '02',
    title: 'Hand Cutting',
    body: 'Patterns are laid by eye and knife. Each panel is cut to honor the hide’s natural stretch lines.',
    image: images.atelierBench,
    note: 'Bench mark · cutting table',
  },
  {
    id: '03',
    title: 'Lasting',
    body: 'Uppers are pulled over wooden lasts under tension. The shoe takes its shape slowly — never forced overnight.',
    image: images.foundryBootAlt,
    note: 'Last no. 47 · service',
  },
  {
    id: '04',
    title: 'Finishing',
    body: 'Edges are burnished, welts inspected, and the first oil applied by hand. Ready for miles, not display cases.',
    image: images.journalCare,
    note: 'Final pass · edge iron',
  },
] as const

export function CraftsmanshipStory() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target) return
        const idx = Number((top.target as HTMLElement).dataset.step)
        if (!Number.isNaN(idx)) setActive(idx)
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0.2, 0.5, 0.8] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const stage = STAGES[active] ?? STAGES[0]

  return (
    <section
      id="craftsmanship"
      aria-labelledby="craft-heading"
      className="relative bg-charcoal text-parchment"
    >
      <NoiseOverlay
        className="absolute inset-0"
        overlayClassName="opacity-[0.06] mix-blend-soft-light"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,color-mix(in_srgb,var(--leather)_35%,transparent),transparent_55%)]" />
      </NoiseOverlay>

      <div className="relative z-[2] mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-12 lg:gap-8">
        {/* Sticky image panel */}
        <div className="relative lg:col-span-6 lg:sticky lg:top-0 lg:h-svh lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] lg:aspect-auto lg:h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={stage.id}
                src={stage.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={reduced ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/25 to-transparent"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30"
            />

            <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-10">
              <SectionLabel className="mb-3 text-brass">
                Process · {stage.id} / 04
              </SectionLabel>
              <p className="font-display text-2xl italic text-parchment/90 sm:text-3xl">
                {stage.note}
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative px-5 py-16 sm:px-8 sm:py-24 lg:col-span-6 lg:px-12 lg:py-28">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 max-w-lg lg:mb-20"
          >
            <SectionLabel className="mb-5 text-brass">Craftsmanship</SectionLabel>
            <h2
              id="craft-heading"
              className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.02em] text-parchment"
            >
              Not manufactured.
              <br />
              <span className="italic text-brass">Remembered.</span>
            </h2>
            <p className="mt-6 font-sans text-sm leading-relaxed text-parchment/60 sm:text-base">
              Four stages between hide and heel. Nothing is rushed past the
              point where leather still remembers the hand that shaped it.
            </p>
          </motion.div>

          <ol className="relative space-y-0 border-l border-dashed border-brass/30 pl-0">
            {STAGES.map((item, i) => {
              const isActive = i === active
              return (
                <li
                  key={item.id}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                  data-step={i}
                  className="relative min-h-[42svh] border-b border-dashed border-brass/20 py-12 last:border-b-0 last:min-h-[55svh] sm:py-16 lg:min-h-[48svh]"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group w-full max-w-md text-left"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <div className="mb-4 flex items-baseline gap-4">
                      <span
                        className={[
                          'font-sans text-xs tracking-[0.28em] transition-colors',
                          isActive ? 'text-brass' : 'text-parchment/35',
                        ].join(' ')}
                      >
                        {item.id}
                      </span>
                      <span
                        aria-hidden
                        className={[
                          'h-px flex-1 transition-all duration-500',
                          isActive
                            ? 'bg-brass/70'
                            : 'bg-parchment/15 group-hover:bg-brass/40',
                        ].join(' ')}
                      />
                    </div>
                    <h3
                      className={[
                        'font-display text-2xl tracking-[-0.01em] transition-colors sm:text-3xl',
                        isActive ? 'text-parchment' : 'text-parchment/45',
                      ].join(' ')}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={[
                        'mt-4 font-sans text-sm leading-relaxed transition-opacity sm:text-[0.95rem]',
                        isActive
                          ? 'text-parchment/70 opacity-100'
                          : 'text-parchment/40 opacity-80',
                      ].join(' ')}
                    >
                      {item.body}
                    </p>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
