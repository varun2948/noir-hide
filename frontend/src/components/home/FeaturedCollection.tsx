import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { images } from '@/data/images'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function FeaturedCollection() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section
      ref={ref}
      id="oxblood"
      aria-labelledby="oxblood-heading"
      className="relative overflow-hidden bg-oxblood text-parchment"
    >
      <NoiseOverlay
        className="absolute inset-0"
        overlayClassName="opacity-[0.07] mix-blend-soft-light"
      />

      <div className="relative z-[2] mx-auto grid min-h-[70svh] max-w-[1440px] grid-cols-1 items-center lg:grid-cols-12 lg:min-h-[78svh]">
        <div className="order-2 px-5 py-16 sm:px-8 sm:py-20 lg:order-1 lg:col-span-5 lg:px-12 lg:py-24">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel className="mb-5 text-brass">
              Limited Edition
            </SectionLabel>
            <h2
              id="oxblood-heading"
              className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em] text-brass"
            >
              The Oxblood
              <br />
              Edition
            </h2>
            <p className="mt-6 max-w-sm font-display text-xl italic leading-snug text-parchment/85 sm:text-2xl">
              A darker kind of refinement.
            </p>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-parchment/60">
              Deep burgundy leather that shifts toward wine in sunlight —
              field boots and lasting pairs dyed for those who prefer patina
              over polish.
            </p>
            <div className="mt-10">
              <Link to="/collections/oxblood">
                <Button variant="brass" size="lg" className="gap-2.5">
                  View the Oxblood Edition
                  <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                </Button>
              </Link>
            </div>
            <p
              aria-hidden
              className="mt-10 font-sans text-[0.65rem] uppercase tracking-[0.32em] text-parchment/35"
            >
              Collection stamp · NH-OX-26
            </p>
          </motion.div>
        </div>

        <div className="relative order-1 aspect-[16/11] lg:order-2 lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[78svh]">
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
            animate={{
              clipPath:
                reduced || inView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            }}
            transition={{
              duration: reduced ? 0 : 1.15,
              ease: [0.22, 1, 0.36, 1],
              delay: reduced ? 0 : 0.1,
            }}
          >
            <img
              src={images.collectionOxblood}
              alt="Oxblood Edition leather footwear"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-l from-transparent via-oxblood/20 to-oxblood/70"
            />
          </motion.div>

          <motion.p
            aria-hidden
            className="pointer-events-none absolute bottom-8 right-6 hidden max-w-[160px] text-right font-display text-sm italic text-parchment/70 lg:block"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Field boot · speed hooks · Goodyear welt
          </motion.p>
        </div>
      </div>
    </section>
  )
}
