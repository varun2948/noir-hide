import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function BrandPhilosophy() {
  const reduced = useReducedMotion()

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden bg-bone"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        <div className="relative order-2 aspect-[5/4] overflow-hidden lg:order-1 lg:col-span-5 lg:aspect-auto lg:min-h-[620px]">
          <NoiseOverlay className="absolute inset-0 h-full w-full">
            <motion.img
              src={images.fullGrain}
              alt="Aged full-grain leather surface"
              className="h-full w-full object-cover"
              initial={reduced ? false : { scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent to-bone/40 lg:bg-gradient-to-r lg:from-espresso/20 lg:to-transparent"
            />
          </NoiseOverlay>

          <p
            aria-hidden
            className="absolute left-5 top-5 rotate-[-2deg] border border-brass/40 bg-bone/85 px-2.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-espresso/70 backdrop-blur-sm sm:left-8 sm:top-8"
          >
            Atelier plate · NH-87
          </p>
        </div>

        <div className="order-1 flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-24 lg:order-2 lg:col-span-7 lg:px-16 lg:py-28 xl:px-20">
          <motion.blockquote
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              aria-hidden
              className="mb-6 block font-display text-5xl leading-none text-brass/50"
            >
              “
            </span>
            <p
              id="philosophy-heading"
              className="max-w-xl font-display text-[clamp(1.65rem,3.2vw,2.65rem)] leading-[1.2] tracking-[-0.015em] text-espresso"
            >
              We do not design shoes to remain untouched. We design them to
              collect miles, weather, creases, and memory.
            </p>
            <footer className="mt-10">
              <cite className="not-italic">
                <span className="block h-px w-16 border-t border-dashed border-brass/55" />
                <span className="mt-5 block font-sans text-xs uppercase tracking-[0.22em] text-brass">
                  — The Mocchi Workshop
                </span>
              </cite>
            </footer>
          </motion.blockquote>

          <motion.p
            aria-hidden
            className="mt-14 max-w-xs font-display text-sm italic leading-relaxed text-espresso/40"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Written on the bench wall, above the lasting jacks — 1987 and every
            season since.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
