import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { images } from '@/data/images'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

const HEADLINE = ['Made to carry', 'your story.']

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <NoiseOverlay className="relative min-h-[90svh] overflow-hidden bg-bone lg:min-h-[100svh]">
      {/* Warm parchment wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,color-mix(in_srgb,var(--parchment)_70%,transparent)_0%,transparent_58%),linear-gradient(165deg,var(--bone)_0%,color-mix(in_srgb,var(--parchment)_45%,var(--bone))_100%)]"
      />

      <div className="relative z-[2] mx-auto grid min-h-[90svh] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-6 lg:px-12 lg:pb-20 lg:pt-32">
        {/* Copy column — left / upper on mobile */}
        <div className="relative z-[3] flex flex-col justify-center lg:col-span-5 lg:col-start-1 lg:pr-4 xl:col-span-5">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel className="mb-6 text-brass/90">
              The Foundry Collection — 2026
            </SectionLabel>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] tracking-[-0.03em] text-espresso">
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: reduced ? 0 : 0.18 + i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={i === 1 ? 'italic text-leather' : undefined}>
                  {line}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-md font-sans text-[0.95rem] leading-relaxed text-espresso/70 sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduced ? 0 : 0.55 }}
          >
            Full-grain leather footwear built slowly, worn deeply, and designed
            to age with character.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-5"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.7 }}
          >
            <Link to="/shop">
              <Button variant="primary" size="lg" className="gap-2.5">
                Explore the collection
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </Button>
            </Link>
            <a
              href="#craftsmanship"
              className="group inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-espresso/70 transition-colors hover:text-brass"
            >
              Discover our craft
              <span
                aria-hidden
                className="h-px w-6 bg-brass/60 transition-all group-hover:w-10 group-hover:bg-brass"
              />
            </a>
          </motion.div>

          {/* Vertical collection stamp */}
          <motion.p
            aria-hidden
            className="pointer-events-none absolute -left-1 top-1/2 hidden origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap font-sans text-[0.65rem] uppercase tracking-[0.35em] text-espresso/25 lg:block"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Chapter 01 / The Foundry Collection
          </motion.p>
        </div>

        {/* Image column — asymmetrical right */}
        <div className="relative lg:col-span-7 lg:col-start-6">
          <motion.div
            className="relative ml-auto aspect-[4/5] w-full max-w-[620px] overflow-hidden sm:aspect-[5/6] lg:mr-0 lg:max-w-none lg:translate-x-4 xl:translate-x-8"
            initial={
              reduced
                ? false
                : { clipPath: 'inset(100% 0 0 0)', scale: 1.08 }
            }
            animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
            transition={{
              clipPath: {
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
                delay: reduced ? 0 : 0.15,
              },
              scale: {
                duration: 8,
                ease: 'linear',
                delay: reduced ? 0 : 1.2,
              },
            }}
          >
            <img
              src={images.foundryBoot}
              alt="The Foundry Service Boot — full-grain leather, workshop finish"
              className="absolute inset-0 h-full w-full object-cover object-[42%_center]"
              width={1200}
              height={1500}
              fetchPriority="high"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-espresso/10"
            />
          </motion.div>

          {/* Stitched measurement marks */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-2 top-[12%] hidden h-[62%] w-px border-l border-dashed border-brass/50 lg:block"
            initial={reduced ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1,
              delay: reduced ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ originY: 0 }}
          >
            {[0, 25, 50, 75, 100].map((pct) => (
              <span
                key={pct}
                className="absolute -left-2 h-px w-3 bg-brass/55"
                style={{ top: `${pct}%` }}
              />
            ))}
          </motion.div>

          {/* Material annotation */}
          <motion.aside
            className="absolute -bottom-2 left-0 max-w-[220px] border border-dashed border-brass/40 bg-bone/90 px-3 py-2.5 backdrop-blur-sm sm:bottom-6 sm:left-4 lg:-left-6 lg:bottom-10"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 1.05 }}
          >
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brass">
              Material note
            </p>
            <p className="mt-1 font-display text-sm italic leading-snug text-espresso/80">
              Vegetable-tanned cowhide · oil pull-up · Goodyear welt
            </p>
          </motion.aside>

          {/* Mobile collection label */}
          <p className="mt-5 font-sans text-[0.65rem] uppercase tracking-[0.28em] text-espresso/40 lg:hidden">
            Chapter 01 / The Foundry Collection
          </p>
        </div>
      </div>

      {/* Bottom stitched rule */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 z-[2] border-t border-dashed border-brass/35"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.1,
          delay: reduced ? 0 : 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originX: 0 }}
      />
    </NoiseOverlay>
  )
}
